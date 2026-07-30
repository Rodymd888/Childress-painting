'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone, ChevronDown } from 'lucide-react';
import { company } from '@/lib/site';

/**
 * HOMEPAGE HERO — cinematic video
 * ===========================================================================
 * DROP YOUR DRONE FOOTAGE HERE
 * ---------------------------------------------------------------------------
 *   /public/video/hero-drone.mp4     H.264 · 1920×1080 · ~8–12 Mbps · muted
 *   /public/video/hero-drone.webm    (optional) VP9 — smaller, served first
 *   /public/images/hero-poster.jpg   first frame, 1920px wide
 *
 * The component degrades gracefully at every step:
 *   • No video file present  → the poster image renders as a still hero.
 *   • Video errors or stalls → falls back to the poster automatically.
 *   • Reduced-motion enabled → video never plays; poster is used.
 *   • Slow connection        → poster shows until the video can play through.
 *
 * That means the page is correct today, before the footage is added, and
 * upgrades itself the moment the file lands in /public/video.
 * ===========================================================================
 */

const HEADLINE = [
  'Commercial painting',
  'held to the',
  { text: 'construction schedule.', accent: true },
] as const;

const TRUST = [
  { label: 'Commercial experience', value: 'Since 1984' },
  { label: 'Coating systems', value: 'Sherwin-Williams' },
  { label: 'Workmanship warranty', value: 'Two years' },
  { label: 'Shift capability', value: 'Day · Night · Occupied' },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* Trigger the entrance sequence on mount rather than on scroll. */
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onReady = () => {
      setVideoReady(true);
      void el.play().catch(() => setVideoReady(false));
    };

    if (el.readyState >= 3) onReady();
    else el.addEventListener('canplay', onReady, { once: true });

    el.addEventListener('error', () => setVideoReady(false));
    return () => el.removeEventListener('canplay', onReady);
  }, []);

  const step = (i: number) =>
    ({
      transitionDelay: `${i * 90}ms`,
    }) as const;

  return (
    <section className="relative isolate flex min-h-[42rem] flex-col justify-end overflow-hidden bg-ink pt-28 md:min-h-[48rem] lg:min-h-[calc(100vh-2.25rem)] lg:pt-36">
      {/* ---------------------------------------------------------- BACKPLATE */}
      {/* Poster is always mounted. The video fades over it once it can play. */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          className="scale-105 object-cover object-center"
        />
      </div>

      <video
        ref={videoRef}
        className={[
          'absolute inset-0 -z-20 size-full object-cover object-center transition-opacity duration-1000',
          videoReady ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        poster="/images/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/video/hero-drone.webm" type="video/webm" />
        <source src="/video/hero-drone.mp4" type="video/mp4" />
      </video>

      {/* ------------------------------------------------------------ SCRIM */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/88 to-ink/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/25 to-ink/75"
      />
      <div className="sheet-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      {/* ------------------------------------------------------ SINCE 1984 SEAL */}
      <div
        aria-hidden="true"
        style={step(9)}
        className={[
          'pointer-events-none absolute right-6 top-36 z-10 hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] xl:block 2xl:right-12',
          loaded ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        ].join(' ')}
      >
        <div className="relative flex size-36 items-center justify-center rounded-full border border-white/20 backdrop-blur-[2px]">
          <div className="absolute inset-2 rounded-full border border-red/45" />
          <div className="text-center">
            <span className="block font-mono text-[0.5rem] uppercase tracking-[0.28em] text-white/60">
              Established
            </span>
            <span className="mt-1 block font-display text-4xl font-black leading-none text-white">
              1984
            </span>
            <span className="mt-1.5 block font-mono text-[0.4375rem] uppercase tracking-[0.2em] text-red-light">
              Commercial only
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- CONTENT */}
      <div className="container-site relative pb-14 md:pb-18 lg:pb-24">
        <span
          style={step(0)}
          className={[
            'title-block text-white/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          ].join(' ')}
        >
          Commercial painting specialists · Dallas–Fort Worth
        </span>

        <h1 className="mt-7 max-w-[19ch] text-display leading-[0.93] text-white">
          {HEADLINE.map((line, i) => {
            const text = typeof line === 'string' ? line : line.text;
            const accent = typeof line !== 'string' && line.accent;
            return (
              <span key={text} className="block overflow-hidden pb-[0.06em]">
                <span
                  className="block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transitionDelay: `${150 + i * 110}ms`,
                    transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                  }}
                >
                  {accent ? (
                    <>
                      construction <span className="text-red">schedule.</span>
                    </>
                  ) : (
                    text
                  )}
                </span>
              </span>
            );
          })}
        </h1>

        <p
          style={{ transitionDelay: '620ms' }}
          className={[
            'mt-8 max-w-2xl text-lead leading-relaxed text-ash transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          ].join(' ')}
        >
          Four decades of commercial-only work for general contractors, developers, and
          facility teams — national retail and restaurant rollouts, healthcare and school
          programs, industrial coatings, and tenant finish-outs. We make the
          superintendent&rsquo;s job easier.
        </p>

        <div
          style={{ transitionDelay: '740ms' }}
          className={[
            'mt-10 flex flex-col gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:flex-row sm:flex-wrap',
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          ].join(' ')}
        >
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
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 border border-white/35 px-8 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
          >
            <Phone
              aria-hidden="true"
              className="size-4 text-red transition-colors group-hover:text-red-dark"
            />
            Call {company.phone}
          </a>
        </div>
      </div>

      {/* -------------------------------------------------------- TRUST STRIP */}
      <div
        style={{ transitionDelay: '880ms' }}
        className={[
          'relative border-t border-white/15 bg-ink/70 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        ].join(' ')}
      >
        <div className="container-site">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {TRUST.map((item, i) => (
              <div
                key={item.label}
                className={[
                  'group relative py-5 transition-colors duration-300 hover:bg-white/[0.05] md:px-6',
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
      </div>

      {/* --------------------------------------------------------- SCROLL HINT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-40 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <ChevronDown className="scroll-hint size-6 text-white/45" />
      </div>
    </section>
  );
}
