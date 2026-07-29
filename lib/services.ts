/**
 * SERVICE DEFINITIONS
 * ---------------------------------------------------------------------------
 * Each entry drives the /services index, the /services/[slug] template, the
 * navigation, the footer, and the Service structured data. CSI section numbers
 * are real MasterFormat references and are used as page-level labels.
 */

export type ServiceSection = {
  heading: string;
  body: string;
};

export type Service = {
  slug: string;
  title: string;
  /** Short label used in navigation and cards. */
  shortTitle: string;
  /** MasterFormat reference shown in the title block. */
  csi: string;
  kicker: string;
  /** One-line summary used on cards and in the services index. */
  summary: string;
  /** Longer intro used at the top of the service page. */
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** Scope items — what is actually included in a bid. */
  scope: string[];
  /** Substrate / system detail, rendered as a spec table. */
  systems: { label: string; detail: string }[];
  /** Body sections for the service page. */
  sections: ServiceSection[];
  /** Buyer-facing questions, also emitted as FAQPage structured data. */
  faqs: { question: string; answer: string }[];
  relatedMarkets: string[];
  /** Key into components/ui/SectorArt.tsx. */
  art: string;
  /** Anchor sections rendered inside the page (e.g. interior vs exterior). */
  subScopes?: { id: string; title: string; body: string; items: string[] }[];
};

