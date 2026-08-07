/**
 * PROJECT IMAGES — static, committed, and self-sufficient.
 * ---------------------------------------------------------------------------
 * Every path below points at a real file committed under
 * public/images/projects/. Nothing regenerates this at build time, so a
 * deploy can never wipe it.
 *
 * Produced by scripts/build-project-images.mjs. To add or replace photos, run
 * `npm run build:images -- "/path/to/Projects"` locally and commit the result,
 * or drop files into public/images/projects/<folder>/ and add the entry here
 * by hand — width and height must match the real file to avoid layout shift.
 */

export type ProjectImageRef = { src: string; alt: string; width: number; height: number };
export type ProjectImageSet = { folder: string; hero: ProjectImageRef; gallery: ProjectImageRef[] };
export type DiscoveredProject = { slug: string; name: string; industry: string; location?: string; art: string };

/** Photography keyed by project slug. */
export const projectImages: Record<string, ProjectImageSet> = {
  'aldi': {
    folder: 'aldi-kansas-city',
    hero: { src: '/images/projects/aldi-kansas-city/hero.jpg', alt: 'Painting work by Childress Painting at Aldi, Kansas City', width: 960, height: 720 },
    gallery: [
      { src: '/images/projects/aldi-kansas-city/01.jpg', alt: 'Painting work by Childress Painting at Aldi, Kansas City — photo 2', width: 960, height: 720 },
      { src: '/images/projects/aldi-kansas-city/02.jpg', alt: 'Painting work by Childress Painting at Aldi, Kansas City — photo 3', width: 960, height: 720 },
      { src: '/images/projects/aldi-kansas-city/03.jpg', alt: 'Painting work by Childress Painting at Aldi, Kansas City — photo 4', width: 960, height: 720 },
      { src: '/images/projects/aldi-kansas-city/04.jpg', alt: 'Painting work by Childress Painting at Aldi, Kansas City — photo 5', width: 960, height: 720 },
    ],
  },
  'custom-wood-staining-residential-home': {
    folder: 'custom-wood-staining-overland-park',
    hero: { src: '/images/projects/custom-wood-staining-overland-park/hero.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park', width: 680, height: 510 },
    gallery: [
      { src: '/images/projects/custom-wood-staining-overland-park/01.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 2', width: 680, height: 426 },
      { src: '/images/projects/custom-wood-staining-overland-park/02.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 3', width: 680, height: 382 },
      { src: '/images/projects/custom-wood-staining-overland-park/03.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 4', width: 680, height: 382 },
      { src: '/images/projects/custom-wood-staining-overland-park/04.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 5', width: 680, height: 510 },
      { src: '/images/projects/custom-wood-staining-overland-park/05.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 6', width: 680, height: 510 },
      { src: '/images/projects/custom-wood-staining-overland-park/06.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 7', width: 680, height: 510 },
      { src: '/images/projects/custom-wood-staining-overland-park/07.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 8', width: 680, height: 382 },
      { src: '/images/projects/custom-wood-staining-overland-park/08.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 9', width: 680, height: 510 },
      { src: '/images/projects/custom-wood-staining-overland-park/09.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 10', width: 680, height: 380 },
      { src: '/images/projects/custom-wood-staining-overland-park/10.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 11', width: 680, height: 510 },
      { src: '/images/projects/custom-wood-staining-overland-park/11.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 12', width: 680, height: 261 },
      { src: '/images/projects/custom-wood-staining-overland-park/12.jpg', alt: 'Painting work by Childress Painting at Custom Wood Staining (Residential Home), Overland Park — photo 13', width: 680, height: 382 },
    ],
  },
  'freddys-frozen-custard': {
    folder: 'freddys-frozen-custard-kansas-city',
    hero: { src: '/images/projects/freddys-frozen-custard-kansas-city/hero.jpg', alt: 'Painting work by Childress Painting at Freddy\'s Frozen Custad & Steakburgers, Kansas City', width: 720, height: 960 },
    gallery: [
      { src: '/images/projects/freddys-frozen-custard-kansas-city/01.jpg', alt: 'Painting work by Childress Painting at Freddy\'s Frozen Custad & Steakburgers, Kansas City — photo 2', width: 720, height: 960 },
      { src: '/images/projects/freddys-frozen-custard-kansas-city/02.jpg', alt: 'Painting work by Childress Painting at Freddy\'s Frozen Custad & Steakburgers, Kansas City — photo 3', width: 540, height: 960 },
    ],
  },
  'gordon-ramsay-steakhouse': {
    folder: 'gordon-ramsay-steakhouse-kansas-city',
    hero: { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/hero.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City', width: 960, height: 866 },
    gallery: [
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/01.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 2', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/02.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 3', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/03.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 4', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/04.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 5', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/05.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 6', width: 720, height: 960 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/06.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 7', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/07.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 8', width: 746, height: 960 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/08.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 9', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/09.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 10', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/10.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 11', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/11.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 12', width: 960, height: 720 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/12.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 13', width: 560, height: 960 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/13.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 14', width: 720, height: 960 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/14.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 15', width: 720, height: 960 },
      { src: '/images/projects/gordon-ramsay-steakhouse-kansas-city/15.jpg', alt: 'Painting work by Childress Painting at Gordon Ramsay\'s Steakhouse, Kansas City — photo 16', width: 960, height: 906 },
    ],
  },
  'gould-evans': {
    folder: 'gould-evans-kansas-city',
    hero: { src: '/images/projects/gould-evans-kansas-city/hero.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City', width: 900, height: 506 },
    gallery: [
      { src: '/images/projects/gould-evans-kansas-city/01.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 2', width: 900, height: 508 },
      { src: '/images/projects/gould-evans-kansas-city/02.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 3', width: 900, height: 506 },
      { src: '/images/projects/gould-evans-kansas-city/03.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 4', width: 900, height: 506 },
      { src: '/images/projects/gould-evans-kansas-city/04.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 5', width: 900, height: 506 },
      { src: '/images/projects/gould-evans-kansas-city/05.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 6', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/06.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 7', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/07.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 8', width: 900, height: 508 },
      { src: '/images/projects/gould-evans-kansas-city/08.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 9', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/09.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 10', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/10.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 11', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/11.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 12', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/12.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 13', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/13.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 14', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/14.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 15', width: 900, height: 508 },
      { src: '/images/projects/gould-evans-kansas-city/15.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 16', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/16.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 17', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/17.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 18', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/18.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 19', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/19.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 20', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/20.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 21', width: 900, height: 508 },
      { src: '/images/projects/gould-evans-kansas-city/21.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 22', width: 900, height: 506 },
      { src: '/images/projects/gould-evans-kansas-city/22.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 23', width: 900, height: 507 },
      { src: '/images/projects/gould-evans-kansas-city/23.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 24', width: 900, height: 506 },
      { src: '/images/projects/gould-evans-kansas-city/24.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 25', width: 900, height: 508 },
      { src: '/images/projects/gould-evans-kansas-city/25.jpg', alt: 'Painting work by Childress Painting at Gould Evans, Kansas City — photo 26', width: 900, height: 506 },
    ],
  },
  'mckeevers': {
    folder: 'mckeevers-kansas-city',
    hero: { src: '/images/projects/mckeevers-kansas-city/hero.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City', width: 960, height: 792 },
    gallery: [
      { src: '/images/projects/mckeevers-kansas-city/01.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 2', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/02.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 3', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/03.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 4', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/04.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 5', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/05.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 6', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/06.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 7', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/07.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 8', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/08.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 9', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/09.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 10', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/10.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 11', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/11.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 12', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/12.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 13', width: 960, height: 582 },
      { src: '/images/projects/mckeevers-kansas-city/13.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 14', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/14.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 15', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/15.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 16', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/16.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 17', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/17.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 18', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/18.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 19', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/19.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 20', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/20.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 21', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/21.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 22', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/22.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 23', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/23.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 24', width: 540, height: 960 },
      { src: '/images/projects/mckeevers-kansas-city/24.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 25', width: 950, height: 960 },
      { src: '/images/projects/mckeevers-kansas-city/25.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 26', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/26.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 27', width: 960, height: 634 },
      { src: '/images/projects/mckeevers-kansas-city/27.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 28', width: 960, height: 720 },
      { src: '/images/projects/mckeevers-kansas-city/28.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 29', width: 720, height: 960 },
      { src: '/images/projects/mckeevers-kansas-city/29.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 30', width: 720, height: 960 },
      { src: '/images/projects/mckeevers-kansas-city/30.jpg', alt: 'Painting work by Childress Painting at Mckeevers, Kansas City — photo 31', width: 720, height: 960 },
    ],
  },
  'phillips-66': {
    folder: 'phillips-66-kansas-city',
    hero: { src: '/images/projects/phillips-66-kansas-city/hero.jpg', alt: 'Painting work by Childress Painting at Phillips 66, Kansas City', width: 960, height: 720 },
    gallery: [
      { src: '/images/projects/phillips-66-kansas-city/01.jpg', alt: 'Painting work by Childress Painting at Phillips 66, Kansas City — photo 2', width: 960, height: 720 },
    ],
  },
  'stop-n-shop': {
    folder: 'stop-n-shop-kansas-city',
    hero: { src: '/images/projects/stop-n-shop-kansas-city/hero.jpg', alt: 'Painting work by Childress Painting at Stop N Shop, Kansas City', width: 960, height: 720 },
    gallery: [
      { src: '/images/projects/stop-n-shop-kansas-city/01.jpg', alt: 'Painting work by Childress Painting at Stop N Shop, Kansas City — photo 2', width: 960, height: 720 },
      { src: '/images/projects/stop-n-shop-kansas-city/02.jpg', alt: 'Painting work by Childress Painting at Stop N Shop, Kansas City — photo 3', width: 960, height: 720 },
      { src: '/images/projects/stop-n-shop-kansas-city/03.jpg', alt: 'Painting work by Childress Painting at Stop N Shop, Kansas City — photo 4', width: 960, height: 720 },
      { src: '/images/projects/stop-n-shop-kansas-city/04.jpg', alt: 'Painting work by Childress Painting at Stop N Shop, Kansas City — photo 5', width: 960, height: 720 },
      { src: '/images/projects/stop-n-shop-kansas-city/05.jpg', alt: 'Painting work by Childress Painting at Stop N Shop, Kansas City — photo 6', width: 960, height: 720 },
      { src: '/images/projects/stop-n-shop-kansas-city/06.jpg', alt: 'Painting work by Childress Painting at Stop N Shop, Kansas City — photo 7', width: 960, height: 720 },
    ],
  },
  'torchys-tacos': {
    folder: 'torchys-tacos-kansas-city',
    hero: { src: '/images/projects/torchys-tacos-kansas-city/hero.jpg', alt: 'Painting work by Childress Painting at Torchy\'s Tacos, Kansas City', width: 960, height: 720 },
    gallery: [
      { src: '/images/projects/torchys-tacos-kansas-city/01.jpg', alt: 'Painting work by Childress Painting at Torchy\'s Tacos, Kansas City — photo 2', width: 720, height: 960 },
      { src: '/images/projects/torchys-tacos-kansas-city/02.jpg', alt: 'Painting work by Childress Painting at Torchy\'s Tacos, Kansas City — photo 3', width: 960, height: 720 },
      { src: '/images/projects/torchys-tacos-kansas-city/03.jpg', alt: 'Painting work by Childress Painting at Torchy\'s Tacos, Kansas City — photo 4', width: 960, height: 720 },
      { src: '/images/projects/torchys-tacos-kansas-city/04.jpg', alt: 'Painting work by Childress Painting at Torchy\'s Tacos, Kansas City — photo 5', width: 960, height: 720 },
      { src: '/images/projects/torchys-tacos-kansas-city/05.jpg', alt: 'Painting work by Childress Painting at Torchy\'s Tacos, Kansas City — photo 6', width: 960, height: 720 },
      { src: '/images/projects/torchys-tacos-kansas-city/06.jpg', alt: 'Painting work by Childress Painting at Torchy\'s Tacos, Kansas City — photo 7', width: 960, height: 720 },
      { src: '/images/projects/torchys-tacos-kansas-city/07.jpg', alt: 'Painting work by Childress Painting at Torchy\'s Tacos, Kansas City — photo 8', width: 720, height: 960 },
    ],
  },
};

/** Folders that matched no existing project, added as new projects. */
export const discoveredProjects: DiscoveredProject[] = [
  {
    slug: 'custom-wood-staining-residential-home',
    name: 'Custom Wood Staining (Residential Home)',
    industry: 'residential',
    location: 'Overland Park',
    art: 'interior',
  },
  {
    slug: 'gould-evans',
    name: 'Gould Evans',
    industry: 'retail',
    location: 'Kansas City',
    art: 'retail',
  },
  {
    slug: 'kcfd-fire-station-15',
    name: 'KCFD Fire Station 15',
    industry: 'government',
    location: 'Kansas City',
    art: 'government',
  },
  {
    slug: 'mckeevers',
    name: 'Mckeevers',
    industry: 'retail',
    location: 'Kansas City',
    art: 'retail',
  },
  {
    slug: 'shawnee-town-government-buildings',
    name: 'Shawnee Town Government Buildings',
    industry: 'government',
    location: 'Shawnee',
    art: 'government',
  },
  {
    slug: 'stop-n-shop',
    name: 'Stop N Shop',
    industry: 'retail',
    location: 'Kansas City',
    art: 'retail',
  },
  {
    slug: 'union-event-venue',
    name: 'Union Event Venue',
    industry: 'sports-entertainment',
    location: 'Kansas City',
    art: 'sports',
  },
];
