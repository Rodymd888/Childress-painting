/**
 * SECTOR ARTWORK
 * ===========================================================================
 * Purpose-drawn architectural scenes — one per industry, service, and project
 * type. Vector, roughly 1–2 KB each, scale to any size, cause no layout shift.
 *
 * WHY THIS EXISTS
 * Until project photography is cleared for publication, every image slot on
 * the site needs something in it. Flat gradient blocks read as an unfinished
 * website. These read as deliberate art direction — abstract section drawings
 * in the brand palette, in the visual language of the drawing set the buyer
 * works from every day.
 *
 * REPLACING WITH PHOTOGRAPHY
 * Set `image` on an industry in lib/industries.ts or a service in
 * lib/services.ts, or `featuredImage` on a project in lib/projects.ts. Card and
 * hero components prefer a real photograph whenever one is present and fall
 * back to this artwork automatically. Nothing here needs to be deleted — it
 * remains the fallback for any record without a photo.
 * ===========================================================================
 */

import type { ReactNode } from 'react';

export type ArtKey =
  /* Industries */
  | 'retail'
  | 'restaurant'
  | 'restaurants'
  | 'healthcare'
  | 'education'
  | 'industrial'
  | 'government'
  | 'office'
  | 'hospitality'
  | 'sports'
  | 'aviation'
  | 'tenant'
  | 'construction'
  /* Services */
  | 'interior'
  | 'exterior'
  | 'occupied'
  | 'prep'
  | 'coatings'
  | 'default';

/* Shared palette — derived from the brand mark. Every scene reads as family. */
const SKY_TOP = '#26262c';
const SKY_BOTTOM = '#0a0a0b';
const FAR = '#34343c';
const MID = '#45454f';
const NEAR = '#141418';
const HAIR = 'rgba(184,184,192,0.30)';
const HAIR_SOFT = 'rgba(184,184,192,0.12)';
const RED = '#d81f26';

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
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
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

