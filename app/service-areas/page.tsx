import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Building2, ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { serviceAreas, offices, company } from '@/lib/site';
import { industries } from '@/lib/industries';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Service Areas | Texas, Kansas & Missouri Commercial Painting',
  description:
    'Childress Painting serves Dallas–Fort Worth and statewide Texas from our Dallas headquarters, with Kansas and Missouri coverage from our Grandview, MO office.',
  alternates: { canonical: '/service-areas' },
};

export default function ServiceAreasPage() {
  const cityCount = serviceAreas.reduce((sum, area) => sum + area.cities.length, 0);

  return (
    <>
      <PageHero
        label="Coverage"
        title="Two Offices. Three States."
        intro="Texas is the primary market, worked from our Dallas headquarters. Kansas and Missouri are served from Grandview. The base for four decades of Kansas City-area retail, restaurant, school district, and stadium work."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Service Areas', href: '/service-areas' },
        ]}
        meta={[
          { label: 'Offices', value: `${offices.length}` },
          { label: 'States Served', value: '3' },
          { label: 'Metro Areas Listed', value: `${cityCount}` },
          { label: 'Travel Crews', value: 'Multi-site programs' },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
        <ButtonLink href="/contact" variant="outlineLight" size="lg">
          Contact an Office
        </ButtonLink>
      </PageHero>

      {/* ============================================================== OFFICES */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Our Offices"
            layout="split"
            title="Where the Crews Are Based."
            intro={
              <p>
                Both offices run the same process, the same coating systems, and the same
                one-year workmanship warranty. Call whichever is closer to the job.
              </p>
            }
          />

          <RevealGroup className="mt-10 md:mt-14 grid gap-px border border-line bg-line md:grid-cols-2" stagger={0.08}>
            {offices.map((office) => (
              <RevealItem
                key={office.id}
                className="group relative bg-white p-7 transition-colors duration-300 hover:bg-mist md:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  {office.role}
                </span>
                <h3 className="mt-4 text-h3 text-ink">{office.label}</h3>

                <address className="mt-6 space-y-3 not-italic">
                  <p className="flex items-start gap-3 text-[0.9375rem] leading-snug text-body">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
                    <span>
                      {office.street}
                      <br />
                      {office.city}, {office.region} {office.postalCode}
                    </span>
                  </p>
                  <p>
                    <a
                      href={`tel:${office.phoneHref}`}
                      className="font-display text-h4 font-bold tracking-tight text-ink transition-colors hover:text-red"
                    >
                      {office.phone}
                    </a>
                  </p>
                </address>

                <p className="mt-6 border-t border-line pt-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink/55">
                  Covers {office.covers}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ================================================================ AREAS */}
      <section className="section bg-mist">
        <div className="container-site">
          <SectionHeading
            label="Coverage Detail"
            layout="split"
            title="Metro Areas We Work In."
            intro={
              <p>
                Not an exhaustive list. If a project is outside these areas but part of a
                multi-site program, we travel crews for it, say so in the bid request.
              </p>
            }
          />

          <div className="mt-10 md:mt-14 space-y-12">
            {serviceAreas.map((area) => (
              <Reveal key={area.region}>
                <div className="grid gap-6 border-t-2 border-ink pt-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
                  <div>
                    <h3 className="text-h4 text-ink">{area.region}</h3>
                    <p className="mt-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-red">
                      {area.note}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2 self-start">
                    {area.cities.map((city) => (
                      <li
                        key={city}
                        className="border border-line bg-white px-3.5 py-2 text-[0.875rem] text-ink/80 transition-colors hover:border-ink hover:text-ink"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== INDUSTRIES */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="What We Bid in These Markets"
            title="Every Sector, in Every Area We Serve."
            as="h2"
          />

          <RevealGroup className="mt-12 flex flex-wrap gap-3" stagger={0.03}>
            {industries.map((industry) => (
              <RevealItem key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group inline-flex items-center gap-2.5 border border-line px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Building2
                    aria-hidden="true"
                    className="size-3.5 text-red transition-colors group-hover:text-white"
                  />
                  {industry.shortTitle}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 text-red transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner
        label="Outside These Areas?"
        title="Ask Anyway."
        body={`Multi-site and rollout programs travel. Send the locations and the schedule and we will tell you honestly whether we can staff it. Call ${company.phone}.`}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Service Areas', href: '/service-areas' },
        ])}
      />
    </>
  );
}