export const services: Service[] = [
  {
    slug: 'commercial-painting',
    art: 'commercial-painting',
    title: 'Commercial Painting',
    shortTitle: 'Commercial Painting',
    csi: 'CSI 09 91 00',
    kicker: 'Interior + exterior finishes',
    summary:
      'Interior and exterior painting for offices, medical buildings, campuses, retail centers, and tenant improvements — including work performed around occupants.',
    intro:
      'Commercial painting is a scheduling problem before it is a finish problem. The coating is the easy part; the difficulty is producing a clean, uniform result inside an active building, around other trades, on the days the general contractor actually has the space available. We estimate, staff, and sequence around that reality.',
    metaTitle: 'Commercial Painting Contractor | Dallas–Fort Worth',
    metaDescription:
      'Commercial painting for offices, medical buildings, campuses, and retail across Dallas–Fort Worth. Occupied-space phasing, surface prep, and documented punch closeout.',
    scope: [
      'Interior wall, ceiling, and soffit coatings',
      'Doors, frames, and hollow metal — field or shop-applied',
      'Exposed structure and dryfall applications',
      'Exterior repaint of stucco, EIFS, tilt-wall, masonry, and metal',
      'Level 4 and Level 5 finish coordination with the drywall contractor',
      'Wallcovering, vinyl, and specialty wall protection',
      'Epoxy and scrubbable finishes in wet or high-touch areas',
      'Caulking, sealant, and substrate repair within the paint scope',
      'Mockups, submittals, and approved color schedules',
      'Final punch, touch-up, and attic-stock delivery',
    ],
    systems: [
      { label: 'Gypsum board', detail: 'Primer plus two finish coats; sheen per finish schedule' },
      { label: 'Hollow metal', detail: 'Rust-inhibitive primer with an alkyd or waterborne enamel' },
      { label: 'CMU / masonry', detail: 'Block filler with an acrylic or epoxy topcoat' },
      { label: 'Exterior stucco / EIFS', detail: 'Elastomeric or 100% acrylic, with sealant replacement as required' },
      { label: 'Exposed structure', detail: 'Dryfall applied before ceiling grid and MEP rough-in close' },
    ],
    sections: [
      {
        heading: 'Working in occupied buildings',
        body: 'Most commercial repaint work happens while the building is still being used. We plan the work in zones, agree the containment and protection standard before we start, and stage material so corridors and exits stay clear. Where the schedule demands it, crews run second shift or weekends so the space is returned each morning ready for use. Odor-sensitive areas get low-VOC systems specified during preconstruction rather than negotiated on site.',
      },
      {
        heading: 'Surface preparation sets the outcome',
        body: 'Coating failures are almost always preparation failures. We inspect substrates before pricing, flag conditions the specification does not cover, and price the preparation the surface actually needs — washing, degreasing, profiling, sealing, or patching. If a substrate needs remediation outside our scope, we say so during the bid instead of discovering it during production.',
      },
      {
        heading: 'Coordination with the rest of the trades',
        body: 'Paint touches almost every other trade. We attend coordination meetings, hold the ceiling and MEP sequence, and identify which work has to be complete before we can start each area. Where a trade is behind, we adjust crew loading rather than let production stall — and we document the change so the record is clean when the schedule is reviewed.',
      },
      {
        heading: 'Quality control and closeout',
        body: 'Every area gets a supervisor walk before it is offered for inspection. We track punch items by area, close them in batches, and confirm completion in writing. Attic stock, color schedules, and product data are turned over as a package so the owner can maintain the finishes without guesswork.',
      },
    ],
    faqs: [
      {
        question: 'Can you paint while our building stays open?',
        answer:
          'Yes. Occupied-site work is a normal part of commercial painting. It changes how the job is planned — zone-by-zone phasing, agreed protection and containment, low-odor systems, and often night or weekend shifts. Those decisions belong in the bid, so tell us the operating constraints when you send the invitation.',
      },
      {
        question: 'How quickly can you turn around a bid?',
        answer:
          'Send the plans, specifications, addenda, and the bid due date. We confirm receipt and tell you whether we are bidding, so you are never left waiting on a no-bid. Turnaround depends on package size and how much of the paint scope is defined in the documents.',
      },
      {
        question: 'Do you provide mockups and submittals?',
        answer:
          'Yes. Product data, MSDS, color schedules, and mockups are handled as part of the submittal package. On projects where the finish is design-critical, we recommend an approved mockup before production so the standard is agreed rather than argued.',
      },
    ],
    subScopes: [
      {
        id: 'interior',
        title: 'Interior painting',
        body: 'Everything inside the envelope, planned around whoever is still using the building. Interior work is where occupied-site planning, odor control, and phasing decide whether the job succeeds — the coating itself is the straightforward part.',
        items: [
          'Walls, ceilings, soffits, and bulkheads',
          'Doors, frames, and hollow metal',
          'Exposed structure and dryfall above the ceiling line',
          'Scrubbable epoxy in wet and high-touch areas',
          'Millwork, trim, and architectural woodwork',
          'Level 4 and Level 5 finish coordination',
        ],
      },
      {
        id: 'exterior',
        title: 'Exterior painting',
        body: 'Everything outside the envelope, planned around weather windows and access equipment. In North Texas the south and west elevations degrade years ahead of the rest of the building, so exterior scope is written elevation by elevation rather than as one number.',
        items: [
          'Stucco, EIFS, and cementitious substrates',
          'Tilt-wall, precast, and masonry',
          'Structural and architectural metal',
          'Sealant and caulking replacement',
          'Pressure washing and substrate preparation',
          'Elastomeric and high-build envelope systems',
        ],
      },
    ],
    relatedMarkets: ['healthcare', 'education', 'retail'],
  },
  {
    slug: 'industrial-coatings',
    art: 'industrial-coatings',
    title: 'Industrial Coatings',
    shortTitle: 'Industrial Coatings',
    csi: 'CSI 09 96 00',
    kicker: 'High-performance protection',
    summary:
      'Surface preparation and high-performance coating systems for warehouses, plants, distribution centers, structural steel, and equipment areas.',
    intro:
      'Industrial coatings are specified to protect an asset, not to decorate it. The value is in preparation, film thickness, cure conditions, and documentation — the things that decide whether the system reaches its design life. We price and execute against the specification rather than against the lowest-cost path to a coat of paint.',
    metaTitle: 'Industrial Coatings Contractor | Texas Plants & Warehouses',
    metaDescription:
      'Industrial coatings across Texas: structural steel, tilt-wall, concrete floors, and corrosion control. Documented surface prep, DFT verification, and coating records.',
    scope: [
      'Structural steel, joists, and deck coatings',
      'Epoxy, urethane, and polyaspartic systems',
      'Concrete floor coatings, sealers, and line striping',
      'Tank, pipe, and equipment coatings',
      'Tilt-wall and precast exterior coatings',
      'Corrosion assessment and spot repair programs',
      'Abrasive blasting, power tool cleaning, and pressure washing',
      'Containment and overspray control in operating facilities',
      'Dry film thickness verification and coating logs',
      'Safety and egress striping, and color-coded identification',
    ],
    systems: [
      { label: 'Structural steel', detail: 'Zinc-rich or epoxy primer with a polyurethane topcoat' },
      { label: 'Concrete floors', detail: 'Moisture testing, then epoxy build coat with a urethane or polyaspartic wear coat' },
      { label: 'Tilt-wall / precast', detail: 'Elastomeric or high-build acrylic over repaired and sealed joints' },
      { label: 'Wet or washdown areas', detail: 'Chemical-resistant epoxy with a coved and sealed detail at the base' },
      { label: 'Surface preparation', detail: 'SSPC/NACE cleanliness and profile as required by the specified system' },
    ],
    sections: [
      {
        heading: 'Preparation is the specification',
        body: 'A high-performance system installed over an unprepared surface is a warranty claim waiting to be filed. We identify the required cleanliness and profile standard up front, select the preparation method that reaches it — pressure washing, abrasive blast, or power tool cleaning — and account for containment, waste handling, and dust control in the price.',
      },
      {
        heading: 'Conditions, cure, and film thickness',
        body: 'Industrial systems are sensitive to temperature, humidity, dew point, and recoat window. We monitor conditions during application, record them, and hold production when they fall outside the manufacturer’s range instead of installing a coating that will not cure correctly. Dry film thickness is verified and logged so the record supports the warranty.',
      },
      {
        heading: 'Working inside an operating plant',
        body: 'Production rarely stops for paint. We plan around shift changes, shutdown windows, and hot-work restrictions, and we coordinate lockout, confined space, and permit requirements with the facility team before mobilizing. Containment is designed so that adjacent equipment, product, and personnel are protected from overspray and dust.',
      },
      {
        heading: 'Documentation the owner can use',
        body: 'Each coating package is turned over with product data, batch information, preparation records, environmental readings, and thickness measurements. That file is what makes a future maintenance decision straightforward — and what makes a warranty enforceable.',
      },
    ],
    faqs: [
      {
        question: 'Do you work during plant shutdowns?',
        answer:
          'Yes. Shutdown work is scheduled backward from the restart date, with crew loading sized to the window. Tell us the shutdown dates when you request pricing so the manpower plan is realistic rather than optimistic.',
      },
      {
        question: 'Can you coat a floor that has moisture problems?',
        answer:
          'Not until the moisture is measured. Concrete moisture vapor emission and relative humidity testing come first; the result determines whether a moisture-mitigating primer is required. Installing a floor coating over an untested slab is the most common cause of delamination.',
      },
      {
        question: 'Do you provide coating inspection records?',
        answer:
          'Yes. Environmental conditions, surface preparation, and dry film thickness are recorded as the work proceeds and delivered at closeout. Third-party inspection can be coordinated when the specification requires it.',
      },
    ],
    relatedMarkets: ['industrial', 'aviation'],
  },
  {
    slug: 'new-construction',
    art: 'new-construction',
    title: 'New Construction',
    shortTitle: 'New Construction',
    csi: 'CSI 09 00 00',
    kicker: 'Built for the schedule',
    summary:
      'Complete Division 09 painting packages for ground-up commercial construction, coordinated with superintendents and priced from the documents.',
    intro:
      'On a ground-up project, the painting contractor is measured on whether the building can be turned over on the date the schedule says it will be. We estimate from the drawings and specifications, staff to the sequence, and keep the paperwork current so the closeout is not a scramble.',
    metaTitle: 'New Construction Painting Contractor | DFW Commercial Builds',
    metaDescription:
      'Division 09 painting for ground-up commercial construction in Dallas–Fort Worth. Plan-and-spec estimating, crew loading to the CPM schedule, and clean punch closeout.',
    scope: [
      'Full Division 09 paint and coating estimating',
      'Takeoff from construction documents, addenda, and RFI responses',
      'Written scope letters with clear inclusions and exclusions',
      'Manpower loading tied to the CPM schedule',
      'Submittals, product data, and color schedule coordination',
      'Approved mockups and control samples',
      'Exposed structure and dryfall before ceiling close-in',
      'Doors, frames, millwork, and specialty finishes',
      'Progress documentation and pay application backup',
      'Punch list, touch-up, and warranty closeout',
    ],
    systems: [
      { label: 'Preconstruction', detail: 'Scope review, exclusions, long-lead materials, and schedule risks identified before award' },
      { label: 'Buyout', detail: 'Product approvals confirmed against the specification before material is ordered' },
      { label: 'Production', detail: 'Crew size adjusted weekly against the three-week look-ahead' },
      { label: 'Turnover', detail: 'Area-by-area punch tracking with written completion sign-off' },
    ],
    sections: [
      {
        heading: 'Estimating that holds up',
        body: 'We take off the drawings rather than applying a square-foot rule, then read the specification for the requirements that actually drive cost: finish levels, sheen schedules, high-performance systems buried in Division 09, and the coordination items other bidders exclude. The scope letter states plainly what is in and what is out, so the general contractor can compare bids on the same basis.',
      },
      {
        heading: 'Sequencing and crew loading',
        body: 'Paint production is set by how much area is released, not by how many painters are on site. We build the manpower plan against the schedule, review it at the weekly coordination meeting, and flex crews between areas as the building opens up. When a predecessor trade slips, we say so early and adjust — the schedule impact is discussed before it becomes a delay claim.',
      },
      {
        heading: 'Finish quality on a fast-track job',
        body: 'Speed and finish quality are only in conflict when the standard is undefined. We recommend an approved mockup for design-critical finishes, agree the drywall finish level with the general contractor before priming, and light-test walls where the design creates critical lighting conditions. Agreeing the standard in week one avoids repainting in the final month.',
      },
      {
        heading: 'Closeout without the scramble',
        body: 'Punch is tracked by area throughout production instead of collected at the end. Touch-up crews follow the other trades through final cleaning, attic stock is delivered and labeled, and the warranty package, product data, and color schedule are handed over as a complete file at substantial completion.',
      },
    ],
    faqs: [
      {
        question: 'What do you need to bid a new construction package?',
        answer:
          'The current drawing set, the specification sections, all addenda, the bid due date, the anticipated start and completion dates, and any general conditions that affect the paint scope — working hours, site logistics, and whether the general contractor is providing hoisting or lift equipment.',
      },
      {
        question: 'Do you provide scope letters with your bid?',
        answer:
          'Yes. Every bid comes with a written scope letter listing inclusions, exclusions, clarifications, and assumptions. It is the fastest way for an estimator to level bids without a round of phone calls.',
      },
      {
        question: 'How do you handle changes during construction?',
        answer:
          'Changes are priced from the change document and submitted in writing before the work proceeds where the schedule allows. Field-directed work is documented daily and reconciled against the change order so there are no surprises in the final pay application.',
      },
    ],
    relatedMarkets: ['healthcare', 'multifamily', 'education'],
  },
  {
    slug: 'maintenance-repaints',
    art: 'maintenance-repaints',
    title: 'Maintenance & Repaints',
    shortTitle: 'Maintenance & Repaints',
    csi: 'CSI 09 91 00',
    kicker: 'Protect the asset',
    summary:
      'Planned repaint and recoat programs for property managers and facility teams — scheduled, budgeted, and executed with minimal disruption.',
    intro:
      'A repaint program is a capital planning decision. Coatings degrade on a predictable curve, and the cost of waiting is substrate repair. We help owners and property managers put buildings on a schedule, price the work in a way that can be budgeted, and execute it without interrupting the tenants who pay the rent.',
    metaTitle: 'Commercial Repaint & Maintenance Programs | Texas Facilities',
    metaDescription:
      'Planned commercial repaint programs for property managers and facility teams across Texas. Building condition assessment, phased scheduling, and low-disruption execution.',
    scope: [
      'Building condition assessment and coating survey',
      'Multi-year repaint budgets and phasing recommendations',
      'Exterior repaint of stucco, EIFS, tilt-wall, wood, and metal',
      'Interior corridor, lobby, and common-area refresh',
      'Unit turns and tenant-improvement repaints',
      'Sealant and caulking replacement',
      'Substrate repair coordination with carpentry and stucco trades',
      'Pressure washing and surface cleaning',
      'Color matching and archived color records',
      'Night, weekend, and phased scheduling around operations',
    ],
    systems: [
      { label: 'Condition survey', detail: 'Substrate, sealant, and coating condition documented by elevation' },
      { label: 'Budget package', detail: 'Scope and pricing broken out by building or phase for capital planning' },
      { label: 'Notification', detail: 'Tenant and resident notices coordinated with the property manager' },
      { label: 'Records', detail: 'Color, product, and batch data archived for future touch-up' },
    ],
    sections: [
      {
        heading: 'Start with a condition survey',
        body: 'Before pricing a repaint, we walk the property and document what is actually happening: chalking, fading, sealant failure, substrate movement, moisture intrusion, and previous coating systems. That survey becomes the scope. It also tells the owner which elevations need attention this year and which can safely wait, which is usually the more valuable answer.',
      },
      {
        heading: 'Budgeting a multi-year program',
        body: 'Few properties can absorb a full repaint in a single year. We break the work into phases that can be funded across budget cycles, sequenced so the elevations with the most exposure and the most visible deterioration are addressed first. Pricing is presented by building or phase so it maps directly to a capital plan.',
      },
      {
        heading: 'Keeping tenants and residents unaffected',
        body: 'The measure of a repaint program is how few complaints it generates. We publish a schedule, coordinate notices with the property manager, keep access routes and parking usable, and clean the site daily. On multifamily and retail properties, work is scheduled around the hours that matter to residents and customers rather than the hours that are convenient to the crew.',
      },
      {
        heading: 'Records that make the next cycle easier',
        body: 'At the end of every program we hand over color formulas, product data, coverage records, and photographs by elevation. When a touch-up is needed two years later, the property manager does not have to guess or send a sample to a store counter.',
      },
    ],
    faqs: [
      {
        question: 'How often should a commercial building be repainted?',
        answer:
          'It depends on substrate, exposure, and the previous system rather than a fixed number of years. In North Texas, south and west elevations typically degrade first because of solar exposure. A condition survey gives you a defensible answer for your specific property instead of a rule of thumb.',
      },
      {
        question: 'Can the work be done after hours?',
        answer:
          'Yes. Night and weekend scheduling is common on occupied retail, office, and healthcare properties. It affects crew rates and production, so tell us the required working hours when you request pricing.',
      },
      {
        question: 'Do you handle the repairs found during the survey?',
        answer:
          'We handle substrate repair within the painting scope — patching, sealant replacement, and minor surface repair. Structural repair, roofing, and significant carpentry or stucco replacement are coordinated with the appropriate trade and identified separately so the owner sees the true cost.',
      },
    ],
    relatedMarkets: ['multifamily', 'retail', 'education'],
  },
  {
    slug: 'epoxy-flooring',
    art: 'epoxy-flooring',
    title: 'Epoxy & Resinous Flooring',
    shortTitle: 'Epoxy Flooring',
    csi: 'CSI 09 67 00',
    kicker: 'Seamless floor systems',
    summary:
      'Epoxy, urethane, and polyaspartic floor systems for warehouses, kitchens, labs, healthcare, and manufacturing — installed over a slab that has been tested first.',
    intro:
      'A resinous floor either bonds to the slab or it does not. Almost every failure traces back to something that happened before the first coat went down: moisture that was never measured, a profile that was never opened, or a contaminant that was never removed. We test, prepare, and document in that order.',
    metaTitle: 'Epoxy Flooring Contractor | Resinous Floor Systems, Texas',
    metaDescription:
      'Epoxy, urethane cement, and polyaspartic floor systems across Texas. Moisture testing, mechanical surface preparation, coved bases, and safety striping.',
    scope: [
      'Concrete moisture vapor and relative humidity testing',
      'Shot blasting, grinding, and mechanical profiling',
      'Joint filling, crack repair, and slab patching',
      'Epoxy build and self-levelling systems',
      'Urethane cement for thermal-shock and washdown areas',
      'Polyaspartic and urethane wear coats',
      'Broadcast quartz and vinyl flake systems',
      'Integral coved base and sealed transitions',
      'Anti-slip aggregate and safety line striping',
      'Electrostatic-dissipative systems where specified',
    ],
    systems: [
      { label: 'Warehouse traffic', detail: 'Epoxy build coat with a urethane wear coat over a shot-blasted profile' },
      { label: 'Food and beverage', detail: 'Urethane cement, coved and sealed, for thermal shock and washdown' },
      { label: 'Healthcare and lab', detail: 'Self-levelling epoxy or seamless resin with a coved, cleanable base' },
      { label: 'Mechanical rooms', detail: 'Broadcast quartz for slip resistance and chemical exposure' },
      { label: 'Preparation', detail: 'Mechanical profile to the manufacturer’s required CSP — never acid etching' },
    ],
    sections: [
      {
        heading: 'Test the slab before quoting the floor',
        body: 'Concrete moisture vapor emission and internal relative humidity testing come first, because the result decides whether a moisture-mitigating primer is required and therefore what the floor actually costs. Pricing a resinous floor over an untested slab is a guess, and the person who pays for the guess is whoever owns the building when it delaminates.',
      },
      {
        heading: 'Mechanical preparation, not acid etching',
        body: 'We shot blast or diamond grind to open the required surface profile. Acid etching is faster and cheaper and it is the reason a great many floors fail — it leaves residue, it does not reliably reach profile, and it cannot address contamination in the top of the slab.',
      },
      {
        heading: 'Details are what fail first',
        body: 'Floors rarely fail in the field of the slab. They fail at control joints, at the transition to a drain, at the wall base, and at the doorway. Those details are drawn, priced, and installed deliberately — coved bases, keyed terminations, and properly treated joints rather than a coating run to the edge and stopped.',
      },
      {
        heading: 'Downtime is the real constraint',
        body: 'Most floors are installed in buildings that need to reopen. Cure schedules, return-to-service times, and the sequence in which areas come out of use are planned with the facility before mobilization, and fast-cure systems are specified where the window genuinely demands them.',
      },
    ],
    faqs: [
      {
        question: 'How long before we can use the floor again?',
        answer:
          'It depends on the system and the ambient conditions — typically 24 to 72 hours for foot traffic and longer for vehicles or hard-wheeled loads. Polyaspartic systems can return to service far faster where the schedule justifies the premium. We give you the actual figure for the specified system before you commit to a shutdown window.',
      },
      {
        question: 'Can you coat over an existing epoxy floor?',
        answer:
          'Sometimes. It depends on adhesion of the existing system, compatibility with the new one, and contamination. We test adhesion before recommending it. Where the existing floor is failing, coating over it just transfers the failure to the new surface.',
      },
      {
        question: 'Do you handle safety striping and markings?',
        answer:
          'Yes — aisle striping, pedestrian walkways, equipment footprints, hazard marking, and colour-coded identification, applied as part of the floor system rather than taped on afterwards.',
      },
    ],
    relatedMarkets: ['industrial', 'healthcare', 'retail'],
  },
  {
    slug: 'specialty-coatings',
    art: 'specialty-coatings',
    title: 'Specialty Coatings & Wall Systems',
    shortTitle: 'Specialty Coatings',
    csi: 'CSI 09 72 00',
    kicker: 'Beyond standard finishes',
    summary:
      'Wallcovering, wall protection, intumescent fireproofing, elastomeric envelopes, and architectural finishes that sit outside a standard paint scope.',
    intro:
      'Some finishes need a specification that a general painting scope does not cover. Intumescent fireproofing is a life-safety system with a tested assembly behind it. Wall protection is a maintenance decision. Elastomeric is a building-envelope product. Each carries its own submittal requirements and its own inspection regime, and each is priced accordingly.',
    metaTitle: 'Specialty Coatings & Wallcovering | Commercial Texas',
    metaDescription:
      'Wallcovering, wall protection, intumescent fireproofing, elastomeric coatings, and architectural finishes for commercial buildings across Texas.',
    scope: [
      'Commercial vinyl and Type II wallcovering',
      'Wall protection — sheet, rigid panel, and impact systems',
      'Intumescent fireproofing to tested assemblies',
      'Elastomeric envelope coatings over stucco and EIFS',
      'Anti-graffiti and easy-clean sacrificial systems',
      'Antimicrobial and cleanroom-grade finishes',
      'Faux, metallic, and architectural specialty finishes',
      'Acoustic and ceiling coatings',
      'Concrete stains, sealers, and densifiers',
      'Substrate preparation and skim coating to the required finish level',
    ],
    systems: [
      { label: 'Wallcovering', detail: 'Level 4 or 5 substrate, primed with a wallcovering primer before hanging' },
      { label: 'Intumescent', detail: 'Applied to the tested assembly, with thickness verified and logged' },
      { label: 'Wall protection', detail: 'Sheet or rigid panel at the heights the facility actually takes damage' },
      { label: 'Elastomeric', detail: 'Sealant renewal and substrate repair before a high-build envelope coat' },
      { label: 'Anti-graffiti', detail: 'Sacrificial or permanent, chosen on how often the surface is cleaned' },
    ],
    sections: [
      {
        heading: 'Fireproofing is a life-safety system',
        body: 'Intumescent coatings protect structural steel to a tested assembly, and the film thickness is the whole product. We apply to the assembly as tested, verify thickness, log it, and turn the record over. This is not a scope to award on price alone, and an inspector will not accept it without documentation.',
      },
      {
        heading: 'Wallcovering exposes the substrate',
        body: 'Vinyl telegraphs everything under it. The wall has to reach the specified finish level and be primed with a proper wallcovering primer, or every seam and fastener shows under grazing light. Where the drywall contractor has not reached the required level, we say so before hanging rather than after.',
      },
      {
        heading: 'Wall protection is a maintenance decision',
        body: 'Corridors in hospitals, schools, and back-of-house areas take cart and equipment damage in predictable places at predictable heights. Installing protection at those heights costs less over a building’s life than repainting the same corridor every eighteen months.',
      },
      {
        heading: 'Architectural finishes need an approved sample',
        body: 'Metallic, faux, and textured finishes vary with application technique, so the standard has to be set by an approved sample before production and the same applicator has to carry it through. We agree that in preconstruction rather than discovering the variation at the punch walk.',
      },
    ],
    faqs: [
      {
        question: 'Do you install intumescent fireproofing?',
        answer:
          'Yes, applied to the tested assembly with thickness verified and recorded. Where the specification calls for third-party inspection, we coordinate it. The turnover package includes product data, the assembly reference, and thickness readings.',
      },
      {
        question: 'What finish level does wallcovering need?',
        answer:
          'Normally Level 4 as a minimum, and Level 5 where lighting is critical or the covering is thin. Confirm it with the drywall contractor before the wall is closed out — correcting it afterwards means skim coating a finished surface.',
      },
      {
        question: 'Is anti-graffiti coating worth it?',
        answer:
          'On surfaces that are actually being tagged, yes. Sacrificial systems are cheaper and are removed with the graffiti, so they suit surfaces cleaned occasionally. Permanent systems cost more up front and suit surfaces cleaned repeatedly. The right answer depends on how often you are cleaning.',
      },
    ],
    relatedMarkets: ['healthcare', 'education', 'office'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceSlugs = services.map((s) => s.slug);
