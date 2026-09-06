# Hero atmosphere - the first screen, at production scale

Why this file exists: on 2026-08-21 the owner put three successive versions of
a landing screen next to Antigravity, Codex, Linear, Raycast and Vercel and
asked why none of them arrested the eye the way those do. The answer was not
taste and not craft. It was that the corpus this skill is built on is almost
entirely SECTION-scale - feature cards, bentos, components, cropped off X - and
`production-formula.md` carries the famous sites only as measured VALUES
(containers, air, type sizes). Nothing in the skill described how those pages
compose their FIRST SCREEN. So every attempt reached for the thing the corpus
is rich in: a well-drawn figure, in a box, beside a column of copy.

That composition is the one thing none of the five do.

Media: `references/media/local-production-heroes/` (the owner's own captures at
1440-class widths, shipped with the skill).

**Plates that ship with the skill** (no media archive required):

- `assets/plates/zone-*.svg` - own CC0 **layout diagrams**, one per archetype:
  `zone-particle-field` · `zone-filmed-ground` · `zone-product-shelf` ·
  `zone-light-shafts` · `zone-three-zone`. Each draws the viewport at
  1440 x 900, the zones, the baselines, the light direction, what crosses the
  fold, and the measured values as redline labels. Open the plate before
  composing; it is the geometry the prose below describes.
  **They are geometry, never style.** Every plate is stamped "layout diagram -
  geometry only" for a reason: grey bars stand in for type, dashed boxes stand
  in for fields, and none of it is a look. A build that resembles a plate has
  failed - the plate says WHERE, the locked blend says WHAT IT LOOKS LIKE, and
  the captures below say how good it has to be. Never copy a plate's palette,
  its hairlines, its mono labels or its wireframe bars into a page.
- `assets/heroes/*.jpg` - 1440-wide captures of the five pages themselves,
  chrome cropped, for looking at the real thing. Third-party material under the
  terms in `assets/heroes/NOTICE.md`: study them, cite the pattern, never
  reproduce them in a build.

---

## The five, read

### Antigravity - the field is confetti, the type is the page
White #FFFFFF, edge to edge, no gradient anywhere. Behind everything, several
hundred tiny dashes - roughly 2 x 8 px, each at its own rotation - scattered
across the whole viewport in blue, red, orange, purple and yellow, denser at
the left and lower edges, thinning through the middle so the headline sits in
clear air. Centred logo lockup, then an H1 measured at 72 px / 450 at 1440x900 over two
lines, black, tracking about -0.03em, measure about 1150. Two pills: black
filled with a monitor glyph, and white outlined. Nothing else.
**The move:** the only "graphic" is a particle field with no shape and no
gradient, and it earns the whole page because the type is enormous and the
field is genuinely edge to edge.

### Codex - one photograph, thrown out of focus, and the type sits on it
A full-bleed video in periwinkle and white at extreme optical blur - real
bokeh, a dark violet mass upper right, a bright diagonal streak lower left,
film grain visible across it. Centred app icon in a white rounded square with
one soft shadow. "Codex" at about 64 px. One sub line. One black pill. A logo
row at low opacity. Then a dark product window crossing the bottom edge. A
handful of ASCII arrows drawn in mono in the upper right as a quiet joke.
**The move:** the field is a real optical artifact, not a CSS gradient, and
nothing is placed on a panel. Type, icon and button all sit directly on the
photograph.

### Linear - no atmosphere at all, and that is the statement
Pure #08090a. Transparent nav. H1 about 64 px / 510 over two lines, LEFT at the
container edge, tracking -0.022em. One grey sub line. A "New ... ->" link
right-aligned on the sub's baseline. Then the product screenshot as one large
rounded frame crossing the fold.
**The move:** the restraint IS the hero. When the product shot is strong
enough, the correct field is none, and the confidence of an empty black screen
with one headline reads as expensive.

### Raycast - shaped light at full strength, and the type is inside it
#07080A with a floating rounded nav inside the container. The hero is six or seven
huge diagonal shafts in red, running upper left to lower right at roughly 55
degrees, each with a **dithered, noisy falloff** at its edges rather than a
clean gradient stop, with dark blue-black bleeding between them. Centred white
H1 measured at 64 px / 600 at 1440x900 over two lines, directly on the shafts. Two-line sub. Two
light pills. A mono install hint under them.
**The move:** one hue at full energy, given geometry and direction, with the
falloff dithered so it reads as light through atmosphere rather than a CSS
gradient. The type does not get a scrim - it is placed where the shafts are
already dark.

