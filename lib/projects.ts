/**
 * PROJECT PORTFOLIO
 * ===========================================================================
 * SCALABLE ARCHITECTURE — designed to hold hundreds of case studies.
 *
 * HOW IT WORKS
 * ---------------------------------------------------------------------------
 * Each record below is a project. The index page groups them by `industry`,
 * the detail template renders whichever fields are populated, and everything
 * else (nav, sitemap, related projects, filters) derives automatically.
 *
 * HONESTY MODEL
 * ---------------------------------------------------------------------------
 * `detail` controls how much a project page claims:
 *
 *   'experience'  — the client relationship and scope category are confirmed
 *                   from the qualifications document, but project specifics
 *                   (location, dates, square footage) are NOT yet verified.
 *                   The template renders a clean capability page and does not
 *                   invent facts. This is the default for everything today.
 *
 *   'case-study'  — fully verified. Requires `overview`, `location`,
 *                   `completionDate`, and at least one gallery image. The
 *                   template renders the full case study layout.
 *
 * TO PUBLISH A FULL CASE STUDY
 * ---------------------------------------------------------------------------
 * 1. Confirm in writing that the owner or GC permits the project to be named
 *    and photographed.
 * 2. Fill in `location`, `completionDate`, `completionISO`, `overview`,
 *    `challenges`, `solution`, and `results`.
 * 3. Drop photography in /public/images/projects/<slug>/ and populate
 *    `featuredImage` and `gallery` with width and height on every entry.
 * 4. Change `detail` to 'case-study'.
 * 5. Do NOT add contract values, square footage, or statistics that have not
 *    been confirmed by the company.
 * ===========================================================================
 */

import { projectImages, discoveredProjects } from './project-images';
import { projectOverrides } from './project-overrides';

/** A project video. See the note on `heroVideo` in Project. */
export type ProjectVideo = {
  /** H.264 MP4. Required — universal playback. */
  src: string;
  /** VP9 WebM, served first where supported. Optional. */
  webm?: string;
  /** Still frame. Required, so the slot is never empty. */
  poster: string;
  /** What the footage shows, for accessibility and SEO. */
  title: string;
  kind: 'walkthrough' | 'before-after' | 'application' | 'crew' | 'overview';
  /**
   * Drives the aspect container. Phone footage is overwhelmingly portrait, and
   * forcing it into a 16:9 frame either crops the subject or pillarboxes it.
   */
  orientation?: 'portrait' | 'landscape';
  width: number;
  height: number;
  /** Seconds. Displayed in the gallery. */
  duration?: number;
  /** Short line shown beneath the player. */
  caption?: string;
};

export type ProjectImage = {
  /** Public path, e.g. '/images/projects/my-project/01.jpg' */
  src: string;
  /** Describe the work shown — this is read aloud by screen readers. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  slug: string;
  /** Project or client name. */
  name: string;
  /** Must match a slug in lib/industries.ts */
  industry: string;
  /** Must match slugs in lib/services.ts */
  serviceTypes: string[];
  /** One or two sentences describing the painting scope category. */
  scopeSummary: string;
  /** How much this page is allowed to claim. See header. */
  detail: 'experience' | 'case-study';

  /* --- Case-study fields. Populate only when verified. ------------------- */
  location?: string;
  completionDate?: string;
  completionISO?: string;
  overview?: string;
  facts?: { label: string; value: string }[];
  challenges?: string[];
  solution?: string[];
  results?: string[];
  featuredImage?: ProjectImage;
  gallery?: ProjectImage[];
  /**
   * VIDEO
   * `video` is the legacy single-clip field, retained so older records keep
   * working. New media populates `videos`, and `heroVideo` plays behind the
   * project hero where one is supplied.
   *
   * Files live in /public/videos/projects/<folder>/ and are written by
   * `npm run build:images`, which transcodes iPhone HEVC to H.264 and bakes in
   * rotation so portrait footage plays upright in every browser.
   */
  video?: ProjectVideo;
  heroVideo?: ProjectVideo;
  videos?: ProjectVideo[];


  /** Key into components/ui/SectorArt.tsx — drawn artwork used until real
      photography is supplied via `featuredImage`. */
  art: string;
  /** Promote to the homepage featured row. */
  featured?: boolean;
};

