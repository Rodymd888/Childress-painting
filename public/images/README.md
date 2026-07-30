# Image assets

## Currently here

| File               | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| `hero-poster.jpg`  | Homepage hero video poster / still fallback            |
| `dallas-hero.jpg`  | Original source plate, retained as a backup            |

## Adding project photography

Every image slot on the site renders through `components/ui/MediaFrame.tsx`.
It takes an optional photograph and a required drawn-artwork key. Supply a
photograph and it is used; supply nothing and a purpose-drawn architectural
scene renders instead.

**Adding photos is a data change, never a layout change.**

### 1. Project photos

Create a folder per project and point the record at it:

```
public/images/projects/<project-slug>/01.jpg
```

Then in `lib/projects.ts`:

```ts
featuredImage: {
  src: '/images/projects/torchys-tacos/01.jpg',
  alt: 'Finished dining room at the completed Torchy's Tacos',
  width: 2400,
  height: 1600,
},
gallery: [
  { src: '/images/projects/torchys-tacos/02.jpg', alt: '...', width: 2400, height: 1600,
    caption: 'Kitchen epoxy coating system' },
],
```

Setting `detail: 'case-study'` (and filling `location`, `completionDate`, and
`overview`) switches that project page from the capability layout to the full
case-study layout.

### 2. Industry photos

In `lib/industries.ts`, set `image: '/images/industries/retail.jpg'`.

### 3. Service photos

In `lib/services.ts`, set `image: '/images/services/interior.jpg'`.

## Specifications

- **Format:** JPEG or WebP. Next.js converts to AVIF/WebP automatically.
- **Width:** 2400px for heroes and galleries; 1600px for cards is plenty.
- **Always supply real `width` and `height`** — they prevent layout shift.
- **Always write a real `alt`** describing the work shown. It is read aloud by
  screen readers and indexed by search engines.
- **Get written permission** from the owner or general contractor before
  publishing a named, photographed project.
