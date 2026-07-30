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

export type ProjectImage = {
  /** Public path, e.g. '/images/projects/my-project/01.jpg' */
  src: string;
  /** Describe the work shown — this is read aloud by screen readers. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectVideo = {
  src: string;
  poster?: string;
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
  video?: ProjectVideo;

  /** Key into components/ui/SectorArt.tsx — drawn artwork used until real
      photography is supplied via `featuredImage`. */
  art: string;
  /** Promote to the homepage featured row. */
  featured?: boolean;
};

export const projects: Project[] = [
  /* ---------------------------------------------------------------- RETAIL */
  {
    slug: 'cvs-pharmacy-program',
    name: 'CVS',
    industry: 'retail',
    serviceTypes: ['commercial-interior-painting', 'tenant-finish-outs', 'occupied-renovations'],
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
    serviceTypes: ['commercial-interior-painting', 'occupied-renovations'],
    scopeSummary:
      'Retail pharmacy interiors, including remodel work phased around trading hours.',
    detail: 'experience',
    art: 'retail',
  },
  {
    slug: 'ikea',
    name: 'IKEA',
    industry: 'retail',
    serviceTypes: ['commercial-interior-painting', 'new-construction', 'high-performance-coatings'],
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
    serviceTypes: ['commercial-interior-painting', 'new-construction'],
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
    serviceTypes: ['commercial-interior-painting', 'tenant-finish-outs'],
    scopeSummary: 'Off-price retail interiors, sales floor and stockroom finishes.',
    detail: 'experience',
    art: 'retail',
  },
  {
    slug: 'topgolf',
    name: 'Topgolf',
    industry: 'retail',
    serviceTypes: ['commercial-interior-painting', 'high-performance-coatings'],
    scopeSummary:
      'Entertainment retail venue interiors including bays, structure, and high-traffic finishes.',
    detail: 'experience',
    art: 'hospitality',
  },
  {
    slug: 'menards',
    name: 'Menards',
    industry: 'retail',
    serviceTypes: ['commercial-interior-painting', 'commercial-exterior-painting'],
    scopeSummary: 'Home improvement warehouse retail interiors and exterior coatings.',
    detail: 'experience',
    art: 'retail',
  },
  {
    slug: 'burlington',
    name: 'Burlington',
    industry: 'retail',
    serviceTypes: ['commercial-interior-painting', 'tenant-finish-outs'],
    scopeSummary: 'Department store interiors and tenant finish-out work.',
    detail: 'experience',
    art: 'retail',
  },

  /* ----------------------------------------------------------- RESTAURANTS */
  {
    slug: 'torchys-tacos',
    name: "Torchy's Tacos",
    industry: 'restaurants',
    serviceTypes: ['commercial-interior-painting', 'tenant-finish-outs', 'high-performance-coatings'],
    scopeSummary:
      'Fast-casual restaurant finish-outs — decorative front-of-house and washdown-rated kitchen systems.',
    detail: 'experience',
    art: 'restaurant',
    featured: true,
  },
  {
    slug: 'chipotle',
    name: 'Chipotle',
    industry: 'restaurants',
    serviceTypes: ['commercial-interior-painting', 'tenant-finish-outs', 'high-performance-coatings'],
    scopeSummary:
      'Multiple locations — prototype-standard restaurant interiors and kitchen coatings.',
    detail: 'experience',
    art: 'restaurant',
    featured: true,
  },
  {
    slug: 'texas-roadhouse',
    name: 'Texas Roadhouse',
    industry: 'restaurants',
    serviceTypes: ['commercial-interior-painting', 'new-construction', 'high-performance-coatings'],
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
    serviceTypes: ['commercial-interior-painting', 'new-construction'],
    scopeSummary: 'Full-service restaurant interior and exterior finish packages.',
    detail: 'experience',
    art: 'restaurant',
  },
  {
    slug: 'raising-canes',
    name: "Raising Cane's",
    industry: 'restaurants',
    serviceTypes: ['commercial-interior-painting', 'new-construction', 'high-performance-coatings'],
    scopeSummary:
      'Quick-service restaurant new builds — dining room, kitchen, and drive-through canopy.',
    detail: 'experience',
    art: 'restaurant',
    featured: true,
  },
  {
    slug: 'gordon-ramsay-steakhouse',
    name: "Gordon Ramsay's Steakhouse",
    industry: 'restaurants',
    serviceTypes: ['commercial-interior-painting', 'tenant-finish-outs'],
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
    serviceTypes: ['commercial-exterior-painting', 'commercial-interior-painting'],
    scopeSummary:
      'Quick-service restaurant interiors, exteriors, and site signage structures.',
    detail: 'experience',
    art: 'restaurant',
  },
  {
    slug: 'culvers',
    name: "Culver's",
    industry: 'restaurants',
    serviceTypes: ['commercial-interior-painting', 'new-construction'],
    scopeSummary: 'Quick-service restaurant new construction finish packages.',
    detail: 'experience',
    art: 'restaurant',
  },
  {
    slug: 'waffle-house',
    name: 'Waffle House',
    industry: 'restaurants',
    serviceTypes: ['commercial-interior-painting', 'occupied-renovations'],
    scopeSummary: 'Restaurant interiors and remodel work in operating locations.',
    detail: 'experience',
    art: 'restaurant',
  },

  /* ------------------------------------------------------------ HEALTHCARE */
  {
    slug: 'discover-vision',
    name: 'Discover Vision',
    industry: 'healthcare',
    serviceTypes: ['commercial-interior-painting', 'occupied-renovations', 'tenant-finish-outs'],
    scopeSummary:
      'Specialty eye care clinic interiors — exam, procedure, and public areas phased around patient schedules.',
    detail: 'experience',
    art: 'healthcare',
    featured: true,
  },
  {
    slug: 'independence-surgery-center',
    name: 'Independence Surgery Center',
    industry: 'healthcare',
    serviceTypes: ['occupied-renovations', 'high-performance-coatings'],
    scopeSummary:
      'Ambulatory surgery center interiors with infection-control-aware phasing and low-odor systems.',
    detail: 'experience',
    art: 'healthcare',
  },
  {
    slug: 'sopra-med-spa',
    name: 'Sopra Med Spa',
    industry: 'healthcare',
    serviceTypes: ['tenant-finish-outs', 'commercial-interior-painting'],
    scopeSummary: 'Elective care suite finish-out with guest-facing decorative finishes.',
    detail: 'experience',
    art: 'healthcare',
  },
  {
    slug: 'lillibridge-125',
    name: 'Lillibridge 125',
    industry: 'healthcare',
    serviceTypes: ['tenant-finish-outs', 'occupied-renovations'],
    scopeSummary: 'Medical office building tenant and common-area finish work.',
    detail: 'experience',
    art: 'healthcare',
  },

  /* ------------------------------------------------- SPORTS & ENTERTAINMENT */
  {
    slug: 'kansas-city-chiefs-stadium',
    name: 'Kansas City Chiefs Stadium',
    industry: 'sports-entertainment',
    serviceTypes: ['commercial-interior-painting', 'high-performance-coatings', 'surface-preparation'],
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
    serviceTypes: ['commercial-interior-painting', 'high-performance-coatings', 'surface-preparation'],
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
    serviceTypes: ['high-performance-coatings', 'surface-preparation', 'commercial-exterior-painting'],
    scopeSummary:
      'Manufacturing facility coatings — structural silver, equipment, and process-area systems.',
    detail: 'experience',
    art: 'industrial',
    featured: true,
  },
  {
    slug: 'ecolab',
    name: 'Ecolab',
    industry: 'industrial',
    serviceTypes: ['high-performance-coatings', 'surface-preparation'],
    scopeSummary:
      'Processing facility coatings selected against chemical exposure and washdown conditions.',
    detail: 'experience',
    art: 'industrial',
  },
  {
    slug: 'phillips-66',
    name: 'Phillips 66',
    industry: 'industrial',
    serviceTypes: ['high-performance-coatings', 'surface-preparation', 'commercial-exterior-painting'],
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
    serviceTypes: ['high-performance-coatings', 'surface-preparation'],
    scopeSummary: 'Industrial facility coatings and structural silver protection.',
    detail: 'experience',
    art: 'industrial',
  },

  /* ------------------------------------------------------------------ OFFICE */
  {
    slug: '4041-central',
    name: '4041 Central',
    industry: 'office',
    serviceTypes: ['tenant-finish-outs', 'occupied-renovations'],
    scopeSummary: 'Multi-tenant office building common areas and suite finish work.',
    detail: 'experience',
    art: 'office',
  },
  {
    slug: 'forbes-73rd',
    name: 'Forbes 73rd',
    industry: 'office',
    serviceTypes: ['tenant-finish-outs', 'commercial-interior-painting'],
    scopeSummary: 'Commercial office tenant improvement finishes.',
    detail: 'experience',
    art: 'office',
  },
  {
    slug: 'office-tenant-split',
    name: 'Office Tenant Split',
    industry: 'tenant-improvements',
    serviceTypes: ['tenant-finish-outs', 'commercial-interior-painting'],
    scopeSummary:
      'Demising and re-tenanting scope dividing an existing suite into separate tenancies.',
    detail: 'experience',
    art: 'tenant',
  },
  {
    slug: 'triten-real-4950-stilwell',
    name: 'Triten Real — 4950 Stilwell',
    industry: 'office',
    serviceTypes: ['tenant-finish-outs', 'commercial-interior-painting'],
    scopeSummary: 'Commercial property finish-out and common-area work.',
    detail: 'experience',
    art: 'office',
  },

  /* -------------------------------------------------------------- GOVERNMENT */
  {
    slug: 'pleasant-hill-police-department',
    name: 'Pleasant Hill Police Department',
    industry: 'government',
    serviceTypes: ['commercial-interior-painting', 'occupied-renovations'],
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
    serviceTypes: ['commercial-interior-painting', 'commercial-exterior-painting', 'surface-preparation'],
    scopeSummary: 'Civic assembly building interior and exterior coatings.',
    detail: 'experience',
    art: 'government',
  },
  {
    slug: 'transfer-station-olathe',
    name: 'Transfer Station — Olathe',
    industry: 'government',
    serviceTypes: ['high-performance-coatings', 'surface-preparation'],
    scopeSummary: 'Municipal public works facility coatings in a heavy-service environment.',
    detail: 'experience',
    art: 'industrial',
  },

  /* --------------------------------------------------------------- EDUCATION */
  {
    slug: 'blue-valley-school-district',
    name: 'Blue Valley School District',
    industry: 'education',
    serviceTypes: ['commercial-interior-painting', 'commercial-exterior-painting', 'occupied-renovations'],
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
    serviceTypes: ['commercial-interior-painting', 'commercial-exterior-painting', 'occupied-renovations'],
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
    serviceTypes: ['commercial-interior-painting', 'occupied-renovations'],
    scopeSummary: 'Higher-education building interiors phased around the academic schedule.',
    detail: 'experience',
    art: 'education',
  },

  /* ---------------------------------------------------------------- AVIATION */
  {
    slug: 'kansas-city-airport',
    name: 'Kansas City International Airport',
    industry: 'aviation',
    serviceTypes: ['occupied-renovations', 'commercial-interior-painting', 'tenant-finish-outs'],
    scopeSummary:
      'Terminal and concession finish work performed under badging and escort requirements, in overnight windows around live passenger operations.',
    detail: 'experience',
    art: 'aviation',
    featured: true,
  },
  {
    slug: 'meat-mitch-bbq-kc-airport',
    name: 'Meat Mitch BBQ — KC Airport',
    industry: 'aviation',
    serviceTypes: ['tenant-finish-outs', 'high-performance-coatings'],
    scopeSummary:
      'Airport concession restaurant finish-out with kitchen-rated coatings, delivered in overnight access windows.',
    detail: 'experience',
    art: 'restaurant',
  },
];

/* ------------------------------------------------------------------ helpers */

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);

export const projectsByIndustry = (industry: string) =>
  projects.filter((p) => p.industry === industry);

export const featuredProjects = projects.filter((p) => p.featured);

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

/** Counts used by the projects index. Computed — never hard-coded. */
export const projectCountByIndustry = projects.reduce<Record<string, number>>((acc, p) => {
  acc[p.industry] = (acc[p.industry] ?? 0) + 1;
  return acc;
}, {});