const retailScene = (
  <g>
    {/* Big-box storefront elevation with a signage band. */}
    <rect x="60" y="250" width="680" height="290" fill={FAR} />
    <rect x="60" y="250" width="680" height="58" fill={MID} />
    <rect x="96" y="270" width="150" height="18" fill={RED} />
    <g fill={NEAR}>
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={100 + i * 92} y="360" width="60" height="180" />
      ))}
    </g>
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <rect x="60" y="250" width="680" height="290" />
      <line x1="60" y1="308" x2="740" y2="308" />
      <line x1="60" y1="360" x2="740" y2="360" />
    </g>
    {/* Entry canopy */}
    <rect x="360" y="330" width="150" height="14" fill={RED} opacity="0.85" />
    <line x1="30" y1="540" x2="770" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const restaurantScene = (
  <g>
    {/* Dining room section: banquette, pendant lights, feature wall. */}
    <rect x="0" y="300" width="800" height="240" fill={NEAR} />
    <rect x="0" y="180" width="800" height="120" fill={FAR} />
    <rect x="0" y="180" width="800" height="10" fill={RED} opacity="0.7" />
    {/* Pendants */}
    <g stroke={HAIR} strokeWidth="1.25">
      {[170, 300, 430, 560, 690].map((x) => (
        <line key={x} x1={x} y1="190" x2={x} y2="252" />
      ))}
    </g>
    <g fill={MID}>
      {[170, 300, 430, 560, 690].map((x) => (
        <ellipse key={x} cx={x} cy="262" rx="26" ry="11" />
      ))}
    </g>
    {/* Banquette */}
    <rect x="60" y="392" width="680" height="66" fill={MID} />
    <rect x="60" y="380" width="680" height="14" fill={FAR} />
    {/* Tables */}
    <g fill={FAR}>
      {[150, 320, 490, 660].map((x) => (
        <rect key={x} x={x} y="440" width="90" height="8" />
      ))}
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const healthcareScene = (
  <g>
    {/* Corridor in one-point perspective. */}
    <path d="M0 600 L250 330 L550 330 L800 600 Z" fill={NEAR} />
    <path d="M0 0 L250 330 L250 600 L0 600 Z" fill={FAR} />
    <path d="M800 0 L550 330 L550 600 L800 600 Z" fill={FAR} />
    <rect x="250" y="180" width="300" height="150" fill={MID} />
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <line x1="0" y1="0" x2="250" y2="330" />
      <line x1="800" y1="0" x2="550" y2="330" />
      <line x1="0" y1="600" x2="250" y2="330" />
      <line x1="800" y1="600" x2="550" y2="330" />
      <rect x="250" y="180" width="300" height="150" />
    </g>
    {/* Door openings along the corridor */}
    <g fill={NEAR}>
      <path d="M92 250 L92 470 L142 430 L142 292 Z" />
      <path d="M708 250 L708 470 L658 430 L658 292 Z" />
    </g>
    {/* Handrail — the red datum line */}
    <path d="M0 420 L250 400" stroke={RED} strokeWidth="3" fill="none" />
    <path d="M800 420 L550 400" stroke={RED} strokeWidth="3" fill="none" />
  </g>
);

const educationScene = (
  <g>
    {/* Repeating classroom bays with a gymnasium volume. */}
    <rect x="0" y="330" width="470" height="210" fill={FAR} />
    <rect x="470" y="230" width="330" height="310" fill={MID} />
    <g fill={NEAR}>
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={30 + i * 88} y="370" width="56" height="80" />
      ))}
    </g>
    {/* Gym clerestory */}
    <g fill={NEAR}>
      {Array.from({ length: 4 }, (_, i) => (
        <rect key={i} x={506 + i * 74} y="266" width="46" height="34" />
      ))}
    </g>
    <rect x="470" y="230" width="330" height="12" fill={RED} opacity="0.8" />
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <rect x="0" y="330" width="470" height="210" />
      <rect x="470" y="230" width="330" height="310" />
      <line x1="0" y1="450" x2="470" y2="450" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const industrialScene = (
  <g>
    {/* Portal frames, sawtooth roof, stack. */}
    <path d="M40 540 L40 300 L200 240 L360 300 L360 540 Z" fill={FAR} />
    <path d="M360 540 L360 320 L520 260 L680 320 L680 540 Z" fill={MID} />
    <rect x="700" y="140" width="46" height="400" fill={FAR} />
    <rect x="694" y="140" width="58" height="16" fill={RED} opacity="0.85" />
    {/* Portal frame structure */}
    <g stroke={HAIR} strokeWidth="1.5" fill="none">
      <path d="M40 540 L40 300 L200 240 L360 300 L360 540" />
      <path d="M360 540 L360 320 L520 260 L680 320 L680 540" />
      {[100, 160, 220, 280].map((x) => (
        <line key={x} x1={x} y1="540" x2={x} y2="272" />
      ))}
    </g>
    {/* Roll-up doors */}
    <g fill={NEAR}>
      <rect x="70" y="420" width="90" height="120" />
      <rect x="420" y="430" width="110" height="110" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const governmentScene = (
  <g>
    {/* Civic elevation — colonnade with a raised entablature. */}
    <rect x="110" y="270" width="580" height="42" fill={MID} />
    <rect x="110" y="270" width="580" height="10" fill={RED} opacity="0.75" />
    <path d="M90 270 L400 170 L710 270 Z" fill={FAR} />
    <g fill={FAR}>
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={150 + i * 78} y="312" width="34" height="200" />
      ))}
    </g>
    <rect x="110" y="512" width="580" height="28" fill={MID} />
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <path d="M90 270 L400 170 L710 270" />
      <rect x="110" y="270" width="580" height="42" />
      <rect x="110" y="512" width="580" height="28" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const officeScene = (
  <g>
    {/* Curtain wall grid with a red spandrel accent. */}
    <rect x="90" y="90" width="290" height="450" fill={FAR} />
    <rect x="400" y="180" width="320" height="360" fill={MID} />
    <g fill={NEAR}>
      {Array.from({ length: 8 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) => (
          <rect key={`${r}-${c}`} x={106 + c * 70} y={106 + r * 54} width="52" height="36" />
        )),
      )}
    </g>
    <g fill={NEAR}>
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) => (
          <rect key={`${r}-${c}`} x={416 + c * 78} y={196 + r * 58} width="58" height="38" />
        )),
      )}
    </g>
    <rect x="106" y="376" width="262" height="10" fill={RED} opacity="0.8" />
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <rect x="90" y="90" width="290" height="450" />
      <rect x="400" y="180" width="320" height="360" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const hospitalityScene = (
  <g>
    {/* Guest-room stack over a lit podium and porte-cochère. */}
    <rect x="130" y="80" width="540" height="330" fill={FAR} />
    <g fill={NEAR}>
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 8 }, (_, c) => (
          <rect key={`${r}-${c}`} x={152 + c * 64} y={102 + r * 52} width="42" height="32" />
        )),
      )}
    </g>
    <rect x="90" y="410" width="620" height="130" fill={MID} />
    <rect x="90" y="410" width="620" height="10" fill={RED} opacity="0.8" />
    {/* Porte-cochère */}
    <rect x="300" y="450" width="200" height="6" fill={FAR} />
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <rect x="130" y="80" width="540" height="330" />
      <rect x="90" y="410" width="620" height="130" />
      <line x1="330" y1="456" x2="330" y2="540" />
      <line x1="470" y1="456" x2="470" y2="540" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const sportsScene = (
  <g>
    {/* Seating bowl section with a cantilevered roof and light towers. */}
    <path d="M60 540 L200 340 L600 340 L740 540 Z" fill={NEAR} />
    <path d="M120 540 L230 380 L570 380 L680 540 Z" fill={FAR} />
    {/* Rake lines */}
    <g stroke={HAIR} strokeWidth="1.25">
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={140 + i * 66} y1="540" x2={214 + i * 41} y2="386" />
      ))}
    </g>
    {/* Roof */}
    <path d="M40 300 L400 240 L760 300 L760 322 L400 262 L40 322 Z" fill={MID} />
    <path d="M40 300 L400 240 L760 300" stroke={RED} strokeWidth="3" fill="none" />
    {/* Light towers */}
    <g fill={FAR}>
      <rect x="86" y="150" width="12" height="160" />
      <rect x="702" y="150" width="12" height="160" />
      <rect x="60" y="132" width="64" height="20" />
      <rect x="676" y="132" width="64" height="20" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const aviationScene = (
  <g>
    {/* Terminal concourse — barrel roof on tapered columns. */}
    <path
      d="M40 330 Q400 170 760 330 L760 356 Q400 200 40 356 Z"
      fill={MID}
    />
    <path d="M40 330 Q400 170 760 330" stroke={RED} strokeWidth="3" fill="none" />
    <g fill={FAR}>
      {[120, 290, 460, 630].map((x) => (
        <path key={x} d={`M${x} 540 L${x + 10} 300 L${x + 26} 300 L${x + 36} 540 Z`} />
      ))}
    </g>
    <rect x="0" y="430" width="800" height="110" fill={NEAR} />
    {/* Glazing band */}
    <g fill={FAR}>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={20 + i * 66} y="360" width="46" height="60" />
      ))}
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const tenantScene = (
  <g>
    {/* Plan fragment: demised suites with a shared corridor. */}
    <rect x="60" y="120" width="680" height="380" fill={NEAR} />
    <g stroke={HAIR} strokeWidth="1.5" fill="none">
      <rect x="60" y="120" width="680" height="380" />
      <line x1="60" y1="290" x2="740" y2="290" />
      <line x1="60" y1="330" x2="740" y2="330" />
      <line x1="290" y1="120" x2="290" y2="290" />
      <line x1="520" y1="120" x2="520" y2="290" />
      <line x1="400" y1="330" x2="400" y2="500" />
    </g>
    {/* Suites filled */}
    <g fill={FAR}>
      <rect x="72" y="132" width="206" height="146" />
      <rect x="302" y="132" width="206" height="146" />
      <rect x="532" y="132" width="196" height="146" />
      <rect x="72" y="342" width="316" height="146" />
      <rect x="412" y="342" width="316" height="146" />
    </g>
    {/* Corridor datum */}
    <rect x="60" y="304" width="680" height="12" fill={RED} opacity="0.6" />
    {/* Door swings */}
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <path d="M150 290 A34 34 0 0 1 184 256" />
      <path d="M380 290 A34 34 0 0 1 414 256" />
      <path d="M610 290 A34 34 0 0 1 644 256" />
    </g>
  </g>
);

