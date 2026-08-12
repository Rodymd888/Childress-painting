/**
 * SITE MEDIA
 * ---------------------------------------------------------------------------
 * Non-project media used across the site: homepage clips and About-page
 * photography. Centralised here so no component hardcodes a file path.
 *
 * Every clip is real Childress footage, transcoded to H.264 MP4 with a poster
 * frame. Titles describe what the footage actually shows.
 */

export type SiteClip = {
  src: string;
  poster: string;
  title: string;
  caption: string;
  orientation: 'portrait' | 'landscape';
};

/** Short clips for the homepage "Work in Motion" band. All phone footage, portrait. */
export const homepageClips: SiteClip[] = [
  {
    src: '/videos/homepage/crew-prep.mp4',
    poster: '/videos/homepage/crew-prep.jpg',
    title: 'A Childress Painting crew member rolling an accent wall on a commercial interior',
    caption: 'Application',
    orientation: 'portrait',
  },
  {
    src: '/videos/homepage/finished-space.mp4',
    poster: '/videos/homepage/finished-space.jpg',
    title: 'A completed commercial office interior handed back clean',
    caption: 'Finished Space',
    orientation: 'portrait',
  },
  {
    src: '/videos/homepage/retail-detail.mp4',
    poster: '/videos/homepage/retail-detail.jpg',
    title: 'Finished casework and display detail in a completed retail interior',
    caption: 'Finish Detail',
    orientation: 'portrait',
  },
];

export type SitePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Focal point, so a tall photograph is not cropped through its subject. */
  position?: string;
};

/** Real company photography for the About page. */
export const aboutPhotos = {
  office: {
    src: '/images/about/office-grandview.jpg',
    alt: 'The Childress Painting office at 14000 Century Lane in Grandview, Missouri, with the company sign at the entrance',
    width: 1188,
    height: 1324,
    position: 'center',
  },
  shop: {
    src: '/images/about/shop-interior.jpg',
    alt: 'Inside the Childress Painting shop, with the company sign above the door and staged coating materials',
    width: 2000,
    height: 2667,
    position: 'center',
  },
  fleet: {
    src: '/images/about/fleet.jpg',
    alt: 'Childress Painting service vans and trucks parked at the company yard',
    width: 2000,
    height: 2667,
    position: 'center',
  },
  fleetWide: {
    src: '/images/about/fleet-wide.jpg',
    alt: 'Childress Painting trucks at the company yard under an open sky',
    width: 2000,
    height: 2667,
    position: 'center',
  },
} satisfies Record<string, SitePhoto>;
