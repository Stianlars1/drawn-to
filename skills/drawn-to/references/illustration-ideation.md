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
2. **Choose the metaphor register** - decided ONCE for the whole set, never
   per card (C-rule: one material system for the whole set). The register says
   how everything is drawn; it does not say what is on stage. Pick it after
   the ladder's Steps 1-3 have run for every feature, so it is chosen to serve
   the hardest scene in the set:
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
5. **The derivation ladder below has already decided what is on stage** -
   claim + antagonist → claim shape → topology → cast, run per feature BEFORE
   any device is picked. The register only decides how it is drawn, and the
   device catalog is consulted LAST, to build what the cast already named.
   Picking a device first and back-filling a claim is exactly how
   interchangeable decoration gets shipped.
6. **Design the still first, name the motion second.** Every concept must
   carry the pitch as a static frame (C12); then note its one motion
   opportunity per `motion-grammar.md` (a loop that enacts the verb, a hover
   state-change, or a scrub beat).

## From claim to scene - the derivation ladder (run per feature, before any device is picked)

The fit-method above gets the VERB. This ladder gets the SCENE: what is on
stage, who acts, what travels, what resists, and what the loop asserts. A
concept that skips it produces the generated-UI failure mode - a pretty object
that would sit equally well on any of the sibling cards.

Worked exemplar throughout: `0xhammermann-2090` (x402, three cards, one iso
register, three different scene topologies).

### Step 1 - write the claim as one sentence with an antagonist

Not the headline; the argument under it. "Filling out a form is a maze that
the payment never gets through" · "Two machines can transact with nothing
between them" · "The payment layer is already inside HTTP". If you cannot name
what the feature is arguing AGAINST (friction, a middleman, a migration, a
leak, a wait), the illustration will have nothing to depict.

If you cannot name the antagonist, the defect is in the COPY, not in the
illustration. Take it back to Q0 and ask the owner what this feature removes,
replaces or prevents. Do not proceed on "it is fast and easy" - a claim with no
antagonist produces the pretty-but-interchangeable object every time, and the
swap test will catch it three hours later. If the owner confirms there is
genuinely no antagonist, that feature ships type-only (`quality-bar.md` § 3:
if any condition fails, ship NO illustration).

### Step 2 - classify the claim shape; the shape picks the scene topology

| Claim shape | Sounds like | Scene topology | The rule that makes it read |
|---|---|---|---|
| **Friction / problem** | "X today is broken / painful / slow" | **Gauntlet**: architectural-scale obstacle + a small labelled payload trying to cross | the payload must be visibly IN the obstacle, and it must never arrive - resolution would argue the opposite |
| **Disintermediation** | "no form, no login, no human in the loop" | **Two actors, one payload, empty space between** | the removed thing must be visibly absent; the gap between actors is the message, so keep it wide and empty |
| **Integration** | "built into X · no new infrastructure" | **Open the host**: the existing structure at rest, then it parts / cross-sections to show the feature already seated inside | the feature must never arrive from off-stage; the host must be recognisable BEFORE it opens |
| **Autonomy** | "runs itself · retries without you" | **Closed cycle**: a loop that completes without an operator; failure enters and the loop absorbs it | no cursor, no hand, no avatar anywhere in the frame |
| **Coverage / scale** | "any client · everywhere · all formats" | **Field**: one module tiled past the frame edge, one instance singled out | the tiling must exceed the canvas (cropped), or it reads as a finite list |
| **Speed** | "in 40 ms · instantly" | **Compressed distance**: the same route drawn twice, long and short, or one beat crossing the whole stage while a counter ticks | needs a reference length in-frame, otherwise fast is invisible |
| **Safety / containment** | "nothing leaks · isolated" | **Enclosure + rebound**: a boundary as the hero, an attempt that bounces off | draw the attempt, not just the wall - a wall alone is décor |
| **Composability** | "bring your own · swap any part" | **Socket**: one standard receptacle, interchangeable parts hovering in the plug order | the socket geometry must repeat exactly across parts |
| **Continuity** | "no downtime · always on" | **Relay**: overlapping spans where one carries while another is replaced | the overlap is the whole argument - show it |

Two features in one set may share a topology only if their payloads differ in
kind; three cards with three Gauntlets is one idea repeated.

### Step 3 - cast the scene: actor · payload · terrain · antagonist

Name all four in writing before drawing. The x402 set:

| Card | Actor | Payload | Terrain | Antagonist |
|---|---|---|---|---|
| The problem | (none - deliberately) | four form fields, labelled with the real field names | a walled maze at building scale | the maze itself |
| Agent-ready | two machine bodies | one request in flight | open plane | the absent human (shown by not being there) |
| HTTP-native | the existing block city | the protocol mark | the city's own footprint | the assumed need for new infrastructure |

Rules: the payload carries the product's real data (C10) - "Card Number…",
"CVV…", not "Label". The terrain is drawn at a scale that dwarfs the payload
when the claim is about friction, and at the payload's own scale when the
claim is about capability. An actor is a body, never an icon of a body.

### Step 4 - the loop asserts the claim (motion is an argument, not decoration)

Pick the loop's rhetorical shape from the claim, then time it:

| Rhetorical shape | Loop | Reads as |
|---|---|---|
| **Never arrives** | payload advances, stalls, dissolves before the goal; restart | friction, waste (x402 card 1) |
| **Crosses in one beat** | payload traverses the full stage in a single eased move, long hold | speed, directness |
| **Passes directly** | payload leaves A and lands in B with nothing in between | disintermediation (x402 card 2) |
| **Opens and closes** | host parts, holds open long enough to read the interior, closes | it was inside all along (x402 card 3) |
| **Absorbs** | a fault enters the cycle, the cycle deforms and recovers | resilience |
| **Multiplies** | one instance becomes a field, field settles | scale |
| **Assembles** | separate parts converge into one body and hold | composition, "one system" |

