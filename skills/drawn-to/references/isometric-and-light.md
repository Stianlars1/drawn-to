# Isometric objects & structured light - two paths

Reverse-engineered from Marcel Kargul's work (kargul.studio): the Services
bento + CTA dome (local saves, marcelkargul-2090148, marcelkargul-2090509),
the Hunt.io hero + footer (marcelkargul-2089371, marcelkargul-2089404), the
six-hero collage (local_HPbqQYUXAAAbrLQ.jpeg) and the Chatsheet hero video
(marcelkargul-1952697). Extended 2026-08-21 with a third
iso register reverse-engineered frame by frame from the x402 feature section
(`0xhammermann-2090`): paper-white, heavy-contour, scene-per-claim. Two
distinct crafts live here and both are offered as
a PATH the lock-in flow can choose: (A) isometric objects as the illustration
language, (B) light with geometry instead of blob gradients. Media:
`references/media/local-marcel-isometric/` + the slugs above.

---

## Path A - Isometric objects

### A1. Three registers

**Blueprint iso (dark, monochrome)** - the Services bento, marcelkargul-2090148:
- Objects are 1px line-art on a visible isometric graph-paper grid (~24px
  cells, 4-6% white). The grid is a MATERIAL the object stands on, never
  decoration: dashed iso guides overshoot every object and run to the card
  walls; selection-handle squares sit on key vertices; a dashed bounding
  box frames the hero object - literally Figma's chrome as vocabulary.
- Three gray tiers, one white focal: guides #3F3F3F-class · outlines
  #7A7A7A-class · ONE white edge/face per illustration (the ribbon's near
  edge, the front window). Faces are flat near-background tones (+2-4%),
  never gradients; depth by opacity dimming 25-40%, never shadow.
