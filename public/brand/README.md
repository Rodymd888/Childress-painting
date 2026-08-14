# Brand assets

Four files, all cut from the master Childress Painting artwork. Nothing is
redrawn and nothing is recoloured: the logo on the site is the logo.

| File | Size | Use |
| --- | --- | --- |
| `logo-header.png` | 900×373 | Paint can + CHILDRESS PAINTING. Header and mobile menu. |
| `logo-full.png` | 1000×557 | The above plus the "Since 1984" banner. Footer. |
| `logo-complete.png` | 1200×788 | Full artwork including both taglines. Social share card. |
| `logo-mark.png` | 256×256 | Texas roundel. Compact and square. |

`app/icon.png` and `app/apple-icon.png` use the Texas silhouette on the brand
ink field. The full roundel was tried first and turned to mush at 16px; dropping
the outer ring keeps the mark readable in a browser tab.

## One asset per context, no dark variants

The supplied artwork carries white outlines around the lettering, so it holds
contrast on the ink header and on white alike. Earlier revisions kept separate
`-light` files produced by inverting the neutral ink; those are gone, because
altering supplied artwork to suit a background is the wrong way round. Where
contrast is a problem, change the background.

## Which artwork goes where, and why

The **header** uses `logo-header`, sized by height (38px on phones, 46px from
1024px) so width follows the aspect ratio. The full lockup was tested at header
size and the banner and taglines are illegible below roughly 60px tall, so they
are cut from this variant rather than shrunk into mud.

The **footer** and **share card** use the fuller artwork, where the banner and
taglines have room to read.

The **roundel** appears on branded "Project Gallery Coming Soon" covers, which
keeps a project awaiting photography visibly ours.

## Proportions

Every use sets a height and lets width follow (`w-auto`, or `height: 'auto'`).
The logo is never given both dimensions, so it cannot be stretched. Intrinsic
dimensions are passed to `next/image` so nothing shifts while it loads, and
`sizes` is set per context so phones do not download desktop-width files.

## Replacing the logo later

Everything renders through `components/layout/Logo.tsx`, which is the single
source. Export the four PNGs above at the same aspect ratios, overwrite them,
and update the `ART` map in that file if the dimensions change. No other file
needs touching.