const baseProjects: Project[] = [
  /* ---------------------------------------------------------------- RETAIL */
  {
    slug: 'cvs-pharmacy-program',
    name: 'CVS',
    industry: 'retail',
    serviceTypes: ['interior-painting', 'commercial-painting', 'maintenance-painting'],
    scopeSummary:
      'Pharmacy retail interiors and remodel work executed to a national prototype finish standard.',
    detail: 'experience',
    art: 'retail',
    featured: true,
  },
  {
    slug: 'walgreens',
    name: 'Walgreens',
    industry: 'retail',
    serviceTypes: ['interior-painting', 'maintenance-painting'],
    scopeSummary:
      'Retail pharmacy interiors, including remodel work phased around trading hours.',
    detail: 'experience',
    art: 'retail',
  },
  {
    slug: 'ikea',
    name: 'IKEA',
    industry: 'retail',
    serviceTypes: ['interior-painting', 'commercial-painting', 'protective-coatings'],
    scopeSummary:
      'Large-format retail interiors including sales floor, back-of-house, and exposed structure.',
    detail: 'experience',
    art: 'retail',
    featured: true,
  },
  {
    slug: 'aldi',
    name: 'Aldi',
    industry: 'retail',
    serviceTypes: ['interior-painting', 'commercial-painting'],
    scopeSummary:
      'Discount grocery interiors and exteriors delivered to a repeatable store prototype.',
    detail: 'experience',
    art: 'retail',
    featured: true,
  },
  {
    slug: 'ross-dress-for-less',
    name: 'Ross Dress for Less',
    industry: 'retail',
    serviceTypes: ['interior-painting', 'commercial-painting'],
    scopeSummary: 'Off-price retail interiors, sales floor and stockroom finishes.',
    detail: 'experience',
    art: 'retail',
  },
  {
    slug: 'topgolf',
    name: 'Topgolf',
    industry: 'retail',
    serviceTypes: ['interior-painting', 'protective-coatings'],
    scopeSummary:
      'Entertainment retail venue interiors including bays, structure, and high-traffic finishes.',
    detail: 'experience',
    art: 'hospitality',
  },
  {
    slug: 'menards',
    name: 'Menards',
    industry: 'retail',
    serviceTypes: ['interior-painting', 'exterior-painting'],
    scopeSummary: 'Home improvement warehouse retail interiors and exterior coatings.',
    detail: 'experience',
    art: 'retail',
  },
  {
    slug: 'burlington',
    name: 'Burlington',
    industry: 'retail',
    serviceTypes: ['interior-painting', 'commercial-painting'],
    scopeSummary: 'Department store interiors and tenant finish-out work.',
    detail: 'experience',
    art: 'retail',
  },

  /* ----------------------------------------------------------- RESTAURANTS */
  {
    slug: 'torchys-tacos',
    name: "Torchy's Tacos",
    industry: 'restaurants',
    serviceTypes: ['interior-painting', 'commercial-painting', 'protective-coatings'],
    scopeSummary:
      'Fast-casual restaurant finish-outs, decorative front-of-house and washdown-rated kitchen systems.',
    detail: 'experience',
    art: 'restaurant',
    featured: true,
  },
  {
    slug: 'chipotle',
    name: 'Chipotle',
    industry: 'restaurants',
    serviceTypes: ['interior-painting', 'commercial-painting', 'protective-coatings'],
    scopeSummary:
      'Multiple locations, prototype-standard restaurant interiors and kitchen coatings.',
    detail: 'experience',
    art: 'restaurant',
    featured: true,
  },
  {
    slug: 'texas-roadhouse',
    name: 'Texas Roadhouse',
    industry: 'restaurants',
    serviceTypes: ['interior-painting', 'commercial-painting', 'protective-coatings'],
    scopeSummary:
      'Full-service restaurant interiors and exteriors, including decorative and kitchen finishes.',
    detail: 'experience',
    art: 'restaurant',
    featured: true,
  },
  {
    slug: 'longhorn-steakhouse',
    name: 'LongHorn Steakhouse',
    industry: 'restaurants',
    serviceTypes: ['interior-painting', 'commercial-painting'],
    scopeSummary: 'Full-service restaurant interior and exterior finish packages.',
    detail: 'experience',
    art: 'restaurant',
  },
  {
    slug: 'raising-canes',
    name: "Raising Cane's",
    industry: 'restaurants',
    serviceTypes: ['interior-painting', 'commercial-painting', 'protective-coatings'],
    scopeSummary:
      'Quick-service restaurant new builds, dining room, kitchen, and drive-through canopy.',
    detail: 'experience',
    art: 'restaurant',
    featured: true,
  },
  {
    slug: 'gordon-ramsay-steakhouse',
    name: "Gordon Ramsay's Steakhouse",
    industry: 'restaurants',
    serviceTypes: ['interior-painting', 'commercial-painting'],
    scopeSummary:
      'Premium restaurant interiors with decorative and specialty finish scope under close visual scrutiny.',
    detail: 'experience',
    art: 'hospitality',
    featured: true,
  },
  {
    slug: 'freddys-frozen-custard',
    name: "Freddy's Frozen Custard & Steakburgers",
    industry: 'restaurants',
    serviceTypes: ['exterior-painting', 'interior-painting'],
    scopeSummary:
      'Quick-service restaurant interiors, exteriors, and site signage structures.',
    detail: 'experience',
    art: 'restaurant',
  },
  {
    slug: 'culvers',
    name: "Culver's",
    industry: 'restaurants',
    serviceTypes: ['interior-painting', 'commercial-painting'],
    scopeSummary: 'Quick-service restaurant new construction finish packages.',
    detail: 'experience',
    art: 'restaurant',
  },
  {
    slug: 'waffle-house',
    name: 'Waffle House',
    industry: 'restaurants',
    serviceTypes: ['interior-painting', 'maintenance-painting'],
    scopeSummary: 'Restaurant interiors and remodel work in operating locations.',
    detail: 'experience',
    art: 'restaurant',
  },

  /* ------------------------------------------------------------ HEALTHCARE */
  {
    slug: 'discover-vision',
    name: 'Discover Vision',
    industry: 'healthcare',
    serviceTypes: ['interior-painting', 'maintenance-painting', 'commercial-painting'],
    scopeSummary:
      'Specialty eye care clinic interiors, exam, procedure, and public areas phased around patient schedules.',
    detail: 'experience',
    art: 'healthcare',
    featured: true,
  },
  {
    slug: 'independence-surgery-center',
    name: 'Independence Surgery Center',
    industry: 'healthcare',
    serviceTypes: ['maintenance-painting', 'protective-coatings'],
    scopeSummary:
      'Ambulatory surgery center interiors with infection-control-aware phasing and low-odor systems.',
    detail: 'experience',
    art: 'healthcare',
  },
  {
    slug: 'sopra-med-spa',
    name: 'Sopra Med Spa',
    industry: 'healthcare',
    serviceTypes: ['commercial-painting', 'interior-painting'],
    scopeSummary: 'Elective care suite finish-out with guest-facing decorative finishes.',
    detail: 'experience',
    art: 'healthcare',
  },
  {
    slug: 'lillibridge-125',
    name: 'Lillibridge 125',
    industry: 'healthcare',
    serviceTypes: ['commercial-painting', 'maintenance-painting'],
    scopeSummary: 'Medical office building tenant and common-area finish work.',
    detail: 'experience',
    art: 'healthcare',
  },

  /* ------------------------------------------------- SPORTS & ENTERTAINMENT */
  {
    slug: 'kansas-city-chiefs-stadium',
    name: 'Kansas City Chiefs Stadium',
    industry: 'sports-entertainment',
    serviceTypes: ['interior-painting', 'protective-coatings', 'pressure-washing'],
    scopeSummary:
      'Stadium concourse and structural coatings executed within between-event and off-season windows.',
    detail: 'experience',
    art: 'sports',
    featured: true,
  },
  {
    slug: 'kansas-city-royals-stadium',
    name: 'Kansas City Royals Stadium',
    industry: 'sports-entertainment',
    serviceTypes: ['interior-painting', 'protective-coatings', 'pressure-washing'],
    scopeSummary:
      'Ballpark public-area and structural coatings scheduled around the season calendar.',
    detail: 'experience',
    art: 'sports',
    featured: true,
  },

  /* ------------------------------------------------------------- INDUSTRIAL */
  {
    slug: 'georgia-pacific',
    name: 'Georgia-Pacific',
    industry: 'industrial',
    serviceTypes: ['protective-coatings', 'pressure-washing', 'exterior-painting'],
    scopeSummary:
      'Manufacturing facility coatings, structural silver, equipment, and process-area systems.',
    detail: 'experience',
    art: 'industrial',
    featured: true,
  },
  {
    slug: 'ecolab',
    name: 'Ecolab',
    industry: 'industrial',
    serviceTypes: ['protective-coatings', 'pressure-washing'],
    scopeSummary:
      'Processing facility coatings selected against chemical exposure and washdown conditions.',
    detail: 'experience',
    art: 'industrial',
  },
  {
    slug: 'phillips-66',
    name: 'Phillips 66',
    industry: 'industrial',
    serviceTypes: ['protective-coatings', 'pressure-washing', 'exterior-painting'],
    scopeSummary:
      'Industrial protective coatings over silver and concrete in an operating facility.',
    detail: 'experience',
    art: 'industrial',
    featured: true,
  },
  {
    slug: 'ranews',
    name: 'Ranews',
    industry: 'industrial',
    serviceTypes: ['protective-coatings', 'pressure-washing'],
    scopeSummary: 'Industrial facility coatings and structural silver protection.',
    detail: 'experience',
    art: 'industrial',
  },

  /* ------------------------------------------------------------------ OFFICE */
  {
    slug: '4041-central',
    name: '4041 Central',
    industry: 'office',
    serviceTypes: ['commercial-painting', 'maintenance-painting'],
    scopeSummary: 'Multi-tenant office building common areas and suite finish work.',
    detail: 'experience',
    art: 'office',
  },
  {
    slug: 'forbes-73rd',
    name: 'Forbes 73rd',
    industry: 'office',
    serviceTypes: ['commercial-painting', 'interior-painting'],
    scopeSummary: 'Commercial office tenant improvement finishes.',
    detail: 'experience',
    art: 'office',
  },
  {
    slug: 'office-tenant-split',
    name: 'Office Tenant Split',
    industry: 'tenant-improvements',
    serviceTypes: ['commercial-painting', 'interior-painting'],
    scopeSummary:
      'Demising and re-tenanting scope dividing an existing suite into separate tenancies.',
    detail: 'experience',
    art: 'tenant',
  },
  {
    slug: 'triten-real-4950-stilwell',
    name: 'Triten Real, 4950 Stilwell',
    industry: 'office',
    serviceTypes: ['commercial-painting', 'interior-painting'],
    scopeSummary: 'Commercial property finish-out and common-area work.',
    detail: 'experience',
    art: 'office',
  },

  /* -------------------------------------------------------------- GOVERNMENT */
  {
    slug: 'pleasant-hill-police-department',
    name: 'Pleasant Hill Police Department',
    industry: 'government',
    serviceTypes: ['interior-painting', 'maintenance-painting'],
    scopeSummary:
      'Public safety facility interiors phased around 24-hour operations and secure areas.',
    detail: 'experience',
    art: 'government',
    featured: true,
  },
  {
    slug: 'osawatomie-memorial-hall',
    name: 'Osawatomie Memorial Hall',
    industry: 'government',
    serviceTypes: ['interior-painting', 'exterior-painting', 'pressure-washing'],
    scopeSummary: 'Civic assembly building interior and exterior coatings.',
    detail: 'experience',
    art: 'government',
  },
  {
    slug: 'transfer-station-olathe',
    name: 'Transfer Station, Olathe',
    industry: 'government',
    serviceTypes: ['protective-coatings', 'pressure-washing'],
    scopeSummary: 'Municipal public works facility coatings in a heavy-service environment.',
    detail: 'experience',
    art: 'industrial',
  },

  /* --------------------------------------------------------------- EDUCATION */
  {
    slug: 'blue-valley-school-district',
    name: 'Blue Valley School District',
    industry: 'education',
    serviceTypes: ['interior-painting', 'exterior-painting', 'maintenance-painting'],
    scopeSummary:
      'District-wide painting program across elementary, middle, and high school campuses, executed within the summer window.',
    detail: 'experience',
    art: 'education',
    featured: true,
  },
  {
    slug: 'shawnee-mission-school-district',
    name: 'Shawnee Mission School District',
    industry: 'education',
    serviceTypes: ['interior-painting', 'exterior-painting', 'maintenance-painting'],
    scopeSummary:
      'District-wide painting program across elementary, middle, and high school campuses on the academic calendar.',
    detail: 'experience',
    art: 'education',
    featured: true,
  },
  {
    slug: 'jccc-regnier',
    name: 'JCCC Regnier',
    industry: 'education',
    serviceTypes: ['interior-painting', 'maintenance-painting'],
    scopeSummary: 'Higher-education building interiors phased around the academic schedule.',
    detail: 'experience',
    art: 'education',
  },

  /* ---------------------------------------------------------------- AVIATION */
  {
    slug: 'kansas-city-airport',
    name: 'Kansas City International Airport',
    industry: 'aviation',
    serviceTypes: ['maintenance-painting', 'interior-painting', 'commercial-painting'],
    scopeSummary:
      'Terminal and concession finish work performed under badging and escort requirements, in overnight windows around live passenger operations.',
    detail: 'experience',
    art: 'aviation',
    featured: true,
  },
  {
    slug: 'meat-mitch-bbq-kc-airport',
    name: 'Meat Mitch BBQ, KC Airport',
    industry: 'aviation',
    serviceTypes: ['commercial-painting', 'protective-coatings'],
    scopeSummary:
      'Airport concession restaurant finish-out with kitchen-rated coatings, delivered in overnight access windows.',
    detail: 'experience',
    art: 'restaurant',
  },
];

