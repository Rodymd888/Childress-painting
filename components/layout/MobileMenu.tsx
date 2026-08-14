'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone, Mail, ChevronRight, ChevronDown } from 'lucide-react';
import { primaryNav, company } from '@/lib/site';

/**
 * Full-height navigation drawer for tablet and phone.
 * Locks body scroll, traps nothing away from the keyboard, closes on Escape
 * and on navigation, and returns focus to the trigger button.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  /* Which submenu is expanded. Services alone has sixteen entries, so showing
     every child at once would make the drawer thousands of pixels tall. */
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /**
   * Close as a safety net when the route changes.
   *
   * Links also close on click (see `closeMenu` below), which is the path that
   * matters: waiting for `pathname` to change leaves the drawer and its
   * overlay on screen for the whole navigation, and on a slower route that
   * reads as a frozen, unresponsive menu. Belt and braces, because a browser
   * back button changes the route without any click here.
   */
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  /**
   * Body scroll lock.
   *
   * The previous version captured `document.body.style.overflow` on open and
   * restored that value on close. Reopening the drawer while the exit
   * animation was still running captured 'hidden' as the "previous" value, so
   * the next close restored 'hidden' and the page could never scroll again.
   * That is the intermittent freeze.
   *
   * Locking against a known-good constant removes the race entirely: there is
   * no captured state to get out of sync. The scrollbar-width compensation
   * stops the layout jumping when the bar disappears.
   */
  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();

    return () => {
      body.style.overflow = '';
      body.style.paddingRight = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  /**
   * Closing the drawer.
   *
   * Called synchronously on link click so navigation and dismissal happen in
   * the same interaction. No timers: `AnimatePresence` owns the exit
   * animation, and React owns the state.
   */
  function closeMenu() {
    setOpen(false);
    setExpanded(null);
  }

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
        <span className="sr-only">Open Menu</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm xl:hidden"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            <motion.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Site Navigation"
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto bg-ink outline-none xl:hidden"
              initial={reduceMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
                <Link href="/" onClick={closeMenu} aria-label={`${company.name}, home`}>
                  <Image
                    src="/brand/logo-header.png"
                    alt={company.name}
                    width={900}
                    height={373}
                    sizes="106px"
                    className="h-[34px] w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
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
                  {primaryNav.map((item) => {
                    const hasChildren = Boolean(item.children?.length);
                    const isExpanded = expanded === item.href;

                    return (
                      <li key={item.href}>
                        <div className="flex items-stretch border-b border-white/10">
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            aria-current={isActive(item.href) ? 'page' : undefined}
                            className={[
                              'flex min-h-[3.25rem] flex-1 items-center py-2.5 font-display text-xl font-extrabold uppercase tracking-tight transition-colors',
                              isActive(item.href) ? 'text-red-light' : 'text-white hover:text-red-light',
                            ].join(' ')}
                          >
                            {item.label}
                          </Link>

                          {hasChildren ? (
                            /* Separate control so the parent link still
                               navigates — tapping "Services" goes to the
                               index, the chevron opens the list. */
                            <button
                              type="button"
                              onClick={() => setExpanded(isExpanded ? null : item.href)}
                              aria-expanded={isExpanded}
                              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
                              className="tap -mr-1 inline-flex items-center justify-center text-white/50 transition-colors hover:text-white"
                            >
                              <ChevronDown
                                aria-hidden="true"
                                className={[
                                  'size-5 transition-transform duration-300',
                                  isExpanded ? 'rotate-180' : '',
                                ].join(' ')}
                              />
                            </button>
                          ) : (
                            <span className="inline-flex items-center pr-1">
                              <ChevronRight aria-hidden="true" className="size-4 opacity-40" />
                            </span>
                          )}
                        </div>

                        <AnimatePresence initial={false}>
                          {hasChildren && isExpanded && (
                            <motion.ul
                              key="sub"
                              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mb-2 mt-1 space-y-0.5 pl-1">
                                {item.children!.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={closeMenu}
                                    className="flex min-h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
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
                  className="flex min-h-[3.25rem] items-center justify-center bg-red px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-dark"
                >
                  Request a Bid
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
