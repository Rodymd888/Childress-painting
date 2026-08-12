# Project video

The data layer and the project template are already video-ready. Adding a video
is a data change; no component work is required.

## Where files go

```
public/videos/projects/<project-slug>/
├── walkthrough.mp4      H.264, required
├── walkthrough.webm     VP9, optional, served first where supported
└── walkthrough.jpg      poster frame, required
```

## Wiring one up

In `lib/projects.ts`, or in `lib/project-overrides.ts` for a
folder-discovered project:

```ts
heroVideo: {
  src: '/videos/projects/mckeevers/walkthrough.mp4',
  webm: '/videos/projects/mckeevers/walkthrough.webm',
  poster: '/videos/projects/mckeevers/walkthrough.jpg',
  title: 'Walkthrough of the completed sales floor',
  kind: 'walkthrough',
  width: 1920,
  height: 1080,
  duration: 42,
},
```

`videos: [...]` takes the same shape and accepts several entries for gallery
playback.

## Encoding

Match the homepage hero treatment, which is already proven in this project:

```bash
# 1080p H.264, no audio, index at the front so playback starts early
ffmpeg -i source.mov -vf "scale=1920:-2" -an \
  -c:v libx264 -profile:v high -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart walkthrough.mp4

# VP9, typically 30-40% smaller
ffmpeg -i source.mov -vf "scale=1920:-2" -an \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 walkthrough.webm

# Poster frame
ffmpeg -i source.mov -ss 00:00:01 -vframes 1 -q:v 3 walkthrough.jpg
```

Target under 12 MB per clip. Strip audio: these play muted.

## Rules the templates already enforce

- **Poster is mandatory.** It renders immediately, so the frame is never empty
  and nothing shifts when the video loads.
- **Never autoplay with sound.** Project video is muted, like the homepage hero.
- **`preload="none"`.** Video is fetched only once the device is judged
  suitable, exactly as the homepage hero does. Data Saver and 2G connections
  get the poster and nothing else.
- **`prefers-reduced-motion` is honoured** globally, so autoplay never starts
  for a visitor who has asked for less motion.

## Generic site footage

Crew, surface preparation, spray application, lift work, and finished-space
footage that is not tied to one project belongs in
`public/videos/site/`, and can be referenced from service and industry pages
using the same `ProjectVideo` shape.
