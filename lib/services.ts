/**
 * SERVICE DEFINITIONS — the single source of truth
 * ---------------------------------------------------------------------------
 * Every service the company offers exists exactly once, in this array. The
 * services index, each /services/[slug] page, navigation, the footer, the
 * homepage grid, project "services performed" chips, and structured data all
 * read from here — so a service can never be duplicated or drift between
 * surfaces.
 *
 * `group`    controls how the index page organises the catalogue.
 * `featured` promotes a service to the homepage grid (keep this to ~8).
 *
 * TO ADD A SERVICE: append one record. Nothing else needs to change.
 */

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  /** MasterFormat reference where a real one applies; SVC codes otherwise. */
  csi: string;
  kicker: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  group: 'Service Lines' | 'Painting & Finishes' | 'Coatings & Floors' | 'Preparation & Maintenance';
  featured?: boolean;
  scope: string[];
  systems: { label: string; detail: string }[];
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  relatedIndustries: string[];
  art: string;
  image?: string;
};

export const services: Service[] = [
  /* ==================================================== SERVICE LINES ==== */
  {
    slug: 'commercial-painting',
    group: 'Service Lines',
    featured: true,
    art: 'construction',
    title: 'Commercial Painting',
    shortTitle: 'Commercial Painting',
    csi: 'CSI 09 91 00',
    kicker: 'Our Core Business Since 1984',
    summary:
      'Full commercial painting packages for general contractors, developers, and owners — new construction, tenant finish-outs, and remodels held to the construction schedule.',
    intro:
      'Commercial construction is where this company was built and where most of our crews work every day. We carry complete Division 09 packages — submittals, mockups, production, quality control, and closeout — sequenced against the general contractor schedule and staffed against the area release plan rather than an ideal duration.',
    metaTitle: 'Commercial Painting Contractor | Dallas–Fort Worth & Texas',
    metaDescription:
      'Commercial painting for general contractors and owners across Texas, Kansas, and Missouri. New construction, tenant finish-outs, remodels, and multi-site programs since 1984.',
    scope: [
      'Full Division 09 painting packages for new construction',
      'Tenant finish-outs delivered to lease commencement dates',
      'Remodels phased around trading hours and occupants',
      'Multi-site and rollout programs to a brand prototype standard',
      'Submittals, color schedules, and approved mockups',
      'Day, night, and occupied-site shift scheduling',
      'Progressive punch and documented closeout',
    ],
    systems: [
      { label: 'Gypsum Board', detail: 'Primer plus two finish coats per the finish schedule' },
      { label: 'Hollow Metal', detail: 'Rust-inhibitive primer with enamel topcoat' },
      { label: 'Exposed Structure', detail: 'Dryfall applied ahead of MEP close-in' },
      { label: 'Exterior Envelope', detail: 'Manufacturer-specified assembly for the substrate' },
    ],
    sections: [
      {
        heading: 'Built Around the Schedule',
        body: 'Painting sits behind drywall and ahead of flooring, casework, and equipment, so it absorbs every upstream delay. We plan the compressed version of the schedule from day one, add shifts rather than move dates, and tell the superintendent early when something upstream is going to move us.',
      },
      {
        heading: 'One Subcontractor, Closeout Included',
        body: 'Attic stock, the approved color schedule, product data, and a written two-year workmanship warranty are delivered as a package at turnover. Our own quality walk happens before the general contractor walkthrough, which is why the punch list handed over is short.',
      },
    ],
    faqs: [
      {
        question: 'Do You Handle Multi-Site Rollout Programs?',
        answer:
          'Yes — national retail and restaurant rollouts are a core part of our record. The finish schedule is verified against the brand prototype book during preconstruction and substitutions are flagged in writing before material is ordered.',
      },
      {
        question: 'Can You Work While a Business Stays Open?',
        answer:
          'Yes. Night shifts, barricaded phasing, and daily return to service are standard. The shift structure is agreed and priced at bid, so there is no premium-time surprise later.',
      },
    ],
    relatedIndustries: ['retail', 'restaurants', 'office', 'new-construction', 'tenant-improvements'],
  },
  {
    slug: 'residential-painting',
    group: 'Service Lines',
    featured: true,
    art: 'interior',
    title: 'Residential Painting',
    shortTitle: 'Residential Painting',
    csi: 'SVC / RES',
    kicker: 'Commercial Discipline, Brought Home',
    summary:
      'Interior and exterior residential painting delivered with the same preparation standards, clean job sites, and written warranty we bring to commercial construction.',
    intro:
      'Most of our work is commercial construction — and that is exactly why homeowners hire us. The habits that keep a general contractor happy translate directly: showing up when we said we would, protecting everything that is not being painted, cleaning up daily, and standing behind the work in writing.',
    metaTitle: 'Residential Painting | Interior & Exterior House Painting',
    metaDescription:
      'Residential interior and exterior painting with commercial-grade preparation, clean job sites, clear communication, and a written two-year workmanship warranty.',
    scope: [
      'Interior repaints — walls, ceilings, trim, and doors',
      'Exterior repaints over siding, stucco, brick, and trim',
      'Cabinet painting and refinishing',
      'Drywall repair, texture matching, and caulking',
      'Color consultation before a gallon is ordered',
      'Daily cleanup and full protection of floors and furnishings',
      'Written two-year workmanship warranty',
    ],
    systems: [
      { label: 'Interior Walls', detail: 'Premium washable acrylics, sheen matched to the room' },
      { label: 'Trim and Doors', detail: 'Waterborne enamel for a smooth, durable finish' },
      { label: 'Exteriors', detail: 'Cleaned, repaired, and coated to the substrate' },
      { label: 'Cabinets', detail: 'Catalyzed sprayed finish, shop-quality result' },
    ],
    sections: [
      {
        heading: 'The Same Standard as a Jobsite',
        body: 'A home gets the same sequence a commercial project does: surfaces inspected and repaired before coating, a written scope so nothing is assumed, protection of everything adjacent, and a walk-through at the end against that scope rather than against memory.',
      },
      {
        heading: 'Communication You Can Plan Around',
        body: 'You get a start date, a duration, and a daily update if anything changes. Crews arrive when scheduled, and the house is left livable every evening — floors clear, furniture back, no open paint left behind.',
      },
    ],
    faqs: [
      {
        question: 'Do You Take Small Residential Projects?',
        answer:
          'Yes. Single rooms, exteriors, and cabinet projects are all welcome. The written scope and warranty apply regardless of project size.',
      },
      {
        question: 'How Do You Protect the Home While Working?',
        answer:
          'Floors, fixtures, and furnishings are covered before the first can is opened, work areas are contained, and the space is returned to use each evening. Low-odor products are used in occupied homes.',
      },
    ],
    relatedIndustries: ['tenant-improvements'],
  },
  {
    slug: 'industrial-painting',
    group: 'Service Lines',
    featured: true,
    art: 'industrial',
    title: 'Industrial Painting',
    shortTitle: 'Industrial Painting',
    csi: 'CSI 09 97 00',
    kicker: 'Plants, Steel & Heavy-Service Environments',
    summary:
      'Industrial painting and coatings for manufacturing plants, distribution centers, and processing facilities — specified against the actual service conditions.',
    intro:
      'In an industrial building the coating is a maintenance decision. It has to handle temperature, chemical exposure, washdown, abrasion, or all four, and it has to be applied in the window the plant is willing to give up. Specification and surface preparation carry more weight here than anywhere else.',
    metaTitle: 'Industrial Painting Contractor | Plants & Distribution Facilities',
    metaDescription:
      'Industrial painting for manufacturing plants, warehouses, and processing facilities. Structural steel, equipment, and high-performance systems with shutdown-window scheduling.',
    scope: [
      'Structural steel and exposed structure coatings',
      'Plant interiors, ceilings, and dryfall applications',
      'Equipment, tank exteriors, and piping identification',
      'Chemical- and washdown-resistant wall systems',
      'Safety striping and line marking',
      'Shutdown-window and live-plant scheduling',
      'Surface preparation to the specified SSPC standard',
    ],
    systems: [
      { label: 'Structural Steel', detail: 'Epoxy primer with aliphatic urethane topcoat' },
      { label: 'Process Areas', detail: 'Novolac or specialty resin matched to exposure' },
      { label: 'Washdown Zones', detail: 'Catalyzed epoxy rated for the cleaning regime' },
      { label: 'Concrete Floors', detail: 'Resinous systems over profiled, tested slabs' },
    ],
    sections: [
      {
        heading: 'The Service Environment Drives the System',
        body: 'Chemical exposure, thermal cycling, washdown, and abrasion each rule out different products. We collect the actual conditions during preconstruction and confirm the assembly with the manufacturer before it is priced — a product correct for a warehouse and wrong for a wash bay looks identical on a submittal.',
      },
      {
        heading: 'Planned to the Hour',
        body: 'Scope is broken into what can be done live, what needs a line down, and what needs an area fully cleared — priced separately so the plant can decide how much downtime the result is worth.',
      },
    ],
    faqs: [
      {
        question: 'Can You Work Without Shutting the Plant Down?',
        answer:
          'Partially, and we tell you exactly which parts. Some scope runs live behind containment; some genuinely requires the line down for access or cure. The bid separates the two so the decision is yours.',
      },
      {
        question: 'What Preparation Standards Do You Work To?',
        answer:
          'SSPC surface preparation standards for steel, and profile, moisture, and pH verification on concrete. The standard is agreed in writing at bid and the substrate is documented before coating.',
      },
    ],
    relatedIndustries: ['industrial', 'government', 'aviation'],
  },

  /* ================================================ PAINTING & FINISHES == */
  {
    slug: 'interior-painting',
    group: 'Painting & Finishes',
    featured: true,
    art: 'interior',
    title: 'Interior Painting',
    shortTitle: 'Interior Painting',
    csi: 'CSI 09 91 23',
    kicker: 'Walls · Ceilings · Trim · Doors',
    summary:
      'Interior painting for commercial and residential spaces — clean lines, uniform finishes, and work sequenced around the people using the building.',
    intro:
      'Interior painting is judged from two feet away in good light, and it usually happens in a space somebody still needs to use. The coating is the straightforward part; producing a uniform result around occupants, other trades, and the schedule is the craft.',
    metaTitle: 'Interior Painting | Commercial & Residential Interiors',
    metaDescription:
      'Interior painting for offices, stores, restaurants, clinics, and homes. Walls, ceilings, trim, doors, and specialty finishes with occupied-space phasing.',
    scope: [
      'Wall, ceiling, and soffit coatings',
      'Trim, doors, frames, and millwork finishing',
      'Exposed structure and dryfall applications',
      'Accent walls and specialty finishes',
      'Scrubbable systems for high-touch areas',
      'Low-odor products for occupied spaces',
      'Drywall finish level coordination',
    ],
    systems: [
      { label: 'Gypsum Board', detail: 'Primer plus two finish coats to the specified sheen' },
      { label: 'Trim and Doors', detail: 'Waterborne or alkyd enamel per the schedule' },
      { label: 'High-Touch Areas', detail: 'Scrubbable, high-hide washable systems' },
      { label: 'Occupied Spaces', detail: 'Low-VOC systems with minimal cure odor' },
    ],
    sections: [
      {
        heading: 'Working Around Occupants',
        body: 'Most interior work happens in buildings still in use. We zone the work, agree containment and protection before starting, and run night or weekend shifts where the space must be returned each morning — clean, clear, and usable.',
      },
      {
        heading: 'Finish Level Matters More Than Paint',
        body: 'A Level 4 wall under critical lighting will telegraph joints no matter what is applied over it. We confirm the specified drywall finish level against the lighting design during preconstruction and flag mismatches in writing before anyone is standing in a finished room disputing ownership.',
      },
    ],
    faqs: [
      {
        question: 'Commercial and Residential?',
        answer:
          'Both. The preparation standard, the product quality, and the written warranty are identical — only the scheduling differs.',
      },
      {
        question: 'How Do You Handle Color and Sheen Selection?',
        answer:
          'Colors are confirmed with samples or mockups before production. On brand-standard projects the schedule is verified against the prototype book; on residential work we offer color consulting before ordering.',
      },
    ],
    relatedIndustries: ['office', 'healthcare', 'retail', 'restaurants', 'education'],
  },
  {
    slug: 'exterior-painting',
    group: 'Painting & Finishes',
    featured: true,
    art: 'exterior',
    title: 'Exterior Painting',
    shortTitle: 'Exterior Painting',
    csi: 'CSI 09 91 13',
    kicker: 'Tilt-Wall · Stucco · Masonry · Siding · Steel',
    summary:
      'Exterior painting over tilt-wall, stucco, EIFS, masonry, siding, and steel — bought on how long it lasts, which is decided by preparation.',
    intro:
      'An exterior repaint is bought on service life, and service life is decided before the first coat: cleaning, substrate repair, and whether the sealant joints were addressed. Coating over a failing joint buys two years; doing the preparation properly buys the full life of the system.',
    metaTitle: 'Exterior Painting | Commercial Buildings & Homes',
    metaDescription:
      'Exterior painting for commercial buildings and homes across Texas. Tilt-wall, stucco, EIFS, masonry, and siding with pressure washing and sealant replacement.',
    scope: [
      'Tilt-wall and precast concrete coatings',
      'Stucco and EIFS repaint, including elastomeric systems',
      'Masonry, brick, and CMU coatings',
      'Siding, fascia, and trim on residential exteriors',
      'Structural and architectural steel',
      'Pressure washing and substrate cleaning',
      'Sealant replacement and crack repair',
    ],
    systems: [
      { label: 'Tilt-Wall / Precast', detail: 'Acrylic or elastomeric over cleaned, patched substrate' },
      { label: 'Stucco / EIFS', detail: 'Elastomeric or full acrylic with sealant replacement' },
      { label: 'Masonry', detail: 'Breathable masonry coating, efflorescence treated' },
      { label: 'Steel', detail: 'Rust-inhibitive primer with urethane topcoat' },
    ],
    sections: [
      {
        heading: 'Preparation Determines the Warranty',
        body: 'Chalking, mildew, efflorescence, and failed sealant all defeat an otherwise correct system. Every exterior scope starts with cleaning, moisture assessment, and a written sealant condition report — and if the substrate needs repair beyond the coating scope, we say so at bid rather than coating over it.',
      },
      {
        heading: 'Weather Is Part of the Schedule',
        body: 'Texas exterior work is governed by dew point, surface temperature, and wind. We build float in for the days that are not workable and communicate early when a weather window moves a date — rather than applying product outside its specified conditions to hold one.',
      },
    ],
    faqs: [
      {
        question: 'Do You Replace Sealants as Part of a Repaint?',
        answer:
          'Where the joints are failing, yes — and we recommend it. We survey joint condition before bid and carry replacement as a defined line item so it is a decision rather than a surprise.',
      },
      {
        question: 'Can You Work Around an Operating Business?',
        answer:
          'Yes. Work is sequenced around parking, entrances, deliveries, and pedestrian routes, with protection and traffic control planned before mobilization.',
      },
    ],
    relatedIndustries: ['retail', 'industrial', 'education', 'government'],
  },
  {
    slug: 'cabinet-painting-refinishing',
    group: 'Painting & Finishes',
    art: 'interior',
    title: 'Cabinet Painting & Refinishing',
    shortTitle: 'Cabinet Refinishing',
    csi: 'SVC / CAB',
    kicker: 'Shop-Quality Sprayed Finishes',
    summary:
      'Cabinet painting and refinishing with a sprayed, catalyzed finish — a factory-quality result at a fraction of replacement cost.',
    intro:
      'Refinishing existing cabinetry costs a fraction of replacement and, done properly, is indistinguishable from new. Done improperly — brushed latex over unprepared thermofoil — it peels within a year. The difference is entirely in preparation, product selection, and spray application.',
    metaTitle: 'Cabinet Painting & Refinishing | Sprayed Catalyzed Finishes',
    metaDescription:
      'Cabinet painting and refinishing with degreasing, sanding, bonding primers, and sprayed catalyzed enamel for a durable, factory-smooth finish.',
    scope: [
      'Kitchen and bathroom cabinet refinishing',
      'Built-ins, bookcases, and millwork',
      'Commercial casework and reception millwork',
      'Degreasing, sanding, and bonding primer systems',
      'Sprayed catalyzed enamel application',
      'Doors and drawers finished flat, off-site where possible',
      'Hardware removal and reinstallation',
    ],
    systems: [
      { label: 'Preparation', detail: 'Degrease, scuff sand, and bonding primer — every surface' },
      { label: 'Finish', detail: 'Sprayed catalyzed enamel, cured hard for daily use' },
      { label: 'Doors / Drawers', detail: 'Removed and sprayed flat for a level finish' },
      { label: 'Frames', detail: 'Masked and sprayed in place under containment' },
    ],
    sections: [
      {
        heading: 'Why Sprayed and Catalyzed',
        body: 'Brushed wall paint on cabinets shows every stroke and never cures hard enough for daily handling. A sprayed catalyzed enamel levels flat and cures to a furniture-grade hardness that survives fingernails, cleaners, and grease.',
      },
      {
        heading: 'Preparation Is the Whole Job',
        body: 'Kitchen cabinets carry years of cooking residue that defeats adhesion. Every surface is degreased, sanded, and primed with a bonding primer before color — skip any one of those steps and the finish fails, which is why we never do.',
      },
    ],
    faqs: [
      {
        question: 'How Long Does a Kitchen Take?',
        answer:
          'Most kitchens run three to five working days, with doors and drawers finishing off-site while frames are completed in place. The kitchen remains usable for most of that time.',
      },
      {
        question: 'Can You Match a Specific Color or Sheen?',
        answer:
          'Yes — any manufacturer color, with a sample sprayed for approval before production.',
      },
    ],
    relatedIndustries: ['hospitality', 'office', 'healthcare'],
  },
  {
    slug: 'custom-wood-staining',
    group: 'Painting & Finishes',
    art: 'restaurant',
    title: 'Custom Wood Staining',
    shortTitle: 'Wood Staining',
    csi: 'CSI 09 93 00',
    kicker: 'Stain-Grade Finishing & Transparent Systems',
    summary:
      'Stain-grade finishing for doors, trim, millwork, beams, and feature elements — color-matched samples first, sealed systems built for the exposure.',
    intro:
      'Stain-grade work is unforgiving: there is no primer to hide behind, and every sanding scratch, lap mark, and blotch telegraphs through the finish. It rewards patience — sample boards, conditioners on blotch-prone species, and finish systems selected for the exposure rather than habit.',
    metaTitle: 'Custom Wood Staining | Stain-Grade Doors, Trim & Millwork',
    metaDescription:
      'Custom wood staining and transparent finishing for doors, trim, millwork, beams, and exterior wood. Color-matched samples and sealed systems built for the exposure.',
    scope: [
      'Stain-grade doors, trim, and millwork',
      'Ceiling beams and feature woodwork',
      'Restaurant and hospitality wood elements',
      'Exterior wood — doors, gates, and accents',
      'Color matching to an existing finish or control sample',
      'Conditioners and blotch control on difficult species',
      'Sealed topcoat systems matched to the exposure',
    ],
    systems: [
      { label: 'Interior Millwork', detail: 'Stain with catalyzed or conversion varnish topcoat' },
      { label: 'Doors', detail: 'Sprayed transparent system, both faces sealed' },
      { label: 'Exterior Wood', detail: 'Penetrating or film-forming system rated for UV' },
      { label: 'Color Matching', detail: 'Sample boards approved before production' },
    ],
    sections: [
      {
        heading: 'Samples Before Production',
        body: 'The same stain reads differently on every species and every veneer lot. We produce sample boards on the actual material, adjust until approved, and lock the formula — so the five-hundredth linear foot matches the first.',
      },
      {
        heading: 'Built for Where the Wood Lives',
        body: 'A restaurant tabletop, an exterior gate in Texas sun, and a residential stair rail need three different topcoat systems. We match the system to the exposure and say so on the proposal, because a beautiful finish that fails in a year is not a finish.',
      },
    ],
    faqs: [
      {
        question: 'Can You Match Existing Woodwork?',
        answer:
          'Yes. We build custom stain formulas against a control sample and approve the match with you on the actual species before production.',
      },
      {
        question: 'Do You Refinish as Well as Finish New Wood?',
        answer:
          'Yes — stripping, sanding, and refinishing existing doors, trim, and millwork is routine work, priced after we assess the existing finish.',
      },
    ],
    relatedIndustries: ['restaurants', 'hospitality', 'office'],
  },
  {
    slug: 'decorative-finishes',
    group: 'Painting & Finishes',
    art: 'hospitality',
    title: 'Decorative Finishes',
    shortTitle: 'Decorative Finishes',
    csi: 'CSI 09 94 00',
    kicker: 'Specialty & Feature-Wall Systems',
    summary:
      'Specialty and decorative finish systems — textures, metallics, and feature treatments executed from approved mockups.',
    intro:
      'Decorative work is bought on a look, and a look cannot be specified in words. Everything starts from a physical mockup: the finish is developed, adjusted, and approved on a sample before it touches the wall, so the result is the one that was bought.',
    metaTitle: 'Decorative Finishes | Specialty Paint & Feature Walls',
    metaDescription:
      'Decorative and specialty paint finishes for restaurants, hospitality, retail, and residential feature walls. Textures, metallics, and custom treatments from approved mockups.',
    scope: [
      'Feature and accent wall treatments',
      'Metallic and pearlescent systems',
      'Textured and troweled finishes',
      'Restaurant and hospitality brand treatments',
      'Ceiling features and painted patterns',
      'Approved mockups before production',
      'Coordination with designers and brand standards',
    ],
    systems: [
      { label: 'Metallics', detail: 'Sprayed or rolled systems with controlled sheen' },
      { label: 'Textures', detail: 'Troweled and applied texture systems' },
      { label: 'Brand Treatments', detail: 'Executed to the prototype or design intent' },
      { label: 'Mockups', detail: 'Physical sample approved before production' },
    ],
    sections: [
      {
        heading: 'The Mockup Is the Contract',
        body: 'A decorative finish approved on a two-foot board is a defined product; one described in an email is an argument waiting to happen. We build the sample, adjust it with the designer or owner, and production matches the approved board.',
      },
      {
        heading: 'Durability Is Part of the Design',
        body: 'A feature wall in a restaurant entry gets touched, scuffed, and cleaned. We build decorative systems with topcoats that survive the traffic they will actually see, so the finish still looks intentional a year in.',
      },
    ],
    faqs: [
      {
        question: 'Do You Work From a Designer Specification?',
        answer:
          'Yes — and where the specification describes an effect rather than a product, we develop the system and confirm it with a mockup before pricing production.',
      },
      {
        question: 'Can Decorative Finishes Be Repaired Later?',
        answer:
          'We document the system and retain the formula so future repairs blend rather than patch.',
      },
    ],
    relatedIndustries: ['restaurants', 'hospitality', 'retail'],
  },
  {
    slug: 'color-consulting',
    group: 'Painting & Finishes',
    art: 'office',
    title: 'Color Consulting',
    shortTitle: 'Color Consulting',
    csi: 'SVC / CLR',
    kicker: 'Decide Once, on the Wall',
    summary:
      'Color selection support for owners, designers, and facility teams — large drawdown samples on the actual walls, under the actual light.',
    intro:
      'Color is the least expensive decision on a project and the one most often re-made at full price. A color chosen from a one-inch chip under showroom lighting routinely looks wrong across forty feet of wall. We move the decision to the wall itself, before a gallon is ordered.',
    metaTitle: 'Color Consulting | Paint Color Selection Support',
    metaDescription:
      'Professional paint color consulting for commercial and residential projects. Large drawdown samples evaluated in place, sheen guidance, and a documented schedule.',
    scope: [
      'On-site color consultation',
      'Large-format drawdown samples on the actual surfaces',
      'Sheen selection by room function and lighting',
      'Whole-building and multi-room color schedules',
      'Coordination with existing finishes and furnishings',
      'Brand color matching across manufacturers',
      'Documented color schedule for future touch-ups',
    ],
    systems: [
      { label: 'Sampling', detail: 'Large drawdowns evaluated morning and evening light' },
      { label: 'Sheen Map', detail: 'Sheen matched to function, traffic, and lighting' },
      { label: 'Schedule', detail: 'Every room and surface documented by product code' },
      { label: 'Matching', detail: 'Cross-manufacturer matches verified on the wall' },
    ],
    sections: [
      {
        heading: 'Decide on the Wall, Not the Chip',
        body: 'Light direction, ceiling height, floor color, and adjacent surfaces all shift how a color reads. Large samples on the actual walls, viewed at different times of day, turn the decision from a guess into an observation.',
      },
      {
        heading: 'The Schedule Outlives the Project',
        body: 'The deliverable is a documented color schedule — every surface, product, color, and sheen — so touch-ups and future phases match without archaeology.',
      },
    ],
    faqs: [
      {
        question: 'Is Consulting Available Without the Painting?',
        answer:
          'It is offered with our painting work, where it removes the most common source of delay and repaint cost — a color decision made too late or re-made after application.',
      },
      {
        question: 'Can You Match a Brand Color Across Manufacturers?',
        answer:
          'Yes. Matches are verified with sprayed or rolled samples on the wall rather than trusted from a formula screen.',
      },
    ],
    relatedIndustries: ['office', 'hospitality', 'retail'],
  },

  /* ================================================= COATINGS & FLOORS === */
  {
    slug: 'epoxy-floor-coatings',
    group: 'Coatings & Floors',
    featured: true,
    art: 'coatings',
    title: 'Epoxy Floor Coatings',
    shortTitle: 'Epoxy Floors',
    csi: 'CSI 09 67 00',
    kicker: 'Resinous Flooring Over Tested Slabs',
    summary:
      'Epoxy and resinous floor systems for kitchens, plants, warehouses, and showrooms — over profiled, moisture-tested concrete.',
    intro:
      'Resinous floors fail for one reason far more than any other: they were installed over a slab that was never tested. Moisture vapor lifts the most expensive system just as effectively as the cheapest. We profile the slab, test it, and put the results in writing before anything is mixed.',
    metaTitle: 'Epoxy Floor Coatings | Commercial & Industrial Resinous Flooring',
    metaDescription:
      'Epoxy and resinous floor coatings for commercial kitchens, plants, warehouses, and showrooms. Mechanical profiling, moisture testing, and systems matched to service.',
    scope: [
      'Commercial kitchen and food-service floors',
      'Warehouse and plant floor systems',
      'Showroom and retail decorative epoxy',
      'Mechanical grinding and shot-blast profiling',
      'Moisture vapor and pH testing before installation',
      'Cove bases and integral drainage details',
      'Safety striping within the floor scope',
    ],
    systems: [
      { label: 'Kitchens', detail: 'Urethane cement or epoxy rated for thermal shock' },
      { label: 'Warehouses', detail: 'High-build epoxy with urethane wear topcoat' },
      { label: 'Showrooms', detail: 'Decorative flake or metallic systems' },
      { label: 'Slab Testing', detail: 'Moisture, RH, and pH verified before install' },
    ],
    sections: [
      {
        heading: 'The Slab Decides Everything',
        body: 'Profile, moisture, and contamination determine whether a resinous system bonds or delaminates. We mechanically profile to the specified CSP, test moisture and pH, and share the results — including when they say the slab needs mitigation before any floor should go down.',
      },
      {
        heading: 'Downtime, Planned Honestly',
        body: 'Cure windows are chemistry, not negotiation. We break installation into phases the operation can live with, state the return-to-service time for each, and hold to it — rather than promising a cure time the product cannot deliver.',
      },
    ],
    faqs: [
      {
        question: 'How Long Before the Floor Can Be Used?',
        answer:
          'It depends on the system — foot traffic typically within a day, wheel traffic and washdown later. The proposal states the return-to-service time for the specific product, and fast-cure systems are available where downtime is expensive.',
      },
      {
        question: 'What If the Slab Has Moisture Problems?',
        answer:
          'We tell you before installing, with the test data — and price a mitigation system if one is needed. Installing over a wet slab and warranting the result is not something we do.',
      },
    ],
    relatedIndustries: ['restaurants', 'industrial', 'retail', 'healthcare'],
  },
  {
    slug: 'protective-coatings',
    group: 'Coatings & Floors',
    featured: true,
    art: 'industrial',
    title: 'Protective Coatings',
    shortTitle: 'Protective Coatings',
    csi: 'CSI 09 96 00',
    kicker: 'High-Performance Systems for Hard Service',
    summary:
      'High-performance protective coatings for steel, concrete, and equipment — selected against chemical exposure, washdown, abrasion, and weather.',
    intro:
      'A protective coating is bought for what it resists. The correct system is a function of the actual service environment — which chemicals, at what concentration, cleaned how, at what temperature — and specifying it from a catalog instead of the conditions is how these systems fail early and expensively.',
    metaTitle: 'Protective Coatings | High-Performance Industrial Systems',
    metaDescription:
      'High-performance protective coatings for structural steel, concrete, tanks, and equipment. Epoxy, urethane, and specialty systems specified against real service conditions.',
    scope: [
      'Structural steel protective systems',
      'Chemical- and washdown-resistant wall coatings',
      'Tank exteriors and equipment coatings',
      'Secondary containment systems',
      'Direct-to-metal industrial finishes',
      'Manufacturer system verification before pricing',
      'SSPC-standard surface preparation',
    ],
    systems: [
      { label: 'Steel', detail: 'Epoxy primer with aliphatic urethane topcoat' },
      { label: 'Chemical Exposure', detail: 'Novolac or specialty resin matched to the exposure' },
      { label: 'Containment', detail: 'Chemical-resistant systems for the stored product' },
      { label: 'Washdown', detail: 'Catalyzed systems rated for the cleaning regime' },
    ],
    sections: [
      {
        heading: 'Specified Against Conditions',
        body: 'We collect the actual exposure during preconstruction and confirm the system with the manufacturer before it is priced. Where testing on existing coatings or substrates is warranted, we carry it in the bid and share the results.',
      },
      {
        heading: 'Preparation Is Not Optional Here',
        body: 'High-performance systems are less forgiving than architectural paint. Profile, cleanliness, and moisture are verified before application to the standard agreed in writing at bid — because most failures in this category trace to preparation, not product.',
      },
    ],
    faqs: [
      {
        question: 'How Do You Choose Between Epoxy, Urethane, and Specialty Resins?',
        answer:
          'By the exposure. Chemistry, temperature, UV, abrasion, and cleaning each rule products in or out — we match the assembly to the conditions and confirm it with the manufacturer.',
      },
      {
        question: 'Do You Handle Secondary Containment?',
        answer:
          'Yes — containment coatings are selected against the specific stored product and its concentration, not a generic chemical-resistance claim.',
      },
    ],
    relatedIndustries: ['industrial', 'aviation', 'government', 'sports-entertainment'],
  },
  {
    slug: 'line-striping',
    group: 'Coatings & Floors',
    art: 'coatings',
    title: 'Line Striping',
    shortTitle: 'Line Striping',
    csi: 'CSI 32 17 23',
    kicker: 'Parking Lots · Warehouses · Safety Marking',
    summary:
      'Parking lot striping, warehouse floor marking, and safety line work — laid out square, sprayed sharp, and compliant.',
    intro:
      'Striping is the finish everyone sees from the street and the safety system everyone depends on inside. It is bought on straight lines, correct layout, ADA compliance, and paint that survives traffic — all of which are decided by layout discipline and product selection, not by the spray rig.',
    metaTitle: 'Line Striping | Parking Lots & Warehouse Floor Marking',
    metaDescription:
      'Parking lot striping, ADA-compliant layouts, warehouse aisle marking, and facility safety striping with traffic-rated paints.',
    scope: [
      'Parking lot layout and striping',
      'ADA-compliant stall and signage marking',
      'Fire lane and regulatory marking',
      'Warehouse aisle and rack-row marking',
      'Safety zones, walkways, and hazard striping',
      'Restriping over existing layouts',
      'Night and weekend scheduling around operations',
    ],
    systems: [
      { label: 'Asphalt Lots', detail: 'Traffic-rated waterborne or acrylic marking paint' },
      { label: 'Concrete Floors', detail: 'Epoxy or urethane striping for wheel traffic' },
      { label: 'ADA Elements', detail: 'Stalls, aisles, and markings to current standards' },
      { label: 'Layout', detail: 'Measured and snapped before any paint is sprayed' },
    ],
    sections: [
      {
        heading: 'Layout Before Paint',
        body: 'A striping job is won or lost before the rig starts: stall counts, ADA positions, fire lanes, and flow are measured and snapped first. Restripes are trued up rather than blindly traced, because copying a crooked layout preserves the crooked layout.',
      },
      {
        heading: 'Scheduled Around the Operation',
        body: 'Lots and warehouses cannot close for striping. Work is phased by section, run at night or on weekends where needed, and returned to service on a stated cure time.',
      },
    ],
    faqs: [
      {
        question: 'Do You Verify ADA Compliance?',
        answer:
          'Layouts are marked to current ADA dimensional standards for stalls, access aisles, and signage positions, and we flag existing non-compliant layouts before restriping them.',
      },
      {
        question: 'How Long Before Traffic Can Return?',
        answer:
          'Waterborne lot paint typically accepts traffic within an hour in Texas conditions; floor systems vary by product. The proposal states the cure time for the specific system.',
      },
    ],
    relatedIndustries: ['retail', 'industrial', 'office', 'education'],
  },

  /* ======================================== PREPARATION & MAINTENANCE === */
  {
    slug: 'drywall-repair',
    group: 'Preparation & Maintenance',
    art: 'prep',
    title: 'Drywall Repair',
    shortTitle: 'Drywall Repair',
    csi: 'CSI 09 21 16',
    kicker: 'Patches That Disappear',
    summary:
      'Drywall repair, texture matching, and finish-level correction — the difference between a patch you can find and one you cannot.',
    intro:
      'Every repaint runs through drywall condition first, and a visible patch under new paint reads as a defect in the paint. Repairs are feathered wide, textures are matched to the existing field, and the finish level is brought to what the lighting demands — so the repair disappears instead of announcing itself.',
    metaTitle: 'Drywall Repair | Patching, Texture Matching & Finishing',
    metaDescription:
      'Drywall repair and finishing for commercial and residential spaces. Patches, texture matching, water damage repair, and Level 4 and 5 finish correction.',
    scope: [
      'Holes, cracks, and impact damage repair',
      'Water damage cutout and replacement',
      'Texture matching to the existing field',
      'Skim coating and Level 5 correction',
      'Fastener pops and joint repair',
      'Repairs carried inside the painting scope',
      'Dust containment in occupied spaces',
    ],
    systems: [
      { label: 'Patches', detail: 'Feathered wide and blended into the field' },
      { label: 'Textures', detail: 'Matched by technique to the existing finish' },
      { label: 'Critical Light', detail: 'Skim to Level 5 where the lighting demands it' },
      { label: 'Water Damage', detail: 'Cut back to sound board, sealed, and refinished' },
    ],
    sections: [
      {
        heading: 'The Patch You Cannot Find',
        body: 'A repair that reads through paint was feathered too tight or textured wrong. We blend repairs wide, match texture by technique rather than by product, and check the result under raking light before any paint goes on.',
      },
      {
        heading: 'One Trade, No Gap',
        body: 'Carrying drywall repair inside the painting scope removes the most common finger-pointing gap on a repaint — the wall is our responsibility from substrate to final coat.',
      },
    ],
    faqs: [
      {
        question: 'Can You Match Heavy or Unusual Textures?',
        answer:
          'Yes — orange peel, knockdown, skip trowel, and regional hand textures are matched with sample patches approved before the full repair.',
      },
      {
        question: 'Do You Handle Water-Damaged Drywall?',
        answer:
          'Yes, once the source is fixed. Damaged board is cut back to sound material, stains are sealed with the correct blocker, and the surface is refinished to match.',
      },
    ],
    relatedIndustries: ['office', 'healthcare', 'hospitality', 'education'],
  },
  {
    slug: 'pressure-washing',
    group: 'Preparation & Maintenance',
    art: 'exterior',
    title: 'Pressure Washing',
    shortTitle: 'Pressure Washing',
    csi: 'SVC / PW',
    kicker: 'Cleaning Matched to the Substrate',
    summary:
      'Commercial pressure washing for buildings, concrete, and site elements — pressure and chemistry matched to the surface, not maxed out.',
    intro:
      'Pressure washing done wrong is fast damage: etched wood, blown sealant joints, and water driven behind siding. Done right, it is the first step of every exterior coating and a maintenance service on its own — pressure, tips, and chemistry selected for the substrate.',
    metaTitle: 'Pressure Washing | Commercial Buildings & Concrete',
    metaDescription:
      'Commercial pressure washing for building exteriors, concrete, sidewalks, and site elements. Soft washing where the substrate requires it; coating preparation included.',
    scope: [
      'Building exterior washdown ahead of coating',
      'Soft washing for EIFS, stucco, and siding',
      'Concrete, sidewalks, and drive-through lanes',
      'Dumpster pads and service areas',
      'Mildew and organic growth treatment',
      'Gum and stain removal on flatwork',
      'Scheduled maintenance washing programs',
    ],
    systems: [
      { label: 'Coating Prep', detail: 'Washdown to a paint-ready standard, documented' },
      { label: 'Soft Substrates', detail: 'Low-pressure chemical cleaning, rinsed thoroughly' },
      { label: 'Concrete', detail: 'Surface cleaners for even, streak-free results' },
      { label: 'Organic Growth', detail: 'Treated at the source, not just blasted off' },
    ],
    sections: [
      {
        heading: 'Pressure Is a Tool, Not a Setting',
        body: 'EIFS, wood, and aged masonry are destroyed by the pressure that concrete shrugs off. We match pressure, tip, distance, and chemistry to each surface — soft washing where the substrate requires it — because the goal is a clean surface, not a scarred one.',
      },
      {
        heading: 'As Preparation or as Maintenance',
        body: 'Washing is built into every exterior coating scope, and it stands alone as scheduled maintenance for storefronts, drive-throughs, and common areas that are judged on how clean they look.',
      },
    ],
    faqs: [
      {
        question: 'Will Washing Damage Sealant Joints or Siding?',
        answer:
          'Not when the method matches the substrate. Joints and soft materials get low-pressure chemical cleaning; high pressure is reserved for concrete and hard masonry.',
      },
      {
        question: 'Do You Offer Recurring Maintenance Washing?',
        answer:
          'Yes — scheduled programs for retail, restaurant, and office properties, run at night or before opening so the site is clean when customers arrive.',
      },
    ],
    relatedIndustries: ['retail', 'restaurants', 'office', 'industrial'],
  },
  {
    slug: 'caulking-sealants',
    group: 'Preparation & Maintenance',
    art: 'prep',
    title: 'Caulking & Sealants',
    shortTitle: 'Caulking & Sealants',
    csi: 'CSI 07 92 00',
    kicker: 'The Joints That Keep Water Out',
    summary:
      'Joint sealant replacement and installation — the scope that decides whether an exterior coating lasts and a building stays dry.',
    intro:
      'Sealant joints are the building envelope working parts: they move with the structure and keep water out while doing it. Failed joints defeat any coating applied over them, which is why sealant condition is surveyed on every exterior bid — and why replacement is carried as its own visible line item.',
    metaTitle: 'Caulking & Sealant Replacement | Building Joint Sealants',
    metaDescription:
      'Commercial caulking and joint sealant replacement. Expansion joints, panel joints, window perimeters, and wet-area sealants with correct joint design.',
    scope: [
      'Expansion and control joint replacement',
      'Tilt-wall and precast panel joints',
      'Window and door perimeter sealants',
      'Dissimilar material transitions',
      'Interior wet-area sealants',
      'Failed sealant cutout and joint preparation',
      'Backer rod and correct joint geometry',
    ],
    systems: [
      { label: 'Moving Joints', detail: 'Urethane or hybrid sealant sized to the movement' },
      { label: 'Panel Joints', detail: 'Cut out, backer rod set, tooled to profile' },
      { label: 'Perimeters', detail: 'Sealed to the adjacent substrate correctly' },
      { label: 'Wet Areas', detail: 'Mildew-resistant sealants tooled clean' },
    ],
    sections: [
      {
        heading: 'Joint Geometry Is the Specification',
        body: 'A sealant bead without backer rod, bonded on three sides, tears itself apart with the first thermal cycle regardless of product quality. Joints are cut out, sized, and tooled to the geometry the sealant is designed for — which is the difference between a five-year joint and a twenty-year joint.',
      },
      {
        heading: 'Surveyed Before Every Exterior Coat',
        body: 'Coating over failed sealant guarantees water behind a new finish. Every exterior scope includes a written joint condition survey so replacement is a deliberate decision, made before the coating rather than after the leak.',
      },
    ],
    faqs: [
      {
        question: 'Can Sealant Color Match the Finish?',
        answer:
          'Yes — sealants are available in standard colors and can be coated where paintable products are specified, so joints read as part of the finish rather than an interruption.',
      },
      {
        question: 'How Long Does Sealant Replacement Last?',
        answer:
          'Correctly designed and installed joints deliver the full manufacturer service life — typically well over a decade. Our workmanship warranty covers the installation itself.',
      },
    ],
    relatedIndustries: ['industrial', 'retail', 'office', 'education'],
  },
  {
    slug: 'maintenance-painting',
    group: 'Preparation & Maintenance',
    featured: true,
    art: 'occupied',
    title: 'Maintenance Painting',
    shortTitle: 'Maintenance Painting',
    csi: 'SVC / MNT',
    kicker: 'Repaints & Occupied-Building Programs',
    summary:
      'Repaint and maintenance programs for occupied buildings — phased, off-hours, and returned to service every morning.',
    intro:
      'Maintenance painting is the discipline of working in a building that never stops being used. Odor, dust, noise, and traffic all leave the work area, and the people affected did not sign the contract. The scope that matters is phasing, containment, and handing the space back clean every single day.',
    metaTitle: 'Maintenance Painting | Occupied Building Repaint Programs',
    metaDescription:
      'Maintenance and repaint programs for occupied offices, stores, hotels, schools, and facilities. Night shifts, phased zones, low-odor systems, and daily return to service.',
    scope: [
      'Facility repaint programs, phased by zone',
      'Night, weekend, and off-hours shifts',
      'Common area and corridor refresh work',
      'Low-VOC and low-odor system specification',
      'Touch-up and punch programs for property managers',
      'Multi-property and portfolio scheduling',
      'Daily protection, cleanup, and return to service',
    ],
    systems: [
      { label: 'Occupied Interiors', detail: 'Low-odor acrylics with fast return to service' },
      { label: 'High-Traffic Areas', detail: 'Scrubbable systems that survive cleaning' },
      { label: 'Phasing', detail: 'Zones with stated start, finish, and return times' },
      { label: 'Portfolios', detail: 'Consistent specification across properties' },
    ],
    sections: [
      {
        heading: 'Zoning Is the Whole Plan',
        body: 'Before anything is opened, the building is divided into zones with a defined start, finish, and return-to-service time the facility can plan around — which is what lets a hotel keep keys sellable, a school keep summer programs running, and an office keep tenants undisturbed.',
      },
      {
        heading: 'The Standard Facility Managers Remember',
        body: 'The space should look untouched apart from the finish: floors protected, furniture returned, corridors clear, no tape residue or overspray. It is the single thing facility managers remember about a contractor, and it is why maintenance work becomes repeat work.',
      },
    ],
    faqs: [
      {
        question: 'Do You Run Recurring Programs?',
        answer:
          'Yes — annual and multi-year repaint programs for properties and portfolios, with a documented color schedule so every phase matches the last.',
      },
      {
        question: 'How Do You Handle Odor Complaints?',
        answer:
          'By preventing them: low-VOC systems are specified for occupied areas during preconstruction, and building management gets advance notice of every phase.',
      },
    ],
    relatedIndustries: ['office', 'healthcare', 'hospitality', 'education', 'aviation'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceSlugs = services.map((s) => s.slug);
export const featuredServices = services.filter((s) => s.featured);

export const serviceGroups = ['Service Lines', 'Painting & Finishes', 'Coatings & Floors', 'Preparation & Maintenance'] as const;
export const servicesByGroup = (group: string) => services.filter((s) => s.group === group);