The hold matters as much as the move: the interior of an opened host needs
~1.0-1.3 s of stillness or the reveal cannot be read. A never-arrives loop
must fail LATE (past the midpoint) or it reads as a glitch, not as friction.

Two set-level rules:
- **No two cards in a set may use the same rhetorical shape.** The exemplar
  runs never-arrives / passes-directly / opens-and-closes. Three different
  topologies animated with the same rhetoric still read as one card shown
  three times.
- **Name each loop's POSTER FRAME** - the single frame the loop degrades to
  under `prefers-reduced-motion`, and the frame every screenshot will capture.
  It is chosen for the CLAIM, not for being the settled end state: a
  never-arrives loop whose settled state is the dissolved payload would argue
  that the friction resolved, so its poster frame is the payload at its
  deepest point in the terrain. An opens-and-closes loop posters at full open,
  not closed.

### Step 5 - the swap test (mandatory; the concept fails if it passes)

Mount each concept on its sibling features and write the sentence it would then
be arguing. If a concept survives the swap, it is decoration - redesign it.

Worked example from the exemplar: put card 3's opening block-city on card 2 and
it argues "machines are inside the infrastructure", which is not the claim
(the claim is that two machines transact directly); put card 2's two floating
objects on card 1 and the maze's friction disappears - the section then has no
problem to solve; put card 1's maze on card 3 and it argues that HTTP is an
obstacle, the exact opposite of "already built in".

Record the result in the lock file on the QI row: `swap test: fails on cards
2, 3 (correct)`. A QI row without a swap test is not locked.

### Step 5b - the read-back test

The swap test catches an illustration that fits everywhere. This catches the
opposite failure: one that is non-transferable but argues nothing legible.

Cover the headline and the body. Look at the illustration alone - cold, after a
break, or through someone else - and write the ONE sentence it argues. Compare
it word for word with the claim sentence from Step 1.
- Vaguer than the claim ("something about payments") → the scene is under-cast:
  the antagonist or the payload is not actually in the frame. Add the missing
  role, do not add detail.
- A DIFFERENT sentence → the topology is wrong; go back to Step 2.
The two tests fail in opposite directions, so run both, always.

### Step 6 - the absence check

Whatever the feature ELIMINATES must be visibly missing from the frame, in a
place where the eye expects it: no form plate on the plane between the two
machines, no cursor, no human proxy, no login gate. Absence is only legible if
the composition leaves a hole where the removed thing would have been - so
leave the hole, and keep it empty.

### Step 7 - the set register contract (what makes N illustrations one family)

Lock these ONCE for the whole set; vary only topology and payload:

- one projection and one grid origin (all cards read as one world),
- one module scale (the unit block/cell is identical in every card),
- one value ladder (same face grays, same ground plate, same shadow recipe),
- one line-weight hierarchy (silhouette / seam / annotation),
- one focal rule - e.g. exactly one black element per card, always the thing
  the feature acts on,
- one motion register (same easing family, same loop length, same hold), and
  a shared clock if the cards are visible together,
- one payload typography (the labels are the same component everywhere).

Variety comes from the scene topology, never from restyling. If the three
illustrations need three different rendering styles to feel distinct, the
topologies were too similar - go back to Step 2.

**The register row carries VALUES, not adjectives.** Write it into the lock
file as literals, because this is what every QI row will be built and measured
against:

```
REGISTER (set-level): projection true iso 30 deg (slope 0.5774) · module
footprint 53 x 31 CSS, cube height 31 · grid = one cell per module, phase from
card top-left, hairline ~0.2 CSS px equivalent, faded to zero behind copy ·
faces #FFFFFF / #E8E8E8 / #CECECE, one #0B0B0B focal face per card · stroke
2.6 CSS px, ONE weight per card, color assigns role (gray = scenery, black =
subject) · shadow: flat iso polygon #E8E8E8, zero blur, non-compounding ·
loop 5.0 s, shared clock, poster frames named per card · annotation plates
skewY(-30deg), #F2F2F2 / 2.65 stroke / r 7.1, upright type
```

Then verify parity on the built set: overlay the rendered illustrations and
check that grid pitch and phase, module size, stroke weight and face values
match across every card. A set that drifts by a few percent per card reads as
three drawings by three people.

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
- Every concept carries its **claim sentence** (with the antagonist named) and
  its **scene topology** from the derivation ladder; across the set, no two
  features get the same topology unless their payloads differ in kind.
- Every concept passes the **swap test** before it is shown to the owner: state,
  in one line per sibling feature, the wrong claim this concept would make if it
  were mounted there. A concept that would work fine on a sibling is decoration;
  redesign it rather than presenting it.
- Every concept states what the loop **asserts** (never-arrives / crosses in one
  beat / passes directly / opens and closes / absorbs / multiplies / assembles)
  and what it deliberately leaves absent.
- Every concept names: metaphor rationale (one line: why it argues THIS
  claim), hero object, evidence chips w/ actual microcopy, accent use, the
  one motion opportunity + its register (C6), and build cost (S/M/L).
- The whole set shares ONE material system; if a concept breaks register,
  say so and why it earns it.
- Owner answers with weights as always; a pick may graft a runner-up's
  ingredient ("A, men med C sin hover-dekryptering").
- Record picks as QI-rows in the lock file (QI1, QI2, … one per feature). Each
  QI row carries `topology`, `loop asserts`, `absent`, and `swap test: fails on
  <siblings> (correct)`. A QI row without a swap test is not locked.
- Lock the **set register contract** once (projection, module scale, value
  ladder, line weights, focal rule, motion register, payload type) as its own
  row - it governs every QI row and is what makes N illustrations one family.

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
