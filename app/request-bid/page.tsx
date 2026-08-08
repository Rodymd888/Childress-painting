import type { Metadata } from 'next';
import { Phone, Mail, Clock, FileCheck2, ShieldCheck, Send } from 'lucide-react';

import { BidForm } from '@/components/forms/BidForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';

import { company } from '@/lib/site';
import { processSteps } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Request a Bid | Commercial Painting Bid Portal',
  description:
    'Submit a commercial painting bid request. Company details, project address, project type, bid due date, budget, plans upload, and scope of work, bid or no-bid, you get an answer.',
  alternates: { canonical: '/request-bid' },
};

const ASSURANCES = [
  {
    icon: Clock,
    title: 'Receipt Confirmed',
    body: 'We acknowledge every invitation so you know it landed and is not sitting in a spam folder on bid day.',
  },
  {
    icon: FileCheck2,
    title: 'Bid or No-Bid, You Get an Answer',
    body: 'If we are not the right fit for the scope or the schedule, we say so early instead of leaving a gap on your bid tab.',
  },
  {
    icon: ShieldCheck,
    title: 'Assumptions in Writing',
    body: 'Every proposal states what is included, what is assumed, and what is excluded, so scope gaps surface before award.',
  },
];

export default function RequestBidPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Request a Bid', href: '/request-bid' },
  ];

  return (
    <>
      {/* ================================================================= HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="sheet-grid absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-red/12 blur-3xl"
        />

        <div className="container-site relative pb-14 pt-32 md:pb-16 md:pt-40">
          <Breadcrumbs crumbs={crumbs} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-20">
            <div>
              <span className="title-block text-white/70">Bid Portal</span>
              <h1 className="mt-5 max-w-4xl text-h1">Send Us the Drawings.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
                Four short steps. Attach plans and specification sections, tell us the due date,
                and we will confirm receipt and tell you whether we are bidding.
              </p>
            </div>

            <div className="border border-white/15 bg-white/[0.03] p-6 backdrop-blur-sm md:p-7">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red-light">
                Bidding today?
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ash">
                If the due date is inside 48 hours, call instead of submitting the form.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${company.phoneHref}`}
                  className="group flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-white transition-colors hover:text-red-light"
                >
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-red" />
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.estimatingEmail}`}
                  className="group flex items-center gap-3 font-mono text-[0.8125rem] tracking-normal text-white transition-colors hover:text-red-light"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-red" />
                  <span className="break-all">{company.estimatingEmail}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Assurance strip */}
          <dl className="mt-10 md:mt-14 grid grid-cols-1 gap-px border-t border-white/15 bg-white/10 md:grid-cols-3">
            {ASSURANCES.map((item) => (
              <div key={item.title} className="bg-ink py-6 md:px-6 md:first:pl-0">
                <dt className="flex items-center gap-2.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white">
                  <item.icon aria-hidden="true" className="size-3.5 text-red" />
                  {item.title}
                </dt>
                <dd className="mt-2.5 text-[0.875rem] leading-relaxed text-ash">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================================================================= FORM */}
      <section className="section bg-mist">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.45fr)] lg:gap-16">
            <Reveal>
              <BidForm />
            </Reveal>

            {/* --------------------------------------------------- SIDEBAR */}
            <Reveal delay={0.1} from="right">
              <div className="space-y-6 lg:sticky lg:top-28">
                <div className="border border-line bg-white p-6 md:p-7">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    What to Send
                  </span>
                  <ul className="mt-5 space-y-3">
                    {[
                      'Architectural drawings, finish plans and schedules',
                      'Specification sections (Division 09)',
                      'Bid due date and time',
                      'Anticipated start and substantial completion',
                      'Any prototype or brand finish standard',
                      'Prevailing wage or special conditions, if applicable',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ink/80"
                      >
                        <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 bg-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-line bg-white p-6 md:p-7">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    What Happens Next
                  </span>
                  <ol className="mt-5 space-y-4">
                    {processSteps.slice(0, 3).map((step) => (
                      <li key={step.number} className="flex gap-3.5">
                        <span className="font-mono text-[0.6875rem] text-red">{step.number}</span>
                        <span>
                          <span className="block text-[0.875rem] font-semibold text-ink">
                            {step.title}
                          </span>
                          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-body">
                            {step.short}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border border-line bg-ink p-6 text-white md:p-7">
                  <Send aria-hidden="true" className="size-5 text-red" />
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ash">
                    Share your drawings by link, Dropbox, Box, SharePoint, Procore, or
                    BuildingConnected all work. Paste the link in the plans field and
                    estimating pulls them down the same day.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
