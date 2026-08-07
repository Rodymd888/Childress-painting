'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * PROJECT GALLERY
 * ---------------------------------------------------------------------------
 * LAYOUT
 * A masonry flow that renders every photograph at its NATURAL aspect ratio.
 * Fixed-ratio tiles would crop a portrait shot to landscape and throw away the
 * framing the photographer chose, so the columns flow instead and each image
 * keeps its own shape.
 *
 * One column on phones, two from 640px, three from 1024px. Real width/height
 * come from the file, so the browser reserves exact space and nothing shifts
 * as images load.
 *
 * VIEWER
 * Tapping opens a full-screen viewer built for one hand: swipe left/right to
 * move between photos, swipe down or tap the backdrop to close, and controls
 * sit at the bottom of the screen within thumb reach rather than in the far
 * corners. Arrow keys and Escape work for keyboard users, and body scroll is
 * locked while it is open.
 *
 * No dependencies — a couple of kilobytes of logic not a carousel
 * library, which matters on the phones most of these visitors are using.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const isOpen = open !== null;
  const count = images.length;

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

  /* Lock the page behind the viewer without the layout jumping. */
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
  const current = index !== null ? images[index] : null;

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 [&>*]:mb-3 sm:[&>*]:mb-4">
        {images.map((image, i) => (
          <figure key={image.src} className="group break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View photo ${i + 1} of ${count} full screen`}
              className="sheen relative block w-full overflow-hidden bg-mist"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                quality={80}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
              />
            </button>
            {image.caption && (
              <figcaption className="mt-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/55">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project photo viewer"
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

          {/* Taps on the photo itself must not close the viewer. */}
          <div
            className="flex min-h-0 flex-1 items-center justify-center px-3 py-4"
            onClick={(e) => e.stopPropagation()}
          >
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
          </div>

          {/* Controls sit low, so they land under the thumb on a phone. */}
          <div
            className="flex items-center justify-between gap-4 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="tap inline-flex items-center justify-center border border-white/25 text-white/85 transition-colors hover:border-white hover:text-white"
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <p className="min-w-0 flex-1 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/50">
              Swipe or use the arrows
            </p>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
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
