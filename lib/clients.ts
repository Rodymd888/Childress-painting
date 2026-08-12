/**
 * REPRESENTATIVE CLIENTS
 * ---------------------------------------------------------------------------
 * Source: Childress Painting Commercial Qualifications & Experience (2026).
 *
 * These are representative commercial project experience of the Childress
 * Painting leadership team. Brand names are used descriptively to identify
 * project experience — no endorsement or affiliation is implied, and no logos
 * are reproduced.
 *
 * TO ADD A CLIENT: append to the relevant group. `marquee: true` promotes it
 * to the homepage "Trusted By" band — reserve that for nationally recognizable
 * names only.
 */

export type Client = {
  name: string;
  /** Optional qualifier, e.g. 'Multiple locations'. */
  note?: string;
  /** Promote to the homepage trust band. */
  marquee?: boolean;
};

export type ClientGroup = {
  slug: string;
  title: string;
  /** Matching industry slug in lib/industries.ts, when one exists. */
  industry?: string;
  blurb: string;
  clients: Client[];
};

export const clientGroups: ClientGroup[] = [
  {
    slug: 'retail',
    title: 'Retail',
    industry: 'retail',
    blurb:
      'National chains and regional operators, new stores, remodels, and rollouts held to a brand standard and a grand-opening date.',
    clients: [
      { name: 'CVS', marquee: true },
      { name: 'Walgreens', marquee: true },
      { name: 'IKEA', marquee: true },
      { name: 'Aldi', marquee: true },
      { name: 'Ross Dress for Less', marquee: true },
      { name: 'Menards' },
      { name: 'Burlington' },
      { name: 'Family Dollar' },
      { name: 'Stop N Shop' },
      { name: 'Alo Yoga' },
      { name: 'Topgolf', marquee: true },
      { name: 'Ralph Lauren', note: 'Outlet Mall KC' },
      { name: "McKeever's Market & Eatery" },
      { name: 'Made In KC' },
    ],
  },
  {
    slug: 'restaurants',
    title: 'Restaurants',
    industry: 'restaurants',
    blurb:
      'Quick-service, fast-casual, and full-service concepts. Tight footprints, hard opening dates, and finishes that have to survive a commercial kitchen.',
    clients: [
      { name: 'Chipotle', note: 'Multiple Locations', marquee: true },
      { name: 'Texas Roadhouse', marquee: true },
      { name: "Raising Cane's", marquee: true },
      { name: "Torchy's Tacos", marquee: true },
      { name: 'LongHorn Steakhouse' },
      { name: "Culver's" },
      { name: 'Waffle House' },
      { name: "Freddy's Frozen Custard & Steakburgers" },
      { name: 'Dunkin Donuts' },
      { name: 'Subway' },
      { name: "Jersey Mike's" },
      { name: "Gordon Ramsay's Steakhouse", marquee: true },
      { name: "Zaxby's" },
      { name: "McDonald's" },
      { name: "Jimmy John's" },
      { name: 'Taco Bell' },
      { name: "Wendy's" },
      { name: 'Meat Mitch BBQ', note: 'KC Airport' },
    ],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    industry: 'healthcare',
    blurb:
      'Surgery centers, specialty clinics, and medical office developments where infection control and department uptime govern the schedule.',
    clients: [
      { name: 'Independence Surgery Center' },
      { name: 'Discover Vision' },
      { name: 'Sopra Med Spa' },
      { name: 'Dr. Ashley Deacy Medical Development' },
      { name: 'Lillibridge 125' },
    ],
  },
  {
    slug: 'sports-entertainment',
    title: 'Sports & Entertainment',
    industry: 'sports-entertainment',
    blurb:
      'Venue work performed in the narrow windows between events, seasons, and public access.',
    clients: [
      { name: 'Kansas City Chiefs Stadium', marquee: true },
      { name: 'Kansas City Royals Stadium', marquee: true },
    ],
  },
  {
    slug: 'government',
    title: 'Government & Municipal',
    industry: 'government',
    blurb:
      'Public facilities with procurement documentation, prevailing-wage familiarity, and inspection sign-off built into the schedule.',
    clients: [
      { name: 'Pleasant Hill Police Department' },
      { name: 'Transfer Station', note: 'Olathe' },
      { name: 'Osawatomie Memorial Hall' },
      { name: 'VFW' },
    ],
  },
  {
    slug: 'commercial-industrial',
    title: 'Commercial & Industrial',
    industry: 'industrial',
    blurb:
      'Plants, distribution facilities, and multi-tenant commercial properties, coatings selected for the substrate and the service environment.',
    clients: [
      { name: 'Georgia-Pacific', marquee: true },
      { name: 'Ecolab', marquee: true },
      { name: 'Phillips 66', marquee: true },
      { name: 'Payne & Jones' },
      { name: 'Helm' },
      { name: 'Forbes 73rd' },
      { name: '4041 Central' },
      { name: '1920 Foxridge' },
      { name: 'Arrow Circle' },
      { name: 'SWL Expansion' },
      { name: 'Office Tenant Split' },
      { name: 'Enterprise Drive' },
      { name: 'Triten Real', note: '4950 Stilwell' },
      { name: 'Denton 11th & 12th' },
      { name: 'Polo Legends' },
      { name: 'Trembly White Readiness' },
      { name: 'Ranews' },
      { name: 'NCADC' },
      { name: 'SYN Lawn Mid America Golf' },
    ],
  },
];

