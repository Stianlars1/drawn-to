# Practitioner methods - how the strongest work in this corpus gets generated

Why this file exists: the library indexes by POST. That answers "what does this
reference look like" and it does not answer the question an agent actually has,
which is "given a claim and a blank card, what do I do first". The references
that the owner returns to most are not one-off screens - they are the output of
a small number of designers running a repeatable METHOD, and the method is more
useful than any one screen.

Each entry below is one practitioner's method, reconstructed from every
reference of theirs in the library, written as moves you can execute. Use it at
the QI stage in `illustration-ideation.md`: after the claim is written and the
scene topology is chosen, pick a method and run its moves to get a concept that
has a spine instead of a style.

None of this replaces the derivation ladder. The ladder decides WHAT the picture
must argue; a method decides HOW that argument gets drawn, and supplies the
moves that keep a SET coherent.

---

## M1. The re-lit asset - marcelkargul

References: `marcelkargul-2089371` (Hunt.io hero), `marcelkargul-2089404`
(the same page's footer), `marcelkargul-2090148` (dark services bento),
`marcelkargul-2090509` (light CTA), `marcelkargul-1952697` (Chatsheet hero),
`marcelkargul-2089632` (tab component).

The signature: **one asset, one material system, many lightings.** Where a
generator makes a new illustration per section, this method makes one and
changes what the light is doing to it.

**The moves**

1. **Build one world for the page.** Hunt.io is a hex-dot world map with hex
   prisms. That is the whole visual vocabulary of the site.
2. **Re-light it for each job instead of redrawing it.** Hero: the prisms carry
   concentric radar RINGS - detection, many sources, watching. Footer: the same
   map at the same scale, one prism, emitting light SHAFTS - the promise,
   one answer, outward. Same asset, opposite rhetoric, achieved with light
   only. The closing section is a second hero, not a new illustration.
3. **Give light geometry.** Every glow is a ring, a wedge, a shaft, or a lit
   dot-field, and every one is attached to an OBJECT. Nothing glows because the
   page glows. This is the difference the owner named as "the gradients look
   expensive": a lone radial blob is free and reads free.
4. **Derive every secondary effect from the one source.** In the tab component
   the underline is a lamp: the pill picks up a bottom-lit gradient because the
   lamp is under it, the divider bleeds a cone into the panel because light
   passes through a groove, the label goes hot white inside the bloom, and a
   350 px gaussian-blurred icon watermark sits at 3-4 % in the panel. Four
   effects, one cause. A generator adds four unrelated effects.
5. **Invert the system rather than switching it.** The dark services bento
   (#232323 cards, white-ish iso line-art) becomes a light CTA on #EDEDED paper
   with #c9c9c9 outlines and white-to-#e6e6e6 face gradients. Same construction,
   same chrome, inverted values. Never two systems on one site.
6. **Keep Figma's own chrome as the ornament layer.** Selection handles,
   bounding boxes, dashed guides that overshoot to the edges, px leader lines.
   The drawing admits it is a drawing, which is more honest than a fake 3D
   render and much cheaper to animate.
7. **Time asymmetrically and hold dead still.** Enter ~650 ms ease-out
   (`cubic-bezier(0.16,1,0.3,1)`), exit ~400 ms ease-in, then a measurably
   static hold - glow luminance flat across seven sampled frames. Equal-duration
   ease-in-out both ways is the generic tell; an idle pulse on the hold is the
   second.

**Use M1 when** the project has one strong object or metaphor and several
sections that each need a visual. It is the cheapest way to make a page read as
one thing, and it survives a light/dark inversion.

**Failure mode** if you take only the surface: iso cubes with no world behind
them, and a different glow shape per section.

---

## M2. One atomic unit, three topologies - flohoeller

Reference: `flohoeller-2090388` (dark 3-step "how it works" row).

The signature: **the set varies its TOPOLOGY, never its parts.** Three
illustrations, one alphabet.

**The moves**

1. **Define the atom first.** Here: a rounded-square tile, radius ~22 % of its
   size, fill #1e2124 top to #17191c bottom, 1 px top rim highlight at
   rgba(255,255,255,0.07). Three variants of the same atom - logo tile
   (third-party mark, full colour), hub tile (the product's white mark, one step
   lighter and ~1.15x larger), empty tile (no mark, one step darker).
2. **Put the product at the exact centre of every diagram.** The brand is the
   constant; the context around it is what changes per feature. Three cards,
   three different worlds, and the same mark dead centre in all three.
3. **Change only the arrangement.** Quincunx grid (sourcing - many slots feeding
   one) · concentric orbit rings (enrichment - things circling and accruing) ·
   two S-curves converging to an apex (outreach - two streams merging into one
   channel). Each topology IS its claim; none of the three would fit a sibling.
   That is the swap test passed by construction rather than by decoration.
4. **Let an empty slot do the talking.** Four vacant tiles at the corners of the
   quincunx say "more integrations" without a word of copy or a "+ 200 more"
   label.
5. **Confine the texture to where the story is.** Graph-paper patches - 8 px fine
   cells, a stronger line every 4th at ~32 px - clipped to a ~360x260 rectangle
   behind each illustration and faded radially to nothing before the text. The
   page is not gridded; the story is.
6. **Underglow, never overglow.** Light attaches to the BOTTOM edge of a tile as
   an elliptical skirt: the object is sitting on a lit surface, powered on. It is
   the only hover affordance in the section.
7. **Delegate chroma to other people's logos.** The page chrome is fully
   grayscale; every saturated pixel is a real third-party mark plus one accent
   light family (magenta-violet, 30-40 % alpha, 16-24 px blur). The product's own
   mark is white: partners own colour, the product owns brightness.
8. **One lit element per diagram.** A comet arc spanning 90-120 degrees on an
   otherwise gray hairline ring, both ends fading to transparent. Exactly one.

**Use M2 when** you have 3-6 sibling features that are all "the product plus
some context". It produces genuinely distinct cells without any restyling, and
the set is cheap to extend - a seventh feature is a seventh topology, not a
seventh style.

**Failure mode** if you take only the surface: three orbit diagrams with
different logos in them.

---

## M3. The instrument per feature - `local-feature-graphics`

Reference: `local-feature-graphics` (four sections of one identity product).

The signature: **each feature gets its own purpose-built instrument**, drawn as
if the product had hardware.

**The moves**

1. **Ask what device would perform this claim** if the software were a machine.
   Instant verification -> a phone mid-scan with a glowing aperture ring and a
   "Verifying.." pill. Built-in security -> the same phone with a lock pill and
   two alert chips orbiting it. Breadth of documents -> a physical stack of
   document cards receding in opacity and blur. AI verification -> a screwed-down
   hardware plate with circuit traces fanning out. Instant confirmation -> a
   large coin-like button with a green check where the traces terminate.
2. **Show the mid-action state, not the resting state.** "Verifying..", a caret
   scan-line moving across a masked ID string, a spinner in the glyph slot. The
   claim is about a moment, so draw the moment.
3. **Orbit the proof around the claim.** The central object states the feature;
   small chips around it carry the evidence ("Fraud Protection - Risk signals
   monitored in real time", "190+ Regions Supported"). Chips are diegetic, with
   real field names and plausible numbers (C10).
4. **Let physics carry a quantity.** Breadth is a stack with depth. Termination
   is a trace that ends in a check. Depth is opacity plus blur, never a caption
   saying "many".

**Use M3 when** the features are capabilities of one product surface and a UI
screenshot would look identical for all of them.

**Failure mode**: an icon in a rounded square, four times.

---

## M4. Every card demonstrates itself - LexnLin, AlexandruDranga, adriankuleszo

References: `LexnLin-2024` (the anchor), `AlexandruDranga-2090`,
`adriankuleszo-2089253`.

The signature: **the card's loop performs the card's verb**, so the feature is
legible with the copy covered.

**The moves**

1. **Extract the verb from the headline.** Organize · input · hand off · schedule
   · summarise. One verb per card.
2. **Stage a real fragment of the product doing that verb**, with realistic data:
   versioned filenames, plausible counts, real field names.
3. **Enact, do not illustrate.** Organize = a stack of task pills cycling
   bottom-to-top with a spring. Effortless input = a typewriter at 105 ms/char
   typing, 45 ms/char deleting. Handoff = a zip suction. Schedule = a mock cursor
   travelling to a day cell, clicking, then to Save, clicking.
4. **Desynchronise the set.** Loop periods 2.45 / 2.5 / 5 / 7.4 s and one
   continuous marquee, so the grid never pulses in unison (C7).
5. **Match easing to meaning.** Linear for a marquee (indifferent process),
   spring `cubic-bezier(0.34,1.56,0.64,1)` for a discrete act, stepped for
   typing.
6. **Demote the caption.** Title and one sentence live OUTSIDE the card, under
   it, on the page ground - the card is all demonstration.

**Use M4 when** there is a motion budget and each feature has a demonstrable
interaction. It is the highest-conviction feature section in the corpus and the
most expensive.

**Failure mode**: five cards that all fade and rise.

---

## M5. The page as a technical document - 0xSero, xchylerdrenth

References: `0xSero-2090` (anchor), `xchylerdrenth-2090`, `marcelkargul-2090509`
(the paper inversion).

The signature: **credibility through notation.** The section is typeset like a
spec sheet, and the illustrations are drawings from that document.

**The moves**

1. **Number everything and cross-reference it.** FIG.1-FIG.4 plate labels in
   11 px mono, nav items 01-04, specs 1.1-2.3. The numbering is one device used
   consistently, not a label sprayed on every heading.
2. **Draw in 1 px line-art with real content.** Real shell commands, real
   hyperparameters, dotted leader lines between a mono key and its value.
3. **Get depth from opacity, not from perspective.** Elements dim to 25-40 % to
   sit back. Ghost circles behind nodes.
4. **Refuse fills, radii and shadows.** Cells share one 1 px divider, radius 0,
   no card background - the grid is cut from the page rather than laid on it.
5. **Ration hue to semantics only.** Green, red, amber for states. No brand
   accent anywhere.
6. **Let hierarchy be a gray ramp, not a size jump.** Title and body at the same
   size, separated by #fff > #929292 > #555 > #202020.

**Use M5 when** the audience reads hyperparameters, the motion budget is zero,
and the product's credibility is technical.

**Failure mode**: FIG labels on a page that has nothing to measure.

---

## How to use these in the QI stage

When proposing concepts for a feature set, do NOT propose four variations of one
method. Propose across methods - that is what makes the options genuinely
different rather than restyled:

| Concept | Method | What changes |
|---|---|---|
| A | M2 topology | one atom, a different arrangement per feature |
| B | M3 instrument | a purpose-built device per feature, mid-action |
| C | M4 self-demo | the real UI fragment performing the verb |
| D | M5 plate | the feature as a numbered technical drawing |

Then let the locked blend decide which of the four is even legal (M5 clashes
with a soft pastel direction; M4 needs a motion budget; M2 needs the product to
have a mark worth centring; M3 needs a hardware metaphor that is not a lie), and
present only the survivors with weights.

One method per SET. Mixing M2 and M3 across siblings is the same defect as
mixing registers - it is what makes a row of illustrations look commissioned
from four different people.
