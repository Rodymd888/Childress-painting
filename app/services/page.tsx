import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextLink } from '@/components/ui/Button';

import { services } from '@/lib/services';
import { markets } from '@/lib/markets';
import { processSteps } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Commercial Painting & Coating Services',
  description:
    'Commercial painting, industrial coatings, new construction packages, and maintenance repaint programs for Texas contractors, developers, and facility teams.',
  path: '/services',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Capabilities"
        title="Six scopes, priced from the documents."
        intro="Painting, coatings, resinous flooring, ground-up Division 09 packages, and planned repaint programs — self-performed, estimated from the drawings, and staffed to the schedule."
        crumbs={crumbs}
        meta={[
          { label: 'Delivery', value: 'GC subcontract and direct' },
          { label: 'Coverage', value: 'DFW base, Texas statewide' },
          { label: 'Scheduling', value: 'Day, night, weekend, shutdown' },
          { label: 'Bid response', value: 'Bid or no-bid, always' },
        ]}
      />

      {/* Editorial index — each service gets a full row, not a small tile. */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Scope index"
            title="Pick the scope that matches your project."
            intro={
              <p>
                Most projects use more than one. A ground-up warehouse takes new construction and
                industrial coatings; a hospital renovation takes commercial painting with an
                occupied-site plan. Tell us the project and we will tell you what applies.
              </p>
            }
          />

          <RevealGroup as="ul" className="mt-14">
            {services.map((service, i) => (
              <RevealItem as="li" key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid gap-6 border-t border-line py-10 transition-colors hover:bg-mist md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-start md:gap-10 md:px-4 lg:py-12"
                >
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                    {String(i + 1).padStart(2, '0')}
                    <span className="mt-2 block text-red">{service.csi}</span>
                  </span>

                  <div>
                    <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] text-navy">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-body">
                      {service.summary}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {service.scope.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-navy/60"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="flex items-center gap-2 self-center font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy transition-colors group-hover:text-red">
                    View scope
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="border-t border-line" />
        </div>
      </section>

      {/* Process */}
      <section className="bg-mist py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Process"
            title="The same six stages, whatever the scope."
            intro={
              <p>
                A repaint program and a ground-up hospital run at different scales, but the
                sequence does not change — and each stage still has to produce something you can
                hold the contractor to.
              </p>
            }
            action={
              <p className="font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-navy/60">
                Looking for interior or exterior painting specifically? Both sit inside{' '}
                <Link href="/services/commercial-painting" className="text-red underline underline-offset-2">
                  commercial painting
                </Link>
                {' '}— splitting them apart is a residential convention that makes a Division 09
                package harder to read, not easier.
              </p>
            }
          />
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* Markets cross-link */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Sector context"
            title="The same scope behaves differently by sector."
            intro={
              <p>
                Interior painting in an operating hospital and interior painting in an empty shell
                are not the same job. The market pages set out the constraint that governs each
                environment.
              </p>
            }
            action={<TextLink href="/markets">All markets</TextLink>}
          />

          <Reveal className="mt-12 flex flex-wrap gap-3">
            {markets.map((market) => (
              <Link
                key={market.slug}
                href={`/markets/${market.slug}`}
                className="inline-flex min-h-11 items-center border border-line px-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                {market.shortTitle}
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
