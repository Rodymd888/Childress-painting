import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  Radio,
  UserCheck,
  CheckCircle2,
  Sparkles,
  ListChecks,
  Link2,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

import { Hero } from '@/components/home/Hero';
import { TrustedBy } from '@/components/home/TrustedBy';
import { StatsBand } from '@/components/home/StatsBand';
import { Testimonials } from '@/components/home/Testimonials';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { WorkInMotion } from '@/components/home/WorkInMotion';
import { ClientBrands } from '@/components/home/ClientBrands';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { IndustryCard } from '@/components/cards/IndustryCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { TextLink, ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { featuredServices } from '@/lib/services';
import { industries } from '@/lib/industries';
import { projectCountByIndustry } from '@/lib/projects';
import { differentiators, capabilitySnapshot } from '@/lib/content';
import { educationDistricts, totalSchools } from '@/lib/clients';
import { company } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Commercial, Industrial & Residential Painting Contractor | Since 1984',
  description:
    'Childress Painting is a commercial painting contractor serving Texas since 1984, with residential and industrial painting alongside. Retail, restaurant, healthcare, education, and government work for general contractors. Two-year workmanship warranty.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Childress Painting | Commercial Painting Specialists Since 1984',
    description:
      'Commercial painting and coatings for general contractors, developers, and facility teams across Texas.',
    url: '/',
  },
};

const ICONS: Record<string, typeof CalendarCheck> = {
  calendar: CalendarCheck,
  radio: Radio,
  user: UserCheck,
  check: CheckCircle2,
  broom: Sparkles,
  list: ListChecks,
  link: Link2,
  shield: ShieldCheck,
};

