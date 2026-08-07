#!/usr/bin/env node
/**
 * PROJECT IMAGE BUILDER  —  run by hand, never during `next build`
 * ===========================================================================
 *   npm run build:images -- "/path/to/Projects"
 *
 * Reads a folder of per-project photo folders, optimises every image, copies it
 * into `public/images/projects/<web-safe-folder>/` with clean filenames, and
 * writes `lib/project-images.ts`.
 *
 * WHY THIS IS NOT PART OF THE BUILD
 * An earlier version ran automatically before every build. When the source
 * folder reached the repository incomplete — GitHub's web uploader silently
 * drops files past its limits — the script regenerated an EMPTY data file and
 * erased perfectly good committed image references. Photography then vanished
 * from the deployed site even though the files were sitting in `public/`.
 *
 * So: this runs only when you ask it to. `lib/project-images.ts` and the files
 * under `public/images/projects/` are committed, static, and self-sufficient.
 * A deploy can never regenerate or wipe them.
 * ===========================================================================
 */

import { readdir, mkdir, writeFile, stat, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = process.argv[2] || 'Projects';
const OUT_ROOT = 'public/images/projects';
const DATA_FILE = 'lib/project-images.ts';

const MAX_HERO_WIDTH = 2400;
const MAX_GALLERY_WIDTH = 1800;
/** Encoding steps down until the result is meaningfully smaller than source. */
const QUALITY_LADDER = [86, 82, 78, 74, 70];
const REQUIRED_SAVING = 0.03;
const MATCH_THRESHOLD = 0.62;

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

const US_STATES = {
  al:'Alabama',ak:'Alaska',az:'Arizona',ar:'Arkansas',ca:'California',co:'Colorado',
  ct:'Connecticut',de:'Delaware',fl:'Florida',ga:'Georgia',hi:'Hawaii',id:'Idaho',
  il:'Illinois',in:'Indiana',ia:'Iowa',ks:'Kansas',ky:'Kentucky',la:'Louisiana',
  me:'Maine',md:'Maryland',ma:'Massachusetts',mi:'Michigan',mn:'Minnesota',
  ms:'Mississippi',mo:'Missouri',mt:'Montana',ne:'Nebraska',nv:'Nevada',
  nh:'New Hampshire',nj:'New Jersey',nm:'New Mexico',ny:'New York',
  nc:'North Carolina',nd:'North Dakota',oh:'Ohio',ok:'Oklahoma',or:'Oregon',
  pa:'Pennsylvania',ri:'Rhode Island',sc:'South Carolina',sd:'South Dakota',
  tn:'Tennessee',tx:'Texas',ut:'Utah',vt:'Vermont',va:'Virginia',wa:'Washington',
  wv:'West Virginia',wi:'Wisconsin',wy:'Wyoming',dc:'District of Columbia',
};

const INDUSTRY_KEYWORDS = [
  ['residential', ['residential','residence','homeowner','private home','custom wood staining']],
  ['aviation', ['airport','terminal','hangar','aviation','airfield']],
  ['sports-entertainment', ['stadium','arena','ballpark','chiefs','royals','topgolf','cinema','theater','theatre','bowling','event venue','event center','convention','ballroom']],
  ['education', ['school','isd','university','college','campus','academy','elementary','middle','high school','district']],
  ['healthcare', ['hospital','clinic','medical','health','dental','surgery','vision','orthodon','urgent care','med spa']],
  ['hospitality', ['hotel','inn','suites','resort','marriott','hilton','hyatt','holiday','motel','lodge']],
  ['government', ['city of','county','municipal','courthouse','police','fire station','fire department','kcfd','government','city hall','civic','federal','library','post office','transfer station']],
  ['industrial', ['plant','warehouse','distribution','manufactur','industrial','georgia-pacific','phillips','refinery','mill','logistics','foundry','ecolab']],
  ['restaurants', ['taco','grill','pizza','chipotle','cane','roadhouse','restaurant','kitchen','brewery','torchy','steakhouse','waffle','burger','chicken','cafe','coffee','starbucks','dunkin','subway','wendy','mcdonald','panera','whataburger','sonic','bbq','barbecue','diner','bistro','panda','custard','culver']],
  ['office', ['office','tower','corporate','bank','credit union','headquarters']],
  ['retail', ['walmart','target','cvs','walgreen','dollar','ross','burlington','ikea','home depot','lowes','menards','carmax','aldi','kroger','best buy','maxx','marshalls','petco','autozone','take 5','store','market','mall','shop','retail','pharmacy','supercenter','outlet','grocery']],
];

const ART_FOR_INDUSTRY = {
  residential:'interior', retail:'retail', restaurants:'restaurants', healthcare:'healthcare',
  education:'education', industrial:'industrial', government:'government', office:'office',
  hospitality:'hospitality', 'sports-entertainment':'sports', aviation:'aviation',
  'tenant-improvements':'tenant', 'new-construction':'construction',
};

/* ------------------------------------------------------------ NORMALISING */

function normalise(input) {
  return input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/&/g, ' and ').replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(llc|inc|ltd|co|corp|the)\b/g, ' ')
    .trim().replace(/\s+/g, ' ');
}

