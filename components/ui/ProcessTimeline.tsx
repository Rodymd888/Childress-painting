import { RevealGroup, RevealItem } from './Reveal';

export type ProcessStep = {
  title: string;
  body: string;
  /** The tangible output of the stage — a document, approval, or deliverable. */
  output: string;
};

/**
 * PROCESS TIMELINE — v2
 * A connected sequence rather than a row of detached tiles. The numbers earn
 * their place here because these stages genuinely run in order, and the
 * connector line makes that order visible instead of implied.
 *
 * Layout: a vertical spine on mobile (where a 6-across grid would be unusable)
 * that becomes a horizontal track from `lg` up.
 */
export function ProcessTimeline({
  steps,
  light = false,
}: {
  steps: ProcessStep[];
  light?: boolean;
}) {
  return (
    <RevealGroup
      as="ol"
      stagger={0.07}
      className="mt-14 grid gap-y-10 md:grid-cols-2 md:gap-x-8 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-14"
    >
      {steps.map((step, i) => (
        <RevealItem as="li" key={step.title} className="group relative">
          {/* Connector: runs to the next card, hidden on the last of each row. */}
          <span
            aria-hidden="true"
            className={[
              'absolute left-0 top-[1.375rem] hidden h-px w-full md:block',
              light ? 'bg-white/15' : 'bg-line',
              i % 2 === 1 ? 'md:hidden xl:block' : '',
              i % 3 === 2 ? 'xl:hidden' : '',
              i === steps.length - 1 ? 'md:hidden xl:hidden' : '',
            ].join(' ')}
          />

          {/* Stage marker sits on the connector line. */}
          <div className="relative flex items-center gap-4">
            <span
              className={[
                'relative z-10 flex size-11 shrink-0 items-center justify-center border font-mono text-xs font-semibold transition-colors duration-300',
                light
                  ? 'border-white/25 bg-navy text-white group-hover:border-red group-hover:bg-red'
                  : 'border-line bg-white text-navy group-hover:border-red group-hover:bg-red group-hover:text-white',
              ].join(' ')}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <h3
              className={[
                'text-[1.25rem] leading-tight lg:text-[1.4375rem]',
                light ? 'text-white' : 'text-navy',
              ].join(' ')}
            >
              {step.title}
            </h3>
          </div>

          <div className="mt-5 pl-0 md:pl-15">
            <p
              className={[
                'text-[0.9375rem] leading-relaxed',
                light ? 'text-steel-light' : 'text-body',
              ].join(' ')}
            >
              {step.body}
            </p>

            <div
              className={[
                'mt-5 border-l-2 pl-4 transition-colors duration-300',
                light
                  ? 'border-white/20 group-hover:border-red'
                  : 'border-line group-hover:border-red',
              ].join(' ')}
            >
              <span
                className={[
                  'block font-mono text-[0.5625rem] uppercase tracking-[0.18em]',
                  light ? 'text-white/60' : 'text-navy/60',
                ].join(' ')}
              >
                You receive
              </span>
              <p
                className={[
                  'mt-1 text-sm font-semibold',
                  light ? 'text-white' : 'text-navy',
                ].join(' ')}
              >
                {step.output}
              </p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