- Textures do the material work: dense parallel hatch lines follow a curved
  surface (the ribbon's curl is ~40 hatch strokes that bend with the form);
  stipple/noise fills shadow faces and cut-aways; a 4px diamond crosshatch
  on one plane per board. All at ≤8% contrast.
- The object IS the deliverable (C2 at illustration grade): Branding = logo
  plate + color chips on a slanted sheet; Product UI/UX = three layered
  screens with a px-ruler label; Full-stack = a PCB-like board with a logo
  chip and Figma→code node; Landing pages = a folded ribbon sheet carrying a
  3-bar chart; Full websites = a fan of browser windows with NEXT.js and
  Framer logos, dashed path threading them.
- The dome CTA (light): same vocabulary inverted - white paper #EDEDED,
  #c9c9c9 outlines, a wireframe geodesic dome with meridians, a cut-away
  wedge whose interior is stipple, iso primitives around it (stairs,
  cylinders, lego brick, pie wedge, arc ring), dashed bezier orbit lines with
  dot nodes, handles on the bounding boxes. Faces here carry SOFT GRADIENTS
  (white → #e6e6e6, 1-2% per face) - the "soft gradients that make the
  section feel like a product" comment in the post.

**Paper-white iso (light, one stroke weight, zero chroma)** - `0xhammermann-2090`,
a three-card feature section where every card carries its own iso scene. All
values below are measured off the 301-frame source, not estimated:

- Ground: pure white card on a white page; separation is a 1 CSS px #D2D2D2
  card border and nothing else, square corners, `overflow: hidden`. The stage
  is a hairline diamond grid (below, A1a) drawn first, always occluded by the
  subject, clipped by the card.
- Objects are drawn like architectural plans, not renders: FLAT faces, no
  gradients anywhere on an object, in a four-step ladder - `#FFFFFF` ·
  `#E8E8E8` · `#CECECE` · `#0B0B0B` - and exactly ONE face per card goes
  black, carrying a white glyph. That black face is the focal and it is
  always the surface the feature acts through (the machine's aperture, the
  parcel's frank). Two blacks means two claims.
- **Refuse the third face value.** The conventional contract (top lightest,
  left mid, right darkest) is what turns a drawing into a render. This
  register tints ONE plane and lets the rest go pure white: card 1 tints only
  the tops (#E7E8E7, both side faces white); card 2 is binary (every face
  255, one black face per body); card 3 tints per MODULE rather than per
  orientation (left faces always white, top and right sharing one gray, 9 of
  12 at #CECECE and 3 at #E8E8E8, scattered - just enough irregularity to
  kill the "procedurally generated grid" tell without implying a lighting
  story). There is NO cast shading: a solid never darkens because another
  solid stands between it and the light.
- **ONE stroke weight per card, identical on silhouette and interior seam**
  (measured 2.6-2.75 CSS px on every edge of every card; the silhouette is
  within noise of the seams). The heavier-outer-contour instinct - which every
  generated iso drawing follows - is refused: with one weight the object reads
  as a technical assembly, with a fat outline it reads as a sticker.
- **Stroke COLOR carries the layer instead of stroke weight**: gray-stroked
  geometry is architecture that must recede (card 1's maze at #B7B8B8, so the
  black tracer and plaques own the eye); black-stroked geometry (#0B0B0B) is
  the subject itself. Decide per card which role the geometry plays, then pick
  the stroke color - never split the weight.
- Only the ground grid is lighter than the object stroke: ~0.15-0.3 CSS px of
  full-black equivalent. Three ink levels total (grid · object stroke ·
  black focal), and the object stroke is a single number.
- Build mechanics that decide whether it reads as a drawing or as clip art:
  one silhouette path per SOLID, stroked after the fills - never one stroke
  per face (per-face stroking doubles every seam). `vector-effect:
  non-scaling-stroke` on every stroke so a responsive viewBox cannot
  re-weight the drawing; `stroke-linejoin: miter`, `stroke-miterlimit: 8`,
  butt caps. Weights stay CONSTANT for every object regardless of its size -
  constancy is what makes it a print drawing rather than a perspective render.
- Contact: card 2 uses a hard, flat isometric polygon at `#E8E8E8` with
  literally ZERO blur (its edge profile is a 2-device-px antialias ramp and
  nothing more), every edge on +/-30 deg or vertical - the shadow belongs to
  the same drawing system as the object, which a soft radial blob never does.
  It is rigidly parented: offset constant to +/-0.35 px and area constant to
  0.4% across the whole loop; it never scales, softens or fades. Card 3 uses
  ONE soft plate (#F6F6F6 to #F3F3F3, 8-10 px edge) for the whole
  composition rather than one per module. Card 1 has no shadow at all - a
  scene of architecture standing on its own plan does not need one.
  Whichever you choose: put every shadow in one group with a single group
  opacity and `isolation: isolate` (or union the paths before filling) so two
  overlapping shadows never darken each other. Compounding shadows are the
  fastest way to turn a print drawing into a render.
- Grain: none. This register is a print drawing; C9's grain rule applies to
  gradients, and the only gradient allowed here is the light falling into an
  opened interior (A2c).

### A1a. The ground grid and the shared world origin

Without a shared origin, three correctly-drawn scenes still read as three
unrelated drawings. Lock these once for the whole set:

- Grid = two line families on the projection's own axes (here exactly +/-30
  deg), authored as a `<pattern>` carrying a `patternTransform` matrix, never
  a rotated square grid - the diagonals must sit exactly on the projection
  axes or the objects float off the paper.
- **Grid cell = module footprint.** Measured: grid diamond 53.5 x 30.9 CSS,
  cube footprint ~53.1 x 30.6 with a ~30.9 vertical edge - within 1-3%, so a
  unit cube stands on exactly one grid cell and every wall run is countable in
  cells. (A half-pitch grid is a legitimate alternative, but then say so in the
  lock: the cost is that cells stop being a unit of measure.)
- The world origin is a point on the grid, in CSS px from a stated card
  corner, plus the phase of the pattern. Every card in the set inherits it, so
  a cube in card 3 sits on the same imaginary floor as a wall in card 1.
- Ink: hairline only (see above). The grid bleeds to the card's clip on the
  subject side and is FADED TO LITERALLY ZERO behind the copy - measured ramp:
  100% to ~43% of card height, 70% at 53%, 50% at 60%, 10% at 77%, 0 from
  ~82%. On a card where the copy sits beside the subject, fade the wedge
  diagonally instead. This is a second mechanism on top of silhouette
  clearance: geometry alone leaves the grid texturing the words, a scrim alone
  leaves the subject crowding them.

**Soft-shaded iso (light, one chroma hero)** - Chatsheet hero video:
- A single blue disc (concentric ring "core") sits on an iso plane with a
  soft blue radial under it (the only strong chroma); integration app tiles
  (Slack, Gmail, Drive, Sheets, Notion…) are small iso tiles scattered on
  dotted connector paths that converge into the core; from the core a
  conveyor rail of iso cards ("Automation Action", "Strategy Contract",
  "Personalized Outreach" - pill + checklist) runs up-right and slides
  continuously along the iso axis (linear, constant velocity - C6 ambient).
- Faces: white → #eef1f5 soft gradients, blue-tinted contact shadows
  (`0 12px 32px rgba(40,80,200,.14)`-class), 1px edges at 8-10% navy.
  Tiles bob ±4px slowly; the conveyor never eases; loop closes on the
  period of one card advance.
- Serif headline over it: the illustration carries the modern register, the
  type the editorial one.

### A2. Construction (the math, so it can be built in code)

- Projection: 2:1 dimetric ("pixel isometric") - axes at ±26.57° (tan = 0.5)
  on a square grid; or TRUE isometric at ±30° (slope 0.5774, cell width/height
  = √3). Pick one per project and write it in the lock with its slope. The
  dark line-art corpus uses 2:1 (flatter, cleaner hatch); the paper-white
  register measures true 30° on every card (Radon peaks at ±30.00, plaque
  edges -0.5773…-0.5769) - 2:1 is ruled out there by 3.4°. The two are not
  interchangeable inside one set: a scene drawn at 26.57° next to one at 30°
  reads as two different worlds.
- SVG face transforms (2:1): top `matrix(1 0.5 -1 0.5 tx ty)` → for 30°:
  left face `matrix(0.866 0.5 0 1 tx ty)`, right face `matrix(0.866 -0.5 0 1
  tx ty)`, top `matrix(0.866 0.5 -0.866 0.5 tx ty)`. Draw every face as a
  2D rect/path in its own plane, then place; extrusion = same face offset
  along the vertical by height h.
- CSS alternative: `transform-style: preserve-3d; transform: rotateX(60deg)
  rotateZ(45deg)` on a stage (2:1-ish), children built as flat planes with
  `translateZ`. Cheaper for animated stacks; SVG for line textures.
- Lighting order is a contract: top lightest · left mid · right darkest
  (one light from upper-left), consistent for every object on the page. In the
  paper-white register the contract is deliberately REDUCED to two values (or
  one tint) - see A1a's "refuse the third face value"; whichever you pick,
  every object on the page obeys the same one.
- Textures: hatch = `<pattern>` of 1px lines at the face's angle, 4-6px
  pitch, opacity 6-8%; stipple = `feTurbulence baseFrequency .9 + feColorMatrix`
  masked to the face, 3-6%; dashed guides `stroke-dasharray 3 4`; handles =
  4-6px squares with 1px stroke.
- Motion: translate along an iso axis = (dx, dx·0.5 for 2:1, dx·0.577 for
  30°); assembly = separable planes fading/sliding in (graphic-language R8);
  conveyor = linear `translate` loop with period = one item pitch; never ease
  an infinite iso loop (C6).
- **Legal transforms on an iso solid**: translate along an iso axis, translate
  on screen-Y (altitude), opacity, stroke-width, gradient stops. Nothing else.
  Never scale (a 1.05 hover on an iso object is immediately wrong - it breaks
  the projection), never rotate or skew a solid in the picture plane (it
  breaks the one-camera contract; a genuinely re-posed object is re-drawn in
  3D, not rolled). A bob is translateY only, and the contact shadow STAYS
  WHERE IT IS - a shadow that bobs with the object reads as a floating
  sticker. Animate the `<g transform>` via WAAPI or CSS with
  `transform-box: fill-box` and an explicit `transform-origin: 0 0`. Never
  animate the grid: the world does not slide under the camera.

### A2b. Module architecture - building scenes instead of objects

Marcel's register draws one deliverable per card. This register draws a
WORLD per card, from one unit cell:

- Pick a unit cube whose footprint equals one grid diamond (typ. 48-64px
  CSS on the horizontal axis) and a standard height (typ. 0.6-1.0 x the
  footprint). Every solid in every card is a multiple of that cube: walls are
  runs of it, towers are stacks, plazas are fields.
- Runs and walls: draw the run as a single extruded polyline (one silhouette
  path, stroked after the fills), then draw the module seams INSIDE it at the
  SAME weight (this register has one weight) or at a thinner one if the
  project's lock says so. Never draw N separate cubes side by side - the
  doubled outlines read as clip art and the silhouette dies.
- Corners: an L-turn in a wall is one mitre on the top face plus one vertical
  seam; do not overlap two runs (the double contour shows).
- Sorting is painter's algorithm on (x + y + z) of each solid's NEAREST-to-
  camera corner, not its centroid - centroid sorting flips on long runs. Draw
  far to near; within one solid: top fill, left fill, right fill, then seams,
  then the silhouette. Occlusion comes from opaque fills plus draw order - a
  near solid's white fill must fully cover the far solid's contour. Never fake
  depth by fading, blurring or shrinking a solid.
- Touching vs overlapping: two solids that TOUCH merge into one silhouette
  with the join drawn as a seam; two solids that merely overlap on screen keep
  both contours, and the near one wins by fill. Getting this wrong is what
  makes a cluster read as a pile of stickers.
- A MOVING payload that must pass behind static geometry gets depth bands: cut
  the scene into z-bands at the wall lines and put the payload's group between
  them, or clip the payload against the near wall's silhouette path. Sorting
  alone cannot do it, because the payload's sort key changes mid-animation.
- Heights carry meaning: vary tower heights in a small set (1, 1.5, 2, 3
  units) so a cluster reads as a city rather than a chart; keep the set small
  or it reads as noise.
- A ground plate under a cluster (a flat, slightly darker diamond, ~#F5F5F5,
  extending 1 cell past the silhouette) grounds the whole assembly and gives
  the shadow somewhere to fall.

### A2c. Interiors, openings and reveals

The strongest move in this register: a solid host that OPENS.

- Build the host as 4-8 module groups that already tile a footprint with no
  gaps. Reveal = translate each group outward along its own iso axis,
  distance 1-2 cells, keeping every group's silhouette intact.
- **Slide, never lift.** In the measured exemplar every one of the 12
  displacements is a pure ground-plane slide with a mathematically zero
  vertical component. That single restraint is what makes it read as a floor
  opening rather than as objects being taken apart.
- **Stagger out, land together** (measured): 12 different start frames
  converging on ONE shared landing frame - fanning out feels unlocked, landing
  together feels resolved. The CLOSE inverts it: one shared start, fanning
  arrivals. Open ~1.5 s, hold open ~1.25 s, close ~1.45 s, closed hold ~0.95 s
  spanning the loop seam. The hold is not padding: it is the only moment the
  reveal can be read.
- **Land the payoff early**: finish the reveal ~450 ms BEFORE the movement
  stops (the exemplar exposes the glyph at 1.53 s and the blocks settle at
  1.98 s). You read the message, then watch the scene settle; a payoff that
  lands on the last frame feels like a machine finishing.
- **The closed seam problem.** A host must read as ONE solid when closed and as
  N groups when open. Author every group with its own silhouette path plus one
  assembly-level silhouette computed on the closed footprint; closed, the
  assembly contour is what you see and the group outlines read as internal
  seams. If the register uses a single weight, this resolves itself - the
  exemplar's closed plaza shows every module seam at the same 2.6 px and still
  reads as one paved surface, because the seams are exactly what paving has.
- The interior is the one place a gradient is allowed - and it is authored in
  the FLOOR's own coordinate space, not the screen's: measured, #0D-#28 along
  the back edges ramping to #C8 at the front vertex (~0.6 gray levels per CSS
  px), PLUS an inner shadow pooled in the back corner (18-25 under the apex vs
  84 at the far end of the same edge). A pure linear ramp reads as a printed
  gradient; the corner pool is what sells a cavity.
- Taper the pit: the opening rhombus at grade is larger than the floor
  rhombus (measured floor 125.5 x 72.5 CSS at a depth of 18.2 CSS = 0.61 cube
  units), so the walls read as chamfered rather than as a bottomless hole.
- **Asymmetric lip**: stroke the two BACK edges of the opening at full weight
  and leave the two FRONT edges unstroked, where the floor's lightest value
  meets the ground. The front lip dissolves and the hole opens toward you.
- What is revealed must be flat ON the interior floor (sheared into the iso
  plane), simple enough to read at 40px - a mark, a glyph, a status code - and
  authored IN PLACE, 100% occluded at rest. It never fades in, slides in,
  scales in or draws itself: anything that enters has been argued to be new,
  which is the opposite of the claim the reveal exists to make.
- Do not fill the revealed mark pure white: measured #F3F3F3 against a #14
  floor. It is still the highest-contrast edge on the card, and the half-step
  down keeps it painted into the floor rather than floating in the hole.
- Do not rotate the camera to show the inside. The camera never moves in this
  register; the world opens instead. A moving iso camera reads as a game demo
  and breaks the drawing.

### A2d. Payloads in transit

- **Annotation plates** (field names, values, status strings) are objects in
  the world, not UI over it: a rounded rect under `skewY(-30deg)` so its long
  edges run the iso axis while its short edges stay screen-vertical; measured
  fill #F2F2F2, stroke #0B0B0B at 2.65, radius ~7.1 - **the same radius token
  as the route's corner fillet**. The extrusion is a hard duplicate of the
  same path filled black, offset along the iso axis (measured -9.85, -5.85)
  and hulled to the plate: it reads as thickness only because the offset is
  exactly on an axis.
- **Set the plate's type UPRIGHT.** Inside the skew group, upright roman comes
  out with exactly screen-vertical stems and reads as lying in the plane. A
  real italic on top of the skew is the tell that the plate was drawn in 2D
  and tilted. Size the plate to its label (measured: constant 46.2 height,
  widths 62.5-141) and end placeholder strings with a literal ellipsis so they
  read as fields, not as captions.
- Annotation layers are exempt from depth sorting: plates draw above every
  solid regardless of position, because they are labels, not bodies.
- A payload travelling a route moves along the iso axes only - never on the
  screen diagonal. Turns happen at grid intersections.
- A route is a legitimate object: a thin spline with rounded corners (measured
  radius ~7.1, i.e. ~0.13 cell), kept lighter than the object stroke, drawn
  under the solids and over the grid. If the claim is friction, give it NO
  start marker and NO end marker - clip both ends at the card edge; a capped
  route implies an origin and a destination, which resolves the very thing the
  scene is complaining about.
- **A tracer on a friction route never eases.** Measured: 497 CSS px/s, dead
  constant, through every corner and under every plate. The instinct to slow
  at corners and pause under labels is exactly what makes it read as a helpful
  demo instead of an indifferent process.
- **Motion streaks** (the two or three short strokes trailing a moving body)
  are stroked HEAVIER than the object outline (measured 2.84 vs 2.59) with
  round caps against the objects' miters, so they read as signal rather than
  structure - and they pass BEHIND the bodies, which is a free, exact depth
  cue. They are not a dash train between actors: nothing is being handed over.
- Payload stacking: when several payloads queue on one route, stagger their
  starts by ~250-400ms and let them keep their spacing; a queue that
  compresses reads as a bug.

### A2e. Actors, apertures and the exchange axis

For the two-actor (disintermediation) topology:

- An actor is a BODY of 2-6 stacked modules with one distinguishing feature -
  never a symbol of a machine, never a face, hands, eyes or a mascot. The
  exemplar builds ONE wedge body (two chamfered modules, the front one offset
  one axis-step) and uses it TWICE, differentiated only by pose and by the
  glyph on its single black face. The reader gets "these are two of the same
  kind of thing" for free.
- Exactly one face per actor is the black aperture, and it carries the
  identifying glyph: a lens (ring + centre dot + two diagonal ticks) says
  sensor, a franked badge says payment. A sensor is not a face - that is why it
  reads as a machine and not as a character.
- Point the black face where the body is GOING; the aperture doubles as a
  direction cue and does the work an arrowhead would otherwise do.
- Pose one actor square on the grid (edges exactly on the axes) and the other
  genuinely re-posed in 3D (three edge families off-axis) - not rolled in the
  picture plane. One on-grid body anchors the projection; the off-grid one
  reads as in flight.
- **Parallel travel, not convergence**: the exemplar moves both bodies the
  same distance along the same axis with the same curve, the follower starting
  550 ms later. There is no meeting point, no handshake, no approval beat -
  which is precisely the claim ("no human approving the transaction"). Reserve
  convergence for a claim that is actually about two things meeting.
- Keep a whole number of empty cells between the actors and put NOTHING in the
  gap. The empty span is the argument.

### A2f. Motion grammar for the register

- **Rigid transforms only** (see A2's legal-transform list). No bob, no float,
  no tilt wobble, no idle secondary loop: the exemplar spends 1133 ms of its
  5 s loop with nothing on screen moving at all. Stillness is allowed to be the
  largest phase, and it is what makes the one motion that does happen carry
  the meaning.
- **Three curves with fixed meanings**: LINEAR = an indifferent process
  (a tracer that does not care about you); EASE-OUT ~ `1-(1-t)^1.5` over
  ~580 ms = something arriving and settling; EASE-IN-OUT = a body moving under
  its own power. Use different curves for entry and exit on purpose - the
  exemplar's plates arrive eased and leave on a dead-linear translate.
- **Stagger grammar**: irregular gaps (300 / 800 / 200 ms) read as the scene
  dictating the pace; exactly regular gaps (100 / 100 / 100 ms) read as one
  decision being obeyed. Both are hand-timed; never randomised.
- **Tense rule**: a permanent property loops as a palindrome that re-pins to
  the first frame within a pixel; a process the user suffers is a one-way
  traverse that enters off one card edge and leaves by another and never
  returns to a start.
- No entrance scale, no spring, no pop: a plate's bounding box stays constant
  to +/-2 px while it fades and drops. Scale reads as motion toward the camera
  and breaks the isometric contract.
- No success state anywhere: nothing checks off, counts up, turns green or
  completes, unless completion IS the claim.

### A2g. Timing the register

Measured off the exemplar (5.017 s loop, 60 fps, three cards on one shared
clock): enter 1.0-1.6 s eased, hold 0.65-1.27 s, exit/close 1.0-1.47 s, quiet
0.6-0.95 s including the loop seam. All three scenes share the clock, so the
section breathes as one; if scenes are far apart on the page, desync them
instead (C7). Per-card shapes measured: card 1 one-way traverse 4.2 s at
constant velocity; card 2 palindrome out 1.62 s / hold 0.65 s / back 1.61 s
re-pinning within 0.05 px; card 3 open 1.5 s / hold 1.27 s / close 1.47 s /
closed hold 0.95 s.

### A2b. The generator - build ANY subject as an iso object

A2 gives the values; this gives the procedure. Everything below is
mode-agnostic: pick the material row for dark or light, then build.

**1. Plan space, then project.** Author every face as a flat rectangle in plan
coordinates and project once. 2:1 dimetric:

    const px = (x, y) => [x - y, (x + y) / 2];        // plan -> screen
    const at = (p, dy) => `${cx + p[0]},${dy + p[1]}`; // place at a stack level

A plate of footprint W x D has corners `[[0,0],[W,0],[W,D],[0,D]].map(px)`.
Anything drawn ON that plate (a bar, a window, a chip) is a plan rect run
through the same `px` - so it lands in the plate's plane automatically and
you never hand-skew a polygon. Vertical extrusion is the same face offset by
-h on screen y; a translation along an iso axis is `(dx, dx*0.5)`.

**2. Choose the arrangement.** Four cover almost everything:

| Arrangement | Build | Reads as |
|---|---|---|
| **Exploded stack** | N copies of one plate, screen-y offset by a constant rise, dashed vertical guides through the shared corners | layers, versions, revisions, a file's sections |
| **Board** | one large plate + smaller plates/prisms standing on it, dashed leader lines between them | a system, a dashboard, a machine |
| **Conveyor** | plates repeating along one iso axis with a constant pitch, linear translate loop | a pipeline, a queue, a flow |
| **Fan** | 3-5 plates rotated slightly around a shared anchor, overlapping | options, variants, a catalog |

**3. Map the subject to the object** - what to draw for a given feature:

| Subject | Object | Detail that sells it |
|---|---|---|
| An app / a screen flow | exploded stack of screen plates | each plate carries its own wireframe bars (title bar, body bars, one control) |
| A UI surface / component | one plate + floating fragments above it on short posts | the fragment is the real control (a chip, a row, a toggle), not a rectangle |
| A data flow / pipeline | conveyor of plates along one axis, nodes as small prisms | dotted connector paths that converge into one core |
| Storage / a database | stacked slabs of unequal height | a cut-away wedge with stipple interior on one slab |
| A file / a document | exploded stack, one plate per section | mono indices at the plate's right corner, a rise dimension at the left |
| A network / integrations | board with tiles on dashed bezier orbits | one tile lifted off the plane with its shadow on the ground grid |
| A build / compile step | two plates plus an extruded arrow between them | the arrow drawn as a real 3-face extrusion, never a 2D glyph |

**4. Material, per mode.** Re-derive, never invert (dual-theme rule):

| Layer | Dark blueprint | Light paper |
|---|---|---|
| Ground | #0A0A0C-#232323 | #EDEDED-#F4F2EC |
| Ground grid | 1 px dashed white at 4-6 %, `stroke-dasharray 1 7` | 1 px dashed #D8D5CE, same pitch |
| Guides (tier 1) | #3F3F43, `dasharray 3 4` | #CFCCC4, same |
| Outlines (tier 2) | #6E6E72-#8E8E93 | #A9A69E-#8C8A83 |
| Focal (tier 3) | ONE white edge, 1.4 px | ONE near-black edge #2A2A28, 1.4 px |
| Faces | rgba(255,255,255,.02-.05) | #FFFFFF -> #E9E7E1, 1-2 % per face |
| Depth | opacity dimming 25-40 % | opacity dimming + a soft contact shadow under the lowest plate only |
| Handles | 6 px square, bg-filled, 1 px focal stroke | same, filled with the paper colour |
| Labels | mono 10 px, #6E6E72 (focal row lighter) | mono 10 px, #8C8A83 (focal row darker) |

Lighting order never changes: top lightest, left mid, right darkest, one
light from upper-left, for every object on the page.

**5. The annotation kit** (this is what makes it read measured, not decorative):
- mono index at one corner of each plate ("01".."05"), tabular, focal row
  one step brighter;
- ONE dimension chain with real ticks - two 12 px cross-ticks joined by a
  vertical, labelled with the actual value ("52");
- dashed guides that OVERSHOOT the object by 18-24 px on both ends;
- selection handles on the focal plate only - four is the whole budget;
- never more than one dimension and one index system per object.

**6. Worked example (shipped 2026-08-21, direction G).** Subject: the lock
file. Arrangement: exploded stack. `W 300 · D 210 · rise 52 · cx 300 · cy 224`,
viewBox 660 x 500. Five plates; each carries three plan-space bars at
`(30,34,176,16)`, `(30,64,116,9)`, `(30,96,92,26)` - headline, sub line,
command - so every plate is visibly a page. Focal = the top plate: face at
5 % white, near edge in white 1.4 px, four handles, index "01" brighter.
Guides run through all four shared corners, overshooting 22 px below and 18 px
above. One rise dimension at the left, value 52. Ground: dashed iso grid at
5 % white, `dasharray 1 7`, 60 px pitch, extended past the frame on both axes.
Owner verdict: "her oser det kvalitet og detaljer".

**7. Failure modes.** A cube with no plan-space content is a stock icon. Two
dimension systems fight. Handles on every plate read as noise. Faces with
strong gradients on dark break the flat-tone rule (C3/C4). If the subject has
no physical object to draw, do not invent machinery - use a UI fragment
instead (`illustration-ideation.md`).

### A3. How these were made - and the production route

Marcel's set is vector work in Figma (the handles, px labels and dashed
bounding boxes ARE Figma chrome; his stack lists Figma · Rive · Lottie ·
After Effects), exported as SVG and, per his caption, "ready for animation"
= drawn as separable layers. Route for this skill:
- Static hero/CTA/bento art: author in Figma (or generate SVG directly) →
  inline SVG with the gray tiers as CSS variables so it re-themes.
- Animated: build in code with the A2 vocabulary (SVG groups per plane,
  CSS/WAAPI on transforms), or Rive for rich scenes; never ship video for
  line-art.
- Never raster: iso line-art must stay crisp at any DPR (`vector-effect:
  non-scaling-stroke`).

### A4. Where it fits (lock guidance)

- Native to F4 Blueprint Sheet (dark line-art) and F2 Ink & Air / F6 (soft-
  shaded light). As a garnish on F1 (one iso object per section).
- Choose when each feature/service has a physical deliverable to draw, when
  the audience respects engineering drawings, or when a "how it flows"
  story needs a stage (conveyor).
- Avoid when the product is abstract (no object to draw) - then UI
  fragments beat invented machinery.

---

## Path B - Structured light (why these gradients look expensive)

A radial blob gradient looks cheap for four reasons: no shape, no direction,
saturation everywhere, no grain. Every "expensive" example here gives light
GEOMETRY:

1. **Shaped falloff** - the gradient follows a form: a curved horizon band
   (Metricly: lavender→blue with a lighter arc rim; LeadBurst: navy→blue
   horizon rising from the bottom), a diagonal slab confined to one panel
   (Signilo: pink→coral inside a rounded panel), wedge rays (Hunt.io footer:
   light SHAFTS radiating from the hex prism), concentric rings (Hunt.io
   radar nodes).
2. **Line-work over light** - structure drawn on top modulates it: PCB
   traces with rounded corners and node pads (Flowpilot), spectrum sine
   ribbons threading an envelope (InboxWarden), nested rounded-rect
   outlines (Signilo), dashed connectors (BugScout), a hex-dot world map
   whose dots brighten near the source (Hunt.io). The eye reads the light
   THROUGH geometry.
3. **Anisotropic glow** - rays/streaks and 1px rings at falling opacity,
   not one blurred circle. Hunt.io footer = conic/linear shafts from the
   prism + a tight radial base + the dot field lit by proximity; hero = teal
   radar rings around cyan hex prisms, red threat dots with 2-3 tight
   rings, 1px connectors with rounded corners to mono label chips.
4. **Chroma rationing** - one hue family + white/black; a second hue only
   semantic (red = threat) or as thin spectrum strokes (ribbons, gradient
   text) at <3% surface area. Light pages keep 60-80% white.
5. **Grain + banding control** - 2-6% noise over every field (C9); pastels
   at low chroma; no hard stops except deliberate slabs.
6. **One light source** - tile shadows tint toward it, glows sit under
   objects, rays point away from it; everything agrees on one position.
7. **Objects sit IN the light** - glass tiles with tinted shadows, hex
   prisms with a lit top face, an envelope with ribbons passing through; the
   gradient is an environment, not wallpaper.

### B1. Construction recipes

- Horizon arc: `radial-gradient(120% 60% at 50% 115%, hue 0%, transparent
  70%)` (light rising from below) + a 1px lighter rim via a second, tighter
  radial; or an SVG ellipse stroke at 30% opacity.
- Diagonal slab: `linear-gradient(135deg, a, b)` inside a rounded panel +
  white mat around it; grain on the slab only.
- Rays: SVG wedge paths from the source with a linear gradient along each
  wedge (opacity .18 → 0), 6-10 wedges of uneven width, blur 12-24px,
  masked by a radial so they die at ~40% of the canvas; or
  `repeating-conic-gradient` masked radially.
- Rings: concentric SVG circles, 1px, opacity 0.18/0.12/0.07, optional slow
  linear pulse (scale 1 → 1.05, 4s) - ambient register.
- Hex-dot map: `<pattern>` of 2-3px hexagons, masked by a continent
  silhouette, brightness multiplied by a radial mask from the source.
- Ribbons: SVG paths 2-3px with gradient strokes + a blurred duplicate
  (glow) at 30%; 3-5 ribbons in spectrum hues through one object.
- Tinted shadows for glass tiles: `0 12px 32px -8px rgba(hue, .18)`; top
  face `linear-gradient(180deg, #fff, #f0f3ff)`; 1px border white/60.
- Always: grain layer (feTurbulence) over the field, and check the field
  on a real display - banding shows in 8-bit exports.

### B2. Where it fits

Heroes and closing CTAs (F3 Staged Atmosphere's asset discipline applies:
ONE light system per page, reused), dark security/infra brands (Hunt.io
register: black + teal + red-semantic), light SaaS heroes (pastel horizon +
glass tiles). In AX10 "structured light" is now a named asset option.

---

## Per-link reverse-engineering (short form; files in `posts/`)

- **marcelkargul-2090148** (corpus): monochrome iso line-art service cards  - 
  see its post file.
- **Services bento / CTA dome** (`local-marcel-isometric`, marcelkargul-2090509):
  above, A1.
- **marcelkargul-2089371 - Hunt.io hero**: black ground; hex-dot world map;
  cyan hex prisms as nodes with teal radar rings; red threat dots with tight
  concentric glows; 1px rounded-corner connectors to mono label chips
  (Unique error page · JA4 fingerprint · Hash Match · Campaign); one flag
  badge as the only non-palette color; H1 left-bottom, sub + pill right  - 
  the map is the hero object, the copy steps aside.
- **marcelkargul-2089404 - Hunt.io footer**: the same prism alone, dead
  center, emitting light SHAFTS across the dot map; two-line H1 + one pill;
  the footer as a second hero with the asset reused (F3 discipline).
- **HPbq collage - six light heroes**: shaped pastel fields (arc horizon,
  diagonal slab, rising horizon), line-work over light (traces, ribbons,
  outlines, dashed connectors), glass tiles with tinted shadows, hub-and-
  spoke icon rows, one dashboard shot bleeding off the bottom.
- **marcelkargul-1952697 - Chatsheet hero (video)**: soft-shaded iso
  conveyor, A1 second register; motion: linear conveyor along the iso
  axis, tiles bob, dotted paths converge; serif H1.
