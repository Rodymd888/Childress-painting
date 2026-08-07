/**
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every hard fact the site renders lives here so it can be verified and
 * updated in one place. Values below are taken from the 2026 Commercial
 * Qualifications & Experience document.
 */

export const company = {
  name: 'Childress Painting',
  legalName: 'Childress Painting DFW LLC',
  tagline: 'Quality painting. Professional results.',
  positioning: 'Commercial painting professionals since 1984.',

  /* Primary line — Dallas–Fort Worth. */
  phone: '972-863-1919',
  phoneHref: '+19728631919',

  email: 'contact@childresspaintingtx.com',
  estimatingEmail: 'contact@childresspaintingtx.com',
  careersEmail: 'contact@childresspaintingtx.com',

  /* Headquarters. `address` is kept as the canonical single address for
     structured data and the footer; `offices` below drives anywhere both
     locations should appear. */
  address: {
    street: '8601 Sovereign Row',
    city: 'Dallas',
    region: 'TX',
    postalCode: '75247',
    country: 'US',
  },

  /** Commercial painting experience dating to 1984. */
  heritageYear: 1984,

  hours: 'Mo-Fr 07:00-17:00',

  /** Day, night, and occupied-site shifts per the capability statement. */
  scheduling: 'Day, night & occupied-site shifts',

  coatingSystems: 'Sherwin-Williams',
  warranty: '2-year workmanship warranty',
  safety: 'OSHA-compliant crews',

  serviceArea: {
    primary: 'Texas',
    secondary: ['Kansas', 'Missouri'],
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/childress-painting',
    facebook: '',
    instagram: '',
  },
} as const;

/**
 * OFFICES
 * ---------------------------------------------------------------------------
 * Two operating locations. Texas is the primary market; the Grandview, MO
 * office serves the established Kansas City-area work in Kansas and Missouri.
 *
 * TO ADD A THIRD OFFICE: append a record. The footer, contact page, service
 * areas page, and LocalBusiness structured data all read from this array.
 */
export const offices = [
  {
    id: 'dallas',
    label: 'Dallas – Fort Worth',
    role: 'Headquarters',
    street: '8601 Sovereign Row',
    city: 'Dallas',
    region: 'TX',
    postalCode: '75247',
    country: 'US',
    phone: '972-863-1919',
    phoneHref: '+19728631919',
    email: 'contact@childresspaintingtx.com',
    covers: 'Texas, primary market',
  },
  {
    id: 'kansas-city',
    label: 'Kansas City',
    role: 'Regional Office',
    street: '14000 Century Lane',
    city: 'Grandview',
    region: 'MO',
    postalCode: '64030',
    country: 'US',
    phone: '816-966-1701',
    phoneHref: '+18169661701',
    email: 'contact@childresspaintingtx.com',
    covers: 'Kansas & Missouri',
  },
] as const;

/** Headline figures from the capability statement. Verified — do not inflate. */
export const companyStats = [
  { value: '40+', label: 'Years Leadership Experience', detail: 'Commercial painting since 1984' },
  { value: '3', label: 'States Served', detail: 'Texas primary · Kansas & Missouri' },
  { value: '13', label: 'Market Sectors', detail: 'Retail through sports & entertainment' },
  { value: '2yr', label: 'Workmanship Warranty', detail: 'Written, on every project' },
] as const;

/** Leadership, per the qualifications document. */
export const leadership = [
  {
    name: 'Rody Diyoka',
    role: 'Business Development & Preconstruction',
    focus:
      'Handles takeoff, scope review, product verification, and bid coordination with general contractors and owners.',
  },
  {
    name: 'Joey Battisto',
    role: 'Operations & Project Management',
    focus:
      'Owns the schedule and the superintendent relationship: sequencing, manpower commitments, and punch closeout.',
  },
  {
    name: 'Cole Childress',
    role: 'Field Operations',
    focus:
      'Runs crews in the field, manpower loading, daily production, and the standard of finish that leaves the site.',
  },
] as const;

