# Homepage hero video

**The drone footage is already encoded and shipped here.** This file documents
how it was produced, so it can be replaced later with the same treatment.

## Shipped files

| File                          | Codec | Size   | Notes                        |
| ----------------------------- | ----- | ------ | ---------------------------- |
| `hero-drone.mp4`              | H.264 | 3.1 MB | 1920×1080, 7.93s, no audio   |
| `hero-drone.webm`             | VP9   | 2.6 MB | Served first where supported |
| `../images/hero-poster.jpg`   | JPEG  | 279 KB | Poster + no-video fallback   |

## The seamless loop

The 4K source ran 8.91s and its first and last frames differed noticeably, so a
raw loop visibly jumped every pass. The final clip crossfades the source's last
second over its first second, producing a 7.93s loop whose seam is effectively
invisible (mean frame difference at the wrap dropped from 30.0 to 3.1 out of 255).

Reproduce it in two passes — do the downscale first, or the 4K filter graph will
exhaust memory:

```bash
# Pass 1 — 4K to 1080p
ffmpeg -i source.mov -vf "scale=1920:-2" -an \
  -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p hd.mp4

# Pass 2 — crossfade the tail over the head (D=8.908, fade=1.0)
ffmpeg -i hd.mp4 -filter_complex "
[0:v]trim=start=0:end=1,setpts=PTS-STARTPTS[head];
[0:v]trim=start=7.908:end=8.908,setpts=PTS-STARTPTS[tail];
[0:v]trim=start=1:end=7.908,setpts=PTS-STARTPTS[mid];
[tail][head]blend=all_expr='A*(1-(T/1))+B*(T/1)'[xf];
[xf][mid]concat=n=2:v=1:a=0[v]" -map "[v]" -an \
  -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p loop.mp4
```

## Original required files

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
