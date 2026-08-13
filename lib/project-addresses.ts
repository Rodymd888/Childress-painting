/**
 * PROJECT ADDRESSES
 * ===========================================================================
 * Verified location data, keyed by the canonical `project.slug`. This extends
 * the existing project record rather than duplicating it: the map, the project
 * pages, and the location pages all read the same canonical projects array and
 * look up addresses here.
 *
 * WHAT GETS A PUBLIC PIN
 * Only `verified` + high confidence, or `userProvided`. Everything else is
 * recorded but withheld. Accuracy matters more than pin count: a wrong pin on a
 * contractor's portfolio is worse than no pin.
 *
 * COORDINATES ARE STORED, NEVER GEOCODED AT RUNTIME
 * A visitor opening the map performs zero geocoding requests. Coordinates are
 * resolved during data preparation and committed here. See
 * `scripts/geocode-projects.mjs` to refine or add them.
 *
 * PRIVACY
 * Private residences are never mapped, regardless of how well we know the
 * address. Government and military entries use only the ordinary published
 * facility address, never access, security, or layout detail.
 *
 * ADDING A PROJECT LATER
 * Add one entry below with address, coordinates, status, and confidence. The
 * map picks it up automatically; no component needs editing.
 */

export type AddressStatus =
  | 'verified'
  | 'userProvided'
  | 'probable'
  | 'needsVerification'
  | 'unknown';

export type AddressConfidence = 'high' | 'medium' | 'low';

export type ProjectAddress = {
  address?: string;
  city: string;
  state: string;
  stateName: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  status: AddressStatus;
  confidence: AddressConfidence;
  /** Internal provenance. Not rendered publicly. */
  addressSourceName?: string;
  addressSourceURL?: string;
  addressVerifiedDate?: string;
  /** Internal note: conflicts, caveats, why something is withheld. */
  note?: string;
};

