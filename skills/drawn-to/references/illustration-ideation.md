# Illustration ideation - inventing the graphic for each feature

The skill must not only pick styles; for feature-card work it must PROPOSE the
illustrations: 2-4 genuinely creative concepts per feature, each buildable in
HTML/CSS/SVG at design-engineer grade. This doc is the method, the device
catalog, and the proposal protocol (the QI stage). Evidence anchors:
local-feature-graphics (the fit-method exemplar), adriankuleszo-2089887
(diegetic chrome), marcelkargul-2090148 (isometric line-art), 0xSero-2090
(blueprint plates), LexnLin-2089 (mechanism diagrams), yurygok-2089624
(bespoke chart forms), plus `graphic-language.md` for the full texture layer.

## The fit-method (how a concept is derived, per feature)

1. **Extract the VERB and the claim.** Not the noun, never an icon. "Instant
   verification" → *verifying, fast*; "Encrypted infrastructure" →
   *protecting, continuously*; "Global" → *everywhere at once*. If the copy
   has a measurable claim (256-bit, 190+ regions, <10s), the number belongs
   IN the illustration as a readout.
2. **Choose the metaphor register** - one per PROJECT, restated per card
   (C-rule: one material system for the whole set):
   - *Instrument*: the feature as hardware - dial, gauge, knob, radar, LCD
     (local-feature-graphics; fits security/infra/perf products).
   - *Mechanism*: the feature as a diagram that runs - hub-and-spoke,
     pipeline spine, exploded isometric (LexnLin-2089, marcelkargul-2090148).
   - *Product-fragment*: the feature as the real UI mid-action, skeletonized
     to 3-5 selling data points (adriankuleszo-2089887, LexnLin-2024).
   - *Blueprint plate*: the feature as a labeled technical figure - line art,
     FIG numbering, real commands (0xSero-2090).
   - *Material/atmosphere*: the feature as a physical phenomenon - light,
     goo, shader field (arknow91-2089, madebylalit-2088; for AI/ambient).
   - *Isometric object*: the deliverable drawn as an iso object on a visible
     grid - blueprint line-art (dark) or soft-shaded (light); conveyors for
     flows (marcelkargul-2090148, marcelkargul-1952697; full craft in
     `isometric-and-light.md`).
3. **Compose: one hero object + orbiting evidence.** The hero performs the
   verb; 1-3 evidence chips carry the proof (checklists, alerts, readouts,
   key-value tables) with product-true microcopy (C10). Faint traces/frames
   tie the hero to the card edges so it sits IN the card.
4. **Accent = the living datum.** Grayscale everything; the one accent marks
   what the feature acts on (the scanned face, the progress arc, the pins).
5. **Design the still first, name the motion second.** Every concept must
   carry the pitch as a static frame (C12); then note its one motion
   opportunity per `motion-grammar.md` (a loop that enacts the verb, a hover
   state-change, or a scrub beat).

## The set law - a device is spent when it is used

Any surface carrying TWO OR MORE illustrations at once - a feature trio, a
bento, a card grid, a gallery wall, a feature-trio screen inside a catalog -
is a SET, and a set has rules a single illustration does not:

1. **One device, one cell.** Each cell names its device from the catalog
   below, and no device may appear twice in the same set. "Skeleton bars in a
   frame" is ONE device; three drawings of grey bars inside a thin rectangle
   are that device three times, whatever the bars are supposed to mean.
2. **Two registers minimum.** The cells of a set span at least two metaphor
   registers from step 2. Step 2's "one register per PROJECT" governs the
   MATERIAL SYSTEM (line, ramp, accent, grain), never the objects: inside a
   set the objects must diverge or the set has one idea.
3. **Verbs before drawings.** Run step 1 per cell and write the verbs down
   first - read / weigh / bind. If two cells produce the same verb, the COPY
   is the defect: fix the feature list, not the drawing.
4. **Same finish, different object.** One line weight, one ramp, one accent
   across the set; a different hero object in every cell.

