---
slug: local-vite-feature-sheet
url: https://vite.dev (local full-page capture + a hover-state capture)
author: Vite
kind: section-set
mode: dark
motion: micro
tags: [drafting-sheet, hairline-frame, isometric, hover-lift, light-leak-plate, receipt-panel, dark, developer-tool]
---

# The drawing sheet - 1px rules, media flush, text inset, one tile that lifts

Tier A - every value below was independently re-measured by an adversarial pass,
which overturned eleven of the first-pass figures (they are listed at the end so
they are never written again).

Media: `references/media/local-vite-feature-sheet/` - the hover-state still plus
six slices of the full-page capture.

Plate shipped with the skill: `assets/features/iso-tile-lift.jpg`.

## What we see

A dark developer-tool page laid out as a drafting sheet: persistent 1 px rules
running the full page height, feature cells sitting in the resulting lattice,
and two alternating registers inside the cells - grainy single-hue purple fields
carrying terminal and CI "receipts", and flat-ground technical isometrics. On
hover, one isometric tile lifts along the iso axis, exposing a lit side ribbon
over three dashed extension lines and no shadow at all.

## Layout

- Container 1200 CSS (1166 slice-px), 6 columns at 194.3 slice pitch, feature
  cells spanning 3 (~600 CSS each).
- **Rules are page furniture, not cell borders**: 1 px, #35303A - violet-leaning,
  with R and B both above G. A neutral rgba(255,255,255,0.1) reads dead against
  this ground. They meet in plain T-junctions: no radius, no corner treatment.
- Rows are content-sized, not fixed - 457 and 442 slice-px in one grid.
- **Text is inset ~36 CSS from the rule; media is flush to it.** The purple
  panels' last row sits directly on the row divider. That single inconsistency is
  the whole layout idea.
- Heading pure white, cap 14.5 slice (~20 px). Body peak rgb(141,133,150), line
  pitch 23.0 slice (~23.7 CSS). Mono label cap 9.5 slice (~9.8 CSS, 13-14 px
  font), advance 7.94 px/char, with a 1 px dotted leader (1 dot / 2 gap) 8.9
  slice below the baseline, flush with the label's left edge and running past the
  text.

## The two registers

Never mixed inside one cell.

- **Receipt** - a real terminal or CI panel with a right-aligned numeric column,
  on a full-bleed photographic light-leak field. For speed and size claims.
- **Technical isometric** - on the flat ground. For structure claims.

## The light-leak field

A real grainy plate, not a CSS gradient. Median rgb(107-114, 21-24, 225-233),
p95 rgb(125-136, 30-31, 246-253), grain sd 3.4 per channel even in a JPEG.
**There is no single streak angle**: structure-tensor orientation measures 6,
-25, -45 and +29.5 degrees in four different patches of the same plate, so
quoting one angle makes a rebuild look wrong. `linear-gradient(135deg, #7017E7,
#BD34FE)` is the exact slop signature this replaces (`gradient-fields.md` G16).

## The isometric, measured

- **TRUE isometric, 30.0 deg +/- 0.1** - slopes +0.5774 +/- 0.0017 (rms 0.235,
  n = 62), -0.5771 +/- 0.0010, -0.5752 +/- 0.0024. 2:1 dimetric is excluded by
  over 70 sigma. SVG `matrix(0.86603 0.5 -0.86603 0.5 cx cy)`; CSS
  `rotateX(54.7356deg) rotateZ(45deg)`. `rotateX(60deg)` gives 26.57 deg and is
  wrong.
- Top face 214.7 x 124.0 ref, ratio 1.732 = sqrt(3).
- **Corner radius k = 0.214 of the source square side** (0.207-0.221 by two
  independent routes); projected k*a = 26.5 ref. The corner arc is an ELLIPSE
  with semi-axes 32.5 horizontal x 18.7 vertical - sqrt(3):1, major axis
  horizontal. Round before projecting, never after.
