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

Media: `references/media/local-production-heroes/` (owner's own captures at
1440-class widths; gitignored like the rest of the archive).

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