/* ------------------------------------------------------------------ helpers */

/**
 * MERGE: hand-authored records + ingested photography + discovered folders.
 * ---------------------------------------------------------------------------
 * `baseProjects` above is the curated record and stays the source of truth for
 * anything factual. The generated module supplies only photography plus any
 * project folders that matched nothing here.
 *
 * Everything downstream — the index, sector filters, industry pages, related
 * rails, counts, and the sitemap — reads `projects`, so ingesting photos or
 * discovering a new folder updates every surface at once.
 */
const photographed: Project[] = baseProjects.map((p) => {
  const media = projectImages[p.slug];
  const withMedia = media
    ? { ...p, featuredImage: media.hero, gallery: media.gallery, videos: media.videos }
    : p;
  return { ...withMedia, ...projectOverrides[p.slug] };
});

/** Folders with no match become projects, with no invented detail. */
const fromFolders: Project[] = discoveredProjects
  .filter((d) => !photographed.some((p) => p.slug === d.slug))
  .map((d) => {
    const media = projectImages[d.slug];
    return {
      slug: d.slug,
      name: d.name,
      industry: d.industry,
      serviceTypes: [],
      scopeSummary: 'Project details and scope information will be added soon.',
      detail: 'experience' as const,
      location: d.location,
      art: d.art,
      ...(media ? { featuredImage: media.hero, gallery: media.gallery, videos: media.videos } : {}),
      // The curated layer always wins over anything inferred from a folder name.
      ...projectOverrides[d.slug],
    };
  });

