'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { primaryNav, company } from '@/lib/site';

/**
 * Full-height navigation drawer for tablet and phone.
 * Locks body scroll, traps nothing away from the keyboard, closes on Escape
 * and on navigation, and returns focus to the trigger button.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    // Move focus into the panel so keyboard users are not left behind it.
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex size-11 items-center justify-center text-white transition-colors hover:text-red-light xl:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[60] bg-navy/70 backdrop-blur-sm xl:hidden"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto bg-navy outline-none xl:hidden"
              initial={reduceMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/60">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="inline-flex size-11 items-center justify-center text-white transition-colors hover:text-red-light"
                >
                  <X aria-hidden="true" className="size-6" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 px-5 py-6">
                <ul className="space-y-1">
                  {primaryNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className={[
                          'flex min-h-12 items-center justify-between border-b border-white/10 py-2 font-display text-xl font-extrabold uppercase tracking-tight transition-colors',
                          isActive(item.href) ? 'text-red-light' : 'text-white hover:text-red-light',
                        ].join(' ')}
                      >
                        {item.label}
                        <ChevronRight aria-hidden="true" className="size-4 opacity-40" />
                      </Link>

                      {item.children && (
                        <ul className="mb-2 mt-1 space-y-0.5 pl-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="flex min-h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/careers"
                      className="flex min-h-12 items-center justify-between border-b border-white/10 py-2 font-display text-xl font-extrabold uppercase tracking-tight text-white transition-colors hover:text-red-light"
                    >
                      Careers
                      <ChevronRight aria-hidden="true" className="size-4 opacity-40" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/subcontractors"
                      className="flex min-h-12 items-center justify-between border-b border-white/10 py-2 font-display text-xl font-extrabold uppercase tracking-tight text-white transition-colors hover:text-red-light"
                    >
                      Subcontractors
                      <ChevronRight aria-hidden="true" className="size-4 opacity-40" />
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="shrink-0 border-t border-white/10 p-5">
                <Link
                  href="/request-bid"
                  className="flex min-h-13 items-center justify-center bg-red px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-dark"
                >
                  Request a bid
                </Link>

                <div className="mt-5 space-y-3">
                  <a
                    href={`tel:${company.phoneHref}`}
                    className="flex min-h-11 items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
                  >
                    <Phone aria-hidden="true" className="size-3.5 text-red" />
                    {company.phone}
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex min-h-11 items-center gap-3 break-all font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
                  >
                    <Mail aria-hidden="true" className="size-3.5 text-red" />
                    {company.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
