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
  /* -------------------------------------------------------------------------
     Folder-discovered projects. The service LINE is definitional (a commercial
     building painted by a commercial painting contractor), so recording it is
     not a claim about scope detail. Anything more specific than this — square
     footage, durations, contract values, the general contractor — stays out
     until the company confirms it.
     ---------------------------------------------------------------------- */

  /* Architecture and design practice: an office fit-out, not a retail space. */
  'gould-evans': {
    industry: 'office',
    art: 'office',
    serviceTypes: ['commercial-painting', 'interior-painting'],
    scopeSummary:
      'Interior finishes through an open-plan studio and meeting spaces for a Kansas City architecture practice.',
  },

  /* Event and reception venue: public assembly, fixed event calendar. */
  'union-event-venue': {
    industry: 'sports-entertainment',
    art: 'sports',
    serviceTypes: ['commercial-painting', 'interior-painting'],
    scopeSummary:
      'Interior painting in a Kansas City event and reception venue, scheduled around a booked calendar.',
  },

  'mckeevers': {
    serviceTypes: ['commercial-painting', 'exterior-painting', 'interior-painting'],
    scopeSummary:
      'Exterior and interior painting for a Kansas City grocery store, worked around trading hours.',
  },

  'stop-n-shop': {
    serviceTypes: ['commercial-painting', 'exterior-painting'],
    scopeSummary:
      'Exterior painting for a Kansas City convenience retail site, staged so the forecourt stayed open.',
  },

  'custom-wood-staining-residential-home': {
    serviceTypes: ['residential-painting', 'custom-wood-staining'],
    scopeSummary:
      'Custom stain-grade finishing on exterior gates and timber detail at a private home in Overland Park.',
  },

  'kcfd-fire-station-15': {
    industry: 'government',
    art: 'government',
    serviceTypes: ['commercial-painting', 'maintenance-painting'],
    scopeSummary:
      'Painting at a Kansas City Fire Department station, phased around a facility that never closes.',
  },

  'shawnee-town-government-buildings': {
    industry: 'government',
    art: 'government',
    serviceTypes: ['commercial-painting', 'exterior-painting'],
    scopeSummary:
      'Painting across municipal buildings for the City of Shawnee, sequenced around public access.',
  },
  /* ---- Projects discovered in the latest media drop -------------------- */

  /* Outdoor power equipment manufacturer: a plant, not a shop. */
  'billy-goat-industries': {
    industry: 'industrial',
    art: 'industrial',
    serviceTypes: ['industrial-painting', 'commercial-painting', 'protective-coatings'],
    scopeSummary:
      'Painting and coatings inside a manufacturing facility in Lee\u2019s Summit, planned around production.',
  },

  /* Federal reserve center: government work, with the documentation that
     comes with it. */
  'us-army-reserve': {
    industry: 'government',
    art: 'government',
    serviceTypes: ['commercial-painting', 'interior-painting', 'maintenance-painting'],
    scopeSummary:
      'Interior painting through a United States Army Reserve facility in Kansas City, phased around an operating site.',
  },

  /* Commercial interior renovation. */
  'brookshire-renovation': {
    industry: 'office',
    art: 'office',
    serviceTypes: ['commercial-painting', 'interior-painting', 'drywall-repair'],
    scopeSummary:
      'Interior renovation painting in Kansas City, with drywall repair carried inside the painting scope.',
  },

  /* Tenant space at Kansas City International. */
  'health-and-beauty-tech': {
    industry: 'aviation',
    art: 'aviation',
    serviceTypes: ['commercial-painting', 'interior-painting'],
    scopeSummary:
      'Tenant interior finishes at Kansas City International Airport, worked around badging and access control.',
  },

  /* Veterinary clinic: healthcare-adjacent, occupied. */
  'meadowbrook-animal-hospital': {
    industry: 'healthcare',
    art: 'healthcare',
    serviceTypes: ['commercial-painting', 'interior-painting', 'maintenance-painting'],
    scopeSummary:
      'Interior painting at a Kansas City veterinary hospital, scheduled around patient care and clinic hours.',
  },
};