import { Quote, AlertCircle } from 'lucide-react';

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  organization: string;
  /** Only publish once the person quoted has approved the wording. */
  verified: boolean;
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col border border-line bg-white p-7 lg:p-8">
      <Quote aria-hidden="true" className="size-7 shrink-0 text-red" />

      <blockquote className="mt-6 flex-1 text-[1.0625rem] leading-relaxed text-navy">
        {testimonial.verified ? `“${testimonial.quote}”` : testimonial.quote}
      </blockquote>

      <figcaption className="mt-7 border-t border-line pt-5">
        <span className="block text-sm font-semibold text-navy">{testimonial.name}</span>
        <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-body">
          {testimonial.title} · {testimonial.organization}
        </span>
      </figcaption>

      {!testimonial.verified && (
        <p className="mt-5 flex items-start gap-2 bg-mist p-3 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-navy/60">
          <AlertCircle aria-hidden="true" className="mt-px size-3 shrink-0 text-red" />
          Placeholder — not published until the reference approves the wording in writing.
        </p>
      )}
    </figure>
  );
}
