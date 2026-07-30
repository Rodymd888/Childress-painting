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
├── services.ts    The 7 services (drives /services and /services/[slug])
├── industries.ts  The 12 sectors (drives /industries and /industries/[slug])
├── projects.ts    Project portfolio (drives /projects and /projects/[slug])
├── content.ts     Process steps, differentiators, values, timeline, safety, QC
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

See **`public/images/README.md`**. Short version: every image slot renders
through `components/ui/MediaFrame.tsx`, which prefers a photograph and falls
back to drawn artwork. Populating an image field is all that is needed — no
layout changes anywhere.

### Add the homepage drone video

See **`public/video/README.md`**. Drop `hero-drone.mp4` in that folder and the
hero upgrades itself. Until then it renders the poster still, correctly.

### Add a service or industry

Append to `services` in `lib/services.ts` or `industries` in
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
- **Type** — Archivo (variable-width display) / Inter (text) / JetBrains Mono
  (labels and codes). Metric-adjusted fallbacks prevent layout shift on swap.
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

- [ ] Wire form delivery in `lib/submissions.ts`
- [ ] Drop `hero-drone.mp4` into `public/video/`
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` matches the live domain
- [ ] Name the actual processors in `app/privacy/page.tsx`
- [ ] Replace `public/images/hero-poster.jpg` with the video's first frame

---

## Content policy

The site deliberately does not publish anything that cannot be substantiated:

- No invented statistics, contract values, or square footage.
- No testimonials until the quote, name, title, and company are confirmed in
  writing by the person quoted.
- Client names are set in type, never reproduced as logos, and every surface
  that names them carries a descriptive-use disclaimer.
- Project pages default to the honest `'experience'` state rather than
  fabricating case-study detail.

Keep it that way. A general contractor running a prequalification will check.
