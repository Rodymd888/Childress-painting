import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Building } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/cards/ProjectCard';

import { markets, getMarket, marketSlugs } from '@/lib/markets';
import { getService } from '@/lib/services';
import { projectsByMarket } from '@/lib/projects';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

/**
 * Renders /markets/healthcare, /aviation, /education, /industrial,
 * /multifamily, and /retail. Statically generated from lib/markets.ts.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return marketSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) return {};

  return buildMetadata({
    title: market.metaTitle,
    description: market.metaDescription,
    path: `/markets/${market.slug}`,
  });
}

export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) notFound();

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Markets', href: '/markets' },
    { name: market.shortTitle, href: `/markets/${market.slug}` },
  ];

  const related = projectsByMarket(market.slug);
  const otherMarkets = markets.filter((m) => m.slug !== market.slug);

  return (
    <>
      <PageHero
        label={market.code}
        title={market.title}
        intro={market.summary}
        crumbs={crumbs}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a bid
        </ButtonLink>
        <ButtonLink href="/contact" variant="outlineLight" size="lg">
          Talk to estimating
        </ButtonLink>
      </PageHero>

      {/* Intro ------------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">The environment</span>
              <h2 className="mt-5 text-[clamp(1.75rem,3.8vw,2.75rem)] text-navy">
                What governs {market.shortTitle.toLowerCase()} work.
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="lg:pt-3">
              <p className="text-[clamp(1.125rem,2.2vw,1.375rem)] leading-snug text-navy">
                {market.intro}
              </p>
            </Reveal>
          </div>

          {/* Constraints grid */}
          <RevealGroup className="mt-16 grid gap-px bg-line md:grid-cols-2">
            {market.constraints.map((constraint, i) => (
              <RevealItem
                key={constraint.title}
                className="group relative bg-white p-7 transition-colors hover:bg-mist lg:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full"
                />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                  Constraint {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[1.375rem] leading-tight text-navy lg:text-2xl">
                  {constraint.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-body">
                  {constraint.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Approach + facilities --------------------------------------------- */}
      <section className="bg-navy py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
            <div>
              <SectionHeading
                light
                label="How we plan it"
                title={`Practice in ${market.shortTitle.toLowerCase()}.`}
              />

              <RevealGroup as="ol" className="mt-12 border-t border-white/12">
                {market.approach.map((step, i) => (
                  <RevealItem
                    as="li"
                    key={step.heading}
                    className="grid gap-4 border-b border-white/12 py-8 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-8"
                  >
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-xl text-white lg:text-[1.375rem]">{step.heading}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-light">
                        {step.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            {/* Facility types */}
            <Reveal className="lg:pt-24">
              <div className="border-t-4 border-red bg-navy-800 p-7 lg:p-8">
                <div className="flex items-center gap-3">
                  <Building aria-hidden="true" className="size-4 text-red" />
                  <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white">
                    Facility types
                  </h2>
                </div>

                <ul className="mt-6">
                  {market.facilities.map((facility) => (
                    <li
                      key={facility}
                      className="border-b border-white/10 py-3 text-[0.9375rem] text-steel-light last:border-b-0"
                    >
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services that apply to this sector */}
              <div className="mt-8">
                <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/60">
                  Services that apply
                </h2>
                <ul className="mt-5 space-y-2">
                  {market.relatedServices.map((serviceSlug) => {
                    const service = getService(serviceSlug);
                    if (!service) return null;
                    return (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex min-h-12 items-center justify-between gap-4 border border-white/15 px-5 transition-colors hover:border-white/40 hover:bg-white/5"
                        >
                          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white">
                            {service.shortTitle}
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related projects --------------------------------------------------- */}
      {related.length > 0 && (
        <section className="bg-white py-20 md:py-24">
          <div className="container-site">
            <SectionHeading
              layout="split"
              label="Related work"
              title={`${market.shortTitle} scope profiles.`}
              intro={
                <p>
                  Sample layouts pending verified project data and photography — see the note on
                  each card.
                </p>
              }
              action={<TextLink href="/projects">All projects</TextLink>}
            />

            <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((project) => (
                <RevealItem key={project.slug}>
                  <ProjectCard project={project} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Other markets ------------------------------------------------------ */}
      <section className="border-t border-line bg-mist py-16 md:py-20">
        <div className="container-site">
          <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
            Other markets
          </h2>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            {otherMarkets.map((other) => (
              <Link
                key={other.slug}
                href={`/markets/${other.slug}`}
                className="inline-flex min-h-11 items-center border border-line bg-white px-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                {other.shortTitle}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
