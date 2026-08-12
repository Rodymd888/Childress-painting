import { SectionHeading } from '@/components/ui/SectionHeading';
import { AutoVideo } from '@/components/media/AutoVideo';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { homepageClips } from '@/lib/site-media';

/**
 * WORK IN MOTION
 * ---------------------------------------------------------------------------
 * Three short clips of real Childress work. All phone footage, so all portrait,
 * which is why this is a triptych of tall cards rather than a full-width
 * cinematic band: a 9:16 clip stretched across a desktop viewport is either
 * cropped through its subject or floating in black.
 *
 * On mobile the same layout stacks, and portrait video fills the device
 * naturally, which is where this footage is strongest.
 *
 * Each clip loads and plays only while on screen. See AutoVideo.
 */
export function WorkInMotion() {
  if (homepageClips.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-red/10 to-transparent"
      />

      <div className="container-site relative">
        <SectionHeading
          light
          label="Work in Motion"
          layout="split"
          title="Our Crews, On Site."
          intro={
            <p>
              Preparation, application, and finished spaces, filmed on live projects. No stock
              footage and no staging.
            </p>
          }
        />

        <RevealGroup
          className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-6"
          stagger={0.08}
        >
          {homepageClips.map((clip) => (
            <RevealItem key={clip.src} className="group">
              <div className="relative">
                <AutoVideo
                  src={clip.src}
                  poster={clip.poster}
                  title={clip.title}
                  orientation={clip.orientation}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
              <p className="mt-3.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red-light">
                {clip.caption}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8">
          <p className="max-w-2xl text-[0.8125rem] leading-relaxed text-silver">
            Footage from Childress Painting projects. Clips play without sound and pause when
            scrolled out of view.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
