import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { serviceSlugs } from '@/lib/services';
import { industrySlugs } from '@/lib/industries';
import { projectSlugs } from '@/lib/projects';

/**
 * SITEMAP
 * ---------------------------------------------------------------------------
 * Generated from the data layer, so adding a service, industry, or project
 * publishes it to the sitemap automatically — nothing to remember here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/industries', priority: 0.9, freq: 'monthly' },
    { path: '/projects', priority: 0.9, freq: 'weekly' },
    { path: '/clients', priority: 0.8, freq: 'monthly' },
    { path: '/request-bid', priority: 0.9, freq: 'monthly' },
    { path: '/about', priority: 0.8, freq: 'monthly' },
    { path: '/process', priority: 0.8, freq: 'monthly' },
    { path: '/why-childress', priority: 0.8, freq: 'monthly' },
    { path: '/safety-quality', priority: 0.7, freq: 'monthly' },
    { path: '/service-areas', priority: 0.7, freq: 'monthly' },
    { path: '/contact', priority: 0.8, freq: 'monthly' },
    { path: '/careers', priority: 0.6, freq: 'monthly' },
    { path: '/subcontractors', priority: 0.6, freq: 'monthly' },
    { path: '/privacy', priority: 0.2, freq: 'yearly' },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path === '/' ? '' : route.path}`,
    lastModified: now,
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  for (const slug of serviceSlugs) {
    entries.push({
      url: `${siteUrl}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  for (const slug of industrySlugs) {
    entries.push({
      url: `${siteUrl}/industries/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  for (const slug of projectSlugs) {
    entries.push({
      url: `${siteUrl}/projects/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
