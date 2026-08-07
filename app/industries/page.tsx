import type { Metadata } from 'next';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IndustryCard } from '@/components/cards/IndustryCard';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { industries } from '@/lib/industries';
import { projectCountByIndustry } from '@/lib/projects';
import { clientGroups, totalClients } from '@/lib/clients';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Industries We Serve | Commercial Painting Market Sectors',
  description:
    'Painting across thirteen market sectors: retail, restaurants, healthcare, education, industrial, government, office, hospitality, sports, aviation, tenant improvements, new construction, and residential.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Markets we serve"
        title={`${industries.length} Sectors. ${industries.length} Different Constraints.`}
        intro="The coating rarely changes. What changes is what governs the schedule — infection control in a hospital, a grand-opening date in retail, a dark night in a stadium, badging at an airport. We plan for the constraint."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Industries', href: '/industries' },
        ]}
        meta={[
          { label: 'Market sectors', value: `${industries.length} served` },
          { label: 'Representative clients', value: `${totalClients} named` },
          { label: 'Client groups', value: `${clientGroups.length} industries` },
          { label: 'Experience', value: '40+ years, since 1984' },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a bid
        </ButtonLink>
        <ButtonLink href="/clients" variant="outlineLight" size="lg">
          Representative clients
        </ButtonLink>
      </PageHero>

      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Sector index"
            layout="split"
            title="Where Childress Works."
            intro={
              <p>
                Each sector page covers the constraints that actually define the work, the
                facility types we handle, and the services most often bid into it.
              </p>
            }
            action={<TextLink href="/projects">Browse the portfolio</TextLink>}
          />

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {industries.map((industry, i) => (
              <RevealItem key={industry.slug}>
                <IndustryCard
                  industry={industry}
                  projectCount={projectCountByIndustry[industry.slug]}
                  priority={i < 3}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-sm bg-mist">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="title-block text-ink/55">Not listed?</span>
            <h2 className="mt-6 text-h3 text-ink">If It Is Commercial, It Is Probably Work We Have Done.</h2>
            <p className="mt-4 leading-relaxed text-body">
              Four decades across retail, restaurant, healthcare, government, industrial, and
              education construction covers most commercial building types. Send the drawings
              and we will tell you honestly whether it is a fit.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/request-bid" variant="primary" withArrow>
                Request a bid
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Talk to preconstruction
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Industries', href: '/industries' },
        ])}
      />
    </>
  );
}
