/**
 * MARKET SECTOR DEFINITIONS
 * ---------------------------------------------------------------------------
 * Drives /markets, /markets/[slug], navigation, and structured data.
 * Content describes how work in each sector is planned and executed. It does
 * not claim specific completed projects, clients, or credentials.
 */

export type Market = {
  slug: string;
  title: string;
  /** Short label for navigation and cards. */
  shortTitle: string;
  /** Mono label shown in the title block. */
  code: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** The constraints that define work in this sector. */
  constraints: { title: string; body: string }[];
  /** Typical facility and space types. */
  facilities: string[];
  /** How the work is planned — sector-specific practice. */
  approach: { heading: string; body: string }[];
  relatedServices: string[];
  /** Key into components/ui/SectorArt.tsx — drawn artwork used until a real
      photograph is supplied via `image`. */
  art: string;
  /** Legacy gradient, retained as the final fallback. */
  gradient: string;
  /** REPLACE — path to a real, cleared photograph, e.g. '/images/markets/healthcare.jpg' */
  image?: string;
};

export const markets: Market[] = [
  {
    slug: 'healthcare',
    art: 'healthcare',
    title: 'Healthcare',
    shortTitle: 'Healthcare',
    code: 'SECTOR / HC',
    summary:
      'Hospitals, clinics, surgery centers, and medical office buildings where infection control and department uptime govern the schedule.',
    intro:
      'Healthcare work is judged by what happens outside the work area. Dust, odor, noise, and traffic all leave the room you are painting, and every one of them affects a department that cannot stop operating. The painting scope is straightforward; the planning around it is not.',
    metaTitle: 'Healthcare Painting Contractor | Hospitals & Medical Facilities',
    metaDescription:
      'Painting and coatings for hospitals, clinics, and medical office buildings in Dallas–Fort Worth. ICRA-aware planning, low-odor systems, and department-by-department phasing.',
    constraints: [
      {
        title: 'Infection control',
        body: 'Work in and adjacent to patient care areas is planned around the facility’s infection control risk assessment. Containment, negative air, and traffic routes are agreed with the facility before mobilization, not improvised on the first day.',
      },
      {
        title: 'Odor and air quality',
        body: 'Low-VOC and low-odor systems are specified during preconstruction where the coating is applied near occupied clinical space. Where a high-performance system is required, the schedule is built around ventilation and cure windows.',
      },
      {
        title: 'Department uptime',
        body: 'Rooms come out of service one at a time. Production is planned around the release schedule the facility can actually support, with crews sized to complete and return each space within the agreed window.',
      },
      {
        title: 'Durable, cleanable finishes',
        body: 'Corridors, exam rooms, and soiled utility spaces take abuse from carts and cleaning chemicals. Finish selection accounts for scrubbability and chemical resistance, not just color.',
      },
    ],
    facilities: [
      'Acute care hospitals',
      'Outpatient clinics and surgery centers',
      'Medical office buildings',
      'Imaging and diagnostic suites',
      'Pharmacy and lab build-outs',
      'Behavioral health facilities',
      'Long-term care and rehabilitation',
      'Central plant and support areas',
    ],
    approach: [
      {
        heading: 'Plan the containment before the schedule',
        body: 'The containment method determines how much area can be released at once, which determines the schedule. We work that order backward from the facility’s requirements rather than proposing a duration and then discovering the barrier requirements make it impossible.',
      },
      {
        heading: 'Coordinate with clinical staff, not just the GC',
        body: 'On renovation work inside an operating facility, the department manager controls access. We attend the coordination meetings where those decisions get made, confirm daily access windows in writing, and keep the crew inside them.',
      },
      {
        heading: 'Leave the space clinical every night',
        body: 'Areas adjacent to occupied departments are cleaned, cleared, and returned each day. Material is stored in the agreed location, not in a corridor. Barriers are inspected before the crew leaves.',
      },
    ],
    relatedServices: ['commercial-painting', 'new-construction'],
    gradient: 'from-[#c8d3dc] via-[#7d8f9e] to-[#243444]',
  },
  {
    slug: 'aviation',
    art: 'aviation',
    title: 'Aviation',
    shortTitle: 'Aviation',
    code: 'SECTOR / AV',
    summary:
      'Terminals, concourses, hangars, maintenance facilities, and airside support buildings where badging and access control shape every day of work.',
    intro:
      'Aviation projects add a layer that most commercial work does not have: controlled access. Crews need badging, escorts, and vehicle authorization, and the work window is often defined by flight schedules rather than by the construction schedule. Production planning starts with access, not with square footage.',
    metaTitle: 'Aviation Painting Contractor | Terminals, Hangars & Airside',
    metaDescription:
      'Painting and industrial coatings for aviation facilities in Texas — terminals, concourses, hangars, and maintenance buildings. Badging-aware planning and night-shift phasing.',
    constraints: [
      {
        title: 'Badging and secured access',
        body: 'Personnel clearance takes time and applies to every crew member on site. Badging timelines are built into the mobilization plan, and crew rosters are kept stable so production does not stall behind paperwork.',
      },
      {
        title: 'Work windows tied to operations',
        body: 'Public areas in an active terminal are usually released overnight. Setup, production, cleanup, and reopening all have to fit inside that window, which changes how crews are staged and how much area can be opened per shift.',
      },
      {
        title: 'High-traffic public finishes',
        body: 'Concourse and terminal finishes take constant contact. Coatings are selected for durability and cleanability, and touch-up procedures are documented for the facility team.',
      },
      {
        title: 'Airside and FOD control',
        body: 'Work near aircraft movement areas requires strict material control, tool accountability, and cleanup discipline. Containment and waste handling are planned for the specific area before mobilizing.',
      },
    ],
    facilities: [
      'Passenger terminals and concourses',
      'Ticketing, baggage, and back-of-house areas',
      'Aircraft hangars and MRO facilities',
      'Air cargo and freight buildings',
      'Ground support equipment facilities',
      'Rental car and parking structures',
      'Airfield support and utility buildings',
      'Administrative and airline offices',
    ],
    approach: [
      {
        heading: 'Start the access process early',
        body: 'Badging, background checks, and escort requirements are treated as long-lead items. They go on the mobilization schedule alongside material submittals so the crew is cleared before the area is released.',
      },
      {
        heading: 'Build the night shift into the price',
        body: 'Where the work has to be done overnight, the estimate reflects it. Setup and teardown consume a meaningful share of a short shift, and the crew loading has to account for that or the schedule will not hold.',
      },
      {
        heading: 'Return public space fully reopened',
        body: 'Terminal areas are handed back clean, with protection removed, signage cleared, and the space ready for passengers before the first departure bank. That standard is agreed with the operator before the first shift.',
      },
    ],
    relatedServices: ['industrial-coatings', 'commercial-painting'],
    gradient: 'from-[#b7c5d1] via-[#5f7385] to-[#16232f]',
  },
  {
    slug: 'education',
    art: 'education',
    title: 'Education',
    shortTitle: 'Education',
    code: 'SECTOR / ED',
    summary:
      'K–12 districts, community colleges, and university campuses, where the academic calendar sets a fixed, non-negotiable finish date.',
    intro:
      'Education work has the hardest deadline in commercial construction: the first day of class. Summer windows are short, access is often limited by district scheduling, and the building has to be fully usable when students return. Everything in the plan flows from that date.',
    metaTitle: 'School & University Painting Contractor | Texas Campuses',
    metaDescription:
      'Painting for K–12 districts, community colleges, and universities across Texas. Summer-window scheduling, multi-crew production, and campus-appropriate safety practices.',
    constraints: [
      {
        title: 'A fixed calendar',
        body: 'The completion date is set by the academic calendar. Crew loading is sized to the window rather than to the average production rate, and progress is measured against the return date every week.',
      },
      {
        title: 'Multiple buildings at once',
        body: 'District work often spans several campuses in the same summer. Crews, equipment, and material are planned across all of them so no single site becomes the bottleneck.',
      },
      {
        title: 'Working around students and staff',
        body: 'Where work continues during the school year, background-check requirements, visitor procedures, and separation from student areas apply. Those requirements are confirmed with the district before mobilization.',
      },
      {
        title: 'Durable, high-traffic finishes',
        body: 'Corridors, gymnasiums, and locker areas take heavy contact. Finish and sheen selection favors washability and touch-up performance over appearance alone.',
      },
    ],
    facilities: [
      'Elementary, middle, and high schools',
      'Classroom and corridor renovations',
      'Gymnasiums and athletic facilities',
      'Cafeterias and commons',
      'Auditoriums and performing arts spaces',
      'Career and technical education labs',
      'University residence halls',
      'Administration and district facilities',
    ],
    approach: [
      {
        heading: 'Schedule backward from the first day of class',
        body: 'We build the production plan from the return date, identify the latest possible start for each building, and confirm what access the district can provide. If the window is too short for the scope, that conversation happens at bid time.',
      },
      {
        heading: 'Load crews to the window',
        body: 'Summer work is a manpower problem. We size the crew to complete within the window, stage material by building before the window opens, and keep supervision on site so decisions do not wait for a phone call.',
      },
      {
        heading: 'Close out before students return',
        body: 'Punch, touch-up, and final cleaning are completed inside the window rather than carried into the school year. Attic stock and color records are turned over to the maintenance department so touch-ups can be handled in-house.',
      },
    ],
    relatedServices: ['commercial-painting', 'maintenance-repaints'],
    gradient: 'from-[#d3c3ab] via-[#8c7454] to-[#2b2117]',
  },
  {
    slug: 'industrial',
    art: 'industrial',
    title: 'Industrial',
    shortTitle: 'Industrial',
    code: 'SECTOR / IN',
    summary:
      'Warehouses, distribution centers, manufacturing plants, and logistics facilities where coatings protect the structure and production never really stops.',
    intro:
      'Industrial buildings are coated to keep steel and concrete from degrading, to make spaces usable, and to mark them safely. The work is often high, often large, and almost always around equipment and inventory that cannot be moved. Access equipment and containment matter as much as the coating itself.',
    metaTitle: 'Industrial Painting & Coatings | Warehouses, Plants, Distribution',
    metaDescription:
      'Industrial painting and high-performance coatings for warehouses, distribution centers, and manufacturing plants in Texas. Structural steel, tilt-wall, floors, and safety striping.',
    constraints: [
      {
        title: 'Production continues',
        body: 'Most facilities cannot shut down for coating work. Scope is broken into areas that can be isolated, and work is scheduled around shift patterns, shutdown windows, and inventory movement.',
      },
      {
        title: 'Height and access',
        body: 'Structural steel, deck, and high walls require lifts and rigging, and the equipment plan drives both cost and duration. Access is confirmed against aisle widths, floor loading, and clearances during the site walk.',
      },
      {
        title: 'Overspray and product protection',
        body: 'Inventory, conveyors, racking, and equipment have to be protected. Containment and application method are selected to keep overspray controlled and the facility clean.',
      },
      {
        title: 'Coatings that earn their cost',
        body: 'System selection is driven by exposure — abrasion, chemicals, moisture, temperature, and traffic. The right specification is the one that reaches its design life in that specific environment.',
      },
    ],
    facilities: [
      'Distribution and fulfillment centers',
      'Manufacturing and production plants',
      'Cold storage and food processing',
      'Structural steel and mezzanines',
      'Warehouse floors and traffic markings',
      'Truck courts and loading docks',
      'Utility and central plant spaces',
      'Equipment, tanks, and piping',
    ],
    approach: [
      {
        heading: 'Walk the building before pricing it',
        body: 'Access, clearances, floor conditions, and existing coatings decide the method. A site walk before bid produces a price that reflects the actual building instead of an assumption drawn from a plan sheet.',
      },
      {
        heading: 'Plan containment as part of production',
        body: 'In an operating facility, containment is not overhead — it is the job. It is designed for each area, priced accordingly, and inspected before spraying starts.',
      },
      {
        heading: 'Document the system that was installed',
        body: 'Preparation records, environmental readings, and dry film thickness measurements are logged as the work proceeds and turned over at completion, giving the facility a real maintenance baseline.',
      },
    ],
    relatedServices: ['industrial-coatings', 'maintenance-repaints'],
    gradient: 'from-[#b09071] via-[#6c5a4a] to-[#1f2325]',
  },
  {
    slug: 'multifamily',
    art: 'multifamily',
    title: 'Multifamily',
    shortTitle: 'Multifamily',
    code: 'SECTOR / MF',
    summary:
      'Ground-up apartment construction, unit turns, corridor and amenity refresh, and phased exterior repaint programs on occupied communities.',
    intro:
      'Multifamily work splits into two very different jobs. Ground-up construction is a production and sequencing exercise across repeated unit types. Occupied repaint work is a resident-communication exercise where the coating is almost the easy part. We plan and staff them differently.',
    metaTitle: 'Multifamily Painting Contractor | Apartments & Communities',
    metaDescription:
      'Multifamily painting in Dallas–Fort Worth: ground-up construction, unit turns, corridors and amenities, and phased exterior repaint programs on occupied communities.',
    constraints: [
      {
        title: 'Repetition and production rate',
        body: 'On new construction, unit types repeat. Establishing the production rate on the first building and holding it through the rest is what keeps the project on schedule.',
      },
      {
        title: 'Residents on site',
        body: 'On repaint programs, residents live in the building. Notices, schedules, patio and balcony access, parking, and pets all have to be coordinated with property management before work reaches each building.',
      },
      {
        title: 'Unit turn speed',
        body: 'Vacant days cost the owner money. Turn work is staffed to move quickly and consistently, with a defined standard so the finish does not vary between units.',
      },
      {
        title: 'Exterior exposure',
        body: 'Wood trim, stucco, sealant, and railings deteriorate on a predictable curve in North Texas. Repaint scope includes the substrate repair the elevations actually need, identified during a survey rather than discovered mid-project.',
      },
    ],
    facilities: [
      'Garden-style and wrap communities',
      'Mid-rise and podium construction',
      'Student and senior housing',
      'Corridors, stairwells, and breezeways',
      'Clubhouses and amenity spaces',
      'Unit interiors and turn programs',
      'Exterior repaint and sealant renewal',
      'Parking garages and site structures',
    ],
    approach: [
      {
        heading: 'Set the standard on the first building',
        body: 'The first building establishes the finish standard, the production rate, and the punch process for everything that follows. We get it walked and approved before rolling the same approach across the community.',
      },
      {
        heading: 'Communicate before the crew arrives',
        body: 'On occupied properties, we publish a building-by-building schedule the property manager can distribute, and we hold it. Most resident complaints come from surprises rather than from the work itself.',
      },
      {
        heading: 'Keep the site clean and safe daily',
        body: 'Ladders, sprayers, and material are secured at the end of every shift. Walkways, stairs, and parking are cleared. On a community with children and residents, that discipline is not optional.',
      },
    ],
    relatedServices: ['new-construction', 'maintenance-repaints'],
    gradient: 'from-[#c2b4a4] via-[#7d6f63] to-[#26231f]',
  },
  {
    slug: 'retail',
    art: 'retail',
    title: 'Retail & Hospitality',
    shortTitle: 'Retail & Hospitality',
    code: 'SECTOR / RH',
    summary:
      'Stores, restaurants, hotels, and shopping centers where the finish is customer-facing and the work has to happen around business hours.',
    intro:
      'In retail and hospitality, the finish is part of the brand and the schedule is set by the operator. Work happens overnight, between shifts, or floor by floor, and the space has to look finished when it reopens — not almost finished. Presentation standards are higher and the tolerance for disruption is lower.',
    metaTitle: 'Retail & Hospitality Painting | Stores, Hotels, Restaurants',
    metaDescription:
      'Retail and hospitality painting across Texas — stores, restaurants, hotels, and shopping centers. Overnight scheduling, brand-standard finishes, and clean daily turnover.',
    constraints: [
      {
        title: 'The business stays open',
        body: 'Work is scheduled around trading hours, service periods, and occupancy. Overnight and early-morning shifts are normal, and the space is returned ready for customers each day.',
      },
      {
        title: 'Brand standards',
        body: 'National operators specify colors, products, and finish standards. We work to the brand package as written and confirm product equivalents in writing before substituting anything.',
      },
      {
        title: 'Visible detail',
        body: 'Customer-facing finishes are inspected at close range under retail lighting. Cut lines, edges, and reveals are held to a higher standard than back-of-house work, and the crew assigned reflects that.',
      },
      {
        title: 'Multi-site rollouts',
        body: 'Programs across multiple locations need a consistent result and a predictable schedule. Standards, colors, and reporting are set once and applied at every site.',
      },
    ],
    facilities: [
      'Shopping centers and retail strips',
      'Big-box and anchor tenant spaces',
      'Restaurants and quick-service locations',
      'Hotel guest rooms and corridors',
      'Hotel lobbies and public spaces',
      'Fitness and entertainment venues',
      'Tenant improvements and white-box',
      'Exterior facades, canopies, and storefronts',
    ],
    approach: [
      {
        heading: 'Fit the work into the operating hours',
        body: 'The operator tells us when the space is available; the crew plan is built to that. Setup, production, cleanup, and reopening all fit inside the window, and the estimate reflects the reduced productive hours honestly.',
      },
      {
        heading: 'Protect the space, not just the floor',
        body: 'Fixtures, merchandise, POS equipment, and furniture are protected or relocated by agreement before work begins. What gets moved, by whom, and when is settled in writing rather than at 10 p.m. on the first night.',
      },
      {
        heading: 'Reopen clean every single day',
        body: 'Protection is removed, surfaces wiped, and the space returned to the operator in sellable condition at the end of each shift. Partial-progress appearance is a legitimate reason for a store manager to stop the work — so we plan the shift so it never happens.',
      },
    ],
    relatedServices: ['commercial-painting', 'maintenance-repaints'],
    gradient: 'from-[#cbbfa6] via-[#7a7059] to-[#1c1b1f]',
  },
  {
    slug: 'government',
    art: 'government',
    title: 'Government & Civic',
    shortTitle: 'Government',
    code: 'SECTOR / GV',
    summary:
      'Municipal buildings, courthouses, public safety facilities, and civic infrastructure, where procurement rules and public access shape the whole job.',
    intro:
      'Public work runs on process. Prevailing wage, bonding, certified payroll, and formal change procedures are not administrative friction around the job — they are part of the job, and a contractor who treats them as an afterthought will hold up the pay application for everyone.',
    metaTitle: 'Government & Municipal Painting Contractor | Texas',
    metaDescription:
      'Painting and coatings for municipal buildings, courthouses, public safety, and civic facilities across Texas. Public procurement, prevailing wage, and certified payroll aware.',
    constraints: [
      {
        title: 'Procurement and compliance',
        body: 'Public projects carry bonding, prevailing wage, certified payroll, and formal documentation requirements. These are priced and staffed for from the outset rather than discovered after award.',
      },
      {
        title: 'Buildings the public walks into',
        body: 'Courthouses, city halls, and permit offices serve the public daily. Work is phased around public hours, with access routes, signage, and safety separation agreed with the facility before mobilization.',
      },
      {
        title: 'Secured and restricted areas',
        body: 'Police, fire, detention, and emergency operations facilities carry background check, escort, and access control requirements. Clearance timelines go on the mobilization schedule as long-lead items.',
      },
      {
        title: 'Durability under a public budget',
        body: 'Civic buildings are repainted on long cycles because the funding arrives on long cycles. Specification choices favour service life over first cost, because the next repaint may be a decade away.',
      },
    ],
    facilities: [
      'City halls and administrative buildings',
      'Courthouses and judicial facilities',
      'Police and fire stations',
      'Detention and correctional facilities',
      'Public libraries and community centers',
      'Parks, recreation, and aquatic facilities',
      'Water treatment and public works',
      'Transit and maintenance facilities',
    ],
    approach: [
      {
        heading: 'Read the front-end documents, not just Division 09',
        body: 'On public work, the general conditions and supplementary conditions carry requirements that change the price — wage determinations, insurance limits, retainage, and submittal procedure. We price from those as well as the technical section.',
      },
      {
        heading: 'Document as you go',
        body: 'Certified payroll, daily reports, and change documentation are produced on the cycle the contract requires rather than assembled at the end. On public work, incomplete paperwork stops payment regardless of whether the painting is finished.',
      },
      {
        heading: 'Keep the public side clean',
        body: 'Entrances, lobbies, and counters stay usable and presentable throughout. Where the work is visible to the public, the site is a reflection on the agency as much as on the contractor.',
      },
    ],
    relatedServices: ['commercial-painting', 'maintenance-repaints'],
    gradient: 'from-[#c3ccd4] via-[#6d7c8b] to-[#1b2733]',
  },
  {
    slug: 'office',
    art: 'office',
    title: 'Commercial Office',
    shortTitle: 'Commercial Office',
    code: 'SECTOR / OF',
    summary:
      'Tenant improvements, spec suites, common-area repositioning, and full-building refresh across office towers, campuses, and flex space.',
    intro:
      'Office work is leasing work. A tenant improvement has a lease commencement date attached to it, a spec suite exists to be shown, and a lobby repositioning is there to justify a rent increase. The finish date is a revenue date, which is why it does not move.',
    metaTitle: 'Office Painting Contractor | Tenant Improvements, DFW',
    metaDescription:
      'Commercial office painting in Dallas–Fort Worth: tenant improvements, spec suites, lobby and common-area repositioning, and occupied-building refresh programs.',
    constraints: [
      {
        title: 'The lease date is the schedule',
        body: 'Tenant improvement work is driven by commencement dates. Delivering late has a rent consequence, so crew loading is planned against the date rather than against average production.',
      },
      {
        title: 'Other tenants keep working',
        body: 'A floor under construction usually sits above and below floors that are fully occupied. Noise, odor, freight elevator access, and after-hours work are coordinated with building management, not just the general contractor.',
      },
      {
        title: 'Repositioning is a first impression',
        body: 'Lobbies, elevator lobbies, and amenity floors are the surfaces a prospective tenant judges the building by. They are inspected at close range and warrant a higher finish standard than a back-of-house corridor.',
      },
      {
        title: 'Turn speed on spec suites',
        body: 'Vacant space earns nothing. Spec suites and downtime turns are staffed to move quickly with a defined standard, so finish quality does not vary between suites in the same building.',
      },
    ],
    facilities: [
      'Office towers and mid-rise buildings',
      'Tenant improvements and fit-outs',
      'Spec suites and white-box space',
      'Lobbies and elevator lobbies',
      'Amenity floors and conference centers',
      'Flex, creative, and adaptive-reuse space',
      'Corporate campuses',
      'Parking structures and back-of-house',
    ],
    approach: [
      {
        heading: 'Work to the building rules',
        body: 'Every building has its own hours, freight elevator scheduling, dock access, and protection standards. We confirm them with property management before the first delivery rather than finding out when a crew is turned away at the dock.',
      },
      {
        heading: 'Set the standard on the first suite',
        body: 'On multi-suite programs, the first space establishes the finish standard and the production rate. We get it walked and approved before applying the same approach across the rest of the floor plate.',
      },
      {
        heading: 'Leave no trace on occupied floors',
        body: 'Common corridors, elevator cabs, and lobbies used to reach the work are protected and cleaned daily. Other tenants should not be able to tell which floor is under construction.',
      },
    ],
    relatedServices: ['commercial-painting', 'specialty-coatings'],
    gradient: 'from-[#c9d2da] via-[#66798c] to-[#141f2c]',
  },
];

export const getMarket = (slug: string) => markets.find((m) => m.slug === slug);
export const marketSlugs = markets.map((m) => m.slug);
