import type { Metadata } from 'next';
import { HardHat, ClipboardCheck, ShieldCheck } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { safetyCommitments, qualityPractices } from '@/lib/content';
import { company } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Safety & Quality | OSHA-Compliant Crews and QC Inspections',
  description:
    'How Childress Painting manages safety and quality: OSHA-compliant crews, site-specific planning, access and fall protection, mockups, substrate acceptance, and our own QC walk before the GC walkthrough.',
  alternates: { canonical: '/safety-quality' },
};

export default function SafetyQualityPage() {
  return (
    <>
      <PageHero
        label="Safety & Quality"
        title="Two Things That Are Never a Line Item to Cut."
        intro="Safety is how a crew goes home. Quality control is why our punch lists are short. Both are planned before mobilization not managed after a problem."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Safety & Quality', href: '/safety-quality' },
        ]}
        meta={[
          { label: 'Safety Standard', value: company.safety },
          { label: 'Coating Systems', value: company.coatingSystems },
          { label: 'Warranty', value: company.warranty },
          { label: 'QC Walk', value: 'Before the GC walkthrough' },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
        <ButtonLink href="/contact" variant="outlineLight" size="lg">
          Request Our Prequal Packet
        </ButtonLink>
      </PageHero>

      {/* =============================================================== SAFETY */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Safety"
            layout="split"
            title={
              <>
                <HardHat aria-hidden="true" className="mb-4 size-9 text-red" />
                Planned at Bid, Not After an Incident.
              </>
            }
            intro={
              <p>
                We describe conduct rather than publishing incident statistics we would not
                stand behind in an audit. Training records, certificates of insurance, and our
                completed prequalification packet are available on request.
              </p>
            }
          />

          <RevealGroup
            className="mt-10 md:mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {safetyCommitments.map((item, i) => (
              <RevealItem
                key={item.title}
                className="group relative bg-white p-7 transition-colors duration-300 hover:bg-mist md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  S-{String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 text-h4 text-ink">{item.title}</h2>
                <p className="mt-3.5 leading-relaxed text-body">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================== QUALITY */}
      <section className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading
            light
            label="Quality Control"
            layout="split"
            title={
              <>
                <ClipboardCheck aria-hidden="true" className="mb-4 size-9 text-red" />
                We Inspect Our Work Before You Do.
              </>
            }
            intro={
              <p>
                Coverage, film build, sheen uniformity, cut lines, and adjacent-surface
                condition, checked and corrected before anyone else is asked to look at it.
              </p>
            }
          />

          <RevealGroup
            className="mt-10 md:mt-14 grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {qualityPractices.map((item, i) => (
              <RevealItem
                key={item.title}
                className="group relative bg-ink p-7 transition-colors duration-300 hover:bg-ink-800 md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red-light">
                  Q-{String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 text-h4 text-white">{item.title}</h2>
                <p className="mt-3.5 leading-relaxed text-ash">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================= WARRANTY */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <ShieldCheck aria-hidden="true" className="mx-auto size-9 text-red" />
            <h2 className="mt-7 text-h2 text-ink">Backed in Writing.</h2>
            <p className="mt-6 text-lead leading-relaxed text-body">
              Every project carries a two-year workmanship warranty from substantial completion,
              in addition to the coating manufacturer&rsquo;s material warranty. We apply{' '}
              {company.coatingSystems} systems and issue the warranty at closeout with attic
              stock and the approved color schedule.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/request-bid" variant="primary" withArrow>
                Request a Bid
              </ButtonLink>
              <ButtonLink href="/process" variant="outline">
                See Our Process
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        label="Prequalification"
        title="Need Our Packet Completed?"
        body={`Send your prequalification forms and we will return them completed with certificates of insurance, safety documentation, and references. Call ${company.phone}.`}
        primary={{ href: '/contact', text: 'Send prequal forms' }}
        secondary={{ href: '/request-bid', text: 'Request a Bid' }}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Safety & Quality', href: '/safety-quality' },
        ])}
      />
    </>
  );
}
