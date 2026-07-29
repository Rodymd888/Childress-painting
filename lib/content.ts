/**
 * SHARED EDITORIAL CONTENT
 * ---------------------------------------------------------------------------
 * Copy that appears on more than one page. Editing it here updates every
 * placement. Nothing in this file asserts a certification, award, statistic,
 * or client name — those require verification before they go on the site.
 */

import type { ProcessStep } from '@/components/ui/ProcessTimeline';

/** The four stages of a project, in order, each with a real deliverable. */
export const processSteps: ProcessStep[] = [
  {
    title: 'Consultation',
    body: 'We walk the building or read the documents, and we ask the questions that decide the price — working hours, occupancy, access, and what the specification leaves open. Most of what makes a job hard is visible at this stage if anyone looks.',
    output: 'Site review and scope clarification',
  },
  {
    title: 'Estimating',
    body: 'Takeoff from the drawings rather than a square-foot rule, read against the specification for the requirements that actually drive cost. Exclusions and assumptions get written down instead of implied.',
    output: 'Priced bid with a written scope letter',
  },
  {
    title: 'Scheduling',
    body: 'Manpower is loaded against the construction schedule, product approvals are confirmed before material is ordered, and access, containment, and working hours are agreed before anyone mobilizes.',
    output: 'Submittals, mockups, and a manpower plan',
  },
  {
    title: 'Surface preparation',
    body: 'Substrates are inspected, washed, profiled, patched, and sealed as the condition requires. Coating failures are almost always preparation failures, so this stage is where the service life of the job is decided.',
    output: 'Prepared substrate, documented and accepted',
  },
  {
    title: 'Painting & coatings',
    body: 'Supervision stays on site. Crew size flexes weekly against the look-ahead as areas release, conditions are monitored on systems that are sensitive to them, and quality checks happen before an area is offered rather than after it fails.',
    output: 'Weekly progress reporting and pay app backup',
  },
  {
    title: 'Final walkthrough',
    body: 'Punch is tracked by area throughout production rather than collected at the end. Touch-up follows final cleaning, and the turnover package is assembled as the work completes rather than hunted for afterwards.',
    output: 'Punch sign-off, attic stock, and warranty package',
  },
];

/** Why a general contractor would put Childress on the bid list. */
export const differentiators = [
  {
    title: 'Painting experience since 1984',
    body: 'The family trade dates to 1984. Four decades of knowing what a surface does before you coat it is the reason the estimating and the field work hold up.',
    metric: 'Since 1984',
  },
  {
    title: 'Commercial specialists',
    body: 'No residential division competing for our crews. Everything we estimate, staff, and schedule is built around commercial and industrial work and the people who buy it.',
    metric: 'Commercial only',
  },
  {
    title: 'An experienced field team',
    body: 'Supervision that has run occupied hospitals, live terminals, and operating plants. Field questions get answered on site the same day instead of waiting on a callback.',
    metric: 'Supervised on site',
  },
  {
    title: 'Reliable scheduling',
    body: 'Production is set by how much area is released, not by how many painters are on site. We load crews against the look-ahead and say something early when a predecessor slips.',
    metric: 'Loaded to the look-ahead',
  },
  {
    title: 'Quality control that pre-empts punch',
    body: 'A supervisor walks each area before it is offered for inspection, so the first walk with the general contractor is a confirmation rather than a discovery exercise.',
    metric: 'Walked before offered',
  },
  {
    title: 'Safety as a planning input',
    body: 'Site-specific hazard planning before mobilization, daily task review in the field, and stop-work authority for every crew member without being second-guessed.',
    metric: 'Planned, then reviewed daily',
  },
  {
    title: 'Professional communication',
    body: 'Every bid invitation gets an answer, including a no-bid. You get one point of contact who knows the job and can make a decision, not a queue.',
    metric: 'Bid or no-bid, always',
  },
];