### Vercel - one object, and the bloom does all the work
#000. Small strip with a pill above the fold. H1 about 64 px / 400, tracking
-0.06em, two lines, LEFT. Two pills. In the centre, ten white dots in a
triangle, each roughly 20 px with a real halo, on pure black. Three sans gray
lines right. Logo row at the foot.
**The move:** the object is ten circles. It works entirely because each one
carries genuine bloom on a true black ground - the light is emitted, not drawn.

---

## What transfers from these five

These five historic production captures demonstrate several ways to put type,
product and atmosphere in one first screen. They are examples, not an exhaustive
hero grammar. Their measured H1 sizes at 1440x900 are 64-72 px and their button
counts range from zero to two. Wider type/image relationships are documented in
`september-expansion.md`, including image-first and bounded split heroes.

A full field needs transparent overlaid containers where the field should show.
A bounded field can deliberately stop at a container edge (Raycast does), and
a split hero can deliberately give product evidence its own panel. State the
extent and reading zone in the lock. Choose color, finish and optical depth for
the actual material, not because every hero must glow or blur.

## Optics - the values the corpus was missing

| Effect | Implementation starting points (not source measurements) |
|---|---|
| Out-of-focus field | `blur(56-120px)`; push `saturate(2.5-4.5)` after blurring, because blurring desaturates; add `contrast(1.1-1.2)` to recover the mass |
| Dithered falloff | mask the field with a radial or linear gradient AND lay 4-8 % grain over it; a clean gradient stop is the tell |
| Bloom on a light source | duplicate the lit path under the sharp one at 2-3x the stroke width, `blur(4-8px)`, opacity .25-.40; never a uniform glow around the whole object |
| Depth of field | one layer sharp, one layer blurred, SAME content - the pair is what reads as a lens rather than a filter |
| Particle field | 2-10 px marks, random rotation, 0.5-2 % surface coverage, denser at two edges so the centre stays clear for type |
| Grain | optional, tuned for the chosen material and output; not inferred from JPEGs |
| True black | Vercel uses #000; Raycast's probed ground is #07080A. Choose compositing and black level together |

## Recipe - Field Hero

- **Anatomy:** one 100 svh screen. A field at `position:absolute; inset:0` and
  z-index 0, edge to edge, with NO container painting over it. The copy sits at
  z-index 2 in a container whose background is `transparent`. Brand top-left,
  one action top-right. Start from the approved type scale (the five measured examples use
  64-72 px at 1440x900). Use the required action count, including zero hero
  buttons when the next action is already clear.
- **The load-bearing rule:** the container must not be a surface. An opaque
  column background is what silently prevents every full-bleed field - the
  field renders and only shows in the margins.
- **Ingredients:** pick the field from the four the corpus shows - out-of-focus
  photograph, dithered light shafts, particle scatter, or nothing at all. Give
  it ONE light direction and put any object IN that light, lit from the same
  side. Choose the finish for that material; do not add grain to operational text. If the product has a strong screenshot, prefer
  no field and let the restraint carry it (Linear).
- **Evidence:** the five above; optics table for values.
- **Families:** F3 Staged Atmosphere native; F1 Editorial Monochrome for the
  no-field variants; F8 Emissive Signal when the field is bloom on true black.
- **Choose when:** an atmospheric first screen serves the approved brief and the job is to make a
  visitor stop before they read. Not for a screen whose job is to explain -
  use One-Screen Poster or a section recipe.

## Composition before effects

Choose whether the screen is type-led, a product shelf, image-first, a split
of copy and evidence, a bounded material or a full-screen field. The object,
type and action need a deliberate relationship. No single composition is a
prerequisite for a good hero.

---

# Part two - the probe, the geometry, the contracts

The section above was read off captures. On 2026-08-21 the same five heroes
were re-opened live at exactly 1440x900 and probed for computed styles,
bounding boxes and drawing technology. Screenshots taken on a wide display read
type larger than it is; the probe is the ground truth, and it corrected five
values that had been eyeballed. The reading above has been reconciled with those probes. The table below
records that historical snapshot; it is not a claim about today's live pages.

