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
clear air. Centred logo lockup, then an H1 at roughly 112 px / 500 over two
lines, black, tracking about -0.03em, measure about 1150. Two pills: black
filled with a monitor glyph, and white outlined. Nothing else.
**The move:** the only "graphic" is a particle field with no shape and no
gradient, and it earns the whole page because the type is enormous and the
field is genuinely edge to edge.

### Codex - one photograph, thrown out of focus, and the type sits on it
A full-bleed image in periwinkle and white at extreme optical blur - real
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
#000 with a floating rounded nav inside the container. The hero is six or seven
huge diagonal shafts in red, running upper left to lower right at roughly 55
degrees, each with a **dithered, noisy falloff** at its edges rather than a
clean gradient stop, with dark blue-black bleeding between them. Centred white
H1 about 72 px / 700 over two lines, directly on the shafts. Two-line sub. Two
light pills. A mono install hint under them.
**The move:** one hue at full energy, given geometry and direction, with the
falloff dithered so it reads as light through atmosphere rather than a CSS
gradient. The type does not get a scrim - it is placed where the shafts are
already dark.

### Vercel - one object, and the bloom does all the work
#000. Small strip with a pill above the fold. H1 about 64 px / 400, tracking
-0.06em, two lines, LEFT. Two pills. In the centre, ten white dots in a
triangle, each roughly 20 px with a real halo, on pure black. Three mono grey
lines right. Logo row at the foot.
**The move:** the object is ten circles. It works entirely because each one
carries genuine bloom on a true black ground - the light is emitted, not drawn.

---

## The shared formula

1. **Nothing is in a box.** No card, no panel, no container background behind
   the hero copy. Three of the five run a field edge to edge and set the type
   directly on it; the other two run no field at all. A figure in a frame
   beside a copy column appears in none of them.
2. **The field is the page, or there is no field.** There is no middle setting
   where a decorative panel sits next to the words.
3. **The optics are real.** Blur is 40-120 px, not 8. Falloff is dithered or
   grained, never a clean stop. Any light source carries bloom. Depth of field
   is genuine - something is out of focus.
4. **Type is bigger than a section headline.** 64-112 px on the first screen,
   weight 400-700, tracking -0.02 to -0.06em, one or two lines, left or centred
   but never justified into a narrow measure.
5. **Exactly two buttons.** One filled, one outlined or ghost. Pills or 6-8 px
   rounded rects, 40-52 px tall.
6. **Colour is one hue at high energy, or many hues at low density, or none.**
   Raycast is one red at full strength; Antigravity is five hues at 1 % surface
   area; Linear and Vercel are achromatic. None of them uses a two-stop brand
   gradient, which is the shape most generated heroes reach for first.

## Optics - the values the corpus was missing

| Effect | Values that read as real |
|---|---|
| Out-of-focus field | `blur(56-120px)`; push `saturate(2.5-4.5)` after blurring, because blurring desaturates; add `contrast(1.1-1.2)` to recover the mass |
| Dithered falloff | mask the field with a radial or linear gradient AND lay 4-8 % grain over it; a clean gradient stop is the tell |
| Bloom on a light source | duplicate the lit path under the sharp one at 2-3x the stroke width, `blur(4-8px)`, opacity .25-.40; never a uniform glow around the whole object |
| Depth of field | one layer sharp, one layer blurred, SAME content - the pair is what reads as a lens rather than a filter |
| Particle field | 2-10 px marks, random rotation, 0.5-2 % surface coverage, denser at two edges so the centre stays clear for type |
| Grain | 4-8 % over the field, `mix-blend-mode: overlay`, always (C9) |
| True black | Raycast and Vercel both use #000, not #0A0A0A - bloom needs true black under it to read as emitted |

## Recipe - Field Hero

- **Anatomy:** one 100 svh screen. A field at `position:absolute; inset:0` and
  z-index 0, edge to edge, with NO container painting over it. The copy sits at
  z-index 2 in a container whose background is `transparent`. Brand top-left,
  one action top-right. H1 64-112 px, one or two lines. One sub line. Two
  buttons, or one capture control. Nothing else.
- **The load-bearing rule:** the container must not be a surface. An opaque
  column background is what silently prevents every full-bleed field - the
  field renders and only shows in the margins.
- **Ingredients:** pick the field from the four the corpus shows - out-of-focus
  photograph, dithered light shafts, particle scatter, or nothing at all. Give
  it ONE light direction and put any object IN that light, lit from the same
  side. Grain over everything. If the product has a strong screenshot, prefer
  no field and let the restraint carry it (Linear).
- **Evidence:** the five above; optics table for values.
- **Families:** F3 Staged Atmosphere native; F1 Editorial Monochrome for the
  no-field variants; F8 Emissive Signal when the field is bloom on true black.
- **Choose when:** the first screen of anything, when the job is to make a
  visitor stop before they read. Not for a screen whose job is to explain -
  use One-Screen Poster or a section recipe.

## What this file changes about the skill's instincts

