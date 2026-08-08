/**
 * LOCATIONS — multi-market architecture
 * ===========================================================================
 * Childress is not a Dallas-only company. Texas is the primary market, and
 * there is documented work in Kansas and Missouri, so locations are keyed
 * state-first: /locations/[state]/[city]. Adding a market later is one array
 * entry; nothing else has to change.
 *
 * RULE: every city page must earn its existence. Each entry below carries a
 * genuinely different `intro` and `considerations` written against that city's
 * actual building stock and construction pattern. If a new city cannot be
 * given real, differentiated content, it does not get a page — thin
 * near-duplicate city pages are a liability, not an SEO asset.
 *
 * Projects are matched to cities by `projectCities`, so a city page featuring
 * real photography always outranks one that cannot.
 */

export type City = {
  slug: string;
  name: string;
  /** Metro grouping shown on the state hub. */
  metro: string;
  /** ~2–3 sentences, specific to this city. Never templated. */
  intro: string;
  /** What actually shapes painting work here. Two entries, city-specific. */
  considerations: { title: string; body: string }[];
  /** Industry slugs most relevant locally, most relevant first. */
  industries: string[];
  /** Service slugs to surface, most relevant first. */
  services: string[];
  /** Values found in `project.location` that belong to this city. */
  projectCities: string[];
  /** Slugs of nearby cities, for lateral internal linking. */
  nearby: string[];
  metaTitle: string;
  metaDescription: string;
};

export type StateMarket = {
  slug: string;
  name: string;
  abbr: string;
  status: 'primary' | 'active';
  intro: string;
  /** Where the crews working this state are based. */
  basedIn: string;
  cities: City[];
  metaTitle: string;
  metaDescription: string;
};

