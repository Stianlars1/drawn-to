# Quality bar - the tells, the budgets, the illustration bar, the visual QA loop

Why this file exists: on 2026-08-21 a page passed every lock in its ledger and
still read as AI slop - an eyebrow label on every screen, a 7-word headline
breaking onto three lines, a hero card cut off by the fold, a triangle in a
ring as "the object", conic stripes as "light". The locks say WHAT the design
is. This file says when to STOP and how to CHECK. It runs as step 6 of the
process (before the polish pass) and the visual QA loop is mandatory before any
handoff - no exceptions, no "verified" without it.

The test for everything below: **would a principal design engineer sign this
screen?** If the honest answer is "it's fine", it is not.

## 1. The tells - never ship

These are the signatures of generated UI. One of them is enough to make an
owner close the tab; the skill's whole job is that they never appear.

**Labels and copy**
- Eyebrow / overline / mono-caps label above more than ONE headline per page.
  The hero may carry one. Sections get a heading, not a label above the
  heading. If a family uses a numbered ledger device (FIG. 01, 01/05), it is
  ONE device used consistently - not a label spray.
- Hero headline longer than 6 words or 2 lines at the locked width; a line
  break nobody designed ("Give your coding / agent / a trained eye"); a
  single orphaned word on its own line. Breaks are designed: `text-wrap:
  balance` plus an explicit `<br>` or `&nbsp;` at the planned split.
- Hero sub-copy longer than 2 lines × ~60 ch. One paragraph, one idea. If the
  measure is narrow, CUT the copy - never wrap it to 5 lines.
- Three calls to action in one view (nav action + hero button + install
  command + "read the source" = four). Budget: one primary, one secondary.
