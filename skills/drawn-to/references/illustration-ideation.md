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

## The set law - a device is spent when it is used

Any surface carrying TWO OR MORE illustrations at once - a feature trio, a
bento, a card grid, a gallery wall, a feature-trio screen inside a catalog -
is a SET, and a set has rules a single illustration does not:

1. **One device, one cell.** Each cell names its device from the catalog
   below, and no device may appear twice in the same set. "Skeleton bars in a
   frame" is ONE device; three drawings of grey bars inside a thin rectangle
   are that device three times, whatever the bars are supposed to mean.
2. **Different objects inside one register.** Step 2 decides the register ONCE
   for the whole set, and that is right: the register governs the MATERIAL
   SYSTEM (projection, line weight, ramp, accent, grain). It never governs the
   objects. Inside one register the objects must diverge, or the set has one
   idea wearing three labels. Where a set legitimately spans two registers, say
   so in the set table and hold the finish constant across both.
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
| **Stage** | object-to-cell area 25 % · 45 % · 70 %, and the anchor: centred · bleeds one edge · bleeds a corner · spans full height. Also whether the illustration crosses into a neighbouring cell |
| **Copy relation** | copy below · beside · above · absent |

adriankuleszo-2089887 states it most plainly: every card is assigned a
different SPATIAL ARRANGEMENT VERB - stack in depth, place two widths side by
side, repeat in a cropped gallery, explode into a flat parts grid, annotate one
continuous canvas - and no verb repeats. 0xSero-2090 varies the primitive and
the symmetry while holding every stroke at exactly 1 px and every radius at 0.
Triopixels-2089 varies primitive, arrangement, depth and even whether the card
keeps the shared sky at all, while the shell and the shadow never move.

So: hold the FINISH rigid (one hairline weight, one radius family, one ramp,
one accent, one shell, one shadow) and spend all the variety on the dials. **No two cells may share a Stage notch** - that single constraint is what stops six well-drawn cells reading as six identical squares. A
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

## Sequence sets - the set law inverts

Everything above assumes SIBLINGS: parallel claims, each arguing its own thing.
A **sequence** - a numbered "how it works" row, a pipeline, an onboarding path -
is the opposite case, and running the sibling rules on it produces three
unrelated drawings where the reader needed one process.

In a sequence the cells are STAGES of one thing, so:

- **One shared connective element runs through every cell** - a trace, a spine,
  a rail, a shared baseline. It enters cell 1 from off-stage and leaves cell N
  off-stage.
- **The cell grammar repeats deliberately.** Same frame, same anchor, same
  scale. Repetition is the point; it is what makes the change legible.
- **Variation is carried only by what sits at the node**, never by the frame.
- **The swap test does not apply.** Replace it with the **ORDER test**: shuffle
  the cells. The row must become WRONG. If shuffling changes nothing, the steps
  are not sequential and should ship as parallel claims under the ordinary set
  law.
- A number index is legitimate here and is the one place a numeric eyebrow does
  not count against the page's eyebrow budget.

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

**Every number, readout and percentage must argue FOR the claim.** C10 governs whether a value is PLAUSIBLE; nothing governed whether it is FAVOURABLE, and the skill shipped `SECURED 15%` twice as an exemplar. A security readout at 15 % argues that 85 % of the thing is unsecured. Read every value back as a sentence before it goes in the drawing.
a filename, a row count, a duration or a device name is making a checkable
claim. `docs/design-locks/2026-08-21.md` when the file is
`...-drawn-to-site.md`, a firmness ladder with three states when the product
has two, a device called "switch bank" that is not in the catalog below - each
of those was caught by an adversarial pass, and each would have been caught by
the author opening the file instead of recalling it.

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
| **Accuracy / precision** | "99.9 % match · no false positives" | **Target and grouping**: the mark plus the scatter around it | draw the MISS you avoid; a bullseye with no scatter argues nothing |
| **Ownership / control** | "your keys · your data · you decide" | **Instrument panel you hold**: controls at hand scale, the data at a stated distance | the operator's position is in frame, and the distance to the data is legible |
| **Cost / economy** | "a tenth of the price" | **Two stacks at true relative scale** | the saving must BE the visible difference; a percentage label is not a picture |
| **Simplicity** | "one step instead of nine" | **Step count collapsed**: both chains drawn at the same pitch | draw the old count too, or there is nothing to collapse against |
| **Reversibility** | "undo anything · nothing is destructive" | **The undone move**: the ghost of the prior state persists and is reachable | the ghost must look retrievable, not discarded |
| **Transparency** | "see exactly what it does" | **Cut-away**: the same object drawn twice, sealed and sectioned | both halves in one frame, same scale, same orientation |
| **Learnability** | "productive on day one" | **The novice's path**: one continuous route, no branches | any fork argues complexity, which is the opposite claim |
| **Durability** | "still running after five years" | **Wear that did not happen**: age the surroundings, not the object | if the object ages too, the claim inverts |

