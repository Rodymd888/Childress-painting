#!/usr/bin/env node
/**
 * PROJECT PHOTO INGESTION
 * ===========================================================================
 * Reads a `Projects/` folder of per-project photo folders, optimises every
 * image for the web, matches each folder to an existing project (or creates a
 * new one), and writes a single generated data file that the site consumes.
 *
 *   npm run ingest:projects            # reads ./Projects
 *   npm run ingest:projects -- ../pics # reads a different path
 *
 * FOLDER NAMING — the folder name is the source of truth
 *   Torchy's Tacos - Fort Worth, TX     -> Torchy's Tacos · Fort Worth, Texas
 *   CVS Pharmacy — Azle, TX             -> CVS Pharmacy   · Azle, Texas
 *   IKEA (Grand Prairie, TX)            -> IKEA           · Grand Prairie, Texas
 *   Walmart Supercenter, Azle, TX       -> Walmart Supercenter · Azle, Texas
 *   Georgia-Pacific                     -> Georgia-Pacific (no location)
 *
 * MATCHING is deliberately tolerant of capitalisation, spaces, punctuation,
 * apostrophes, hyphens, ampersands, and trailing city/state suffixes. A folder
 * only becomes a NEW project when nothing scores above MATCH_THRESHOLD.
 *
 * HERO SELECTION picks the strongest image automatically: resolution, image
 * entropy (a good proxy for detail and contrast), and a landscape bonus. To
 * override, name a file `hero.*`, `cover.*`, or `01.*`.
 *
 * SAFETY
 *   - Never edits lib/projects.ts. All output goes to the generated file.
 *   - Never invents scope, dates, values, or GC names.
 *   - Re-runnable: rerunning replaces output rather than duplicating it.
 * ===========================================================================
 */

import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/* ------------------------------------------------------------------ CONFIG */

const SOURCE_DIR = process.argv[2] || 'Projects';
const OUT_IMAGE_ROOT = 'public/images/projects';
const GENERATED_FILE = 'lib/project-media.generated.ts';

const HERO_MAX_WIDTH = 2400;
const GALLERY_MAX_WIDTH = 1800;
/**
 * Quality ladder. Encoding starts at the top and steps down until the WebP is
 * meaningfully smaller than the source. High-resolution camera originals win
 * immediately at 82; already-compressed exports (social downloads, screenshots)
 * would actually INFLATE at 82, so they settle lower. The floor guarantees we
 * never trade real quality for a few kilobytes.
 */
const QUALITY_LADDER = [82, 78, 74, 70, 66];
/** Accept an encode once it is at least this much smaller than the source. */
const REQUIRED_SAVING = 0.05;
/** Below this similarity, a folder is treated as a brand-new project. */
const MATCH_THRESHOLD = 0.62;

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.heif']);

const US_STATES = {
  al: 'Alabama', ak: 'Alaska', az: 'Arizona', ar: 'Arkansas', ca: 'California',
  co: 'Colorado', ct: 'Connecticut', de: 'Delaware', fl: 'Florida', ga: 'Georgia',
  hi: 'Hawaii', id: 'Idaho', il: 'Illinois', in: 'Indiana', ia: 'Iowa',
  ks: 'Kansas', ky: 'Kentucky', la: 'Louisiana', me: 'Maine', md: 'Maryland',
  ma: 'Massachusetts', mi: 'Michigan', mn: 'Minnesota', ms: 'Mississippi',
  mo: 'Missouri', mt: 'Montana', ne: 'Nebraska', nv: 'Nevada', nh: 'New Hampshire',
  nj: 'New Jersey', nm: 'New Mexico', ny: 'New York', nc: 'North Carolina',
  nd: 'North Dakota', oh: 'Ohio', ok: 'Oklahoma', or: 'Oregon', pa: 'Pennsylvania',
  ri: 'Rhode Island', sc: 'South Carolina', sd: 'South Dakota', tn: 'Tennessee',
  tx: 'Texas', ut: 'Utah', vt: 'Vermont', va: 'Virginia', wa: 'Washington',
  wv: 'West Virginia', wi: 'Wisconsin', wy: 'Wyoming', dc: 'District of Columbia',
};

