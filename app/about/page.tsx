import type { Metadata } from 'next';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { JsonLd } from '@/components/ui/JsonLd';

import { timeline, values, capabilitySnapshot } from '@/lib/content';
import { company, leadership, companyStats } from '@/lib/site';
import { totalClients, totalSchools } from '@/lib/clients';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About Childress Painting | Commercial Painting Since 1984',
  description:
    'Childress Painting has performed professional painting work since 1984 — commercial construction at the core, with residential and industrial services alongside. Meet the leadership team.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Childress"
        title="Four Decades of Professional Painting."
        intro="Since 1984, one operating premise: make the superintendent's job easier. Show up when the schedule says we will, communicate problems before they become delays, and leave the site cleaner than a paint crew is expected to."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ]}
        meta={companyStats.map((s) => ({ label: s.label, value: s.value }))}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a bid
        </ButtonLink>
        <ButtonLink href="/why-childress" variant="outlineLight" size="lg">
          Why choose Childress
        </ButtonLink>
      </PageHero>

      {/* ================================================================ STORY */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-ink/60">The company</span>
              <h2 className="mt-6 text-h2 text-ink">
                A Dependable Subcontractor,
                <br />
                <span className="text-red">by Design.</span>
              </h2>

              <div className="prose-site mt-8">
                <p className="text-lead leading-relaxed text-ink/80">
                  Childress Painting is a professional painting contractor based in{' '}
                  {company.address.city}, {company.address.region}. We work for general
                  contractors, developers, property groups, facility teams, and homeowners —
                  with commercial construction as the core of the business.
                </p>
                <p>
                  That foundation matters more than it sounds. Habits formed on commercial
                  jobsites — prevailing wage, submittals, multi-trade sequencing, and what a
                  superintendent needs on a Tuesday morning — carry into every residential and
                  industrial project we take on. The discipline does not switch off.
                </p>
                <p>
                  We coordinate directly with drywall, flooring, and finish-carpentry crews to
                  sequence around live construction and occupied spaces. We run our own
                  quality-control inspections ahead of the general contractor&rsquo;s
                  walkthrough. We staff every project with a dedicated project manager from
                  preconstruction through closeout. The result is fewer punch list items, faster
                  sign-off, and a Sherwin-Williams coating system backed by a two-year
                  workmanship warranty.
                </p>
                <p>
                  Across four decades that work has covered national retail and restaurant
                  rollouts, district-wide school programs, stadiums, surgery centers, industrial
                  plants, airport terminals, and public safety facilities — {totalClients}{' '}
                  representative clients and {totalSchools} school campuses on the record.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/clients" variant="dark" withArrow>
                  Representative clients
                </ButtonLink>
                <ButtonLink href="/projects" variant="outline">
                  Project portfolio
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.1} from="right">
              <div className="lg:sticky lg:top-28">
                <MediaFrame
                  art="construction"
                  label="Childress Painting commercial work"
                  ratio="tall"
                  overlay={false}
                  priority
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
                <div className="mt-8 border-l-2 border-red pl-6">
                  <p className="font-display text-[1.375rem] font-bold leading-snug tracking-tight text-ink">
                    &ldquo;Built around the construction schedule.&rdquo;
                  </p>
                  <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                    Since {company.heritageYear}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================= TIMELINE */}
      <section className="relative overflow-hidden bg-ink py-20 md:py-24 lg:py-28">
        <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading
            light
            label="Company timeline"
            layout="split"
            title="How the Record Was Built."
            intro={
              <p>
                Not a marketing history — the actual arc of the work, from a family trade to a
                multi-sector painting contractor.
              </p>
            }
          />

          <RevealGroup className="mt-16 grid gap-px bg-white/12 lg:grid-cols-4" stagger={0.08}>
            {timeline.map((entry) => (
              <RevealItem
                key={entry.year}
                className="group relative bg-ink p-7 transition-colors duration-300 hover:bg-ink-800 md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="block font-display text-[1.75rem] font-black leading-none text-red">
                  {entry.year}
                </span>
                <h3 className="mt-5 font-display text-[1.125rem] font-bold leading-tight tracking-tight text-white">
                  {entry.title}
                </h3>
                <p className="mt-3.5 text-[0.875rem] leading-relaxed text-ash">{entry.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* =========================================================== LEADERSHIP */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Leadership"
            layout="split"
            title="Who You Will Actually Deal With."
            intro={
              <p>
                A small leadership team means the person who prices your job is reachable
                during it. No account layer between the estimator and the field.
              </p>
            }
          />

          <RevealGroup
            className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3"
            stagger={0.07}
          >
            {leadership.map((person) => (
              <RevealItem
                key={person.name}
                className="group relative bg-white p-7 transition-colors duration-300 hover:bg-mist md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
                <h3 className="text-h4 text-ink">{person.name}</h3>
                <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                  {person.role}
                </p>
                <p className="mt-5 leading-relaxed text-body">{person.focus}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* =============================================================== VALUES */}
      <section className="section bg-mist">
        <div className="container-site">
          <SectionHeading
            label="How we operate"
            layout="split"
            title="Four Things We Will Not Trade Away."
            intro={
              <p>
                These are the positions that occasionally cost us a job. We hold them anyway,
                because the alternative costs the client more later.
              </p>
            }
            action={<TextLink href="/why-childress">Why general contractors choose us</TextLink>}
          />

          <RevealGroup className="mt-14 grid gap-px bg-line sm:grid-cols-2" stagger={0.06}>
            {values.map((value, i) => (
              <RevealItem key={value.title} className="bg-white p-7 md:p-9">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-h4 text-ink">{value.title}</h3>
                <p className="mt-4 leading-relaxed text-body">{value.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* =================================================== CAPABILITY SNAPSHOT */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Capability snapshot"
            title="The Short Version, for a Prequal Form."
          />

          <RevealGroup
            className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
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
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ])}
      />
    </>
  );
}