/** Web-safe: lowercase, hyphenated, no spaces, punctuation, or parentheses. */
function slugify(input) {
  return normalise(input).replace(/\s+/g, '-');
}

function similarity(a, b) {
  const A = normalise(a).replace(/\s/g, ''), B = normalise(b).replace(/\s/g, '');
  if (!A.length || !B.length) return 0;
  if (A === B) return 1;
  const grams = (s) => { const m = new Map();
    for (let i = 0; i < s.length - 1; i++) { const g = s.slice(i, i+2); m.set(g, (m.get(g)||0)+1); }
    return m; };
  const ma = grams(A), mb = grams(B);
  let hits = 0;
  for (const [g, n] of ma) hits += Math.min(n, mb.get(g) || 0);
  return (2 * hits) / (A.length - 1 + B.length - 1);
}

const clean = (s) => s.replace(/\s+/g, ' ').trim();

function looksLikeLocation(s) {
  const t = s.trim().replace(/\.$/, '');
  const last = t.split(/[,\s]+/).pop()?.toLowerCase() ?? '';
  if (US_STATES[last]) return true;
  return Object.values(US_STATES).some((v) => t.toLowerCase().endsWith(v.toLowerCase()));
}

function formatLocation(s) {
  const t = clean(s).replace(/[.,]$/, '');
  if (!t) return undefined;
  const bits = t.split(',').map((b) => b.trim()).filter(Boolean);
  if (bits.length >= 2) {
    const st = bits[bits.length-1].toLowerCase().replace(/\./g, '');
    return US_STATES[st] ? `${bits.slice(0,-1).join(', ')}, ${US_STATES[st]}` : bits.join(', ');
  }
  const w = t.split(/\s+/);
  const st = w[w.length-1].toLowerCase().replace(/\./g, '');
  if (w.length > 1 && US_STATES[st]) return `${w.slice(0,-1).join(' ')}, ${US_STATES[st]}`;
  return t;
}

/** "Torchy's Tacos- Kansas City" -> { name, location } */
function parseFolderName(folder) {
  const raw = folder.trim().replace(/\s+/g, ' ');

  const paren = raw.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (paren && looksLikeLocation(paren[2])) {
    return { name: clean(paren[1]), location: formatLocation(paren[2]) };
  }

  // Split on the LAST spaced dash. The required space AFTER the dash is what
  // keeps "Triten Real-4950 Stilwell - Kansas City" intact.
  const sep = /\s*[-–—]\s+/g;
  let idx = -1, len = 0, m;
  while ((m = sep.exec(raw))) { idx = m.index; len = m[0].length; }
  if (idx > 0) {
    const head = raw.slice(0, idx), tail = raw.slice(idx + len);
    if (head.trim() && tail.trim()) return { name: clean(head), location: formatLocation(tail) };
  }

  const parts = raw.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 3 && looksLikeLocation(parts.slice(-2).join(', ')))
    return { name: clean(parts.slice(0,-2).join(', ')), location: formatLocation(parts.slice(-2).join(', ')) };
  if (parts.length === 2 && looksLikeLocation(parts[1]))
    return { name: clean(parts[0]), location: formatLocation(parts[1]) };

  return { name: clean(raw), location: undefined };
}

/**
 * The public folder name: project name + city, both web-safe.
 *   "Torchy's Tacos" + "Fort Worth, Texas" -> torchys-tacos-fort-worth
 * Parentheticals are dropped so paths stay short and readable.
 */
function imageFolderName(name, location) {
  const bare = name.replace(/\([^)]*\)/g, ' ');
  const city = location ? location.split(',')[0] : '';
  return slugify(city ? `${bare} ${city}` : bare);
}

function inferIndustry(name) {
  const n = normalise(name);
  for (const [slug, words] of INDUSTRY_KEYWORDS)
    if (words.some((w) => n.includes(normalise(w)))) return { slug, confident: true };
  return { slug: 'retail', confident: false };
}

