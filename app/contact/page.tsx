import { Phone, Mail, MapPin, Building2, HardHat, Users } from 'lucide-react';
import Link from 'next/link';

import { PageHero } from '@/components/ui/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { ContactForm } from '@/components/forms/ContactForm';

import { company } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Contact | Childress Painting, Dallas–Fort Worth',
  description:
    'Contact Childress Painting for commercial painting and industrial coatings in Dallas–Fort Worth and Texas. Estimating, prequalification, and project enquiries.',
  path: '/contact',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
];

const routes = [
  {
    icon: Building2,
    title: 'Bid invitations',
    body: 'Sending plans and a due date? The bid form captures everything estimating needs in one pass.',
    href: '/request-bid',
    cta: 'Request a bid',
  },
  {
    icon: HardHat,
    title: 'Subcontractors',
    body: 'Trade partners and suppliers can submit for prequalification at any time.',
    href: '/subcontractors',
    cta: 'Prequalification form',
  },
  {
    icon: Users,
    title: 'Careers',
    body: 'Painters, applicators, foremen, estimators, and office staff.',
    href: '/careers',
    cta: 'Open applications',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Talk to a person who knows the work."
        intro="Estimating questions, prequalification requests, project issues, or a building you need looked at — it all reaches someone who can actually answer."
        crumbs={crumbs}
        meta={[
          { label: 'Phone', value: company.phone },
          { label: 'Email', value: company.email },
          { label: 'Base', value: `${company.address.city}, ${company.address.region}` },
          { label: 'Hours', value: 'Mon–Fri, 7:00–17:00' },
        ]}
      />

      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
            <div>
              <ContactForm />
            </div>

            <Reveal delay={0.08} className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
                Direct contact
              </h2>

              <address className="mt-7 space-y-6 not-italic">
                <div className="border-t border-line pt-6">
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-navy/60">
                    Phone
                  </span>
                  <a
                    href={`tel:${company.phoneHref}`}
                    className="mt-2 flex items-center gap-3 text-lg font-semibold text-navy transition-colors hover:text-red"
                  >
                    <Phone aria-hidden="true" className="size-4 shrink-0 text-red" />
                    {company.phone}
                  </a>
                </div>

                <div className="border-t border-line pt-6">
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-navy/60">
                    Estimating
                  </span>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-2 flex items-start gap-3 break-all font-semibold text-navy transition-colors hover:text-red"
                  >
                    <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-red" />
                    {company.email}
                  </a>
                </div>

                <div className="border-t border-line pt-6">
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-navy/60">
                    Careers
                  </span>
                  <a
                    href={`mailto:${company.careersEmail}`}
                    className="mt-2 flex items-start gap-3 break-all font-semibold text-navy transition-colors hover:text-red"
                  >
                    <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-red" />
                    {company.careersEmail}
                  </a>
                </div>

                <div className="border-t border-line pt-6">
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-navy/60">
                    Based in
                  </span>
                  <p className="mt-2 flex items-start gap-3 font-semibold text-navy">
                    <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-red" />
                    {/* REPLACE — confirm the office address before launch. */}
                    {company.address.city}, {company.address.region}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-body">
                    Serving the Dallas–Fort Worth metroplex, with statewide coverage across Texas.
                  </p>
                </div>
              </address>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-16 md:py-20">
        <div className="container-site">
          <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy/60">
            Faster routes
          </h2>

          <RevealGroup className="mt-8 grid gap-px bg-line md:grid-cols-3">
            {routes.map((route) => (
              <RevealItem key={route.href}>
                <Link
                  href={route.href}
                  className="group flex h-full flex-col bg-mist p-7 transition-colors hover:bg-white lg:p-8"
                >
                  <route.icon aria-hidden="true" className="size-5 text-red" />
                  <h3 className="mt-5 text-[1.375rem] leading-tight text-navy">{route.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{route.body}</p>
                  <span className="mt-auto pt-7 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy transition-colors group-hover:text-red">
                    {route.cta} →
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