/**
 * CANONICAL PROJECT LIST
 * ---------------------------------------------------------------------------
 * `slug` is the identity of a project. Deduplicating here means no upstream
 * data error can ever render the same project twice, in any grid, on any page.
 * The first record for a slug wins, so a curated entry always beats a
 * folder-discovered one.
 *
 * Everything downstream reads this array, so the fix applies to the index,
 * filters, counts, related rails, industry pages, location pages, the homepage,
 * and the sitemap at once.
 */
export const projects: Project[] = (() => {
  const bySlug = new Map<string, Project>();
  for (const project of [...photographed, ...fromFolders]) {
    if (bySlug.has(project.slug)) continue;
    bySlug.set(project.slug, project);
  }
  return [...bySlug.values()];
})();

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);

export const projectsByIndustry = (industry: string) =>
  projects.filter((p) => p.industry === industry);

export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Projects that actually have photography, richest gallery first. This is what
 * the homepage Featured Work section shows: a project with forty photographs
 * makes a better lead image than one with two.
 */
export const photographedProjects = projects
  .filter((p) => Boolean(p.featuredImage))
  .sort((a, b) => (b.gallery?.length ?? 0) - (a.gallery?.length ?? 0));

/** Projects sharing an industry, excluding the current one. */
export const relatedProjects = (slug: string, limit = 3) => {
  const current = getProject(slug);
  if (!current) return [];
  const sameIndustry = projects.filter((p) => p.industry === current.industry && p.slug !== slug);
  if (sameIndustry.length >= limit) return sameIndustry.slice(0, limit);
  const others = projects.filter(
    (p) => p.industry !== current.industry && p.slug !== slug,
  );
  return [...sameIndustry, ...others].slice(0, limit);
};