- Stat strips with 5 numbers. Three or none. One witty line ("0 icon + blurb
  cards") is a joke; repeated on every screen it is noise.
- Em dashes (—) anywhere in copy - headline, sub, captions, labels, footer.
  Owner's standing rule: ALWAYS "-", NEVER "—". An em dash is the single
  most reliable tell of generated copy; a hyphen with spaces does the job.
- **Internal nomenclature in anything a visitor can read.** Family ids
  (F1-F8), constant ids (C1-C12), axis ids (AX1-17), question ids (Q0, Q1,
  QI) and reference slugs (`basit_designs-2089995`) are ledger bookkeeping.
  They must never reach user-visible output: headlines, sub copy, body,
  captions, labels, eyebrows, direction labels, legends, chart keys, swatch
  keys, table headers, tooltips, button text, footers, `alt` text,
  `aria-label`, `title`, `<figcaption>`, SVG `<text>`, page `<title>` or any
  filename shown on screen. "Constant C2: zero icon-and-paragraph cards" and
  a swatch wall keyed `F1 ... F8` are the failure: a visitor cannot know what
  C2 or F1 is, so the string reads as internal tooling left switched on. Say
  the thing instead - "Zero icon-and-paragraph cards across fifty-one
  references", "Editorial Monochrome". Every code has a plain wording in
  `question-flow.md` § Plain-language glossary; run a lock row through the
  RIGHT column before it becomes copy. A code that must be labelled on screen
  (a legend, an index) takes the plain name, and the code goes in a comment.
  This is a ship blocker at the same tier as an em dash. Codes stay legal in
  the lock file, in source comments, in commit messages and in skill docs.
  Check before handoff: strip comments from the rendered markup, then
  `grep -nE '\b(F[1-8]|C([1-9]|1[0-2])|AX[0-9]{1,2}|Q[0-9]+|QI)\b|Constant C'`
  over the visible text plus every alt/aria-label/title value - zero hits.
- Triads ("Fast · Secure · Scalable"), sparkles ✦, emoji, "✨ New" pills above
  the headline, lorem, placeholder avatars, "Trusted by 10,000+ teams" without
  a real logo row.
- **The same content model repeated across a multi-screen page.** Five, nine or
  twenty screens that each render the identical headline, sub line and CTA are
  one design shown N times, and an owner reads that as generic no matter how
  distinct the skins are. In a catalog, each screen argues a DIFFERENT slice of
  the product in a different screen kind (`recipes.md` § One-Screen Catalog).
  Same failure at device level: nine screens, nine "one signature visual"
  slots, but only three device families used. Name the device per screen.
- **The page draws itself twice.** A wireframe/redline of the current screen
  placed ON the current screen, complete with its nav bar, its headline text
  and its footer, does not read as a technical figure - it reads as an
  accidental duplicate. Draw a FIGURE (framed, labeled, wireframe bars, no
  live copy) or annotate the real elements in place; never both.
- **Text set flush on its own construction line.** If a scaffold, rule or grid
  line is visible, the copy must be INSET from it (one gutter, 32-48 px), not
  sitting on it. Flush-to-the-rule reads as missing padding, never as
  alignment.
- **A first screen composed as a figure in a box beside a column of copy.**
  Correct at section scale, wrong at hero scale, and it is what this corpus
  hands you by default because the corpus is section-scale. None of the five
  production heroes does it. A first screen either lets a field own the page
  with the type set directly on it, or runs no field at all
  (`hero-atmosphere.md`). A container with its own background on a first screen
  is a defect, not a style choice - it is what prevents the field.
- **Chrome that moves between screens.** Persistent controls (transport,
  theme toggle, progress) must hold ONE position and ONE skin across every
  screen of a cycling page. Nesting them inside a per-direction container
  whose width changes makes them jump on every transition - the single most
  irritating motion on the page, and the visitor blames the transition.

**Surfaces and composition**
- Anything the owner should see first that does not fit the first viewport:
  a hero card whose bottom edge is cut at 100 svh, a visual that only makes
  sense after scrolling. Fold discipline is a lock, not a hope (see § 2).
- Running text in a column narrower than 40 ch; a hero column where the
  sub-copy wraps past 4 lines (the column is wrong or the copy is too long).
- Icon + paragraph card rows (C2), glassmorphism stacks, mixed radii, gradient
  text, the purple→blue "AI gradient", hover lifts on dark (C3), entrance
  choreography on every section (C12), bounce on anything that is not a pop.
- Two mid-luminance layers overprinting (ghost tiers, see SKILL checklist 4).

**Illustration and light**
- An illustration that would fit the feature next to it (the swap test) - the
  single most common generated-illustration failure: pretty, on-brand, and
  interchangeable. Also: N illustrations in one set drawn in N different
  styles to make them feel distinct.
- Isometric construction tells (these are what produce the "stock-looking iso
  cubes" impression): every face stroked individually, so every seam shows a
  doubled outline · a heavier outer contour added out of instinct (the
  reference measures silhouette and seam identical) · gradient fills on object
  faces · a far solid faded, blurred or shrunk to sit back instead of being
  occluded · contact shadows that darken where they overlap · an assembly
  built as N cubes drawn side by side instead of one extruded run · an iso
  camera that rotates, dollies or parallaxes on scroll · a bobbing object
  whose shadow bobs with it · a scale or spring on an iso entrance.
- A centered radial blob as "atmosphere"; conic or striped "rays"; a logo-like
  glyph (triangle, circle, bolt) inside a ring as "the object"; a gradient
  without grain (C9); stock-looking isometric cubes; three floating cards at
  an angle. These read as decoration, and decoration reads as generated.

## 2. Budgets - per screen, per direction

The content model is a CEILING, not a floor. An airy direction renders fewer
lines of the same message; a dense editorial direction renders more. Cutting
copy for a direction is allowed and often required - ask the owner only when a
cut removes a message, never when it removes words.

| Element | Budget | When over |
|---|---|---|
| Headline | ≤ 6 words · ≤ 2 lines at locked width · designed break | rewrite shorter; the brand name can be the headline |
| Sub-copy | ≤ 2 lines × 60 ch (~120 chars) | cut to the one idea |
| Eyebrow / overline | 0–1 per page | delete; promote to the numbered device if the family has one |
| Calls to action | ≤ 2 in view (primary + one of: install command / secondary link) | the nav action counts - drop the duplicate |
| Stats / proof numbers | 0 or 3 · tabular · one line | pick the three that argue; the rest go to the README |
| Nav | brand + ≤ 4 links + 1 action | cut links |
| Signature visual | 1 per screen, specific to the product (C2) | none beats a weak one |
| Running-text measure | 45–75 ch · never < 40 ch | widen the column or cut the copy |
| Hero paragraph | ≤ 4 lines | cut |
| Fold | first impression fits 100 svh at 1440×900 AND 1280×720; stacks cleanly at 390×844 | re-compose; reduce; never just shrink type |
| Card aspect | the hero card/mat fits inside the fold with ≥ 48 px air top and bottom | cut content inside the card, not the air around it |

Single-screen pages (100 vw × 100 svh, no scroll) are a legitimate and often
superior answer for a product with one message; the budgets above are then
hard limits, and the signature visual carries the direction.

**Per screen KIND.** The table above is the POSTER budget. A one-screen
catalog runs several kinds, and a feature trio or a ledger legitimately
carries more elements than a poster does - the per-kind deltas live in
`recipes.md` § One-Screen Catalog. Two rules survive every kind: the fold
(100 svh, no scroll, ≥ 48 px air) and the tells in § 1. Two rules are added
for catalogs: **no screen kind repeats**, and **no device repeats**.

## 3. The illustration bar

An illustration or light field ships only if ALL of these hold:

1. **Specific** - it depicts THIS product's mechanism, feature, or metaphor
   (C2). If it would fit any SaaS page, it is décor.
2. **Layered** - ≥ 3 layers of depth (ground · mid · focal) or one object with
   ≥ 3 levels of detail (silhouette · construction lines · labels/values).
3. **Shaped light** - falloff has a direction and an edge (slab, beam, arc,
   ring with a lit side); never a centered symmetric blob. Every gradient
   carries 2–6 % grain (C9). Dark grounds: no drop shadows (C3).
4. **Consistent line** - one hairline weight (0.75–1 px), one accent (C1),
   tabular numerals in any label (C5), real values in any annotation (C10).
5. **Two distances** - something to read at 2 m (the silhouette) and something
   to discover at 20 cm (the detail). A shape that is fully understood in one
   glance is a logo, not an illustration.
6. **One per frame** - one signature object per screen, or one per CELL in a
   multi-cell set (feature trio, bento, gallery). Two competing objects inside
   one frame halve each other. This condition governs the inside of a frame;
   it never licenses reusing one device across the cells of a set - see § 3b.
7. **Non-transferable** - in a SET (feature cards, bento, steps), each
   illustration fails the swap test: mounted on a sibling feature it would
   argue the wrong thing (`illustration-ideation.md` § derivation ladder). An
   illustration that would sit equally well on any sibling is decoration, no
   matter how well drawn.
8. **One register across the set** - one projection, one module scale, one
   value ladder, one line-weight hierarchy, one focal rule, one motion
   register. Variety comes from what is on stage, never from restyling.

9. **Isometric sets - the construction check.** One silhouette path per SOLID,
   never one per face · a stated number of stroke weights (often ONE per card
   in the paper-white register), constant across object sizes · zero gradients
   on object faces, the single exception being an opened interior · depth by
   occlusion only, never opacity, blur or size · shadows flat and
   non-compounding where they overlap, and identical in value whether grounded
   or detached · exactly one black focal face per card, always the surface the
   feature acts through · grid pitch, phase and world origin identical across
   every card in the set · rigid transforms only, and the camera never moves.
   (`isometric-and-light.md` § A1a-A2g.)

If any condition fails: ship NO illustration. A typographic hero on a well-set
ground is a strong, legitimate answer; a weak object is the single fastest way
to look generated. Devices and construction: `illustration-ideation.md`,
`isometric-and-light.md`, `graphic-language.md`.

## 3b. The set bar - 2 or more illustrations on one screen or in one section

§ 3 judges ONE illustration. Three illustrations that each pass § 3 can still
ship as slop, because sameness is a property of the SET and no per-object test
can see it. This shipped: a "Discover / Interview / Lock" trio rendered as
three drawings of grey bars inside a thin rectangle - each cell specific,
layered, line-consistent, and the row read as one device photocopied.

A set of 2+ illustrations ships only if ALL of these hold, on top of § 3 per
cell:

1. **No device repeats.** Every cell names a different device from
   `illustration-ideation.md` § Device catalog. Two cells may share a family;
   they may not share a device. Same device twice = fail.
2. **Two registers minimum.** The set spans at least two metaphor registers
   (instrument · mechanism · product-fragment · blueprint plate · material ·
   isometric).
3. **Distinct silhouettes at 2 m.** View the row at 25 % zoom with the type
   hidden. If the cells read as one shape repeated, the set fails - relabelling
   and recolouring do not fix it.
4. **Distinct verbs.** Each cell's verb (fit-method step 1) differs, and each
   drawing enacts ITS verb.
5. **One material system.** Same hairline weight, ramp, accent and grain across
   the set - variety lives in the object, never in the finish.

Failing any of these: redesign the offending cell against the device catalog,
or drop the illustrations for the whole set and ship it typographically. Never
ship N of the same device.

## 3c. The first screen - the bar a hero has to clear

§ 1-3b judge any screen. A first screen carries three extra contracts, all
measured off the five production heroes (`hero-atmosphere.md`,
`posts/local-production-heroes.md`).

**The field question is answered before anything is drawn.** Does the field own
the page, or is there no field? There is no third answer, and a container with
its own background on a first screen is a defect, not a style choice.

**The crop contract - crop the media, never the meaning.**

| May cross the fold | Never crosses the fold |
|---|---|
| A product shelf or a field: top edge at 50-65 % of viewport height, cut mid-panel through repeating UI, at least its own frame edge plus 2-3 rows of real content visible | Headline, sub, buttons, the announcement row |
| The cut reads "this continues" | Any card whose own border or radius is severed - a card is a closed object and the fold is not one of its edges |
| Measured: Linear shows 410 of 804 px at 1440x900, 170 of 748 at 1280x720 - the top edge is anchored to the copy, so the fraction moves with viewport height | A signature object that only works whole (a lit constellation, a drawn figure) - that is a message, not a shelf |

The test: if a visitor who never scrolls has lost an IDEA, the cut is wrong. If
they have only lost more of the same thing, the cut is the invitation.

**The light budget - one light logic per first screen.** One direction, one
source, and the type placed where that light is already dark so no headline
needs a scrim. Two light stories on one screen (a glow behind the type AND a
lit object AND a gradient wash) is the same failure as two signature objects.

**The type-as-the-object exemption.** The § 2 headline budget (<= 6 words) is
lifted to **9 words / 2 lines** when ALL four hold: the type is the ONLY object
on the screen · it is set at >= 72 px at 1440 with one designed break · the
measure is 1000-1200 px · there is no eyebrow and at most one short sub line.
Fail any one and 6 words applies again. A long headline BESIDE an object is
never the exemption - that is two competing objects (§ 3 item 6).

**Buttons: at most two, and zero is available.** Measured across the five:
0, 1, 2, 2, 2. Linear's first screen has no button at all - the nav carries the
action and the product shot carries the argument. Three actions in view is
already a § 1 tell; two identical-weight pills where one would do is a weaker
screen than one pill.

**Render tier.** Any first screen carrying a field also passes
`render-tiers.md` § 6: poster authored first and shipped as the ground · the H1
is DOM text, never inside the canvas · all four stop conditions wired (off
screen, hidden tab, reduced motion, save-data) · DPR clamped to 1.25-1.5 on a
soft field · one full-viewport canvas, never two · no 3D engine loaded for a
flat field · reduced motion holds a composed frame rather than stopping
mid-animation. The tier and its reason go in the lock file as the `RENDER:`
line.

## 4. The visual QA loop - mandatory before handoff

Judge the render, not the code. Never from a thumbnail.

1. **Render** at 1440×900 (primary), 1280×720, 390×844 - real browser, full
   viewport, device-pixel-ratio 2 where possible. A screenshot narrower than
   1200 px hides density problems; it does not count as QA.
2. **Tells** - walk § 1 line by line against the render. Any hit → fix →
   re-render. Do not argue with a tell.
3. **Budgets** - walk § 2. Count the eyebrows, the CTAs, the headline lines,
   the stat numbers; measure the column in ch; check the fold at both desktop
   sizes.
3b. **Device table** - for every screen or section carrying 2+ illustrations,
   read its set table out of the lock file and check it against the render: one
   row per cell, no repeated value in the Device column, ≥ 2 registers. Then
   squint at the row at 25 % zoom (§ 3b.3). A MISSING table is itself a
   failure - the set was never designed. Go back to
   `illustration-ideation.md` § The set law before re-rendering.
4. **Compare to the references** - if the media archive exists locally
   (`references/media/<full-slug>/`, populated by `scripts/fetch-posts.sh`;
   never committed), open 2–3 frames of the references the lock file cites,
   side by side with the render. Same ground value? Same separation physics?
   Same density, or is the render busier? Same quality of line and light, or
   is the render cheaper? If the render loses the comparison, it is not done.
   Without media: compare against the measured values in the post analyses
   and say so in the QA line.
5. **Illustration set re-test** (any page carrying 2+ illustrations). Concepts
   pass the swap test on paper and drift into decoration during the build;
   this catches the drift. Screenshot the rendered art at real size, crop away
   every word of copy, then: (a) re-run the SWAP TEST on the rendered
   pictures, writing the wrong claim each would make on each sibling; (b) run
   the READ-BACK TEST on each - write the sentence the picture argues and
   compare it to the claim in its QI row; (c) overlay the set and confirm
   register parity (grid pitch and phase, module size, stroke weight, face
   values, loop length). Any failure is a rebuild, not a tweak.
5b. **First screen** (any page whose first viewport carries a field or a shelf) -
   walk § 3c: field-or-no-field, the crop contract at BOTH desktop sizes, one
   light logic, the headline budget or its exemption in full, button count,
   and the render-tier list. Then reload with JavaScript disabled and with
   `prefers-reduced-motion: reduce` emulated: the poster must carry the screen
   alone in both, and it must be a screen you would have shipped.
6. **Locks** - every visual choice names a lock; every lock is visible in the
   render.
6b. **Sameness sweep** (any page with repeated frames - multiple screens OR any
   multi-cell set) - lay the screens side by side at thumbnail size. If two read
   as the same layout in different colours, one is redundant: change its KIND,
   not its palette. Then check the chrome across the set - the persistent
   controls must land on the same pixel in every screen. Run the same sweep
   INSIDE a screen: lay the cells of every trio, bento and gallery side by side
   at thumbnail size. Two cells that read as the same drawing under different
   labels are one cell shipped twice.
7. **Polish pass** - `polish-moments.md`.
8. **Record** in the lock file:
   `QA: 1440×900 ✓ · 1280×720 ✓ · 390×844 ✓ · tells 0 · codes 0 · budgets ✓ · sets: <surface: cell=device, cell=device, … · devices unique ✓ · registers N> · refs compared: <slugs or "text only">`.
   `codes 0` means the nomenclature grep in § 1 was run against the rendered
   text and alt/aria values and came back empty. It is never assumed.

The owner's screenshot beats yours. If the owner sends one, it is the
ground-truth viewport - fix what it shows, do not explain it.

## 5. Honesty clause

If you cannot render (no browser in the environment), say so and hand off with
`QA: unrendered - owner please check at 1440×900 and 390×844`. Never write
"verified" for a screen you have not seen at full size.
