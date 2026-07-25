import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { serviceSlugs } from '@/lib/services';
import { marketSlugs } from '@/lib/markets';
import { projects } from '@/lib/projects';

/**
 * Generated at build time. New services, markets, and projects appear here
 * automatically when they are added to the data files.
 *
 * Sample projects are excluded — they carry `noIndex` in their metadata, so
 * listing them here would send a contradictory signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, freq: 'monthly' },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/markets', priority: 0.9, freq: 'monthly' },
    { path: '/projects', priority: 0.8, freq: 'monthly' },
    { path: '/request-bid', priority: 0.9, freq: 'yearly' },
    { path: '/safety-quality', priority: 0.7, freq: 'yearly' },
    { path: '/service-areas', priority: 0.7, freq: 'yearly' },
    { path: '/about', priority: 0.7, freq: 'yearly' },
    { path: '/contact', priority: 0.7, freq: 'yearly' },
    { path: '/subcontractors', priority: 0.6, freq: 'yearly' },
    { path: '/careers', priority: 0.6, freq: 'monthly' },
    { path: '/privacy', priority: 0.2, freq: 'yearly' },
  ];

  return [
    ...staticPaths.map((item) => ({
      url: `${siteUrl}${item.path === '/' ? '' : item.path}`,
      lastModified: now,
      changeFrequency: item.freq,
      priority: item.priority,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...marketSlugs.map((slug) => ({
      url: `${siteUrl}/markets/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...projects
      .filter((project) => !project.sample)
      .map((project) => ({
        url: `${siteUrl}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      })),
  ];
}
