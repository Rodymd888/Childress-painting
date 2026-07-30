'use client';

import { useMemo, useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import type { Project } from '@/lib/projects';
import type { Industry } from '@/lib/industries';

/**
 * FILTERABLE PORTFOLIO
 * ---------------------------------------------------------------------------
 * Client-side filtering across the whole project set. Deliberately not a photo
 * gallery — projects are organised by market sector, which is how a general
 * contractor actually looks for relevant experience.
 *
 * SCALING: this filters an array. It handles hundreds of records without
 * change. If the set grows past roughly 500, move filtering to a URL search
 * param and paginate — the card and data shapes stay the same.
 */
export function ProjectPortfolio({
  projects,
  industries,
}: {
  projects: Project[];
  industries: Industry[];
}) {
  const [active, setActive] = useState<string>('all');

  /* Only show filters for sectors that actually contain projects. */
  const filters = useMemo(() => {
    const counts = projects.reduce<Record<string, number>>((acc, p) => {
      acc[p.industry] = (acc[p.industry] ?? 0) + 1;
      return acc;
    }, {});

    return [
      { slug: 'all', label: 'All sectors', count: projects.length },
      ...industries
        .filter((i) => counts[i.slug])
        .map((i) => ({ slug: i.slug, label: i.shortTitle, count: counts[i.slug] })),
    ];
  }, [projects, industries]);

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.industry === active)),
    [projects, active],
  );

  return (
    <div>
      {/* ------------------------------------------------------------ FILTERS */}
      <div className="border-y border-line">
        <div
          role="group"
          aria-label="Filter projects by market sector"
          className="flex flex-wrap gap-x-1 gap-y-1 py-4"
        >
          {filters.map((filter) => {
            const selected = filter.slug === active;
            return (
              <button
                key={filter.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter.slug)}
                className={[
                  'group inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-200',
                  selected ? 'bg-ink text-white' : 'text-ink/60 hover:bg-mist hover:text-ink',
                ].join(' ')}
              >
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
        Showing {visible.length} of {projects.length} projects
      </p>

      {/* --------------------------------------------------------------- GRID */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 3} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-body">No projects listed in this sector yet.</p>
      )}
    </div>
  );
}
