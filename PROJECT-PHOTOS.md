# Project photos

Photography is **static and committed**. Every image lives in
`public/images/projects/`, and every path is written out in
`lib/project-images.ts`. Nothing is generated during a deploy, so a build can
never regenerate, miss, or erase them.

---

## Why it works this way

An earlier version ran the image pipeline automatically before every build. It
had a failure mode that took the photos off the live site:

1. The repository received the source `Projects/` folder incompletely — GitHub's
   web uploader silently drops files once an upload gets large.
2. The pre-build step ran, found folders containing **no images**, and honestly
   reported "0 photos".
3. It then rewrote the image data file as **empty**, discarding 111 perfectly
   good committed image references.
4. The optimised files were still sitting in `public/images/projects/`, but
   nothing pointed at them any more, so every photo disappeared.

Generating content at build time from an input that might arrive incomplete is
the whole problem. Now the committed data is the single source of truth and the
build only reads it.

---

## Current layout

```
public/images/projects/
├── aldi-kansas-city/                    hero.jpg  01.jpg … 04.jpg
├── custom-wood-staining-overland-park/  hero.jpg  01.jpg … 12.jpg
├── freddys-frozen-custard-kansas-city/  hero.jpg  01.jpg  02.jpg
├── gordon-ramsay-steakhouse-kansas-city/
├── gould-evans-kansas-city/
├── mckeevers-kansas-city/
├── phillips-66-kansas-city/
├── stop-n-shop-kansas-city/
└── torchys-tacos-kansas-city/
```

Folder names are lowercase and hyphenated — no spaces, punctuation, or
parentheses. Filenames are always `hero.jpg` and `01.jpg`, `02.jpg`, … Paths are
generated from the real files, so capitalisation matches exactly (Vercel's
filesystem is case-sensitive; Windows and macOS are not, which is exactly how
this class of bug reaches production unnoticed).

---

## Adding or replacing photos

### Option A — by hand (a few images)

1. Drop files into `public/images/projects/<folder>/`, named `hero.jpg`,
   `01.jpg`, `02.jpg`, …
2. Add or edit the entry in `lib/project-images.ts`.

`width` and `height` **must** match the real file. They reserve exact space
while the image loads, which is what stops the page jumping.

### Option B — the script (a whole folder of projects)

```bash
npm run build:images -- "/path/to/Projects"
```

It rewrites `public/images/projects/` and `lib/project-images.ts` from a folder
of per-project folders named `Project Name - City, ST`. Commit the result.

**It never runs during a build.** You run it, you see the report, you commit
what it produced.

Matching tolerates capitalisation, spaces, punctuation, apostrophes, hyphens,
ampersands, and city/state suffixes — `Ikea - Kansas City` finds IKEA, and
`Freddy's Frozen Custad` still finds `freddys-frozen-custard` despite the typo.
Matched projects take their **canonical** slug for the public folder name, so a
misspelling in a source folder never reaches a public URL.

A folder matching no existing project becomes a new project, added to the
Projects page, its market sector, the filters, counts, related rails, and the
sitemap — with neutral placeholder scope, never invented detail.

### The hero

The strongest image is picked automatically: resolution 45%, detail and
contrast 35%, landscape orientation 20%. To choose it yourself, name the source
file `hero.jpg`, or set `featuredImage` in `lib/project-overrides.ts`.

---

## Optimisation

| | |
| --- | --- |
| Stored format | Progressive JPEG (mozjpeg) |
| Delivered format | WebP / AVIF, converted automatically by `next/image` |
| Quality | ladder from 86 down, stopping once the file beats the source |
| Hero render | `priority`, preloaded, `quality={85}`, `sizes="100vw"` |
| Gallery render | lazy-loaded, `quality={80}`, natural aspect ratio |
| Widths | hero ≤ 2400px, gallery ≤ 1800px, **never upscaled** |
| Aspect | always preserved — images are never stretched |
| Rotation | EXIF orientation applied |

The gallery is a masonry layout that renders each photo at its own aspect
ratio. Fixed tiles would crop a portrait shot to landscape and throw away the
framing.

---

## Correcting a sector or a hero

Some things a folder name cannot reveal — "Gould Evans" gives no hint that it
is an architecture practice rather than a shop. Edit
**`lib/project-overrides.ts`**; it beats anything inferred and survives a
re-run of the script.

```ts
'gould-evans': { industry: 'office', art: 'office' },
```

---

## Where things live

| Path | Purpose |
| --- | --- |
| `public/images/projects/<folder>/` | The image files. Committed. |
| `lib/project-images.ts` | Paths, alt text, dimensions. Committed. |
| `lib/project-overrides.ts` | Corrections to discovered projects. **Edit this.** |
| `lib/projects.ts` | The curated project record. **Edit this.** |
| `scripts/build-project-images.mjs` | The optimiser. Run manually. |

`lib/projects.ts` merges all of it, so the homepage, Projects page, sector
filters, industry pages, related projects, counts, and sitemap update from one
source.
