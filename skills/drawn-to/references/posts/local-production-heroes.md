---
slug: local-production-heroes
url: (owner captures + live probes - antigravity.google, openai.com/codex, linear.app, raycast.com, vercel.com/home)
author: Google, OpenAI, Linear, Raycast, Vercel
kind: hero
mode: mixed
motion: sequence
tags: [first-screen, field, webgl, video-ground, particle-field, light-shafts, emissive-object, product-shelf, three-zone-baseline, measured]
---

# Five production first screens, captured and probed

Owner note (2026-08-21): three successive attempts at a landing screen were put
next to these five and none of them arrested the eye the way these do. This
reference is why `hero-atmosphere.md` and `render-tiers.md` exist. The captures
are the owner's own, at a ~1840 CSS-px browser width; the numbers below come
from a second pass at exactly **1440x900** with a computed-style probe, because
a retina capture reads type larger than it is.

Media: `references/media/local-production-heroes/` (full captures, shipped with the skill).
Reference plates shipped with the skill: `assets/heroes/*.jpg` (1440-wide,
chrome cropped) and `assets/plates/zone-*.svg` (own layout diagrams, CC0, geometry only).

## What we see

**Antigravity** - white edge to edge, no gradient. Several hundred 2x8-class
coloured dashes at random rotation scattered across the whole viewport in the
Google hues, denser toward the left and lower edges and thinning through the
middle so the headline sits in clear air. Centred logo lockup, then an eight-word
H1 over two lines, then two pills. Nothing else. The type IS the object.

**Codex** - full-bleed periwinkle-and-white field at extreme optical blur, real
bokeh, a dark violet mass upper right, a bright diagonal lower left, film grain
across it. Centred 90 px app-icon plate at radius 24, "Codex" at 64 px in black,
one sub line, one black pill, a low-opacity logo row, then a dark product window
crossing the bottom edge. A few ASCII arrows in mono upper right as a quiet joke.

**Linear** - pure `#08090A`, transparent nav over a single hairline. H1 left at
the container edge over two lines; one grey sub line; a "New / Coding Sessions ->"
link right-aligned **on the sub's own baseline**; then the product screenshot as
one large rounded frame crossing the fold, with a floating agent window
overlapping it. No field at all, and no button in the hero.

**Raycast** - `#07080A` with a floating rounded nav pill inside the container.
Six or seven huge red diagonal shafts at roughly 55 degrees with dithered, noisy
falloff at their edges and dark blue-black bleeding between them. Centred white
H1 directly on the shafts, placed where the shafts are already dark. Two light
pills, then a mono install hint.

**Vercel** - `#000`, enormous air. Small announcement strip above. H1 small and
left, two pills under it; ten white dots in a triangle dead centre, each with
real bloom; three two-tone sentences right; a seven-logo row at the foot.

## Measured, 1440x900

Full table in `hero-atmosphere.md` § The measured plate. The load-bearing rows:

- Every H1 is **64-72 px** at 1440 (450-600 weight, tracking 0 to -0.06em,
  line-height 1.0-1.1). None is 96 or 112.
- Buttons run **0, 1, 2, 2, 2**. Linear's first screen has none.
- Field technology: **WebGL2** (Antigravity, full viewport, DPR 2.0),
  **video + canvas 2d** (Codex, `floral_a.mp4` 2560², cover),
  **nothing** (Linear), **WebGL** in a 1200-wide box (Raycast),
  **WebGL2 overscanned** with `mix-blend-mode: screen` at DPR 1.48 (Vercel).
- Vercel's canvas sits at x -131 / y -145 on a 1440x900 viewport - the falloff
  dies in off-screen pixels so a resize never exposes an edge.
- Linear's product shelf: top edge y 490 (54 % of viewport height), 410 of 804
  px visible at 1440x900, 170 of 748 at 1280x720.

## What makes them work

1. **Nothing is in a box.** No card, no panel, no container background behind
   the hero copy. The field is the page, or there is no field; there is no third
   setting where a decorative panel sits beside the words.
2. **The optics are real.** Blur at 56-120 px, falloff dithered or grained
   rather than stopped cleanly, bloom at the light source, genuine depth of
   field - filmed where filming is cheaper than simulating.
3. **One light logic each**, and the type is placed where that light is already
   dark, so no headline ever needs a scrim.
4. **Colour is one hue at high energy** (Raycast's red), **many hues at ~1 %
   coverage** (Antigravity), **or none** (Linear, Vercel). Not one of the five
   uses a two-stop brand gradient, which is the shape a generated hero reaches
   for first.
5. **Restraint counts as a field.** Linear renders nothing and wins the set on
   confidence: an empty black screen, one left headline, and a product shot good
   enough to carry the page.

## Why the owner saved them

The five are the WOW-factor bar. Read together they say the first screen is a
different problem from every section below it: section craft is figures, cards
and grids, and applying it to a hero produces a figure in a box beside a column
of copy - the one composition none of these five uses.

## Skill impact

- `hero-atmosphere.md` - part one (the five read, shared formula, optics table,
  Field Hero recipe); part two (measured plate, zone grammar, crop contract,
  type-as-object exemption, archetypes as weights).
- `render-tiers.md` - the whole file: the T0-T6 ladder, promotion gates, DPR and
  fill budgets, the four stop conditions, the poster-first fallback ladder,
  per-tier recipes for grain, bloom, dither, particles, filmed grounds and light
  shafts, and the render-tier tells.
- `quality-bar.md` - the hero crop contract, the light budget, the render-tier
  tells, the type-as-object exemption.
- `question-flow.md` - the field question, the archetype weights, the render
  tier.