/** Names promoted to the homepage trust band, in display order. */
export const marqueeClients: string[] = [
  'CVS',
  'Walgreens',
  'IKEA',
  'Chipotle',
  'Texas Roadhouse',
  'Kansas City Chiefs Stadium',
  'Kansas City Royals Stadium',
  'Georgia-Pacific',
  "Raising Cane's",
  'Aldi',
  'Phillips 66',
  'Topgolf',
  "Torchy's Tacos",
  'Ecolab',
  'Ross Dress for Less',
];

/**
 * EDUCATION PARTNERS
 * District-level painting partnerships across two Kansas City-area districts.
 */
export type District = {
  name: string;
  levels: { label: string; schools: string[] }[];
};

export const educationDistricts: District[] = [
  {
    name: 'Blue Valley School District',
    levels: [
      {
        label: 'Elementary',
        schools: [
          'Aspen Grove', 'Blue River', 'Cedar Hills', 'Cottonwood Point', 'Harmony',
          'Heartland', 'Indian Valley', 'Lakewood', 'Leawood', 'Liberty View',
          'Mission Trail', 'Morse', 'Oak Hill', 'Overland Trail', 'Prairie Star',
          'Stanley', 'Stilwell', 'Sunrise Point', 'Sunset Ridge', 'Timber Creek',
          'Valley Park', 'Wolf Springs',
        ],
      },
      {
        label: 'Middle',
        schools: [
          'Aubry Bend', 'Blue Valley', 'Harmony', 'Lakewood', 'Leawood',
          'Overland Trail', 'Oxford', 'Pleasant Ridge', 'Prairie Star', 'Wolf Springs',
        ],
      },
      {
        label: 'High',
        schools: [
          'Blue Valley Academy', 'Blue Valley High', 'Blue Valley North',
          'Blue Valley Northwest', 'Blue Valley Southwest', 'Blue Valley West',
        ],
      },
    ],
  },
  {
    name: 'Shawnee Mission School District',
    levels: [
      {
        label: 'Elementary',
        schools: [
          'Apache Innovative School', 'Belinder', 'Bluejacket-Flint', 'Briarwood',
          'Broken Arrow', 'Brookridge', 'Brookwood', 'Christa McAuliffe', 'Comanche',
          'Corinth', 'Crestview', 'East Antioch', 'Highlands', 'John Diemer',
          'Lenexa Hills', 'Merriam Park', 'Mill Creek', 'Nieman', 'Oak Park-Carpenter',
          'Overland Park', 'Pawnee', 'Prairie', 'Ray Marsh', 'Rhein Benninghoven',
          'Rising Star', 'Roesland', 'Rosehill', 'Rushton', 'Santa Fe Trail',
          'Shawanoe', 'Sunflower', 'Tomahawk', 'Trailwood', 'Westwood View',
        ],
      },
      {
        label: 'Middle',
        schools: ['Hocker Grove', 'Indian Hills', 'Indian Woods', 'Trailridge', 'Westridge'],
      },
      {
        label: 'High',
        schools: [
          'Shawnee Mission East', 'Shawnee Mission North', 'Shawnee Mission Northwest',
          'Shawnee Mission South', 'Shawnee Mission West', 'Horizons',
        ],
      },
    ],
  },
];

