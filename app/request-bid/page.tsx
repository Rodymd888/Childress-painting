import { Clock, FileText, MessageSquare, Phone } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { BidForm } from '@/components/forms/BidForm';

import { company } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Request a Bid | Commercial Painting Estimates',
  description:
    'Invite Childress Painting to bid your commercial painting or industrial coatings package. Send plans, specifications, and the due date — you get a bid or a no-bid.',
  path: '/request-bid',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Request a Bid', href: '/request-bid' },
];

const faqs = [
  {
    question: 'What do you need to price a project?',
    answer:
      'The current drawing set, the relevant specification sections, all addenda, and the bid due date. If the documents are on a plan room or invitation-to-bid platform, a link is enough.',
  },
  {
    question: 'Will you tell me if you are not bidding?',
    answer:
      'Yes, and quickly. A fast no-bid is more useful to an estimator than a late maybe, so we confirm receipt and give you a bid or no-bid answer rather than going quiet.',
  },
  {
    question: 'Do you provide a written scope letter?',
    answer:
      'Every bid includes one, listing inclusions, exclusions, clarifications, and assumptions so you can level our number against the other bidders without a round of phone calls.',
  },
];

const expectations = [
  {
    icon: MessageSquare,
    title: 'Receipt confirmed',
    body: 'We acknowledge the invitation so you know it landed with a person, not an inbox.',
  },
  {
    icon: FileText,
    title: 'Bid or no-bid',
    body: 'You get a clear answer either way. We do not hold a slot on your bid list and then go quiet.',
  },
  {
    icon: Clock,
    title: 'Priced to the due date',
    body: 'The bid arrives ahead of your deadline, or we tell you early that we cannot make it.',
  },
  {
    icon: Phone,
    title: 'A person to call',
    body: 'Questions during levelling go to the estimator who priced it, not to a general line.',
  },
];

export default function RequestBidPage() {
  return (
    <>
      <PageHero
        label="Bid invitations"
        title="Invite us to bid."
        intro="Send the plans, the specification sections, and the due date. We confirm receipt and give you a bid or a no-bid — so you are never left waiting."
        crumbs={crumbs}
        meta={[
          { label: 'Response', value: 'Bid or no-bid, always' },
          { label: 'Included', value: 'Written scope letter' },
          { label: 'Delivery', value: 'GC subcontract and direct' },
          { label: 'Coverage', value: 'DFW base, Texas statewide' },
        ]}
      />

      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
            <div>
              <BidForm />
            </div>

            <Reveal delay={0.08} className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                What happens next
              </h2>

              <ul className="mt-7 space-y-7">
                {expectations.map((item) => (
                  <li key={item.title} className="border-t border-line pt-6">
                    <div className="flex items-center gap-3">
                      <item.icon aria-hidden="true" className="size-4 shrink-0 text-red" />
                      <h3 className="text-lg text-navy">{item.title}</h3>
                    </div>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t-4 border-red bg-mist p-6">
                <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                  Bid due today?
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                  Call the office directly rather than using the form. Tight deadlines get handled
                  faster on the phone.
                </p>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="mt-5 inline-flex min-h-12 items-center gap-2.5 bg-navy px-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy-700"
                >
                  <Phone aria-hidden="true" className="size-3.5" />
                  {company.phone}
                </a>
                <p className="mt-4 break-all font-mono text-[0.625rem] uppercase tracking-[0.14em] text-body">
                  <a href={`mailto:${company.email}`} className="hover:text-red">
                    {company.email}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-16 md:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Before you send</span>
              <h2 className="mt-5 text-[clamp(1.75rem,3.4vw,2.5rem)] text-navy">
                Three things worth knowing.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <dl className="border-t border-line">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-line py-6">
                    <dt className="text-lg text-navy md:text-xl">{faq.question}</dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
    </>
  );
}