**How the corpus actually does it - the four dials.** Measured off the four
sets the owner saved for exactly this reason (Triopixels-2089, LexnLin-2024,
adriankuleszo-2089887, 0xSero-2090): every one of them varies each card by ONE
NOTCH on three or four independent dials, and no two cards in a set share a
combination. This is the mechanism behind "different device" - name the notch,
not a mood:

| Dial | Notches seen in the corpus |
|---|---|
| **Primitive** - the one shape vocabulary a cell owns and never borrows | wide row · keycap · small pill · bare circle node · vertical bar · circle+diagonal · axis-aligned rectangle · noisy polyline + dotted leader · arc + filled square |
| **Arrangement** - how the primitives are placed | raked vertical stack · single horizontal baseline · diagonal staircase (+55, +30 per step) · free 2D scatter · orthogonal series on a baseline · occluding two-plane stack · cropped gallery · exploded flat parts grid |
| **Depth encoding** - how the third dimension is spent | opacity + width steps · overlap + scale · tone along one axis · real Z bands · none (deliberately flat) |
| **Symmetry** | 4-fold radial · single vertical mirror · asymmetric · hard-cropped by the frame |

adriankuleszo-2089887 states it most plainly: every card is assigned a
different SPATIAL ARRANGEMENT VERB - stack in depth, place two widths side by
side, repeat in a cropped gallery, explode into a flat parts grid, annotate one
continuous canvas - and no verb repeats. 0xSero-2090 varies the primitive and
the symmetry while holding every stroke at exactly 1 px and every radius at 0.
Triopixels-2089 varies primitive, arrangement, depth and even whether the card
keeps the shared sky at all, while the shell and the shadow never move.

So: hold the FINISH rigid (one hairline weight, one radius family, one ramp,
one accent, one shell, one shadow) and spend all the variety on the dials. A
set where the finish varies and the objects rhyme is the exact inversion of
what the corpus does.

The set law is checked as a table, not as a feeling. BEFORE writing any
markup, write this table into the lock file - one row per cell - and stop the
build if any value in the Device column repeats:

| Cell | Verb (step 1) | Register (step 2) | Device (catalog) | Hero object |
|---|---|---|---|---|
| Discover | reads before it asks | mechanism | mini-flow spine | repo node fanning into three extracted chips |
| Interview | weighs, never forces | bespoke chart form | DIP-switch weight bank | the 70/20/10 sliders mid-throw |
| Lock | binds a decision | blueprint plate | screwed plate + seal | the numbered lock row, stamped |

If a set cannot produce N distinct devices, the set is too big: cut it to the
number of genuinely different mechanisms, or ship the cells typographically
with no illustration at all (`quality-bar.md` § 3). Never pad with a repeat.

## How to actually build one - isolate, magnify, squint, assemble

Measured against two builds of the same trio on 2026-08-21: one assembled
straight into the page and read as slop, one built this way and the owner
called it "akkurat sånn skillen vår skal klare". The difference was not talent
or taste. It was the working method, and it is four steps:

1. **Isolate.** One standalone file per cell - `discover.html`, not
   `page.html`. Nothing else on the canvas, no page chrome, no siblings. A
   figure built inside a finished page inherits that page's compromises and
   never gets looked at on its own.
2. **Magnify.** Render each figure alone at 2-3x its delivered size and READ
   it. Every label, every tick, every hairline. Anything you cannot read at 2x
   is decoration at 1x, and the guide tier that measures below about 2:1 on
   its ground has already disappeared at delivered size - check it, do not
   assume it.
3. **Squint.** Put the cells side by side at 25 % with the type hidden. If two
   silhouettes rhyme, one of them is not designed yet. This is the set bar
   test (`quality-bar.md` § 3b.3) run BEFORE assembly, where it is still cheap
   to change the device.
4. **Assemble last.** Only then paste into the page, and re-render the whole
   screen to check the figures against the copy and the fold.

Two properties of the good build are worth naming because they are cheap and
almost always skipped: `vector-effect="non-scaling-stroke"` on every SVG child,
so a 1 px hairline stays 1 px at any scale instead of thickening as the figure
grows; and grain over the illustration zone, masked to fade out before the
text, so the figure sits on a surface rather than floating on a flat fill.

