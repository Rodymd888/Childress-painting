/**
 * SHARED EDITORIAL CONTENT
 * ---------------------------------------------------------------------------
 * Process steps, differentiators, values, and the company timeline. Anything
 * used on more than one page lives here so it stays consistent.
 */

/** The eight-step process from the capability statement. */
export const processSteps = [
  {
    number: '01',
    title: 'Preconstruction',
    short: 'Takeoff, budget, and schedule position',
    body: 'We read the drawings and the specification before we price them. Takeoff, finish schedule review, access assessment, and an honest read on where painting sits in the schedule — including whether the duration being assumed is realistic.',
    deliverable: 'Scoped proposal with assumptions and exclusions stated in writing',
  },
  {
    number: '02',
    title: 'Scope Review',
    short: 'Agreeing what is and is not included',
    body: 'Scope gaps cause more disputes than any finish issue. We walk the scope line with the general contractor before award — which surfaces, which side of the demising wall, whose doors, whose ceilings — and put the answer in the contract rather than discovering it during construction.',
    deliverable: 'Written scope matrix with clarifications and exclusions',
  },
  {
    number: '03',
    title: 'Product Verification',
    short: 'Submittals, colors, and mockups',
    body: 'Product data, color schedules, and control samples are submitted early so approval is not on the critical path. Where a corporate prototype or brand standard governs, the schedule is verified against the brand book and substitutions flagged in writing before material is ordered.',
    deliverable: 'Approved submittal package and control mockup',
  },
  {
    number: '04',
    title: 'Surface Preparation',
    short: 'The step that determines service life',
    body: 'Cleaning, profiling, moisture and adhesion testing where warranted, substrate repair, and priming to the manufacturer specification. Preparation is priced as its own line item so it is visible — and so a budget reduction is a decision rather than something that quietly happens.',
    deliverable: 'Substrate accepted and documented before coating',
  },
  {
    number: '05',
    title: 'Production',
    short: 'Manpower against the release sequence',
    body: 'Crews are staffed against the area release sequence rather than an ideal duration, with a dedicated project manager from mobilization through closeout. Where the schedule compresses, we add shifts and say what that requires — rather than accepting a date we cannot hit.',
    deliverable: 'Daily progress reporting and manpower to the committed sequence',
  },
  {
    number: '06',
    title: 'Quality Control',
    short: 'Our inspection before yours',
    body: 'We run our own quality-control inspection ahead of the general contractor\'s walkthrough. Coverage, sheen uniformity, cut lines, and adjacent-surface condition are checked and corrected before anyone else is asked to look at the work.',
    deliverable: 'Internal QC walk completed and corrections closed',
  },
  {
    number: '07',
    title: 'Punch Walk',
    short: 'A short list, closed fast',
    body: 'Because the internal walk happened first, the punch list handed over is short. Items are corrected on a committed turnaround rather than trickling in behind the rest of the trades, which is what usually delays a certificate of occupancy.',
    deliverable: 'Punch list received, corrected, and signed off',
  },
  {
    number: '08',
    title: 'Project Closeout',
    short: 'Documentation delivered, not chased',
    body: 'Attic stock, the approved color schedule, product data, and the two-year workmanship warranty are delivered as a package at turnover. Warranty support continues after closeout — a call in year two gets the same response as a call during construction.',
    deliverable: 'Closeout package, attic stock, and written warranty',
  },
] as const;

/** Why general contractors choose Childress — from the capability statement. */
export const differentiators = [
  {
    title: 'Reliable Scheduling',
    body: 'We show up when the schedule says we will. When something upstream moves us, the superintendent hears it from us before it becomes a delay.',
    icon: 'calendar',
  },
  {
    title: 'Daily Jobsite Communication',
    body: 'Progress, manpower, and obstacles reported daily. No superintendent should have to walk the building to find out whether the paint crew showed up.',
    icon: 'radio',
  },
  {
    title: 'Responsive Project Management',
    body: 'A dedicated project manager from preconstruction through closeout — one point of contact who knows the job and answers the phone.',
    icon: 'user',
  },
  {
    title: 'Quality Control Inspections',
    body: 'We inspect our own work before the GC walkthrough. Coverage, sheen, cut lines, and adjacent surfaces corrected before anyone is asked to look.',
    icon: 'check',
  },
  {
    title: 'Clean & Organized Job Sites',
    body: 'We leave a site cleaner than other trades expect from a paint crew. Floors protected, material staged, corridors and exits clear.',
    icon: 'broom',
  },
  {
    title: 'Fast Punch List Completion',
    body: 'Because our own walk happened first, the list is short. Items are closed on a committed turnaround rather than trailing the other trades.',
    icon: 'list',
  },
  {
    title: 'Coordination With Other Trades',
    body: 'We coordinate directly with drywall, flooring, and finish carpentry — fewer conversations routed through the superintendent, fewer conflicts on the floor.',
    icon: 'link',
  },
  {
    title: 'Warranty Support After Closeout',
    body: 'A written two-year workmanship warranty, backed by Sherwin-Williams coating systems. A call in year two gets a real response.',
    icon: 'shield',
  },
] as const;

/** "Why Childress" credential grid. */
export const credentials = [
  { value: '40+', label: 'Years Experience', body: 'Commercial painting leadership dating to 1984.' },
  { value: '1984', label: 'Since', body: 'Four decades of continuous commercial work.' },
  { value: '100%', label: 'Commercial Only', body: 'No residential distractions, no learning curve.' },
  { value: '3', label: 'States Served', body: 'Texas primary; Kansas and Missouri secondary.' },
  { value: '2yr', label: 'Workmanship Warranty', body: 'Written, on every project, in addition to material warranties.' },
  { value: '24/7', label: 'Shift Capability', body: 'Day, night, and occupied-site shifts.' },
] as const;

