# Childress Painting — Website

Commercial painting contractor site for **Childress Painting DFW LLC**.
Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint
```

Node 18.18+ required.

### Environment

| Variable               | Required | Purpose                                                     |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical origin. Defaults to `https://www.childresspaintingtx.com` |

Set it in Vercel → Project → Settings → Environment Variables if the production
domain ever changes. It drives canonicals, the sitemap, and structured data.

---

## The one thing to understand

**Content lives in `lib/`. Pages read from it.** Adding a service, industry,
project, or client is a single array entry — navigation, the sitemap,
structured data, related-content links, filters, and counts all derive from it
automatically. You should almost never need to edit a page component to publish
new content.

```
lib/
├── site.ts        Company facts, both offices, navigation, service areas
├── clients.ts     Representative clients by industry + education partners
├── services.ts    The 16 services, grouped (drives /services and /services/[slug])
├── industries.ts  The 12 sectors (drives /industries and /industries/[slug])
├── projects.ts    Project portfolio (drives /projects and /projects/[slug])
├── content.ts     Process steps, differentiators, values, timeline, safety, QC
├── testimonials.ts Client reviews (names supplied by the company)
├── project-images.ts   Committed photo paths + folder-discovered projects
├── project-overrides.ts Corrections to discovered projects
├── schema.ts      JSON-LD builders
├── seo.ts         Metadata helper
├── validation.ts  Server-side form schemas
└── submissions.ts Form delivery
```

---

## Common tasks

### Add a project

Append to `projects` in `lib/projects.ts`:

```ts
{
  slug: 'new-project',
  name: 'Client Name',
  industry: 'retail',              // must match a slug in lib/industries.ts
  serviceTypes: ['commercial-interior-painting'],  // slugs from lib/services.ts
  scopeSummary: 'One or two sentences describing the scope.',
  detail: 'experience',
  art: 'retail',                   // key from components/ui/SectorArt.tsx
}
```

It appears immediately on `/projects`, in the sector filter, on the matching
industry page, in related-projects rails, and in the sitemap.

### Publish a full case study

Projects carry a `detail` flag that controls how much the page claims:

- **`'experience'`** — the client relationship and scope category are confirmed,
  but specifics are not. The template renders a clean capability page and
  invents nothing. Every project ships this way by default.
- **`'case-study'`** — fully verified and released. Unlocks the hero image,
  overview, challenges/approach/outcome, fact strip, gallery, and video.

To upgrade one:

1. Get written permission from the owner or GC to name and photograph it.
2. Fill in `location`, `completionDate`, `completionISO`, `overview`,
   `challenges`, `solution`, `results`, and `facts`.
3. Add photography per `public/images/README.md`.
4. Change `detail` to `'case-study'`.

Do not add contract values, square footage, or statistics that have not been
confirmed by the company.

### Add project photography

**See `PROJECT-PHOTOS.md`.** Photography is static and committed: the files
live in `public/images/projects/` and their paths in `lib/project-images.ts`.
Nothing is generated at deploy time.

For a few images, drop them in a folder and add the entry. For a whole batch,
run `npm run build:images -- "/path/to/Projects"` locally and commit the
result.

### Replace the homepage drone video

The footage is already encoded and shipped. To swap it, overwrite the three
files in `public/video/` and `public/images/hero-poster.jpg` keeping the same
names — the encoding commands, including the crossfade that makes the clip loop
seamlessly, are in **`public/video/README.md`**. No code changes needed.

### Add a service or industry

Append to `services` in `lib/services.ts` (set its `group`, and `featured` if it belongs on the homepage) or `industries` in
`lib/industries.ts`, then add the nav entry in `lib/site.ts` (`primaryNav` and
`footerNav`). Everything else is automatic.

### Change company facts

`lib/site.ts` only. Phone numbers, both office addresses, email, service areas,
and navigation all live there and propagate everywhere.

---

## Architecture

```
app/
├── layout.tsx              Root shell, fonts, org + per-office JSON-LD
├── page.tsx                Homepage
├── about/ process/ why-childress/ safety-quality/
├── services/ + [slug]/     Index and detail template
├── industries/ + [slug]/   Index and detail template
├── projects/ + [slug]/     Filterable portfolio + case-study template
├── clients/                Representative clients + education partners
├── request-bid/            Four-step bid portal
├── contact/ careers/ subcontractors/ service-areas/ privacy/
├── api/{bid,contact,careers,subcontractor}/  Form handlers
├── sitemap.ts robots.ts opengraph-image.tsx icon.svg
components/
├── layout/    Navbar, Footer, Logo, MobileMenu
├── home/      Hero (video), TrustedBy, StatsBand
├── cards/     ServiceCard, IndustryCard, ProjectCard
├── projects/  ProjectPortfolio (client-side sector filter)
├── forms/     Bid, Contact, Careers, Subcontractor + shared field primitives
└── ui/        MediaFrame, SectorArt, ProcessTimeline, Reveal, Button,
               SectionHeading, PageHero, Breadcrumbs, CtaBanner, JsonLd
```

### Design system

`app/globals.css` holds the whole system as Tailwind v4 `@theme` tokens.

- **Palette** — signal red `#d81f26`, true black `#0a0a0b`, white, with an ink
  and graphite scale. Taken directly from the logo.
