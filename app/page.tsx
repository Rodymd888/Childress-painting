import Link from 'next/link';
import { ShieldCheck, ClipboardCheck, Building2, Wrench, ArrowRight } from 'lucide-react';

import { Hero } from '@/components/home/Hero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { TextLink, ButtonLink } from '@/components/ui/Button';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { MarketCard } from '@/components/cards/MarketCard';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { JsonLd } from '@/components/ui/JsonLd';

import { services } from '@/lib/services';
import { markets } from '@/lib/markets';
import { featuredProjects } from '@/lib/projects';
import { company, testimonials } from '@/lib/site';
import {
  processSteps,
  differentiators,
  safetyCommitments,
  qualityPractices,
  historyMilestones,
  credibilityPoints,
} from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Commercial Painting Contractor | Dallas–Fort Worth & Texas',
  description:
    'Childress Painting delivers commercial painting, industrial coatings, new construction packages, and facility repaint programs across Dallas–Fort Worth and Texas. Request a bid.',
  path: '/',
});

const homeFaqs = [
  {
    question: 'What areas does Childress Painting serve?',
    answer:
      'We are based in Dallas–Fort Worth and work across the metroplex — Dallas, Fort Worth, Plano, Frisco, Arlington, Irving, McKinney, Denton, and the surrounding counties — and travel statewide in Texas for projects and repaint programs that justify it.',
  },
  {
    question: 'Do you work directly for owners or only as a subcontractor?',
    answer:
      'Both. On new construction we normally work as a subcontractor to the general contractor. On repaint and maintenance programs we contract directly with owners, property managers, and facility teams.',
  },
  {
    question: 'How do I invite Childress Painting to bid?',
    answer:
      'Use the request-a-bid form or email estimating directly. Send the drawings, the relevant specification sections, all addenda, and the bid due date. We confirm receipt and tell you whether we are bidding.',
  },
  {
    question: 'Can you work nights and weekends?',
    answer:
      'Yes. Occupied buildings — hospitals, schools, retail centers, terminals, and operating plants — routinely require night, weekend, or shutdown scheduling. Tell us the available working hours when you request pricing so the estimate reflects the real productive time.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Commercial credibility strip ──────────────────────────────── */}
      <section className="border-b border-line bg-mist">
        <div className="container-site py-10 md:py-12">
          <RevealGroup className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
            <RevealItem>
              <p className="font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.18em] text-navy/60">
                Built for commercial
                <br />
                construction buyers
              </p>
            </RevealItem>

            <RevealItem>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
                {credibilityPoints.map((point) => (
                  <div key={point.label} className="border-l-2 border-red pl-4">
                    <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-navy/60">
                      {point.label}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] font-semibold leading-snug text-navy">
                      {point.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ── Positioning ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Positioning</span>
              <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] text-navy">
                The finish is the last thing anyone sees — and the first thing they judge.
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="lg:pt-3">
              <div className="prose-site text-[1.0625rem]">
                <p>
                  By the time a painting contractor mobilizes, the schedule has usually already
                  been spent. Areas release late, other trades run long, and the turnover date has
                  not moved. What separates contractors at that point is not brush technique — it
                  is estimating that held up, manpower that matched the plan, and paperwork that
                  did not become the reason substantial completion slipped.
                </p>
                <p>
                  Childress Painting is built around that reality. We price from the documents,
                  write down what we included, staff to the sequence the job actually runs on, and
                  close out area by area so the punch list is short when the owner walks it.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
                <TextLink href="/about">About Childress</TextLink>
                <TextLink href="/safety-quality">Safety &amp; quality</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Core services ─────────────────────────────────────────────── */}
      <section className="bg-navy py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            light
            label="Capabilities"
            title="Four scopes. One accountable contractor."
            intro={
              <p>
                We self-perform commercial painting and industrial coatings, take on complete
                Division 09 packages on ground-up construction, and run planned repaint programs
                for owners between capital cycles.
              </p>
            }
            action={<TextLink href="/services" light>All services</TextLink>}
          />

          <RevealGroup className="mt-14 grid gap-px bg-white/12 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <RevealItem key={service.slug}>
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Markets served ────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Markets"
            title="Every sector has a constraint that decides the schedule."
            intro={
              <p>
                An infection control barrier, a badging queue, the first day of class, a plant
                that never shuts down. The coating is rarely the hard part — knowing what governs
                the job before you price it is.
              </p>
            }
            action={<TextLink href="/markets">All markets</TextLink>}
          />

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market) => (
              <RevealItem key={market.slug}>
                <MarketCard market={market} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Why Childress ─────────────────────────────────────────────── */}
      <section className="bg-mist py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Why Childress"
            title="What a general contractor is actually buying."
            intro={
              <p>
                Not a price on a page. A subcontractor who responds to the invitation, prices what
                is on the drawings, shows up with the crew that was promised, and does not create
                work for the project team.
              </p>
            }
          />

          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
            {differentiators.map((item, i) => (
              <RevealItem
                key={item.title}
                className="group relative bg-mist p-7 transition-colors duration-300 hover:bg-white lg:p-8"
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

      {/* ── Featured projects ─────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Selected work"
            title="Scope profiles from the kind of work we bid."
            intro={
              <p>
                Every record below is a{' '}
                <strong className="font-semibold text-navy">sample layout</strong> shown so the
                project pages can be reviewed before real photography and verified project
                details are supplied. They are not presented as completed Childress projects.
              </p>
            }
            action={<TextLink href="/projects">All projects</TextLink>}
          />

          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {featuredProjects.map((project) => (
              <RevealItem key={project.slug}>
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Safety and quality ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-20 md:py-24 lg:py-28">
        <div className="sheet-grid absolute inset-0" aria-hidden="true" />

        <div className="container-site relative">
          <SectionHeading
            layout="split"
            light
            label="Safety & quality"
            title="Two systems, run the same way on every job."
            intro={
              <p>
                We publish practices rather than statistics. Incident rates, EMR, and
                certifications belong on this site only once they are verified and current — so
                what follows is how the work is actually run.
              </p>
            }
            action={<TextLink href="/safety-quality" light>Safety &amp; quality</TextLink>}
          />

          <div className="mt-14 grid gap-px bg-white/12 lg:grid-cols-2">
            {[
              { icon: ShieldCheck, title: 'Safety', items: safetyCommitments.slice(0, 3) },
              { icon: ClipboardCheck, title: 'Quality control', items: qualityPractices.slice(0, 3) },
            ].map((column) => (
              <Reveal key={column.title} className="bg-navy p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <column.icon aria-hidden="true" className="size-5 text-red" />
                  <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white">
                    {column.title}
                  </h3>
                </div>

                <ul className="mt-8 space-y-7">
                  {column.items.map((item) => (
                    <li key={item.title} className="border-t border-white/12 pt-6">
                      <h4 className="text-lg text-white">{item.title}</h4>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-steel-light">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project process ───────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Process"
            title="From bid invitation to warranty package."
            intro={
              <p>
                These four stages run in order on every project, and each one produces something
                you can point to. If a stage has no deliverable, it is not a process — it is a
                promise.
              </p>
            }
          />
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* ── Company history ───────────────────────────────────────────── */}
      <section className="bg-mist py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Since {company.heritageYear}</span>
              <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] text-navy">
                Four decades of painting experience behind a commercial contractor.
              </h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-body">
                Childress Painting is a commercial contractor built on family painting experience
                that dates to {company.heritageYear}. The trade came first; the estimating,
                scheduling, and documentation that commercial construction demands were built on
                top of it.
              </p>
              <div className="mt-9">
                <ButtonLink href="/about" variant="dark" withArrow>
                  Read the full story
                </ButtonLink>
              </div>
            </Reveal>

            <RevealGroup as="ol" className="space-y-px bg-line">
              {historyMilestones.map((milestone) => (
                <RevealItem as="li" key={milestone.period} className="bg-mist py-7 first:pt-0">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    {milestone.period}
                  </span>
                  <h3 className="mt-3 text-[1.375rem] leading-tight text-navy lg:text-2xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                    {milestone.body}
                  </p>
                  {milestone.note && (
                    <p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-navy/60">
                      {/* Placeholder marker — remove once the detail is confirmed. */}
                      {milestone.note}
                    </p>
                  )}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="References"
            title="References, once they are approved in writing."
            intro={
              <p>
                We would rather show three placeholders than one invented quote. Each card below
                is a slot waiting on a real reference — the person quoted approves the wording
                before anything is published.
              </p>
            }
          />

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <RevealItem key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Quick paths ───────────────────────────────────────────────── */}
      <section className="border-t border-line bg-mist py-16 md:py-20">
        <div className="container-site">
          <RevealGroup className="grid gap-px bg-line md:grid-cols-3">
            {[
              {
                icon: Building2,
                title: 'Invite us to bid',
                body: 'Send plans, specs, and a due date. You get a bid or a no-bid — never silence.',
                href: '/request-bid',
                cta: 'Request a bid',
              },
              {
                icon: Wrench,
                title: 'Work with us',
                body: 'Subcontractors and suppliers can submit for prequalification any time.',
                href: '/subcontractors',
                cta: 'Subcontractor prequalification',
              },
              {
                icon: ClipboardCheck,
                title: 'Join the crew',
                body: 'Painters, applicators, foremen, and office staff — field experience counts most.',
                href: '/careers',
                cta: 'Careers',
              },
            ].map((item) => (
              <RevealItem key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col bg-mist p-8 transition-colors hover:bg-white"
                >
                  <item.icon aria-hidden="true" className="size-6 text-red" />
                  <h3 className="mt-6 text-[1.375rem] leading-tight text-navy">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{item.body}</p>
                  <span className="mt-auto flex items-center gap-2 pt-7 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy transition-colors group-hover:text-red">
                    {item.cta}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner />

      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
