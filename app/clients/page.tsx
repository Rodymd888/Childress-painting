import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import {
  clientGroups,
  educationDistricts,
  additionalEducationPartners,
  totalClients,
  totalSchools,
} from '@/lib/clients';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Representative Clients | Commercial Painting Experience',
  description:
    'Representative commercial painting clients by industry, retail, restaurants, healthcare, sports and entertainment, government, and industrial, plus district-level school painting partnerships.',
  alternates: { canonical: '/clients' },
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        label="Representative Clients"
        title="Who We Have Painted For."
        intro="Representative commercial project experience of the Childress Painting leadership team, organised by industry. Company names identify project experience only; no endorsement or affiliation is implied."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Clients', href: '/clients' },
        ]}
        meta={[
          { label: 'Named Clients', value: `${totalClients}` },
          { label: 'Industry Groups', value: `${clientGroups.length}` },
          { label: 'School Campuses', value: `${totalSchools}` },
          { label: 'School Districts', value: `${educationDistricts.length}` },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
        <ButtonLink href="#education" variant="outlineLight" size="lg">
          Education Partners
        </ButtonLink>
      </PageHero>

      {/* ============================================================== BY GROUP */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="By Industry"
            layout="split"
            title="Commercial Clients Across Six Groups."
            intro={
              <p>
                Retail and restaurant rollouts make up the largest share of the record, with
                healthcare, government, sports, and industrial work alongside them.
              </p>
            }
          />

          <div className="mt-12 md:mt-16 space-y-20">
            {clientGroups.map((group) => (
              <Reveal key={group.slug} as="section" aria-labelledby={`group-${group.slug}`}>
                <div className="grid gap-8 border-t-2 border-ink pt-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
                  <div>
                    <h2
                      id={`group-${group.slug}`}
                      className="text-h2 text-ink"
                    >
                      {group.title}
                    </h2>
                    <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                      {group.clients.length} clients
                    </p>
                    <p className="mt-5 max-w-md leading-relaxed text-body">{group.blurb}</p>

                    {group.industry && (
                      <Link
                        href={`/industries/${group.industry}`}
                        className="group mt-7 inline-flex items-center gap-2 border-b-2 border-red pb-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
                      >
                        {group.title} sector page
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    )}
                  </div>

                  <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2">
                    {group.clients.map((client) => (
                      <li
                        key={client.name}
                        className="group bg-white px-5 py-3.5 transition-colors duration-300 hover:bg-mist"
                      >
                        <span className="font-display text-h5 font-bold tracking-tight text-ink">
                          {client.name}
                        </span>
                        {client.note && (
                          <span className="ml-2 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink/45">
                            {client.note}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= EDUCATION */}
      <section
        id="education"
        className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28"
      >
        <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red/10 to-transparent"
        />

        <div className="container-site relative">
          <SectionHeading
            light
            label="Education Partners"
            layout="split"
            title={`${totalSchools} Campuses Across Two Districts.`}
            intro={
              <p>
                District-level painting partnerships across two Kansas City-area school
                districts — every campus delivered inside the summer window between the last
                day of class and staff return.
              </p>
            }
          />

          <div className="mt-12 md:mt-16 space-y-16">
            {educationDistricts.map((district) => {
              const count = district.levels.reduce((s, l) => s + l.schools.length, 0);
              return (
                <Reveal key={district.name}>
                  <div className="border-t border-white/20 pt-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <h3 className="flex items-center gap-3 text-h3 text-white">
                        <GraduationCap aria-hidden="true" className="size-6 shrink-0 text-red" />
                        {district.name}
                      </h3>
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-red-light">
                        {count} campuses
                      </span>
                    </div>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-10">
                      {district.levels.map((level) => (
                        <div key={level.label}>
                          <div className="flex items-baseline justify-between border-b border-white/20 pb-2.5">
                            <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white">
                              {level.label}
                            </h4>
                            <span className="font-mono text-[0.625rem] text-white/45">
                              {level.schools.length}
                            </span>
                          </div>
                          <ul className="mt-4 space-y-1.5">
                            {level.schools.map((school) => (
                              <li
                                key={school}
                                className="text-[0.875rem] leading-snug text-ash transition-colors hover:text-white"
                              >
                                {school}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10 md:mt-14 border-t border-white/20 pt-8">
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-red">Additional Education Partners</h3>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
              {additionalEducationPartners.map((partner) => (
                <li
                  key={partner}
                  className="border border-white/20 px-4 py-2 text-[0.875rem] text-white"
                >
                  {partner}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <ButtonLink href="/industries/education" variant="primary" withArrow>
              Education sector capabilities
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ DISCLAIMER */}
      <section className="section-sm bg-mist">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl">
            <span className="title-block text-ink/55">About This List</span>
            <div className="prose-site mt-6">
              <p>
                The names above represent commercial project experience of the Childress
                Painting leadership team, drawn from our qualifications record. Company and
                brand names are used descriptively to identify that experience. No endorsement,
                sponsorship, or ongoing affiliation is implied, and no third-party trademarks or
                logos are reproduced on this site.
              </p>
              <p>
                For project-specific references, dates, or contact details in support of a
                prequalification, contact us directly and we will provide them.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="dark" withArrow>
                Request References
              </ButtonLink>
              <ButtonLink href="/projects" variant="outline">
                Project Portfolio
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Clients', href: '/clients' },
        ])}
      />
    </>
  );
}