/**
 * @deprecated Use `projectsByIndustry`.
 *
 * The v2 data layer keyed projects by `market`; v3 keys them by `industry`.
 * This alias is kept so that a lingering import from a previous version — most
 * commonly `app/markets/[slug]/page.tsx` — resolves and compiles rather than
 * failing the build with "has no exported member 'projectsByMarket'".
 *
 * The seven surviving v2 market slugs are identical to their v3 industry
 * slugs, so this is a straight pass-through, not a lossy mapping.
 */
export const projectsByMarket = projectsByIndustry;

/** Counts used by the projects index. Computed — never hard-coded. */
export const projectCountByIndustry = projects.reduce<Record<string, number>>((acc, p) => {
  acc[p.industry] = (acc[p.industry] ?? 0) + 1;
  return acc;
}, {});

/**
 * The strongest photographed project in a sector, used as that sector's hero
 * image.
 *
 * This is deliberately preferred over stock photography. A real Childress
 * project in the retail sector is both more credible than a stock storefront
 * and honest by construction: it is genuinely our work, genuinely in that
 * sector. Sectors with no photographed project fall back to the drawn sector
 * artwork, which is brand-designed rather than a placeholder.
 */
export const sectorHero = (industrySlug: string) =>
  photographedProjects.find((p) => p.industry === industrySlug)?.featuredImage;

