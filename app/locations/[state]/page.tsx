import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Building2, ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { getState, stateSlugs } from '@/lib/locations';
import { toCardData, projects } from '@/lib/projects';
import { getIndustry } from '@/lib/industries';
import { breadcrumbSchema } from '@/lib/schema';
import { company, siteUrl } from '@/lib/site';

export function generateStaticParams() {
  return stateSlugs.map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const record = getState(state);
  if (!record) return {};
  return {
    title: record.metaTitle,
    description: record.metaDescription,
    alternates: { canonical: `/locations/${record.slug}` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const record = getState(state);
  if (!record) notFound();

  const cityNames = record.cities.flatMap((c) => c.projectCities);
  const stateProjects = projects
    .filter((p) => p.location && cityNames.some((c) => p.location!.includes(c)))
    .slice(0, 6);

  const industrySlugs = Array.from(new Set(record.cities.flatMap((c) => c.industries)));
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Locations', href: '/locations' },
    { name: record.name, href: `/locations/${record.slug}` },
  ];

  return (
    <>
      <PageHero
        label={`${record.name} · ${record.status === 'primary' ? 'Primary Market' : 'Active Market'}`}
        title={`Painting Contractor in ${record.name}.`}
        intro={record.intro}
        crumbs={crumbs}
        meta={[
          { label: 'Cities Served', value: `${record.cities.length}` },
          { label: 'Crews Based', value: record.basedIn.split(',')[0] },
          { label: 'Since', value: '1984' },
          { label: 'Warranty', value: company.warranty },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
      </PageHero>

      {/* ============================================================== CITIES */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Markets"
            layout="split"
            title={`Cities We Serve in ${record.name}.`}
            intro={
              <p>
                Each market below has its own building stock and its own constraints. The pages
                describe how work actually runs there, not a template with the city name
                swapped in.
              </p>
            }
          />

          <RevealGroup
            className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.04}
          >
            {record.cities.map((city) => (
              <RevealItem key={city.slug} className="group bg-white">
                <Link
                  href={`/locations/${record.slug}/${city.slug}`}
                  className="block h-full p-6 transition-colors hover:bg-mist md:p-7"
                >
                  <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    {city.metro}
                  </span>
                  <h3 className="mt-3 flex items-center gap-2 text-h4 text-ink">
                    {city.name}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-body">
                    {city.intro.split('. ').slice(0, 2).join('. ')}.
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================ PROJECTS */}
      {stateProjects.length > 0 && (
        <section className="section bg-mist">
          <div className="container-site">
            <SectionHeading
              label="Project Experience"
              layout="split"
              title={`Work Completed in ${record.name}.`}
              action={<TextLink href="/projects">Full Portfolio</TextLink>}
            />
            <RevealGroup
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.05}
            >
              {stateProjects.map((project) => (
                <RevealItem key={project.slug}>
                  <ProjectCard project={toCardData(project)} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ========================================================== INDUSTRIES */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Sectors"
            title={`What We Bid Across ${record.name}.`}
            as="h2"
          />
          <RevealGroup className="mt-10 flex flex-wrap gap-3" stagger={0.03}>
            {industrySlugs.map((slug) => {
              const industry = getIndustry(slug);
              if (!industry) return null;
              return (
                <RevealItem key={slug}>
                  <Link
                    href={`/industries/${slug}`}
                    className="group inline-flex min-h-11 items-center gap-2.5 border border-line px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <Building2
                      aria-hidden="true"
                      className="size-3.5 text-red transition-colors group-hover:text-white"
                    />
                    {industry.shortTitle}
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner
        label={`${record.name} Bids`}
        title="Send Us the Drawings."
        body={`Bid or no-bid, you get an answer. Call ${company.phone} or send the plans and specification sections through the bid portal.`}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteUrl}/locations/${record.slug}#webpage`,
          name: record.metaTitle,
          description: record.metaDescription,
          url: `${siteUrl}/locations/${record.slug}`,
          about: { '@type': 'State', name: record.name },
          isPartOf: { '@id': `${siteUrl}/#website` },
        }}
      />
    </>
  );
}