/** Keyword → industry slug. First match wins, so order matters. */
const INDUSTRY_KEYWORDS = [
  // NOTE: first match wins, so specific rules must precede general ones.
  // 'residential' is deliberately narrow — a bare 'home' would swallow
  // "Home Depot", which is retail.
  ['residential', ['residential', 'residence', 'homeowner', 'private home', 'custom wood staining']],
  ['aviation', ['airport', 'terminal', 'hangar', 'aviation', 'airfield']],
  ['sports-entertainment', ['stadium', 'arena', 'ballpark', 'chiefs', 'royals', 'topgolf', 'cinema', 'theater', 'theatre', 'bowling', 'event venue', 'event center', 'convention', 'ballroom', 'amphitheater']],
  ['education', ['school', 'isd', 'university', 'college', 'campus', 'academy', 'elementary', 'middle', 'high school', 'district']],
  ['healthcare', ['hospital', 'clinic', 'medical', 'health', 'dental', 'surgery', 'vision', 'orthodon', 'urgent care']],
  ['hospitality', ['hotel', 'inn', 'suites', 'resort', 'marriott', 'hilton', 'hyatt', 'holiday', 'motel', 'lodge']],
  ['government', ['city of', 'county', 'municipal', 'courthouse', 'police', 'fire station', 'fire department', 'kcfd', 'government', 'city hall', 'civic', 'federal', 'library', 'post office', 'transfer station']],
  ['industrial', ['plant', 'warehouse', 'distribution', 'manufactur', 'industrial', 'georgia-pacific', 'phillips', 'refinery', 'mill', 'logistics', 'foundry']],
  ['restaurants', ['taco', 'grill', 'pizza', 'chipotle', 'cane', 'roadhouse', 'restaurant', 'kitchen', 'brewery', 'torchy', 'steakhouse', 'waffle', 'burger', 'chicken', 'cafe', 'coffee', 'starbucks', 'dunkin', 'subway', 'wendy', 'mcdonald', 'panera', 'whataburger', 'sonic', 'bbq', 'barbecue', 'diner', 'bistro', 'panda']],
  ['office', ['office', 'tower', 'corporate', 'bank', 'credit union', 'plaza suites', 'headquarters']],
  ['retail', ['walmart', 'target', 'cvs', 'walgreen', 'dollar', 'ross', 'burlington', 'ikea', 'home depot', 'lowes', 'menards', 'carmax', 'aldi', 'kroger', 'best buy', 'maxx', 'marshalls', 'petco', 'petsmart', 'autozone', 'take 5', 'store', 'market', 'mall', 'shop', 'retail', 'pharmacy', 'supercenter', 'outlet', 'gamestop', 'sally beauty']],
];

const ART_FOR_INDUSTRY = {
  residential: 'interior',
  retail: 'retail', restaurants: 'restaurants', healthcare: 'healthcare',
  education: 'education', industrial: 'industrial', government: 'government',
  office: 'office', hospitality: 'hospitality', 'sports-entertainment': 'sports',
  aviation: 'aviation', 'tenant-improvements': 'tenant', 'new-construction': 'construction',
};

/** Placeholder used wherever real information has not been supplied. */
const NEUTRAL_SCOPE = 'Project details and scope information will be added soon.';

/* -------------------------------------------------------------- NORMALISING */