/** Company timeline. Kept deliberately factual. */
export const timeline = [
  {
    year: '1984',
    title: 'The trade begins',
    body: 'Childress Painting starts commercial work with a simple operating premise: make the superintendent\'s job easier. Show up on schedule, communicate problems before they become delays, and leave the site cleaner than a paint crew is expected to.',
  },
  {
    year: '1990s–2000s',
    title: 'National retail and restaurant work',
    body: 'The company builds a base in national chain retail and restaurant construction — prototype-standard finishes, hard opening dates, and multi-site rollouts where the same result has to be repeated store after store.',
  },
  {
    year: '2010s',
    title: 'Institutional and district programs',
    body: 'District-level school painting programs, healthcare facilities, municipal buildings, and stadium work broaden the portfolio into sectors where documentation, phasing, and inspection matter as much as the finish.',
  },
  {
    year: 'Today',
    title: 'Dallas–Fort Worth and beyond',
    body: 'Operating from Dallas as Childress Painting DFW LLC, serving Texas as the primary market with continued Kansas and Missouri coverage — commercial work only, across twelve market sectors.',
  },
] as const;

/** Company values. */
export const values = [
  {
    title: 'Commercial only',
    body: 'No residential distractions. No learning curve on prevailing wage, multi-trade sequencing, or what a general contractor actually needs from a subcontractor.',
  },
  {
    title: 'Say it early',
    body: 'A problem raised in week two is a scheduling conversation. The same problem raised at the punch walk is a delay claim. We would rather deliver bad news early than manage a surprise late.',
  },
  {
    title: 'Preparation over product',
    body: 'Most coating failures are preparation failures. We price preparation as its own line so it stays visible, and we say when a substrate is not ready rather than coating over it.',
  },
  {
    title: 'Inspect our own work first',
    body: 'The quality-control walk happens before the general contractor\'s, not after. That is the difference between a short punch list and a long one.',
  },
] as const;

/** Capability snapshot — mirrors the capability statement table. */
export const capabilitySnapshot = [
  { label: 'Markets Served', value: 'Retail, Restaurant, Healthcare, Government, Industrial, Education' },
  { label: 'Project Types', value: 'New Construction, Tenant Finish-Out, Occupied Renovation' },
  { label: 'Service Area', value: 'Texas (primary) · Kansas, Missouri (secondary)' },
  { label: 'Coating Systems', value: 'Sherwin-Williams' },
  { label: 'Scheduling', value: 'Day, night & occupied-site shifts' },
  { label: 'Commercial Experience', value: '40+ years — since 1984' },
  { label: 'Warranty', value: '2-year workmanship warranty' },
  { label: 'Safety', value: 'OSHA-compliant crews' },
] as const;

/** Safety practices. Deliberately describes conduct, not unverified metrics. */
export const safetyCommitments = [
  {
    title: 'OSHA-compliant crews',
    body: 'Crews work to OSHA standards for the task and the environment — fall protection, respiratory protection, ladder and lift operation, and hazard communication. Training records are available on request for prequalification.',
  },
  {
    title: 'Site-specific planning',
    body: 'Before mobilization we review the general contractor\'s site safety plan and identify what our scope adds to it: lift operation, solvent storage, spray containment, and confined or elevated work.',
  },
  {
    title: 'Access and fall protection',
    body: 'Lift type, tie-off points, ground conditions, and pedestrian protection are planned at bid rather than improvised on site. Most exterior schedule surprises trace back to access that was never properly planned.',
  },
  {
    title: 'Material handling and storage',
    body: 'Coatings, solvents, and rags are stored and disposed of per the safety data sheet and local requirements. SDS documentation is kept on site and provided with submittals.',
  },
  {
    title: 'Containment and air quality',
    body: 'Where work happens near occupants, containment and ventilation are agreed with the facility before the first day. Low-VOC systems are specified in preconstruction, not substituted after a complaint.',
  },
  {
    title: 'Housekeeping as a safety control',
    body: 'Clear corridors, protected floors, and staged material are safety measures before they are a courtesy. A clean paint area is a jobsite with fewer trip hazards for every other trade.',
  },
] as const;

/** Quality control practices. */
export const qualityPractices = [
  {
    title: 'Mockups before production',
    body: 'A control sample is approved before production begins, so the standard being applied is one everybody has already seen and signed off on.',
  },
  {
    title: 'Substrate acceptance',
    body: 'We inspect and accept the substrate before coating. Where a surface is not ready — moisture, contamination, an unfinished drywall level — we raise it in writing rather than coating over it.',
  },
  {
    title: 'In-process checks',
    body: 'Coverage, film build, sheen uniformity, and cut lines are checked during production, area by area, rather than discovered at the end.',
  },
  {
    title: 'Our walk before yours',
    body: 'We run our own quality-control inspection ahead of the general contractor\'s walkthrough, and correct what we find first. This is the single largest reason our punch lists are short.',
  },
  {
    title: 'Progressive punch',
    body: 'Areas are punched as they are released rather than all at the end, so the final list is a formality instead of a fire drill.',
  },
  {
    title: 'Documented closeout',
    body: 'Attic stock, approved color schedule, product data, and the written two-year workmanship warranty are delivered as a package at turnover.',
  },
] as const;
