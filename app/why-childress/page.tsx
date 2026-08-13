import type { Metadata } from 'next';
import {
  CalendarCheck,
  Radio,
  UserCheck,
  CheckCircle2,
  Sparkles,
  ListChecks,
  Link2,
  ShieldCheck,
} from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { differentiators, credentials, values } from '@/lib/content';
import { company } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Why Choose Childress Painting | For General Contractors',
  description:
    '40+ years experience, a commercial-first focus, reliable scheduling, dedicated project management, quality control inspections, fast punch lists, and a one-year workmanship warranty.',
  alternates: { canonical: '/why-childress' },
};

const ICONS: Record<string, typeof CalendarCheck> = {
  calendar: CalendarCheck,
  radio: Radio,
  user: UserCheck,
  check: CheckCircle2,
  broom: Sparkles,
  list: ListChecks,
  link: Link2,
  shield: ShieldCheck,
};

export default function WhyChildressPage() {
  return (
    <>
      <PageHero
        label="Why Childress"
        title="What a General Contractor Is Actually Buying."
        intro="Not paint. A subcontractor who shows up, raises problems early, coordinates with the trades around them, and hands over a short punch list. Price is how bids are compared; this is how they are remembered."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Why Childress', href: '/why-childress' },
        ]}
        meta={[
          { label: 'Experience', value: '40+ years' },
          { label: 'Focus', value: 'Commercial-first' },
          { label: 'Warranty', value: company.warranty },
          { label: 'Safety', value: company.safety },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a Bid
        </ButtonLink>
        <ButtonLink href="/process" variant="outlineLight" size="lg">
          See Our Process
        </ButtonLink>
      </PageHero>

      {/* ========================================================== CREDENTIALS */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Credentials"
            layout="split"
            title="Verifiable, Not Aspirational."
            intro={
              <p>
                Every figure below appears on our capability statement and survives a
                prequalification review. We do not publish numbers we cannot substantiate.
              </p>
            }
          />

          <RevealGroup
            className="mt-10 md:mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {credentials.map((item) => (
              <RevealItem
                key={item.label}
                className="group relative bg-white p-7 transition-colors duration-300 hover:bg-mist md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="block font-display text-h2 font-black leading-none text-ink md:text-[3.5rem]">
                  {item.value}
                </span>
                <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-red">
                  {item.label}
                </p>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-body">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ======================================================= DIFFERENTIATORS */}
      <section className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading
            light
            label="Why General Contractors Choose Childress"
            layout="split"
            title="Eight Things Superintendents Tell Us Matter."
            intro={
              <p>
                Collected from four decades of debriefs. None of them are about the coating, which is exactly the point.
              </p>
            }
          />

          <RevealGroup
            className="mt-12 md:mt-16 grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.05}
          >
            {differentiators.map((item) => {
              const Icon = ICONS[item.icon] ?? CheckCircle2;
              return (
                <RevealItem
                  key={item.title}
                  className="group relative bg-ink p-7 transition-colors duration-300 hover:bg-ink-800 md:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <Icon aria-hidden="true" className="size-6 text-red" />
                  <h2 className="mt-5 font-display text-h5 font-bold tracking-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ash">{item.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* =============================================================== VALUES */}
      <section className="section bg-mist">
        <div className="container-site">
          <SectionHeading
            label="How We Operate"
            layout="split"
            title="Positions We Hold Even When They Cost Us."
            intro={
              <p>
                Occasionally these lose us a job on price. We hold them because the alternative
                costs the client more two years later.
              </p>
            }
            action={<TextLink href="/about">More About the Company</TextLink>}
          />

          <RevealGroup className="mt-10 md:mt-14 grid gap-px bg-line sm:grid-cols-2" stagger={0.06}>
            {values.map((value, i) => (
              <RevealItem key={value.title} className="bg-white p-7 md:p-9">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 text-h4 text-ink">{value.title}</h2>
                <p className="mt-4 leading-relaxed text-body">{value.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================== WARRANTY */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <ShieldCheck aria-hidden="true" className="mx-auto size-9 text-red" />
            <h2 className="mt-7 text-h2 text-ink">A Written One-Year Warranty.</h2>
            <p className="mt-6 text-lead leading-relaxed text-body">
              Our workmanship warranty runs for two years from substantial completion, in
              addition to whatever the coating manufacturer provides on the material. It is
              issued in writing at closeout alongside attic stock and the approved color
              schedule, and a call after closeout gets the same response as a call during
              construction.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/request-bid" variant="primary" withArrow>
                Request a Bid
              </ButtonLink>
              <ButtonLink href="/safety-quality" variant="outline">
                Safety &amp; Quality
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Why Childress', href: '/why-childress' },
        ])}
      />
    </>
  );
}
