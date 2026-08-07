# Adding project photos

Drop a `Projects/` folder in the root of the repository and push. That is the
whole process — the photos are optimised, matched to projects, and published
automatically on the next deploy.

---

## 1. Name the folders

**The folder name is the source of truth.** Everything is read from it:

```
Projects/
├── Torchy's Tacos - Fort Worth, TX/
│   ├── IMG_4941.jpg
│   ├── IMG_4942.jpg
│   └── IMG_4943.jpg
├── CVS Pharmacy - Azle, TX/
└── Blue Ridge Elementary School - Frisco, TX/
```

`Torchy's Tacos - Fort Worth, TX` becomes:

| Field | Value |
| --- | --- |
| Project name | Torchy's Tacos |
| Location | Fort Worth, Texas |
| Market | Restaurants |

All of these forms work:

```
Torchy's Tacos - Fort Worth, TX      (hyphen)
CVS Pharmacy — Azle, TX              (em-dash)
IKEA (Grand Prairie, TX)             (parentheses)
Walmart Supercenter, Azle, TX        (commas)
Georgia-Pacific                      (no location — that's fine)
```

State abbreviations are expanded (`TX` → `Texas`). If there is no location in
the folder name, the project simply has no location.

## 2. Push

The ingestion runs automatically before every build. Nothing to install, no
commands to remember. To run it yourself while developing:

```bash
npm run ingest:projects
```

---

## What happens to each folder

**Matching is deliberately tolerant.** Capitalisation, extra spaces,
punctuation, apostrophes, hyphens, ampersands, `LLC`/`Inc` suffixes, and
city/state suffixes are all ignored when comparing. `ikea (Grand Prairie, TX)`
matches the existing `IKEA` project; `Georgia Pacific` matches
`Georgia-Pacific`.

- **Matched an existing project** → the photos are attached to that project.
  Nothing else about the project changes.
- **Matched nothing** → it becomes a **new project**, added to the Projects
  page, the correct market sector, the sector filters, the project counts, the
  related-projects rails, and the sitemap. Its scope reads *"Project details and
  scope information will be added soon."* until you fill it in.

Projects that have no photos yet are never removed.

### The hero image

The strongest image is chosen automatically, scored on resolution (45%), image
detail and contrast (35%), and a landscape bonus (20%).

**To choose it yourself**, name the file `hero.jpg`, `cover.jpg`, or `01.jpg` —
those always win. Every remaining image goes to the gallery in filename order.

### Optimisation

| | |
| --- | --- |
| Format | WebP, quality 82 |
| Hero width | up to 2400px |
| Gallery width | up to 1800px |
| Upscaling | never — small images are left at their own size |
| Aspect ratio | always preserved; images are never stretched |
| Rotation | EXIF orientation applied, so phone photos are upright |
| Loading | gallery images lazy-load; the hero loads eagerly |
| Responsive | correct `sizes` so phones download phone-sized files |

Typical reduction is 80–90% of the original file size with no visible quality
loss.

---

## Filling in project detail later

Ingestion never writes scope, dates, contract values, or GC names — it will not
invent facts. To add real detail, edit the record in `lib/projects.ts`:

```ts
{
  slug: 'blue-ridge-elementary-school',
  name: 'Blue Ridge Elementary School',
  industry: 'education',
  location: 'Frisco, Texas',
  serviceTypes: ['interior-painting', 'maintenance-painting'],
  scopeSummary: 'Summer repaint across classrooms, corridors, and the gymnasium.',
  detail: 'experience',
  art: 'education',
}
```

Setting `detail: 'case-study'` and filling `overview`, `challenges`,
`solution`, `results`, and `facts` unlocks the full case-study layout.

Photos always come from the generated file, so re-running ingestion never
overwrites anything you have written by hand.

---

## Correcting a sector or a hero

Some things a folder name simply cannot reveal — "Gould Evans" gives no hint
that it is an architecture practice rather than a shop. Edit
**`lib/project-overrides.ts`** for those. It is a curated layer that always
beats the ingested value and survives re-ingestion:

```ts
'gould-evans': { industry: 'office', art: 'office' },
```

The same file can pin a different hero image, or add real scope and services
once they are confirmed.

## Where things live

| Path | Purpose |
| --- | --- |
| `Projects/` | Your original photos. Input only — never served. |
| `public/images/projects/<slug>/` | Optimised WebP output. Generated. |
| `lib/project-media.generated.ts` | Generated photo + new-project data. Do not edit. |
| `lib/project-overrides.ts` | Corrections to discovered projects. **Edit this one.** |
| `lib/projects.ts` | The curated project record. **Edit this one.** |
| `scripts/ingest-projects.mjs` | The ingestion script. |

`lib/projects.ts` merges the generated data in, so the homepage, Projects page,
sector filters, industry pages, related projects, counts, and sitemap all
update from that single source.

### Keeping the repository small

The originals in `Projects/` are only needed at build time. If the repo gets
heavy, run `npm run ingest:projects` locally, commit
`public/images/projects/` and `lib/project-media.generated.ts`, then add
`Projects/` to `.gitignore`. The site behaves identically.
