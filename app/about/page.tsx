import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextLink } from '@/components/ui/Button';

import { company } from '@/lib/site';
import { differentiators, historyMilestones, processSteps } from '@/lib/content';
import { services } from '@/lib/services';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'About Childress Painting | Commercial Contractor, DFW',
  description:
    'Childress Painting is a commercial painting and industrial coatings contractor serving Dallas–Fort Worth and Texas, built on family painting experience dating to 1984.',
  path: '/about',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About the company"
        title="A painting trade, run like a commercial subcontractor."
        intro="Childress Painting bids, staffs, and closes out Division 09 work for general contractors, developers, and facility teams across Texas — built on family painting experience dating to 1984."
        crumbs={crumbs}
        meta={[
          { label: 'Entity', value: company.legalName },
          { label: 'Base', value: 'Dallas–Fort Worth' },
          { label: 'Coverage', value: 'Texas statewide' },
          { label: 'Experience since', value: String(company.heritageYear) },
        ]}
      />

      {/* Positioning ------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Who we are</span>
              <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.25rem)] text-navy">
                Painting is the trade. Commercial construction is the business.
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="prose-site lg:pt-3">
              <p className="text-[1.0625rem]">
                Plenty of contractors can paint a wall well. Far fewer can price a Division 09
                package from a drawing set, write a scope letter an estimator can level against
                three other bids, staff a job to a CPM schedule that keeps moving, and turn over a
                closeout package that does not hold up substantial completion.
              </p>
              <p>
                That second set of skills is what general contractors are actually buying, and it
                is what Childress Painting is organised around. The craft came first — four
                decades of family painting experience — and the estimating, scheduling, safety,
                and documentation discipline that commercial work demands was built on top of it.
              </p>
              <p>
                We work as a subcontractor on ground-up construction and renovation, and directly
                with owners, property managers, and facility teams on planned repaint and coatings
                programs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* History ----------------------------------------------------------- */}
      <section className="bg-navy py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            light
            label={`Since ${company.heritageYear}`}
            title="Where the standard came from."
            intro={
              <p>
                Deliberately general. Specific founding details, dates, and named projects are
                added to this page only once the company confirms them — the same standard we
                apply to certifications and safety statistics.
              </p>
            }
          />

          <RevealGroup as="ol" className="mt-14 border-t border-white/12">
            {historyMilestones.map((milestone) => (
              <RevealItem
                as="li"
                key={milestone.period}
                className="grid gap-5 border-b border-white/12 py-9 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12 lg:py-11"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-red">
                  {milestone.period}
                </span>
                <div>
                  <h3 className="text-[clamp(1.375rem,2.6vw,1.875rem)] text-white">
                    {milestone.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed text-steel-light">
                    {milestone.body}
                  </p>
                  {milestone.note && (
                    <p className="mt-4 inline-block border border-white/20 px-3 py-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/60">
                      {milestone.note}
                    </p>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* What we're built for --------------------------------------------- */}
      <section className="bg-mist py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="How we work"
            title="What a general contractor is actually buying."
            intro={
              <p>
                Not a number on a page. A subcontractor who responds, prices what is on the
                drawings, brings the crew that was promised, and does not create work for the
                project team.
              </p>
            }
          />

          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
            {differentiators.map((item, i) => (
              <RevealItem
                key={item.title}
                className="group relative bg-mist p-7 transition-colors hover:bg-white lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full"
                />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[1.375rem] leading-tight text-navy lg:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-body">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process ----------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Process"
            title="From bid invitation to warranty package."
            intro={
              <p>
                Four stages, in order, each producing something you can point to. If a stage has
                no deliverable, it is not a process — it is a promise.
              </p>
            }
          />
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* Credentials honesty ------------------------------------------------ */}
      <section className="bg-mist py-20 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Credentials</span>
              <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] text-navy">
                What is not on this website, and why.
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="prose-site lg:pt-3">
              <p>
                You will not find licence numbers, insurance limits, bonding capacity,
                certifications, safety statistics, awards, or client logos on this site. That is
                deliberate. Those items are checked by real prequalification departments, and
                publishing anything unverified would be worse than publishing nothing.
              </p>
              <p>
                All of it is provided on request, in the form your prequalification process
                requires — certificates of insurance, W-9, references, EMR documentation, and
                safety program materials.
              </p>
              <p>
                <Link href="/contact">Ask us for the prequalification package</Link> and we will
                send what you need.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services cross-link ------------------------------------------------ */}
      <section className="border-t border-line bg-white py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            layout="split"
            label="Capabilities"
            title="What we self-perform."
            action={<TextLink href="/services">All services</TextLink>}
          />

          <RevealGroup as="ul" className="mt-10 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <RevealItem as="li" key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col bg-white p-6 transition-colors hover:bg-mist lg:p-7"
                >
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-navy/60">
                    {service.csi}
                  </span>
                  <span className="mt-3 font-display text-xl font-extrabold uppercase tracking-tight text-navy transition-colors group-hover:text-red">
                    {service.shortTitle}
                  </span>
                  <span className="mt-2 text-[0.875rem] leading-relaxed text-body">
                    {service.kicker}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-auto size-4 pt-6 text-navy/30 transition-transform group-hover:translate-x-1 group-hover:text-red"
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
