/**
 * SECTOR ARTWORK
 * ===========================================================================
 * Purpose-drawn architectural scenes, one per market and service.
 *
 * WHY THIS EXISTS
 * Until real project photography is cleared for publication, every image slot
 * on the site needs something in it. Flat gradient blocks read as "unfinished
 * website". These read as deliberate art direction — abstract section drawings
 * in the brand palette, in the visual language of the drawing set the buyer
 * works from every day.
 *
 * They are vector, so they cost roughly 1 KB each, scale to any size without
 * artefacts, and never cause layout shift.
 *
 * REPLACING WITH PHOTOGRAPHY
 * Set `image` on a market in lib/markets.ts, or `featuredImage` on a project in
 * lib/projects.ts. The card components prefer a real photograph whenever one is
 * present and fall back to this artwork automatically. Nothing here needs to be
 * deleted — it keeps working as the fallback for any record without a photo.
 * ===========================================================================
 */

import type { ReactNode } from 'react';

export type ArtKey =
  | 'healthcare'
  | 'aviation'
  | 'education'
  | 'industrial'
  | 'multifamily'
  | 'retail'
  | 'government'
  | 'office'
  | 'commercial-painting'
  | 'industrial-coatings'
  | 'epoxy-flooring'
  | 'new-construction'
  | 'maintenance-repaints'
  | 'specialty-coatings'
  | 'default';

/* Shared palette so every scene reads as one family. */
const SKY_TOP = '#16293d';
const SKY_BOTTOM = '#0a1522';
const FAR = '#1c3349';
const MID = '#27455f';
const NEAR = '#0f2033';

/* Fine hairline used for construction lines across all scenes. */
const HAIR = 'rgba(154,171,188,0.28)';
const HAIR_SOFT = 'rgba(154,171,188,0.14)';
const RED = '#d72638';

function Scene({ id, children }: { id: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKY_TOP} />
          <stop offset="100%" stopColor={SKY_BOTTOM} />
        </linearGradient>
        <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill={`url(#sky-${id})`} />

      {/* Drawing grid, matching the .sheet-grid motif used in dark sections. */}
      <g stroke={HAIR_SOFT} strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="600" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} />
        ))}
      </g>

      {children}

      <rect width="800" height="600" fill={`url(#fade-${id})`} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

