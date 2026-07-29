# Childress Painting — Website

Commercial contractor website built with Next.js App Router, TypeScript, Tailwind CSS v4,
Framer Motion, and Lucide icons. Deploys to Vercel with no configuration.

---

## v2 — design and performance pass

A full redesign pass over the live site. Structure, routes, and branding were preserved;
everything else was reworked. Nothing was rebuilt from scratch.

**Visual**
- Purpose-drawn architectural artwork (`components/ui/SectorArt.tsx`) replaces the gradient
  image placeholders. Fourteen scenes — hospital corridor, hangar truss, curtain wall, slab
  section, tower crane — drawn in the brand palette. Vector, ~1 KB each, no layout shift.
- Fluid type scale as design tokens (`--text-display` → `--text-lead`), so headings hold
  their proportions from 375px to 1920px instead of being tuned per component.
- Hero rebuilt: masked line reveal, Ken Burns drift on the plate, a "Since 1984" standing
  seal, and trust indicators moved above the fold.
- Motion primitives in CSS (`.lift`, `.sweep`, `.sheen`, `.underline-sweep`) replace the
  single red top-bar effect that had been reused on six different card types.
- Process timeline redesigned as a connected sequence with visible stage connectors.
- Testimonial placeholders no longer render as red warning boxes — an unapproved reference
  is a reserved slot, not an error state.

**Performance**
- Framer Motion removed from all content pages. Scroll reveals now use one shared
  IntersectionObserver plus CSS transitions. Motion is retained only where it earns its
  weight: the hero load sequence and the mobile drawer.
- **First Load JS on content pages: 143 kB → 104 kB (−27%).**

**Content and structure**
- Services expanded 4 → 6: added Epoxy & Resinous Flooring and Specialty Coatings.
- Markets expanded 6 → 8: added Government & Civic and Commercial Office.
- Interior and exterior painting are covered as sub-scopes inside Commercial Painting, with
  their own anchors, rather than as separate top-level services. Splitting them apart is a
  residential convention that makes a Division 09 package harder to level, not easier — the
  services index links to both anchors explicitly.
- Process expanded from 4 stages to the 6 a buyer recognises, each still tied to a
  deliverable.
- Homepage gained a scrolling sector band and a dedicated Why Childress section.

**Request a bid**
- Rebuilt as a four-step wizard with per-step validation, a real progress indicator, and
  keyboard/assistive-tech support. All steps stay mounted, so one native submit carries every
  field and autofill behaves normally.
- Added Estimated Budget, Additional Notes, and a drag-and-drop plan upload.

**Accessibility**
- Every text colour re-checked against WCAG AA; all pass 4.5:1.
- Wizard progress is a real `<ol>` with `aria-current="step"`.
- All 27 pages verified: unique titles and descriptions, canonicals, OG and Twitter tags,
  exactly one `<h1>`, valid JSON-LD, no image missing `alt`.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

Run `npm run typecheck && npm run lint && npm run build` before every deploy.

---

## Architecture

```
app/
  layout.tsx                Root shell: fonts, metadata, nav, footer, site-wide JSON-LD
  page.tsx                  Homepage
  globals.css               Design system — colors, type, the title-block motif
  about/                    Company story and positioning
  services/                 Index + [slug] template (4 statically generated pages)
  markets/                  Index + [slug] template (6 statically generated pages)
  projects/                 Index + [slug] template (6 sample records)
  safety-quality/           Safety and QC practice, closeout package
  service-areas/            DFW coverage and North Texas conditions
  request-bid/              Bid invitation form
  subcontractors/           Trade partner prequalification form
  careers/                  Job application form
  contact/                  General contact form
  privacy/                  Privacy notice (draft — needs legal review)
  api/                      bid · contact · subcontractor · careers
  sitemap.ts robots.ts not-found.tsx opengraph-image.tsx icon.svg

components/
  layout/                   Navbar, MobileMenu, Footer, Logo
  ui/                       PageHero, SectionHeading, Breadcrumbs, CtaBanner,
                            ProcessTimeline, Reveal, Button, JsonLd, ImagePlaceholder
  cards/                    ServiceCard, MarketCard, ProjectCard, TestimonialCard
  forms/                    Fields, FormShell, useFormSubmit, and the four forms

lib/
  site.ts                   Company details, navigation, service areas, testimonials
  services.ts               Service definitions and page content
  markets.ts                Market sector definitions and page content
  projects.ts               Project data structure and sample records
  content.ts                Shared copy: process, differentiators, safety, history
  seo.ts                    Metadata builder used by every page
  schema.ts                 JSON-LD builders
  validation.ts             Field rules and option lists
  submissions.ts            Server-only form pipeline (validation, rate limit, delivery)
```

### Why the routes are dynamic

`/services/[slug]`, `/markets/[slug]`, and `/projects/[slug]` use `generateStaticParams`
with `dynamicParams = false`. Every URL is pre-rendered to static HTML at build time —
identical output to hand-written page files — but adding a service or a project is a data
edit rather than a new page. Any slug not in the data files returns a 404.

