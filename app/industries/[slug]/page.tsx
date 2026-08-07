import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Building2 } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { industries, getIndustry, industrySlugs } from '@/lib/industries';
import { getService } from '@/lib/services';
import { projectsByIndustry } from '@/lib/projects';
import { clientGroups } from '@/lib/clients';
import { breadcrumbSchema } from '@/lib/schema';
import { company } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: `/industries/${industry.slug}`,
    },
  };
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedServices = industry.relatedServices
    .map(getService)
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const sectorProjects = projectsByIndustry(industry.slug);
  const clients = industry.clientGroup
    ? clientGroups.find((g) => g.slug === industry.clientGroup)
    : undefined;
  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 4);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/industries' },
    { name: industry.shortTitle, href: `/industries/${industry.slug}` },
  ];

  return (
    <>
      <PageHero
        label={industry.code}
        title={industry.title}
        intro={industry.summary}
        crumbs={crumbs}
        meta={[
          { label: 'Projects listed', value: `${sectorProjects.length}` },
          { label: 'Services applied', value: `${relatedServices.length}` },
          { label: 'Scheduling', value: company.scheduling },
          { label: 'Warranty', value: company.warranty },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a bid
        </ButtonLink>
        <ButtonLink href="/industries" variant="outlineLight" size="lg">
          All industries
        </ButtonLink>
      </PageHero>

      {/* ================================================================ INTRO */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-ink/60">The sector</span>
              <p className="mt-7 text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-snug tracking-tight text-ink">
                {industry.intro}
              </p>

              <div className="mt-12 space-y-9">
                {industry.constraints.map((c, i) => (
                  <div key={c.title} className="border-l-2 border-red pl-6">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                      Constraint {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-3 text-h4 text-ink">{c.title}</h2>
                    <p className="mt-2.5 leading-relaxed text-body">{c.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} from="right">
              <div className="lg:sticky lg:top-28">
                <MediaFrame
                  image={
                    industry.image
                      ? {
                          src: industry.image,
                          alt: `${industry.title} painting project`,
                          width: 1200,
                          height: 1500,
                        }
                      : undefined
                  }
                  art={industry.art}
                  label={industry.title}
                  ratio="tall"
                  overlay={false}
                  priority
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />

                <div className="mt-8 border border-line bg-mist p-6 md:p-7">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    Facility &amp; space types
                  </span>
                  <ul className="mt-5 space-y-2.5">
                    {industry.facilities.map((facility) => (
                      <li
                        key={facility}
                        className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ink/80"
                      >
                        <Building2 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-red" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =============================================================== CLIENTS */}
      {clients && clients.clients.length > 0 && (
        <section className="relative overflow-hidden bg-ink py-20 md:py-24">
          <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="container-site relative">
            <SectionHeading
              light
              label="Representative clients"
              layout="split"
              title={`${industry.title} Experience.`}
              intro={<p>{clients.blurb}</p>}
            />

            <RevealGroup
              className="mt-12 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.03}
            >
              {clients.clients.map((client) => (
                <RevealItem
                  key={client.name}
                  className="bg-ink px-5 py-4 transition-colors duration-300 hover:bg-ink-800"
                >
                  <span className="font-display text-[1.0625rem] font-bold tracking-tight text-white">
                    {client.name}
                  </span>
                  {client.note && (
                    <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ash">
                      {client.note}
                    </span>
                  )}
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-9">
              <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-silver">
                Representative commercial project experience of the Childress Painting
                leadership team. Company names identify project experience only; no endorsement
                or affiliation is implied.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============================================================== PROJECTS */}
      {sectorProjects.length > 0 && (
        <section className="section bg-mist">
          <div className="container-site">
            <SectionHeading
              label="Portfolio"
              layout="split"
              title={`${industry.title} Projects.`}
              intro={
                <p>
                  {sectorProjects.length}{' '}
                  {sectorProjects.length === 1 ? 'project' : 'projects'} in this sector.
                </p>
              }
            />

            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {sectorProjects.map((project) => (
                <RevealItem key={project.slug}>
                  <ProjectCard project={project} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ============================================================== SERVICES */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Services applied here"
            title={`What We Typically Bid in ${industry.shortTitle}.`}
            as="h2"
          />

          <RevealGroup className="mt-12 grid gap-px bg-line sm:grid-cols-2" stagger={0.05}>
            {relatedServices.map((service) => (
              <RevealItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group sweep relative flex h-full flex-col bg-white p-7 transition-colors hover:bg-mist"
                >
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    {service.csi}
                  </span>
                  <h3 className="mt-3 text-h4 text-ink transition-colors group-hover:text-red">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">
                    {service.summary}
                  </p>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-6 size-4 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ========================================================= OTHER SECTORS */}
      <section className="section-sm bg-mist">
        <div className="container-site">
          <SectionHeading label="Other sectors" title="Also Served." as="h2" />

          <RevealGroup className="mt-10 flex flex-wrap gap-3" stagger={0.04}>
            {others.map((other) => (
              <RevealItem key={other.slug}>
                <Link
                  href={`/industries/${other.slug}`}
                  className="group inline-flex items-center gap-2.5 border border-line bg-white px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  {other.shortTitle}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner
        label="Bid invitations"
        title={`Bidding ${industry.shortTitle} Work?`}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