And the values: write the real ones or do not write any. A drawing that prints
a filename, a row count, a duration or a device name is making a checkable
claim. `docs/design-locks/2026-08-21.md` when the file is
`...-drawn-to-site.md`, a firmness ladder with three states when the product
has two, a device called "switch bank" that is not in the catalog below - each
of those was caught by an adversarial pass, and each would have been caught by
the author opening the file instead of recalling it.

## The fit-method runs at BUILD time

QI below is the PROPOSAL stage and it is skippable in exactly one case: the
owner delegated the picks. The fit-method is not skippable and has no
condition. Before the first line of markup for any illustration - proposed or
delegated, new build or edit, hero or cell - steps 1-5 above run per cell and
the set table above is written to the lock file. An illustration with no row
in that table has not been designed, it has been decorated; building it is a
defect regardless of how it looks.

## Device catalog (pick, combine, subvert)

Composition devices, each with its construction recipe. Values assume the
locked family's ground; all depth via lightness steps + inset highlights  - 
no hard borders inside illustrations.

- **Dial / gauge**: segmented ring (conic-gradient mask or SVG stroke-dash),
  seven-segment readout, cable entering/exiting (1px path + node dots).
  Speed, time, thresholds. (local-feature-graphics "00:10 Max Speed".)
- **Knob + tick arc**: circular puck (radial-gradient + inset top highlight),
  40-60 tick marks (SVG stroke-dasharray), accent arc = progress; center
  glyph. Protection %, levels, calibration. ("SECURED 15%".)
- **Radar / orbit**: 2-4 concentric arcs at 4-6% white, orbit nodes, central
  puck, one key-value mono chip. Monitoring, awareness, "know where".
- **Screwed plate + circuit spine**: rounded plate w/ 4 corner screws (2px
  radial-gradient dots), glyph center, 1px traces fanning to card edges w/
  junction dots. Processing steps, engines, AI cores.
- **Phone/window skeleton + saturated actor**: chrome-less device or window
  in skeleton bars (4-6% steps); ONE colored element floats over it (tile,
  pill, lock) + glow halo. Any in-app moment without shipping a screenshot.
- **Depth-stacked catalog**: 3 overlapping cards receding in opacity
  (1 / 0.55 / 0.3) + blur(1-2px), each title + mono sub + icon chip +
  skeleton rows. Breadth: "supports X types/regions/formats".
- **Mini-flow spine**: 2-4 nodes (tile → card → result pill) on a vertical/
  horizontal 1px spine, side nodes. Pipelines, "input → magic → output".
- **Dotted globe / field**: hemisphere of dots (radial dot grid masked to a
  circle, perspective-scaled rows) + avatar pins w/ city labels. Global,
  scale, distribution.
- **Scan tile**: squircle w/ silhouette, caption ("Scanning.."), masked mono
  string w/ caret line above. Capture, recognition, input.
- **Coin / terminal button**: large circular button w/ inset shadow + one
  semantic glyph, traces terminating into it. Completion, confirmation.
- **Evidence chips**: white/dark chips w/ icon + bold claim + one-line proof
  ("256-bit protection active"). The universal proof layer - orbit 1-3
  around any hero.
- **Isometric exploded mechanism**: 2:1 iso line-art, 3-tier gray ramp, one
  white focal, dashed guides + px annotations (marcelkargul-2090148).
- **Isometric conveyor / flow stage**: inputs as iso tiles on dotted paths
  converging into one chroma core, outputs riding a rail that slides
  linearly along the iso axis (marcelkargul-1952697). Pipelines,
  integrations, automations. Construction: `isometric-and-light.md` §A2.
- **Structured light field**: glow with geometry - shaped falloff (arc
  horizon, diagonal slab, wedge rays), line-work over light (traces,
  ribbons, hex-dot maps), rings, one source (marcelkargul-2089371/2089404,
  the six-hero collage). The hero/CTA environment device. Recipes:
  `isometric-and-light.md` §B1.
- **Bespoke chart form**: invent the chart that fits the data story - DIP
  switch, beeswarm, mekko (yurygok-2089624). Metrics features.
- **Diegetic canvas**: the product's own selection handles, marquees,
  cursors drawing the feature (adriankuleszo-2089887). Design tools.
