import { Quote, Clock } from 'lucide-react';

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  organization: string;
  /** Only publish once the person quoted has approved the wording. */
  verified: boolean;
};

/**
 * TESTIMONIAL CARD — v2
 * The previous version rendered unapproved references with a red warning box,
 * which made the homepage look broken. A reference that has not cleared review
 * is not an error state — so an unverified card now reads as a reserved slot:
 * quiet, deliberate, and clearly not pretending to be a quote.
 *
 * Set `verified: true` in lib/site.ts and the card switches to the published
 * treatment automatically.
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial.verified) {
    return (
      <figure className="lift flex h-full flex-col border border-dashed border-line bg-mist/60 p-7 lg:p-8">
        <Clock aria-hidden="true" className="size-6 shrink-0 text-navy/60" />
        <p className="mt-6 flex-1 text-[0.9375rem] leading-relaxed text-body">
          {testimonial.quote}
        </p>
        <figcaption className="mt-7 border-t border-line pt-5">
          <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-navy/60">
            Reserved · {testimonial.title}
          </span>
          <span className="mt-1.5 block text-sm text-body">{testimonial.organization}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="lift group relative flex h-full flex-col overflow-hidden border border-line bg-white p-7 lg:p-8">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
      <Quote aria-hidden="true" className="size-7 shrink-0 text-red" />

      <blockquote className="mt-6 flex-1 text-[1.0625rem] leading-relaxed text-navy">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-7 border-t border-line pt-5">
        <span className="block text-sm font-semibold text-navy">{testimonial.name}</span>
        <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-body">
          {testimonial.title} · {testimonial.organization}
        </span>
      </figcaption>
    </figure>
  );
}