const constructionScene = (
  <g>
    {/* Structure under construction — frame, deck, tower crane. */}
    <g stroke={HAIR} strokeWidth="1.5" fill="none">
      {[140, 280, 420, 560].map((x) => (
        <line key={x} x1={x} y1="540" x2={x} y2="200" />
      ))}
      {[200, 280, 360, 440, 520].map((y) => (
        <line key={y} x1="140" y1={y} x2="560" y2={y} />
      ))}
    </g>
    <g fill={FAR}>
      <rect x="140" y="440" width="140" height="80" />
      <rect x="280" y="360" width="140" height="80" />
      <rect x="420" y="440" width="140" height="80" />
    </g>
    {/* Tower crane */}
    <g stroke={RED} strokeWidth="3" fill="none">
      <line x1="650" y1="540" x2="650" y2="120" />
      <line x1="520" y1="120" x2="770" y2="120" />
      <line x1="596" y1="120" x2="596" y2="180" />
    </g>
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <line x1="650" y1="120" x2="770" y2="150" />
      <line x1="650" y1="120" x2="520" y2="150" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const interiorScene = (
  <g>
    {/* Interior elevation: wall plane, base, ceiling grid, coating build-up. */}
    <rect x="0" y="120" width="800" height="420" fill={FAR} />
    <rect x="0" y="120" width="800" height="46" fill={MID} />
    {/* Ceiling grid */}
    <g stroke={HAIR} strokeWidth="1" fill="none">
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 100} y1="120" x2={i * 100} y2="166" />
      ))}
    </g>
    {/* Coating layer callout — three stacked bands */}
    <rect x="80" y="250" width="300" height="12" fill={NEAR} />
    <rect x="80" y="272" width="300" height="12" fill={MID} />
    <rect x="80" y="294" width="300" height="12" fill={RED} opacity="0.85" />
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <line x1="400" y1="256" x2="470" y2="256" />
      <line x1="400" y1="278" x2="470" y2="278" />
      <line x1="400" y1="300" x2="470" y2="300" />
      <line x1="470" y1="240" x2="470" y2="316" />
    </g>
    {/* Base and door */}
    <rect x="0" y="504" width="800" height="20" fill={MID} />
    <rect x="580" y="300" width="120" height="204" fill={NEAR} />
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <rect x="580" y="300" width="120" height="204" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const exteriorScene = (
  <g>
    {/* Tilt-wall panel elevation with joint lines and a lift. */}
    <rect x="40" y="140" width="620" height="400" fill={FAR} />
    <g stroke={HAIR} strokeWidth="1.5" fill="none">
      <rect x="40" y="140" width="620" height="400" />
      {[195, 350, 505].map((x) => (
        <line key={x} x1={x} y1="140" x2={x} y2="540" />
      ))}
      <line x1="40" y1="300" x2="660" y2="300" />
    </g>
    {/* Reveal joints in red — the sealant scope */}
    <g stroke={RED} strokeWidth="2.5" opacity="0.8">
      <line x1="195" y1="140" x2="195" y2="540" />
      <line x1="505" y1="140" x2="505" y2="540" />
    </g>
    <g fill={NEAR}>
      <rect x="70" y="410" width="96" height="130" />
      <rect x="380" y="180" width="96" height="70" />
    </g>
    {/* Boom lift */}
    <g stroke={HAIR} strokeWidth="2.5" fill="none">
      <line x1="710" y1="520" x2="710" y2="470" />
      <line x1="710" y1="470" x2="620" y2="330" />
    </g>
    <rect x="596" y="308" width="48" height="26" fill={MID} />
    <rect x="682" y="512" width="60" height="22" fill={MID} />
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const occupiedScene = (
  <g>
    {/* Zoned floor plate: one zone under containment, the rest in service. */}
    <rect x="60" y="120" width="680" height="400" fill={NEAR} />
    <g stroke={HAIR} strokeWidth="1.5" fill="none">
      <rect x="60" y="120" width="680" height="400" />
      <line x1="60" y1="320" x2="740" y2="320" />
    </g>
    {/* In-service zones */}
    <g fill={FAR}>
      <rect x="74" y="134" width="290" height="172" />
      <rect x="74" y="334" width="290" height="172" />
      <rect x="452" y="334" width="276" height="172" />
    </g>
    {/* Containment zone — hatched, red boundary */}
    <rect x="392" y="134" width="336" height="172" fill={MID} />
    <g stroke={RED} strokeWidth="2.5" fill="none">
      <rect x="392" y="134" width="336" height="172" />
    </g>
    <g stroke={RED} strokeWidth="1.25" opacity="0.55">
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={392 + i * 34} y1="306" x2={426 + i * 34} y2="134" />
      ))}
    </g>
    {/* Route arrow */}
    <path d="M120 320 L360 320" stroke={RED} strokeWidth="3" fill="none" />
    <path d="M352 312 L368 320 L352 328 Z" fill={RED} />
  </g>
);

