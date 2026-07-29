import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { differentiators } from '@/lib/content';

/**
 * WHY CHOOSE US
 * Each item leads with a short mono "metric" line — not an invented statistic,
 * but a plain statement of the commitment. It gives the eye something to scan
 * in a section that would otherwise be seven paragraphs of similar length.
 *
 * The first card spans two columns so the grid does not read as a uniform slab.
 */
export function WhyChoose() {
  return (
    <section className="section relative overflow-hidden bg-navy">
      <div className="sheet-grid absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 size-[32rem] rounded-full bg-red/10 blur-3xl"
      />

      <div className="container-site relative">
        <SectionHeading
          layout="split"
          light
          label="Why Childress"
          title="What a general contractor is actually buying."
          intro={
            <p>
              Not a number on a page. A subcontractor who answers the invitation, prices what is
              on the drawings, brings the crew that was promised, and does not create work for
              the project team.
            </p>
          }
        />

        <RevealGroup
          stagger={0.06}
          className="mt-14 grid gap-px bg-white/12 md:grid-cols-2 xl:grid-cols-3"
        >
          {differentiators.map((item, i) => (
            <RevealItem
              key={item.title}
              className={[
                'sweep group relative flex flex-col bg-navy p-7 transition-colors duration-500 hover:bg-navy-800 lg:p-9',
                i === 0 ? 'xl:col-span-2' : '',
              ].join(' ')}
            >
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                {item.metric}
              </span>

              <h3
                className={[
                  'mt-4 leading-tight text-white',
                  i === 0 ? 'text-h3' : 'text-[1.375rem] lg:text-2xl',
                ].join(' ')}
              >
                {item.title}
              </h3>

              <p
                className={[
                  'mt-3.5 leading-relaxed text-steel-light',
                  i === 0 ? 'max-w-2xl text-base' : 'text-[0.9375rem]',
                ].join(' ')}
              >
                {item.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
