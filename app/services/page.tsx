import type { Metadata } from 'next';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { serviceGroups, servicesByGroup, services } from '@/lib/services';
import { capabilitySnapshot } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/schema';
import { company } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Commercial Painting Services | Interior, Exterior & Coatings',
  description:
    'Commercial painting services across Texas: interior and exterior painting, tenant finish-outs, occupied renovations, new construction, surface preparation, and high-performance coatings.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Commercial capabilities"
        title="Seven scopes. One subcontractor."
        intro="Commercial, residential, and industrial painting — and every trade that supports them — priced, submitted, staffed, inspected, and closed out by the same team."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
        meta={[
          { label: 'Coating systems', value: company.coatingSystems },
          { label: 'Scheduling', value: company.scheduling },
          { label: 'Warranty', value: company.warranty },
          { label: 'Safety', value: company.safety },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a bid
        </ButtonLink>
        <ButtonLink href="/industries" variant="outlineLight" size="lg">
          Browse by industry
        </ButtonLink>
      </PageHero>

      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="What we bid"
            layout="split"
            title={`${services.length} services, defined before award.`}
            intro={
              <p>
                Every proposal states what is included, what is assumed, and what is excluded.
                Scope gaps cause more disputes on a jobsite than any finish issue — so we settle
                them in writing first.
              </p>
            }
          />

          <div className="mt-14 space-y-16">
            {serviceGroups.map((group) => {
              const items = servicesByGroup(group);
              let offset = 0;
              for (const g of serviceGroups) {
                if (g === group) break;
                offset += servicesByGroup(g).length;
              }
              return (
                <div key={group}>
                  <div className="flex items-baseline justify-between border-t-2 border-ink pt-6">
                    <h3 className="font-display text-[1.375rem] font-bold tracking-tight text-ink">
                      {group}
                    </h3>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                      {items.length} {items.length === 1 ? 'service' : 'services'}
                    </span>
                  </div>
                  <RevealGroup className="mt-8 grid gap-px bg-line lg:grid-cols-2" stagger={0.05}>
                    {items.map((service, i) => (
                      <RevealItem key={service.slug}>
                        <ServiceCard service={service} index={offset + i} />
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-site">
          <SectionHeading
            label="Our process"
            layout="split"
            title="The same eight steps on every project."
            intro={
              <p>
                From takeoff to closeout documentation. Select a step to see what it covers and
                what you receive at the end of it.
              </p>
            }
            action={<TextLink href="/process">The full process</TextLink>}
          />

          <Reveal className="mt-14">
            <ProcessTimeline />
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Capability snapshot"
            title="The facts a prequalification form asks for."
          />

          <RevealGroup
            className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.04}
          >
            {capabilitySnapshot.map((item) => (
              <RevealItem key={item.label} className="bg-white p-6 md:p-7">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                  {item.label}
                </dt>
                <dd className="mt-3 text-[0.9375rem] font-semibold leading-snug text-ink">
                  {item.value}
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ])}
      />
    </>
  );
}
