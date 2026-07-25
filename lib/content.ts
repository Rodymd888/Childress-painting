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
    title: 'Preconstruction',
    body: 'We take off the drawings, read the specification for the requirements that actually drive cost, and flag conditions the documents do not cover. Exclusions and assumptions are written down rather than implied.',
    output: 'Priced bid with a written scope letter',
  },
  {
    title: 'Planning and buyout',
    body: 'Product approvals are confirmed against the specification before material is ordered. Manpower is loaded against the construction schedule, and access, containment, and working-hours constraints are agreed before mobilization.',
    output: 'Submittals, mockups, and a manpower plan',
  },
  {
    title: 'Production',
    body: 'Supervision stays on site. Crew size flexes weekly against the look-ahead as areas are released, and quality checks happen before an area is offered for inspection rather than after it fails one.',
    output: 'Weekly progress reporting and pay app backup',
  },
  {
    title: 'Closeout',
    body: 'Punch is tracked by area throughout production instead of collected at the end. Touch-up follows final cleaning, and the turnover package is assembled as the work completes.',
    output: 'Punch sign-off, attic stock, and warranty package',
  },
];

/** Why a general contractor would put Childress on the bid list. */
export const differentiators = [
  {
    title: 'We answer the invitation',
    body: 'Every bid invitation gets a response — including a no-bid. Estimators plan around answers, not silence, and a fast no is worth more than a late maybe.',
  },
  {
    title: 'Scope letters, not assumptions',
    body: 'Our bids state what is included, what is excluded, and what we assumed. It makes bids easy to level and removes the argument that usually shows up in month three.',
  },
  {
    title: 'Manpower matched to the schedule',
    body: 'Production is set by how much area gets released, not by how many painters are on site. We load crews against the look-ahead and adjust as the building opens up.',
  },
  {
    title: 'Built for occupied buildings',
    body: 'Hospitals, schools, plants, and retail centers do not stop operating for paint. Phasing, containment, odor control, and after-hours work are planned in preconstruction, not improvised on site.',
  },
  {
    title: 'One point of contact',
    body: 'You get a person who knows the job, answers the phone, and can make a decision — not a queue. Field issues are resolved the same day wherever they can be.',
  },
  {
    title: 'Documentation that survives review',
    body: 'Product data, color schedules, coating records, and punch sign-offs are assembled as the work proceeds so closeout is a handover rather than a hunt.',
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