- **Type** — Inter Tight (display) / Inter (text) / JetBrains Mono (labels).
  ONE fluid scale in `@theme` drives every heading: `--text-display` through
  `--text-h5`. Size, weight, tracking and leading travel together, so a heading
  cannot be sized correctly but tracked or weighted inconsistently. No
  component defines its own font-size.
- **Title Case** — every visible title-style string (page and section
  headings, card and CTA titles, nav and footer labels, eyebrows, stat labels)
  is Title Case. Body copy, descriptions and testimonials stay sentence case.
- **Motif** — the construction drawing sheet: mono labels, CSI references, red
  dimension rules, hairline grids. The `.title-block` class is the signature
  device and appears on every section.
- **Motion** — `.reveal`, `.lift`, `.sweep`, `.sheen`, `.line-mask`,
  `.marquee-track`. All CSS. Fully disabled under `prefers-reduced-motion`.

### Performance notes

- Framer Motion was removed from ordinary content. Scroll reveals use one
  shared `IntersectionObserver` plus CSS; the hero uses React state and CSS
  transitions. The library remains only in the mobile drawer.
- Placeholder artwork is inline SVG (~1–2 KB each) — no image requests, no
  layout shift.
- All content routes are statically prerendered (84 pages).
- Brand and video assets get a one-year immutable cache header.

### Mobile

The desktop design is the foundation; mobile is a deliberate translation of it
rather than a squeeze. Handled with Tailwind breakpoints on the existing
components — there are no separate mobile pages.

- **Overflow** — `overflow-x: clip` on the body as a safety net, plus
  `overflow-wrap: break-word` on headings and paragraphs so a long unbroken
  word can never widen the layout.
- **Hero** — 32rem tall on phones (48rem+ on desktop), crop biased to
  `58% 50%` so the skyline stays in frame when the 16:9 footage is cut to a
  portrait viewport. Video is `preload="none"` and is skipped entirely when the
  browser reports Data Saver or a 2G connection; the poster is already there.
- **Navigation** — drawer below `xl`, with collapsible submenus (Services alone
  has sixteen entries). A tap-to-call button sits next to the hamburger,
  because the utility strip carrying the phone number is desktop-only.
- **Galleries** — one column, two from 640px, three from 1024px, each photo at
  its natural aspect ratio. Tapping opens a full-screen viewer with swipe
  navigation and controls at thumb height. No carousel library.
- **Touch targets** — a `.tap` utility guarantees 44×44px on controls sized
  only by their text; filter chips, footer and breadcrumb links were raised.
- **Rails** — the project filters and process timeline scroll horizontally with
  snap on phones instead of wrapping to four rows.
- **Motion** — blur radius, sheet-grid opacity and marquee speed are all
  reduced under 768px, and `prefers-reduced-motion` disables animation
  globally rather than only on scroll reveals.

### Accessibility

- Process timeline is a real tablist with roving tabindex and arrow-key support.
- Skip link, visible focus rings, `aria-current` on active nav.
- Portfolio filter announces result counts via `aria-live`.
- Drawn artwork carries descriptive `role="img"` labels.
- Full reduced-motion support.

### SEO

- Per-page canonicals, Open Graph, and Twitter cards.
- JSON-LD: Organization, ProfessionalService, WebSite, one LocalBusiness per
  office, BreadcrumbList on every page, Service and FAQPage on service pages.
- Sitemap generated from the data layer.
- 301 redirects in `next.config.ts` preserve the retired `/markets/*` and
  legacy service URLs.

---

## Forms

Four endpoints under `app/api/`. Each validates server-side against a schema in
`lib/validation.ts` — client validation is a usability layer, never a security
boundary.

**Delivery is not configured yet.** `lib/submissions.ts` currently logs
submissions. Wire it to an email provider (Resend, Postmark, SendGrid) or a CRM
before launch, or bid requests will be lost. That file is the only place to
change.

---

## Deployment

Vercel, connected to the GitHub repo. Push to the production branch and it
deploys — no configuration change is required for this update.

Before launch:

- [ ] **Wire form delivery in `lib/submissions.ts`** — it currently only logs.
      Until this is done, bid requests are not delivered anywhere.
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` matches the live domain
- [x] ~~Project photography~~ — 111 images committed under `public/images/projects/`
- [ ] Name the actual processors in `app/privacy/page.tsx`
- [x] ~~Hero drone video~~ — encoded and shipped in `public/video/`

---

## Voice

Copy is written for the people who actually award the work: general
contractors, developers, property managers, owners, and facility teams. It
leans on the language of the trade (sequencing, substrate acceptance, film
build, progressive punch, closeout) instead of marketing adjectives, and it
states what the company does rather than how it feels about it.

Two habits worth keeping when editing:

- **Punctuation.** Em dashes are used sparingly. Where a comma or a full stop
  reads more naturally, use one. A page dense with dashes reads as generated.
- **Sentence shape.** Vary it. If three sentences in a row are built the same
  way, rewrite one of them.

## Content policy

The site deliberately does not publish anything that cannot be substantiated:

- No invented statistics, contract values, or square footage.
- Testimonials render only from lib/testimonials.ts, with reviewer names
  supplied by the company and a visible disclaimer that reviewers speak for
  themselves, not for the brands named in their quotes.
- Client names are set in type, never reproduced as logos, and every surface
  that names them carries a descriptive-use disclaimer.
- Project pages default to the honest `'experience'` state rather than
  fabricating case-study detail.

Keep it that way. A general contractor running a prequalification will check.
