/**
 * PROJECT SYSTEM
 * ===========================================================================
 * ⚠️  READ BEFORE EDITING
 *
 * Every record below is a SAMPLE. These are illustrative scope profiles used
 * to preview the layout — they are NOT verified Childress Painting projects,
 * and every one carries `sample: true`. The UI reads that flag and renders a
 * visible "Sample layout" notice on the card and on the detail page.
 *
 * TO PUBLISH A REAL PROJECT
 * -------------------------------------------------------------------------
 * 1. Confirm the owner or general contractor permits the project to be shown,
 *    named, and photographed. Get it in writing.
 * 2. Replace the record's content with verified information.
 * 3. Set `sample: false`. The notice disappears automatically.
 * 4. Drop photographs in /public/images/projects/<slug>/ and point
 *    `featuredImage` and `gallery` at them. Include width and height so the
 *    layout does not shift while images load.
 * 5. Do NOT add contract values, client names, awards, or safety statistics
 *    that have not been confirmed by the company.
 *
 * When no `featuredImage` is supplied the card renders a labeled placeholder
 * block instead of a broken image, so the site stays presentable until real
 * photography is available.
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

export type Project = {
  slug: string;
  /** Project name. */
  name: string;
  /** City, state. */
  location: string;
  /** Must match a slug in lib/markets.ts */
  market: string;
  /** Must match slugs in lib/services.ts */
  serviceTypes: string[];
  /** One or two sentences describing the painting scope. */
  scopeSummary: string;
  /** Human-readable completion, e.g. 'March 2024'. Use 'In progress' if live. */
  completionDate: string;
  /** ISO date used for sorting and structured data. */
  completionISO: string;
  /** Optional descriptive facts. Leave empty rather than estimating. */
  facts: { label: string; value: string }[];
  challenges: string[];
  solution: string[];
  results: string[];
  featuredImage?: ProjectImage;
  gallery: ProjectImage[];
  /** Key into components/ui/SectorArt.tsx — drawn artwork used until a real
      photograph is supplied via `featuredImage`. */
  art: string;
  /** Legacy gradient, retained as the final fallback. */
  gradient: string;
  /** true = illustrative sample, renders a visible notice. */
  sample: boolean;
  /** Show on the homepage "featured projects" row. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'medical-office-building-interior-finishes',
    art: 'healthcare',
    name: 'Medical Office Building — Interior Finishes',
    location: 'Fort Worth, TX',
    market: 'healthcare',
    serviceTypes: ['commercial-painting', 'new-construction'],
    scopeSummary:
      'Interior painting for a multi-story medical office fit-out: walls, ceilings, hollow metal doors and frames, and scrubbable epoxy finishes in exam and procedure rooms.',
    completionDate: 'Sample project — date pending',
    completionISO: '2024-06-01',
    facts: [
      { label: 'Delivery method', value: 'Subcontract to general contractor' },
      { label: 'Building status', value: 'Partially occupied during construction' },
      { label: 'Primary systems', value: 'Latex enamel, epoxy, hollow metal enamel' },
    ],
    challenges: [
      'Two floors remained in clinical use while the shell floors above were finished, so odor and dust migration through shared risers had to be controlled.',
      'The finish schedule specified different sheens and coating systems for exam, procedure, and corridor spaces, with limited tolerance for substitution.',
      'Ceiling grid and MEP rough-in released unevenly across the floor plate, so painting could not proceed in a single continuous sweep.',
    ],
    solution: [
      'Sequenced the work by department zone with agreed containment at each boundary, and confirmed daily access windows in writing with the facility team.',
      'Specified low-odor, low-VOC systems for areas adjacent to occupied clinical space during preconstruction rather than negotiating substitutions in the field.',
      'Ran a dedicated dryfall and exposed-structure crew ahead of ceiling close-in, then followed with the wall and trim crew as areas were released.',
      'Tracked punch by room number from the first area turned over, closing items in batches rather than accumulating them for the end of the job.',
    ],
    results: [
      'Finish standard was set with an approved mockup before production, which removed disputes about acceptable coverage and cut lines.',
      'Occupied departments continued operating throughout the fit-out with access windows held as agreed.',
      'Punch closeout was completed area by area, with color schedules and attic stock turned over as a single package.',
    ],
    gallery: [],
    gradient: 'from-[#c8d3dc] via-[#7d8f9e] to-[#243444]',
    sample: true,
    featured: true,
  },
  {
    slug: 'distribution-center-coatings-program',
    art: 'industrial',
    name: 'Distribution Center — Coatings Program',
    location: 'Dallas, TX',
    market: 'industrial',
    serviceTypes: ['industrial-coatings', 'maintenance-repaints'],
    scopeSummary:
      'Interior structural steel and deck coatings, tilt-wall exterior recoat, warehouse floor sealing, and safety striping across an operating distribution facility.',
    completionDate: 'Sample project — date pending',
    completionISO: '2024-03-01',
    facts: [
      { label: 'Facility status', value: 'Fully operational throughout' },
      { label: 'Access', value: 'Scissor and boom lifts, aisle-by-aisle' },
      { label: 'Primary systems', value: 'Epoxy primer, urethane topcoat, floor sealer' },
    ],
    challenges: [
      'The facility ran continuous shifts, so no area could be taken out of service for more than one shift at a time.',
      'Racking, conveyor, and inventory could not be relocated, which made overspray control the governing constraint on application method.',
      'Existing coatings varied by age and condition across the building, so a single preparation method would not have been appropriate everywhere.',
    ],
    solution: [
      'Broke the building into work cells matched to the facility’s aisle-closure plan and scheduled around shift changes and inbound trailer volume.',
      'Designed containment for each cell and confirmed it with facility management before spraying, with brush and roll applied where containment was impractical.',
      'Surveyed existing coating condition by area and specified preparation to match — pressure wash, power tool clean, or abrasive blast — instead of one blanket approach.',
      'Recorded environmental conditions and dry film thickness by area so the coating record supported the manufacturer’s warranty.',
    ],
    results: [
      'The facility maintained normal outbound operations for the duration of the program.',
      'Preparation and thickness documentation was turned over as a complete coating file for future maintenance planning.',
      'Safety striping and color-coded identification were reinstated to the facility’s current standard rather than the previous layout.',
    ],
    gallery: [],
    gradient: 'from-[#b09071] via-[#6c5a4a] to-[#1f2325]',
    sample: true,
    featured: true,
  },
  {
    slug: 'k12-campus-summer-repaint',
    art: 'education',
    name: 'K–12 Campus — Summer Repaint',
    location: 'Plano, TX',
    market: 'education',
    serviceTypes: ['commercial-painting', 'maintenance-repaints'],
    scopeSummary:
      'Classroom, corridor, gymnasium, and locker room repaint across a campus, completed inside the summer break with doors, frames, and handrails included.',
    completionDate: 'Sample project — date pending',
    completionISO: '2023-08-01',
    facts: [
      { label: 'Window', value: 'Summer break — fixed return date' },
      { label: 'Areas', value: 'Classrooms, corridors, gym, locker rooms' },
      { label: 'Primary systems', value: 'Washable acrylic egg­shell, DTM enamel on rails' },
    ],
    challenges: [
      'The completion date was fixed by the first day of class and could not move for any reason.',
      'Summer maintenance, flooring, and mechanical work were running in the same buildings at the same time.',
      'Corridor and gymnasium finishes needed to withstand daily contact and repeated cleaning without burnishing.',
    ],
    solution: [
      'Built the production plan backward from the return date, identified the latest possible start for each building, and confirmed access with district facilities before mobilizing.',
      'Staged material by building before the window opened so crews were not waiting on deliveries during the shortest weeks of the schedule.',
      'Loaded multiple crews in parallel with supervision on site full time, so trade conflicts were resolved the same day.',
      'Selected washable, touch-up-friendly finishes and left labeled attic stock with the maintenance department.',
    ],
    results: [
      'All areas were punched, cleaned, and returned before staff in-service days began.',
      'Color formulas and product data were archived with the district so future touch-ups match without sampling.',
      'Work was coordinated with other summer trades without extending any building beyond its planned window.',
    ],
    gallery: [],
    gradient: 'from-[#d3c3ab] via-[#8c7454] to-[#2b2117]',
    sample: true,
    featured: true,
  },
  {
    slug: 'multifamily-community-exterior-renewal',
    art: 'multifamily',
    name: 'Multifamily Community — Exterior Renewal',
    location: 'Arlington, TX',
    market: 'multifamily',
    serviceTypes: ['maintenance-repaints'],
    scopeSummary:
      'Phased exterior repaint across an occupied garden-style community: stucco and siding coatings, sealant replacement, railings, stairwells, and breezeways.',
    completionDate: 'Sample project — date pending',
    completionISO: '2024-09-01',
    facts: [
      { label: 'Property status', value: 'Fully occupied' },
      { label: 'Phasing', value: 'Building by building, published schedule' },
      { label: 'Primary systems', value: 'Elastomeric, acrylic, DTM enamel on rails' },
    ],
    challenges: [
      'Residents occupied every building, with balconies, patios, and parking directly in the work area.',
      'Sealant and substrate condition varied significantly by elevation, and the true repair scope was not visible until washing was complete.',
      'South and west elevations showed materially more coating degradation than the rest of the property.',
    ],
    solution: [
      'Completed a condition survey by elevation before pricing, so the repair scope was identified and budgeted rather than discovered as a change order.',
      'Published a building-by-building schedule that property management distributed to residents, and held it.',
      'Replaced failed sealant and repaired substrate ahead of the coating crew so no coating was applied over a defect.',
      'Secured equipment and cleared walkways, stairs, and parking at the end of every shift.',
    ],
    results: [
      'The property remained fully occupied and accessible throughout the program.',
      'Elevations with the highest exposure were addressed first, within the owner’s budget phasing.',
      'Color formulas, product data, and elevation photographs were archived for the next maintenance cycle.',
    ],
    gallery: [],
    gradient: 'from-[#c2b4a4] via-[#7d6f63] to-[#26231f]',
    sample: true,
    featured: true,
  },
  {
    slug: 'airport-concourse-interior-refresh',
    art: 'aviation',
    name: 'Airport Concourse — Interior Refresh',
    location: 'Sample location — pending',
    market: 'aviation',
    serviceTypes: ['commercial-painting'],
    scopeSummary:
      'Overnight interior refresh of concourse public areas: walls, columns, exposed structure, and back-of-house corridors within a live passenger terminal.',
    completionDate: 'Sample project — date pending',
    completionISO: '2023-11-01',
    facts: [
      { label: 'Access', value: 'Badged crews, escorted where required' },
      { label: 'Work window', value: 'Overnight, between departure banks' },
      { label: 'Primary systems', value: 'Durable acrylic, dryfall on exposed structure' },
    ],
    challenges: [
      'Every crew member required badging and clearance before setting foot in the secured area.',
      'The productive window was a fraction of the shift once setup, protection, and teardown were accounted for.',
      'The concourse had to be fully reopened, clean, and free of protection before the first morning departures.',
    ],
    solution: [
      'Treated badging as a long-lead item on the mobilization schedule and kept the crew roster stable to avoid re-clearing personnel.',
      'Priced the shift honestly — setup and teardown were built into the crew loading rather than assumed away.',
      'Staged protection and material at the work area before the shift so productive time started immediately.',
      'Walked the area with the operator at the end of every shift before the crew left the building.',
    ],
    results: [
      'Public areas were reopened to passengers on schedule after each shift.',
      'Finishes were selected for cleanability and touch-up so the facility team could maintain them in-house.',
      'Work proceeded without disruption to departure operations.',
    ],
    gallery: [],
    gradient: 'from-[#b7c5d1] via-[#5f7385] to-[#16232f]',
    sample: true,
  },
  {
    slug: 'shopping-center-facade-and-tenant-spaces',
    art: 'retail',
    name: 'Shopping Center — Facade and Tenant Spaces',
    location: 'Dallas, TX',
    market: 'retail',
    serviceTypes: ['commercial-painting', 'maintenance-repaints'],
    scopeSummary:
      'Exterior facade repaint, storefront and canopy coatings, and interior white-box painting for tenant spaces at an operating retail center.',
    completionDate: 'Sample project — date pending',
    completionISO: '2024-05-01',
    facts: [
      { label: 'Center status', value: 'Open for trade throughout' },
      { label: 'Scheduling', value: 'Early morning and overnight by tenant' },
      { label: 'Primary systems', value: 'Acrylic facade coating, DTM on metal' },
    ],
    challenges: [
      'Tenants traded through the entire program, each with different operating hours and delivery schedules.',
      'Storefronts, signage, and glazing sat immediately adjacent to the coated surfaces.',
      'The center owner required a consistent facade appearance across tenants with differing brand standards.',
    ],
    solution: [
      'Coordinated a tenant-by-tenant schedule with property management and confirmed working hours with each operator in writing.',
      'Masked and protected signage, glazing, and storefront systems before each phase, and inspected protection before spraying.',
      'Applied the owner’s facade standard to the common building envelope and confirmed any brand-specified colors against the tenant’s package before ordering.',
      'Cleared protection and cleaned the area before opening hours each day.',
    ],
    results: [
      'No tenant lost trading hours to the coating work.',
      'The facade was returned to a single consistent standard across the center.',
      'Tenant white-box spaces were completed to the landlord work-letter finish requirements.',
    ],
    gallery: [],
    gradient: 'from-[#cbbfa6] via-[#7a7059] to-[#1c1b1f]',
    sample: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const projectsByMarket = (market: string) =>
  projects.filter((p) => p.market === market);
export const projectsByService = (service: string) =>
  projects.filter((p) => p.serviceTypes.includes(service));
