/**
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every hard fact the site renders lives here so it can be verified and
 * updated in one place.
 *
 * ⚠️ REPLACE BEFORE LAUNCH — items marked PLACEHOLDER are not verified.
 */

export const company = {
  name: 'Childress Painting',
  legalName: 'Childress Painting DFW LLC',
  tagline: 'Commercial painting and industrial coatings for Texas builders.',

  /* PLACEHOLDER — replace with the published business line. */
  phone: '(214) 555-1984',
  phoneHref: '+12145551984',

  /* PLACEHOLDER — confirm these inboxes exist and are monitored. */
  email: 'estimating@childresspainting.com',
  careersEmail: 'careers@childresspainting.com',

  /* PLACEHOLDER — replace with the verified office address, or remove the
     street line entirely and keep the site to a service-area model. */
  address: {
    street: 'Address to be confirmed',
    city: 'Dallas',
    region: 'TX',
    postalCode: '75201',
    country: 'US',
  },

  /* Family painting experience dating to 1984. Kept deliberately worded as
     experience — not as an incorporation date for the current entity. */
  heritageYear: 1984,

  /* Business hours used for LocalBusiness structured data. Confirm. */
  hours: 'Mo-Fr 07:00-17:00',

  /* PLACEHOLDER — add real profiles, or delete the entries you do not use. */
  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
  },
} as const;

/** Canonical production origin. Override with NEXT_PUBLIC_SITE_URL on Vercel. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.childresspainting.com'
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
      {
        label: 'Commercial Painting',
        href: '/services/commercial-painting',
        blurb: 'Interior and exterior finishes for occupied and active buildings.',
      },
      {
        label: 'Industrial Coatings',
        href: '/services/industrial-coatings',
        blurb: 'High-performance systems over steel, concrete, and masonry.',
      },
      {
        label: 'New Construction',
        href: '/services/new-construction',
        blurb: 'Division 09 packages sequenced to the construction schedule.',
      },
      {
        label: 'Maintenance & Repaints',
        href: '/services/maintenance-repaints',
        blurb: 'Recurring programs that protect the asset between capital cycles.',
      },
    ],
  },
  {
    label: 'Markets',
    href: '/markets',
    children: [
      { label: 'Healthcare', href: '/markets/healthcare' },
      { label: 'Aviation', href: '/markets/aviation' },
      { label: 'Education', href: '/markets/education' },
      { label: 'Industrial', href: '/markets/industrial' },
      { label: 'Multifamily', href: '/markets/multifamily' },
      { label: 'Retail & Hospitality', href: '/markets/retail' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Safety & Quality', href: '/safety-quality' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  {
    heading: 'Services',
    links: [
      { label: 'Commercial Painting', href: '/services/commercial-painting' },
      { label: 'Industrial Coatings', href: '/services/industrial-coatings' },
      { label: 'New Construction', href: '/services/new-construction' },
      { label: 'Maintenance & Repaints', href: '/services/maintenance-repaints' },
    ],
  },
  {
    heading: 'Markets',
    links: [
      { label: 'Healthcare', href: '/markets/healthcare' },
      { label: 'Aviation', href: '/markets/aviation' },
      { label: 'Education', href: '/markets/education' },
      { label: 'Industrial', href: '/markets/industrial' },
      { label: 'Multifamily', href: '/markets/multifamily' },
      { label: 'Retail & Hospitality', href: '/markets/retail' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Safety & Quality', href: '/safety-quality' },
      { label: 'Service Areas', href: '/service-areas' },
      { label: 'Careers', href: '/careers' },
      { label: 'Subcontractors', href: '/subcontractors' },
    ],
  },
];

/** Metro areas worked from the DFW base, grouped for the service-area page. */
export const serviceAreas = [
  {
    region: 'Dallas County',
    cities: [
      'Dallas',
      'Irving',
      'Garland',
      'Mesquite',
      'Richardson',
      'Carrollton',
      'Grand Prairie',
      'DeSoto',
      'Cedar Hill',
      'Farmers Branch',
    ],
  },
  {
    region: 'Tarrant County',
    cities: [
      'Fort Worth',
      'Arlington',
      'Grapevine',
      'Southlake',
      'Keller',
      'Bedford',
      'Euless',
      'North Richland Hills',
      'Mansfield',
      'Azle',
    ],
  },
  {
    region: 'Collin & Denton Counties',
    cities: [
      'Plano',
      'Frisco',
      'McKinney',
      'Allen',
      'Denton',
      'Lewisville',
      'Prosper',
      'Little Elm',
      'The Colony',
      'Flower Mound',
    ],
  },
  {
    region: 'Statewide Texas',
    cities: [
      'Austin',
      'Houston',
      'San Antonio',
      'Waco',
      'Tyler',
      'Abilene',
      'Lubbock',
      'Amarillo',
      'Midland',
      'College Station',
    ],
  },
];

/**
 * TESTIMONIALS — placeholders only.
 * Do not publish until the quote, name, title, and company are confirmed in
 * writing by the person quoted. Set `verified: true` once approved; the
 * component renders an "awaiting approval" state while it is false.
 */
export const testimonials = [
  {
    id: 'testimonial-1',
    quote:
      'Placeholder for a general contractor reference. Ask for a quote that names the schedule constraint, how the crew handled it, and the outcome at turnover.',
    name: 'Name pending',
    title: 'Project Manager',
    organization: 'General contractor — reference to be confirmed',
    verified: false,
  },
  {
    id: 'testimonial-2',
    quote:
      'Placeholder for a property or facility manager reference. The strongest version speaks to working around occupants and tenants without complaints.',
    name: 'Name pending',
    title: 'Facility Director',
    organization: 'Property group — reference to be confirmed',
    verified: false,
  },
  {
    id: 'testimonial-3',
    quote:
      'Placeholder for a developer or owner reference. Ask about bid responsiveness, budget accuracy, and punch-list closeout.',
    name: 'Name pending',
    title: 'Director of Construction',
    organization: 'Development group — reference to be confirmed',
    verified: false,
  },
];