## The measured plate - all five at 1440x900

| | Antigravity | Codex | Linear | Raycast | Vercel |
|---|---|---|---|---|---|
| Ground | `#FFF` | full-bleed film | `#08090A` | `#07080A` | `#000` |
| H1 size / weight | **72 / 450** | 64 / 500 | 64 / 510 | 64 / 600 | 64 / 400 |
| Tracking | -0.02em | -0.03em | -0.022em | 0 | **-0.06em** |
| Line height | 1.0 | 1.0 | 1.0 | 1.1 | 1.0 |
| Alignment | centre | centre | **left** | centre | **left** |
| Ink | `#121317` | `#000` | `#F7F8F8` | `#FFF` | `#EDEDED` |
| Face | Google Sans Flex | OpenAI Sans | Inter Variable | Inter | GeistSans |
| H1 top | y 348 | y 274 | y 276 | y 390 | y 328 |
| Sub | none | 1 line | 15 / 400 `#8A8F98`, lh 24 | 18 / 400 white, lh normal | none under H1 |
| Buttons | 2 x 47 px, full pill | **1** x 40 px, r 40 | **0** | 2 x 36 px, **r 8** | 2 x 40 px, full pill |
| Button gap | 16 | - | - | 16 | 12 |
| Button skin | `#121317` fill / `rgba(183,191,217,.1)` + 1px `rgba(33,34,38,.06)` | `#000` fill | - | `#E6E6E6` + ring `0 0 0 2px rgba(0,0,0,.5)` + glow `0 0 14px rgba(255,255,255,.19)` | `#EDEDED` fill / `#0A0A0A` + ring |
| Field tech | WebGL2, DPR 2 | `<video>` 2560² + canvas 2d | none | WebGL, 1200-wide box | WebGL2, overscan, DPR 1.48, screen |

**Probe findings reconciled in part one.** They matter because each one
would otherwise be built wrong:

1. **The H1s are 64-72 px at 1440, not 96-112.** Every one of the five sits in a
   64-72 band; only Antigravity leaves 64, and only by 8 px. A 112 px headline
   at 1440 is not what these pages do - it is what a retina screenshot of them
   looks like. (Type is fluid: the same H1 grows past 1440. Build to the value
   at the viewport you are judging.)
2. **Codex's field is a video, not a photograph.** `floral_a.mp4`, 2560x2560,
   `object-fit: cover`, muted / looped / autoplaying, with a 2D canvas pass over
   it. The bokeh is real because a camera made it (`render-tiers.md` § T6).
3. **Vercel's right-hand column is 16 px sans, not mono, and it is two-tone**:
   a `#EDEDED` lead clause at weight 450 followed by an `#A1A1A1` continuation
   at 400 - C4's two-tone headline device applied to body copy.
4. **"Exactly two buttons" is not the rule.** The set runs 0, 1, 2, 2, 2.
   Linear's hero has **no** button at all: the only action on the first screen
   is the `Sign up` pill in the nav, and the hero carries a text link instead.
   The rule is **at most two, and zero is available** when the nav already
   carries the action and the product shot is the argument.
5. **Raycast's shafts are container-width, not full-bleed.** They live in a
   1200x942 box on a 1440 viewport, so the field dies before the viewport edges
   and the page keeps a dark frame around it. Vercel does the opposite and
   overscans past every edge. Full-bleed is a decision, not a default.

## Zone grammar - where the parts sit

Part one settles the field. This settles the geometry. Two axes, and every one
of the five is one cell of the pair.

**Axis 1 - the spine.**
- **Centred column** (Antigravity, Codex, Raycast). One axis, everything on it,
  the field symmetric around it. Reads as an announcement.
- **Left-anchored with a right counterweight** (Linear, Vercel). Copy at the
  container's left edge; something else holds the right so the row does not
  fall over. Reads as a system.

**Axis 2 - what fills the rest of the screen.**
- **The field** (Antigravity, Codex, Raycast) - its extent is deliberately
  full-width or bounded, and the type sits in its reading zone.
