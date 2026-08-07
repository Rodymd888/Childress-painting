import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Linkedin } from 'lucide-react';

import { ContactForm } from '@/components/forms/ContactForm';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { company, offices } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact Childress Painting | Dallas, Texas',
  description: `Contact Childress Painting — ${company.phone}, ${company.email}. Commercial painting contractor based at ${company.address.street}, ${company.address.city}, ${company.address.region}.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <PageHero
        label="Contact"
        title="Talk to Someone Who Prices the Work."
        intro="A small leadership team means the person who estimates your project is reachable while it is running. No account layer in between."
        crumbs={crumbs}
        meta={[
          { label: 'Dallas – Fort Worth', value: offices[0].phone },
          { label: 'Kansas City', value: offices[1].phone },
          { label: 'Hours', value: 'Mon–Fri, 7am–5pm CT' },
          { label: 'Bidding today?', value: 'Call, do not email' },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a bid instead
        </ButtonLink>
      </PageHero>

      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            {/* ------------------------------------------------------- DETAILS */}
            <Reveal>
              <span className="title-block text-ink/60">Direct contact</span>
              <h2 className="mt-6 text-h3 text-ink">Two Offices. One Team.</h2>

              {/* One block per operating location — driven by lib/site.ts. */}
              <div className="mt-9 space-y-8">
                {offices.map((office) => (
                  <address key={office.id} className="not-italic">
                    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3">
                      <h3 className="font-display text-[1.25rem] font-bold tracking-tight text-ink">
                        {office.label}
                      </h3>
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                        {office.role}
                      </span>
                    </div>

                    <div className="space-y-px border-x border-b border-line">
                      <a
                        href={`tel:${office.phoneHref}`}
                        className="group flex items-start gap-4 border-b border-line p-5 transition-colors hover:bg-mist"
                      >
                        <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" />
                        <span>
                          <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                            Phone
                          </span>
                          <span className="mt-1.5 block font-display text-[1.1875rem] font-bold tracking-tight text-ink transition-colors group-hover:text-red">
                            {office.phone}
                          </span>
                        </span>
                      </a>

                      <div className="flex items-start gap-4 p-5">
                        <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" />
                        <span>
                          <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                            Address
                          </span>
                          <span className="mt-1.5 block text-[0.9375rem] font-semibold leading-snug text-ink">
                            {office.street}
                            <br />
                            {office.city}, {office.region} {office.postalCode}
                          </span>
                          <span className="mt-1.5 block text-[0.8125rem] text-body">
                            Covers {office.covers}
                          </span>
                        </span>
                      </div>
                    </div>
                  </address>
                ))}

                {/* Shared across both offices. */}
                <div className="space-y-px border border-line">
                  <a
                    href={`mailto:${company.email}`}
                    className="group flex items-start gap-4 border-b border-line p-5 transition-colors hover:bg-mist"
                  >
                    <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" />
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                        Email
                      </span>
                      <span className="mt-1.5 block break-all text-[0.9375rem] font-semibold text-ink transition-colors group-hover:text-red">
                        {company.email}
                      </span>
                    </span>
                  </a>

                  <div className="flex items-start gap-4 p-5">
                    <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" />
                    <span>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                        Hours
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] font-semibold text-ink">
                        Monday – Friday, 7:00am – 5:00pm CT
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-body">
                        Field crews also run night and weekend shifts.
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {company.social.linkedin && (
                <a
                  href={company.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 border border-line px-5 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Linkedin
                    aria-hidden="true"
                    className="size-4 text-red transition-colors group-hover:text-white"
                  />
                  Childress Painting on LinkedIn
                </a>
              )}

              <div className="mt-10 border-l-2 border-red bg-mist p-6">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/55">
                  Bidding a project?
                </p>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                  Use the bid portal instead — it collects the drawings, due date, and scope in
                  one submission so estimating can start immediately.
                </p>
                <div className="mt-5">
                  <ButtonLink href="/request-bid" variant="dark" withArrow>
                    Request a bid
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            {/* ---------------------------------------------------------- FORM */}
            <Reveal delay={0.1} from="right">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
