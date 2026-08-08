/**
 * INSIGHTS — long-form content for high-intent search
 * ===========================================================================
 * These are not blog posts in the traffic-farming sense. Each one answers a
 * question a general contractor, developer, or facility manager actually types
 * before awarding painting work, and each links into the services, industries,
 * and projects that back the answer up.
 *
 * RULES
 * - Written from the estimating and field process, not from a keyword list.
 * - One primary keyword theme per article. No two articles compete.
 * - No invented figures. Where a number would be fabricated, describe the
 *   variable instead and tell the reader what it depends on.
 *
 * TO ADD AN ARTICLE: append a record. The index, sitemap, related rails, and
 * structured data all read from here.
 */

export type ArticleSection = {
  heading: string;
  /** Paragraphs. Rendered in order. */
  body: string[];
  /** Optional bulleted list rendered after the paragraphs. */
  points?: string[];
};

export type Article = {
  slug: string;
  title: string;
  /** Primary keyword theme. One per article — used to prevent cannibalization. */
  keyword: string;
  audience: string;
  readMinutes: number;
  published: string;
  publishedISO: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  sections: ArticleSection[];
  faqs?: { question: string; answer: string }[];
  relatedServices: string[];
  relatedIndustries: string[];
};

export const articles: Article[] = [
  {
    slug: 'commercial-painting-cost-dallas',
    keyword: 'commercial painting cost Dallas',
    title: 'What Drives Commercial Painting Cost in Dallas',
    audience: 'For general contractors and owners',
    readMinutes: 7,
    published: 'August 2026',
    publishedISO: '2026-08-01',
    excerpt:
      'Two bids on the same building can differ by a wide margin and both be honest. Here is what actually moves the number, and which line items to compare before you award.',
    metaTitle: 'What Drives Commercial Painting Cost in Dallas | Childress Painting',
    metaDescription:
      'What actually determines commercial painting cost in Dallas: surface preparation, access, coating system, schedule and shift structure, and finish level. How to compare bids fairly.',
    sections: [
      {
        heading: 'Square Footage Is the Least Useful Number',
        body: [
          'Wall area tells you how much coating is needed. It tells you almost nothing about how long the work takes or what it costs, because on nearly every commercial project the coating is a minority of the labor. A 10,000 square foot warehouse with a clean, sound substrate and open floor access will price very differently from 10,000 square feet of occupied corridor with damaged drywall, night-shift restrictions, and furniture to protect.',
          'When a bid comes back significantly lower than the others, the difference is rarely in the paint. It is almost always in what the estimator assumed about preparation, access, and schedule.',
        ],
      },
      {
        heading: 'Surface Preparation Is the Real Variable',
        body: [
          'Preparation is where honest bids separate. A wall that needs washing, patching, texture matching, and spot priming carries several times the labor of a wall that needs a scuff sand. On exteriors the range is wider still: chalking, mildew, efflorescence, and failed sealant all have to be dealt with before a coating goes on, and none of them are visible on a drawing.',
          'This is why we price preparation as its own line rather than folding it into a square-foot rate. It stays visible, and if a budget has to come down, reducing scope becomes a decision somebody makes rather than something that quietly disappears from the proposal.',
        ],
        points: [
          'Substrate condition and the repair scope it implies',
          'Existing coating adhesion and whether it can be recoated at all',
          'Drywall finish level versus the lighting the wall sits under',
          'Sealant joint condition on any exterior scope',
          'Slab moisture and profile before any resinous floor',
        ],
      },
      {
        heading: 'Access Costs More Than People Expect',
        body: [
          'Reaching the surface is frequently the largest single cost on exterior and high-bay work. Lift type, ground conditions, tie-off points, rack clearance, pedestrian protection, and street permits all change productivity before a single gallon is opened. A tilt-wall elevation reachable from a boom lift on level ground is a different job from the same elevation over landscaping, parking, and an active entrance.',
          'Downtown Dallas adds its own layer: dock windows, freight elevator reservations, and lift permits govern the day more than production rates do. We plan access at bid, because a lift that cannot reach the wall is a week lost and nobody budgeted for it.',
        ],
      },
      {
        heading: 'Schedule and Shift Structure',
        body: [
          'Painting sits behind drywall and ahead of flooring, casework, and equipment, so it absorbs every delay upstream. When a schedule compresses, the options are more people, more shifts, or a later date. Two of those cost money.',
          'Occupied work is priced on the shift structure agreed at bid: nights, weekends, phased zones, daily return to service. Those are real costs and they belong in the proposal rather than showing up later as a change order. If a bid does not state its assumed shift structure, that is the first question to ask.',
        ],
      },
      {
        heading: 'Coating System and Service Conditions',
        body: [
          'A high-performance system costs more per gallon and considerably more in preparation, and on the right substrate it is the cheaper decision over the life of the building. A commercial kitchen floor, a washdown wall, a structural steel member, and a corridor in an office all want different chemistry. Specifying against the actual service condition rather than a catalog default is what keeps a coating from failing in year two.',
          'Where a specification is ambiguous, we confirm the assembly with the manufacturer before pricing it. A product correct for a warehouse and wrong for a wash bay looks identical on a submittal.',
        ],
      },
      {
        heading: 'How to Compare Bids Fairly',
        body: [
          'Bids are only comparable when they are bidding the same work. Before you award, line them up against the same questions and see which ones actually answer.',
        ],
        points: [
          'What preparation is included, stated as scope rather than as a rate?',
          'What shift structure is assumed, and what happens if the schedule compresses?',
          'What access method is carried, and who supplies it?',
          'Which coating system, by manufacturer and product, on which substrate?',
          'What is excluded? An honest exclusions list is a sign of a careful estimator.',
          'What does closeout include: attic stock, color schedule, warranty documentation?',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why do commercial painting bids vary so much?',
        answer:
          'Almost always because of differing assumptions about surface preparation, access, and shift structure rather than the coating itself. Two estimators looking at the same wall can reach very different conclusions about what has to happen before it is coated.',
      },
      {
        question: 'Should I take the lowest commercial painting bid?',
        answer:
          'Only once you have confirmed it covers the same scope as the others. A lower number that assumes less preparation, day-shift access, or a different coating system is not a better price, it is a different job.',
      },
    ],
    relatedServices: ['commercial-painting', 'exterior-painting', 'protective-coatings'],
    relatedIndustries: ['retail', 'office', 'industrial'],
  },

  {
    slug: 'painting-an-occupied-retail-store',
    keyword: 'painting an occupied retail store',
    title: 'How to Repaint an Occupied Retail Store Without Closing',
    audience: 'For property managers and facility teams',
    readMinutes: 6,
    published: 'August 2026',
    publishedISO: '2026-08-01',
    excerpt:
      'Closing a store to repaint it costs more than the paint ever will. The work can run around trading hours, but only if the phasing, odor, and dust are planned before the first can is opened.',
    metaTitle: 'Painting an Occupied Retail Store Without Closing | Childress Painting',
    metaDescription:
      'How commercial painters repaint occupied retail stores without closing: night shifts, barricaded phasing, low-odor coatings, dust control, and daily return to sales-floor condition.',
    sections: [
      {
        heading: 'Lost Trading Days Dwarf the Paint',
        body: [
          'For most retail and grocery operators, a day of lost sales is worth more than the entire painting contract. That single fact should drive how the work is planned. The question is never whether the store can close, it is how the work fits around a store that will not.',
          'Nearly all of it can. Night shifts, zoned phasing, and barricaded work areas let a repaint run through a trading week. What makes it work is agreeing the plan before mobilization rather than negotiating it nightly with a store manager who has a floor to open.',
        ],
      },
      {
        heading: 'Zone the Store Before Anything Opens',
        body: [
          'Before any material arrives, the store gets divided into zones with a defined start, finish, and return-to-service time. That plan is what lets a manager keep aisles merchantable, plan staff, and know which fixtures move on which night.',
          'Each zone is barricaded, protected, worked, cleaned, and released. Nothing spans two nights unless the schedule says so and the store has agreed to it.',
        ],
        points: [
          'Sales floor split into zones matched to aisle and department layout',
          'Fixture and stock protection agreed with the store, not improvised',
          'Entrances, checkouts, and emergency routes kept clear at all times',
          'A stated return-to-service time for every zone, every night',
        ],
      },
      {
        heading: 'Odor Is a Complaint Before It Is a Finish Problem',
        body: [
          'In an occupied building, odor generates the first call. Low-VOC systems are specified during preconstruction for exactly that reason, not substituted after a customer complains. Ventilation, containment, and product selection are worked out together, because a low-odor product applied in a sealed space still produces a problem.',
          'Where a specified product cannot be substituted, the answer is scheduling: the highest-odor scope runs on the longest closed window the store has.',
        ],
      },
      {
        heading: 'Dust Travels Further Than Paint',
        body: [
          'Sanding drywall repairs generates more disruption in an occupied store than the coating ever will. Dust settles on stock, gets into refrigeration, and shows up in departments nowhere near the work. Containment and vacuum-assisted sanding are cheaper than a merchandising problem.',
          'The same applies to the floor. Protecting it properly costs a fraction of what cleaning a coating off polished concrete or replacing damaged tile costs.',
        ],
      },
      {
        heading: 'The Standard Is How the Store Looks at Opening',
        body: [
          'Retail repaint work is judged at six in the morning, not at the end of the job. Every night ends with the zone cleaned, protection removed or made presentable, aisles clear, and nothing left that a customer would notice.',
          'That is the single thing store operations remembers about a painting contractor, and it is why this kind of work turns into a program rather than a one-off.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a store stay open while it is being repainted?',
        answer:
          'Yes, in most cases. Work runs at night or outside trading hours in barricaded zones, with each zone returned to sales-floor condition before opening. The phasing plan is agreed with store operations before mobilization.',
      },
      {
        question: 'How is paint odor handled in an occupied store?',
        answer:
          'By specifying low-VOC systems during preconstruction rather than substituting after a complaint, and by combining product selection with containment and ventilation. The heaviest-odor scope is scheduled into the longest closed window available.',
      },
    ],
    relatedServices: ['maintenance-painting', 'commercial-painting', 'interior-painting', 'drywall-repair'],
    relatedIndustries: ['retail', 'restaurants', 'healthcare'],
  },

  {
    slug: 'commercial-painting-scope-checklist',
    keyword: 'commercial painting scope checklist',
    title: 'A Division 09 Scope Checklist for General Contractors',
    audience: 'For general contractors and estimators',
    readMinutes: 8,
    published: 'August 2026',
    publishedISO: '2026-08-01',
    excerpt:
      'Most painting disputes are scope gaps that were visible at bid. This is the checklist we work through before pricing, and the questions worth asking every bidder.',
    metaTitle: 'Commercial Painting Scope Checklist for General Contractors | Childress Painting',
    metaDescription:
      'A Division 09 painting scope checklist for general contractors: substrate acceptance, finish levels, exclusions, access, shift structure, submittals, mockups, and closeout requirements.',
    sections: [
      {
        heading: 'Scope Gaps Are Cheaper to Find at Bid',
        body: [
          'Nearly every argument about painting scope was findable before award. Who paints the hollow metal frames. Whether the exposed structure is in the drywall package or ours. Which side of the demising wall belongs to which tenant. These are five-minute conversations in preconstruction and week-long problems in the field.',
          'What follows is the list we work through before pricing. Any bidder should be able to answer all of it.',
        ],
      },
      {
        heading: 'Substrate and Finish Level',
        body: [
          'The drywall finish level and the lighting design have to be looked at together. A Level 4 wall under critical raking light will telegraph joints regardless of what is applied over it, and the paint gets blamed for a drywall specification.',
        ],
        points: [
          'Specified drywall finish level, checked against the lighting design',
          'Who accepts the substrate, and what happens when it is not ready',
          'Whether existing coatings can be recoated or need removal',
          'Concrete slab moisture, pH, and profile before any resinous floor',
          'Shop-primed steel: what arrives primed, what needs field priming',
        ],
      },
      {
        heading: 'The Boundaries Nobody Writes Down',
        body: [
          'Most scope gaps live at the edge of somebody else\'s package. Settle them in writing before award.',
        ],
        points: [
          'Hollow metal doors and frames: shop finish or field finish',
          'Exposed structure and deck: dryfall in the painting package or not',
          'Mechanical, electrical, and plumbing equipment: what gets painted',
          'Casework and millwork: shop finished or field finished',
          'Existing versus new surfaces on a renovation, marked on a drawing',
          'Touch-up after other trades: whose scope, and at whose cost',
        ],
      },
      {
        heading: 'Access, Schedule, and Shifts',
        body: [
          'Access is priced, so it has to be defined. Who supplies lifts, what the ground conditions are, whether scaffold is shared, and what hours the site allows all change the number.',
        ],
        points: [
          'Who furnishes access equipment, and is it shared with other trades',
          'Site working hours and any noise or odor restrictions',
          'Assumed shift structure, and the cost basis if the schedule compresses',
          'Area release sequence, and whether it matches the paint sequence',
          'Prevailing wage or certified payroll requirements',
        ],
      },
      {
        heading: 'Submittals, Mockups, and Closeout',
        body: [
          'Submittals should be off the critical path. Product data, color schedules, and control samples get submitted early so approval is never the thing holding up production.',
          'A mockup approved on the wall is a defined standard everyone has already seen. A finish described in an email is an argument waiting to happen.',
        ],
        points: [
          'Submittal and approval turnaround built into the schedule',
          'Which surfaces require an approved mockup before production',
          'Attic stock quantity and where it is delivered',
          'Approved color schedule documented for future touch-ups',
          'Workmanship warranty term and what it covers',
        ],
      },
      {
        heading: 'Questions Worth Asking Every Bidder',
        body: [
          'The answers tell you more about how the job will run than the number on the front page.',
        ],
        points: [
          'What have you excluded, and why?',
          'What are you assuming about substrate condition?',
          'How will you handle it if drywall hands over late?',
          'Who is my point of contact once the job starts?',
          'Do you run your own quality walk before my walkthrough?',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is usually excluded from a commercial painting bid?',
        answer:
          'Commonly: shop-finished items, mechanical and electrical equipment, dryfall on exposed structure where it sits in another package, substrate repair beyond a stated allowance, and touch-up caused by other trades after final coat. A clear exclusions list is a sign of a careful estimator, not a hedge.',
      },
      {
        question: 'Who is responsible when the drywall finish level is wrong for the lighting?',
        answer:
          'It is a specification conflict rather than a painting defect, which is why it should be raised in preconstruction. We check the specified finish level against the lighting design and flag mismatches in writing before anyone is standing in a finished room disputing ownership.',
      },
    ],
    relatedServices: ['commercial-painting', 'interior-painting', 'drywall-repair'],
    relatedIndustries: ['new-construction', 'tenant-improvements', 'office'],
  },

  {
    slug: 'best-coatings-for-warehouses-in-texas',
    keyword: 'warehouse coatings Texas',
    title: 'Choosing Coatings for Texas Warehouses and Distribution Buildings',
    audience: 'For developers and facility managers',
    readMinutes: 7,
    published: 'August 2026',
    publishedISO: '2026-08-01',
    excerpt:
      'Heat, humidity swings, and forklift traffic decide what survives in a Texas distribution building. The specification questions that matter are about service conditions, not brand.',
    metaTitle: 'Best Coatings for Warehouses in Texas | Childress Painting',
    metaDescription:
      'How to specify coatings for Texas warehouses and distribution centers: dryfall on exposed structure, resinous floors over tested slabs, structural steel systems, and safety striping.',
    sections: [
      {
        heading: 'Specify Against the Service Condition',
        body: [
          'The useful question is never which coating is best. It is what this surface has to survive: forklift traffic, washdown, thermal cycling, UV, chemical contact, or impact. Answer that and the product list narrows quickly.',
          'In a Texas distribution building the dominant conditions are heat, large interior temperature swings, and wheel traffic. Those rule out more products than most specifications acknowledge.',
        ],
      },
      {
        heading: 'Exposed Structure and Dryfall Timing',
        body: [
          'Dryfall over exposed deck, joists, and structure is the single most schedule-sensitive item in a warehouse shell. It goes up before mechanical, electrical, and plumbing close in. Miss that window and the same scope becomes a slow, expensive detail job worked around finished systems.',
          'On a fast-track shell this is worth protecting in the schedule even at the cost of resequencing something else.',
        ],
      },
      {
        heading: 'Floors Fail at the Slab, Not the Coating',
        body: [
          'Resinous floors fail for one reason far more often than any other: they were installed over a slab that was never tested. Moisture vapor lifts an expensive system exactly as easily as a cheap one.',
          'Profile, moisture, and pH get verified before anything is mixed, and the results go in writing. Sometimes those results say the slab needs mitigation first, and that is a much better conversation to have before installation than after a delamination.',
        ],
        points: [
          'Mechanical profiling to the specified CSP, not acid etching',
          'Moisture vapor and relative humidity testing before installation',
          'System matched to wheel load: drive aisles differ from storage bays',
          'Cure and return-to-service times stated honestly in the proposal',
        ],
      },
      {
        heading: 'Structural Steel in a Conditioned Shell',
        body: [
          'Most interior structural steel in a distribution building needs a rust-inhibitive primer and a durable topcoat, and little more. Where the building takes washdown, houses chemicals, or runs a cold chain, the requirement changes and so does the chemistry.',
          'Surface preparation drives performance here more than the product does. The SSPC standard should be agreed in writing at bid and the substrate documented before coating.',
        ],
      },
      {
        heading: 'Striping Is a Safety System',
        body: [
          'Aisle marking, hazard striping, walkway definition, and dock marking get inspected as safety controls. They belong in the coatings scope rather than sitting in a gap between trades, and they need a traffic-rated product that survives wheel contact rather than a wall paint applied to a floor.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does an epoxy warehouse floor take to return to service?',
        answer:
          'It depends on the system. Foot traffic is typically possible within a day and wheel traffic later, with washdown later still. The proposal should state the return-to-service time for the specific product, and fast-cure systems are available where downtime is expensive.',
      },
      {
        question: 'Does exposed structure have to be painted before MEP is installed?',
        answer:
          'It should be. Coating exposed deck and structure after mechanical, electrical, and plumbing close in turns a spray application into a detail job, which costs more and takes considerably longer.',
      },
    ],
    relatedServices: ['industrial-painting', 'epoxy-floor-coatings', 'protective-coatings', 'line-striping'],
    relatedIndustries: ['industrial', 'new-construction'],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articleSlugs = articles.map((a) => a.slug);
