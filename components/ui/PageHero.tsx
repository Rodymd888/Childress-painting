import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

type Props = {
  /** Mono label in the title block, e.g. 'CSI 09 96 00' or 'SECTOR / HC'. */
  label: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  /** Optional stat or spec strip pinned to the bottom of the hero. */
  meta?: { label: string; value: string }[];
  children?: ReactNode;
};

/**
 * Shared hero for every page except the homepage. Fixed vertical rhythm and
 * a reserved height keep the header from shifting between routes.
 */
export function PageHero({ label, title, intro, crumbs, meta, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="sheet-grid absolute inset-0" aria-hidden="true" />
      {/* Ambient red wash, kept low-contrast so text stays legible. */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-red/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red to-transparent opacity-60"
      />

      <div className="container-site relative pb-16 pt-32 md:pb-20 md:pt-40 lg:pb-24 lg:pt-44">
        <Breadcrumbs crumbs={crumbs} />

        <span className="title-block mt-8 text-white/70">{label}</span>

        <h1 className="mt-5 max-w-5xl text-[clamp(2.5rem,7vw,5.25rem)]">{title}</h1>

        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-light md:text-xl">
            {intro}
          </p>
        )}

        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}

        {meta && meta.length > 0 && (
          <dl className="mt-12 grid grid-cols-1 gap-px border-t border-white/15 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="bg-navy py-5 sm:px-5 sm:first:pl-0">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/60">
                  {item.label}
                </dt>
                <dd className="mt-2 text-[0.9375rem] font-medium text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
