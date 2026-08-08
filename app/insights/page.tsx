import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { articles } from '@/lib/articles';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Insights | Commercial Painting Guidance for Construction Teams',
  description:
    'Practical guidance on commercial painting cost, scope, scheduling, coatings, and occupied-building work, written for general contractors, developers, and facility managers.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/insights' },
  ];

  return (
    <>
      <PageHero
        label="Insights"
        title="What We Have Learned Worth Writing Down."
        intro="Answers to the questions we get asked before a job is awarded. Written from the estimating desk and the field, for the people who have to make the decision."
        crumbs={crumbs}
        meta={[
          { label: 'Articles', value: `${articles.length}` },
          { label: 'Written For', value: 'GCs & Owners' },
          { label: 'Source', value: 'Our Own Process' },
          { label: 'Since', value: '1984' },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
      </PageHero>

      <section className="section bg-white">
        <div className="container-site">
          <RevealGroup className="grid gap-px border border-line bg-line lg:grid-cols-2" stagger={0.06}>
            {articles.map((article) => (
              <RevealItem key={article.slug} className="group bg-white">
                <Link href={`/insights/${article.slug}`} className="flex h-full flex-col p-7 transition-colors hover:bg-mist md:p-9">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                    {article.audience}
                  </span>
                  <h2 className="mt-4 flex items-start gap-2 text-h3 text-ink">
                    {article.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1.5 size-5 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </h2>
                  <p className="mt-4 flex-1 leading-relaxed text-body">{article.excerpt}</p>
                  <p className="mt-6 flex items-center gap-2 border-t border-line pt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink/50">
                    <Clock aria-hidden="true" className="size-3.5 text-red" />
                    {article.readMinutes} Minute Read · {article.published}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
