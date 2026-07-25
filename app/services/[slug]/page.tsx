import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/cards/ProjectCard';

import { services, getService, serviceSlugs } from '@/lib/services';
import { getMarket } from '@/lib/markets';
import { projectsByService } from '@/lib/projects';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/schema';
import { company } from '@/lib/site';

/**
 * Renders /services/commercial-painting, /services/industrial-coatings,
 * /services/new-construction, and /services/maintenance-repaints.
 *
 * These are statically generated at build time from lib/services.ts —
 * `dynamicParams = false` means any other slug returns a 404 rather than
 * being rendered on demand.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: service.shortTitle, href: `/services/${service.slug}` },
  ];

  const related = projectsByService(service.slug).slice(0, 3);
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        label={service.csi}
        title={service.title}
        intro={service.summary}
        crumbs={crumbs}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a bid
        </ButtonLink>
        <ButtonLink href="/contact" variant="outlineLight" size="lg">
          Talk to estimating
        </ButtonLink>
      </PageHero>

      {/* Intro + scope list ------------------------------------------------ */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
            <div>
              <Reveal>
                <span className="title-block text-navy/60">Overview</span>
                <p className="mt-6 text-[clamp(1.25rem,2.4vw,1.625rem)] leading-snug text-navy">
                  {service.intro}
                </p>
              </Reveal>

              <div className="prose-site mt-12">
                {service.sections.map((section, i) => (
                  <Reveal key={section.heading} delay={i * 0.04}>
                    <h2>{section.heading}</h2>
                    <p>{section.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Scope card — sticky on desktop so it follows the reader. */}
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <div className="border-t-4 border-red bg-mist p-7 lg:p-8">
                <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                  Scope of work
                </h2>
                <ul className="mt-6 space-y-0">
                  {service.scope.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-line py-3.5 text-[0.9375rem] leading-snug text-navy last:border-b-0"
                    >
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-[0.8125rem] leading-relaxed text-body">
                  Not sure which items apply to your project? Send the drawings and we will tell
                  you what is in the paint scope and what is not.
                </p>

                <div className="mt-6">
                  <ButtonLink href="/request-bid" variant="dark" withArrow>
                    Request a bid
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Systems / spec table ---------------------------------------------- */}
      <section className="bg-navy py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            light
            label="Typical systems"
            title="What gets specified, and why."
            intro={
              <p>
                Indicative only — the specification governs. Where the documents leave a system
                open, we recommend one and state it in the scope letter rather than assuming.
              </p>
            }
          />

          <RevealGroup as="dl" className="mt-14 grid gap-px bg-white/12">
            {service.systems.map((system) => (
              <RevealItem
                key={system.label}
                className="grid gap-2 bg-navy p-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-10 md:p-7"
              >
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white">
                  {system.label}
                </dt>
                <dd className="text-[0.9375rem] leading-relaxed text-steel-light">
                  {system.detail}
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Related markets ---------------------------------------------------- */}
      <section className="bg-mist py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Where this applies"
            title="Sectors where this scope comes up most."
            action={<TextLink href="/markets">All markets</TextLink>}
          />

          <RevealGroup className="mt-12 grid gap-px bg-line md:grid-cols-3">
            {service.relatedMarkets.map((marketSlug) => {
              const market = getMarket(marketSlug);
              if (!market) return null;
              return (
                <RevealItem key={market.slug}>
                  <Link
                    href={`/markets/${market.slug}`}
                    className="group flex h-full flex-col bg-mist p-7 transition-colors hover:bg-white lg:p-8"
                  >
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                      {market.code}
                    </span>
                    <h3 className="mt-4 text-[1.375rem] leading-tight text-navy lg:text-2xl">
                      {market.shortTitle}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                      {market.summary}
                    </p>
                    <span className="mt-auto flex items-center gap-2 pt-7 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy transition-colors group-hover:text-red">
                      View sector
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Related projects ---------------------------------------------------- */}
      {related.length > 0 && (
        <section className="bg-white py-20 md:py-24">
          <div className="container-site">
            <SectionHeading
              layout="split"
              label="Related work"
              title="Scope profiles using this service."
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

      {/* FAQ ----------------------------------------------------------------- */}
      <section className="bg-mist py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Common questions</span>
              <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] text-navy">
                What buyers ask before they invite us to bid.
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-body">
                If your question is not here, call {company.phone} or send it through the contact
                form — a real estimator answers.
              </p>
            </Reveal>

            <RevealGroup as="dl" className="border-t border-line">
              {service.faqs.map((faq) => (
                <RevealItem key={faq.question} className="border-b border-line py-7">
                  <dt className="text-xl text-navy lg:text-[1.375rem]">{faq.question}</dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-body">{faq.answer}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Other services ------------------------------------------------------ */}
      <section className="border-t border-line bg-white py-16 md:py-20">
        <div className="container-site">
          <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
            Other services
          </h2>
          <RevealGroup as="ul" className="mt-8 grid gap-px bg-line md:grid-cols-3">
            {otherServices.map((other) => (
              <RevealItem as="li" key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex h-full flex-col bg-white p-6 transition-colors hover:bg-mist lg:p-7"
                >
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-navy/60">
                    {other.csi}
                  </span>
                  <span className="mt-3 font-display text-xl font-extrabold uppercase tracking-tight text-navy transition-colors group-hover:text-red">
                    {other.shortTitle}
                  </span>
                  <span className="mt-2 text-[0.875rem] leading-relaxed text-body">
                    {other.kicker}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={[breadcrumbSchema(crumbs), serviceSchema(service), faqSchema(service.faqs)]}
      />
    </>
  );
}
