import { RevealGroup, RevealItem } from './Reveal';

export type ProcessStep = {
  /** Stage name. */
  title: string;
  /** What actually happens, and what the buyer receives. */
  body: string;
  /** The tangible output of the stage — deliverable, document, or approval. */
  output: string;
};

/**
 * Ordered process. The numbering is meaningful here — these stages genuinely
 * run in sequence, and each one produces a deliverable the buyer can point to.
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
      className={[
        'mt-14 grid gap-px md:grid-cols-2 xl:grid-cols-4',
        light ? 'bg-white/12' : 'bg-line',
      ].join(' ')}
    >
      {steps.map((step, i) => (
        <RevealItem
          as="li"
          key={step.title}
          className={[
            'group relative flex flex-col p-7 transition-colors duration-300 lg:p-8',
            light
              ? 'bg-navy hover:bg-navy-800'
              : 'bg-white hover:bg-mist',
          ].join(' ')}
        >
          {/* Red progress tick at the top of each stage. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full"
          />

          <span
            className={[
              'font-mono text-[0.625rem] uppercase tracking-[0.2em]',
              light ? 'text-white/60' : 'text-navy/60',
            ].join(' ')}
          >
            Stage {String(i + 1).padStart(2, '0')}
          </span>

          <h3
            className={[
              'mt-4 text-[1.375rem] leading-tight lg:text-2xl',
              light ? 'text-white' : 'text-navy',
            ].join(' ')}
          >
            {step.title}
          </h3>

          <p
            className={[
              'mt-3.5 text-[0.9375rem] leading-relaxed',
              light ? 'text-steel-light' : 'text-body',
            ].join(' ')}
          >
            {step.body}
          </p>

          <div
            className={[
              'mt-6 border-t pt-4',
              light ? 'border-white/12' : 'border-line',
            ].join(' ')}
          >
            <span
              className={[
                'font-mono text-[0.5625rem] uppercase tracking-[0.18em]',
                light ? 'text-white/60' : 'text-navy/60',
              ].join(' ')}
            >
              You receive
            </span>
            <p
              className={[
                'mt-1.5 text-sm font-medium',
                light ? 'text-white' : 'text-navy',
              ].join(' ')}
            >
              {step.output}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
