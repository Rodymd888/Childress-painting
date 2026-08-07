/**
 * INDUSTRY SECTORS
 * ---------------------------------------------------------------------------
 * Drives /industries, /industries/[slug], navigation, project filtering, and
 * structured data. Content describes how work in each sector is planned and
 * executed. Client names referenced here are drawn from lib/clients.ts.
 *
 * TO ADD AN INDUSTRY: append a record. Nothing else needs to change — the
 * index page, nav, sitemap, and project filters all read from this array.
 */

export type Industry = {
  slug: string;
  title: string;
  shortTitle: string;
  /** Mono label rendered in the title block. */
  code: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** The constraints that actually define work in this sector. */
  constraints: { title: string; body: string }[];
  /** Typical facility and space types. */
  facilities: string[];
  /** Slugs from lib/services.ts. */
  relatedServices: string[];
  /** Slug from lib/clients.ts, if a client group maps to this sector. */
  clientGroup?: string;
  /** Key into components/ui/SectorArt.tsx. */
  art: string;
  /** REPLACE — path to cleared photography, e.g. '/images/industries/retail.jpg' */
  image?: string;
};

export const industries: Industry[] = [
  {
    slug: 'retail',
    art: 'retail',
    title: 'Retail',
    shortTitle: 'Retail',
    code: 'SEC / RTL',
    clientGroup: 'retail',
    summary:
      'National chains, big-box, and specialty stores, new builds, remodels, and multi-site rollouts held to a brand standard.',
    intro:
      'Retail painting is measured against two things that rarely move: the brand standard and the grand-opening date. The colors, sheens, and manufacturers are usually dictated by a corporate prototype book, and the store opens on the day the marketing calendar says it opens. Our job is to hit both without a punch list that follows the store into business.',
    metaTitle: 'Retail Painting Contractor | National Chains & Big-Box',
    metaDescription:
      'Commercial painting for retail: national chains, big-box, and specialty stores. Prototype color compliance, night work, and grand-opening schedules across Texas.',
    constraints: [
      {
        title: 'Prototype Compliance',
        body: 'Most national retailers publish a finish standard down to the manufacturer and product code. We verify the schedule against the prototype book during preconstruction and flag substitutions in writing before anything is ordered. Not after a district manager walks the store.',
      },
      {
        title: 'Fixed Opening Dates',
        body: 'A retail opening is a marketing event with advertising already bought. Paint sits between drywall and fixture install, and it absorbs upstream delay. We plan manpower for the compressed version of the schedule, because that is usually the one that happens.',
      },
      {
        title: 'Remodels Around Trading Hours',
        body: 'Remodels in a store that stays open run at night, behind barricade, with the sales floor returned each morning. Containment, dust control, and low-odor systems are agreed with the store manager before mobilization.',
      },
    ],
    facilities: [
      'Big-box and warehouse-format stores',
      'Strip center and inline tenant spaces',
      'Pharmacy and convenience formats',
      'Grocery and discount grocery',
      'Apparel and specialty retail',
      'Outlet and mall in-line spaces',
      'Back-of-house, stockroom, and receiving',
      'Storefront, canopy, and exterior signage bands',
    ],
    relatedServices: [
      'interior-painting',
      'commercial-painting',
      'maintenance-painting',
    ],
  },
  {
    slug: 'restaurants',
    art: 'restaurants',
    title: 'Restaurants',
    shortTitle: 'Restaurants',
    code: 'SEC / RST',
    clientGroup: 'restaurants',
    summary:
      'Quick-service, fast-casual, and full-service concepts, tight footprints, hard opening dates, and finishes built for a commercial kitchen.',
    intro:
      'Restaurants pack a great deal of finish into a small building, and much of it has to survive heat, grease, steam, and daily scrubbing. Front-of-house is a design statement; back-of-house is a maintenance problem. The two need different systems, and getting that wrong shows up within a year.',
    metaTitle: 'Restaurant Painting Contractor | QSR, Fast-Casual & Full-Service',
    metaDescription:
      'Commercial painting for restaurants across Texas: quick-service, fast-casual, and full-service. Kitchen-rated coatings, decorative front-of-house finishes, and opening-date schedules.',
    constraints: [
      {
        title: 'Two Buildings in One',
        body: 'Dining rooms get decorative and accent finishes under close visual scrutiny. Kitchens, prep, and dish get epoxy or scrubbable systems rated for washdown. We specify them separately and price them separately, so neither gets value-engineered into the wrong product.',
      },
      {
        title: 'Small Site, Many Trades',
        body: 'A 3,000 SF restaurant can have six trades working at once in the last two weeks. We coordinate directly with millwork, equipment, and flooring so painting happens in the right order and does not get damaged the day after it is finished.',
      },
      {
        title: 'Opening Day Is Fixed',
        body: 'Training, hiring, and soft-open dates are set before construction finishes. Where the schedule compresses, we add shifts and not move the date.',
      },
    ],
    facilities: [
      'Dining rooms and bar areas',
      'Commercial kitchens and prep areas',
      'Walk-in and cooler surrounds',
      'Restrooms and corridors',
      'Drive-through canopies and exteriors',
      'Patio and outdoor dining structures',
      'Exposed structure and ceilings',
      'Decorative and accent wall finishes',
    ],
    relatedServices: [
      'interior-painting',
      'commercial-painting',
      'protective-coatings',
      'pressure-washing',
    ],
  },
  {
    slug: 'healthcare',
    art: 'healthcare',
    title: 'Healthcare',
    shortTitle: 'Healthcare',
    code: 'SEC / HC',
    clientGroup: 'healthcare',
    summary:
      'Surgery centers, clinics, medical office buildings, and specialty practices where infection control governs the schedule.',
    intro:
      'Healthcare work is judged by what happens outside the work area. Dust, odor, noise, and traffic all leave the room you are painting, and every one of them affects a department that cannot stop operating. The coating scope is straightforward; the planning around it is not.',
    metaTitle: 'Healthcare Painting Contractor | Surgery Centers & Medical Offices',
    metaDescription:
      'Painting and coatings for surgery centers, clinics, and medical office buildings. Infection-control-aware planning, low-odor systems, and department-by-department phasing.',
    constraints: [
      {
        title: 'Infection Control',
        body: 'Work in and adjacent to patient care areas is planned around the facility infection control risk assessment. Containment, negative air, and traffic routes are agreed with the facility before mobilization, not improvised on the first day.',
      },
      {
        title: 'Odor and Air Quality',
        body: 'Low-VOC and low-odor systems are specified in preconstruction wherever the coating is applied near occupied clinical space. Where a high-performance system is required, the schedule is built around ventilation and cure windows.',
      },
      {
        title: 'Department Uptime',
        body: 'Clinical departments run on appointment schedules booked weeks out. Work is phased room by room, or after hours, so the department loses the minimum number of rooms at any one time.',
      },
    ],
    facilities: [
      'Ambulatory surgery centers',
      'Specialty clinics and physician suites',
      'Medical office buildings',
      'Imaging and diagnostic suites',
      'Exam rooms and procedure rooms',
      'Waiting areas and public corridors',
      'Sterile processing and support space',
      'Med spa and elective care environments',
    ],
    relatedServices: [
      'maintenance-painting',
      'interior-painting',
      'protective-coatings',
      'commercial-painting',
    ],
  },
  {
    slug: 'education',
    art: 'education',
    title: 'Education',
    shortTitle: 'Education',
    code: 'SEC / EDU',
    summary:
      'District-level painting programs across elementary, middle, and high school campuses, planned around the academic calendar.',
    intro:
      'School work is a summer business. A district hands over a list of campuses in May and expects every one of them ready for staff before August. That is a manpower and logistics problem more than a painting problem: multiple buildings running at once, each with its own access, storage, and sign-off.',
    metaTitle: 'School & Education Painting Contractor | District Programs',
    metaDescription:
      'District-level school painting programs across elementary, middle, and high school campuses. Summer-window scheduling, low-VOC systems, and multi-campus manpower planning.',
    constraints: [
      {
        title: 'The Summer Window',
        body: 'Between the last day of school and staff return, there are roughly ten workable weeks. Multi-campus programs are staffed to run in parallel, with a per-campus completion date instead of one program-wide finish line.',
      },
      {
        title: 'Occupied-Building Standards',
        body: 'Buildings that host summer programs, athletics, and administration are never fully empty. Zoning, low-odor systems, and daily cleanup are planned as though students are present, because some of them are.',
      },
      {
        title: 'Durability Over Decoration',
        body: 'Corridors, gyms, and cafeterias take physical abuse for a decade between repaints. Product selection favors scrubbable, high-hide systems that survive lockers, carts, and cleaning chemicals.',
      },
    ],
    facilities: [
      'Elementary, middle, and high school campuses',
      'Classrooms and corridors',
      'Gymnasiums and locker rooms',
      'Cafeterias and commons',
      'Auditoriums and performance spaces',
      'Administration and district offices',
      'Athletic facilities and field structures',
      'Community college and higher-education buildings',
    ],
    relatedServices: [
      'interior-painting',
      'exterior-painting',
      'maintenance-painting',
      'pressure-washing',
    ],
  },
  {
    slug: 'industrial',
    art: 'industrial',
    title: 'Industrial',
    shortTitle: 'Industrial',
    code: 'SEC / IND',
    clientGroup: 'commercial-industrial',
    summary:
      'Manufacturing plants, processing facilities, and distribution centers where coatings are selected for service conditions, not appearance.',
    intro:
      'In an industrial building the coating is a maintenance decision. It has to handle temperature, chemical exposure, washdown, abrasion, or all four, and it has to be applied in the window the plant is willing to give up. Specification and surface preparation carry more weight here than anywhere else on the site.',
    metaTitle: 'Industrial Painting & Coatings Contractor | Plants & Distribution',
    metaDescription:
      'Industrial painting and high-performance coatings for manufacturing plants, processing facilities, and distribution centers. Substrate preparation, shutdown scheduling, and containment.',
    constraints: [
      {
        title: 'Service Environment Drives the System',
        body: 'Chemical exposure, washdown, thermal cycling, and abrasion each rule out different products. The system is selected against the actual service conditions and confirmed with the manufacturer before it is priced.',
      },
      {
        title: 'Shutdown Windows',
        body: 'Work that requires a line to stop is planned to the hour. Scope is broken into what can be done live, what needs the line down, and what needs the area fully cleared, priced separately so the plant can decide.',
      },
      {
        title: 'Preparation Is the Scope',
        body: 'Most industrial coating failures trace to preparation, not product. Profile, cleanliness, and moisture are verified before application, and the standard is agreed in writing at bid.',
      },
    ],
    facilities: [
      'Manufacturing and processing plants',
      'Warehouse and distribution centers',
      'Structural silver and mezzanines',
      'Tank exteriors and equipment',
      'Concrete floors and containment areas',
      'Mechanical and utility rooms',
      'Loading docks and truck courts',
      'Safety striping and line marking',
    ],
    relatedServices: [
      'protective-coatings',
      'pressure-washing',
      'exterior-painting',
      'maintenance-painting',
    ],
  },
  {
    slug: 'government',
    art: 'government',
    title: 'Government & Municipal',
    shortTitle: 'Government',
    code: 'SEC / GOV',
    clientGroup: 'government',
    summary:
      'Public safety, civic, and municipal facilities with procurement documentation and inspection sign-off built into the schedule.',
    intro:
      'Public work carries a documentation burden that private work does not. Submittals, certified payroll where it applies, insurance thresholds, and inspection sign-off are all part of the scope, and a project that is finished but not documented is not finished. We plan for the paperwork the same way we plan for the paint.',
    metaTitle: 'Government & Municipal Painting Contractor | Public Facilities',
    metaDescription:
      'Painting for municipal, civic, and public safety facilities. Procurement documentation, prevailing-wage familiarity, inspection coordination, and phased work in occupied buildings.',
    constraints: [
      {
        title: 'Procurement and Documentation',
        body: 'Bid forms, submittals, certified payroll where required, and closeout documentation are handled as scope items with their own deadlines. Not as an afterthought once the painting is done.',
      },
      {
        title: 'Facilities That Stay Open',
        body: 'Police departments, city halls, and community facilities operate through construction. Work is zoned and scheduled around public access, staff shifts, and secure areas.',
      },
      {
        title: 'Inspection Sign-Off',
        body: 'Work is presented for inspection at the right stage rather than at the end, so a rejected substrate does not require tearing out finished work.',
      },
    ],
    facilities: [
      'Police and fire stations',
      'City halls and administrative buildings',
      'Community and memorial halls',
      'Public works and transfer stations',
      'Veterans and civic organization facilities',
      'Libraries and recreation centers',
      'Maintenance and fleet buildings',
      'Secure and restricted-access areas',
    ],
    relatedServices: [
      'interior-painting',
      'exterior-painting',
      'maintenance-painting',
      'pressure-washing',
    ],
  },
  {
    slug: 'office',
    art: 'office',
    title: 'Commercial Office',
    shortTitle: 'Office',
    code: 'SEC / OFF',
    summary:
      'Multi-tenant office buildings, corporate interiors, and tenant improvement work delivered against a lease commencement date.',
    intro:
      'Office work is lease-driven. A landlord has committed to deliver a finished suite on a date, and every day past it is rent that is not being collected. The painting scope is rarely complicated; the coordination with base-building systems, other tenants, and building management usually is.',
    metaTitle: 'Commercial Office Painting Contractor | Tenant Improvements',
    metaDescription:
      'Painting for multi-tenant office buildings, corporate interiors, and tenant improvements. Lease-date delivery, after-hours work, and coordination with building management.',
    constraints: [
      {
        title: 'Lease Commencement Dates',
        body: 'Delivery dates are contractual. Painting is one of the last scopes in a TI and absorbs upstream delay, so manpower is planned against the compressed schedule from the start.',
      },
      {
        title: 'Occupied Buildings',
        body: 'Work happens in buildings full of other tenants. Freight elevator windows, after-hours access, noise limits, and common-area protection are confirmed with building management before mobilization.',
      },
      {
        title: 'Base Building Versus Tenant Scope',
        body: 'The line between landlord work and tenant work causes more disputes than any finish issue. We define it in the bid instead of discovering it during construction.',
      },
    ],
    facilities: [
      'Multi-tenant office buildings',
      'Corporate headquarters and suites',
      'Speculative suites and white-box shells',
      'Elevator lobbies and common corridors',
      'Conference and training rooms',
      'Building amenity and fitness spaces',
      'Parking structures and stairwells',
      'Tenant demising and office splits',
    ],
    relatedServices: [
      'commercial-painting',
      'interior-painting',
      'maintenance-painting',
    ],
  },
  {
    slug: 'hospitality',
    art: 'hospitality',
    title: 'Hospitality',
    shortTitle: 'Hospitality',
    code: 'SEC / HSP',
    summary:
      'Hotels, entertainment venues, and guest-facing environments where finish quality is the product and rooms out of service cost revenue.',
    intro:
      'In hospitality the finish is not a background, guests are paying for it and reviewing it. At the same time, every room, floor, or outlet taken out of service is lost revenue, so the work is scheduled in blocks and returned fast, at a standard that survives close inspection.',
    metaTitle: 'Hospitality Painting Contractor | Hotels & Entertainment Venues',
    metaDescription:
      'Painting for hotels, entertainment venues, and guest-facing environments. Floor-by-floor phasing, decorative and specialty finishes, and fast return to service.',
    constraints: [
      {
        title: 'Rooms Out of Service',
        body: 'Work is blocked by floor or wing so the property keeps the maximum number of keys sellable. Each block has a firm return date the property can book against.',
      },
      {
        title: 'Finish Quality Is the Product',
        body: 'Guest-facing surfaces are inspected from two feet away in good light. Mockups are approved before production, and the quality-control walk happens before the property is asked to look at it.',
      },
      {
        title: 'Guests Are Always Present',
        body: 'Odor, noise, and corridor traffic are managed for people who are sleeping and paying. Low-odor systems and controlled work hours are planned, not negotiated on site.',
      },
    ],
    facilities: [
      'Guest rooms and corridors',
      'Lobbies and reception areas',
      'Restaurants, bars, and outlets',
      'Ballrooms and meeting space',
      'Fitness and pool areas',
      'Back-of-house and service corridors',
      'Decorative and accent finishes',
      'Exterior facades and porte-cocheres',
    ],
    relatedServices: [
      'maintenance-painting',
      'interior-painting',
      'exterior-painting',
      'commercial-painting',
    ],
  },
  {
    slug: 'sports-entertainment',
    art: 'sports',
    title: 'Sports & Entertainment',
    shortTitle: 'Sports & Entertainment',
    code: 'SEC / SPT',
    clientGroup: 'sports-entertainment',
    summary:
      'Stadiums, arenas, and venues where the work happens in the windows between events, seasons, and public access.',
    intro:
      'Venue work runs on somebody else\'s calendar. There is a fixed number of dark days between events and a hard date when the building has to be ready for a crowd, television, and inspection. Scope gets divided into what fits in a dark night and what needs the off-season, and neither one moves.',
    metaTitle: 'Stadium & Arena Painting Contractor | Sports Venues',
    metaDescription:
      'Painting for stadiums, arenas, and entertainment venues. Between-event and off-season scheduling, concourse and structural coatings, and hard event-date deadlines.',
    constraints: [
      {
        title: 'Event Calendars Are Immovable',
        body: 'Work is scheduled into dark days and off-season windows. Scope is sized to the window it actually fits in, with the balance deferred not rushed into an event day.',
      },
      {
        title: 'Public Assembly Standards',
        body: 'Venues are inspected for life safety, egress, and finish compliance before a crowd is admitted. Coatings are selected and documented with that inspection in mind.',
      },
      {
        title: 'Scale and Access',
        body: 'Concourses, structure, and seating bowls need lifts, scaffold, and staged access planned before mobilization, often through loading docks shared with every other trade in the building.',
      },
    ],
    facilities: [
      'Concourses and public circulation',
      'Suites, clubs, and premium areas',
      'Seating bowl structure and rails',
      'Locker rooms and team facilities',
      'Concession and retail outlets',
      'Restrooms and support space',
      'Exposed structural silver',
      'Exterior facades and gates',
    ],
    relatedServices: [
      'interior-painting',
      'protective-coatings',
      'maintenance-painting',
      'pressure-washing',
    ],
  },
  {
    slug: 'aviation',
    art: 'aviation',
    title: 'Aviation',
    shortTitle: 'Aviation',
    code: 'SEC / AVN',
    summary:
      'Terminal and airport-adjacent work performed under badging, escort, and security requirements inside a facility that never closes.',
    intro:
      'Airport work adds a layer no other sector has: badging, escorts, security screening for tools and materials, and access windows tied to flight operations. The painting is ordinary commercial work. Getting a crew and a spray rig to the wall, at 2 a.m., through a security checkpoint, is not.',
    metaTitle: 'Airport & Aviation Painting Contractor | Terminals',
    metaDescription:
      'Painting for airport terminals and aviation facilities. Badging and escort compliance, overnight access windows, concession finish-outs, and work around live passenger operations.',
    constraints: [
      {
        title: 'Badging and Security',
        body: 'Crews are badged, escorted where required, and tool and material lists are cleared in advance. Lead time for credentialing is treated as part of the schedule, because it is.',
      },
      {
        title: 'Live Passenger Operations',
        body: 'Terminals do not close. Work happens overnight or behind barricade, with the area returned clean and open before the first bank of departures.',
      },
      {
        title: 'Concession and Tenant Fit-Outs',
        body: 'Airport retail and food tenants have the same brand standards as their street locations but half the access. Deliveries, staging, and waste removal are planned around the same overnight window as the work.',
      },
    ],
    facilities: [
      'Terminal concourses and hold rooms',
      'Concession and retail tenant spaces',
      'Restrooms and passenger amenities',
      'Baggage claim and ticketing halls',
      'Back-of-house and airline operations',
      'Jet bridges and support structures',
      'Exposed structure and ceilings',
      'Wayfinding and finish transitions',
    ],
    relatedServices: [
      'maintenance-painting',
      'interior-painting',
      'commercial-painting',
      'protective-coatings',
    ],
  },
  {
    slug: 'tenant-improvements',
    art: 'tenant',
    title: 'Tenant Improvements',
    shortTitle: 'Tenant Improvements',
    code: 'SEC / TI',
    summary:
      'Shell-to-suite build-outs and re-tenanting work delivered against a landlord commitment date.',
    intro:
      'Tenant improvement work is defined by a date in a lease and a scope that keeps moving until the tenant signs off on drawings. Painting sits near the end, which means it inherits every delay upstream of it. The way to protect the date is to plan the compressed version of the schedule before it becomes necessary.',
    metaTitle: 'Tenant Improvement Painting Contractor | TI Build-Outs',
    metaDescription:
      'Tenant improvement painting for shell-to-suite build-outs and re-tenanting. Lease-date delivery, landlord versus tenant scope definition, and fast punch closeout.',
    constraints: [
      {
        title: 'The Date Is in a Lease',
        body: 'Delivery dates carry financial consequences for the landlord. We commit manpower against the date rather than the ideal duration.',
      },
      {
        title: 'Scope Moves Late',
        body: 'Tenant-driven changes arrive after the bid. Changes are priced and turned around quickly so a decision is not waiting on a number.',
      },
      {
        title: 'Punch Drives Occupancy',
        body: 'A tenant will not accept a suite with an open punch list. We run our own quality walk before the general contractor\'s, so the list handed over is short.',
      },
    ],
    facilities: [
      'Shell-to-suite office build-outs',
      'Retail and restaurant in-line spaces',
      'Medical and professional suites',
      'Speculative suite programs',
      'Demising walls and office splits',
      'Common area and lobby upgrades',
      'White-box and vanilla-shell delivery',
      'Re-tenanting and refresh scopes',
    ],
    relatedServices: [
      'commercial-painting',
      'interior-painting',
      'pressure-washing',
    ],
  },
  {
    slug: 'residential',
    art: 'interior',
    title: 'Residential',
    shortTitle: 'Residential',
    code: 'SEC / RES',
    summary:
      'Interior and exterior work in private homes, delivered with the protection, communication, and cleanliness standards our commercial crews already work to.',
    intro:
      'A home is an occupied building with an owner living in it, which makes it the strictest version of the occupied-site problem we solve every week on commercial projects. The coatings are ordinary. Protecting the house, keeping it livable each evening, and finishing when we said we would is the work.',
    metaTitle: 'Residential Painting Contractor | Interior & Exterior Homes',
    metaDescription:
      'Residential interior and exterior painting, cabinet refinishing, and custom wood staining with commercial-grade preparation, daily cleanup, and a written workmanship warranty.',
    constraints: [
      {
        title: 'Someone Lives Here',
        body: 'Floors, fixtures, and furnishings are protected before the first can is opened, and the house is returned to use every evening. Low-odor systems are specified for occupied rooms rather than substituted after a complaint.',
      },
      {
        title: 'Finish Quality Is Inspected Closely',
        body: 'Residential work is examined from two feet away, in daylight, by the person paying for it. Cut lines, sheen uniformity, and trim finishing carry more weight here than on any commercial punch walk.',
      },
      {
        title: 'One Crew, Start to Finish',
        body: 'The same crew works the project through, so nobody has to re-explain the scope. A written scope up front means the final walk is measured against a document and not a memory.',
      },
    ],
    facilities: [
      'Interior walls, ceilings, and trim',
      'Kitchen and bathroom cabinetry',
      'Stain-grade doors and millwork',
      'Exterior siding, stucco, and brick',
      'Fascia, soffit, and exterior trim',
      'Garages and utility spaces',
      'Feature walls and specialty finishes',
      'Drywall repair and texture matching',
    ],
    relatedServices: [
      'residential-painting',
      'interior-painting',
      'exterior-painting',
      'cabinet-painting-refinishing',
      'custom-wood-staining',
      'drywall-repair',
    ],
  },
  {
    slug: 'new-construction',
    art: 'construction',
    title: 'New Construction',
    shortTitle: 'New Construction',
    code: 'SEC / NEW',
    summary:
      'Ground-up commercial construction with Division 09 finishes sequenced against the general contractor\'s CPM schedule.',
    intro:
      'On a ground-up job, painting is a schedule position before it is a finish. We are behind drywall and ahead of flooring, casework, and equipment, and the amount of float in front of us is decided months before we mobilize. The value we add is knowing that, planning manpower for it, and telling the superintendent early when something upstream is going to move us.',
    metaTitle: 'New Construction Painting Contractor | Division 09 Finishes',
    metaDescription:
      'Ground-up commercial construction painting. Division 09 packages, CPM schedule sequencing, submittals and mockups, and documented punch closeout for general contractors.',
    constraints: [
      {
        title: 'Sequence, Not Duration',
        body: 'The question is never how long painting takes, it is which areas are released, in what order, and whether drywall is actually finished. We plan against the release sequence and hold manpower to it.',
      },
      {
        title: 'Submittals and Mockups First',
        body: 'Product data, color schedules, and mockups are submitted early so approval is not on the critical path when production starts.',
      },
      {
        title: 'Closeout Is Scope',
        body: 'Attic stock, warranty documentation, touch-up, and final cleaning are planned line items, delivered with the punch list rather than chased afterwards.',
      },
    ],
    facilities: [
      'Ground-up commercial buildings',
      'Retail and restaurant new builds',
      'Medical office and clinic construction',
      'Warehouse and distribution facilities',
      'Public and institutional buildings',
      'Structural silver and exposed systems',
      'Exterior envelope coatings',
      'Site structures and canopies',
    ],
    relatedServices: [
      'commercial-painting',
      'interior-painting',
      'exterior-painting',
      'pressure-washing',
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
export const industrySlugs = industries.map((i) => i.slug);
