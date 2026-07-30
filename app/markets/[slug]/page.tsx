import { redirect } from 'next/navigation';
import { industrySlugs } from '@/lib/industries';

/**
 * LEGACY ROUTE — /markets/[slug]
 * ===========================================================================
 * Superseded by /industries/[slug]. See the note in ../page.tsx for why this
 * file is still shipped rather than simply deleted.
 *
 * Seven of the eight v2 market slugs map 1:1 onto v3 industry slugs. The
 * exception is 'multifamily', which was retired — it does not appear in the
 * qualifications record and Childress works commercial only — so it falls back
 * to the sector index instead of a non-existent page.
 *
 * SAFE TO DELETE once /markets no longer exists in your repository.
 * ===========================================================================
 */
export default async function LegacyMarketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(industrySlugs.includes(slug) ? `/industries/${slug}` : '/industries');
}