const scenes: Record<Exclude<ArtKey, 'default'>, ReactNode> = {
  /* Corridor in one-point perspective — the defining space of a hospital. */
  healthcare: (
    <g>
      <path d="M0 600 L250 330 L550 330 L800 600 Z" fill={NEAR} />
      <path d="M250 330 L250 120 L550 120 L550 330 Z" fill={FAR} />
      <path d="M0 0 L250 120 L250 330 L0 600 Z" fill={MID} opacity="0.55" />
      <path d="M800 0 L550 120 L550 330 L800 600 Z" fill={MID} opacity="0.55" />
      {/* Ceiling runs and door openings drawn to the vanishing point. */}
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        <path d="M0 120 L250 200" />
        <path d="M800 120 L550 200" />
        <path d="M120 600 L280 300" />
        <path d="M680 600 L520 300" />
        <rect x="300" y="190" width="60" height="140" />
        <rect x="440" y="190" width="60" height="140" />
      </g>
      <rect x="250" y="326" width="300" height="4" fill={RED} />
      <circle cx="400" cy="150" r="26" fill="none" stroke={HAIR} strokeWidth="1.5" />
    </g>
  ),

  /* Hangar: portal truss and a wing silhouette. */
  aviation: (
    <g>
      <path d="M0 600 L800 600 L800 430 L0 430 Z" fill={NEAR} />
      <path d="M60 430 L60 250 Q400 90 740 250 L740 430 Z" fill={FAR} />
      {/* Truss webbing across the hangar opening. */}
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        <path d="M60 250 Q400 90 740 250" />
        <path d="M60 300 Q400 145 740 300" />
        {Array.from({ length: 13 }, (_, i) => {
          const x = 60 + i * 56.7;
          return <line key={i} x1={x} y1="250" x2={x} y2="430" opacity="0.6" />;
        })}
      </g>
      {/* Wing and fuselage, reduced to two strokes. */}
      <path d="M170 430 L400 350 L640 430 Z" fill={MID} />
      <path d="M300 430 L400 300 L500 430 Z" fill={NEAR} opacity="0.85" />
      <rect x="60" y="426" width="680" height="4" fill={RED} />
    </g>
  ),

  /* School elevation — repeating classroom bays and a gable. */
  education: (
    <g>
      <path d="M0 600 L800 600 L800 380 L0 380 Z" fill={NEAR} />
      <path d="M90 380 L90 210 L710 210 L710 380 Z" fill={FAR} />
      <path d="M60 210 L400 90 L740 210 Z" fill={MID} />
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={130 + i * 100} y="250" width="58" height="90" />
        ))}
        <path d="M60 210 L740 210" />
        <path d="M400 90 L400 210" opacity="0.5" />
      </g>
      <rect x="368" y="380" width="64" height="120" fill={NEAR} stroke={HAIR} strokeWidth="1.5" />
      <rect x="90" y="376" width="620" height="4" fill={RED} />
    </g>
  ),

  /* Warehouse interior: racking bays and exposed structure. */
  industrial: (
    <g>
      <path d="M0 600 L800 600 L800 440 L0 440 Z" fill={NEAR} />
      <path d="M0 440 L0 160 L800 160 L800 440 Z" fill={FAR} opacity="0.75" />
      {/* Exposed joists overhead. */}
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        <path d="M0 160 L800 160" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={i * 53} y1="160" x2={i * 53 + 26} y2="215" opacity="0.55" />
        ))}
        <path d="M0 215 L800 215" opacity="0.6" />
      </g>
      {/* Pallet racking, three bays deep. */}
      <g fill={MID}>
        <rect x="70" y="250" width="18" height="190" />
        <rect x="270" y="250" width="18" height="190" />
        <rect x="470" y="250" width="18" height="190" />
        <rect x="670" y="250" width="18" height="190" />
        <rect x="70" y="300" width="618" height="10" />
        <rect x="70" y="370" width="618" height="10" />
      </g>
      <rect x="0" y="436" width="800" height="4" fill={RED} />
      <g stroke={HAIR} strokeWidth="2" strokeDasharray="14 10">
        <line x1="0" y1="520" x2="800" y2="520" />
      </g>
    </g>
  ),

  /* Stacked balconies of a wrap or podium community. */
  multifamily: (
    <g>
      <path d="M0 600 L800 600 L800 520 L0 520 Z" fill={NEAR} />
      <path d="M80 520 L80 90 L720 90 L720 520 Z" fill={FAR} />
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        {Array.from({ length: 5 }, (_, row) => (
          <g key={row}>
            <line x1="80" y1={150 + row * 78} x2="720" y2={150 + row * 78} />
            {Array.from({ length: 6 }, (_, col) => (
              <rect key={col} x={120 + col * 100} y={104 + row * 78} width="58" height="42" />
            ))}
          </g>
        ))}
      </g>
      {/* Projecting balcony slabs catch the light. */}
      <g fill={MID}>
        {Array.from({ length: 5 }, (_, row) => (
          <rect key={row} x="70" y={146 + row * 78} width="660" height="8" />
        ))}
      </g>
      <rect x="80" y="516" width="640" height="4" fill={RED} />
    </g>
  ),

  /* Storefront run with canopy and signage band. */
  retail: (
    <g>
      <path d="M0 600 L800 600 L800 470 L0 470 Z" fill={NEAR} />
      <path d="M40 470 L40 170 L760 170 L760 470 Z" fill={FAR} />
      {/* Signage band. */}
      <rect x="40" y="170" width="720" height="70" fill={MID} />
      {/* Canopy. */}
      <path d="M20 300 L780 300 L760 330 L40 330 Z" fill={MID} />
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        {Array.from({ length: 4 }, (_, i) => (
          <rect key={i} x={90 + i * 165} y="350" width="120" height="120" />
        ))}
        <path d="M40 240 L760 240" />
      </g>
      <rect x="40" y="466" width="720" height="4" fill={RED} />
      <circle cx="400" cy="205" r="16" fill="none" stroke={HAIR} strokeWidth="2" />
    </g>
  ),

  /* Civic portico — colonnade and pediment. */
  government: (
    <g>
      <path d="M0 600 L800 600 L800 500 L0 500 Z" fill={NEAR} />
      <path d="M110 500 L110 230 L690 230 L690 500 Z" fill={FAR} />
      <path d="M70 230 L400 110 L730 230 Z" fill={MID} />
      {/* Columns. */}
      <g fill={MID}>
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={150 + i * 92} width="38" y="270" height="230" />
        ))}
      </g>
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        <path d="M110 270 L690 270" />
        <path d="M70 230 L730 230" />
        <path d="M400 110 L400 230" opacity="0.45" />
        <path d="M130 500 L670 500" />
      </g>
      {/* Steps. */}
      <g fill={NEAR}>
        <rect x="90" y="500" width="620" height="16" />
        <rect x="70" y="516" width="660" height="16" />
        <rect x="50" y="532" width="700" height="18" />
      </g>
      <rect x="110" y="226" width="580" height="4" fill={RED} />
    </g>
  ),

  /* Curtain-wall office tower, three planes deep. */
  office: (
    <g>
      <path d="M0 600 L800 600 L800 540 L0 540 Z" fill={NEAR} />
      <path d="M470 540 L470 130 L720 130 L720 540 Z" fill={FAR} opacity="0.75" />
      <path d="M90 540 L90 60 L430 60 L430 540 Z" fill={FAR} />
      <path d="M430 540 L430 190 L500 190 L500 540 Z" fill={MID} opacity="0.6" />
      {/* Mullion grid on the near tower. */}
      <g stroke={HAIR} strokeWidth="1.2" fill="none">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`r${i}`} x1="90" y1={60 + i * 44} x2="430" y2={60 + i * 44} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`c${i}`} x1={90 + i * 68} y1="60" x2={90 + i * 68} y2="540" />
        ))}
      </g>
      <g stroke={HAIR_SOFT} strokeWidth="1" fill="none">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1="470" y1={130 + i * 46} x2="720" y2={130 + i * 46} />
        ))}
      </g>
      <rect x="90" y="536" width="340" height="4" fill={RED} />
    </g>
  ),

  /* --- Service scenes ---------------------------------------------------- */

  /* Wall in section: substrate, primer, two finish coats. */
  'commercial-painting': (
    <g>
      <path d="M0 600 L800 600 L800 0 L520 0 Z" fill={NEAR} />
      <path d="M0 0 L520 0 L800 600 L0 600 Z" fill={FAR} opacity="0.5" />
      {/* Coating build-up, drawn as stacked layers. */}
      <g>
        <rect x="120" y="120" width="420" height="360" fill={MID} />
        <rect x="150" y="150" width="360" height="300" fill={FAR} />
        <rect x="180" y="180" width="300" height="240" fill={NEAR} />
      </g>
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        <path d="M120 120 L150 150" />
        <path d="M540 120 L510 150" />
        <path d="M120 480 L150 450" />
        <path d="M540 480 L510 450" />
        {/* Dimension line with end ticks. */}
        <path d="M600 120 L600 480" />
        <path d="M590 120 L610 120" />
        <path d="M590 480 L610 480" />
      </g>
      <rect x="180" y="180" width="300" height="6" fill={RED} />
      <circle cx="330" cy="300" r="54" fill="none" stroke={HAIR} strokeWidth="1.5" />
    </g>
  ),

  /* Structural steel with a coating profile callout. */
  'industrial-coatings': (
    <g>
      <path d="M0 600 L800 600 L800 470 L0 470 Z" fill={NEAR} />
      {/* Wide-flange beam in section. */}
      <g fill={MID}>
        <rect x="200" y="130" width="360" height="44" />
        <rect x="340" y="174" width="80" height="220" />
        <rect x="200" y="394" width="360" height="44" />
      </g>
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        <rect x="188" y="118" width="384" height="332" strokeDasharray="10 8" />
        <path d="M572 130 L680 90" />
        <path d="M572 438 L680 478" />
        <circle cx="700" cy="80" r="10" />
        <circle cx="700" cy="488" r="10" />
      </g>
      {/* Corrosion-control accent on the exposed flange. */}
      <rect x="200" y="130" width="360" height="8" fill={RED} />
      <g stroke={HAIR} strokeWidth="2" strokeDasharray="6 8">
        <path d="M120 260 L188 260" />
        <path d="M572 260 L640 260" />
      </g>
    </g>
  ),

  /* Resinous floor: slab section with build coat and broadcast aggregate. */
  'epoxy-flooring': (
    <g>
      <path d="M0 600 L800 600 L800 300 L0 300 Z" fill={NEAR} />
      <path d="M0 0 L800 0 L800 300 L0 300 Z" fill={FAR} opacity="0.45" />
      {/* Floor plane in perspective. */}
      <path d="M0 600 L280 300 L520 300 L800 600 Z" fill={MID} opacity="0.55" />
      <g stroke={HAIR} strokeWidth="1.4" fill="none">
        <path d="M120 600 L300 300" />
        <path d="M300 600 L360 300" />
        <path d="M500 600 L440 300" />
        <path d="M680 600 L500 300" />
        <path d="M0 380 L800 380" opacity="0.5" />
        <path d="M0 470 L800 470" opacity="0.4" />
      </g>
      {/* Safety striping — the most recognisable thing on a coated floor. */}
      <path d="M180 600 L340 330 L400 330 L240 600 Z" fill={RED} opacity="0.9" />
      <g fill={HAIR}>
        {Array.from({ length: 22 }, (_, i) => (
          <circle key={i} cx={80 + ((i * 137) % 660)} cy={340 + ((i * 71) % 230)} r="2.5" />
        ))}
      </g>
    </g>
  ),

  /* Building under construction: frame, crane, partial envelope. */
  'new-construction': (
    <g>
      <path d="M0 600 L800 600 L800 520 L0 520 Z" fill={NEAR} />
      {/* Completed envelope on the left, open frame on the right. */}
      <path d="M110 520 L110 150 L400 150 L400 520 Z" fill={FAR} />
      <g stroke={HAIR} strokeWidth="2" fill="none">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="400" y1={150 + i * 74} x2="660" y2={150 + i * 74} />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line key={`v${i}`} x1={400 + i * 87} y1="150" x2={400 + i * 87} y2="520" />
        ))}
      </g>
      <g stroke={HAIR} strokeWidth="1.4" fill="none">
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1="110" y1={190 + i * 74} x2="400" y2={190 + i * 74} opacity="0.55" />
        ))}
      </g>
      {/* Tower crane. */}
      <g stroke={RED} strokeWidth="5" fill="none" strokeLinecap="square">
        <path d="M690 520 L690 80" />
        <path d="M470 80 L760 80" />
        <path d="M560 80 L560 170" />
      </g>
      <rect x="110" y="516" width="290" height="4" fill={RED} />
    </g>
  ),

  /* Elevation split down the middle: weathered against renewed. */
  'maintenance-repaints': (
    <g>
      <path d="M0 600 L800 600 L800 480 L0 480 Z" fill={NEAR} />
      <path d="M70 480 L70 110 L730 110 L730 480 Z" fill={FAR} />
      {/* Left half degraded — broken, faded hatching. */}
      <g stroke={HAIR_SOFT} strokeWidth="2" strokeDasharray="9 13">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1="70" y1={150 + i * 38} x2="395" y2={150 + i * 38} />
        ))}
      </g>
      {/* Right half renewed — clean, continuous. */}
      <rect x="400" y="110" width="330" height="370" fill={MID} opacity="0.5" />
      <g stroke={HAIR} strokeWidth="1.6">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1="405" y1={150 + i * 38} x2="730" y2={150 + i * 38} />
        ))}
      </g>
      {/* The working edge between the two. */}
      <rect x="396" y="110" width="5" height="370" fill={RED} />
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        {Array.from({ length: 4 }, (_, i) => (
          <rect key={i} x={130 + i * 155} y="380" width="70" height="100" />
        ))}
      </g>
      <rect x="70" y="476" width="660" height="4" fill={RED} opacity="0.55" />
    </g>
  ),

  /* Specialty finishes: layered panels and a wallcovering seam. */
  'specialty-coatings': (
    <g>
      <path d="M0 600 L800 600 L800 0 L0 0 Z" fill={SKY_BOTTOM} />
      {/* Overlapping material panels, each a different treatment. */}
      <g>
        <rect x="60" y="90" width="230" height="420" fill={FAR} />
        <rect x="300" y="140" width="200" height="370" fill={MID} opacity="0.7" />
        <rect x="510" y="90" width="230" height="420" fill={NEAR} />
      </g>
      <g stroke={HAIR} strokeWidth="1.5" fill="none">
        {/* Sample chips lifted off each panel. */}
        <rect x="110" y="180" width="130" height="90" />
        <rect x="345" y="230" width="110" height="90" />
        <rect x="560" y="180" width="130" height="90" />
        {/* Seam line through the middle panel. */}
        <path d="M400 140 L400 510" strokeDasharray="8 10" />
      </g>
      <rect x="110" y="300" width="130" height="8" fill={RED} />
      <rect x="345" y="350" width="110" height="8" fill={RED} opacity="0.6" />
      <rect x="560" y="300" width="130" height="8" fill={RED} opacity="0.35" />
    </g>
  ),
};

/* -------------------------------------------------------------------------- */

/**
 * Renders the scene for a given key. Unknown keys fall back to the office
 * elevation, so a new market or service never renders an empty box.
 */
export function SectorArt({ art, className }: { art: ArtKey; className?: string }) {
  const key = (art in scenes ? art : 'office') as Exclude<ArtKey, 'default'>;

  return (
    <div className={className}>
      <Scene id={key}>{scenes[key]}</Scene>
    </div>
  );
}

export const artKeys = Object.keys(scenes) as Exclude<ArtKey, 'default'>[];