export const states: StateMarket[] = [
  /* ==================================================================== TEXAS */
  {
    slug: 'texas',
    name: 'Texas',
    abbr: 'TX',
    status: 'primary',
    basedIn: '8601 Sovereign Row, Dallas',
    intro:
      'Texas is our primary market, worked from the Dallas office. Most of it is commercial construction for general contractors: new-build retail and restaurant, tenant finish-outs, occupied renovations, and exterior repaint programs across the Metroplex and statewide. Industrial coatings and residential work run from the same office and the same crews.',
    metaTitle: 'Painting Contractor in Texas | Commercial, Industrial & Residential',
    metaDescription:
      'Commercial, industrial, and residential painting across Texas from our Dallas office. Serving Dallas, Fort Worth, Plano, Frisco, Arlington, Irving, and the wider Metroplex since 1984.',
    cities: [
      {
        slug: 'dallas',
        name: 'Dallas',
        metro: 'Dallas County',
        intro:
          'Our office sits at 8601 Sovereign Row, inside the Stemmons industrial corridor, so Dallas work is the shortest mobilization we run. The city gives us the widest mix of anything we touch: downtown and Uptown office repositioning, Deep Ellum and Design District restaurant finish-outs, medical and clinic buildouts along the North Central corridor, and warehouse and distribution coatings west of I-35.',
        considerations: [
          {
            title: 'Occupied Buildings Are the Norm',
            body: 'Most Dallas commercial work is a repositioning or a tenant finish-out inside a building that is still operating. Corridors stay open, tenants stay in place, and the paint scope has to be zoned, run off-hours, and returned to service every morning.',
          },
          {
            title: 'Downtown Access Is Planned, Not Improvised',
            body: 'Loading dock windows, freight elevator reservations, and street-level lift permits govern the schedule downtown far more than production rates do. We plan access at bid, because a lift that cannot get to the wall is a week lost.',
          },
        ],
        industries: ['office', 'restaurants', 'healthcare', 'retail', 'industrial'],
        services: ['commercial-painting', 'interior-painting', 'maintenance-painting', 'epoxy-floor-coatings'],
        projectCities: ['Dallas'],
        nearby: ['irving', 'garland', 'richardson', 'grand-prairie', 'carrollton'],
        metaTitle: 'Commercial Painting Contractors in Dallas, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Dallas, Texas. Tenant finish-outs, occupied renovations, office and restaurant interiors, and industrial coatings. Based on Sovereign Row since 1984.',
      },
      {
        slug: 'fort-worth',
        name: 'Fort Worth',
        metro: 'Tarrant County',
        intro:
          'Fort Worth work splits between the Alliance corridor in the north, where distribution and light industrial construction continues to run, and the central and near-south districts, where restaurant and retail finish-outs dominate. Both need a subcontractor comfortable with a hard opening date.',
        considerations: [
          {
            title: 'Alliance-Corridor Buildings Need Coatings, Not Paint',
            body: 'Distribution and light manufacturing shells around Alliance are specified for dryfall, structural steel systems, and resinous floors. Those are coatings decisions driven by service conditions and slab moisture, and they get tested rather than assumed.',
          },
          {
            title: 'Restaurant Openings Move the Whole Schedule',
            body: 'Restaurant and retail finish-outs are tied to a marketing date that does not move. When the schedule ahead of us compresses, we add shifts and say what that costs, instead of quietly accepting a date we cannot hit.',
          },
        ],
        industries: ['restaurants', 'industrial', 'retail', 'new-construction'],
        services: ['commercial-painting', 'exterior-painting', 'protective-coatings', 'epoxy-floor-coatings'],
        projectCities: ['Fort Worth'],
        nearby: ['arlington', 'grapevine', 'southlake', 'grand-prairie'],
        metaTitle: 'Commercial Painting Contractors in Fort Worth, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Fort Worth, Texas. Restaurant and retail finish-outs, Alliance-corridor industrial coatings, exterior repaints, and epoxy floors.',
      },
      {
        slug: 'arlington',
        name: 'Arlington',
        metro: 'Tarrant County',
        intro:
          'Arlington is an entertainment-district city with an industrial spine. Work here tends to be venue and hospitality adjacent, plus the retail and restaurant sites that serve event traffic, plus manufacturing along the Great Southwest corridor.',
        considerations: [
          {
            title: 'The Event Calendar Is the Schedule',
            body: 'Near the stadium district, the calendar decides everything. Work windows fall between events, which means short, hard-edged production periods and a site returned to public condition before the next gate opening.',
          },
          {
            title: 'High-Traffic Finishes Have to Survive Cleaning',
            body: 'Concourse and hospitality surfaces take crowd contact and aggressive cleaning. Those specify to scrubbable, high-build systems, not to a standard wall paint that fails in a season.',
          },
        ],
        industries: ['sports-entertainment', 'hospitality', 'industrial', 'restaurants'],
        services: ['commercial-painting', 'protective-coatings', 'line-striping', 'maintenance-painting'],
        projectCities: ['Arlington'],
        nearby: ['fort-worth', 'grand-prairie', 'irving'],
        metaTitle: 'Commercial Painting Contractors in Arlington, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Arlington, Texas. Venue and hospitality finishes, high-traffic coating systems, industrial work, and line striping around the entertainment district.',
      },
      {
        slug: 'plano',
        name: 'Plano',
        metro: 'Collin County',
        intro:
          'Plano is corporate campus territory. Legacy West and the Legacy corridor keep a steady flow of office repositioning, amenity-space refreshes, and ground-floor retail and restaurant finish-outs, most of it inside buildings full of tenants who never move out for the work.',
        considerations: [
          {
            title: 'Campus Work Runs Around Employees',
            body: 'Corporate campuses schedule around occupancy, not around us. Evening and weekend shifts, low-odor systems specified during preconstruction, and floors handed back clean each morning are the baseline expectation here.',
          },
          {
            title: 'Brand Standards Are Fixed',
            body: 'Corporate tenants arrive with a finish standard already documented. We verify the schedule against it in preconstruction and flag substitutions in writing before material is ordered, rather than after an executive walk.',
          },
        ],
        industries: ['office', 'restaurants', 'retail', 'tenant-improvements'],
        services: ['commercial-painting', 'interior-painting', 'maintenance-painting', 'drywall-repair'],
        projectCities: ['Plano'],
        nearby: ['frisco', 'richardson', 'mckinney', 'carrollton'],
        metaTitle: 'Commercial Painting Contractors in Plano, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Plano, Texas. Corporate campus and office repositioning, tenant finish-outs, and occupied-building repaint programs along the Legacy corridor.',
      },
      {
        slug: 'frisco',
        name: 'Frisco',
        metro: 'Collin County',
        intro:
          'Frisco is still building. Most of what we see here is genuinely new construction: retail pads, restaurant boxes, medical office, and school campuses going up on a schedule that was set before ground broke, which puts painting at the end of a sequence that rarely gets more time.',
        considerations: [
          {
            title: 'New Construction Absorbs Upstream Delay',
            body: 'Painting sits behind drywall and ahead of flooring, casework, and equipment, so it absorbs every delay above it. On Frisco new-builds we plan the compressed version of the schedule from day one, and add shifts rather than move the date.',
          },
          {
            title: 'Prototype Finishes Get Verified Early',
            body: 'National retail and restaurant brands opening in Frisco carry prototype books. We reconcile the finish schedule against the brand standard during preconstruction, which is when a conflict is cheap to fix.',
          },
        ],
        industries: ['new-construction', 'retail', 'restaurants', 'education', 'healthcare'],
        services: ['commercial-painting', 'interior-painting', 'exterior-painting', 'epoxy-floor-coatings'],
        projectCities: ['Frisco'],
        nearby: ['plano', 'mckinney', 'carrollton'],
        metaTitle: 'Commercial Painting Contractors in Frisco, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Frisco, Texas. New construction retail, restaurant, medical office, and school painting delivered to hard opening dates.',
      },
      {
        slug: 'mckinney',
        name: 'McKinney',
        metro: 'Collin County',
        intro:
          'McKinney pairs a historic downtown with fast suburban growth, and the two need different things. Downtown means older masonry, sealant condition, and repaint work that has to respect the existing envelope. North of it, new retail and school construction runs on a conventional finish-out schedule.',
        considerations: [
          {
            title: 'Older Masonry Is Surveyed Before It Is Coated',
            body: 'Around the historic square, failed sealant joints and untreated efflorescence defeat any coating applied over them. Every exterior scope here starts with a written joint condition survey so replacement is a decision, not a surprise.',
          },
          {
            title: 'School Work Fits the Summer Window',
            body: 'District work in McKinney happens between the last day of class and staff return. That window does not extend, so the program is staffed to the calendar rather than to an ideal crew size.',
          },
        ],
        industries: ['education', 'retail', 'restaurants', 'government'],
        services: ['commercial-painting', 'exterior-painting', 'caulking-sealants', 'maintenance-painting'],
        projectCities: ['McKinney'],
        nearby: ['frisco', 'plano', 'denton'],
        metaTitle: 'Commercial Painting Contractors in McKinney, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in McKinney, Texas. Historic downtown masonry and sealant work, school district summer programs, and new retail construction.',
      },
      {
        slug: 'irving',
        name: 'Irving',
        metro: 'Dallas County',
        intro:
          'Irving is two markets. Las Colinas is dense corporate office with structured parking and lobby-grade finishes. The rest of the city, especially near DFW Airport, is logistics and light industrial, where the specification is a coating decision rather than a color decision.',
        considerations: [
          {
            title: 'Lobby-Grade Finishes Are Inspected Closely',
            body: 'Class A lobbies and elevator vestibules in Las Colinas are judged from two feet away under critical lighting. That usually means a Level 5 wall, which we confirm against the lighting design in preconstruction rather than discovering at the walk.',
          },
          {
            title: 'Airport-Adjacent Sites Are Access-Controlled',
            body: 'Work near DFW comes with badging, escort requirements, and delivery windows. Those are planned into the schedule at bid, because they change crew productivity more than the scope does.',
          },
        ],
        industries: ['office', 'industrial', 'aviation', 'hospitality'],
        services: ['commercial-painting', 'interior-painting', 'protective-coatings', 'drywall-repair'],
        projectCities: ['Irving'],
        nearby: ['dallas', 'grand-prairie', 'grapevine', 'carrollton'],
        metaTitle: 'Commercial Painting Contractors in Irving, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Irving and Las Colinas, Texas. Class A office interiors, airport-adjacent logistics coatings, and hospitality finishes.',
      },
      {
        slug: 'garland',
        name: 'Garland',
        metro: 'Dallas County',
        intro:
          'Garland has one of the larger manufacturing bases in the Metroplex alongside an established retail and civic building stock. Work here leans industrial: plant interiors, structural steel, safety striping, and floor systems that have to survive a working environment.',
        considerations: [
          {
            title: 'Plant Work Is Priced Against Downtime',
            body: 'Scope gets separated into what can run live behind containment and what genuinely needs a line down. We price those apart so the plant decides how much downtime the result is worth.',
          },
          {
            title: 'Civic Buildings Stay Open',
            body: 'Municipal and civic facilities cannot close for a repaint. The work is zoned, run off-hours where needed, and handed back with corridors clear and public areas usable.',
          },
        ],
        industries: ['industrial', 'government', 'retail', 'education'],
        services: ['industrial-painting', 'protective-coatings', 'line-striping', 'epoxy-floor-coatings'],
        projectCities: ['Garland'],
        nearby: ['richardson', 'dallas', 'plano'],
        metaTitle: 'Industrial & Commercial Painting Contractors in Garland, TX | Childress Painting',
        metaDescription:
          'Industrial and commercial painting contractors in Garland, Texas. Plant interiors, structural steel coatings, epoxy floors, safety striping, and civic facility repaints.',
      },
      {
        slug: 'richardson',
        name: 'Richardson',
        metro: 'Dallas County',
        intro:
          'The Telecom Corridor keeps Richardson in a steady cycle of office repositioning as tenants turn over. Older office stock is being refreshed rather than replaced, which makes surface condition and drywall repair as much of the scope as the coating.',
        considerations: [
          {
            title: 'Repositioning Work Is Repair Work First',
            body: 'Refreshing older office stock means fastener pops, joint cracking, and patched telecom penetrations. Those repairs are feathered wide and texture-matched before coating, because a visible patch under new paint reads as a paint defect.',
          },
          {
            title: 'Turnover Windows Are Short',
            body: 'Between one tenant leaving and the next arriving there is rarely more than a few weeks. We staff to the release plan and punch progressively so the space is deliverable on the date the lease says.',
          },
        ],
        industries: ['office', 'tenant-improvements', 'education', 'retail'],
        services: ['commercial-painting', 'drywall-repair', 'interior-painting', 'maintenance-painting'],
        projectCities: ['Richardson'],
        nearby: ['plano', 'garland', 'dallas'],
        metaTitle: 'Commercial Painting Contractors in Richardson, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Richardson, Texas. Telecom Corridor office repositioning, tenant turnover repaints, drywall repair, and texture matching.',
      },
      {
        slug: 'carrollton',
        name: 'Carrollton',
        metro: 'Dallas County',
        intro:
          'Carrollton is warehouse and flex-space heavy, with retail centres serving the surrounding neighbourhoods. Most scopes combine a coated floor, a dryfall ceiling, and an office fit-out inside the same shell.',
        considerations: [
          {
            title: 'One Building, Three Different Specifications',
            body: 'Flex space usually needs a resinous or sealed warehouse floor, dryfall over exposed structure, and conventional finishes in the office pod. Sequencing those against each other is most of the planning.',
          },
          {
            title: 'Slabs Get Tested Before Anything Is Mixed',
            body: 'Resinous floors fail over slabs that were never tested. We profile, test moisture and pH, and put the results in writing, including when they say the slab needs mitigation first.',
          },
        ],
        industries: ['industrial', 'retail', 'office', 'tenant-improvements'],
        services: ['epoxy-floor-coatings', 'commercial-painting', 'line-striping', 'protective-coatings'],
        projectCities: ['Carrollton'],
        nearby: ['irving', 'plano', 'dallas', 'denton'],
        metaTitle: 'Warehouse & Commercial Painting Contractors in Carrollton, TX | Childress Painting',
        metaDescription:
          'Commercial painting and epoxy floor contractors in Carrollton, Texas. Warehouse and flex-space coatings, dryfall ceilings, office fit-outs, and line striping.',
      },
      {
        slug: 'grand-prairie',
        name: 'Grand Prairie',
        metro: 'Dallas County',
        intro:
          'Grand Prairie sits on the Great Southwest Industrial District, one of the largest industrial parks in the country. Work here is overwhelmingly distribution, manufacturing, and the retail that serves it, on buildings sized for equipment rather than for people.',
        considerations: [
          {
            title: 'Access Governs Production',
            body: 'Coating a 32-foot deck over racking is a lift and access problem before it is a painting problem. Lift type, ground conditions, and rack clearance are planned at bid, because access is where exterior and high-bay schedules actually slip.',
          },
          {
            title: 'Safety Marking Is Part of the Scope',
            body: 'Aisle marking, hazard striping, and walkway definition are safety systems that get inspected. We carry them inside the coatings scope so there is no gap between trades on the floor.',
          },
        ],
        industries: ['industrial', 'retail', 'new-construction'],
        services: ['industrial-painting', 'line-striping', 'epoxy-floor-coatings', 'protective-coatings'],
        projectCities: ['Grand Prairie'],
        nearby: ['arlington', 'irving', 'fort-worth', 'dallas'],
        metaTitle: 'Industrial Painting Contractors in Grand Prairie, TX | Childress Painting',
        metaDescription:
          'Industrial painting contractors in Grand Prairie, Texas. Great Southwest District distribution and manufacturing coatings, high-bay work, epoxy floors, and safety striping.',
      },
      {
        slug: 'grapevine',
        name: 'Grapevine',
        metro: 'Tarrant County',
        intro:
          'Grapevine is hospitality and retail led, anchored by the resort and conference trade and the Main Street historic district. Work here happens around guests and visitors, which puts phasing and cleanliness ahead of raw production speed.',
        considerations: [
          {
            title: 'Rooms Come Back Sellable, Not Just Painted',
            body: 'Hotel and resort work is measured in keys out of service. Floors are released back in blocks with a stated return time so revenue management can plan, and a room handed back has to be occupiable that night.',
          },
          {
            title: 'Guest-Facing Areas Are Low-Odor by Specification',
            body: 'In an operating hotel, odor is a complaint before it is a finish problem. Low-VOC systems are specified during preconstruction rather than substituted after the first call to the front desk.',
          },
        ],
        industries: ['hospitality', 'retail', 'restaurants', 'aviation'],
        services: ['commercial-painting', 'maintenance-painting', 'interior-painting', 'decorative-finishes'],
        projectCities: ['Grapevine'],
        nearby: ['southlake', 'irving', 'fort-worth'],
        metaTitle: 'Hotel & Commercial Painting Contractors in Grapevine, TX | Childress Painting',
        metaDescription:
          'Commercial and hospitality painting contractors in Grapevine, Texas. Hotel and resort repaint programs phased by floor, retail finishes, and low-odor occupied work.',
      },
      {
        slug: 'southlake',
        name: 'Southlake',
        metro: 'Tarrant County',
        intro:
          'Southlake is high-end retail, restaurant, and professional office, with a residential market that expects the same finish quality. Town Square work in particular is judged on detail: cut lines, sheen uniformity, and stain-grade millwork.',
        considerations: [
          {
            title: 'Finish Quality Is the Deliverable',
            body: 'At this end of the market the coating is assumed and the craftsmanship is what gets inspected. Stain-grade millwork, sprayed cabinetry, and decorative systems are approved from a physical mockup before production.',
          },
          {
            title: 'Retail Work Happens Around Trading Hours',
            body: 'Town Square tenants do not close for a repaint. Work is barricaded, run outside trading hours, and the storefront is presentable before the first customer arrives.',
          },
        ],
        industries: ['retail', 'restaurants', 'office', 'residential'],
        services: ['commercial-painting', 'custom-wood-staining', 'cabinet-painting-refinishing', 'decorative-finishes'],
        projectCities: ['Southlake'],
        nearby: ['grapevine', 'fort-worth', 'denton'],
        metaTitle: 'Commercial Painting Contractors in Southlake, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Southlake, Texas. Town Square retail and restaurant finishes, stain-grade millwork, decorative systems, and cabinet refinishing.',
      },
      {
        slug: 'denton',
        name: 'Denton',
        metro: 'Denton County',
        intro:
          'Denton is a university city with a working industrial edge and a historic square. That combination produces campus and student-housing repaint programs on an academic calendar, alongside light industrial and civic work.',
        considerations: [
          {
            title: 'The Academic Calendar Sets the Window',
            body: 'Campus and student-housing repaints happen between terms. The window is fixed and short, so the program is planned around turnover dates and staffed to finish inside them.',
          },
          {
            title: 'High-Turnover Interiors Need Repaintable Finishes',
            body: 'Student housing is repainted often. Specifying a scrubbable, easily recoated system saves more over five turnovers than the cheaper product saves on day one.',
          },
        ],
        industries: ['education', 'industrial', 'hospitality', 'government'],
        services: ['maintenance-painting', 'commercial-painting', 'interior-painting', 'drywall-repair'],
        projectCities: ['Denton'],
        nearby: ['carrollton', 'southlake', 'mckinney'],
        metaTitle: 'Commercial Painting Contractors in Denton, TX | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Denton, Texas. Campus and student-housing repaint programs on the academic calendar, light industrial coatings, and civic work.',
      },
    ],
  },

  /* =================================================================== KANSAS */
  {
    slug: 'kansas',
    name: 'Kansas',
    abbr: 'KS',
    status: 'active',
    basedIn: '14000 Century Lane, Grandview, Missouri',
    intro:
      'Kansas work is run from our Grandview office on the Missouri side of the Kansas City metro. The record here is deep and long: district-wide school painting programs across Johnson County, national retail and restaurant rollouts, and commercial interiors throughout the Kansas suburbs.',
    metaTitle: 'Painting Contractor in Kansas | Commercial, School & Retail Painting',
    metaDescription:
      'Commercial painting contractor serving Kansas from our Kansas City-area office. School district programs, retail and restaurant rollouts, and commercial interiors in Overland Park, Olathe, Shawnee, and Lenexa.',
    cities: [
      {
        slug: 'overland-park',
        name: 'Overland Park',
        metro: 'Johnson County',
        intro:
          'Overland Park is the centre of our Johnson County school work and a steady source of corporate office and retail projects. Blue Valley and Shawnee Mission campuses sit across this area, and district painting programs run every summer between the last day of class and staff return.',
        considerations: [
          {
            title: 'District Programs Are Won on Summer Logistics',
            body: 'Painting several campuses inside one summer is a staffing and sequencing problem more than a painting one. Buildings are released in a set order, and every one has to be classroom-ready before teachers come back.',
          },
          {
            title: 'Occupied Corporate Space Runs Off-Hours',
            body: 'Office work in Overland Park happens around staff. Evening and weekend shifts with low-odor systems keep the space usable the next morning, which is what makes the program repeatable.',
          },
        ],
        industries: ['education', 'office', 'retail', 'residential'],
        services: ['commercial-painting', 'maintenance-painting', 'interior-painting', 'custom-wood-staining'],
        projectCities: ['Overland Park'],
        nearby: ['olathe', 'shawnee', 'lenexa'],
        metaTitle: 'Commercial & School Painting Contractors in Overland Park, KS | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Overland Park, Kansas. Blue Valley and Shawnee Mission school district programs, corporate office repaints, and retail finishes.',
      },
      {
        slug: 'olathe',
        name: 'Olathe',
        metro: 'Johnson County',
        intro:
          'Olathe combines school district work with municipal facilities and a growing distribution base along the I-35 corridor. Public buildings here stay open through the work, which makes phasing and public-area cleanliness part of the scope.',
        considerations: [
          {
            title: 'Municipal Facilities Do Not Close',
            body: 'Transfer stations, civic buildings, and public safety facilities operate through a repaint. Work is zoned around public access and staff routes, with a clear return-to-service time for every area.',
          },
          {
            title: 'Prevailing Wage and Documentation',
            body: 'Public work brings certified payroll and documentation requirements. Those are handled as part of the job rather than treated as an afterthought at closeout.',
          },
        ],
        industries: ['government', 'education', 'industrial', 'retail'],
        services: ['commercial-painting', 'maintenance-painting', 'protective-coatings', 'line-striping'],
        projectCities: ['Olathe'],
        nearby: ['overland-park', 'lenexa', 'shawnee'],
        metaTitle: 'Commercial Painting Contractors in Olathe, KS | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Olathe, Kansas. Municipal and public safety facilities, school district work, and distribution coatings along the I-35 corridor.',
      },
      {
        slug: 'shawnee',
        name: 'Shawnee',
        metro: 'Johnson County',
        intro:
          'Shawnee work has centred on municipal and civic buildings alongside neighbourhood retail. City facilities here are painted around public hours and staff operations rather than during a shutdown.',
        considerations: [
          {
            title: 'Public Buildings Are Painted in Sight of the Public',
            body: 'Civic buildings are painted while residents are using them. Containment, signage, and a clean public route matter as much as the finish, because the work is visible the entire time it is happening.',
          },
          {
            title: 'Long Recoat Cycles Favor Durable Systems',
            body: 'Municipal budgets repaint on long cycles, so the right specification is the one that still looks correct in year eight, not the one that costs least in year one.',
          },
        ],
        industries: ['government', 'education', 'retail'],
        services: ['commercial-painting', 'exterior-painting', 'maintenance-painting', 'caulking-sealants'],
        projectCities: ['Shawnee'],
        nearby: ['lenexa', 'overland-park', 'olathe'],
        metaTitle: 'Municipal & Commercial Painting Contractors in Shawnee, KS | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Shawnee, Kansas. Municipal and civic building programs, exterior repaints, sealant replacement, and neighbourhood retail work.',
      },
      {
        slug: 'lenexa',
        name: 'Lenexa',
        metro: 'Johnson County',
        intro:
          'Lenexa is warehouse and light-industrial territory with a corporate office layer. Most scopes here involve a coated floor, exposed structure, and an office build inside a distribution shell.',
        considerations: [
          {
            title: 'Dryfall Goes Up Before MEP Closes In',
            body: 'Exposed structure in a distribution shell is coated before mechanical, electrical, and plumbing close in. Miss that window and the same scope becomes a far slower, far more expensive detail job.',
          },
          {
            title: 'Floors Are Specified Against Wheel Traffic',
            body: 'A floor taking forklift traffic and a floor taking foot traffic are different systems. Specifying against the real service condition is what keeps a resinous floor from delaminating in the drive aisle.',
          },
        ],
        industries: ['industrial', 'office', 'retail'],
        services: ['industrial-painting', 'epoxy-floor-coatings', 'line-striping', 'commercial-painting'],
        projectCities: ['Lenexa'],
        nearby: ['shawnee', 'olathe', 'overland-park'],
        metaTitle: 'Industrial Painting Contractors in Lenexa, KS | Childress Painting',
        metaDescription:
          'Industrial and commercial painting contractors in Lenexa, Kansas. Distribution and warehouse coatings, dryfall, epoxy floors, line striping, and office fit-outs.',
      },
    ],
  },

  /* ================================================================= MISSOURI */
  {
    slug: 'missouri',
    name: 'Missouri',
    abbr: 'MO',
    status: 'active',
    basedIn: '14000 Century Lane, Grandview',
    intro:
      'Our regional office sits at 14000 Century Lane in Grandview, and the Missouri side of the Kansas City metro holds the largest concentration of photographed work in our portfolio: restaurants, grocery and convenience retail, corporate offices, and stadium and industrial projects.',
    metaTitle: 'Painting Contractor in Missouri | Kansas City Commercial Painting',
    metaDescription:
      'Commercial painting contractor in Missouri, based in Grandview. Restaurant, retail, office, stadium, and industrial painting across the Kansas City metro since 1984.',
    cities: [
      {
        slug: 'kansas-city',
        name: 'Kansas City',
        metro: 'Jackson County',
        intro:
          'Kansas City holds more of our photographed work than anywhere else. Restaurants, grocery and convenience retail, architecture and corporate offices, event venues, industrial plants, and stadium work all sit inside this metro, run from the Grandview office.',
        considerations: [
          {
            title: 'Retail and Restaurant Work Happens Around Trading',
            body: 'Grocery, convenience, and restaurant sites here stay open through the work. Night shifts, barricaded phasing, and a sales floor returned clean before opening are standard, and they are priced at bid rather than added later.',
          },
          {
            title: 'Winter Moves Exterior Work Indoors',
            body: 'Missouri winters close the window for exterior coating on surface temperature and dew point. Exterior scopes are planned around that, and interior work is sequenced to keep crews productive when the envelope is out of specification.',
          },
        ],
        industries: ['restaurants', 'retail', 'office', 'sports-entertainment', 'industrial'],
        services: ['commercial-painting', 'interior-painting', 'exterior-painting', 'epoxy-floor-coatings'],
        projectCities: ['Kansas City', 'Grandview'],
        nearby: ['grandview'],
        metaTitle: 'Commercial Painting Contractors in Kansas City, MO | Childress Painting',
        metaDescription:
          'Commercial painting contractors in Kansas City, Missouri. Restaurant, grocery, retail, office, and industrial painting with photographed project work across the metro.',
      },
      {
        slug: 'grandview',
        name: 'Grandview',
        metro: 'Jackson County',
        intro:
          'Grandview is where our regional office is based, at 14000 Century Lane. Crews working Kansas and Missouri mobilize from here, which makes the south metro our shortest response for both scheduled programs and callbacks under warranty.',
        considerations: [
          {
            title: 'Shortest Mobilization in the Metro',
            body: 'Being based here means small scopes, punch work, and warranty callbacks are practical rather than uneconomic. A one-day return does not require a full mobilization.',
          },
          {
            title: 'A Base for Multi-Site Programs',
            body: 'Rollout and maintenance programs across the metro are staged from this office, which keeps specification, color schedules, and crew standards consistent across every site in the program.',
          },
        ],
        industries: ['industrial', 'retail', 'office', 'government'],
        services: ['commercial-painting', 'maintenance-painting', 'industrial-painting', 'pressure-washing'],
        projectCities: ['Grandview'],
        nearby: ['kansas-city'],
        metaTitle: 'Commercial Painting Contractors in Grandview, MO | Childress Painting',
        metaDescription:
          'Commercial painting contractors based in Grandview, Missouri, at 14000 Century Lane. Multi-site programs, maintenance painting, and industrial coatings across the Kansas City metro.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ HELPERS */

export const getState = (slug: string) => states.find((s) => s.slug === slug);

export const getCity = (stateSlug: string, citySlug: string) =>
  getState(stateSlug)?.cities.find((c) => c.slug === citySlug);

export const stateSlugs = states.map((s) => s.slug);

export const allCities = states.flatMap((state) =>
  state.cities.map((city) => ({ ...city, state })),
);

export const cityPaths = states.flatMap((state) =>
  state.cities.map((city) => ({ state: state.slug, city: city.slug })),
);

export const totalCities = allCities.length;

/** Nearby cities resolved to full records, for lateral internal links. */
export const nearbyCities = (stateSlug: string, citySlug: string) => {
  const city = getCity(stateSlug, citySlug);
  if (!city) return [];
  return allCities.filter((c) => city.nearby.includes(c.slug));
};