Two features in one set may share a topology only if their payloads differ in
kind; three cards with three Gauntlets is one idea repeated.

**If a feature will not classify, that is a COPY defect, not a drawing problem -
go back to Q0 and get a claim with an antagonist in it. Never pick a device
first and reason backwards.**

### Step 2b - reframe: generate 4-6 candidate topologies before choosing one

Step 2 is a 1:1 lookup, and a lookup is why four concepts for one feature come
back as four drawings of one idea. Before choosing a row, run these six
operators. Each one legally RE-CLASSIFIES the same claim into a different row of
the table above, which is what makes the resulting concepts genuinely different
rather than differently finished.

1. **Consequence** - draw what the claim causes downstream, not the claim
   itself. Encryption becomes the interceptor's empty haul.
2. **Inversion** - draw the world WITHOUT the feature, at the same scale.
   "Connects to 200 sources" becomes the one connector you would hand-build and
   the 199 you would not.
3. **Scale shift** - swap the population for the single instance, or the single
   instance for the population.
4. **Unit of measure** - find the product's natural unit and count it in frame.
   40 ms drawn to scale against the 2 400 ms it replaces.
5. **Antagonist-as-hero** - promote the defeated thing to the subject: the maze,
   the middleman, the wait.
6. **Container swap** - argue the capability through the receptacle rather than
   the contents: a socket, a key-ring, an adapter.

**Hard rule: four concepts must use four DIFFERENT topologies.** Two concepts
sharing a topology are one concept in two registers - that is a restyle. Cut one
and reframe again.

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

> **Source-bias warning.** Eleven of the entries below come from ONE reference
> (`local-feature-graphics`, a dark hardware-instrument register) and five more
> from `flohoeller-2090`. Picking four concepts straight out of this catalog
> therefore produces four instrument-register concepts by default, which is a
> restyle wearing four hats. **Derive the topology first (Step 2b), then consult
> the catalog to BUILD what the cast already named.** If a topology has no entry
> here, that is a gap in the catalog, not a reason to change the topology.

**Topology index - which device realises which scene.**

| Topology | Devices that realise it | Devices that CANNOT, and why |
|---|---|---|
| Gauntlet | obstruction at architectural scale, payload at label scale, route clipped at both ends with no start or end marker, tracer at constant velocity | dial, badge - a gauge has no route, so nothing can fail to arrive |
| Two actors / exchange | two bodies of the SAME construction, one aperture face each pointing where the body is going, a whole number of empty cells between them, and nothing in the gap | hub-and-spoke - a hub reintroduces the intermediary the claim removed |
| Open the host | host authored closed first, interior authored in place and 100 % occluded, reveal by subtraction only | exploded stack - an explosion argues assembly, not "already inside" |
| Closed cycle | a ring the fault enters, deforms and recovers from; no operator in frame | cursor demo, instrument panel - both put a human in the loop |
| Enclosure + rebound | boundary as hero, probe on a stated incidence angle, deflection at the mirrored angle, a residue mark at the impact point so the attempt is legible in the poster frame, and NO success state anywhere on the wall | shield glyph - a badge asserts safety instead of showing an attempt |
| Socket | one receptacle geometry repeated exactly across every part, parts hovering in plug order along one axis | free-floating tiles - without a shared receptacle there is no composability claim |
| Relay | two overlapping spans, the overlap measured in the same unit as the span; the handover IS the poster frame | progress bar - a single span cannot overlap itself |
| Compressed distance | both routes share one start line, the reference length drawn rather than implied, a dimension chain with real values at both ends | counter alone - a number with no distance is a stat, not a picture |
| Field | one module tiled past the frame edge with one instance singled out | a finite grid with a visible last row, which argues a list |
| Target and grouping | mark plus scatter, scatter drawn first | bullseye alone |
| Instrument panel you hold | controls at hand scale, data at a stated distance | dashboard screenshot - no hand, no ownership |
| Two stacks at true scale | both stacks in frame, same unit | pie chart |
| Step count collapsed | old chain and new chain at the same pitch | one chain |
| The undone move | ghost of the prior state, reachable | undo icon |
| Cut-away | the same object sealed and sectioned, same scale and orientation | exploded view |
| The novice's path | one continuous unbranched route | flowchart |
| Wear that did not happen | aged surroundings, pristine object | a shiny object alone |

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

## QI - the proposal protocol (runs in TWO passes, after QS)

Run as written below. Read the two-pass structure first: the old single-pass
form contained a live contradiction - it asked for concepts spanning at least
two metaphor registers per feature, while the fit-method, Step 7 and
`practitioner-methods.md` all require ONE register per SET. Running it literally
produced a set that the skill's own quality bar then failed.

