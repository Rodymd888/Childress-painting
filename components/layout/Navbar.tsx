'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { primaryNav, company } from '@/lib/site';

/**
 * PRIMARY NAVIGATION
 * ---------------------------------------------------------------------------
 * Transparent over the hero, solid once scrolled. Dropdowns open on hover with
 * a close delay (so the pointer can cross the gap) and on click for keyboard
 * and touch. Escape closes; route change closes.
 *
 * Wide menus (Industries) render in two columns so a ten-item list does not
 * become a scrolling column.
 */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

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
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-white/10 bg-ink/95 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-ink/80 to-transparent',
      ].join(' ')}
    >
      {/* Utility strip — phone and location stay reachable at desktop widths. */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="container-site flex h-9 items-center justify-between">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/55">
            Commercial painting specialists · Since 1984 · Licensed, bonded &amp; insured
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/55">
              <MapPin aria-hidden="true" className="size-3 text-red" />
              {company.address.city}, {company.address.region}
            </span>
            <a
              href={`tel:${company.phoneHref}`}
              className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
            >
              <Phone aria-hidden="true" className="size-3 text-red" />
              {company.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo light />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
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
              const wide = item.children.length > 7;

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
                      className={[
                        'absolute left-0 top-full border-t-2 border-red bg-white shadow-[var(--shadow-menu)]',
                        wide ? 'w-[34rem]' : 'w-80',
                      ].join(' ')}
                      onMouseEnter={() => open(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="border-b border-line px-4 py-3">
                        <Link
                          href={item.href}
                          className="group inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink/55 transition-colors hover:text-red"
                        >
                          View all {item.label.toLowerCase()}
                          <span
                            aria-hidden="true"
                            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      </div>

                      <ul className={['p-2', wide ? 'grid grid-cols-2 gap-x-2' : ''].join(' ')}>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-3 transition-colors hover:bg-mist"
                            >
                              <span className="block text-sm font-semibold text-ink">
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
            className="group relative hidden min-h-11 items-center overflow-hidden bg-red px-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white sm:inline-flex"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-red-dark transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <span className="relative">Request a bid</span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
