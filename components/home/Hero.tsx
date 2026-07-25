'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { company } from '@/lib/site';

/**
 * HOMEPAGE HERO
 * ---------------------------------------------------------------------------
 * ⚠️ REPLACE THE IMAGE — /public/images/dallas-hero.jpg is 1188×888, which is
 * below what a full-bleed hero needs on a large display. Supply a 2400px-wide
 * original (ideally a Childress project or DFW commercial site) and keep the
 * filename, or update `src` here.
 *
 * The headline animates in as an orchestrated sequence on load; everything
 * collapses to a static render when reduced motion is requested.
 */

const LINES = ['Commercial painting', 'built to the', 'construction schedule.'];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const line = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 36 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.75,
        delay: reduceMotion ? 0 : 0.12 + i * 0.11,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const fade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay },
    }),
  };

  return (
    <section className="relative isolate flex min-h-[38rem] flex-col justify-end overflow-hidden bg-navy pt-28 md:min-h-[44rem] lg:min-h-[calc(100vh-5rem)] lg:pt-36">
      {/* Background plate ------------------------------------------------ */}
      <Image
        src="/images/dallas-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={82}
        className="-z-20 object-cover object-center"
      />

      {/* Two-stop scrim: keeps the left column legible while the skyline
          stays visible on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-transparent to-navy/60"
      />
      <div className="sheet-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      {/* Content --------------------------------------------------------- */}
      <div className="container-site relative pb-14 md:pb-20 lg:pb-24">
        <motion.span
          custom={0}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="title-block text-white/70"
        >
          Commercial · Industrial · New construction
        </motion.span>

        <h1 className="mt-7 max-w-[22ch] text-[clamp(2.5rem,8.2vw,6.5rem)] leading-[0.94] text-white">
          {LINES.map((text, i) => (
            <motion.span
              key={text}
              custom={i}
              variants={line}
              initial="hidden"
              animate="visible"
              className="block"
            >
              {i === 2 ? (
                <>
                  construction <span className="text-red">schedule.</span>
                </>
              ) : (
                text
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          custom={0.62}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-2xl text-lg leading-relaxed text-steel-light md:text-xl"
        >
          Childress Painting bids, staffs, and closes out Division 09 work for general
          contractors, developers, and facility teams across Dallas–Fort Worth and Texas — on
          new builds, in operating plants, and inside buildings that never stop running.
        </motion.p>

        <motion.div
          custom={0.74}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        >
          <Link
            href="/request-bid"
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 bg-red px-7 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-dark"
          >
            Request a bid
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-14 items-center justify-center border border-white/35 px-7 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-navy"
          >
            What we self-perform
          </Link>
        </motion.div>
      </div>

      {/* Title-block strip — the signature device, anchored to the sheet edge */}
      <motion.div
        custom={0.9}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="relative border-t border-white/15 bg-navy/70 backdrop-blur-sm"
      >
        <div className="container-site">
          <dl className="grid grid-cols-2 divide-white/12 md:grid-cols-4 md:divide-x">
            {[
              { k: 'Base', v: 'Dallas–Fort Worth' },
              { k: 'Coverage', v: 'Texas statewide' },
              { k: 'Experience since', v: String(company.heritageYear) },
              { k: 'Delivery', v: 'GC subcontract & direct' },
            ].map((item, i) => (
              <div
                key={item.k}
                className={[
                  'py-5 md:px-6',
                  i === 0 ? 'md:pl-0' : '',
                  i % 2 === 1 ? 'border-l border-white/12 pl-5 md:pl-6' : '',
                  i < 2 ? 'border-b border-white/12 md:border-b-0' : '',
                ].join(' ')}
              >
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/60">
                  {item.k}
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] font-medium text-white">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      {/* Scroll affordance, hidden on short viewports where it would crowd. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-32 right-6 hidden items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/60 lg:flex"
      >
        Scroll
        <ArrowDown className="size-3 animate-bounce" />
      </div>
    </section>
  );
}