**Pass 1 - the set direction.** Propose 3-4 DIRECTIONS, not concepts. Each
direction = one method from `practitioner-methods.md` (M1-M5) + one register +
one material system. Sketch each direction across ALL features in one line
apiece, so the owner sees the whole row before choosing anything. The owner
answers with weights; one direction locks; the set register contract (Step 7) is
written into the lock file at the end of Pass 1, with literal values.

```
Pass 1 - four directions for the five features:
A. Instrument set (M3 · instrument register · dark hardware, one accent)
   capture = phone mid-scan · recognise = screwed plate w/ traces · search = lit dial ·
   reuse = coin button + terminating trace · sync = twin gauges on one shaft
B. One world re-lit (M1 · isometric register · paper-white, one stroke weight)
   one workshop drawn once; each card is the same room under a different light
C. Self-demo (M4 · product-fragment register · the real UI, desynced loops)
   each card is the actual product doing the verb, captions demoted outside
D. Drawing sheet (M5 · blueprint register · 1px line-art, mono, radius 0)
   each card is FIG.n of one technical document
```

**Pass 2 - per-feature concepts, inside the locked direction.** Now propose 2-4
concepts per feature that differ ONLY by topology and hero object - never by
register, never by finish. This is where Step 2b's reframing operators do the
work.

For each feature, present:

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

**Concept divergence table - fill it before presenting.** Mirrors the set table
that already works at build time. If the Topology column repeats, or the Device
column repeats, stop and reframe; Register MAY repeat because Pass 1 locked it.

| Concept | Reframing (Step 2b) | Topology | Method | Register | Device | Hero object | Deliberately absent | Build cost |
|---|---|---|---|---|---|---|---|---|
| A | - (direct) | | | | | | | |
| B | consequence | | | | | | | |
| C | inversion | | | | | | | |
| D | container swap | | | | | | | |

**Build cost, defined in element counts.** **S** = one hero object, under ~20 SVG
elements, no loop. **M** = hero + an evidence layer, ~20-60 elements, one loop or
one hover. **L** = depth-sorted solids, ~60+ elements, a choreographed
multi-body loop on a shared clock. Note which topologies weaken without motion:
*never-arrives* and *opens-and-closes* are much weaker as stills, so if the
motion budget is zero, reframe rather than shipping a frozen version.

**Evidence chips - the geometry, since they are the most visible element in the
anchor plates.** One or two chips maximum, never three. Each chip = a
semantic-colour icon square + a bold claim of 2-4 words + one grey proof line
carrying a real value. Chips anchor OFF the hero's top edge and overhang its
silhouette rather than sitting politely beside it. The icon colour is semantic
and may differ from the card accent. Chips stack with a small z-offset and the
rear chip is NOT dimmed.

Rules:
- Concepts must span at least two metaphor registers - variety is the point;
  never three variants of the same device.
  **Scope note (two-pass form):** this rule belongs to **Pass 1**, where the
  DIRECTIONS legitimately span registers so the owner can choose one. Inside
  Pass 2 the register is already locked and concepts diverge by topology and
  hero object instead. Applying it to Pass 2 is what produced sets that failed
  their own register contract.
- **Generate across METHODS, not across styles.** Before writing the concepts,
  open `practitioner-methods.md` and draw each concept from a DIFFERENT method:
  one atom in three topologies (M2) · a purpose-built instrument caught
  mid-action (M3) · the real product fragment performing the verb (M4) · the
  feature as a numbered technical drawing (M5) · one world re-lit (M1). Four
  concepts from one method are four restyles of one idea, which is the single
  most common way this stage fails. Then let the locked blend strike the ones it
  makes illegal and present only the survivors with weights.
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
**A worked FAILURE, because this is the stage that fails quietly.** Four
concepts for one breadth claim - "connects to two hundred sources":

```
A. Quincunx tile grid   - many logo tiles around one hub tile
B. Depth-stacked catalog - source cards receding in opacity and blur
C. Isometric tiled plaza - source tiles laid out on an iso ground plane
D. Numbered source index - a mono list with a count at the top
```

Four devices. Four registers. It looks like a spread of options and it is not.
Run the divergence table: A, B and C all classify as **Field** (one module
multiplied), and all three argue the identical sentence - "there are a lot of
them". Only D moves, and D is a list, not a picture. The Topology column has one
value in three rows; the row that should have caught this is the one the table
exists for.

The fix is Step 2b, not a fifth device. Reframe:
- *inversion* -> the ONE connector you would hand-build, and the 199 you would
  not: two objects, wildly unequal effort. Topology = **Two stacks at true
  scale**.
- *consequence* -> a single query fanning out and returning as one merged
  answer. Topology = **Relay**.
- *container swap* -> one socket, and any of two hundred plugs fits it.
  Topology = **Socket**.
- *antagonist-as-hero* -> the integration backlog as an architectural obstacle
  the payload crosses in one beat. Topology = **Gauntlet**.

Four topologies, four different sentences, one register. That is a proposal.

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
