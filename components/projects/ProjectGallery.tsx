'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

/**
 * PROJECT GALLERY
 * ---------------------------------------------------------------------------
 * A single gallery for photographs and video together, with one viewer that
 * handles both.
 *
 * LAYOUT
 * Masonry flow at each item's natural aspect ratio. Fixed tiles would crop a
 * portrait shot to landscape and discard the framing the photographer chose.
 * One column on phones, two from 640px, three from 1024px.
 *
 * VIDEO
 * Thumbnails show the poster with a play badge, so a clip never appears as a
 * black rectangle. In the viewer the clip plays with controls, starting muted;
 * sound is the viewer's choice. Portrait clips keep a 9:16 frame rather than
 * being stretched into a wide one.
 *
 * VIEWER
 * Swipe left and right to move, swipe down or tap the backdrop to close.
 * Controls sit at the bottom of the screen within thumb reach. Arrow keys and
 * Escape work for keyboard users, focus moves to the close button, and body
 * scroll is locked. No carousel dependency.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type GalleryVideo = {
  src: string;
  poster: string;
  title: string;
  orientation?: 'portrait' | 'landscape';
  width: number;
  height: number;
  duration?: number;
};

type Item =
  | ({ type: 'image' } & GalleryImage)
  | ({ type: 'video' } & GalleryVideo);

export function ProjectGallery({
  images = [],
  videos = [],
}: {
  images?: GalleryImage[];
  videos?: GalleryVideo[];
}) {
  /* Video first: motion is the strongest thing in a portfolio gallery. */
  const items: Item[] = [
    ...videos.map((v) => ({ type: 'video' as const, ...v })),
    ...images.map((i) => ({ type: 'image' as const, ...i })),
  ];

  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const count = items.length;
  const isOpen = open !== null;

  const go = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, go]);

  useEffect(() => {
    if (!isOpen) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [isOpen]);

  if (!count) return null;
  const index = open;
  const current = index !== null ? items[index] : null;

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 [&>*]:mb-3 sm:[&>*]:mb-4">
        {items.map((item, i) => (
          <figure key={item.src} className="group break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={
                item.type === 'video'
                  ? `Play video ${i + 1} of ${count}: ${item.title}`
                  : `View photo ${i + 1} of ${count} full screen`
              }
              className="sheen relative block w-full overflow-hidden bg-mist"
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  quality={80}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
                />
              ) : (
                <>
                  <Image
                    src={item.poster}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    quality={80}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors duration-300 group-hover:bg-ink/10"
                  >
                    <span className="inline-flex size-14 items-center justify-center border-2 border-white/80 bg-ink/50 backdrop-blur-sm">
                      <Play className="ml-0.5 size-6 text-white" />
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 bg-red px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white"
                  >
                    Video{item.duration ? ` · ${item.duration}s` : ''}
                  </span>
                </>
              )}
            </button>
            {item.type === 'image' && item.caption && (
              <figcaption className="mt-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/55">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project media viewer"
          className="fixed inset-0 z-[70] flex flex-col bg-ink/[0.97] backdrop-blur-sm"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => {
            const t = e.changedTouches[0];
            touchStart.current = { x: t.clientX, y: t.clientY };
          }}
          onTouchEnd={(e) => {
            const s = touchStart.current;
            if (!s) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - s.x;
            const dy = t.clientY - s.y;
            if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
            else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) setOpen(null);
            touchStart.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))]">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
              {(index ?? 0) + 1} / {count}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close viewer"
              className="tap -mr-2 inline-flex items-center justify-center text-white/80 transition-colors hover:text-white"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center px-3 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === 'image' ? (
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                quality={85}
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority
                className="max-h-full w-auto max-w-full object-contain"
              />
            ) : (
              /* Starts muted so opening the viewer never blasts audio; the
                 native controls let the viewer turn it on. */
              <video
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                muted
                playsInline
                loop
                aria-label={current.title}
                className="max-h-full w-auto max-w-full object-contain"
              />
            )}
          </div>

          <div
            className="flex items-center justify-between gap-4 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous item"
              className="tap inline-flex items-center justify-center border border-white/25 text-white/85 transition-colors hover:border-white hover:text-white"
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <p className="min-w-0 flex-1 truncate text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/50">
              {current.type === 'video' ? current.title : 'Swipe or Use the Arrows'}
            </p>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next item"
              className="tap inline-flex items-center justify-center border border-white/25 text-white/85 transition-colors hover:border-white hover:text-white"
            >
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