- **The product** (Linear) - a real screenshot, one frame, crossing the fold.
- **One lit object** (Vercel) - a single emissive thing in its own zone.

### The three named devices this produces

**Three-zone shared baseline** (Vercel, measured). One horizontal band, three
occupants, one shared optical centre line: H1 + buttons at the container's left
edge (x 24) · the lit object dead centre · a right column at x 1060 carrying
three two-tone sentences. No column has a background. The zones are held apart
by emptiness, not by rules or panels. Choose it when three different things
must be said at once and none of them is a paragraph.

**Baseline-anchored announcement** (Linear, measured). The sub line sits left at
15 / 400 grey; the "New / Coding Sessions ->" link sits on the **same baseline**
at the right end of the container. It is not a badge, it is not above the H1,
and it takes the eyebrow's job without being one - which is how a page ships a
"what's new" hook without adding an overline. Use this as a hierarchy example,
not a global eyebrow quota (`quality-bar.md` § 2).

**Product shelf** (Linear, measured). Below the copy, one real product frame,
container-wide or full-bleed, top edge at ~54 % of viewport height (y 490 of
900), running 300-500 px past the fold. See the crop contract below.

## The crop contract - what may cross the fold

For a first impression designed around the fold, check what meaning the initial
view preserves (`quality-bar.md` § 2). Linear and Codex deliberately crop product
media. Their following patterns are examples, not a ban on scrolling, partial
collection items or every card whose border crosses a viewport edge.

**May cross the fold.** A product shelf or a field. Its top edge lands at
50-65 % of viewport height, it shows at least its own frame edge plus two or
three rows of real UI, and it is cut mid-panel, through repeating content, where
the eye reads "this continues" rather than "this ended". Measured: Linear's
shelf shows 410 of 804 px at 1440x900 (51 %) and 170 of 748 at 1280x720 (23 %) -
the top edge is anchored to the copy, so the fraction changes with viewport
height and both readings are correct. The invariant is the top edge and the
cut quality, never a percentage.

**Protect the intended first-view message.** Keep the necessary text, action and
meaningful portion of the image available. A signature object that only makes
sense whole needs more protection than repeating product rows or collection
items. A border crossing the fold is not by itself proof of a layout bug.

Test in one line: **crop the media, never the meaning.** If a visitor who never
scrolls has lost an idea, the cut is wrong. If they have only lost more of the
same thing, the cut is the invitation.

## Type as the object - a measured example

Antigravity's eight-word heading spans two lines at 72px on a roughly 1150px
measure. A sparse particle field leaves the reading zone clear. This shows how
large type can carry the first screen without a separate product object.

Use the relationship when it serves the brief: sufficient measure, deliberate
line breaks and a clear hierarchy between type and imagery. The example does
not create a six-word ceiling, a nine-word exemption or a minimum type size for
other heroes. Check actual breaks and readability at each target width
(`quality-bar.md` § 1-2), including a split or image-led editorial composition.

## Archetypes are a layer under the families

A hero archetype is not a style. It says where the parts sit, where the light
comes from and what may be cut; the locked family blend says what it is made
of. The same three-zone baseline renders as F1 editorial (hairline column
rules, mono right column), F5 paper (a printed slab in the centre zone) or F8
emissive (Vercel's own register) without becoming any of those pages. This is
the same separation `recipes.md` § One-Screen Poster already uses: the skeleton
is fixed, the signature visual changes by family.

Consequences for the interview:

- Ask about visible relationships in plain language: "type at the left with
  evidence beside it", "the product as a shelf" or "an image setting the
  scene". Link a relevant named reference when useful; keep internal ledger
  codes out of the question (`question-flow.md` § Question phrasing).
- Explain what transfers from a reference rather than treating its brand name
  as a complete design specification.
- **Weights, not a pick.** Archetypes blend the way families do: 60 % left-
  anchored spine + 30 % type-as-object + 10 % product shelf is a legal answer
  and produces a real screen (large left type, no object, a shelf entering
  low). The one illegal blend is two SPINES at full weight - centred and
  left-anchored at 50/50 is not a composition, it is an unresolved layout.
- First settle the relevant relationship: full field, bounded imagery, split
  copy/evidence, image-first, product shelf or type-led. Ask only about choices
  still open; an approved composition does not repeat this step.
