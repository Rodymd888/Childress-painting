import Image from 'next/image';

/**
 * PROJECT GALLERY
 * ---------------------------------------------------------------------------
 * A masonry-style gallery that renders every photograph at its NATURAL aspect
 * ratio. Fixed-ratio tiles would crop a portrait shot to landscape and throw
 * away the framing the photographer chose, so instead the columns flow and
 * each image keeps its own shape.
 *
 * - Natural aspect: width/height come from the ingested file, so the browser
 *   reserves exact space and nothing shifts as images load.
 * - Never stretched: intrinsic sizing plus `h-auto` means no distortion.
 * - Lazy: next/image defers offscreen images by default (the page hero is the
 *   only image marked `priority`).
 * - Responsive: `sizes` tells the browser the real rendered width per
 *   breakpoint so it downloads an appropriately sized file, not the full one.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  if (!images.length) return null;

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {images.map((image) => (
        <figure key={image.src} className="group break-inside-avoid">
          <div className="sheen relative overflow-hidden bg-mist">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          {image.caption && (
            <figcaption className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/55">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
