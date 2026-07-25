'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { primaryNav, company } from '@/lib/site';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Solid background once the page scrolls past the hero's top edge. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close any open dropdown when the route changes. */
  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  /* Escape closes the dropdown and returns focus to the trigger. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-white/10 bg-navy/95 backdrop-blur-md'
          : 'border-b border-transparent bg-navy/70 backdrop-blur-sm',
      ].join(' ')}
    >
      {/* Utility strip — the phone number stays reachable at every breakpoint. */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="container-site flex h-9 items-center justify-between">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/60">
            Commercial · Industrial · New construction — Dallas–Fort Worth &amp; Texas
          </p>
          <a
            href={`tel:${company.phoneHref}`}
            className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
          >
            <Phone aria-hidden="true" className="size-3 text-red" />
            {company.phone}
          </a>
        </div>
      </div>

      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo light />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(item.href);

              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'relative block px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors',
                        active ? 'text-white' : 'text-white/65 hover:text-white',
                      ].join(' ')}
                    >
                      {item.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-red"
                        />
                      )}
                    </Link>
                  </li>
                );
              }

              const expanded = openMenu === item.label;

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => open(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(expanded ? null : item.label)}
                    className={[
                      'relative flex items-center gap-1.5 px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors',
                      active ? 'text-white' : 'text-white/65 hover:text-white',
                    ].join(' ')}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={[
                        'size-3 transition-transform duration-200',
                        expanded ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-red"
                      />
                    )}
                  </button>

                  {expanded && (
                    <div
                      className="absolute left-0 top-full w-80 border-t-2 border-red bg-white shadow-2xl shadow-navy/25"
                      onMouseEnter={() => open(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <ul className="p-2">
                        <li>
                          <Link
                            href={item.href}
                            className="block px-4 py-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy/60 transition-colors hover:text-red"
                          >
                            All {item.label.toLowerCase()}
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-3 transition-colors hover:bg-mist"
                            >
                              <span className="block text-sm font-semibold text-navy">
                                {child.label}
                              </span>
                              {child.blurb && (
                                <span className="mt-1 block text-[0.8125rem] leading-snug text-body">
                                  {child.blurb}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/request-bid"
            className="hidden min-h-11 items-center bg-red px-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-dark sm:inline-flex"
          >
            Request a bid
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
