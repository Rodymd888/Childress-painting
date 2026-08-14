# Brand assets

All files here are derived from the master Childress Painting artwork. Nothing
is redrawn: the shapes are cut from the supplied file so the logo on the site is
the logo.

| File | Use |
| --- | --- |
| `logo-full.png` | Paint can, wordmark, and "Since 1984" banner. Light backgrounds. |
| `logo-full-light.png` | The same lockup, for dark backgrounds. |
| `logo-mark.png` | Texas roundel. Light backgrounds. |
| `logo-mark-light.png` | Texas roundel, for dark backgrounds. |
| `logo-complete.png` | Full artwork including both taglines. Light backgrounds. |
| `logo-complete-light.png` | The same, for dark backgrounds. Used by the share card. |

`app/icon.png` and `app/apple-icon.png` use the Texas silhouette alone on the
brand ink field. The full roundel was tried first and turned to mush at 16px;
dropping the outer ring keeps the mark readable in a browser tab.

## How the variants were produced

**Transparency.** The master arrives on white paper with no alpha. Alpha is
derived from distance to white with a short feather, then the white fringe is
un-multiplied so edges do not glow when placed on ink.

**Dark-background variants.** Neutral ink is inverted; saturated red is left
alone. Inverting neutrals wholesale rather than just recolouring the black is
what keeps the "Since 1984" banner working: it flips to a light plate with dark
lettering instead of losing its text into its own background.

## Which artwork goes where

The header uses the roundel with live type. The full lockup is too wide and
carries too much detail to read at 32px, while the roundel holds up. The footer
and the social share card use the fuller artwork, where the banner and taglines
are legible.

## Replacing the logo later

Drop the new master in and re-run the derivation, or export the six PNGs above
at the same dimensions and overwrite them. `components/layout/Logo.tsx` reads
these paths and needs no change unless the aspect ratios move.
