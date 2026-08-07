import Link from 'next/link';
import { Phone, Mail, MapPin, Linkedin, ArrowRight } from 'lucide-react';
import { LogoFull } from './Logo';
import { company, footerNav, offices } from '@/lib/site';

/**
 * SITE FOOTER
 * ---------------------------------------------------------------------------
 * Three bands: a bid call-to-action, the link matrix with contact details, and
 * a legal strip. Every fact rendered here comes from lib/site.ts.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-white">
      {/* ------------------------------------------------------------- CTA BAND */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red/12 to-transparent"
        />

        <div className="container-site relative py-16 md:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="title-block text-white/60">Ready when you are</span>
              <h2 className="mt-6 text-h2 text-white">
                Send Us the Drawings.
                <br />
                <span className="text-red">We&rsquo;ll Send You a Number.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lead leading-relaxed text-ash">
                Bid or no-bid, you get an answer. Scope, assumptions, and exclusions in
                writing — so there is nothing to discover during construction.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/request-bid"
                className="group relative inline-flex min-h-14 items-center justify-center gap-2.5 overflow-hidden bg-red px-8 font-mono text-xs uppercase tracking-[0.16em] text-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-red-dark transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <span className="relative">Request a bid</span>
                <ArrowRight
                  aria-hidden="true"
                  className="relative size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a
                href={`tel:${company.phoneHref}`}
                className="inline-flex min-h-14 items-center justify-center gap-2.5 border border-white/30 px-8 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-ink"
              >
                <Phone aria-hidden="true" className="size-4 text-red" />
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- LINK MATRIX */}
      <div className="container-site py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2.6fr)]">
          {/* Identity + contact */}
          <div>
            <LogoFull light width={230} />

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash">
              Commercial, residential, and industrial painting for general contractors,
              developers, facility teams, and homeowners — since {company.heritageYear}.
            </p>

            {/* Both operating locations. Driven by `offices` in lib/site.ts. */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7">
              {offices.map((office) => (
                <address key={office.id} className="not-italic">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    {office.label}
                    <span className="ml-2 text-white/35">{office.role}</span>
                  </p>

                  <p className="mt-3 flex items-start gap-3 text-sm text-ash">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
                    <span>
                      {office.street}
                      <br />
                      {office.city}, {office.region} {office.postalCode}
                    </span>
                  </p>

                  <a
                    href={`tel:${office.phoneHref}`}
                    className="group mt-2.5 flex items-start gap-3 text-sm text-white/85 transition-colors hover:text-white"
                  >
                    <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
                    <span className="underline-sweep">{office.phone}</span>
                  </a>
                </address>
              ))}

              <a
                href={`mailto:${company.email}`}
                className="group flex items-start gap-3 text-sm text-white/85 transition-colors hover:text-white sm:col-span-2 lg:col-span-1"
              >
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
                <span className="underline-sweep break-all">{company.email}</span>
              </a>
            </div>

            {company.social.linkedin && (
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex size-10 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-red hover:bg-red hover:text-white"
                aria-label={`${company.name} on LinkedIn`}
              >
                <Linkedin aria-hidden="true" className="size-4" />
              </a>
            )}
          </div>

          {/* Navigation columns */}
          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  {group.heading}
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.8125rem] leading-snug text-ash transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ LEGAL STRIP */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-silver">
            © {year} {company.legalName} · Licensed, bonded &amp; insured
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-silver">
            Quality painting. Professional results.
          </p>
        </div>
      </div>
    </footer>
  );
}
