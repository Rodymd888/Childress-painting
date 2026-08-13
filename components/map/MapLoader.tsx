'use client';

import dynamic from 'next/dynamic';
import type { MappedProject } from '@/lib/projects';
import type { Industry } from '@/lib/industries';

/**
 * Client boundary for the map.
 *
 * The explorer and Leaflet are loaded dynamically from here, so the mapping
 * library is fetched only when this route is visited. It never enters the
 * shared bundle, which is what keeps the homepage and /projects unaffected by
 * the map existing.
 *
 * `ssr: false` because Leaflet requires a DOM. Nothing is lost: the map page
 * server-renders a full, crawlable list of every mapped location, so search
 * engines and visitors without JavaScript still get the project, address,
 * sector, and city links.
 */
const ProjectMapExplorer = dynamic(
  () => import('./ProjectMapExplorer').then((m) => m.ProjectMapExplorer),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="h-[26rem] w-full animate-pulse border border-line bg-mist sm:h-[32rem] lg:h-[36rem]"
      />
    ),
  },
);

export function MapLoader(props: {
  projects: MappedProject[];
  industries: Industry[];
  states: string[];
}) {
  return <ProjectMapExplorer {...props} />;
}
