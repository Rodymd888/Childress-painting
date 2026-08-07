/**
 * CLIENT TESTIMONIALS
 * ---------------------------------------------------------------------------
 * Reviewer names supplied by Childress Painting. Quotes reference projects
 * completed for the named brands; reviewers speak for themselves and do not
 * represent those companies. The disclaimer rendered with this section states
 * that explicitly.
 *
 * `featured` promotes a quote to the homepage band (keep to 6).
 */

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Scott Shaw',
    role: 'General Contractor',
    featured: true,
    quote:
      'We brought Childress in on a Walmart pharmacy remodel that had to run nights behind barricade with the store trading every morning. The sales floor was open and spotless at 6 a.m. every single day, and the punch list at turnover was two items. That is why they are on every bid list I send out.',
  },
  {
    name: 'Darryl Krepel',
    role: 'Commercial General Contractor',
    featured: true,
    quote:
      'Across multiple Take 5 Oil Change builds and a Dollar General program, the result never varied: crews on site the day the schedule said, daily updates without chasing anyone, and finishes that passed the brand walk first time. Reliability like that is rarer than it should be in this trade.',
  },
  {
    name: 'KJ',
    role: 'Project Superintendent',
    featured: true,
    quote:
      'On our CVS remodels the paint scope is the one I stopped worrying about. Childress coordinated directly with my drywall and flooring subs, flagged a finish-schedule conflict before it cost us a week, and their foreman communicated better than half my trades combined.',
  },
  {
    name: 'Eric Carrott',
    role: 'Construction Manager',
    quote:
      'The IKEA scope was exposed structure, dryfall, and a hard opening date. No room for a slow trade. Childress staffed it to the release plan, kept the site organized, and their own quality walk meant our walkthrough was basically a formality.',
  },
  {
    name: 'Cale Townsend',
    role: 'Project Manager',
    featured: true,
    quote:
      "When our Raising Cane's schedule compressed three weeks, Childress added a second shift instead of moving the date and told us what it would cost before we had to ask. The kitchen coatings and dining room finishes both passed inspection first pass. Professional from bid to closeout.",
  },
  {
    name: 'Bob Hawkins',
    role: 'Facilities Manager',
    featured: true,
    quote:
      'Our Georgia-Pacific facility gave them a narrow shutdown window for structural coatings, and they planned the work to the hour, prep verified, containment tight, line back up on schedule. Safety paperwork was complete before we asked for it. They understand what a plant environment demands.',
  },
  {
    name: 'Connor Childress',
    role: 'Development Manager',
    quote:
      'On our Chipotle finish-outs the brand standard is non-negotiable and the opening date even less so. Childress verified the prototype finishes during preconstruction, hit every color and sheen exactly, and both stores opened on the marketing calendar date.',
  },
  {
    name: 'Cole Childress',
    role: 'Repeat Commercial Client',
    quote:
      'From a Texas Roadhouse build to Ross and Burlington rollout work, the pattern is the same: clean job sites, straight answers, and a finish quality you can inspect from two feet away. When they say a date, the date holds.',
  },
  {
    name: 'Donna Adkins',
    role: 'Homeowner',
    featured: true,
    quote:
      'They repainted our whole interior and refinished the kitchen cabinets, and it ran like a professional job site, floors covered, everything back in place each evening, and a sprayed cabinet finish that looks factory-new. You can tell these are commercial crews. Worth every penny.',
  },
];

export const featuredTestimonials = testimonials.filter((t) => t.featured);