/** Safety commitments — practices, not statistics. */
export const safetyCommitments = [
  {
    title: 'Site-specific planning',
    body: 'Before mobilizing, we review the site hazards that actually apply: access and fall exposure, confined spaces, hot work, chemical handling, lift operation, and how our work interacts with the trades around us.',
  },
  {
    title: 'Daily hazard review',
    body: 'Crews start the day with a task-specific review covering what is being done, what could go wrong, and what controls are in place. When the task changes, the review happens again.',
  },
  {
    title: 'Coatings-specific exposure control',
    body: 'Ventilation, respiratory protection, and product handling are matched to the system being applied. Safety data sheets are on site and the crew knows what is in the container.',
  },
  {
    title: 'Access equipment discipline',
    body: 'Lifts, scaffold, and ladders are inspected before use and operated by trained personnel. Fall protection is used where it is required, without exception.',
  },
  {
    title: 'Housekeeping as a control',
    body: 'Material is stored where it was agreed, walkways and exits stay clear, and the work area is cleaned at the end of every shift. Most site incidents start as a housekeeping problem.',
  },
  {
    title: 'Stop-work authority',
    body: 'Any crew member can stop work over an unsafe condition without being second-guessed. Nothing on a paint schedule is worth an injury.',
  },
];

/** Quality control practice. */
export const qualityPractices = [
  {
    title: 'Agree the standard first',
    body: 'On design-critical finishes we recommend an approved mockup before production. Agreeing the standard in week one is cheaper than arguing about it in the final month.',
  },
  {
    title: 'Verify the substrate',
    body: 'Drywall finish level, moisture content, profile, and cleanliness are checked before coating. A coating installed over an unsuitable substrate fails no matter how good the product is.',
  },
  {
    title: 'Control the conditions',
    body: 'Temperature, humidity, dew point, and recoat windows are monitored on systems that are sensitive to them, and production holds when conditions fall outside the manufacturer’s range.',
  },
  {
    title: 'Inspect before offering',
    body: 'A supervisor walks each area before it is offered for inspection, so the first walk with the general contractor is a confirmation rather than a discovery exercise.',
  },
  {
    title: 'Track punch by area',
    body: 'Punch items are logged, assigned, and closed by area as production moves through the building instead of accumulating into one list at the end.',
  },
  {
    title: 'Turn over a usable record',
    body: 'Color schedules, product data, coating records, and attic stock are handed over as a package so the owner can maintain the finishes without guesswork.',
  },
];

/**
 * COMPANY HISTORY
 * ⚠️ Every entry below is deliberately general. Add specific milestones,
 * founding details, and named projects only after the company confirms them.
 */
export const historyMilestones = [
  {
    period: '1984',
    title: 'The trade, learned on the job',
    body: 'The family’s painting experience dates to 1984 — work learned on real sites, under supervisors who expected the surface to be prepared before anything was applied to it. That standard is the reason the company exists in its current form.',
  },
  {
    period: 'The commercial shift',
    title: 'From finish work to Division 09 packages',
    body: 'The work moved from individual finishes toward full commercial packages: reading specifications, pricing from drawings, coordinating with superintendents, and carrying a scope through submittals and closeout. That is a different discipline from painting well, and it is the one general contractors actually buy.',
    /* REPLACE — add the year this transition happened once confirmed. */
    note: 'Add the specific years and milestones once confirmed by the company.',
  },
  {
    period: 'Today',
    title: 'Childress Painting DFW',
    body: 'Childress Painting works across Dallas–Fort Worth and the wider Texas market on commercial construction, industrial coatings, and planned repaint programs — as a subcontractor to general contractors and directly for owners and facility teams.',
  },
];

/** Credibility strip on the homepage — capability facts, not claims. */
export const credibilityPoints = [
  { label: 'Delivery', value: 'GC subcontract and direct-to-owner' },
  { label: 'Coverage', value: 'DFW base, Texas statewide' },
  { label: 'Scope', value: 'Division 09 paint and coatings' },
  { label: 'Scheduling', value: 'Day, night, weekend, and shutdown' },
];