export default function HomePage() {
  const homeIndustries = industries.slice(0, 6);

  return (
    <>
      <Hero />
      <TrustedBy />

      {/* ================================================= POSITIONING STATEMENT */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-ink/60">Who We Are</span>
              <h2 className="mt-6 text-h2 text-ink">
                A Dependable Subcontractor,
                <br />
                <span className="text-red">by Design.</span>
              </h2>

              <div className="mt-10 border-l-2 border-red pl-6">
                <p className="font-display text-h3 font-bold leading-snug tracking-tight text-ink">
                  &ldquo;Make the superintendent&rsquo;s job easier.&rdquo;
                </p>
                <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                  The operating premise since 1984
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="prose-site">
              <p className="text-lead leading-relaxed text-ink/80">
                Since {company.heritageYear}, Childress Painting has built its reputation on a
                simple premise: show up when the schedule says we will, communicate problems
                before they become delays, and leave a jobsite cleaner than other trades expect
                from a paint crew.
              </p>
              <p>
                We coordinate directly with drywall, flooring, and finish-carpentry crews to
                sequence around live construction and occupied spaces. We run our own
                quality-control inspections ahead of the general contractor&rsquo;s walkthrough,
                and staff every project with a dedicated project manager from preconstruction
                through closeout. The result is fewer punch list items, faster sign-off, and a
                Sherwin-Williams coating system backed by a two-year workmanship warranty.
              </p>
              <p>
                Commercial construction is the core of the business, and the discipline it
                demands carries into everything else we paint, from industrial plants to
                residential projects. No learning curve on prevailing wage or multi-trade
                sequencing; just a crew that has done this across retail, restaurant,
                healthcare, government, industrial, and education work for four decades.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/about" variant="dark" withArrow>
                  About Childress
                </ButtonLink>
                <ButtonLink href="/why-childress" variant="outline">
                  Why General Contractors Choose Us
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* ============================================================== SERVICES */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Commercial Capabilities"
            layout="split"
            title={
              <>
                Sixteen Services.
                <br className="hidden sm:block" /> One Contractor.
              </>
            }
            intro={
              <p>
                Commercial, residential, and industrial painting, plus the coatings, floors,
                and preparation trades that surround them, priced, staffed, and closed out by
                the same team.
              </p>
            }
            action={<TextLink href="/services">All Services</TextLink>}
          />

          <RevealGroup className="mt-10 md:mt-14 grid gap-px bg-line md:grid-cols-2" stagger={0.06}>
            {featuredServices.map((service, i) => (
              <RevealItem key={service.slug}>
                <ServiceCard service={service} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WorkInMotion />

      {/* ============================================================ INDUSTRIES */}
      <section className="section bg-mist">
        <div className="container-site">
          <SectionHeading
            label="Markets We Serve"
            layout="split"
            title={`${industries.length} Sectors, Each With Its Own Constraint.`}
            intro={
              <p>
                The coating rarely changes. What changes is what governs the schedule, infection control in a hospital, an opening date in retail, a dark night in a
                stadium, badging at an airport. We plan for the constraint, not just the scope.
              </p>
            }
            action={<TextLink href="/industries">All Industries</TextLink>}
          />

          <RevealGroup className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {homeIndustries.map((industry, i) => (
              <RevealItem key={industry.slug}>
                <IndustryCard
                  industry={industry}
                  projectCount={projectCountByIndustry[industry.slug]}
                  priority={i < 3}
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <ButtonLink href="/industries" variant="dark" withArrow>
              View All {industries.length} Sectors
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* =============================================================== PROCESS */}
      <section className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading
            label="Our Process"
            light
            layout="split"
            title="Eight Steps From Drawings to Closeout."
            intro={
              <p>
                Every project runs the same sequence, and every step has something you receive
                at the end of it. Select a step to see what it covers.
              </p>
            }
          />

          <Reveal className="mt-10 md:mt-14">
            <ProcessTimeline variant="dark" />
          </Reveal>

          <Reveal className="mt-10">
            <ButtonLink href="/process" variant="outlineLight" withArrow>
              The full process
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= WHY CHILDRESS */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Why General Contractors Choose Childress"
            layout="split"
            title="What You Are Actually Buying."
            intro={
              <p>
                A paint subcontractor is not bought on price alone. It is bought on whether the
                crew shows up, whether problems arrive early or late, and how long the punch
                list is. These are the eight things superintendents tell us matter.
              </p>
            }
          />

          <RevealGroup
            className="mt-10 md:mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.05}
          >
            {differentiators.map((item) => {
              const Icon = ICONS[item.icon] ?? CheckCircle2;
              return (
                <RevealItem
                  key={item.title}
                  className="group relative bg-white p-6 transition-colors duration-300 hover:bg-mist md:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <Icon aria-hidden="true" className="size-6 text-red" />
                  <h3 className="mt-5 font-display text-h5 font-bold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-body">{item.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <ClientBrands />

      <Testimonials />

      <FeaturedWork />

      {/* ===================================================== EDUCATION SPOTLIGHT */}
      <section className="relative overflow-hidden bg-ink-900 py-20 md:py-24">
        <div className="hatch absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red/10 to-transparent"
        />

        <div className="container-site relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-20">
            <Reveal>
              <span className="title-block text-white/60">Education Partners</span>
              <h2 className="mt-6 text-h2 text-white">
                {totalSchools} schools.
                <br />
                <span className="text-red">One summer window.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lead leading-relaxed text-ash">
                District-level painting partnerships across two Kansas City-area school
                districts, elementary, middle, and high school campuses, all delivered between
                the last day of class and staff return.
              </p>
              <div className="mt-9">
                <ButtonLink href="/clients#education" variant="primary" withArrow>
                  See the Campus List
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-px bg-white/12 sm:grid-cols-2">
                {educationDistricts.map((district) => {
                  const count = district.levels.reduce((s, l) => s + l.schools.length, 0);
                  return (
                    <div key={district.name} className="bg-ink-900 p-7 md:p-8">
                      <GraduationCap aria-hidden="true" className="size-6 text-red" />
                      <h3 className="mt-5 font-display text-h4 font-bold leading-tight tracking-tight text-white">
                        {district.name}
                      </h3>
                      <p className="mt-4 font-display text-h2 font-black leading-none text-white">
                        {count}
                      </p>
                      <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/50">
                        Campuses
                      </p>
                      <ul className="mt-5 space-y-1.5 border-t border-white/12 pt-4">
                        {district.levels.map((level) => (
                          <li
                            key={level.label}
                            className="flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash"
                          >
                            <span>{level.label}</span>
                            <span className="text-white">{level.schools.length}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================== CAPABILITY SNAPSHOT */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Capability Snapshot"
            layout="split"
            title="The Facts a Prequalification Form Asks For."
            intro={
              <p>
                Everything below is verifiable. Send us your prequalification packet and we
                will return it completed, with certificates of insurance and references.
              </p>
            }
            action={<TextLink href="/request-bid">Start a Bid Request</TextLink>}
          />

          <RevealGroup
            className="mt-10 md:mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.04}
          >
            {capabilitySnapshot.map((item) => (
              <RevealItem key={item.label} className="bg-white p-6 md:p-7">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                  {item.label}
                </dt>
                <dd className="mt-3 text-[0.9375rem] font-semibold leading-snug text-ink">
                  {item.value}
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <p className="max-w-2xl text-sm leading-relaxed text-body">
              Based in {company.address.city}, {company.address.region}. Primary service area is
              Texas, with continued coverage in Kansas and Missouri.{' '}
              <Link href="/service-areas" className="text-red-dark underline underline-offset-4">
                See the Full Service Area
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />

      <JsonLd data={breadcrumbSchema([{ name: 'Home', href: '/' }])} />
    </>
  );
}