export const additionalEducationPartners = [
  'Osawatomie School',
  'Burlington Independent School',
  'JCCC Regnier',
];

/** Total schools across both districts — computed, never hard-coded. */
export const totalSchools = educationDistricts.reduce(
  (sum, d) => sum + d.levels.reduce((s, l) => s + l.schools.length, 0),
  0,
);

export const totalClients = clientGroups.reduce((sum, g) => sum + g.clients.length, 0);

/**
 * MAJOR CLIENT BRANDS
 * ---------------------------------------------------------------------------
 * The recognisable names, presented as a clean wordmark grid and linked to the
 * project they relate to where one exists. That link is what turns a logo wall
 * into a route into the portfolio.
 *
 * ON LOGO ARTWORK
 * These render as typographic wordmarks, not as third-party logo files. We do
 * not hold licences to reproduce these marks, and inventing logo files would
 * both look wrong and misrepresent the relationship. If cleared artwork is
 * supplied later, drop the files into /public/images/clients/<slug>.svg and set
 * `logo` below; the grid swaps automatically with no layout change.
 *
 * The section is headed "Who We Have Painted For" and carries a descriptive-use
 * disclaimer. No endorsement, sponsorship, or partnership is implied.
 */
export type ClientBrand = {
  name: string;
  /** Sector label shown beneath the wordmark. */
  sector: string;
  /** Project slug to link to, when we have published one. */
  project?: string;
  /** Industry slug fallback when there is no single project to point at. */
  industry?: string;
  /** Path to cleared logo artwork, when supplied. */
  logo?: string;
};

export const clientBrands: ClientBrand[] = [
  { name: 'CVS Pharmacy', sector: 'Retail', project: 'cvs-pharmacy-program' },
  { name: 'Walgreens', sector: 'Retail', project: 'walgreens' },
  { name: 'Walmart', sector: 'Retail', industry: 'retail' },
  { name: 'IKEA', sector: 'Retail', project: 'ikea' },
  { name: 'The Home Depot', sector: 'Retail', industry: 'retail' },
  { name: 'Dollar General', sector: 'Retail', industry: 'retail' },
  { name: 'Take 5 Oil Change', sector: 'Retail', industry: 'retail' },
  { name: 'Aldi', sector: 'Grocery', project: 'aldi' },
  { name: 'Ross Dress for Less', sector: 'Retail', industry: 'retail' },
  { name: 'Burlington', sector: 'Retail', industry: 'retail' },
  { name: 'Family Dollar', sector: 'Retail', industry: 'retail' },
  { name: 'Menards', sector: 'Retail', industry: 'retail' },
  { name: 'CarMax', sector: 'Automotive Retail', industry: 'retail' },
  { name: "Torchy's Tacos", sector: 'Restaurants', project: 'torchys-tacos' },
  { name: 'Chipotle', sector: 'Restaurants', project: 'chipotle' },
  { name: 'Texas Roadhouse', sector: 'Restaurants', project: 'texas-roadhouse' },
  { name: 'LongHorn Steakhouse', sector: 'Restaurants', industry: 'restaurants' },
  { name: "Raising Cane's", sector: 'Restaurants', project: 'raising-canes' },
  { name: 'Topgolf', sector: 'Entertainment', project: 'topgolf' },
  { name: 'Georgia-Pacific', sector: 'Industrial', project: 'georgia-pacific' },
  { name: 'Phillips 66', sector: 'Industrial', project: 'phillips-66' },
  { name: 'Kansas City Chiefs', sector: 'Sports Venues', project: 'kansas-city-chiefs-stadium' },
  { name: 'Kansas City Royals', sector: 'Sports Venues', project: 'kansas-city-royals-stadium' },
];
