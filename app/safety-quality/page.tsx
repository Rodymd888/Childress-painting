import { ShieldCheck, ClipboardCheck, FileCheck, AlertTriangle } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextLink } from '@/components/ui/Button';

import { safetyCommitments, qualityPractices } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Safety & Quality | Commercial Painting Standards',
  description:
    'How Childress Painting runs safety and quality control on commercial and industrial coating projects: site-specific planning, daily hazard review, mockups, and documented closeout.',
  path: '/safety-quality',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Safety & Quality', href: '/safety-quality' },
];

const closeoutPackage = [
  'Approved submittals and product data sheets',
  'Safety data sheets for every system applied',
  'Colour schedule with formulas by area or elevation',
  'Coating records — preparation, conditions, and thickness where specified',
  'Punch list with area-by-area completion sign-off',
  'Attic stock, labeled and delivered to the agreed location',
  'Warranty documentation from the manufacturer and from us',
  'Photographic record where the scope or the owner requires it',
];

const faqs = [
  {
    question: 'Do you carry a written safety program?',
    answer:
      'Yes, and it is provided as part of prequalification. We do not publish program documents, EMR figures, or incident rates on this website — those are supplied directly to your prequalification department so you receive current, verifiable information rather than a marketing summary.',
  },
  {
    question: 'Who supervises the crew on site?',
    answer:
      'A supervisor is assigned to the project and stays on site during production. Field questions get answered the same day rather than waiting on a return call, and quality checks happen before an area is offered for inspection.',
  },
  {
    question: 'What happens if an area fails inspection?',
    answer:
      'It gets corrected, logged, and re-offered. More importantly, we look at why it failed — usually the standard was never agreed, or a substrate condition was accepted that should not have been. Both are preventable with a mockup and a substrate check before production starts.',
  },
  {
    question: 'How do you handle hazardous materials and older coatings?',
    answer:
      'Suspected lead-based or otherwise hazardous existing coatings are not disturbed until they have been tested and the appropriate abatement scope has been established. That work is identified separately and coordinated with a qualified specialist rather than absorbed into a painting scope.',
  },
];

export default function SafetyQualityPage() {
  return (
    <>
      <PageHero
        label="Safety & quality"
        title="Practices, not statistics."
        intro="Safety records and certifications belong in a prequalification package where they can be verified — not on a marketing page. What follows is how the work is actually run."
        crumbs={crumbs}
        meta={[
          { label: 'Planning', value: 'Site-specific, before mobilization' },
          { label: 'Field', value: 'Daily task hazard review' },
          { label: 'QC', value: 'Supervisor walk before inspection' },
          { label: 'Records', value: 'Assembled during production' },
        ]}
      />

      {/* Why no numbers ----------------------------------------------------- */}
      <section className="border-b border-line bg-mist">
        <div className="container-site py-9 md:py-11">
          <Reveal>
            <div className="flex flex-col gap-4 border-l-4 border-red bg-white p-6 sm:flex-row sm:items-start sm:gap-5 md:p-7">
              <AlertTriangle aria-hidden="true" className="size-5 shrink-0 text-red" />
              <div>
                <h2 className="text-lg text-navy md:text-xl">
                  You will not find an EMR or an incident rate on this page.
                </h2>
                <p className="mt-2.5 max-w-3xl text-[0.9375rem] leading-relaxed text-body">
                  Those figures change annually and mean nothing without the documentation behind
                  them. Ours are supplied directly to your prequalification department, along with
                  our written safety program, certificates of insurance, and references — current
                  and verifiable, which is the only form in which they are worth anything.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Safety -------------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Safety"
            title="Six things that happen on every job."
            intro={
              <p>
                Painting and coating work carries a specific hazard profile — height, solvent
                exposure, confined spaces, and constant proximity to other trades. These are the
                controls we run regardless of the project size.
              </p>
            }
          />

          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
            {safetyCommitments.map((item) => (
              <RevealItem
                key={item.title}
                className="group relative bg-white p-7 transition-colors hover:bg-mist lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full"
                />
                <ShieldCheck aria-hidden="true" className="size-5 text-red" />
                <h3 className="mt-5 text-[1.375rem] leading-tight text-navy lg:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-body">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Quality ------------------------------------------------------------- */}
      <section className="bg-navy py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            light
            label="Quality control"
            title="The standard is agreed before it is inspected."
            intro={
              <p>
                Most finish disputes are not disagreements about workmanship. They are
                disagreements about what was acceptable — and they happen because nobody defined
                it in writing before production started.
              </p>
            }
          />

          <RevealGroup className="mt-14 grid gap-px bg-white/12 md:grid-cols-2 xl:grid-cols-3">
            {qualityPractices.map((item) => (
              <RevealItem
                key={item.title}
                className="group relative bg-navy p-7 transition-colors hover:bg-navy-800 lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full"
                />
                <ClipboardCheck aria-hidden="true" className="size-5 text-red" />
                <h3 className="mt-5 text-[1.375rem] leading-tight text-white lg:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-steel-light">
                  {item.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Closeout package ---------------------------------------------------- */}
      <section className="bg-mist py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Closeout</span>
              <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] text-navy">
                What lands on the project manager&rsquo;s desk at the end.
              </h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-body">
                Closeout is not a phase — it is the byproduct of doing the rest properly.
                Everything below is assembled while the work is happening, so handover is a
                delivery rather than a search.
              </p>
              <div className="mt-8">
                <TextLink href="/services/new-construction">New construction scope</TextLink>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-t-4 border-red bg-white p-7 lg:p-9">
                <div className="flex items-center gap-3">
                  <FileCheck aria-hidden="true" className="size-4 text-red" />
                  <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                    Turnover package
                  </h3>
                </div>
                <ul className="mt-6">
                  {closeoutPackage.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line py-3.5 text-[0.9375rem] leading-snug text-navy last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ ------------------------------------------------------------------ */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Common questions</span>
              <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] text-navy">
                Safety and quality, asked directly.
              </h2>
            </Reveal>

            <RevealGroup as="dl" className="border-t border-line">
              {faqs.map((faq) => (
                <RevealItem key={faq.question} className="border-b border-line py-7">
                  <dt className="text-xl text-navy lg:text-[1.375rem]">{faq.question}</dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-body">{faq.answer}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <CtaBanner
        label="Prequalification"
        title="Need our prequalification package?"
        body="Certificates of insurance, W-9, written safety program, EMR documentation, and references — sent in the format your process requires."
        primary={{ href: '/contact', text: 'Request the package' }}
        secondary={{ href: '/request-bid', text: 'Invite us to bid' }}
      />

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
    </>
  );
}