async function readExistingProjects() {
  const src = await import('node:fs/promises').then((fs) => fs.readFile('lib/projects.ts', 'utf8'));
  const re = new RegExp(
    String.raw`slug:\s*(['"])(.*?)\1,\s*\n\s*name:\s*(['"])(.*?)\3,\s*\n\s*industry:\s*(['"])(.*?)\5`, 'g');
  const out = []; let m;
  while ((m = re.exec(src))) out.push({ slug: m[2], name: m[4].replace(/\\(['"])/g, '$1'), industry: m[6] });
  return out;
}

/* -------------------------------------------------------------- IMAGE WORK */

function heroOverrideRank(f) {
  const b = path.parse(f).name.toLowerCase();
  if (/^(hero|cover|main|featured)\b/.test(b)) return 0;
  if (/^0*1\b/.test(b)) return 1;
  return 99;
}

async function scoreImage(file) {
  const img = sharp(file).rotate();
  const meta = await img.metadata();
  const stats = await img.stats();
  const w = meta.width ?? 0, h = meta.height ?? 0;
  return { width: w, height: h,
    // resolution 45%, detail/contrast 35%, landscape 20%
    score: 0.45 * Math.min((w*h)/12_000_000, 1) + 0.35 * Math.min((stats.entropy ?? 0)/8, 1) + 0.20 * (w >= h ? 1 : 0) };
}

/** Always writes JPEG, so every path ends in a predictable `.jpg`. */
async function optimise(srcFile, destFile, maxWidth) {
  const { size: sourceBytes } = await stat(srcFile);
  const base = sharp(srcFile).rotate()
    .resize({ width: maxWidth, withoutEnlargement: true }); // never upscale, never stretch

  let chosen = null;
  for (const quality of QUALITY_LADDER) {
    const r = await base.clone().jpeg({ quality, mozjpeg: true, progressive: true })
      .toBuffer({ resolveWithObject: true });
    chosen = { ...r.info, buffer: r.data };
    if (r.data.length <= sourceBytes * (1 - REQUIRED_SAVING)) break;
  }
  await writeFile(destFile, chosen.buffer);
  return { width: chosen.width, height: chosen.height, bytes: chosen.buffer.length };
}

const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/* ------------------------------------------------------------------- MAIN */

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.log(`\n  No "${SOURCE_DIR}" folder found.`);
    console.log('  Pass the path explicitly:  npm run build:images -- "/path/to/Projects"\n');
    process.exitCode = 1;
    return;
  }

  const existing = await readExistingProjects();
  const folders = (await readdir(SOURCE_DIR, { withFileTypes: true }))
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name));

  await rm(OUT_ROOT, { recursive: true, force: true });
  await mkdir(OUT_ROOT, { recursive: true });

  const media = {}, discovered = [], report = [];
  const usedSlugs = new Set(existing.map((p) => p.slug));
  const usedFolders = new Set();

  for (const folder of folders) {
    const dir = path.join(SOURCE_DIR, folder.name);
    const files = (await readdir(dir))
      .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()) && !f.startsWith('.'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const { name, location } = parseFolderName(folder.name);

    let best = null;
    for (const p of existing) {
      const s = Math.max(similarity(name, p.name), similarity(name, p.slug));
      if (!best || s > best.score) best = { project: p, score: s };
    }
    const matched = best && best.score >= MATCH_THRESHOLD ? best.project : null;

    let slug, industry;
    if (matched) {
      slug = matched.slug; industry = matched.industry;
    } else {
      slug = slugify(name);
      let i = 2; while (usedSlugs.has(slug)) slug = `${slugify(name)}-${i++}`;
      usedSlugs.add(slug);
      const inf = inferIndustry(name);
      industry = inf.slug;
      discovered.push({ slug, name, industry, location,
        art: ART_FOR_INDUSTRY[industry] ?? 'construction',
        confident: inf.confident });
    }

    if (!files.length) {
      report.push({ folder: folder.name, status: matched ? 'matched' : 'new', slug, images: 0 });
      continue;
    }

    /* Web-safe public folder name, guaranteed unique.
       For a matched project the CANONICAL project slug is used rather than the
       source folder text, so a typo in the folder ("Custad") never leaks into a
       public URL. New projects fall back to the derived name. */
    const city = location ? location.split(',')[0] : '';
    const baseFolder = matched
      ? slugify(city ? `${matched.slug} ${city}` : matched.slug)
      : imageFolderName(name, location);
    let webFolder = baseFolder;
    let n2 = 2; while (usedFolders.has(webFolder)) webFolder = `${baseFolder}-${n2++}`;
    usedFolders.add(webFolder);

    const scored = [];
    for (const f of files) {
      try { scored.push({ file: f, full: path.join(dir, f), ...(await scoreImage(path.join(dir, f))), override: heroOverrideRank(f) }); }
      catch { report.push({ folder: folder.name, status: 'warn', note: `unreadable: ${f}` }); }
    }
    if (!scored.length) continue;

    scored.sort((a, b) => (a.override - b.override) || (b.score - a.score));
    const hero = scored[0];
    const rest = scored.slice(1).sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));

    const outDir = path.join(OUT_ROOT, webFolder);
    await mkdir(outDir, { recursive: true });

    const where = location ? `${name}, ${location}` : name;
    const h = await optimise(hero.full, path.join(outDir, 'hero.jpg'), MAX_HERO_WIDTH);

    const gallery = [];
    let i = 1;
    for (const g of rest) {
      const file = `${String(i).padStart(2, '0')}.jpg`;
      const r = await optimise(g.full, path.join(outDir, file), MAX_GALLERY_WIDTH);
      gallery.push({ src: `/images/projects/${webFolder}/${file}`,
        alt: `Painting work by Childress Painting at ${where} — photo ${i + 1}`,
        width: r.width, height: r.height });
      i++;
    }

    media[slug] = {
      folder: webFolder,
      hero: { src: `/images/projects/${webFolder}/hero.jpg`,
        alt: `Painting work by Childress Painting at ${where}`,
        width: h.width, height: h.height },
      gallery,
    };
    report.push({ folder: folder.name, status: matched ? 'matched' : 'new', slug, webFolder, images: files.length });
  }

  /* ---------------------------------------------------------- write data */
  const L = [];
  L.push('/**');
  L.push(' * PROJECT IMAGES — static, committed, and self-sufficient.');
  L.push(' * ---------------------------------------------------------------------------');
  L.push(' * Every path below points at a real file committed under');
  L.push(' * public/images/projects/. Nothing regenerates this at build time, so a');
  L.push(' * deploy can never wipe it.');
  L.push(' *');
  L.push(' * Produced by scripts/build-project-images.mjs. To add or replace photos, run');
  L.push(' * `npm run build:images -- "/path/to/Projects"` locally and commit the result,');
  L.push(' * or drop files into public/images/projects/<folder>/ and add the entry here');
  L.push(' * by hand — width and height must match the real file to avoid layout shift.');
  L.push(' */');
  L.push('');
  L.push('export type ProjectImageRef = { src: string; alt: string; width: number; height: number };');
  L.push('export type ProjectImageSet = { folder: string; hero: ProjectImageRef; gallery: ProjectImageRef[] };');
  L.push('export type DiscoveredProject = { slug: string; name: string; industry: string; location?: string; art: string };');
  L.push('');
  L.push('/** Photography keyed by project slug. */');
  L.push('export const projectImages: Record<string, ProjectImageSet> = {');
  for (const [slug, m] of Object.entries(media)) {
    L.push(`  ${q(slug)}: {`);
    L.push(`    folder: ${q(m.folder)},`);
    L.push(`    hero: { src: ${q(m.hero.src)}, alt: ${q(m.hero.alt)}, width: ${m.hero.width}, height: ${m.hero.height} },`);
    if (!m.gallery.length) L.push('    gallery: [],');
    else {
      L.push('    gallery: [');
      for (const g of m.gallery)
        L.push(`      { src: ${q(g.src)}, alt: ${q(g.alt)}, width: ${g.width}, height: ${g.height} },`);
      L.push('    ],');
    }
    L.push('  },');
  }
  L.push('};');
  L.push('');
  L.push('/** Folders that matched no existing project, added as new projects. */');
  L.push('export const discoveredProjects: DiscoveredProject[] = [');
  for (const d of discovered) {
    L.push('  {');
    L.push(`    slug: ${q(d.slug)},`);
    L.push(`    name: ${q(d.name)},`);
    L.push(`    industry: ${q(d.industry)},`);
    if (d.location) L.push(`    location: ${q(d.location)},`);
    L.push(`    art: ${q(d.art)},`);
    L.push('  },');
  }
  L.push('];');
  L.push('');
  await writeFile(DATA_FILE, L.join('\n'), 'utf8');

  const withPhotos = report.filter((r) => r.images > 0);
  const totalImages = withPhotos.reduce((s, r) => s + r.images, 0);
  console.log(`\n  Source folders: ${folders.length}`);
  for (const r of report.filter((x) => x.images > 0)) {
    console.log(`  ${r.status === 'new' ? 'NEW  ' : 'MATCH'} ${r.folder}`);
    console.log(`        -> ${r.slug}   public/images/projects/${r.webFolder}/   ${r.images} images`);
  }
  const unsure = discovered.filter((d) => !d.confident);
  if (unsure.length) {
    console.log('\n  Confirm market sector (defaulted to retail):');
    for (const d of unsure) console.log(`    - ${d.name}  ->  lib/project-overrides.ts`);
  }
  console.log(`\n  ${withPhotos.length} projects with photography, ${totalImages} images written.`);
  console.log(`  Wrote ${DATA_FILE}\n`);
}

main().catch((e) => { console.error('\n  Failed:', e.message, '\n'); process.exit(1); });
