import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { featuredTestimonials } from '@/lib/testimonials';

/**
 * TESTIMONIALS
 * ---------------------------------------------------------------------------
 * Six featured quotes on the dark sheet-grid treatment. Reviewer names were
 * supplied by the company; the disclaimer below the grid states that quotes
 * reference projects for the named brands without speaking for them.
 */
export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-red/10 to-transparent"
      />

      <div className="container-site relative">
        <SectionHeading
          light
          label="What Clients Say"
          layout="split"
          title="Judged by the People Who Hire Painters for a Living."
          intro={
            <p>
              Superintendents, construction managers, facility teams — and homeowners who got
              the same crews. Communication, schedule, and clean job sites come up more than
              the paint does. That is the point.
            </p>
          }
        />

        <RevealGroup
          className="mt-10 md:mt-14 grid gap-px bg-white/12 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {featuredTestimonials.map((t) => (
            <RevealItem
              key={t.name}
              className="group relative flex flex-col bg-ink p-7 transition-colors duration-300 hover:bg-ink-800 md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
              />
              <Quote aria-hidden="true" className="size-6 text-red" />
              <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ash">
                {t.quote}
              </blockquote>
              <footer className="mt-6 border-t border-white/12 pt-4">
                <p className="font-display text-h5 font-bold tracking-tight text-white">
                  {t.name}
                </p>
                <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-red-light">
                  {t.role}
                </p>
              </footer>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-9">
          <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-silver">
            Reviews provided by Childress Painting clients. Brand names identify the projects
            involved; reviewers speak for themselves and do not represent the companies named.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
