import { redirect } from 'next/navigation';

/**
 * LEGACY ROUTE — /markets
 * ===========================================================================
 * The /markets section was replaced by /industries in the v3 redesign, which
 * expanded eight markets into the current sector list.
 *
 * WHY THIS FILE STILL EXISTS
 * next.config.ts issues a 301 for /markets before routing reaches this file,
 * so in normal operation this page is never rendered. It is kept for one
 * practical reason: uploading a release over an existing repository overwrites
 * files but does not delete them. Shipping a valid file at this path
 * guarantees the previous version's broken copy is replaced rather than left
 * behind to fail the build.
 *
 * The redirect below is a real fallback — if the config-level redirect is ever
 * removed, this still sends visitors to the right place.
 *
 * SAFE TO DELETE once you have confirmed /markets no longer exists in your
 * repository. Nothing in the live site imports it.
 * ===========================================================================
 */
export default function LegacyMarketsIndex() {
  redirect('/industries');
}
