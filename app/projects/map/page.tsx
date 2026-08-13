import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { MapLoader } from '@/components/map/MapLoader';

import { mappedProjects, mappedStates, projects } from '@/lib/projects';
import { industries, getIndustry } from '@/lib/industries';
import { allCities } from '@/lib/locations';
import { breadcrumbSchema } from '@/lib/schema';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Project Footprint | Where Childress Painting Has Worked',
  description:
    'An interactive map of completed Childress Painting projects across Missouri, Kansas, and Texas. Filter verified project locations by market sector and state.',
  alternates: { canonical: '/projects/map' },
};

export default function ProjectMapPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Project Map', href: '/projects/map' },
  ];

  /* Group for the crawlable list: state, then city. */
  const byState = mappedStates.map((stateName) => ({
    stateName,
    entries: mappedProjects.filter((p) => p.stateName === stateName),
  }));

  const cityLink = (city: string, stateName: string) =>
    allCities.find(
      (c) => c.name.toLowerCase() === city.toLowerCase() && c.state.name === stateName,
    );

  return (
    <>
      <PageHero
        label="Project Footprint"
        title="Where We Have Worked."
        intro="Every pin is a completed Childress Painting project at an address we have verified. Projects without a confirmed address are not shown here, which is why this number is smaller than the full portfolio."
        crumbs={crumbs}
        meta={[
          { label: 'Verified Locations', value: `${mappedProjects.length}` },
          { label: 'Projects in Portfolio', value: `${projects.length}` },
          { label: 'States', value: `${mappedStates.length}` },
          { label: 'Since', value: '1984' },
        ]}
      >
        <ButtonLink href="/projects" variant="primary" size="lg" withArrow>
          Browse the Full Portfolio
        </ButtonLink>
        <ButtonLink href="/request-bid" variant="outlineLight" size="lg">
          Request a Bid
        </ButtonLink>
      </PageHero>

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <MapLoader
              projects={mappedProjects}
              industries={[...industries]}
              states={[...mappedStates]}
            />
          </Reveal>
        </div>
      </section>

      {/* ============================================ CRAWLABLE LOCATION LIST */}
      <section className="section bg-mist">
        <div className="container-site">
          <SectionHeading
            label="Verified Locations"
            layout="split"
            title="Every Mapped Project, by State."
            intro={
              <p>
                The same locations in plain text, so the project, city, sector, and market pages
                stay connected without needing the map.
              </p>
            }
          />

          <div className="mt-10 space-y-12 md:mt-14">
            {byState.map((group) => (
              <div key={group.stateName}>
                <h2 className="border-t-2 border-ink pt-5 text-h3 text-ink">
                  {group.stateName}
                  <span className="ml-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                    {group.entries.length}{' '}
                    {group.entries.length === 1 ? 'Location' : 'Locations'}
                  </span>
                </h2>

                <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
                  {group.entries.map((p) => {
                    const industry = getIndustry(p.industry);
                    const city = cityLink(p.city, p.stateName);
                    return (
                      <li key={p.slug} className="bg-white p-5 md:p-6">
                        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-red">
                          {industry?.title ?? p.industry}
                        </span>
                        <h3 className="mt-2 text-h5 text-ink">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="inline-flex items-center gap-1.5 hover:text-red"
                          >
                            {p.name}
                            <ArrowUpRight aria-hidden="true" className="size-3.5 text-red" />
                          </Link>
                        </h3>
                        <p className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-body">
                          <MapPin aria-hidden="true" className="mt-0.5 size-3 shrink-0 text-red" />
                          {p.fullAddress}
                        </p>
                        {/* PROJECT -> LOCATION -> INDUSTRY internal links. */}
                        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em]">
                          {city && (
                            <Link
                              href={`/locations/${city.state.slug}/${city.slug}`}
                              className="text-ink/55 underline-offset-4 hover:text-red hover:underline"
                            >
                              Painting in {city.name}
                            </Link>
                          )}
                          {industry && (
                            <Link
                              href={`/industries/${industry.slug}`}
                              className="text-ink/55 underline-offset-4 hover:text-red hover:underline"
                            >
                              {industry.shortTitle} Projects
                            </Link>
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-[0.8125rem] leading-relaxed text-body">
            Addresses shown are publicly listed business and facility locations. Residential
            projects are never mapped. Projects whose address has not yet been confirmed are
            absent from the map but remain in the{' '}
            <Link href="/projects" className="underline underline-offset-4 hover:text-red">
              full portfolio
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBanner
        label="Your Market"
        title="Working in One of These Areas?"
        body="Send the drawings and the specification sections. Bid or no-bid, you get an answer."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Childress Painting Verified Project Locations',
          numberOfItems: mappedProjects.length,
          itemListElement: mappedProjects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Place',
              name: p.name,
              url: `${siteUrl}/projects/${p.slug}`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: p.address,
                addressLocality: p.city,
                addressRegion: p.state,
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: p.latitude,
                longitude: p.longitude,
              },
            },
          })),
        }}
      />
    </>
  );
}