- **Brand-hued underglow ("neon skirt")**: an elliptical glow at a floating
  tile's bottom edge as the ENTIRE hover grammar - no scale, no lift, no
  border change; each tile answers in its OWN brand hue (violet hub, blue
  Salesforce, orange HubSpot). Ignite ~250ms ease-out, decay 500-600ms.
  Radial-gradient ellipse, blur 12-20px, opacity ≤0.5. The tile "powers on".
  (flohoeller-2090.) Integrations, connected tools, anything tile-based.
- **Comet arc**: a 90-120° gradient stroke segment traveling a hairline ring
  at constant velocity (~15°/s), both ends fading to transparent - the one
  lit ambient element of the diagram. SVG stroke-dash + gradient, or a
  rotating conic-gradient mask. (flohoeller-2090.) Enrichment, sync, cycles.
- **Vacant slots**: unlabeled darker tiles at the grid's corners implying an
  extensible catalog - "more fit here" said without copy. (flohoeller-2090.)
- **Arch merge / wishbone**: 2-3 hairline S-curves converging into one node  - 
  many-into-one stories (routing, consolidation, outreach). Mini-flow-spine
  variant. (flohoeller-2090.)
  Variants proven on dark: logo marks may sit on dark top-lit squircles (not
  only white tiles), and graph-paper patches may run two densities (8px fine
  inside 32px coarse) when confined to a diagram zone. (flohoeller-2090.)

## QI - the proposal protocol (runs per feature, after QS)

For feature-card/bento tasks, after the section variant locks: take the real
feature list from Q0 and, for EACH feature, present 2-4 concepts:

```
QI2 - "Encrypted infrastructure":
A. Shield knob - knob + tick arc, accent arc at the claim's %, seven-segment
   "SECURED" band; motion: arc draws + LCD counts on first view.
   (register: instrument · build M)
B. Sealed pipeline - mini-flow spine where the middle node is a closed vault
   plate w/ screws; chips: "AES-256 · at rest + in transit"; motion: pulse
   travels the spine, linear, 4s loop.  (register: mechanism · build M)
C. Skeleton request log - window skeleton, every row's payload column
   scrambled to mono cipher glyphs except one decrypted row in accent;
   motion: hover decrypts the hovered row.  (register: product-fragment · build S)
```

Rules:
- Concepts must span at least two metaphor registers - variety is the point;
  never three variants of the same device.
- Every concept names: metaphor rationale (one line: why it argues THIS
  claim), hero object, evidence chips w/ actual microcopy, accent use, the
  one motion opportunity + its register (C6), and build cost (S/M/L).
- The whole set shares ONE material system; if a concept breaks register,
  say so and why it earns it.
- Owner answers with weights as always; a pick may graft a runner-up's
  ingredient ("A, men med C sin hover-dekryptering").
- Record picks as QI-rows in the lock file (QI1, QI2, … one per feature).

## Building them (HTML/CSS/SVG, no raster)

- Layered divs + gradients first: surfaces = lightness-step backgrounds +
  `inset 0 1px 0 rgba(255,255,255,0.06)` top highlight + soft outer glow at
  the accent (8-24px, ≤35% - never uniform).
- SVG for line work: traces, ticks, arcs (stroke-dasharray for segments and
  draw-on animation), dot fields; 1px strokes, `vector-effect:
  non-scaling-stroke`.
- Seven-segment/LCD: mono face + `font-variant-numeric: tabular-nums` +
  letter-spacing, or an SVG segment glyph set for the full effect.
- Screws: 4-6px radial-gradient dots at plate corners; cables: 1px paths w/
  3px junction dots at both ends.
- Skeleton bars: 4-6% lightness rounded bars, widths varied 35-85%.
- Grain on any gradient ≥ card scale (C9): SVG feTurbulence at 2-6%.
- Motion per `motion-grammar.md`: ambient linear, interactions 200-450ms
  ease-out, loops close frame-perfectly, hold states measurably static.
- Adapt patterns, never clone: the catalog is vocabulary; the product's own
  domain must produce the nouns (its data, its objects, its numbers).
