---
slug: local-keep-photographic-trio
url: (local capture - a three-card feature row using photography as the card ground)
author: unknown
kind: feature-cards
mode: light
motion: none
tags: [photographic-ground, veil-split, crop-marks, dashed-frame, micro-card, object-count-law, light]
---

# The photograph tints its own caption - and one card is 95 % empty

Tier A - independently re-measured. Where the source file was too small to
resolve a claim, that is said rather than guessed.

Plate shipped with the skill: `assets/features/photographic-ground-trio.jpg`.

## What we see

Three feature cards in a row, each with a photographic ground and one floating
object: "Visual Pipelines" (a whole kanban board over a green-grey wash),
"One-Click Handoff" (a single file chip alone on a sand field), "Crystal Clear
Feedback" (a framed greyscale photograph of a stairwell with an annotation pill
on it). A dashed hairline frame with solid corner squares runs across the row.

## The veil split - the mechanism worth stealing

One photograph at `cover` across the **full inner rectangle** (413.0 x 374.6
CSS), not cropped to the media zone. The bottom **26.20 %** is then hard-cut by a
flat `rgba(255,255,255,0.68)` veil (per card 0.699 / 0.663 / 0.663; p5-p95
0.604-0.743). The 10-90 transition measures **2.50 CSS** against a resample floor
of 1.5 - that is antialiasing of a non-integer boundary, not a fade. No second
background token, no gradient stop, no radius change, no border, no inner shadow
at the seam.

**The consequence is the reason to build it this way:** each card's text panel is
auto-tinted by its own photograph, so nobody picks a panel colour. Card 1 runs
#DDDFD9 at 2 % width to #F5F6F0 at 85 %; cards 2 and 3 run #F3EEE4 to #F8F5ED.
The profile is non-linear across x and varies with y - no CSS `linear-gradient`
reproduces it.

Media zone 413.2 x 276.4 CSS, aspect 1.4951 -> build `aspect-ratio: 3/2` (0.91
CSS off exact). Split 73.80 / 26.20; media:text 2.817:1.

Contrast is verified **per card, not once for the row**, because the panel IS the
photo: title contrast 15.96 / 17.88 / 17.74:1, body 6.8-8.7:1.

## The object-count law

**Object-to-canvas ratio is an output of the claim, never an input.**

| Claim | Object | % of media area |
|---|---|---|
| "Kanban view" | a whole board | 51.08 % |
| "Annotate on the image" | one framed photo | 43.4 % |
| "One click, one bundle" | exactly one chip | 4.79 % (3.27 % of the card) |

The 10.7x spread IS the argument. Do not normalise siblings toward each other.
Card 2 is **95.19 % untouched photograph** and reads as confidence rather than as
an unfinished cell, for three measurable reasons: the text mass is constant
across the row (one title line and exactly two body lines on every card,
enforced by editing copy), the photograph under the object is tonally flat
(39.57 % of that card's media sits within +/-6 luminance of its modal 226), and
the chip is dead centre horizontally but **deliberately not vertically** - 147.9
above / 91.9 below = 1.610, centre at 60.2 % of media height. A dead-centre
object in a large empty field reads as a placeholder.

## Chrome

- Three 429.2 x 390.1 CSS cards (aspect 1.100), card pitch 436.1, border-centre
  separation 6.9 CSS - so three separate dashed rects read as one continuous
  frame across the row even though each border genuinely breaks at the gutter.
  The gutter channel is 5.1 CSS at PAGE level #FAFAFA, not white.
- Dashed border 1 px, period 4.014 CSS, dash 2.2-2.6 / gap 1.4-1.8, stroke
  #E4E4E0-#E8E7E2, contrast 1.18-1.21:1 on #FAFAFA.
- Twelve solid corner squares, 5.08-5.26 CSS, #9B8860, 3.40-3.46:1 on white.
- Mount #FFFFFF, padding 7.38 CSS left and right, 7.2 top, on a page that is
  literally flat #FAFAFA (high-pass sigma 0.000).
- **Radius 0 on card, mount, media, split and text panel.** The only rounding in
  the row is on the three floating objects: chip ~8.9, kanban columns 6.20, video
  frame 6.0-6.5.
- Type: title cap 14.7, x-height 10.0, x/cap 0.68 -> ~20 px; body pitch 19.29
  (line-height 1.48). Media bottom -> title cap-top 18.5; title baseline -> body
  baseline 28.02; last descender -> inner bottom 13.8.

## Separation without a scrim

Object-to-ground contrast measures 2.06:1 / 1.73:1 / 3.12:1 with **no scrim, no
vignette and no glass panel anywhere**. It works because the photograph is chosen
so the region under the object is tonally flat. Shadow ceiling for an object
floating on photography: peak darkening 4.95 % of ground, reach 12 CSS, y-offset
3 -> `box-shadow: 0 3px 12px rgba(0,0,0,0.055)`.

## Anti-tell shipped in this reference

Cards 2 and 3 use the **identical photograph** (mean absolute difference
0.47/255 over 66 626 px after sub-pixel alignment), and card 1's grain is graded
5-7x heavier than its siblings. Copy the METHOD, not the instance: in a set the
ground MAY repeat (it is register), the object may NOT (it is argument), and
grain is measured per card and matched across the row.

## Extractable rules

1. Run the photograph across the whole card and hard-cut a flat white veil over
   the caption zone; the panel then tints itself.
2. Verify contrast per card, never once for the row.
3. Let object size be dictated by the claim's count, and refuse to even it out.
4. Off-centre the object vertically when the field is large and mostly empty.
5. Hold text mass constant across the row by editing copy, not by flexing frames.
6. Radius 0 on all chrome; let the floating objects be the only rounded things.
7. One photograph per card. Ground may repeat; the object may not.

## Not measurable from this file

The capture is 1500 x 842, so nothing finer than ~1 CSS px is verifiable: the
2.5/1.5 dash split to 0.1 px, 1 px stroke hexes, the 0.5 px corner-square
overhang, the 1.5 px split transition and the 1.0 px body stem are all below the
floor. Card 2's claimed defocus radius and "4.5x sharpness ratio" are not
reproducible - the two real edges are 2.0-2.5 CSS (hard) and ~79 CSS (a slow
ramp), a measured ratio of 3.7x with both terms floor-limited.