/**
 * Sectors where we hold no photographed project yet borrow from the closest
 * sector we do. Education borrows a government building, hospitality borrows a
 * restaurant interior, and so on: the setting is genuinely comparable, and it
 * is still our own work rather than stock.
 *
 * These appear only on sector cards and sector heroes, never on a project page,
 * so nothing is ever presented as a job it was not.
 */
const SECTOR_STAND_IN: Record<string, string> = {
  education: 'government',
  hospitality: 'restaurants',
  'tenant-improvements': 'office',
  'new-construction': 'industrial',
};

/** A photograph for every sector, falling back to the closest related sector. */
export const sectorImage = (industrySlug: string) =>
  sectorHero(industrySlug) ??
  (SECTOR_STAND_IN[industrySlug] ? sectorHero(SECTOR_STAND_IN[industrySlug]) : undefined);

/**
 * LIGHTWEIGHT CARD DATA
 * ---------------------------------------------------------------------------
 * The projects index renders through a client component (it filters), so every
 * field handed to it is serialized into the RSC flight payload AND rehydrated
 * in the browser. Passing full project records meant shipping every gallery
 * array, every video, and every case-study field to render a grid of covers,
 * which is why /projects was slow.
 *
 * This projection carries only what a card draws. Heavy media stays on the
 * individual project route, where it is actually used.
 */
export type ProjectCardData = {
  slug: string;
  name: string;
  industry: string;
  location?: string;
  scopeSummary: string;
  serviceCount: number;
  art: string;
  detail: Project['detail'];
  completionDate?: string;
  /** Cover only. Never the gallery. */
  cover?: ProjectImage;
};

export const toCardData = (p: Project): ProjectCardData => ({
  slug: p.slug,
  name: p.name,
  industry: p.industry,
  location: p.location,
  scopeSummary: p.scopeSummary,
  serviceCount: p.serviceTypes.length,
  art: p.art,
  detail: p.detail,
  completionDate: p.completionDate,
  cover: p.featuredImage,
});

/** Every project as card data, for the index and any other filtered grid. */
export const projectCards: ProjectCardData[] = projects.map(toCardData);

/* ============================================================== MAP DATA == */

import { projectAddresses, isMappable, formatAddress } from './project-addresses';

export type MappedProject = ProjectCardData & {
  address?: string;
  fullAddress: string;
  city: string;
  state: string;
  stateName: string;
  latitude: number;
  longitude: number;
  addressStatus: string;
};

/**
 * Projects with a publicly displayable, verified location.
 *
 * Built from the canonical `projects` array, so a project can never appear
 * twice on the map, and a project merged or removed upstream disappears from
 * the map automatically. Only high-confidence verified and client-supplied
 * addresses qualify; see lib/project-addresses.ts.
 */
export const mappedProjects: MappedProject[] = projects
  .filter((p) => isMappable(p.slug))
  .map((p) => {
    const a = projectAddresses[p.slug];
    return {
      ...toCardData(p),
      address: a.address,
      fullAddress: formatAddress(p.slug) ?? `${a.city}, ${a.state}`,
      city: a.city,
      state: a.state,
      stateName: a.stateName,
      latitude: a.latitude as number,
      longitude: a.longitude as number,
      addressStatus: a.status,
    };
  });

/** States represented on the map, for the geographic filter. */
export const mappedStates = [...new Set(mappedProjects.map((p) => p.stateName))].sort();
