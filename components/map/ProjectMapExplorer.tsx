'use client';

import { useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Search, ExternalLink, ArrowUpRight, X, List, Map as MapIcon } from 'lucide-react';
import type { MappedProject } from '@/lib/projects';
import type { Industry } from '@/lib/industries';
import { ProjectMapCanvas } from './ProjectMapCanvas';

/**
 * PROJECT MAP EXPLORER
 * ---------------------------------------------------------------------------
 * Two synchronized views of the same canonical data: a scrollable project list
 * and an interactive map. Hovering either side highlights the other; selecting
 * either opens the detail card.
 *
 * PAYLOAD
 * This receives `MappedProject`, the lightweight card projection plus stored
 * coordinates. No galleries and no video are sent here.
 *
 * MAP LOADING
 * The map library itself lives in ProjectMapCanvas, which is dynamically
 * imported by the parent route. Nothing map-related reaches the global bundle,
 * so the homepage does not pay for this feature existing.
 *
 * ACCESSIBILITY
 * The list is the accessible equivalent of the map: real buttons, keyboard
 * reachable, screen-reader readable, and it works with the map absent. Nothing
 * here depends on hover.
 */
export function ProjectMapExplorer({
  projects,
  industries,
  states,
}: {
  projects: MappedProject[];
  industries: Industry[];
  states: string[];
}) {
  const [sector, setSector] = useState('all');
  const [state, setState] = useState('all');
  const [query, setQuery] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');

  const sectorFilters = useMemo(() => {
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

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (sector !== 'all' && p.industry !== sector) return false;
      if (state !== 'all' && p.stateName !== state) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.stateName.toLowerCase().includes(q) ||
        p.industry.toLowerCase().includes(q)
      );
    });
  }, [projects, sector, state, query]);

  const selectedProject = useMemo(
    () => visible.find((p) => p.slug === selected) ?? null,
    [visible, selected],
  );

  const onSelect = useCallback((slug: string | null) => setSelected(slug), []);

  const chip = (active: boolean) =>
    [
      'inline-flex min-h-11 shrink-0 items-center gap-2 px-4 py-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] transition-colors duration-200',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red active:scale-[0.97]',
      active ? 'bg-ink text-white' : 'text-ink/70 hover:bg-mist hover:text-ink',
    ].join(' ');

  return (
    <div>
      {/* ------------------------------------------------------------ FILTERS */}
      <div className="border-y border-line">
        <div className="rail -mx-5 flex snap-x gap-1 overflow-x-auto px-5 py-3 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {sectorFilters.map((f) => (
            <button
              key={f.slug}
              type="button"
              aria-pressed={f.slug === sector}
              onClick={() => setSector(f.slug)}
              className={`relative ${chip(f.slug === sector)}`}
            >
              {f.slug === sector && (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-red" />
              )}
              {f.label}
              <span
                className={`text-[0.625rem] tabular-nums ${
                  f.slug === sector ? 'text-red-light' : 'text-ink/35'
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-b border-line py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="rail -mx-5 flex snap-x gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {['all', ...states].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={s === state}
              onClick={() => setState(s)}
              className={`relative ${chip(s === state)}`}
            >
              {s === state && (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-red" />
              )}
              {s === 'all' ? 'All Locations' : s}
            </button>
          ))}
        </div>

        <label className="relative flex min-w-0 items-center sm:w-64">
          <Search aria-hidden="true" className="absolute left-3 size-4 text-ink/40" />
          <span className="sr-only">Search projects by name, city, state, or sector</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, city, or sector"
            className="min-h-11 w-full border border-line bg-white py-2 pl-9 pr-3 text-[0.875rem] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink"
          />
        </label>
      </div>

      {/* Mobile view switch: map and list side by side is cramped under 768px. */}
      <div className="mt-4 flex gap-1 lg:hidden">
        {(['map', 'list'] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={mobileView === v}
            onClick={() => setMobileView(v)}
            className={`flex-1 ${chip(mobileView === v)} justify-center`}
          >
            {v === 'map' ? (
              <MapIcon aria-hidden="true" className="size-3.5" />
            ) : (
              <List aria-hidden="true" className="size-3.5" />
            )}
            {v === 'map' ? 'Map' : 'List'}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink/55">
        {visible.length} {visible.length === 1 ? 'Location' : 'Locations'} Shown
      </p>

      {/* --------------------------------------------------------- MAP + LIST */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-6">
        {/* LIST */}
        <div className={mobileView === 'list' ? 'block' : 'hidden lg:block'}>
          <ul className="max-h-[32rem] space-y-px overflow-y-auto border border-line bg-line lg:max-h-[36rem]">
            {visible.map((p) => (
              <li key={p.slug} className="bg-white">
                <button
                  type="button"
                  onMouseEnter={() => setHovered(p.slug)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(p.slug)}
                  onBlur={() => setHovered(null)}
                  onClick={() => onSelect(p.slug)}
                  aria-pressed={selected === p.slug}
                  className={[
                    'flex w-full items-center gap-3 p-3 text-left transition-colors',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red',
                    selected === p.slug || hovered === p.slug ? 'bg-mist' : 'hover:bg-mist',
                  ].join(' ')}
                >
                  <span className="relative size-14 shrink-0 overflow-hidden bg-ink">
                    {p.cover ? (
                      <Image
                        src={p.cover.src}
                        alt=""
                        fill
                        sizes="56px"
                        quality={65}
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center">
                        <MapPin aria-hidden="true" className="size-4 text-red" />
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[0.9375rem] font-bold tracking-tight text-ink">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[0.8125rem] text-ink/60">
                      {p.city}, {p.state}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-red">
                    {industries.find((i) => i.slug === p.industry)?.shortTitle ?? p.industry}
                  </span>
                </button>
              </li>
            ))}
            {visible.length === 0 && (
              <li className="bg-white p-6 text-center text-[0.875rem] text-body">
                No mapped locations match this filter.
              </li>
            )}
          </ul>
        </div>

        {/* MAP */}
        <div className={mobileView === 'map' ? 'block' : 'hidden lg:block'}>
          <ProjectMapCanvas
            projects={visible}
            hovered={hovered}
            selected={selected}
            onHover={setHovered}
            onSelect={onSelect}
          />
        </div>
      </div>

      {/* ------------------------------------------------------- DETAIL CARD */}
      {selectedProject && (
        <div
          role="dialog"
          aria-label={`${selectedProject.name} details`}
          className="fixed inset-x-0 bottom-0 z-[65] border-t-2 border-red bg-white p-5 shadow-2xl lg:static lg:mt-6 lg:border lg:border-line lg:border-t-2 lg:p-6 lg:shadow-none"
        >
          <button
            type="button"
            onClick={() => onSelect(null)}
            aria-label="Close project details"
            className="tap absolute right-3 top-3 inline-flex items-center justify-center text-ink/50 transition-colors hover:text-ink"
          >
            <X aria-hidden="true" className="size-5" />
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            {selectedProject.cover && (
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-ink sm:w-52">
                <Image
                  src={selectedProject.cover.src}
                  alt={selectedProject.cover.alt}
                  fill
                  sizes="(min-width: 640px) 208px, 100vw"
                  quality={75}
                  className="object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red">
                {industries.find((i) => i.slug === selectedProject.industry)?.title ??
                  selectedProject.industry}
              </span>
              <h3 className="mt-2 pr-8 text-h4 text-ink">{selectedProject.name}</h3>
              <p className="mt-2 flex items-start gap-1.5 text-[0.875rem] leading-snug text-body">
                <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-red" />
                {selectedProject.fullAddress}
              </p>
              <p className="mt-2.5 line-clamp-3 text-[0.875rem] leading-relaxed text-body">
                {selectedProject.scopeSummary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/projects/${selectedProject.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 bg-ink px-5 py-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red"
                >
                  View Project
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedProject.fullAddress,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 border border-line px-5 py-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-mist"
                >
                  View Location
                  <ExternalLink aria-hidden="true" className="size-3.5 text-red" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
