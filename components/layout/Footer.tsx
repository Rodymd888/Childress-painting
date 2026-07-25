import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { company, footerNav } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy text-white">
      <div aria-hidden="true" className="h-1 bg-red" />

      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-steel-light">
              Commercial painting and industrial coatings for general contractors, developers,
              and facility teams across Dallas–Fort Worth and Texas.
            </p>

            <address className="mt-8 space-y-3 not-italic">
              <a
                href={`tel:${company.phoneHref}`}
                className="flex min-h-11 items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" className="size-3.5 shrink-0 text-red" />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex min-h-11 items-center gap-3 break-all font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" className="size-3.5 shrink-0 text-red" />
                {company.email}
              </a>
              <p className="flex items-start gap-3 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-white/75">
                <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-red" />
                {/* REPLACE — confirm the office address before launch. */}
                {company.address.city}, {company.address.region}
              </p>
            </address>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                {group.heading}
              </h2>
              <ul className="mt-5 space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-9 items-center text-[0.9375rem] text-steel-light transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-white/12 pt-8">
          <p className="max-w-3xl font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-white/60">
            Family painting experience dating to {company.heritageYear}. Licensing, insurance,
            bonding, and certification details are provided on request and are not published on
            this site until verified.
          </p>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/60">
              © {year} {company.legalName}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/privacy"
                className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/request-bid"
                className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
              >
                Request a bid
              </Link>
              <Link
                href="/contact"
                className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