const prepScene = (
  <g>
    {/* Substrate section: profile, primer, and the test-point callout. */}
    <rect x="0" y="360" width="800" height="180" fill={NEAR} />
    {/* Profiled surface */}
    <path
      d="M0 360 L40 342 L80 362 L120 340 L160 360 L200 338 L240 360 L280 344 L320 362 L360 340 L400 360 L440 342 L480 362 L520 340 L560 360 L600 344 L640 362 L680 340 L720 360 L760 344 L800 360 Z"
      fill={MID}
    />
    <path
      d="M0 360 L40 342 L80 362 L120 340 L160 360 L200 338 L240 360 L280 344 L320 362 L360 340 L400 360 L440 342 L480 362 L520 340 L560 360 L600 344 L640 362 L680 340 L720 360 L760 344 L800 360"
      stroke={HAIR}
      strokeWidth="1.5"
      fill="none"
    />
    {/* Primer band */}
    <rect x="0" y="316" width="800" height="14" fill={RED} opacity="0.75" />
    {/* Test point */}
    <circle cx="400" cy="230" r="46" fill="none" stroke={HAIR} strokeWidth="1.5" />
    <circle cx="400" cy="230" r="6" fill={RED} />
    <line x1="400" y1="276" x2="400" y2="330" stroke={HAIR} strokeWidth="1.5" />
    <g stroke={HAIR} strokeWidth="1.25">
      <line x1="354" y1="230" x2="330" y2="230" />
      <line x1="446" y1="230" x2="470" y2="230" />
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

const coatingsScene = (
  <g>
    {/* Layered coating system section with a steel member. */}
    <rect x="0" y="380" width="800" height="160" fill={NEAR} />
    {/* Steel I-section */}
    <g fill={FAR}>
      <rect x="270" y="150" width="260" height="34" />
      <rect x="366" y="184" width="68" height="180" />
      <rect x="270" y="364" width="260" height="34" />
    </g>
    <g stroke={HAIR} strokeWidth="1.5" fill="none">
      <rect x="270" y="150" width="260" height="34" />
      <rect x="366" y="184" width="68" height="180" />
      <rect x="270" y="364" width="260" height="34" />
    </g>
    {/* Coating build-up bands to the left */}
    <g>
      <rect x="60" y="200" width="150" height="16" fill={MID} />
      <rect x="60" y="226" width="150" height="16" fill={FAR} />
      <rect x="60" y="252" width="150" height="16" fill={RED} opacity="0.85" />
    </g>
    <g stroke={HAIR} strokeWidth="1.25" fill="none">
      <line x1="210" y1="208" x2="250" y2="208" />
      <line x1="210" y1="234" x2="250" y2="234" />
      <line x1="210" y1="260" x2="250" y2="260" />
      <line x1="250" y1="192" x2="250" y2="276" />
    </g>
    {/* Safety striping on the deck */}
    <g stroke={RED} strokeWidth="4" opacity="0.7">
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={580 + i * 30} y1="470" x2={610 + i * 30} y2="430" />
      ))}
    </g>
    <line x1="0" y1="540" x2="800" y2="540" stroke={HAIR} strokeWidth="2" />
  </g>
);

/* -------------------------------------------------------------------------- */

const scenes: Record<Exclude<ArtKey, 'default'>, ReactNode> = {
  retail: retailScene,
  restaurant: restaurantScene,
  restaurants: restaurantScene,
  healthcare: healthcareScene,
  education: educationScene,
  industrial: industrialScene,
  government: governmentScene,
  office: officeScene,
  hospitality: hospitalityScene,
  sports: sportsScene,
  aviation: aviationScene,
  tenant: tenantScene,
  construction: constructionScene,
  interior: interiorScene,
  exterior: exteriorScene,
  occupied: occupiedScene,
  prep: prepScene,
  coatings: coatingsScene,
};

export function SectorArt({ art, className }: { art: string; className?: string }) {
  const key = (art in scenes ? art : 'office') as Exclude<ArtKey, 'default'>;

  return (
    <div className={className}>
      <Scene id={key}>{scenes[key]}</Scene>
    </div>
  );
}

export const artKeys = Object.keys(scenes) as Exclude<ArtKey, 'default'>[];
