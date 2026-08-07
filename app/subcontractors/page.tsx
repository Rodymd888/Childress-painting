import { FileCheck, Handshake, CreditCard, ShieldCheck } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/components/ui/JsonLd';
import { SubcontractorForm } from '@/components/forms/SubcontractorForm';

import { company } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Subcontractors & Suppliers | Prequalification',
  description:
    'Painting subcontractors, coatings applicators, and suppliers can submit for prequalification with Childress Painting across Texas, Kansas, and Missouri.',
  path: '/subcontractors',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Subcontractors', href: '/subcontractors' },
];

const expectations = [
  {
    icon: ShieldCheck,
    title: 'Insurance stays current',
    body: 'General liability and workers’ compensation must be in force for the whole time you are on site, with us named as required by the project. A lapsed certificate stops work the day it expires.',
  },
  {
    icon: FileCheck,
    title: 'Paperwork before mobilization',
    body: 'W-9, certificate of insurance, and a signed subcontract agreement are in place before anyone reaches the site. No purchase order is issued without them.',
  },
  {
    icon: Handshake,
    title: 'The crew that was quoted',
    body: 'The manpower on your quote is the manpower we plan the schedule around. If it changes, we need to know before the schedule assumes it, not after.',
  },
  {
    icon: CreditCard,
    title: 'Clean invoicing',
    body: 'Invoices reference the purchase order and the work actually completed. Accurate billing gets paid on schedule; guesswork gets returned and delays everyone.',
  },
];

const faqs = [
  {
    question: 'What trades do you subcontract?',
    answer:
      'Most commonly additional painting and coatings crews during peak production, along with related scopes such as drywall finishing, pressure washing, abrasive blasting, specialty flooring, wallcovering, and high-work with lift equipment.',
  },
  {
    question: 'Do I need to be based in Dallas–Fort Worth?',
    answer:
      'No. Our core work runs from Dallas and Grandview, MO, but we take projects across Texas, Kansas, and Missouri and regularly need trade partners with reliable coverage in Austin, Houston, San Antonio, and the Kansas City metro. Tell us where you can genuinely work rather than where you would like to.',
  },
  {
    question: 'How long does prequalification take?',
    answer:
      'It depends on whether your documentation is ready. Submissions with a current certificate of insurance and a completed W-9 move quickly. Submissions missing compliance documents sit until they arrive.',
  },
  {
    question: 'Will you keep my information on file?',
    answer:
      'Yes. We review submissions as capacity requires and reach out when your trades, coverage area, and crew size match an upcoming need. Send an update any time your capabilities or coverage change.',
  },
];

export default function SubcontractorsPage() {
  return (
    <>
      <PageHero
        label="Trade partners"
        title="Work With Childress."
        intro="We prequalify painting subcontractors, coatings applicators, and related trades who can hold a schedule, keep their paperwork current, and leave a site clean."
        crumbs={crumbs}
        meta={[
          { label: 'Required', value: 'Current COI and W-9' },
          { label: 'Coverage', value: 'DFW and statewide Texas' },
          { label: 'Trades', value: 'Painting, coatings, related' },
          { label: 'Submissions', value: 'Open year-round' },
        ]}
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="What we expect"
            title="Four Things, and They Are Not Negotiable."
            intro={
              <p>
                We would rather set this out plainly now than discover a mismatch on the first
                morning of a job. If these are normal to you, we will get on well.
              </p>
            }
          />

          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-2">
            {expectations.map((item) => (
              <RevealItem
                key={item.title}
                className="group relative bg-white p-7 transition-colors hover:bg-mist lg:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full"
                />
                <item.icon aria-hidden="true" className="size-5 text-red" />
                <h3 className="mt-5 text-[1.375rem] leading-tight text-ink lg:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-body">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-mist py-16 md:py-20 lg:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
            <div>
              <Reveal>
                <span className="title-block text-ink/60">Prequalification</span>
                <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] text-ink">Submit Your Company.</h2>
                <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-body">
                  Fill this in once. We keep it on file and come back to you when the work matches
                  what you do.
                </p>
              </Reveal>

              <div className="mt-10">
                <SubcontractorForm />
              </div>
            </div>

            <Reveal delay={0.08} className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink/60">Questions</h2>

              <dl className="mt-7 border-t border-line">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-line py-6">
                    <dt className="text-lg text-ink">{faq.question}</dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-[0.9375rem] leading-relaxed text-body">
                Prefer to send documents directly? Email{' '}
                <a
                  href={`mailto:${company.email}`}
                  className="break-all font-medium text-red-dark underline underline-offset-2"
                >
                  {company.email}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
    </>
  );
}
