import type { Metadata } from 'next';
import { company, siteUrl } from './site';

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. '/services/industrial-coatings' */
  path: string;
  /** Optional social share image path. Defaults to the site OG image. */
  image?: string;
  /** Set true on utility pages that should stay out of search results. */
  noIndex?: boolean;
};

/**
 * Builds a complete, canonical-ready metadata object.
 * `metadataBase` is set once in app/layout.tsx, so relative URLs resolve.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = '/opengraph-image',
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = `${siteUrl}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
        },
    openGraph: {
      type: 'website',
      siteName: company.name,
      title,
      description,
      url,
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: company.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
