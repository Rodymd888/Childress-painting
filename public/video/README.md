# Homepage hero video

Drop your drone footage here. The hero looks for these files and upgrades
itself automatically — no code change required.

## Required files

| File                          | Format | Notes                                    |
| ----------------------------- | ------ | ---------------------------------------- |
| `hero-drone.mp4`              | H.264  | **Required.** Universal browser support. |
| `hero-drone.webm`             | VP9    | *Optional.* Smaller; served first.       |
| `../images/hero-poster.jpg`   | JPEG   | First frame. Already present — replace.  |

## Encoding targets

- **Resolution:** 1920 × 1080 (2560 × 1440 acceptable; larger is wasted)
- **Duration:** 12–25 seconds, cut so the last frame flows into the first (it loops)
- **Bitrate:** 6–10 Mbps — aim for a final file **under 12 MB**
- **Audio:** strip it entirely. The video is muted and autoplays; audio is dead weight
- **Colour:** slightly underexposed reads better under the dark gradient overlay

### FFmpeg commands

```bash
# MP4 (H.264) — the required file
ffmpeg -i source.mov -an -c:v libx264 -profile:v high -crf 24 \
  -preset slow -pix_fmt yuv420p -vf "scale=1920:-2" \
  -movflags +faststart hero-drone.mp4

# WebM (VP9) — optional, usually 30-40% smaller
ffmpeg -i source.mov -an -c:v libvpx-vp9 -crf 33 -b:v 0 \
  -vf "scale=1920:-2" hero-drone.webm

# Poster frame — grab from 1 second in
ffmpeg -i source.mov -ss 00:00:01 -vframes 1 -q:v 2 \
  ../images/hero-poster.jpg
```

`-movflags +faststart` matters: it moves the MP4 index to the front of the file
so playback can begin before the whole thing downloads.

## How the hero degrades

The component in `components/home/Hero.tsx` handles every failure case, so the
homepage is correct today with no video present:

1. **No file here** → the poster image renders as a still hero.
2. **Video errors or 404s** → falls back to the poster.
3. **Slow connection** → poster shows until the video can play through; the
   video then cross-fades in over one second.
4. **`prefers-reduced-motion`** → the video never plays. Poster only.
5. **Autoplay blocked by the browser** → caught, falls back to the poster.

Nothing throws and nothing shows a broken-media icon in any of those cases.
