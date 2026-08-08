import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowUpRight } from 'lucide-react';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';

import { getArticle, articleSlugs, articles } from '@/lib/articles';
import { getService } from '@/lib/services';
import { getIndustry } from '@/lib/industries';
import { breadcrumbSchema } from '@/lib/schema';
import { company, siteUrl } from '@/lib/site';

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { type: 'article', publishedTime: article.publishedISO },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const services = article.relatedServices.map(getService).filter(Boolean);
  const industries = article.relatedIndustries.map(getIndustry).filter(Boolean);
  const more = articles.filter((a) => a.slug !== slug).slice(0, 2);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/insights' },
    { name: article.title, href: `/insights/${slug}` },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="sheet-grid absolute inset-0" aria-hidden="true" />
        <div className="container-site relative pb-14 pt-28 md:pb-16 md:pt-36">
          <Breadcrumbs crumbs={crumbs} light />
          <span className="title-block mt-8 block text-white/70">{article.audience}</span>
          <h1 className="mt-5 max-w-4xl text-h1 text-white">{article.title}</h1>
          <p className="mt-6 max-w-3xl text-lead leading-relaxed text-ash">{article.excerpt}</p>
          <p className="mt-8 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/55">
            <Clock aria-hidden="true" className="size-3.5 text-red" />
            {article.readMinutes} Minute Read · {article.published}
          </p>
        </div>
      </section>

      <article className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.5fr)] lg:gap-16">
            <Reveal>
              <div className="space-y-12">
                {article.sections.map((section, i) => (
                  <section key={section.heading}>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-3 text-h3 text-ink">{section.heading}</h2>
                    {section.body.map((p) => (
                      <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-body">
                        {p}
                      </p>
                    ))}
                    {section.points && (
                      <ul className="mt-6 space-y-2.5 border-l-2 border-red pl-5">
                        {section.points.map((point) => (
                          <li key={point} className="leading-relaxed text-ink/80">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                {article.faqs && article.faqs.length > 0 && (
                  <section>
                    <h2 className="text-h3 text-ink">Common Questions</h2>
                    <dl className="mt-7 space-y-px bg-line">
                      {article.faqs.map((faq) => (
                        <div key={faq.question} className="bg-white p-6">
                          <dt className="font-display text-h4 text-ink">{faq.question}</dt>
                          <dd className="mt-2.5 leading-relaxed text-body">{faq.answer}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}
              </div>
            </Reveal>

            {/* --------------------------------------------------- SIDEBAR */}
            <Reveal delay={0.1} from="right">
              <div className="space-y-6 lg:sticky lg:top-28">
                <div className="border border-line bg-mist p-6">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    Related Services
                  </span>
                  <ul className="mt-4 space-y-2">
                    {services.map((s) => (
                      <li key={s!.slug}>
                        <Link
                          href={`/services/${s!.slug}`}
                          className="group inline-flex items-start gap-2 py-1 text-[0.875rem] leading-snug text-ink transition-colors hover:text-red"
                        >
                          <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-red" />
                          {s!.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-line bg-mist p-6">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    Related Sectors
                  </span>
                  <ul className="mt-4 space-y-2">
                    {industries.map((ind) => (
                      <li key={ind!.slug}>
                        <Link
                          href={`/industries/${ind!.slug}`}
                          className="group inline-flex items-start gap-2 py-1 text-[0.875rem] leading-snug text-ink transition-colors hover:text-red"
                        >
                          <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-red" />
                          {ind!.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-line bg-ink p-6 text-white">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red-light">
                    Bidding Work?
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ash">
                    Send the drawings and the specification sections. Bid or no-bid, you get an
                    answer.
                  </p>
                  <Link
                    href="/request-bid"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 border-b-2 border-red pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white transition-colors hover:text-red-light"
                  >
                    Request a Bid
                    <ArrowUpRight aria-hidden="true" className="size-3.5 text-red" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section bg-mist">
          <div className="container-site">
            <SectionHeading label="More Insights" title="Related Reading." as="h2" />
            <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
              {more.map((a) => (
                <Link
                  key={a.slug}
                  href={`/insights/${a.slug}`}
                  className="group bg-white p-6 transition-colors hover:bg-white/60 md:p-8"
                >
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                    {a.audience}
                  </span>
                  <h3 className="mt-3 flex items-start gap-2 text-h4 text-ink">
                    {a.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-body">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${siteUrl}/insights/${slug}#article`,
          headline: article.title,
          description: article.metaDescription,
          datePublished: article.publishedISO,
          dateModified: article.publishedISO,
          author: { '@type': 'Organization', name: company.name, '@id': `${siteUrl}/#organization` },
          publisher: { '@id': `${siteUrl}/#organization` },
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/insights/${slug}` },
        }}
      />
      {article.faqs && article.faqs.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: article.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }}
        />
      )}
    </>
  );
}
