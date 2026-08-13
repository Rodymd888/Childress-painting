'use client';

import { useMemo, useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import type { ProjectCardData } from '@/lib/projects';
import type { Industry } from '@/lib/industries';

/**
 * FILTERABLE PORTFOLIO
 * ---------------------------------------------------------------------------
 * Client-side filtering across the whole project set. Deliberately not a photo
 * gallery — projects are organized by market sector, which is how a general
 * contractor actually looks for relevant experience.
 *
 * PAYLOAD: this is a client component, so everything passed in is serialized
 * into the RSC flight payload and rehydrated in the browser. It therefore takes
 * `ProjectCardData`, a projection carrying only what a card draws. Passing full
 * project records shipped every gallery array and video to render a grid of
 * covers, which is what made this route slow.
 *
 * SCALING: this filters an array and handles hundreds of records. Past roughly
 * 500, move filtering to a URL search param and paginate; the shapes hold.
 */
export function ProjectPortfolio({
  projects,
  industries,
}: {
  projects: ProjectCardData[];
  industries: Industry[];
}) {
  const [active, setActive] = useState<string>('all');

  /* Rendering all fifty-plus cards at once put roughly 150KB of markup in the
     document and made hydration expensive. Eighteen fills the viewport several
     times over on any device; the rest arrive on request. Filtering resets the
     window so a sector never opens half-shown. */
  const PAGE = 18;
  const [shown, setShown] = useState(PAGE);

  /* Only show filters for sectors that actually contain projects. */
  const filters = useMemo(() => {
    const counts = projects.reduce<Record<string, number>>((acc, p) => {
      acc[p.industry] = (acc[p.industry] ?? 0) + 1;
      return acc;
    }, {});

    return [
      { slug: 'all', label: 'All Sectors', count: projects.length },
      ...industries
        .filter((i) => counts[i.slug])
        .map((i) => ({ slug: i.slug, label: i.shortTitle, count: counts[i.slug] })),
    ];
  }, [projects, industries]);

  const matching = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.industry === active)),
    [projects, active],
  );

  const visible = useMemo(() => matching.slice(0, shown), [matching, shown]);
  const remaining = matching.length - visible.length;

  function selectFilter(slug: string) {
    setActive(slug);
    setShown(PAGE);
  }

  return (
    <div>
      {/* ------------------------------------------------------------ FILTERS */}
      <div className="border-y border-line">
        <div
          role="group"
          aria-label="Filter Projects by Market Sector"
          /* On a phone thirteen chips would wrap to four rows and push the
             work below the fold, so they become a single swipeable rail.
             From md they wrap as before. */
          className="rail -mx-5 flex snap-x gap-1 overflow-x-auto px-5 py-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          {filters.map((filter) => {
            const selected = filter.slug === active;
            return (
              <button
                key={filter.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => selectFilter(filter.slug)}
                className={[
                  'group relative inline-flex min-h-11 shrink-0 items-center gap-2 px-4 py-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] transition-colors duration-200',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red',
                  'active:scale-[0.97]',
                  selected
                    ? 'bg-ink text-white'
                    : 'text-ink/70 hover:bg-mist hover:text-ink',
                ].join(' ')}
              >
                {selected && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-red"
                  />
                )}
                {filter.label}
                <span
                  className={[
                    'text-[0.625rem] tabular-nums',
                    selected ? 'text-red-light' : 'text-ink/35',
                  ].join(' ')}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------- COUNT */}
      <p
        aria-live="polite"
        className="mt-8 flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink/55"
      >
        <LayoutGrid aria-hidden="true" className="size-3.5 text-red" />
        Showing {visible.length} of {matching.length}
        {active === 'all' ? ' projects' : ' projects in this sector'}
      </p>

      {/* --------------------------------------------------------------- GRID */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 3} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="group inline-flex min-h-12 items-center gap-3 border-2 border-ink px-7 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red active:scale-[0.98]"
          >
            Load {Math.min(remaining, PAGE)} More
            <span className="text-red transition-colors group-hover:text-red-light">
              {remaining} Remaining
            </span>
          </button>
        </div>
      )}

      {visible.length === 0 && (
        <p className="mt-12 text-center text-body">No projects listed in this sector yet.</p>
      )}
    </div>
  );
}
