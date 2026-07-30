/**
 * DEPRECATED — lib/markets.ts
 * ===========================================================================
 * Replaced by lib/industries.ts in the v3 redesign. Kept as a thin
 * compatibility layer so that any lingering import from a previous version
 * resolves and compiles instead of failing the build.
 *
 * Nothing in the live site imports this file. SAFE TO DELETE.
 *
 * Do not add content here — edit lib/industries.ts instead. These exports are
 * derived from it, so they can never drift out of sync.
 * ===========================================================================
 */

import { industries, getIndustry, industrySlugs, type Industry } from './industries';

/** @deprecated Use `Industry` from lib/industries.ts */
export type Market = Industry;

/** @deprecated Use `industries` from lib/industries.ts */
export const markets = industries;

/** @deprecated Use `getIndustry` from lib/industries.ts */
export const getMarket = getIndustry;

/** @deprecated Use `industrySlugs` from lib/industries.ts */
export const marketSlugs = industrySlugs;
