import type { Metadata } from 'next';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { processSteps } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Our Process | Preconstruction to Closeout in Eight Steps',
  description:
    'How Childress Painting runs a commercial project: preconstruction, scope review, product verification, surface preparation, production, quality control, punch walk, and closeout.',
  alternates: { canonical: '/process' },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        label="Our Process"
        title="Eight Steps. Every Project. No Exceptions."
        intro="A process is only worth publishing if it is the one actually followed. This is ours, and every step has something concrete you receive at the end of it."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Process', href: '/process' },
        ]}
        meta={[
          { label: 'Steps', value: `${processSteps.length}` },
          { label: 'Starts At', value: 'Takeoff & scope review' },
          { label: 'Ends At', value: 'Closeout & warranty' },
          { label: 'Owned By', value: 'A dedicated PM' },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Start at Step One
        </ButtonLink>
      </PageHero>

      {/* =========================================================== INTERACTIVE */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Interactive"
            layout="split"
            title="Select a Step."
            intro={
              <p>
                Use the rail below, or arrow keys once a step has focus. Each panel covers what
                happens and what is delivered.
              </p>
            }
          />

          <Reveal className="mt-10 md:mt-14">
            <ProcessTimeline />
          </Reveal>
        </div>
      </section>

      {/* ============================================================= FULL LIST */}
      <section className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading
            light
            label="The Full Sequence"
            layout="split"
            title="Everything, in Order."
            intro={
              <p>
                The same eight steps whether it is a 3,000 SF restaurant finish-out or a
                district-wide summer program across forty campuses.
              </p>
            }
          />

          <RevealGroup className="mt-12 md:mt-16 space-y-px bg-white/12" stagger={0.05}>
            {processSteps.map((step) => (
              <RevealItem
                key={step.number}
                className="group grid gap-6 bg-ink p-7 transition-colors duration-300 hover:bg-ink-800 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10 md:p-9"
              >
                <span className="font-display text-h2 font-black leading-none text-white/12 transition-colors duration-300 group-hover:text-red/40 md:text-[4rem]">
                  {step.number}
                </span>

                <div>
                  <h2 className="text-h3 text-white">{step.title}</h2>
                  <p className="mt-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-red-light">
                    {step.short}
                  </p>
                  <div className="mt-6 border-l-2 border-red pl-4">
                    <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/50">
                      You receive
                    </p>
                    <p className="mt-1.5 text-[0.875rem] font-medium leading-snug text-white">
                      {step.deliverable}
                    </p>
                  </div>
                </div>

                <p className="leading-relaxed text-ash">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner
        label="Step One"
        title="Send Us the Drawings."
        body="Preconstruction starts the moment we have the plans and the specification sections. Bid or no-bid, you get an answer, with assumptions and exclusions in writing."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Process', href: '/process' },
        ])}
      />
    </>
  );
}