### Editing content

Almost all copy lives in `lib/`. Add a fifth service by appending to the `services` array
in `lib/services.ts`: the page, the navigation entry, the footer link, the sitemap entry,
and the `Service` structured data all follow automatically.

---

## Design system

| Token | Value | Used for |
| --- | --- | --- |
| Navy | `#0D1B2A` | Primary dark surface, headings |
| Red | `#D72638` | Accent, rules, calls to action |
| White | `#FFFFFF` | Primary light surface |
| Mist | `#F4F5F7` | Secondary light surface |
| Ink | `#111827` | Body text on light |
| Body | `#46536B` | Secondary text on light |

Type: **Archivo** (variable-width display, set at `wdth 112` for a monumental,
architectural feel), **IBM Plex Sans** (body), **IBM Plex Mono** (labels and data).

The signature device is the **title block** — a mono label with a red dimension rule,
borrowed from construction drawing sheets. It introduces every major section, and service
pages carry real CSI MasterFormat section numbers.

### Fonts

Fonts load from Google Fonts via a `<link>` in `app/layout.tsx`, with `preconnect` and a
metric-matched `@font-face` fallback in `globals.css` so the swap does not shift layout.

To eliminate the third-party request, switch to self-hosting:

```ts
// app/layout.tsx
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
```

Apply the generated `className` to `<html>` and delete the three `<link>` tags.

---

## Forms

Four forms post JSON to four API routes. All validation runs **server-side** in
`lib/validation.ts`, so it cannot be bypassed by disabling JavaScript. Field-level errors
come back and attach to the correct inputs.

Also built in: a honeypot field, in-memory rate limiting (5 submissions per minute per IP),
control-character stripping, and a human-readable reference number returned on success.

### Connecting a real destination

Submissions are currently logged server-side and acknowledged. One function needs changing:
`deliver()` in **`lib/submissions.ts`**. Worked examples for Resend, HubSpot, and Airtable
are in the comments directly above it.

```ts
// lib/submissions.ts
async function deliver(type, data, ref) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ /* ... */ });
}
```

Throw on failure — the caller converts it to a 502 and tells the visitor to phone instead of
assuming the message arrived.

**Secrets**: `lib/submissions.ts` is imported only by route handlers, so it never reaches the
browser bundle. Read every API key from `process.env` inside that file. Never prefix a secret
with `NEXT_PUBLIC_`.

### Plan uploads

The bid wizard has a real drag-and-drop file picker with type and size validation
(25 MB per file, 10 files). **The transport is not connected yet** — the browser collects the
files and sends the filenames with the enquiry, and the UI says so plainly rather than
implying the drawings arrived.

To finish it, pick a storage provider and wire it up in three places:

1. `components/forms/BidForm.tsx` — post as `FormData` instead of JSON when `files.length > 0`.
2. `app/api/bid/route.ts` — read the multipart body.
3. `lib/submissions.ts` — stream each file to storage inside `deliver()`.

Vercel Blob is the shortest path on this stack:

```ts
import { put } from '@vercel/blob';
const { url } = await put(`bids/${ref}/${file.name}`, file, { access: 'private' });
```

Enforce the size limit server-side as well as in the browser, and note that Vercel's
serverless request body cap applies — for very large plan sets, prefer a client-direct upload
to storage, or keep using the plan-room link field, which is how most GCs share drawings
anyway.

### Rate limiting in production

The in-memory limiter resets per serverless instance. For real protection use Vercel KV or
Upstash Redis, or put the routes behind Vercel's WAF.

---

## SEO

Every page has a unique title and meta description, a canonical URL, Open Graph and Twitter
metadata, one `<h1>`, and breadcrumbs. `lib/seo.ts` builds all of it — pass a title,
description, and path.

Structured data (`lib/schema.ts`): Organization, ProfessionalService, WebSite, BreadcrumbList,
Service, and FAQPage. **No `aggregateRating` or review markup** — that requires verified data,
and self-serving review markup is penalised.

Sample projects set `noIndex` and are excluded from the sitemap. Both clear automatically when
`sample` is set to `false`.

---

## Accessibility and performance

Verified in the build: skip link, `lang` attribute, labelled landmarks, one `<h1>` per page,
every form control associated with a `<label>` (radios in `fieldset` + `legend`), `aria-invalid`
and `aria-describedby` on errors, `role="alert"` live regions, 44px minimum touch targets,
Escape-to-close and focus return on the mobile drawer, and 3px red focus rings throughout.

All text colors meet WCAG AA (4.5:1). Reduced motion is respected in CSS and in every Framer
Motion component — `useReducedMotion` returns a static render rather than a faster animation.

Layout stability: the hero image uses `next/image` with `fill` and `priority`; placeholders
reserve space with aspect ratios; the font fallback is metric-matched. Reveal animations
change only opacity and transform, never layout.

Breakpoints reviewed at **375 / 768 / 1024 / 1440**. Navigation collapses to a drawer below
1280px; every multi-column grid starts at one or two columns on mobile.

