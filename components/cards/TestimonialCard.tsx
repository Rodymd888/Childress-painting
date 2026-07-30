/**
 * DEPRECATED — TestimonialCard
 * ===========================================================================
 * Removed in the v3 redesign. The v2 site shipped three placeholder
 * testimonials with fabricated attributions ("Name pending", "reference to be
 * confirmed"). Publishing those on a contractor site that general contractors
 * use for prequalification is a real credibility risk, so they were deleted
 * rather than restyled.
 *
 * TO ADD REAL TESTIMONIALS
 * Do not restore this component. Only publish a quote once the wording, name,
 * title, and company are confirmed in writing by the person quoted — then add
 * a verified list to lib/content.ts and render it with the same card treatment
 * used elsewhere on the site.
 *
 * This stub exists only so a lingering copy from a previous version compiles.
 * Nothing in the live site imports it. SAFE TO DELETE.
 * ===========================================================================
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  organization: string;
  /** Must be true before a quote may be rendered anywhere on the site. */
  verified: boolean;
};

/** @deprecated Renders nothing. See the note above before publishing quotes. */
export function TestimonialCard({ testimonial }: { testimonial?: Testimonial }) {
  if (!testimonial?.verified) return null;

  return (
    <figure className="border border-line bg-white p-7">
      <blockquote className="text-[0.9375rem] leading-relaxed text-body">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <span className="block text-[0.875rem] font-semibold text-ink">{testimonial.name}</span>
        <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink/50">
          {testimonial.title} · {testimonial.organization}
        </span>
      </figcaption>
    </figure>
  );
}
