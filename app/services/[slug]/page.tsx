import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { services, getService, serviceSlugs } from '@/lib/services';
import { getIndustry } from '@/lib/industries';
import { sectorHero, projects } from '@/lib/projects';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { company } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relatedIndustries = service.relatedIndustries
    .map(getIndustry)
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const serviceProjects = projects
    .filter((p) => p.serviceTypes.includes(service.slug))
    .slice(0, 3);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: service.shortTitle, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageHero
        label={service.csi}
        title={service.title}
        intro={service.summary}
        crumbs={crumbs}
        meta={[
          { label: 'Scope', value: service.kicker },
          { label: 'Coating Systems', value: company.coatingSystems },
          { label: 'Scheduling', value: company.scheduling },
          { label: 'Warranty', value: company.warranty },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
        <ButtonLink href="/services" variant="outlineLight" size="lg">
          All Services
        </ButtonLink>
      </PageHero>

      {/* ================================================================= INTRO */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-ink/60">Overview</span>
              <p className="mt-7 text-h3 font-medium leading-snug tracking-tight text-ink">
                {service.intro}
              </p>

              <div className="mt-12 space-y-10">
                {service.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-h3 text-ink">{section.heading}</h2>
                    <p className="mt-4 leading-relaxed text-body">{section.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} from="right">
              <div className="lg:sticky lg:top-28">
                <MediaFrame
                  /* Real Childress work from a sector this service serves,
                     preferred over anything generic. Falls back to the drawn
                     service artwork when we have no photograph yet. */
                  image={
                    service.image
                      ? {
                          src: service.image,
                          alt: `${service.title} by Childress Painting`,
                          width: 1200,
                          height: 1500,
                        }
                      : service.relatedIndustries
                          .map((i) => sectorHero(i))
                          .find(Boolean)
                  }
                  art={service.art}
                  label={service.title}
                  ratio="tall"
                  overlay={false}
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />

                <div className="mt-8 border border-line bg-mist p-6 md:p-7">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    Systems &amp; Substrates
                  </span>
                  <dl className="mt-5 divide-y divide-line">
                    {service.systems.map((system) => (
                      <div key={system.label} className="py-3.5 first:pt-0 last:pb-0">
                        <dt className="text-[0.8125rem] font-semibold text-ink">
                          {system.label}
                        </dt>
                        <dd className="mt-1 text-[0.8125rem] leading-snug text-body">
                          {system.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================= SCOPE */}
      <section className="relative overflow-hidden bg-ink py-20 md:py-24">
        <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading
            light
            label="Included in a Bid"
            layout="split"
            title="What This Scope Actually Covers."
            intro={
              <p>
                Listed so there is no ambiguity at award. Anything not on this list is either
                excluded or priced separately, and the proposal says which.
              </p>
            }
          />

          <RevealGroup
            className="mt-12 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.04}
          >
            {service.scope.map((item) => (
              <RevealItem
                key={item}
                className="flex items-start gap-3 bg-ink p-5 transition-colors duration-300 hover:bg-ink-800"
              >
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
                <span className="text-[0.875rem] leading-snug text-white">{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================ INDUSTRIES */}
      {relatedIndustries.length > 0 && (
        <section className="section-sm bg-white">
          <div className="container-site">
            <SectionHeading
              label="Where This Scope Runs"
              title="Sectors That Buy This Service Most."
              as="h2"
            />

            <RevealGroup className="mt-10 flex flex-wrap gap-3" stagger={0.04}>
              {relatedIndustries.map((industry) => (
                <RevealItem key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group inline-flex items-center gap-2.5 border border-line px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    {industry.title}
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
      )}

      {/* ============================================================== PROJECTS */}
      {serviceProjects.length > 0 && (
        <section className="section bg-mist">
          <div className="container-site">
            <SectionHeading
              label="Selected Experience"
              title={`Where We Have Performed ${service.shortTitle}.`}
            />

            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {serviceProjects.map((project) => (
                <RevealItem key={project.slug}>
                  <ProjectCard project={project} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ================================================================== FAQS */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-ink/60">Common Questions</span>
              <h2 className="mt-6 text-h2 text-ink">Before You Bid It Out.</h2>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="divide-y divide-line border-y border-line">
                {service.faqs.map((faq) => (
                  <div key={faq.question} className="py-7 first:pt-0 last:pb-0">
                    <dt className="text-h4 text-ink">{faq.question}</dt>
                    <dd className="mt-3 leading-relaxed text-body">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ RELATED SVC */}
      <section className="section-sm bg-mist">
        <div className="container-site">
          <SectionHeading label="Related Scopes" title="Often Bid Together." as="h2" />

          <RevealGroup className="mt-10 grid gap-px bg-line md:grid-cols-3" stagger={0.05}>
            {related.map((item) => (
              <RevealItem key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group sweep relative flex h-full flex-col bg-white p-7 transition-colors hover:bg-mist"
                >
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    {item.csi}
                  </span>
                  <h3 className="mt-3 text-h4 text-ink transition-colors group-hover:text-red">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">
                    {item.summary}
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

      <CtaBanner
        label="Bid Invitations"
        title={`Add ${service.shortTitle} to Your Next Bid List.`}
      />

      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(service), faqSchema(service.faqs)]} />
    </>
  );
}
