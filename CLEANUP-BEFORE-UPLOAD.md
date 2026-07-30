# Upload instructions

## Short version

Upload the contents of this ZIP over your repository and commit. **No manual
deletion is required.** The build will pass.

---

## Why the last two deploys failed

Uploading files to GitHub *adds and overwrites* — it never *deletes*. The v3
release removed ten files that existed in v2, and a removed file ships as
nothing. Nothing cannot overwrite anything, so your repository kept its old
copies. One of them, `app/markets/[slug]/page.tsx`, imported `projectsByMarket`
from a `lib/projects.ts` that had been replaced, and the build died:

```
Type error: Module "@/lib/projects" has no exported member "projectsByMarket".
```

My previous fix asked you to delete those files by hand first. That was the
wrong approach — a fix that depends on a manual step is not a fix.

## What changed in this release

This release ships a valid file at **every path v3 removed**, so uploading
overwrites the broken copies automatically:

| Path | What now ships there |
| --- | --- |
| `app/markets/page.tsx` | Real redirect to `/industries` |
| `app/markets/[slug]/page.tsx` | Real redirect to `/industries/[slug]` |
| `lib/markets.ts` | Compatibility shim deriving from `lib/industries.ts` |
| `lib/site-data.ts` | Empty stub (held unverified placeholder content) |
| `components/cards/MarketCard.tsx` | Re-exports `IndustryCard` |
| `components/cards/TestimonialCard.tsx` | Stub; renders nothing unless verified |
| `components/home/IndustryMarquee.tsx` | Re-exports `TrustedBy` |
| `components/home/WhyChoose.tsx` | Rebuilt without the removed `metric` field |
| `components/ui/ImagePlaceholder.tsx` | Re-exports `MediaFrame`'s alias |

`lib/projects.ts` also exports `projectsByMarket` again as a deprecated alias
for `projectsByIndustry`, so that import resolves no matter which copy of the
markets page survives.

This was verified by reconstructing your exact repository state — pristine v2
with this release overlaid on top, nothing deleted — and building it. Result:
compiled successfully, 85 static pages, zero TypeScript errors.

## These files are optional cruft

Every file in the table above is marked `@deprecated` and is imported by
nothing in the live site. They exist purely to overwrite the broken copies. Once
your deploy is green you can delete them at any time, along with
`public/images/dallas-hero.jpg` (an unused image from v2). Deleting them is
optional and changes nothing about how the site behaves.

`/markets/*` URLs continue to 301-redirect to `/industries/*` via
`next.config.ts`, so no inbound link or search ranking is lost. They are
excluded from the sitemap, so there is no duplicate-content penalty.

## Verify locally before pushing (optional)

```bash
npm install
npm run build     # must end with: ✓ Generating static pages (85/85)
```
