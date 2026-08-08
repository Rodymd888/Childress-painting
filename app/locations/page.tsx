import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { states, totalCities } from '@/lib/locations';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Locations | Painting Contractor Across Texas, Kansas & Missouri',
  description:
    'Childress Painting works from offices in Dallas, Texas and Grandview, Missouri. Commercial, industrial, and residential painting across the Dallas-Fort Worth Metroplex and the Kansas City metro.',
  alternates: { canonical: '/locations' },
};

export default function LocationsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Locations', href: '/locations' },
  ];

  return (
    <>
      <PageHero
        label="Locations"
        title="Where We Work."
        intro="Two offices, three states, and a portfolio built in both metros. Every market below is one we actually staff, not a radius drawn on a map."
        crumbs={crumbs}
        meta={[
          { label: 'Offices', value: '2' },
          { label: 'States', value: `${states.length}` },
          { label: 'Markets', value: `${totalCities}` },
          { label: 'Since', value: '1984' },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
      </PageHero>

      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Markets"
            layout="split"
            title="Two Offices, Three States."
            intro={
              <p>
                Texas is the primary market, worked from Dallas. Kansas and Missouri are served
                from Grandview, where four decades of school, retail, restaurant, and stadium
                work is concentrated.
              </p>
            }
          />

          <div className="mt-12 space-y-14 md:mt-16">
            {states.map((state) => (
              <Reveal key={state.slug}>
                <div className="border-t-2 border-ink pt-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-h3 text-ink">
                      <Link href={`/locations/${state.slug}`} className="hover:text-red">
                        {state.name}
                      </Link>
                    </h2>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                      {state.status === 'primary' ? 'Primary Market' : 'Active Market'} ·{' '}
                      {state.cities.length} Cities
                    </span>
                  </div>

                  <p className="mt-4 max-w-3xl leading-relaxed text-body">{state.intro}</p>

                  <RevealGroup className="mt-8 flex flex-wrap gap-2" stagger={0.03}>
                    {state.cities.map((city) => (
                      <RevealItem key={city.slug}>
                        <Link
                          href={`/locations/${state.slug}/${city.slug}`}
                          className="group inline-flex min-h-11 items-center gap-2 border border-line px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                        >
                          <MapPin
                            aria-hidden="true"
                            className="size-3.5 text-red transition-colors group-hover:text-white"
                          />
                          {city.name}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 text-red transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                          />
                        </Link>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        label="Outside These Markets?"
        title="Ask Anyway."
        body="Multi-site and rollout programs travel. Send the locations and the schedule and we will tell you honestly whether we can staff it."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
