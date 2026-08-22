---
slug: local-chatsheet-iso-bento
url: (local capture, 182 frames at 3456x2168 - the automation grid of the Chatsheet site; hero of the same product is marcelkargul-1952697)
author: marcelkargul
kind: bento
mode: light
motion: full-choreography
tags: [bento, hairline-lattice, isometric, soft-shaded, harmonic-loop, anchor-pinning, dash-grammar, light, per-feature-scene]
---

# Hairline lattice, one isometric diorama per automation

Tier B - the capture scale was solved from DPR-2 metadata and is corroborated by
the sibling reference, but it has not been independently re-measured. Ratios are
safe; absolute CSS px carry the tier.

Media: `references/media/local-chatsheet-iso-bento/frames_1/` - 46 frames sampled
every 4th from the 182-frame loop, 1200 px wide.

Plate shipped with the skill: `assets/features/iso-automation-grid.jpg`.

## What we see

"Examples of What You Can Automate With Chatsheet" over ONE bordered rectangle
ruled internally into five cells - three across the top, two across the bottom.
No cards, no gaps, no shadows, radius 0. Each cell carries a title, two lines of
body, and a soft-shaded isometric diorama that runs down until the bottom rule
clips it. Five automations: document generation and filing, email and Slack
workflows, CRM and data syncing, internal approvals, HR onboarding.

The whole roundness, depth, gradient and shadow budget of the section is spent
INSIDE the drawings. The chrome has none of it.

## Layout

- Grid 1131.5 CSS wide. Row 1 = three equal ~376 px cells; row 2 = two ~564.5 px
  cells whose divider sits on the container's exact horizontal midpoint and
  therefore does NOT line up with either row-1 divider. **That misalignment is
  what makes it a bento rather than a table.**
- Cell inner height 410.5 CSS in row 1; aspect 376:413 = 0.910.
- Rules 1 px, darkest pixel #E6E7E6, integrating to ~#E5E7E6. Radius 0, verified
  square at 8x zoom. Page #F5F6F8, cells #FFFFFF.
- Internal rhythm, byte-identical in both rows and undisturbed by the row change:
  cell top rule -> title cap-top 31 · title baseline -> body first baseline 37.5
  · last body baseline -> illustration top ink 48.5 · padding ~26 · measure
  324 / 513 CSS.
- Every illustration is clipped 2.0-2.5 CSS px short of the bottom rule.

## Graphic language

- True 30.0 degree isometric (dy/dx = 0.578 fitted on a straight edge run with
  the corner arcs excluded).
- **One dash grammar for everything**: 8.2 CSS pitch (dash 4.25 / gap 3.95),
  serving connectors, ground lanes, actor drop-lines, footprint ellipses and
  lift rails alike. Activity is encoded by stroke colour only - #313942 active,
  #C8D6EE inactive. There is no second dash pattern anywhere in the section.
- **Exactly two stroke weights**: 0.7 CSS hairline and 1.4 CSS foreground, a 2:1
  ratio, with the hairline FINER than the 1 px cell border so the drawings sit
  visually behind the chrome instead of competing with it.
- **Three-state material code, spelled in the SIDE WALL and never in size:**
  pending = white top face + grain + a 0.7 px pale outline + an #F0F2F8 wall ·
  live = a horizontal #FFFFFF -> #B1CDFF top ramp + a 1.4 px #4A79D4 outline +
  a #3C79FC wall · done = the same ramp with an #091733 wall.
- The top-face gradient is strictly HORIZONTAL - the perpendicular axis varies
  only 5 levels over 100 px.
- Grain over every ramp: patch mean 252-254, sigma 6-11, 2-10 % coverage, cell
  1-1.5 CSS, autocorrelation lag-1 0.80-0.86 falling to 0.22-0.35 by lag-3.
- Shadows are 1-3 % blurred silhouette copies offset down-right, hugging the
  silhouette. No layout-level shadows anywhere.
- Palette: #3C79FC brand blue · #091733 navy · #C2D5FE periwinkle · #4A79D4 tile
  outline · #313942 dash charcoal · #C8D6EE inactive dash · #EA4335 badge · body
  ink #5B5D65.

## Motion

Loop 182 frames, seamless (frame 182 matches frame 1 at residual 0.00). Frame
rate not recorded - report in frames.

- **Harmonic lock:** every oscillator's period is an exact integer division of
  the master loop. k = 1 in cells 1, 2 and 4; k = 2 in cell 3 (60 % of its moving
  pixels); k = 3 in cell 5 (62 %). That lock, not a crossfade, is why the board
  has no visible seam.
- **Anchor pinning:** one object per cell does not move at all. A Slack tile
  measured dx = dy = 0 with residual 0.00 across all 182 frames; a database stack
  held centroid drift under 0.3 px. Everything else animates relative to it.
- **Dwell budget:** the one discrete event occupies 24 % of the loop. The other
  76 % is a dead hold.
- **Unison, not stagger:** every satellite peak clusters at 49-58 % of the loop.
- Lift furniture: a dashed footprint ellipse 27.5 x 12.5 CSS plus TWO parallel
  vertical rails one badge-diameter (27.5) apart spanning the travel. Badge mask
  area is constant at 238-246 px across the loop - a pure `translateY` of 40.6
  CSS, rest f1-f40, rise f41-f97 (peak 2.7 CSS/frame), hold to f131, fall to f181.
- Lane slides +23 and +14.5 CSS on an easeInOut of power ~2.4 with dwells at both
  ends. Actor hover: dx locked at 0.0, dy 10.5 / 18 / 20.5 CSS on a raised cosine.

## Why saved

The owner's ask was "illustrations that fit their feature so well you do not need
the copy". This is the light-mode answer, and it is the strongest example in the
corpus of a section where the CHROME gives up all its expressive budget so the
DRAWINGS can have it.

## Slop shipped in this reference

Being loved is not a defence, and these are now tells in `quality-bar.md` § 1:
the notification badge's numeral renders **upside down** in all 182 frames
because the glyph went through the top-plane transform with its disc · card 3's
body copy has a missing brand name ("Keep tools like  , Airtable") with a double
space and a dangling comma, live in every frame · six third-party logos are baked
into a decorative diorama · one decorative S-lobe connector routes around
nothing.

## Extractable rules

1. One rectangle, ruled inside; row 2's divider on the container midpoint so it
   misaligns with row 1.
2. One dash pitch for every dashed thing in the scene; colour carries activity.
3. Two stroke weights at 2:1, hairline finer than the surrounding UI border.
4. State lives in the material, never in size or position.
5. Every oscillator on an integer division of one master loop.
6. Pin one anchor per cell to sub-pixel accuracy and animate around it.
7. Clip the drawing at the cell edge; leave 2.0-2.5 CSS px of ink running.