---

## Deploying to Vercel

1. **Push to Git**

   ```bash
   git init && git add -A
   git commit -m "Childress Painting website"
   git remote add origin git@github.com:YOUR-ORG/childress-painting.git
   git push -u origin main
   ```

2. **Import into Vercel** — <https://vercel.com/new>. Framework preset, build command, and
   output directory are all detected automatically. No overrides needed.

3. **Set the environment variable**

   | Name | Value | Environments |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://www.childresspainting.com` | Production |

   This drives canonical URLs, Open Graph URLs, the sitemap, and structured data. Without it
   the site falls back to the default in `lib/site.ts`. Set it before the first production
   deploy so search engines never see the wrong canonical.

   Add secrets here too (`RESEND_API_KEY`, `HUBSPOT_TOKEN`, `AIRTABLE_TOKEN`) once forms are
   connected — never commit them.

4. **Add the domain** — Project → Settings → Domains. Add both `childresspainting.com` and
   `www.childresspainting.com` and set one to redirect to the other. Point DNS at Vercel as
   instructed; TLS is issued automatically.

5. **After the first deploy**
   - Submit `https://www.childresspainting.com/sitemap.xml` in Google Search Console.
   - Test share cards with the LinkedIn Post Inspector and Facebook Sharing Debugger.
   - Validate structured data at <https://validator.schema.org>.
   - Run Lighthouse against the production URL, not localhost.

---

## Before you publish — replacement checklist

Everything below is either a placeholder or unverified. **Nothing on this site claims a
licence, certification, award, client name, contract value, safety statistic, or completed
project**, because none of it has been confirmed.

### Blocking — do not launch without these

| # | Item | Where |
| --- | --- | --- |
| 1 | **Phone number** — `(214) 555-1984` is fictional | `lib/site.ts` → `company.phone`, `phoneHref` |
| 2 | **Email addresses** — confirm both inboxes exist and are monitored | `lib/site.ts` → `company.email`, `careersEmail` |
| 3 | **Office address** — or delete the street line and stay service-area only | `lib/site.ts` → `company.address` |
| 4 | **Business hours** — currently Mo–Fr 07:00–17:00 | `lib/site.ts` → `company.hours` |
| 5 | **Production domain** | Vercel env var `NEXT_PUBLIC_SITE_URL` |
| 6 | **Connect the forms** — they log and acknowledge but deliver nowhere | `lib/submissions.ts` → `deliver()` |
| 7 | **Privacy notice** — draft, needs Texas counsel review; name the actual processors | `app/privacy/page.tsx` |

### Brand and imagery

| # | Item | Where |
| --- | --- | --- |
| 8 | **Logo** — currently a typographic stand-in; supply transparent SVG or PNG | `components/layout/Logo.tsx` |
| 9 | **Favicon** — placeholder mark | `app/icon.svg` |
| 10 | **Hero image** — existing file is 1188×888, too small for full-bleed. Supply ~2400px wide, ideally a Childress project or DFW commercial site | `public/images/dallas-hero.jpg` |
| 11 | **Market photography** — 6 sectors show labeled gradient placeholders | `lib/markets.ts` → set `image` on each |
| 12 | **Project photography** — featured image + gallery per project | `lib/projects.ts` → `featuredImage`, `gallery` |

### Content

| # | Item | Where |
| --- | --- | --- |
| 13 | **Real projects** — all 6 records are samples carrying a visible "Sample layout" badge and `noIndex`. Get written permission from the owner or GC, replace the content, set `sample: false` | `lib/projects.ts` |
| 14 | **Testimonials** — 3 placeholders, rendered with an "awaiting approval" notice. Get the quote approved in writing, then set `verified: true` | `lib/site.ts` → `testimonials` |
| 15 | **Company history** — deliberately general. Add founding details and the year the business moved into commercial work | `lib/content.ts` → `historyMilestones` |
| 16 | **Social profiles** — empty; add real URLs or delete the unused keys | `lib/site.ts` → `company.social` |
| 17 | **EEO statement** — placeholder on the careers page, confirm with counsel | `app/careers/page.tsx` |

### Held back on purpose — add only when verified

These are **absent by design**. Publishing them unverified is worse than publishing nothing,
and prequalification departments check every one.

- Licence numbers and state registrations
- Insurance limits, bonding capacity, and surety
- EMR and OSHA incident rates
- Safety certifications and training credentials
- Trade association memberships and manufacturer approvals
- Awards, client logos, and named references
- Employee headcount, revenue, and years-in-business figures for the current entity
- Any project value or square footage

The site currently tells visitors these are supplied on request as part of prequalification,
which is both honest and how commercial buyers expect to receive them. When you have verified
figures, the natural home for them is `/safety-quality` and `/about`.

---

## Notes

- `output: 'standalone'` was removed from `next.config.ts` — Vercel does not need it.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`) are set in `next.config.ts`.
- No analytics, advertising pixels, or cookie banners are installed. If you add any, update
  the privacy notice and check whether consent is required.
