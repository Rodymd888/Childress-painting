import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Building2, ArrowUpRight, Phone } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { getCity, getState, cityPaths, nearbyCities } from '@/lib/locations';
import { projects } from '@/lib/projects';
import { getIndustry } from '@/lib/industries';
import { getService } from '@/lib/services';
import { breadcrumbSchema } from '@/lib/schema';
import { company, siteUrl, offices } from '@/lib/site';

export function generateStaticParams() {
  return cityPaths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const record = getCity(state, city);
  if (!record) return {};
  return {
    title: record.metaTitle,
    description: record.metaDescription,
    alternates: { canonical: `/locations/${state}/${city}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const stateRecord = getState(state);
  const record = getCity(state, city);
  if (!record || !stateRecord) notFound();

  /* Real projects in this city are the strongest local signal we have. */
  const localProjects = projects.filter(
    (p) => p.location && record.projectCities.some((c) => p.location!.includes(c)),
  );

  const nearby = nearbyCities(state, city);
  const industries = record.industries.map(getIndustry).filter(Boolean);
  const services = record.services.map(getService).filter(Boolean);

  /* The office closest to this market, so NAP stays accurate per page. */
  const office = stateRecord.slug === 'texas' ? offices[0] : offices[1];

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Locations', href: '/locations' },
    { name: stateRecord.name, href: `/locations/${state}` },
    { name: record.name, href: `/locations/${state}/${city}` },
  ];

  return (
    <>
      <PageHero
        label={`${record.name}, ${stateRecord.abbr} · ${record.metro}`}
        title={`Commercial Painting Contractors in ${record.name}.`}
        intro={record.intro}
        crumbs={crumbs}
        meta={[
          { label: 'Nearest Office', value: `${office.city}, ${office.region}` },
          { label: 'Phone', value: office.phone },
          { label: 'Projects Here', value: `${localProjects.length}` },
          { label: 'Warranty', value: company.warranty },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
        <ButtonLink href={`tel:${office.phoneHref}`} variant="outlineLight" size="lg">
          Call {office.phone}
        </ButtonLink>
      </PageHero>

      {/* ======================================================= CONSIDERATIONS */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label={`Working in ${record.name}`}
            layout="split"
            title="What Shapes the Work Here."
            intro={
              <p>
                Every market has its own constraints. These are the ones that decide how a
                {' '}{record.name} job is planned, staffed, and sequenced.
              </p>
            }
          />
          <RevealGroup className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2" stagger={0.06}>
            {record.considerations.map((c, i) => (
              <RevealItem key={c.title} className="bg-white p-7 md:p-9">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 text-h4 text-ink">{c.title}</h2>
                <p className="mt-3.5 leading-relaxed text-body">{c.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================ PROJECTS */}
      {localProjects.length > 0 && (
        <section className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
          <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="container-site relative">
            <SectionHeading
              light
              label="Local Work"
              layout="split"
              title={`Projects We Have Completed in ${record.name}.`}
              intro={
                <p>
                  Photographed work in this market. Every entry links to the services performed
                  and the sector it sits in.
                </p>
              }
            />
            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {localProjects.slice(0, 6).map((project) => (
                <RevealItem key={project.slug}>
                  <ProjectCard project={project} />
                </RevealItem>
              ))}
            </RevealGroup>
            {localProjects.length > 6 && (
              <Reveal className="mt-9">
                <TextLink href="/projects" light>
                  All {localProjects.length} Projects in This Market
                </TextLink>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ SERVICES */}
      <section className="section bg-mist">
        <div className="container-site">
          <SectionHeading
            label="Services"
            layout="split"
            title={`What We Do in ${record.name}.`}
            action={<TextLink href="/services">All Services</TextLink>}
          />
          <RevealGroup className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2" stagger={0.05}>
            {services.map((service) => (
              <RevealItem key={service!.slug} className="group bg-white">
                <Link
                  href={`/services/${service!.slug}`}
                  className="block h-full p-6 transition-colors hover:bg-white/60 md:p-7"
                >
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                    {service!.csi}
                  </span>
                  <h3 className="mt-3 flex items-center gap-2 text-h4 text-ink">
                    {service!.title} in {record.name}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-body">
                    {service!.summary}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ========================================================== INDUSTRIES */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading label="Sectors" title={`Industries We Serve in ${record.name}.`} as="h2" />
          <RevealGroup className="mt-10 flex flex-wrap gap-3" stagger={0.03}>
            {industries.map((industry) => (
              <RevealItem key={industry!.slug}>
                <Link
                  href={`/industries/${industry!.slug}`}
                  className="group inline-flex min-h-11 items-center gap-2.5 border border-line px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Building2
                    aria-hidden="true"
                    className="size-3.5 text-red transition-colors group-hover:text-white"
                  />
                  {industry!.shortTitle}
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* NAP block: identical wording to the footer and to schema. */}
          <Reveal className="mt-14">
            <div className="border-l-2 border-red bg-mist p-6 md:p-8">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/55">
                Serving {record.name} From
              </p>
              <address className="mt-3 not-italic">
                <p className="font-display text-h4 text-ink">{company.legalName}</p>
                <p className="mt-1.5 text-[0.9375rem] leading-snug text-body">
                  {office.street}
                  <br />
                  {office.city}, {office.region} {office.postalCode}
                </p>
                <a
                  href={`tel:${office.phoneHref}`}
                  className="mt-3 inline-flex items-center gap-2 font-display text-[1.125rem] font-bold text-ink transition-colors hover:text-red"
                >
                  <Phone aria-hidden="true" className="size-4 text-red" />
                  {office.phone}
                </a>
              </address>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================== NEARBY */}
      {nearby.length > 0 && (
        <section className="section-sm bg-mist">
          <div className="container-site">
            <SectionHeading label="Nearby" title="Other Markets We Serve." as="h2" />
            <div className="mt-8 flex flex-wrap gap-2">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/locations/${n.state.slug}/${n.slug}`}
                  className="group inline-flex min-h-11 items-center gap-2 border border-line bg-white px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <MapPin
                    aria-hidden="true"
                    className="size-3.5 text-red transition-colors group-hover:text-white"
                  />
                  Painting Contractors in {n.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        label={`${record.name} Bids`}
        title={`Bidding a Project in ${record.name}?`}
        body={`Send the drawings and the specification sections. Bid or no-bid, you get an answer. Call ${office.phone}.`}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteUrl}/locations/${state}/${city}#webpage`,
          name: record.metaTitle,
          description: record.metaDescription,
          url: `${siteUrl}/locations/${state}/${city}`,
          about: {
            '@type': 'City',
            name: record.name,
            containedInPlace: { '@type': 'State', name: stateRecord.name },
          },
          isPartOf: { '@id': `${siteUrl}/#website` },
          provider: { '@id': `${siteUrl}/#organization` },
        }}
      />
    </>
  );
}