- Tile thickness 21.16 +/- 0.16 ref (0.171 of rhombus height, ~8.8 CSS).
- **Tiles do not touch:** lattice pitch 128-130 against an edge length of 124.0
  leaves ~5.5 ref (2.3 CSS) perpendicular gap, verified by occlusion - the
  exposed ribbon between neighbours is 6.0 px where full thickness is 21.16.
- Ground #16171C at sd 0.000. Side face #08060C, flat, no grain, **darker than
  the ground**. Top face rgb(23.94, 22.70, 29.98) with **grain sd 2.2** - grain
  lives on the objects, not the page, which is the reverse of a noise overlay and
  is why the tiles read as material.
- **Chroma-not-value separation:** ground G > R, face R > G, two luminance units
  apart. Back-edge rim +7 per channel over ~3 AA rows, peak (31,29,37).
- Glyph 21 % white (#48464D p95) at rest, 100 % white on hover.

## The hover contract

- **Lift 48 ref px = 20 CSS = 0.39 of the rhombus height = 2.3x the thickness**,
  straight up in screen space (horizontal drift 0-1 px).
- **Zero shadow pixels.** 2 940 px inside the lifted tile's footprint all read
  exactly (22,23,28), min = max. A soft drop shadow here would flip the register
  from technical drawing to floating UI card in one step.
- Instead: exactly three 1 px dashed vertical extension lines, period 13.0 ref at
  a **1:1 duty cycle** (6.5 on / 6.5 off -> `stroke-dasharray: 2.7 2.7` at a 5.4
  CSS period), colour #504E58 ~ rgba(255,255,255,0.25), each masked
  `linear-gradient(to bottom, opaque, transparent)` over its own length. Per-line
  decay -6.49 / -5.77 / -6.43 ink units per px.
- The lit ribbon: extent 478.2-668.2, per-column peaks 454 / 533 / 526 / 493 /
  416 / 591 / 532 / 459 / 352, hard 2 px edges, **no bevel and no bloom**.
  Cross-band gradient energy is 7x the along-band energy - it is a TEXTURE
  showing through, not a light model.
- Build it by drawing the same transformed rounded path twice: the lower copy
  filled with the side colour, the upper copy translated up by the thickness. The
  exposed sliver IS the ribbon, and swapping the lower fill from a solid to a
  clipped `<image>` gives it a texture for free.

## Slop shipped in this reference

The three dashed lines are NOT derived from a footprint rhombus - x spacings
97.04 vs 87.43 where a rhombus needs them equal, zero-crossings differing by
11.6 px where a rhombus needs 0. And the lifted tile renders 1.8 % larger than
its resting siblings (190.0 vs 186.83 ref silhouette width) where a pure
translate should not change silhouette width at all. Carry the principle, not
the sloppiness.

## Extractable rules

1. Run the 1 px rules the full page height as furniture; T-junctions, no radius.
2. Tint the rules toward the ground's hue; neutral white-alpha reads dead.
3. Inset the text from the rule and let the media sit flush on it.
4. Put the grain on the objects and leave the page at sd 0.000.
5. Separate a face from its ground by CHROMA when you only have two luminance
   units to spend.
6. Round before projecting; the projected corner is an ellipse at sqrt(3):1.
7. Annotate a lift with dashed extension lines; never add a shadow.
8. Draw an extrusion twice rather than modelling a side face.

## Refuted first-pass claims - never write these

Lift 62.5 ref / 0.502 of rhombus height / ~26 CSS / 2.7x thickness · dash 8 on /
5 off at 1.6:1 · "all three lines terminate on footprint-rhombus vertices" ·
"the same amplitude decay for all three lines" · "the first dash begins exactly
at the tile vertex" · "tiles touch, gap = 0" · radius r*s = 24.85 ref or r/a =
0.199 · "radius ~13 CSS" quoted without its construction convention · thickness
"0.18 of rhombus height" · scale 2.37 image px per CSS px (it is 2.400, so every
figure derived from 2.37 is 1.3 % low) · "streak direction 117.5 deg" · mono
label cap 8 slice-px.
