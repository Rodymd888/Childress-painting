/**
 * PROJECT OVERRIDES — the curated layer
 * ---------------------------------------------------------------------------
 * `lib/project-media.generated.ts` is rewritten from the Projects/ folder on
 * every build, so nothing there can be hand-edited. This file is where you
 * correct or enrich a folder-discovered project, and it always wins.
 *
 * Use it when the folder name cannot reveal something — most often the market
 * sector. "Gould Evans" is an architecture practice, but nothing in that name
 * says so, and the ingester will not guess.
 *
 * Add real scope, services, and location as they are confirmed. Anything not
 * listed here keeps the ingested value.
 *
 *   'my-project-slug': {
 *     industry: 'office',
 *     name: 'Preferred Display Name',
 *     location: 'Overland Park, Kansas',
 *     serviceTypes: ['interior-painting'],
 *     scopeSummary: 'What the scope actually covered.',
 *   },
 *
 * CHOOSING A DIFFERENT HERO
 * The ingester picks the strongest image automatically. To override it, either
 * rename the source file to `hero.jpg` in its Projects/ folder, or set the
 * image here — this file is spread last, so it beats the generated value:
 *
 *   'my-project-slug': {
 *     featuredImage: {
 *       src: '/images/projects/my-project-slug/03.webp',
 *       alt: 'What the photo shows',
 *       width: 960, height: 720,
 *     },
 *   },
 *
 * Once a project has verified detail, consider moving it into the curated
 * array in lib/projects.ts instead and dropping it from here.
 */

import type { Project } from './projects';

export const projectOverrides: Record<string, Partial<Project>> = {
  /* Architecture and design practice — an office fit-out, not a retail space. */
  'gould-evans': {
    industry: 'office',
    art: 'office',
  },

  /* Event and reception venue: public assembly, fixed event calendar. */
  'union-event-venue': {
    industry: 'sports-entertainment',
    art: 'sports',
  },
};
