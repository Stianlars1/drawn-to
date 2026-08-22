---
slug: local-stashr-dark-bento
url: (local capture, 842 frames - a dark feature bento for "Stashr"; the capture is a screen recording of a video player, so absolute px and fps are not derivable)
author: unknown
kind: bento
mode: dark
motion: full-choreography
tags: [bento, dark, hub-lattice, cursor-demo, dot-grid, compressed-band, payload-light, ui-fragment, ratios-only]
---

# Compressed-band dark bento - the decorative layer inside 16 luminance

Tier A for ratios, frames and colour; **Tier D for absolute CSS px** - the
capture is a screen recording of a video player (player chrome visible at frames
1 and 841, timestamp "0:01 / 0:28"). fps is only bounded to [30.0, 32.3]. Report
motion in frames. See `measuring.md` § 2.

Plate shipped with the skill: `assets/features/dark-bento-scenes.jpg`.

## What we see

A near-black bento under "More than a bookmark folder". Five cells, each running
its own scene: an AI-tagging card over a food photograph, a hub-lattice
"Capture from every platform" card, a cursor-driven "Save any view as a
Collection" card that filters and then files, a chat-search card that answers
from saved content, and a rotating carousel of AI-model chips.

## Layout

- 6-column grid. Row 1 = three span-2 tiles at aspect **0.9932** - 0.68 % off
  square, deliberately not `aspect-ratio: 1`. Row 2 = two span-3 tiles at aspect
  **1.2957**.
- The measured ratios fit a **1152 px container with a 16 px gap to 0.02 %**.
  Build with those round numbers.
- Ground #151515 (luminance 21.00); card fill #1f201f (31.72).
- **Uniform 1 px #252525 border on all four edges**, and the bottom edge is the
  brightest (37.0 against 35.0-36.0). It is `border: 1px solid`, not a gradient
  border.
- Corner radius fits a true circular arc (rms 0.43 px) - no squircle needed.
- No drop shadow anywhere.
- Text ink: heading >= #eeeeee (modal #e0e1e0), body >= #9b9b9b (modal #8d8d8f),
  body at 65 % of heading at peak.

## The hub-lattice card

The many-to-one card, built so it does not collapse into the generated
integrations picture:

- Marks sit on a **rectangular lattice, not a circle**: x at card centre
  +/- 386.9 capture px, y at hub -231.1 / 0 / +232.9 (ratios to the 163.24 hub
  tile: 2.37 and 1.42). The circular feeling comes entirely from the rings and
  the bezier tangents.
- Each mark sits in a **ring-only chip with no fill** - 160 capture diameter
  (0.98 of the hub tile), ring peak luminance 35.0 (#232323), interior left as
  the card fill so the dot grid shows straight through. Glyph about half the chip.
- Three concentric rings at r = 140.5 / 195.5 / 251, constant step 55.25 = 0.34
  hub-tile widths, which **dim outward**: peak luminance 36.4 / 35.9 / 35.1. Each
  band is asymmetric with its long tail on the OUTSIDE (rise 8 px inward, fall
  13 px outward, FWHM 11.3 / 12.4) - a stroke with a soft outer edge, not a
  hairline circle.
- **Three connectors, not six**: one continuous cubic bezier per diametrically
  opposite pair, control points at 0.435 of the horizontal span with horizontal
  tangents at both ends (RMSE 1.66 over 21 sampled points), stroke ~1.6 in
  neutral #30302f. The hub tile is painted LAST so it occludes the crossing.
- Dot grid pitch 34.098 column / 33.96 row, dot core 5.48, 34 columns, first dot
  48.40 from the left and 48.05 from the top (equal insets), colour #35344a -
  blue exceeds green by ~23. It fades: full to y 1264, then 21.90 / 11.40 / 2.00
  at 1298 / 1332 / 1366, zero by 1400.
- **Decorative layers are tinted; the diagram is not.** Dot grid violet-blue,
  rings violet-leaning, connectors strictly neutral.

## The compressed band

The entire decorative layer lives inside a **16-luminance band** over the card
fill: dot grid +5 to +30 at the dot core, rings +10 dimming outward, connectors
+16. The only saturated colour in the whole section is the payload in flight.
White is rationed to exactly two jobs: the primary CTA and the saved artifact.

## Motion

- **Round-robin pulse:** one item in flight at a time, 72-80 x 8 capture px,
  ~71 capture px per frame, **always mark -> hub**, launch interval 8.4 frames,
  a six-mark round in 50.5 frames, each pulse visible 3-5 frames. Peak colour
  #4d4ab7 - #6359ca. Then a **5.15 s rest** between rounds: complete stillness.
- **Orbit:** 3.1292 degrees per frame, linear, no easing (straight-line residual
  rms 0.732 deg over 65 frames), revolution 115.04 frames, two dots exactly
  antipodal.
- **Carousel:** 58 frames per slot, exponential ease-out decaying at a constant
  ~0.82 per frame (tau ~5, settling over ~26 frames).
- **Cursor:** ~90 % of the distance in the first third, then a 4-6 frame settle
  of 10 / 5 / 5 px; dwell 58 frames on the control; the folder rises in 6 frames
  (white area 916 -> 11 818 -> 27 021); chips ingest one per ~14 frames; the
  folder fills over 8 frames.
- **The cursor gate:** exactly one cell carries a simulated cursor, and it is the
  one whose heading's verb belongs to the USER. Where the verb belongs to the
  system, there is no cursor.
- Every loop resolves on a **named artifact** - three tags, a folder called
  "X Designs", a dated answer with a source - never on a reset.

## Card details worth stealing

- **Two-inset card:** the control row (filter pill + action button) is inset
  1.40x further than the title and description block below it. Equal insets read
  as a template.
- **Control grammar:** a dashed border means "empty slot, add something", a solid
  border means "commit". The dash is authored - period 16.978 capture at dash
  9.89 / gap 7.11 = 1.39:1, i.e. `stroke-dasharray: 3 2` at a ~5.2 px period.
- AI-model chips: diameter ~218 capture, fill **#1b1b1b - darker than the card**,
  and the edge is a 31 px rim gradient peaking #363736-#383838 at r = 106, not a
  1 px hairline. Selection ring 270 capture (1.24x the chip), FWHM 3.9, ~#5d5d5d.
  ONE vertical hairline at card centre, peak luminance 61.7, ~7 capture wide -
  there is no horizontal hairline and no crosshair.
- Folder: front 352 x 181 capture, back edge raised 12, tab starting at 34.2 % of
  the width, on the RIGHT.
- Tag chip dots 47.5 / 46 / 45 capture: #ef6815 orange, #3e71fa blue, #e13f91 pink.

## Why saved

It is the dark-mode counterpart to the hairline lattice: five cells, five
different scenes, and a discipline that keeps every decorative element inside a
16-luminance band so the payload is the only thing that ever reads as colour.

## Extractable rules

1. Put the whole decorative layer inside ~16 luminance of the card fill; let the
   payload be the only saturated thing.
2. Build a many-to-one card on a rectangular lattice with bezier connectors, not
   a circle of logos.
3. Ring-only chips with the ground showing through beat filled tiles.
4. Rings dim outward and carry their soft edge on the outside.
5. One cursor per section, gated on whose verb the heading uses.
6. End every loop on a named artifact, never on a reset.
7. Inset a control row further than the copy block beneath it.
8. Let the board rest - seconds of complete stillness are a choice.
