'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

/**
 * AUTO VIDEO
 * ---------------------------------------------------------------------------
 * A muted, looping decorative clip that plays only while it is on screen.
 *
 * WHY IT IS BUILT THIS WAY
 * - `preload="none"` plus an IntersectionObserver means nothing is fetched
 *   until the clip is near the viewport. Several autoplaying videos on one page
 *   is otherwise the fastest way to ruin mobile performance.
 * - Playback pauses when the clip scrolls away, so only what is visible decodes.
 * - The poster renders underneath immediately, so the frame is never a black
 *   box, and the aspect container is fixed so nothing shifts.
 * - `prefers-reduced-motion` and Data Saver both fall back to the poster.
 * - Muted plus `playsInline`: required for inline autoplay on iOS, and audio
 *   never plays without a deliberate action.
 *
 * ORIENTATION drives the aspect container. Phone footage is nearly always
 * portrait, and forcing it into 16:9 either crops the subject or pillarboxes it.
 */
export function AutoVideo({
  src,
  poster,
  title,
  orientation = 'portrait',
  className = '',
  showControl = true,
}: {
  src: string;
  poster: string;
  title: string;
  orientation?: 'portrait' | 'landscape';
  className?: string;
  showControl?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const wanted = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (reduce || conn?.saveData || /(^|-)(2g|slow-2g)$/.test(conn?.effectiveType ?? '')) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (el.preload !== 'auto') {
            el.preload = 'auto';
            el.load();
          }
          if (wanted.current) el.play().then(() => setReady(true)).catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      wanted.current = true;
      el.play().then(() => setReady(true)).catch(() => {});
      setPaused(false);
    } else {
      wanted.current = false;
      el.pause();
      setPaused(true);
    }
  }

  const ratio = orientation === 'portrait' ? 'aspect-[9/16]' : 'aspect-video';

  return (
    <div className={['relative overflow-hidden bg-ink', ratio, className].join(' ')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-center"
      />

      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={title}
        className={[
          'absolute inset-0 size-full object-cover object-center transition-opacity duration-700',
          ready && !paused ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <source src={src} type="video/mp4" />
      </video>

      {showControl && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? `Play: ${title}` : `Pause: ${title}`}
          className="tap absolute bottom-3 right-3 z-10 inline-flex items-center justify-center border border-white/30 bg-ink/60 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-ink/80"
        >
          {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
        </button>
      )}
    </div>
  );
}