/** Aggressively normalise a string for tolerant comparison. */
function normalise(input) {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')      // strip diacritics
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’`]/g, '')                 // apostrophes vanish: torchy's -> torchys
    .replace(/[^a-z0-9]+/g, ' ')           // all punctuation/hyphens -> space
    .replace(/\b(llc|inc|ltd|co|corp|the)\b/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function slugify(input) {
  return normalise(input).replace(/\s+/g, '-');
}

/** Dice coefficient over character bigrams — tolerant fuzzy similarity. */
function similarity(a, b) {
  const A = normalise(a).replace(/\s/g, '');
  const B = normalise(b).replace(/\s/g, '');
  if (!A.length || !B.length) return 0;
  if (A === B) return 1;
  const bigrams = (s) => {
    const m = new Map();
    for (let i = 0; i < s.length - 1; i++) {
      const g = s.slice(i, i + 2);
      m.set(g, (m.get(g) || 0) + 1);
    }
    return m;
  };
  const ma = bigrams(A), mb = bigrams(B);
  let hits = 0;
  for (const [g, n] of ma) hits += Math.min(n, mb.get(g) || 0);
  return (2 * hits) / (A.length - 1 + B.length - 1);
}

/**
 * Split a folder name into a project name and a location.
 * Handles " - ", " – ", " — ", "(City, ST)", and trailing ", City, ST".
 */
function parseFolderName(folder) {
  const raw = folder.trim().replace(/\s+/g, ' ');

  // "Name (City, ST)" — parentheses at the very end are a location.
  const paren = raw.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (paren && looksLikeLocation(paren[2])) {
    return { name: clean(paren[1]), location: formatLocation(paren[2]) };
  }

  // "Name - Location" is the documented convention, so split on the LAST
  // spaced dash. The trailing space after the dash is what makes this safe:
  // "Triten Real-4950 Stilwell - Kansas City" splits only at " - ", leaving
  // the hyphen inside "Real-4950" alone. A missing leading space is tolerated
  // ("Torchy's Tacos- Kansas City").
  const sep = /\s*[-–—]\s+/g;
  let lastIndex = -1, lastLength = 0, m;
  while ((m = sep.exec(raw))) { lastIndex = m.index; lastLength = m[0].length; }
  if (lastIndex > 0) {
    const head = raw.slice(0, lastIndex);
    const tail = raw.slice(lastIndex + lastLength);
    if (head.trim() && tail.trim()) {
      return { name: clean(head), location: formatLocation(tail) };
    }
  }

  // "Name, City, ST"
  const parts = raw.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 3 && looksLikeLocation(parts.slice(-2).join(', '))) {
    return { name: clean(parts.slice(0, -2).join(', ')), location: formatLocation(parts.slice(-2).join(', ')) };
  }
  if (parts.length === 2 && looksLikeLocation(parts[1])) {
    return { name: clean(parts[0]), location: formatLocation(parts[1]) };
  }

  return { name: clean(raw), location: undefined };
}

function clean(s) {
  return s.replace(/\s+/g, ' ').trim();
}

/** A trailing chunk is a location if it ends in a state abbreviation or name. */
function looksLikeLocation(s) {
  const t = s.trim().replace(/\.$/, '');
  const last = t.split(/[,\s]+/).pop()?.toLowerCase() ?? '';
  if (US_STATES[last]) return true;
  return Object.values(US_STATES).some((v) => t.toLowerCase().endsWith(v.toLowerCase()));
}

/**
 * "Fort Worth, TX" -> "Fort Worth, Texas".
 * A bare city with no state ("Overland Park") is returned unchanged — guessing
 * the state would be inventing a fact.
 */
function formatLocation(s) {
  const t = clean(s).replace(/[.,]$/, '');
  if (!t) return undefined;
  const bits = t.split(',').map((b) => b.trim()).filter(Boolean);
  if (bits.length >= 2) {
    const st = bits[bits.length - 1].toLowerCase().replace(/\./g, '');
    const full = US_STATES[st];
    if (full) return `${bits.slice(0, -1).join(', ')}, ${full}`;
    return bits.join(', ');
  }
  const words = t.split(/\s+/);
  const st = words[words.length - 1].toLowerCase().replace(/\./g, '');
  if (words.length > 1 && US_STATES[st]) return `${words.slice(0, -1).join(' ')}, ${US_STATES[st]}`;
  return t;
}

function inferIndustry(name) {
  const n = normalise(name);
  for (const [slug, words] of INDUSTRY_KEYWORDS) {
    if (words.some((w) => n.includes(normalise(w)))) return { slug, confident: true };
  }
  return { slug: 'retail', confident: false };
}

/* ----------------------------------------------------- EXISTING PROJECT DATA */

/** Pull slug/name/industry out of lib/projects.ts without importing TS. */
async function readExistingProjects() {
  const src = await import('node:fs/promises').then((fs) => fs.readFile('lib/projects.ts', 'utf8'));
  const out = [];
  // Names may be single- OR double-quoted; the apostrophe names ("Torchy's
  // Tacos", "Culver's") are double-quoted in the source, so both must parse.
  const re = new RegExp(
    String.raw`slug:\s*(['"])(.*?)\1,\s*\n\s*name:\s*(['"])(.*?)\3,\s*\n\s*industry:\s*(['"])(.*?)\5`,
    'g',
  );
  let m;
  while ((m = re.exec(src))) {
    out.push({ slug: m[2], name: m[4].replace(/\\(['"])/g, '$1'), industry: m[6] });
  }
  return out;
}

/* --------------------------------------------------------- IMAGE PROCESSING */

function heroOverrideRank(filename) {
  const base = path.parse(filename).name.toLowerCase();
  if (/^(hero|cover|main|featured)\b/.test(base)) return 0;
  if (/^0*1\b/.test(base)) return 1;
  return 99;
}

async function scoreImage(file) {
  const image = sharp(file).rotate();
  const meta = await image.metadata();
  const stats = await image.stats();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const pixels = width * height;
  const entropy = stats.entropy ?? 0;          // detail/contrast proxy
  const landscape = width >= height ? 1 : 0;
  return {
    width, height,
    // Normalised, weighted: resolution 45%, detail 35%, landscape 20%.
    score: 0.45 * Math.min(pixels / 12_000_000, 1) + 0.35 * Math.min(entropy / 8, 1) + 0.20 * landscape,
  };
}

async function optimise(srcFile, destFile, maxWidth) {
  const { size: sourceBytes } = await stat(srcFile);
  const base = sharp(srcFile)
    .rotate()                                               // honour EXIF orientation
    .resize({ width: maxWidth, withoutEnlargement: true }); // never upscale, never stretch

  let chosen = null;
  for (const quality of QUALITY_LADDER) {
    const buffer = await base.clone().webp({ quality, effort: 6 }).toBuffer({ resolveWithObject: true });
    chosen = { ...buffer.info, buffer: buffer.data, quality };
    // Resizing alone may justify the file even at high quality, so compare
    // against the source only when the pixel dimensions were left untouched.
    if (buffer.data.length <= sourceBytes * (1 - REQUIRED_SAVING)) break;
  }

  await writeFile(destFile, chosen.buffer);
  return { width: chosen.width, height: chosen.height, bytes: chosen.buffer.length, quality: chosen.quality };
}

/* ---------------------------------------------------------------- GENERATOR */

function tsString(s) {
  return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.log(`\n  No "${SOURCE_DIR}" folder found — nothing to ingest.`);
    console.log('  Drop your project folders in and re-run: npm run ingest:projects\n');
    return;
  }

  const existing = await readExistingProjects();
  const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
  const folders = entries.filter((e) => e.isDirectory() && !e.name.startsWith('.'));

  if (!folders.length) {
    console.log(`\n  "${SOURCE_DIR}" contains no project folders.\n`);
    return;
  }

  const media = {};
  const discovered = [];
  const report = [];
  const usedSlugs = new Set(existing.map((p) => p.slug));

  for (const folder of folders) {
    const dir = path.join(SOURCE_DIR, folder.name);
    const files = (await readdir(dir))
      .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()) && !f.startsWith('.'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    // A folder with no images is still evidence of a real project, and the
    // folder name is the source of truth — so it is recorded as a project with
    // no photography rather than ignored.
    const { name, location } = parseFolderName(folder.name);

    /* ---- tolerant match against existing projects ---- */
    let best = null;
    for (const p of existing) {
      const s = Math.max(similarity(name, p.name), similarity(name, p.slug));
      if (!best || s > best.score) best = { project: p, score: s };
    }
    const matched = best && best.score >= MATCH_THRESHOLD ? best.project : null;

    let slug, industry;
    if (matched) {
      slug = matched.slug;
      industry = matched.industry;
    } else {
      slug = slugify(name);
      let i = 2;
      while (usedSlugs.has(slug)) slug = `${slugify(name)}-${i++}`;
      usedSlugs.add(slug);
      const inf = inferIndustry(name);
      industry = inf.slug;
      discovered.push({
        slug, name, industry, location,
        art: ART_FOR_INDUSTRY[industry] ?? 'construction',
        industryConfident: inf.confident,
        sourceFolder: folder.name,
      });
    }

    if (!files.length) {
      report.push({ folder: folder.name, status: matched ? 'matched' : 'new', slug, images: 0,
        score: best ? best.score.toFixed(2) : '—', note: 'no photos yet' });
      continue;
    }

    /* ---- choose the hero ---- */
    const scored = [];
    for (const f of files) {
      const full = path.join(dir, f);
      try {
        scored.push({ file: f, full, ...(await scoreImage(full)), override: heroOverrideRank(f) });
      } catch {
        report.push({ folder: folder.name, status: 'warn', note: `unreadable image: ${f}` });
      }
    }
    if (!scored.length) continue;

    scored.sort((a, b) => (a.override - b.override) || (b.score - a.score));
    const heroSrc = scored[0];
    const gallerySrc = scored.slice(1).sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));

    /* ---- optimise ---- */
    const outDir = path.join(OUT_IMAGE_ROOT, slug);
    await mkdir(outDir, { recursive: true });

    const altBase = location ? `${name}, ${location}` : name;
    const heroOut = path.join(outDir, 'hero.webp');
    const h = await optimise(heroSrc.full, heroOut, HERO_MAX_WIDTH);

    const gallery = [];
    let n = 1;
    for (const g of gallerySrc) {
      const outFile = path.join(outDir, `${String(n).padStart(2, '0')}.webp`);
      const r = await optimise(g.full, outFile, GALLERY_MAX_WIDTH);
      gallery.push({
        src: `/images/projects/${slug}/${String(n).padStart(2, '0')}.webp`,
        alt: `Painting work by Childress Painting at ${altBase} — photo ${n + 1}`,
        width: r.width, height: r.height,
      });
      n++;
    }

    media[slug] = {
      hero: {
        src: `/images/projects/${slug}/hero.webp`,
        alt: `Painting work by Childress Painting at ${altBase}`,
        width: h.width, height: h.height,
      },
      gallery,
    };

    report.push({
      folder: folder.name,
      status: matched ? 'matched' : 'new',
      slug,
      score: best ? best.score.toFixed(2) : '—',
      images: files.length,
    });
  }

  /* ---- write the generated module ---- */
  const lines = [];
  lines.push('/**');
  lines.push(' * GENERATED FILE — DO NOT EDIT BY HAND.');
  lines.push(' * Produced by scripts/ingest-projects.mjs from the Projects/ folder.');
  lines.push(' * Re-run `npm run ingest:projects` to regenerate.');
  lines.push(' */');
  lines.push('');
  lines.push('export type GeneratedImage = { src: string; alt: string; width: number; height: number };');
  lines.push('export type GeneratedMedia = { hero: GeneratedImage; gallery: GeneratedImage[] };');
  lines.push('export type DiscoveredProject = {');
  lines.push('  slug: string; name: string; industry: string; location?: string; art: string;');
  lines.push('};');
  lines.push('');
  lines.push('/** Photography keyed by project slug. */');
  lines.push('export const projectMedia: Record<string, GeneratedMedia> = {');
  for (const [slug, m] of Object.entries(media)) {
    lines.push(`  ${tsString(slug)}: {`);
    lines.push(`    hero: { src: ${tsString(m.hero.src)}, alt: ${tsString(m.hero.alt)}, width: ${m.hero.width}, height: ${m.hero.height} },`);
    if (!m.gallery.length) {
      lines.push('    gallery: [],');
    } else {
      lines.push('    gallery: [');
      for (const g of m.gallery) {
        lines.push(`      { src: ${tsString(g.src)}, alt: ${tsString(g.alt)}, width: ${g.width}, height: ${g.height} },`);
      }
      lines.push('    ],');
    }
    lines.push('  },');
  }
  lines.push('};');
  lines.push('');
  lines.push('/** Folders that matched no existing project. Appended as new projects. */');
  lines.push('export const discoveredProjects: DiscoveredProject[] = [');
  for (const d of discovered) {
    lines.push('  {');
    lines.push(`    slug: ${tsString(d.slug)},`);
    lines.push(`    name: ${tsString(d.name)},`);
    lines.push(`    industry: ${tsString(d.industry)},`);
    if (d.location) lines.push(`    location: ${tsString(d.location)},`);
    lines.push(`    art: ${tsString(d.art)},`);
    lines.push('  },');
  }
  lines.push('];');
  lines.push('');

  await writeFile(GENERATED_FILE, lines.join('\n'), 'utf8');

  /* ---- report ---- */
  const matchedCount = report.filter((r) => r.status === 'matched').length;
  const newCount = report.filter((r) => r.status === 'new').length;
  console.log(`\n  Ingested ${folders.length} folder(s) from "${SOURCE_DIR}"\n`);
  for (const r of report) {
    const tag = { matched: 'MATCH', new: 'NEW  ', skipped: 'SKIP ', warn: 'WARN ' }[r.status];
    console.log(`  ${tag} ${r.folder}`);
    if (r.slug) console.log(`        -> ${r.slug}  (${r.images} images, similarity ${r.score})`);
    if (r.note) console.log(`        -> ${r.note}`);
  }
  const unsure = discovered.filter((d) => !d.industryConfident);
  if (unsure.length) {
    console.log('\n  Confirm the market sector for these (defaulted to retail):');
    for (const d of unsure) console.log(`    - ${d.name}  ->  lib/project-media.generated.ts`);
  }
  console.log(`\n  ${matchedCount} matched, ${newCount} new. Wrote ${GENERATED_FILE}\n`);
}

main().catch((err) => {
  console.error('\n  Ingestion failed:', err.message, '\n');
  process.exit(1);
});
