/**
 * SERVICE DEFINITIONS
 * ---------------------------------------------------------------------------
 * Drives /services, /services/[slug], navigation, the footer, and Service
 * structured data. CSI section numbers are real MasterFormat references used
 * as page-level labels.
 *
 * TO ADD A SERVICE: append a record. The index, nav, sitemap, and related-
 * service links all read from this array.
 */

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  /** MasterFormat reference shown in the title block. */
  csi: string;
  kicker: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** What is actually included in a bid. */
  scope: string[];
  /** Substrate / system detail, rendered as a spec table. */
  systems: { label: string; detail: string }[];
  /** Body sections for the service page. */
  sections: { heading: string; body: string }[];
  /** Buyer-facing questions, also emitted as FAQPage structured data. */
  faqs: { question: string; answer: string }[];
  /** Slugs from lib/industries.ts. */
  relatedIndustries: string[];
  /** Key into components/ui/SectorArt.tsx. */
  art: string;
  image?: string;
};

export const services: Service[] = [
  {
    slug: 'commercial-interior-painting',
    art: 'interior',
    title: 'Commercial Interior Painting',
    shortTitle: 'Interior Painting',
    csi: 'CSI 09 91 23',
    kicker: 'Walls · ceilings · hollow metal · exposed structure',
    summary:
      'Interior finishes for offices, clinics, stores, restaurants, and campuses — including work performed around occupants and other trades.',
    intro:
      'Interior painting is a scheduling problem before it is a finish problem. The coating is the easy part; the difficulty is producing a clean, uniform result inside an active building, around other trades, on the days the general contractor actually has the space available. We estimate, staff, and sequence around that reality.',
    metaTitle: 'Commercial Interior Painting Contractor | Dallas–Fort Worth',
    metaDescription:
      'Commercial interior painting for offices, clinics, retail, and restaurants across Texas. Occupied-space phasing, Level 4/5 coordination, and documented punch closeout.',
    scope: [
      'Wall, ceiling, and soffit coatings',
      'Doors, frames, and hollow metal — field or shop-applied',
      'Exposed structure and dryfall applications',
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
      { label: 'Exposed structure', detail: 'Dryfall applied before ceiling grid and MEP close-in' },
      { label: 'Wet / high-touch areas', detail: 'Scrubbable epoxy or catalyzed acrylic systems' },
    ],
    sections: [
      {
        heading: 'Working in occupied buildings',
        body: 'Most interior repaint work happens while the building is still being used. We plan the work in zones, agree the containment and protection standard before we start, and stage material so corridors and exits stay clear. Where the schedule demands it, crews run second shift or weekends so the space is returned each morning ready for use. Odor-sensitive areas get low-VOC systems specified during preconstruction rather than negotiated on site.',
      },
      {
        heading: 'Drywall finish level coordination',
        body: 'More interior paint complaints trace to the drywall finish level than to the coating. A Level 4 wall under critical lighting will telegraph joints no matter what is applied over it. During preconstruction we confirm the specified finish level against the lighting design and flag the mismatch in writing before anyone is standing in a finished room disagreeing about who owns it.',
      },
      {
        heading: 'What closeout includes',
        body: 'The punch list is a scope item, not an afterthought. We walk the space ahead of the general contractor, correct what we find, and hand over attic stock, the approved color schedule, and product data as a package. The goal is a short list at turnover and no return trips after occupancy.',
      },
    ],
    faqs: [
      {
        question: 'Can you work while our building stays open?',
        answer:
          'Yes — this is the majority of our interior work. We zone the building, agree containment and protection standards before mobilizing, and run night or weekend shifts where the space has to be returned to use each morning. Low-odor and low-VOC systems are specified in preconstruction for occupied areas.',
      },
      {
        question: 'Do you handle wallcovering and wall protection?',
        answer:
          'Yes. Vinyl wallcovering, wall protection systems, corner guards, and specialty finishes are carried within the interior scope so there is no gap between the paint contract and the finish schedule.',
      },
      {
        question: 'How do you handle color approval?',
        answer:
          'Colors are submitted and mocked up before production. On projects with a corporate prototype standard we verify the schedule against the brand book and flag any substitution in writing before material is ordered.',
      },
    ],
    relatedIndustries: ['office', 'healthcare', 'retail', 'restaurants', 'education'],
  },
  {
    slug: 'commercial-exterior-painting',
    art: 'exterior',
    title: 'Commercial Exterior Painting',
    shortTitle: 'Exterior Painting',
    csi: 'CSI 09 91 13',
    kicker: 'Tilt-wall · EIFS · masonry · structural silver',
    summary:
      'Exterior repaint and new-construction coatings over tilt-wall, stucco, EIFS, masonry, and metal — including access, sealants, and substrate repair.',
    intro:
      'An exterior repaint is bought on how long it lasts, and that is decided by preparation and by whether the sealants were addressed. Coating over a failing joint or a chalking, unwashed substrate buys two years. Doing the preparation properly buys the full service life of the system.',
    metaTitle: 'Commercial Exterior Painting Contractor | Tilt-Wall, EIFS & Masonry',
    metaDescription:
      'Commercial exterior painting across Texas: tilt-wall, stucco, EIFS, masonry, and structural silver. Pressure washing, sealant replacement, and elastomeric coating systems.',
    scope: [
      'Tilt-wall and precast concrete coatings',
      'Stucco and EIFS repaint, including elastomeric systems',
      'Masonry, CMU, and brick coatings',
      'Structural and architectural silver',
      'Metal panel, canopy, and storefront finishes',
      'Pressure washing and substrate cleaning',
      'Sealant and caulk joint replacement',
      'Substrate crack repair within the coating scope',
      'Lift, swing stage, and boom access planning',
    ],
    systems: [
      { label: 'Tilt-wall / precast', detail: 'Acrylic or elastomeric over cleaned, patched substrate' },
      { label: 'Stucco / EIFS', detail: 'Elastomeric or 100% acrylic with sealant replacement as required' },
      { label: 'Masonry / CMU', detail: 'Block filler and acrylic, or a breathable masonry coating' },
      { label: 'Structural silver', detail: 'Rust-inhibitive or epoxy primer with a urethane topcoat' },
      { label: 'Metal panel', detail: 'Bonding primer with a direct-to-metal acrylic or urethane' },
    ],
    sections: [
      {
        heading: 'Preparation determines the warranty',
        body: 'Chalking, mildew, efflorescence, and failed sealant all defeat an otherwise correct coating system. Every exterior scope starts with cleaning, moisture assessment, and a written sealant condition report. Where the substrate needs repair beyond the coating scope, we say so at bid rather than coating over it and warranting a result we cannot stand behind.',
      },
      {
        heading: 'Access planning',
        body: 'On a multi-story or long-elevation building, access is a larger cost driver than paint. Lift type, swing stage, ground conditions, traffic control, and pedestrian protection are planned at bid, not discovered on mobilization day. That is also where most schedule surprises on exterior work come from.',
      },
      {
        heading: 'Weather and the schedule',
        body: 'Texas exterior work is governed by dew point, surface temperature, and wind. We build float into exterior schedules for the days that are not workable and communicate early when a weather window is going to move a completion date, rather than applying product outside its specified conditions to hold a date.',
      },
    ],
    faqs: [
      {
        question: 'Do you replace sealants as part of an exterior repaint?',
        answer:
          'Where the joints are failing, yes — and we recommend it. Coating over a failed sealant joint guarantees water intrusion behind a new finish. We survey joint condition before bid and carry replacement as a defined line item so it is a decision rather than a surprise.',
      },
      {
        question: 'How long does an exterior coating system last?',
        answer:
          'It depends on the system, exposure, and substrate condition at the time of application. Manufacturer service-life expectations are provided with the submittal, and our two-year workmanship warranty covers our application separately from the manufacturer material warranty.',
      },
      {
        question: 'Can you work around an operating business?',
        answer:
          'Yes. Exterior work is sequenced around parking, entrances, deliveries, and pedestrian routes, with protection and traffic control planned before mobilization.',
      },
    ],
    relatedIndustries: ['industrial', 'retail', 'education', 'government', 'new-construction'],
  },
  {
    slug: 'tenant-finish-outs',
    art: 'tenant',
    title: 'Tenant Finish-Outs',
    shortTitle: 'Tenant Finish-Outs',
    csi: 'CSI 09 90 00',
    kicker: 'Shell to suite, on a landlord delivery date',
    summary:
      'Shell-to-suite finish packages for office, retail, medical, and restaurant tenants — delivered against a lease commencement date.',
    intro:
      'A finish-out is a date before it is a scope. The lease says when the tenant takes the space, and painting sits near the end of the sequence, which means it absorbs every delay upstream of it. We plan the compressed version of the schedule from day one and staff to protect the delivery date.',
    metaTitle: 'Tenant Finish-Out Painting Contractor | Office, Retail & Medical',
    metaDescription:
      'Tenant finish-out painting for office, retail, medical, and restaurant suites. Lease-date delivery, landlord versus tenant scope definition, and fast punch closeout.',
    scope: [
      'Full suite interior finish packages',
      'White-box and vanilla-shell delivery',
      'Demising wall and office split finishes',
      'Corridor, lobby, and common-area work',
      'Accent, decorative, and brand-standard finishes',
      'Door, frame, and millwork finishing',
      'Wall protection in high-traffic suites',
      'Landlord versus tenant scope definition at bid',
      'Punch, touch-up, and turnover documentation',
    ],
    systems: [
      { label: 'New gypsum board', detail: 'Primer plus two finish coats to the specified sheen' },
      { label: 'Existing painted walls', detail: 'Spot prime, skim as needed, two finish coats' },
      { label: 'Doors and frames', detail: 'Field or shop enamel finish per the door schedule' },
      { label: 'Accent and feature walls', detail: 'Specialty finishes with an approved mockup' },
      { label: 'Exposed ceilings', detail: 'Dryfall spray before ceiling and MEP close-in' },
    ],
    sections: [
      {
        heading: 'Defining the scope line',
        body: 'The boundary between landlord base-building work and tenant improvement work causes more disputes on finish-outs than any coating issue. We define that line explicitly in the bid — which walls, which side of the demising partition, whose ceiling, whose doors — so the conversation happens before the work rather than during it.',
      },
      {
        heading: 'Changes arrive late',
        body: 'Tenant-driven changes almost always land after the bid is issued. We turn change pricing around quickly, because a decision waiting on a number is a day off the schedule. Priced changes are documented against the original scope so nobody is reconciling a moving target at closeout.',
      },
      {
        heading: 'Turnover the tenant will accept',
        body: 'A tenant will not take a suite with an open punch list. We run our own quality walk before the general contractor\'s, correct what we find, and present a space that is ready rather than nearly ready.',
      },
    ],
    faqs: [
      {
        question: 'How fast can you turn a finish-out?',
        answer:
          'It depends on square footage, access, and how the space is released to us. What we commit to at bid is manpower against the delivery date — if the schedule compresses upstream, we add crew rather than move the date. We tell you at bid what that costs so it is not a change-order conversation later.',
      },
      {
        question: 'Do you work from a corporate brand standard?',
        answer:
          'Yes. For retail, restaurant, and franchise tenants we verify the finish schedule against the prototype book during preconstruction and flag substitutions in writing before material is ordered.',
      },
      {
        question: 'Can you deliver white-box or vanilla-shell spaces?',
        answer:
          'Yes — speculative suite programs and white-box delivery are routine work, including repeat programs across a landlord\'s portfolio.',
      },
    ],
    relatedIndustries: ['office', 'tenant-improvements', 'retail', 'restaurants', 'healthcare'],
  },
  {
    slug: 'occupied-renovations',
    art: 'occupied',
    title: 'Occupied Renovations',
    shortTitle: 'Occupied Renovations',
    csi: 'CSI 09 90 00',
    kicker: 'Work in buildings that never close',
    summary:
      'Phased painting in hospitals, schools, hotels, offices, and stores that stay open — containment, night shifts, and daily return to service.',
    intro:
      'Working in an occupied building changes almost nothing about the coating and almost everything about the plan. Odor, dust, noise, and traffic all leave the work area, and the people affected did not sign the contract. The scope that matters is containment, sequencing, and the discipline to hand the space back clean every single morning.',
    metaTitle: 'Occupied Building Painting Contractor | Phased Renovations',
    metaDescription:
      'Painting in occupied buildings — hospitals, schools, hotels, offices, and stores. Containment, night and weekend shifts, low-odor systems, and daily return to service.',
    scope: [
      'Zoned and phased work planning',
      'Containment, barricade, and dust control',
      'Night, weekend, and off-hours shifts',
      'Low-VOC and low-odor system specification',
      'Daily protection, cleanup, and return to service',
      'Coordination with facility and building management',
      'Infection-control-aware planning in clinical areas',
      'Occupant and tenant communication support',
      'Progressive punch as each zone completes',
    ],
    systems: [
      { label: 'Occupied interiors', detail: 'Low-VOC acrylic systems with minimal cure odor' },
      { label: 'Clinical adjacency', detail: 'Low-odor systems selected against the facility ICRA' },
      { label: 'High-traffic corridors', detail: 'Scrubbable, high-hide systems for fast recoat' },
      { label: 'Wet areas', detail: 'Catalyzed epoxy or acrylic where washdown is expected' },
      { label: 'Fast return to service', detail: 'Products selected for short recoat and cure windows' },
    ],
    sections: [
      {
        heading: 'Zoning is the whole plan',
        body: 'Before anything is opened, the building is divided into zones with a defined start, a defined finish, and a defined route in and out. Each zone has a return-to-service time the facility can plan around. That is what lets a hospital keep its rooms booked, a school keep its summer programs running, and a hotel keep its keys sellable.',
      },
      {
        heading: 'Odor, dust, and noise',
        body: 'These are the three complaints that reach management, and none of them are about paint quality. Low-odor systems, negative air where required, and controlled work hours are agreed before mobilization. Where a high-performance system is genuinely necessary, we build the schedule around the ventilation window rather than hoping nobody notices.',
      },
      {
        heading: 'Leaving it better than a paint crew usually does',
        body: 'The standard we hold is that the space looks untouched apart from the finish. Floors protected, furniture returned, corridors clear, and no tape residue or overspray on adjacent surfaces. It is the single thing facility managers remember about a contractor.',
      },
    ],
    faqs: [
      {
        question: 'Do you run night and weekend shifts?',
        answer:
          'Yes. Day, night, and occupied-site shifts are standard for us. The shift structure is agreed at bid and priced accordingly, so there is no premium-time surprise later.',
      },
      {
        question: 'How do you handle infection control in healthcare?',
        answer:
          'Work adjacent to patient care areas is planned around the facility\'s infection control risk assessment. Containment, negative air, and traffic routes are agreed with the facility before mobilization rather than improvised on the first day.',
      },
      {
        question: 'What about odor complaints from tenants or occupants?',
        answer:
          'Low-VOC and low-odor systems are specified during preconstruction for any area adjacent to occupied space. We also support building management with advance notice so occupants know what is happening and when.',
      },
    ],
    relatedIndustries: ['healthcare', 'education', 'hospitality', 'office', 'aviation'],
  },
  {
    slug: 'new-construction',
    art: 'construction',
    title: 'New Construction',
    shortTitle: 'New Construction',
    csi: 'CSI 09 00 00',
    kicker: 'Division 09 packages on the CPM schedule',
    summary:
      'Ground-up Division 09 finish packages for general contractors — sequenced, submitted, staffed, and closed out on the construction schedule.',
    intro:
      'On a ground-up project, painting is a schedule position before it is a finish. We sit behind drywall and ahead of flooring, casework, and equipment, and the float in front of us is decided months before we mobilize. What a general contractor is buying is a subcontractor who understands that, staffs for it, and says something early when an upstream trade is about to move us.',
    metaTitle: 'New Construction Painting Contractor | Division 09 for GCs',
    metaDescription:
      'Ground-up commercial construction painting for general contractors. Division 09 packages, CPM sequencing, submittals and mockups, and documented punch closeout.',
    scope: [
      'Full Division 09 painting and coating packages',
      'Submittals, product data, and color schedules',
      'Mockups and approved control samples',
      'Sequencing against the CPM schedule',
      'Interior and exterior finish scopes',
      'Dryfall and exposed structure coatings',
      'Hollow metal, door, and frame finishing',
      'Progressive punch by area release',
      'Attic stock, warranty, and closeout documentation',
    ],
    systems: [
      { label: 'Submittal package', detail: 'Product data, color schedule, and sample submittals' },
      { label: 'Mockups', detail: 'Approved control sample established before production' },
      { label: 'Interior systems', detail: 'Primer plus two coats per the finish schedule' },
      { label: 'Exterior systems', detail: 'Manufacturer-specified assembly for the substrate' },
      { label: 'Closeout package', detail: 'Attic stock, warranty, and as-applied documentation' },
    ],
    sections: [
      {
        heading: 'Sequence over duration',
        body: 'The useful question on a new build is never how long painting takes. It is which areas are released, in what order, and whether drywall is genuinely finished in them. We plan against the release sequence, hold manpower to it, and give the superintendent an honest read when the sequence changes rather than absorbing it silently and missing a date.',
      },
      {
        heading: 'Submittals early, not on the critical path',
        body: 'Product data, color schedules, and mockups go in early so approval is complete before production starts. A finish held up in review is one of the more avoidable ways to lose a week on a project, and it is entirely within the subcontractor\'s control.',
      },
      {
        heading: 'Coordination with the trades around us',
        body: 'We coordinate directly with drywall, flooring, and finish carpentry rather than routing every question through the superintendent. Fewer conversations for the GC, fewer conflicts on the floor, and a finish that is not damaged by the trade that follows us.',
      },
    ],
    faqs: [
      {
        question: 'Do you carry the full Division 09 painting package?',
        answer:
          'Yes — interior and exterior coatings, hollow metal and door finishing, dryfall and exposed structure, and specialty finishes, with submittals, mockups, and closeout documentation carried as scope.',
      },
      {
        question: 'How do you handle schedule compression?',
        answer:
          'By adding manpower and shifts, and by telling the general contractor what that requires as soon as it becomes clear. What we do not do is quietly accept a date we cannot hit and reveal the problem at the punch walk.',
      },
      {
        question: 'What does closeout include?',
        answer:
          'Attic stock, the approved color schedule, product data, the workmanship warranty, and a completed punch list. Delivered as a package with turnover rather than chased afterwards.',
      },
    ],
    relatedIndustries: ['new-construction', 'retail', 'restaurants', 'industrial', 'government'],
  },
  {
    slug: 'surface-preparation',
    art: 'prep',
    title: 'Surface Preparation',
    shortTitle: 'Surface Preparation',
    csi: 'CSI 09 91 00',
    kicker: 'The scope that decides whether the finish lasts',
    summary:
      'Cleaning, profiling, repair, and priming — the work that determines whether a coating system reaches its service life or fails early.',
    intro:
      'Nearly every coating failure we are asked to look at traces to preparation rather than product. The substrate was not clean, was not dry, had no profile, or had a failed sealant left in place. Preparation is where a bid is genuinely won or lost, and it is the first thing removed when a number needs to come down.',
    metaTitle: 'Surface Preparation Contractor | Commercial & Industrial Coatings',
    metaDescription:
      'Commercial and industrial surface preparation: pressure washing, abrasive blasting, mechanical profiling, moisture testing, substrate repair, and priming.',
    scope: [
      'Pressure washing and chemical cleaning',
      'Abrasive blasting and mechanical profiling',
      'Grinding, sanding, and feathering',
      'Moisture and pH testing on concrete',
      'Adhesion testing on questionable substrates',
      'Rust removal and corrosion treatment',
      'Substrate patching and crack repair',
      'Sealant and caulk joint replacement',
      'Priming to the manufacturer specification',
    ],
    systems: [
      { label: 'Concrete floors', detail: 'Mechanical profile to the specified CSP; moisture tested' },
      { label: 'Structural silver', detail: 'SSPC-SP surface prep to the level the system requires' },
      { label: 'Existing coatings', detail: 'Adhesion tested; failed material removed, not coated over' },
      { label: 'Exterior masonry', detail: 'Cleaned, efflorescence treated, pH verified before coating' },
      { label: 'Gypsum board', detail: 'Repaired, skimmed, and sanded to the specified finish level' },
    ],
    sections: [
      {
        heading: 'Testing before coating',
        body: 'On concrete, moisture vapor emission and pH decide whether a resinous system will bond or delaminate — and the test costs a fraction of the failure. On existing coatings, an adhesion test tells you whether you are building on something sound. Where testing is warranted we carry it in the bid and share the results, including when they say something the schedule did not want to hear.',
      },
      {
        heading: 'When we say the substrate is not ready',
        body: 'Occasionally the honest answer is that the surface needs work outside the painting scope before a coating should go on it — structural repair, a moisture mitigation system, or remediation of a failed assembly. We say so in writing at bid rather than coating over it and issuing a warranty we know is hollow.',
      },
      {
        heading: 'Preparation as a line item',
        body: 'We price preparation separately from application so it is visible. When a budget has to come down, everyone can see exactly what is being traded away and make the decision deliberately, rather than discovering two years later that the number was achieved by skipping the wash.',
      },
    ],
    faqs: [
      {
        question: 'Why is preparation priced separately?',
        answer:
          'So it is visible. Preparation is the first thing cut when a number needs to come down, and it is the single largest driver of coating service life. Pricing it as its own line means a reduction is a decision somebody makes rather than something that quietly happens.',
      },
      {
        question: 'Do you test concrete before applying resinous systems?',
        answer:
          'Where the system requires it, yes — moisture vapor emission, relative humidity, and pH. Applying a resinous floor over a slab with excess moisture is the most common way those systems fail, and the test is inexpensive relative to a re-do.',
      },
      {
        question: 'What if the existing coating is failing?',
        answer:
          'It gets removed rather than coated over. New material bonded to failing material fails with it. We identify that condition at bid and carry removal in the scope.',
      },
    ],
    relatedIndustries: ['industrial', 'new-construction', 'education', 'government', 'retail'],
  },
  {
    slug: 'high-performance-coatings',
    art: 'coatings',
    title: 'High-Performance & Specialty Coatings',
    shortTitle: 'High-Performance Coatings',
    csi: 'CSI 09 96 00',
    kicker: 'Epoxy · urethane · industrial systems',
    summary:
      'Epoxy, urethane, and industrial coating systems specified against chemical exposure, washdown, abrasion, and thermal service conditions.',
    intro:
      'A high-performance coating is bought for what it resists. Chemical attack, constant washdown, abrasion, temperature cycling, or all of them at once. The correct product is a function of the service environment, and specifying it from a catalog rather than from the actual conditions is how these systems fail early and expensively.',
    metaTitle: 'High-Performance & Industrial Coatings Contractor | Epoxy & Urethane',
    metaDescription:
      'Epoxy, urethane, and industrial coating systems for plants, kitchens, and processing facilities. Specification against service conditions, surface prep, and containment.',
    scope: [
      'Epoxy wall and ceiling systems',
      'Urethane and polyaspartic topcoats',
      'Resinous and epoxy floor systems',
      'Direct-to-metal industrial coatings',
      'Chemical- and washdown-resistant finishes',
      'Structural silver protective systems',
      'Safety striping and line marking',
      'Containment and secondary containment coatings',
      'Manufacturer-specified system verification',
    ],
    systems: [
      { label: 'Commercial kitchens', detail: 'Catalyzed epoxy rated for washdown and grease' },
      { label: 'Processing / food plants', detail: 'USDA-acceptable epoxy or urethane assemblies' },
      { label: 'Structural silver', detail: 'Epoxy primer with an aliphatic urethane topcoat' },
      { label: 'Concrete floors', detail: 'Resinous systems over a profiled, moisture-tested slab' },
      { label: 'Chemical exposure', detail: 'Novolac or specialty resin selected to the exposure' },
    ],
    sections: [
      {
        heading: 'Specify against conditions, not a catalog',
        body: 'The right question is what the surface is exposed to: which chemicals, at what concentration, how often, at what temperature, and cleaned how. We collect that at preconstruction and confirm the system with the manufacturer before it is priced. A product that is correct for a warehouse and wrong for a wash bay looks identical on a submittal.',
      },
      {
        heading: 'Preparation is not optional here',
        body: 'High-performance systems are less forgiving than architectural coatings. Profile, cleanliness, and moisture are verified before application, and the standard is agreed in writing at bid. Where a slab needs a moisture mitigation system, that is identified before the floor goes down rather than after it lifts.',
      },
      {
        heading: 'Working around production',
        body: 'These coatings usually go into buildings that would rather not stop. Scope is broken into what can be applied live, what needs a line down, and what needs an area fully cleared — priced separately so the facility can decide how much downtime the result is worth.',
      },
    ],
    faqs: [
      {
        question: 'How do you select the right system?',
        answer:
          'From the service conditions: chemical exposure, cleaning regime, temperature, abrasion, and traffic. We collect those in preconstruction and confirm the assembly with the manufacturer before pricing it, rather than defaulting to a familiar product.',
      },
      {
        question: 'Can epoxy floors be installed without shutting down?',
        answer:
          'Partially. Some scope can be done live behind containment; some genuinely requires the area cleared for cure. We break the scope into those categories at bid so the facility can weigh downtime against sequencing.',
      },
      {
        question: 'Do you do safety striping and line marking?',
        answer:
          'Yes — aisle marking, hazard striping, and equipment zoning are carried with the floor coating scope so there is no separate mobilization for it.',
      },
    ],
    relatedIndustries: ['industrial', 'restaurants', 'healthcare', 'sports-entertainment', 'aviation'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceSlugs = services.map((s) => s.slug);