Before it, the skill's default first screen was "figure beside copy, both
inside a container" - correct at section scale, wrong at hero scale, and it
produced three near misses in a row. After it, the first question for any
first screen is: **does the field own the page, or is there no field?** There
is no third answer, and a container with a background is a defect.

---

# Part two - the probe, the geometry, the contracts

The section above was read off captures. On 2026-08-21 the same five heroes
were re-opened live at exactly 1440x900 and probed for computed styles,
bounding boxes and drawing technology. Screenshots taken on a wide display read
type larger than it is; the probe is the ground truth, and it corrected five
values that had been eyeballed. Both passes stay: the reading above is what the
screens ARGUE, the table below is what they MEASURE.

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

**Five corrections to part one, from the probe.** They matter because each one
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
- **The field** (Antigravity, Codex, Raycast) - it goes to the edges and the
  type sits on it.
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
"what's new" hook while keeping the 0-1 eyebrow budget (`quality-bar.md` § 2).

**Product shelf** (Linear, measured). Below the copy, one real product frame,
container-wide or full-bleed, top edge at ~54 % of viewport height (y 490 of
900), running 300-500 px past the fold. See the crop contract below.

## The crop contract - what may cross the fold

`quality-bar.md` § 1 bans content cut by the fold. Linear and Codex both cut
content at the fold on purpose, and the difference is not taste, it is which
LAYER gets cut. Both rules are true, and this is the seam between them.

**May cross the fold.** A product shelf or a field. Its top edge lands at
50-65 % of viewport height, it shows at least its own frame edge plus two or
three rows of real UI, and it is cut mid-panel, through repeating content, where
the eye reads "this continues" rather than "this ended". Measured: Linear's
shelf shows 410 of 804 px at 1440x900 (51 %) and 170 of 748 at 1280x720 (23 %) -
the top edge is anchored to the copy, so the fraction changes with viewport
height and both readings are correct. The invariant is the top edge and the
cut quality, never a percentage.

**Never crosses the fold.** The message. Headline, sub, buttons, the announcement
row, and any card whose own border or corner radius is severed - a cut card
reads as a layout bug, because a card is a closed object and the fold is not
one of its edges. A signature object that only makes sense whole (Vercel's dot
triangle) is a message, not a shelf.

Test in one line: **crop the media, never the meaning.** If a visitor who never
scrolls has lost an idea, the cut is wrong. If they have only lost more of the
same thing, the cut is the invitation.

## Type as the object

`quality-bar.md` § 2 budgets a headline at <= 6 words and <= 2 lines.
Antigravity ships **eight** words - "Experience liftoff with the next-gen agent
platform" - over two lines at 72 px, and it is the strongest type on any of the
five. The budget is not wrong; the case is exempt, and the exemption has
conditions.

**The headline may run to 9 words / 2 lines when ALL of these hold:**

1. It is the ONLY object on the screen. No product frame, no lit object, no
   illustration, no card. The field, if any, has a hole in it where the type
   sits (Antigravity's particle density thins through the middle band precisely
   for this).
2. It is set at **>= 72 px** at 1440 and holds one designed break -
   `text-wrap: balance` plus an explicit `<br>` at the planned split, with no
   orphan on either line.
3. The measure is wide: 1000-1200 px, centred. A long headline in a 600 px
   column is the failure the budget exists to prevent; the same words across
   1150 px are a poster.
4. There is no eyebrow, and the sub line is absent or a single short line.

Fail any one and the 6-word budget applies again. In particular: a long
headline NEXT TO an object is never the exemption - it is two things competing,
which is the § 3 "one object" rule under a different name.

## Archetypes are a layer under the families

A hero archetype is not a style. It says where the parts sit, where the light
comes from and what may be cut; the locked family blend says what it is made
of. The same three-zone baseline renders as F1 editorial (hairline column
rules, mono right column), F5 paper (a printed slab in the centre zone) or F8
emissive (Vercel's own register) without becoming any of those pages. This is
the same separation `recipes.md` § One-Screen Poster already uses: the skeleton
is fixed, the signature visual changes by family.

Consequences for the interview:

- **Never name a site in the question.** Ask in plain language - "type on the
  left with one lit thing holding the centre", "the product itself as a shelf
  under the words", "one field edge to edge with the words on top" - the same
  rule that keeps F1-F8 out of the owner's questions
  (`question-flow.md` § Question phrasing).
- **Name the site in the RATIONALE, and when the owner names it first.** "That
  composition is what Linear's first screen does; in your locked blend it comes
  out like this" is useful and honest. A menu of brand names is not a question,
  it is a moodboard.
- **Weights, not a pick.** Archetypes blend the way families do: 60 % left-
  anchored spine + 30 % type-as-object + 10 % product shelf is a legal answer
  and produces a real screen (large left type, no object, a shelf entering
  low). The one illegal blend is two SPINES at full weight - centred and
  left-anchored at 50/50 is not a composition, it is an unresolved layout.
- **The field question comes first** and is still binary (part one): field or
  no field. Archetype weights are asked after it, because "no field" removes
  three of the answers.