/** Canonical production origin. Override with NEXT_PUBLIC_SITE_URL on Vercel. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.childresspaintingtx.com'
).replace(/\/$/, '');

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; blurb?: string }[];
};

export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Commercial Painting', href: '/services/commercial-painting', blurb: 'Our core business since 1984.' },
      { label: 'Residential Painting', href: '/services/residential-painting', blurb: 'Commercial discipline, brought home.' },
      { label: 'Industrial Painting', href: '/services/industrial-painting', blurb: 'Plants, steel, and heavy service.' },
      { label: 'Interior Painting', href: '/services/interior-painting', blurb: 'Walls, ceilings, trim, and doors.' },
      { label: 'Exterior Painting', href: '/services/exterior-painting', blurb: 'Tilt-wall, stucco, masonry, siding.' },
      { label: 'Epoxy Floor Coatings', href: '/services/epoxy-floor-coatings', blurb: 'Resinous floors over tested slabs.' },
      { label: 'Protective Coatings', href: '/services/protective-coatings', blurb: 'High-performance systems.' },
      { label: 'Cabinet Refinishing', href: '/services/cabinet-painting-refinishing', blurb: 'Shop-quality sprayed finishes.' },
      { label: 'Custom Wood Staining', href: '/services/custom-wood-staining', blurb: 'Stain-grade doors and millwork.' },
      { label: 'Decorative Finishes', href: '/services/decorative-finishes', blurb: 'Feature walls and specialty systems.' },
      { label: 'Line Striping', href: '/services/line-striping', blurb: 'Lots, warehouses, safety marking.' },
      { label: 'Drywall Repair', href: '/services/drywall-repair', blurb: 'Patches that disappear.' },
      { label: 'Pressure Washing', href: '/services/pressure-washing', blurb: 'Cleaning matched to the substrate.' },
      { label: 'Caulking & Sealants', href: '/services/caulking-sealants', blurb: 'The joints that keep water out.' },
      { label: 'Maintenance Painting', href: '/services/maintenance-painting', blurb: 'Occupied-building programs.' },
      { label: 'Color Consulting', href: '/services/color-consulting', blurb: 'Decide once, on the wall.' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Retail', href: '/industries/retail' },
      { label: 'Restaurants', href: '/industries/restaurants' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'Education', href: '/industries/education' },
      { label: 'Industrial', href: '/industries/industrial' },
      { label: 'Government & Municipal', href: '/industries/government' },
      { label: 'Commercial Office', href: '/industries/office' },
      { label: 'Hospitality', href: '/industries/hospitality' },
      { label: 'Sports & Entertainment', href: '/industries/sports-entertainment' },
      { label: 'Aviation', href: '/industries/aviation' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Clients', href: '/clients' },
  {
    label: 'Company',
    href: '/about',
    children: [
      { label: 'About Childress', href: '/about', blurb: 'Four decades of professional painting.' },
      { label: 'Our Process', href: '/process', blurb: 'Preconstruction through closeout, in eight steps.' },
      { label: 'Why Childress', href: '/why-childress', blurb: 'What general contractors actually buy.' },
      { label: 'Safety & Quality', href: '/safety-quality', blurb: 'OSHA-compliant crews and QC inspections.' },
      { label: 'Service Areas', href: '/service-areas', blurb: 'Texas primary; Kansas and Missouri secondary.' },
      { label: 'Careers', href: '/careers', blurb: 'Field and project management roles.' },
      { label: 'Subcontractors', href: '/subcontractors', blurb: 'Prequalify to work with us.' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  {
    heading: 'Services',
    links: [
      { label: 'Commercial Painting', href: '/services/commercial-painting' },
      { label: 'Residential Painting', href: '/services/residential-painting' },
      { label: 'Industrial Painting', href: '/services/industrial-painting' },
      { label: 'Interior Painting', href: '/services/interior-painting' },
      { label: 'Exterior Painting', href: '/services/exterior-painting' },
      { label: 'Epoxy Floor Coatings', href: '/services/epoxy-floor-coatings' },
      { label: 'Protective Coatings', href: '/services/protective-coatings' },
      { label: 'Maintenance Painting', href: '/services/maintenance-painting' },
      { label: 'All Services', href: '/services' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Retail', href: '/industries/retail' },
      { label: 'Restaurants', href: '/industries/restaurants' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'Education', href: '/industries/education' },
      { label: 'Industrial', href: '/industries/industrial' },
      { label: 'Government & Municipal', href: '/industries/government' },
      { label: 'Sports & Entertainment', href: '/industries/sports-entertainment' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Our Process', href: '/process' },
      { label: 'Why Childress', href: '/why-childress' },
      { label: 'Projects', href: '/projects' },
      { label: 'Representative Clients', href: '/clients' },
      { label: 'Safety & Quality', href: '/safety-quality' },
      { label: 'Service Areas', href: '/service-areas' },
    ],
  },
  {
    heading: 'Work With Us',
    links: [
      { label: 'Request a Bid', href: '/request-bid' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Subcontractors', href: '/subcontractors' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
];

/** Metro areas worked from the Dallas base. */
export const serviceAreas = [
  {
    region: 'Dallas County',
    note: 'Home base, 8601 Sovereign Row, Dallas',
    cities: [
      'Dallas', 'Irving', 'Garland', 'Mesquite', 'Richardson', 'Carrollton',
      'Grand Prairie', 'DeSoto', 'Cedar Hill', 'Farmers Branch',
    ],
  },
  {
    region: 'Tarrant County',
    note: 'Daily coverage',
    cities: [
      'Fort Worth', 'Arlington', 'Grapevine', 'Southlake', 'Keller', 'Bedford',
      'Euless', 'North Richland Hills', 'Mansfield', 'Azle',
    ],
  },
  {
    region: 'Collin & Denton Counties',
    note: 'Daily coverage',
    cities: [
      'Plano', 'Frisco', 'McKinney', 'Allen', 'Denton', 'Lewisville',
      'Prosper', 'Little Elm', 'The Colony', 'Flower Mound',
    ],
  },
  {
    region: 'Texas, Statewide',
    note: 'Travel crews for multi-site programs',
    cities: [
      'Austin', 'Houston', 'San Antonio', 'Waco', 'Tyler', 'Abilene',
      'Lubbock', 'Amarillo', 'Midland', 'College Station',
    ],
  },
  {
    region: 'Kansas & Missouri',
    note: 'Served from our Grandview, MO office, 14000 Century Lane',
    cities: [
      'Kansas City', 'Overland Park', 'Olathe', 'Lenexa', 'Shawnee',
      'Leawood', 'Independence', 'Pleasant Hill', 'Osawatomie', 'Burlington',
    ],
  },
];
