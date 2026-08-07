'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/lib/content';

/**
 * INTERACTIVE PROCESS TIMELINE
 * ---------------------------------------------------------------------------
 * Desktop: a horizontal rail of eight steps. Selecting one swaps the detail
 * panel beneath it. Implemented as a proper tablist so arrow keys, Home, and
 * End all work and the relationship is announced correctly.
 *
 * Mobile: the rail becomes a scrollable strip and the panel sits below it, so
 * the same component serves both without a second implementation.
 */
export function ProcessTimeline({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [active, setActive] = useState(0);
  const dark = variant === 'dark';
  const step = processSteps[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = processSteps.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`process-tab-${next}`)?.focus();
  };

  return (
    <div>
      {/* ------------------------------------------------------------- RAIL */}
      <div
        role="tablist"
        aria-label="Our Process, Step by Step"
        onKeyDown={onKeyDown}
        className={[
          'rail flex overflow-x-auto border-t',
          dark ? 'border-white/15' : 'border-line',
        ].join(' ')}
      >
        {processSteps.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.number}
              id={`process-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="process-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={[
                'group relative flex min-w-[8.5rem] flex-1 flex-col items-start gap-2 px-4 py-6 text-left transition-colors duration-300 md:min-w-0 md:px-5',
                dark
                  ? selected
                    ? 'bg-white/[0.07]'
                    : 'hover:bg-white/[0.04]'
                  : selected
                    ? 'bg-mist'
                    : 'hover:bg-mist/60',
              ].join(' ')}
            >
              {/* Progress rule — fills for completed and active steps. */}
              <span
                aria-hidden="true"
                className={[
                  'absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  i <= active ? 'scale-x-100 bg-red' : 'scale-x-0 bg-red',
                ].join(' ')}
              />
              <span
                className={[
                  'font-mono text-[0.6875rem] tracking-[0.16em] transition-colors',
                  selected ? 'text-red' : dark ? 'text-white/45' : 'text-ink/40',
                ].join(' ')}
              >
                {s.number}
              </span>
              <span
                className={[
                  'font-display text-[0.9375rem] font-bold leading-tight tracking-tight transition-colors',
                  selected
                    ? dark
                      ? 'text-white'
                      : 'text-ink'
                    : dark
                      ? 'text-white/60 group-hover:text-white/85'
                      : 'text-ink/55 group-hover:text-ink/80',
                ].join(' ')}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------ PANEL */}
      <div
        id="process-panel"
        role="tabpanel"
        aria-labelledby={`process-tab-${active}`}
        tabIndex={0}
        className={[
          'border-t px-0 py-10 md:py-12',
          dark ? 'border-white/15' : 'border-line',
        ].join(' ')}
      >
        <div key={active} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <span
              className={[
                'block font-display text-display font-black leading-none md:text-[6rem]',
                dark ? 'text-white/12' : 'text-ink/10',
              ].join(' ')}
            >
              {step.number}
            </span>
            <h3
              className={['mt-1 text-h3', dark ? 'text-white' : 'text-ink'].join(' ')}
            >
              {step.title}
            </h3>
            <p
              className={[
                'mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]',
                dark ? 'text-red-light' : 'text-red',
              ].join(' ')}
            >
              {step.short}
            </p>
          </div>

          <div>
            <p
              className={[
                'text-lead leading-relaxed',
                dark ? 'text-ash' : 'text-body',
              ].join(' ')}
            >
              {step.body}
            </p>

            <div
              className={[
                'mt-7 flex items-start gap-3 border-l-2 border-red pl-4',
              ].join(' ')}
            >
              <ArrowRight
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-red"
              />
              <div>
                <p
                  className={[
                    'font-mono text-[0.625rem] uppercase tracking-[0.18em]',
                    dark ? 'text-white/50' : 'text-ink/50',
                  ].join(' ')}
                >
                  What you receive
                </p>
                <p
                  className={[
                    'mt-1.5 text-[0.9375rem] font-medium leading-snug',
                    dark ? 'text-white' : 'text-ink',
                  ].join(' ')}
                >
                  {step.deliverable}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