export const projectAddresses: Record<string, ProjectAddress> = {
  /* ================================================== CLIENT-SUPPLIED ==== */

  'billy-goat-industries': {
    address: "1803 SW Jefferson St",
    city: "Lee's Summit",
    state: 'MO',
    stateName: 'Missouri',
    postalCode: '64082',
    latitude: 38.8664,
    longitude: -94.4025,
    status: 'userProvided',
    confidence: 'high',
    addressSourceName: 'Supplied by Childress Painting',
    addressVerifiedDate: '2026-08-13',
  },

  'us-army-reserve': {
    address: '1325 N 78th St',
    city: 'Kansas City',
    state: 'KS',
    stateName: 'Kansas',
    postalCode: '66112',
    latitude: 39.1219,
    longitude: -94.7461,
    status: 'userProvided',
    confidence: 'high',
    addressSourceName: 'Supplied by Childress Painting',
    addressVerifiedDate: '2026-08-13',
    note: 'Ordinary published facility address only. No access, security, or layout information is recorded or displayed.',
  },

  'meadowbrook-animal-hospital': {
    address: '10923 N Summit St',
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    postalCode: '64155',
    latitude: 39.2733,
    longitude: -94.5836,
    status: 'userProvided',
    confidence: 'high',
    addressSourceName: 'Supplied by Childress Painting',
    addressVerifiedDate: '2026-08-13',
  },

  'health-and-beauty-tech': {
    address: '1 Kansas City Blvd',
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    postalCode: '64153',
    latitude: 39.2976,
    longitude: -94.7139,
    status: 'userProvided',
    confidence: 'high',
    addressSourceName: 'Supplied by Childress Painting (Kansas City International Airport)',
    addressVerifiedDate: '2026-08-13',
    note: 'Tenant concession inside the KCI terminal. The project files do not identify a more precise public tenant location, so the airport navigation address is used as instructed.',
  },

  /* ======================================================= RESEARCHED ==== */

  'kansas-city-chiefs-stadium': {
    address: '1 Arrowhead Dr',
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    postalCode: '64129',
    latitude: 39.04889,
    longitude: -94.48389,
    status: 'verified',
    confidence: 'high',
    addressSourceName: 'Kansas City Chiefs official site (chiefs.com/stadium)',
    addressSourceURL: 'https://www.chiefs.com/stadium/',
    addressVerifiedDate: '2026-08-13',
    note: 'Coordinates taken from the published stadium record rather than estimated.',
  },

  'kansas-city-royals-stadium': {
    address: '1 Royal Way',
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    postalCode: '64129',
    latitude: 39.0517,
    longitude: -94.4803,
    status: 'verified',
    confidence: 'high',
    addressSourceName: 'Kauffman Stadium, Truman Sports Complex (mlb.com/royals)',
    addressSourceURL: 'https://www.mlb.com/royals/ballpark',
    addressVerifiedDate: '2026-08-13',
  },

  'kansas-city-airport': {
    address: '1 Kansas City Blvd',
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    postalCode: '64153',
    latitude: 39.2976,
    longitude: -94.7139,
    status: 'verified',
    confidence: 'high',
    addressSourceName: 'Kansas City International Airport (flykci.com)',
    addressSourceURL: 'https://www.flykci.com/',
    addressVerifiedDate: '2026-08-13',
  },

  'meat-mitch-bbq-kc-airport': {
    address: '1 Kansas City Blvd',
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    postalCode: '64153',
    latitude: 39.2976,
    longitude: -94.7139,
    status: 'verified',
    confidence: 'high',
    addressSourceName: 'Concession inside Kansas City International Airport terminal',
    addressSourceURL: 'https://www.flykci.com/',
    addressVerifiedDate: '2026-08-13',
    note: 'Concession within the KCI terminal. The airport address is the correct public location; no more precise public tenant address is published.',
  },

  'jccc-regnier': {
    address: '12345 College Blvd',
    city: 'Overland Park',
    state: 'KS',
    stateName: 'Kansas',
    postalCode: '66210',
    latitude: 38.9186,
    longitude: -94.7047,
    status: 'verified',
    confidence: 'high',
    addressSourceName: 'Johnson County Community College, official Regnier Center building page',
    addressSourceURL: 'https://www.jccc.edu/about/campus/maps/buildings/rc.html',
    addressVerifiedDate: '2026-08-13',
  },

  /* ==================================== RESEARCHED, WITHHELD FROM MAP ==== */

  'pleasant-hill-police-department': {
    address: '300 Commercial St',
    city: 'Pleasant Hill',
    state: 'MO',
    stateName: 'Missouri',
    postalCode: '64080',
    latitude: 38.7869,
    longitude: -94.2691,
    status: 'verified',
    confidence: 'high',
    addressSourceName: 'City of Pleasant Hill, Missouri (official police department page)',
    addressSourceURL: 'https://www.pleasanthill.com/police',
    addressVerifiedDate: '2026-08-13',
    note: 'CONFLICT RESOLVED: third-party directories list "300 East Commercial Street". The official city page publishes "300 Commercial St", which is used here per the official-source rule.',
  },

  /* ================================== KNOWN CITY ONLY, NO STREET ADDRESS = */

  'gould-evans': {
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    status: 'needsVerification',
    confidence: 'low',
    note: 'Architecture practice with several offices. The specific studio painted is not identified in the project files.',
  },
  'mckeevers': {
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    status: 'needsVerification',
    confidence: 'low',
    note: 'McKeever\u2019s operates multiple Kansas City-area grocery locations. Which store was painted is not recorded.',
  },
  'stop-n-shop': {
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    status: 'needsVerification',
    confidence: 'low',
  },
  'brookshire-renovation': {
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    status: 'needsVerification',
    confidence: 'low',
  },
  'union-event-venue': {
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    status: 'needsVerification',
    confidence: 'low',
  },
  'kcfd-fire-station-15': {
    city: 'Kansas City',
    state: 'MO',
    stateName: 'Missouri',
    status: 'needsVerification',
    confidence: 'low',
    note: 'Kansas City Fire Department station numbering should be confirmed against the official KCMO station list before mapping.',
  },
  'shawnee-town-government-buildings': {
    city: 'Shawnee',
    state: 'KS',
    stateName: 'Kansas',
    status: 'needsVerification',
    confidence: 'low',
    note: 'Refers to multiple municipal buildings rather than one address. Per the rules, a multi-building scope does not get a single arbitrary pin.',
  },
  'transfer-station-olathe': {
    city: 'Olathe',
    state: 'KS',
    stateName: 'Kansas',
    status: 'needsVerification',
    confidence: 'low',
  },
  'osawatomie-memorial-hall': {
    city: 'Osawatomie',
    state: 'KS',
    stateName: 'Kansas',
    status: 'needsVerification',
    confidence: 'low',
  },

  /* ======================================== PRIVATE, NEVER TO BE MAPPED == */

  'evan-talon-custom-homes': {
    city: 'Overland Park',
    state: 'KS',
    stateName: 'Kansas',
    status: 'unknown',
    confidence: 'low',
    note: 'PRIVATE RESIDENCE. Never map. Residential jobsites are private addresses and are excluded on principle, not for lack of information.',
  },
  'custom-wood-staining-residential-home': {
    city: 'Overland Park',
    state: 'KS',
    stateName: 'Kansas',
    status: 'unknown',
    confidence: 'low',
    note: 'PRIVATE RESIDENCE. Never map.',
  },
};

/* ------------------------------------------------------------------ RULES */

/** Private residential work is excluded from the map on principle. */
const NEVER_MAP = new Set(['evan-talon-custom-homes', 'custom-wood-staining-residential-home']);

/**
 * A project earns a public pin only when it is user-supplied, or verified at
 * high confidence, and has stored coordinates.
 */
export function isMappable(slug: string): boolean {
  if (NEVER_MAP.has(slug)) return false;
  const a = projectAddresses[slug];
  if (!a || a.latitude === undefined || a.longitude === undefined) return false;
  return a.status === 'userProvided' || (a.status === 'verified' && a.confidence === 'high');
}

export const getAddress = (slug: string) => projectAddresses[slug];

/** Single-line public address, or undefined when there is no street address. */
export function formatAddress(slug: string): string | undefined {
  const a = projectAddresses[slug];
  if (!a) return undefined;
  const street = a.address ? `${a.address}, ` : '';
  const zip = a.postalCode ? ` ${a.postalCode}` : '';
  return `${street}${a.city}, ${a.state}${zip}`;
}
