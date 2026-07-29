'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { company } from '@/lib/site';

/**
 * HOMEPAGE HERO — v2
 * ---------------------------------------------------------------------------
 * Changes from v1:
 * - The headline is now a masked line reveal (each line rises out from behind
 *   its own clip) rather than a simple fade — reads far more considered.
 * - A "Since 1984" seal sits against the skyline as a standing brand mark.
 * - Trust indicators moved above the fold, framed as capability facts rather
 *   than invented statistics.
 * - Two clearly differentiated CTAs: primary bid action, secondary phone.
 * - Ken Burns drift on the plate, disabled under reduced motion.
 *
 * ⚠️ REPLACE THE IMAGE — /public/images/dallas-hero.jpg is 1188×888, under what
 * a full-bleed hero needs on a large display. Supply a 2400px-wide original.
 */

const LINES = [
  { text: 'Commercial painting', accent: false },
  { text: 'built to the', accent: false },
  { text: 'construction schedule.', accent: true },
];

const TRUST = [
  { label: 'Painting experience', value: 'Since 1984' },
  { label: 'Base', value: 'Dallas–Fort Worth' },
  { label: 'Coverage', value: 'Texas statewide' },
  { label: 'Bid response', value: 'Bid or no-bid' },
];

export function Hero() {
  const reduce = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1] as const;

  const lineVariant = {
    hidden: { y: reduce ? 0 : '110%' },
    visible: (i: number) => ({
      y: 0,
      transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15 + i * 0.1, ease },
    }),
  };

  const fade = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, delay: reduce ? 0 : d, ease },
    }),
  };

  return (
    <section className="relative isolate flex min-h-[40rem] flex-col justify-end overflow-hidden bg-navy pt-28 md:min-h-[46rem] lg:min-h-[calc(100vh-5rem)] lg:pt-36">
      {/* Background plate, with a slow drift that suggests scale. */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: reduce ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduce ? 0 : 14, ease: 'linear' }}
      >
        <Image
          src="/images/dallas-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/88 to-navy/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-transparent to-navy/70"
      />
      <div className="sheet-grid absolute inset-0 -z-10 opacity-50" aria-hidden="true" />

      {/* "Since 1984" seal — a standing brand mark, not a decorative badge. */}
      <motion.div
        custom={1.1}
        variants={fade}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-32 z-10 hidden xl:block 2xl:right-12"
      >
        <div className="relative flex size-32 items-center justify-center rounded-full border border-white/20 backdrop-blur-[2px]">
          <div className="absolute inset-2 rounded-full border border-red/40" />
          <div className="text-center">
            <span className="block font-mono text-[0.5rem] uppercase tracking-[0.25em] text-white/60">
              Est.
            </span>
            <span className="mt-0.5 block font-display text-3xl font-black text-white">1984</span>
            <span className="mt-0.5 block font-mono text-[0.4375rem] uppercase tracking-[0.2em] text-red">
              Family trade
            </span>
          </div>
        </div>
      </motion.div>

      <div className="container-site relative pb-12 md:pb-16 lg:pb-20">
        <motion.span
          custom={0}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="title-block text-white/70"
        >
          Commercial · Industrial · New construction
        </motion.span>

        {/* Masked line reveal: each line rises from behind its own clip. */}
        <h1 className="mt-7 max-w-[20ch] text-display leading-[0.94] text-white">
          {LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                custom={i}
                variants={lineVariant}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {line.accent ? (
                  <>
                    construction <span className="text-red">schedule.</span>
                  </>
                ) : (
                  line.text
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          custom={0.62}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-2xl text-lead leading-relaxed text-steel-light"
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
            className="group relative inline-flex min-h-14 items-center justify-center gap-2.5 overflow-hidden bg-red px-8 font-mono text-xs uppercase tracking-[0.16em] text-white"
          >
            {/* Fill wipes across on hover rather than a flat colour swap. */}
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
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 border border-white/35 px-8 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-navy"
          >
            <Phone aria-hidden="true" className="size-4 text-red transition-colors group-hover:text-red-dark" />
            {company.phone}
          </a>
        </motion.div>
      </div>

      {/* Trust strip — capability facts, framed as a drawing title block. */}
      <motion.div
        custom={0.92}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="relative border-t border-white/15 bg-navy/75 backdrop-blur-md"
      >
        <div className="container-site">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {TRUST.map((item, i) => (
              <div
                key={item.label}
                className={[
                  'group relative py-5 transition-colors duration-300 hover:bg-white/[0.04] md:px-6',
                  i === 0 ? 'md:pl-0' : '',
                  i % 2 === 1 ? 'border-l border-white/12 pl-5 md:pl-6' : '',
                  i < 2 ? 'border-b border-white/12 md:border-b-0' : '',
                  i > 0 ? 'md:border-l md:border-white/12' : '',
                ].join(' ')}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/60">
                  {item.label}
                </dt>
                <dd className="mt-1.5 font-display text-[1.0625rem] font-bold text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
