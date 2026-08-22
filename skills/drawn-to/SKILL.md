---
name: drawn-to
description: >-
  A design-direction system for coding agents: a measured taste library (57
  references reverse-engineered frame by frame into 12 constants and 8 style
  families), a plain-language interview answered with weights instead of forced
  picks, and a lock file every visual decision must serve. Use BEFORE designing
  or building any landing page, hero, feature section, feature cards, bento,
  pricing, UI component, subpage, or full site - and when the user says "lock
  in a direction", "design direction", "my taste", "min stil", or asks for a new
  section that should "feel right". Also use to review whether existing UI
  matches a locked direction. Not for projects that carry their own locked
  design skill - those override this.
---

# Drawn To - a design direction system

("The owner" below = the person whose project this is - the one being
interviewed. The library ships one owner's measured taste; swap in your own
references and the flow asks about yours.)

Built 2026-08-20 from reverse-engineered references (45 X/Twitter posts at
launch, 51 and growing; frame-by-frame video analysis, measured values). Generalizes the refetch.sh Q1-Q25 lock-in
process to any project. Nothing here is generic best practice - it is this
owner's measured taste, and it beats trained-default aesthetics every time.

## Process (six steps, in order)

1. **Discover** - repo recon BEFORE any question (`references/discovery.md`):
   prior lock files, CLAUDE/AGENTS/README, `docs/**/*.md`, design tokens,
   existing pages/sections, product source signals. Build a product-truth
   brief. The owner never explains what the repo already says.
2. **Scope (Q0)** - present the brief for confirmation, then ask ONLY the
   gaps discovery couldn't answer. `references/question-flow.md` § Q0.
3. **Blend proposal** - propose 2-3 weighted blends of the 8 style families
   with reference evidence; the owner reweights. § Q1.
4. **Axis locks** - interactive questions ONLY where the blend diverges;
   multi-select + weights, one at a time, evidence-cited. § Axis question bank.
5. **Section variants (QS) + card anatomy (QC) + illustration proposals (QI)** - for each section
   in scope, offer 2-3 concrete composition variants from
   `references/recipes.md`, filtered by the locked blend; redesigns always
   include "keep structure, reskin to the locks". Then settle the CARD before the picture:
   QC filters the thirteen card anatomies in `layout-language.md` § 5 by the
   locked blend, takes weights, and confirms the six card dials (§ 5a) and the
   cell-scale rung (§ 5b) - `question-flow.md` § QC. For feature-card work,
   then run QI in TWO passes: Pass 1 proposes 3-4 whole-set DIRECTIONS (one
   method from `practitioner-methods.md` + one register + one material system,
   sketched across every feature) and locks one; Pass 2 proposes 2-4 concepts
   per feature that differ only by topology and hero object. Before writing any
   concepts
   (`references/illustration-ideation.md`): run the derivation ladder (claim
   shape → scene topology → cast → what the loop asserts), apply the SWAP TEST
   to every concept (mounted on a sibling feature it must argue the wrong
   thing - a concept that survives the swap is decoration) plus the read-back
   test (cover the copy; the picture must argue the claim sentence), lock the
   picks, and lock the set's register contract as its own row with LITERAL
   values. Once the cast is named, if the scene is a WORLD rather than a UI
   fragment - a gauntlet, a host that opens, two actors across a gap, a field -
   read `references/isometric-and-light.md` § A1a-A2g BEFORE proposing: the
   projection, grid origin, module size, face ladder, stroke rule, shadow
   recipe and transform contract are what every concept will be built against.
6. **Lock + enforce + quality bar + polish** - record every lock as it
   happens in `docs/design-locks/YYYY-MM-DD-<task>.md` in the target project;
   implement from the lock file + dimension docs; every visual change serves a
   named lock and every illustration serves a set-table row (an illustration
   with no row was never designed). Then, before handoff, two passes that
   never get skipped:
   the **quality bar + visual QA loop** (`references/quality-bar.md`: render at
   1440×900 / 1280×720 / 390×844, walk the tells and the budgets, compare
   against the cited reference frames, fix, re-render - a build that passes
   its locks can still read as generated; this pass is what catches it) and
   the **polish pass** (`references/polish-moments.md`: numbers count, state
   text swaps in place without layout shift, confirmations signal on three
   channels, loading/hover/error moments handled or explicitly gated). Then
   the output checklist below.

## Read in this order

1. `references/discovery.md` - the repo-recon protocol (runs first, always).
2. `references/style-families.md` - the 12 constants, 8 families, blend rules,
   clashes. The master document.
3. `references/question-flow.md` - the lock-in protocol and axis question bank.
4. `references/recipes.md` - named composition variants per section kind
   (hero, feature grid, bento, pricing, footer, CTA…) for the QS stage.
   Sixteen reference plates showing the RANGE of feature presentation ship
   inside the skill at `assets/features/` and need no media archive - open them
   before the QS stage; the index and the per-plate verdicts sit at the head of
   that file's § Feature section - grid/cards. Two of the sixteen are
   counter-examples and are labelled as such.
5. `references/production-formula.md` - page-scale architecture measured off
   seven famous production sites (containers, air, running order, nav,
   buttons, closing CTA); feeds AX13-AX15 and full-page sanity checks.
   `references/hero-atmosphere.md` - the FIRST screen at production scale:
   five heroes read composition-first (Antigravity, Codex, Linear, Raycast,
   Vercel), the shared formula, an optics table with real blur/bloom/dither
   values, and the Field Hero recipe. Read before building any first screen -
   the rest of this corpus is section-scale and will otherwise hand you a
   figure in a box beside a column of copy, which is the one composition none
   of the five uses. Part two adds the measured plate (all five probed live at
   1440x900), the zone grammar, the crop contract, the type-as-object
   exemption, and archetypes as weights; layout diagrams per archetype ship in
   `assets/plates/zone-*.svg` and the captures themselves in
   `assets/heroes/`.
   `references/render-tiers.md` - what actually DRAWS a field: the T0-T6 ladder
   (still, CSS, SVG, canvas 2D, raw WebGL, three/R3F, prerendered video /
   Lottie / Rive / Spline), the promotion gates, DPR and fill-rate budgets, the
   four stop conditions, the poster-first fallback ladder, per-tier recipes for
   grain, bloom, dithered falloff, particle fields, filmed grounds and light
   shafts, and the render-tier tells. Read before writing any field, object or
   background that is not a flat colour - four of the five production heroes
   ship a canvas or a video, three of them WebGL, and choosing that tier by
   instinct is how a hero ends up either cheap or janky.
   `references/scroll-scrub.md` - the scroll-scrubbed product-scene pattern
   (registered-property poses, three drivers, sticky-run geometry, mobile
   playbook, fallback ladder); read before building any scrubbed hero or
   chapter composite.
   `references/illustration-ideation.md` - the per-feature illustration
   engine: fit-method (verb → metaphor register → hero + evidence), device
   catalog with construction recipes, the QI proposal protocol, HTML/CSS/SVG
   build guidance; read before proposing or building feature graphics.
   `references/practitioner-methods.md` - HOW the strongest work in the corpus
   gets generated, reconstructed per designer into executable moves: the re-lit
   asset (one world, many lightings, every secondary effect derived from one
   source), one atom in three topologies, the instrument per feature, every card
   demonstrates itself, and the page as a technical document. Read at the QI
   stage - proposals drawn from DIFFERENT methods are genuinely different;
   proposals drawn from one method are restyles of each other.
   `references/animation-craft.md` - implementation doctrine (Emil Kowalski /
   Apple fluid-interfaces distillation): the animate-at-all gate, tool
   ladder, property rules, curve/duration tables, spring + gesture physics,
   interruptibility, clip-path toolkit, never-ship list; read before WRITING
   any animation code. motion-grammar = taste; animation-craft = mechanics.
   `references/isometric-and-light.md` - two optional paths: isometric
   objects (three registers - blueprint line-art, soft-shaded, paper-white
   heavy-contour - construction math, module architecture, interiors that
   open, payloads in transit, timing) and structured light (why shaped gradients read expensive, recipes
   for arcs, slabs, rays, rings, dot-maps, ribbons).
   `references/polish-moments.md` - WHERE the small animations live: element +
   verb → treatment (number pop-in, text-states swap, icon swap, success check,
   count-up, reveals, shimmer…), the law of the state change (no layout shift,
   no hard swap, no silent success), motion tokens, the polish pass. Read
   before handing off any interactive surface.
   `references/quality-bar.md` - the tells (signatures of generated UI:
   eyebrow spray, over-long headlines, unplanned breaks, fold overflow, blob
   light, glyph-in-a-ring objects), per-screen budgets (headline ≤ 6 words /
   2 lines, ≤ 2 CTAs, 0 or 3 stats, 0–1 eyebrow, 45–75 ch measure, fold at
   1440×900 + 1280×720), the illustration bar (specific · layered · shaped
   light · one line · two distances · one object - else none), and the
   mandatory visual QA loop. Read before building and again before handoff.
   `references/animation-recipes.md` - ready-to-build implementations
   (button press, popover, tooltip, modal, drawer, toast, accordion, stagger,
   hold-to-confirm, tab clip-indicator, scroll reveal, drag-to-dismiss, blur
   mask, WAAPI); start from the recipe, never from a blank file.
6. Dimension docs as needed during locking and implementation:
   `references/layout-language.md` (grids, separation, radius, air),
   `references/motion-grammar.md` (registers, easing table, loops, cursor
   choreography), `references/graphic-language.md` (UI-fragments, line-art,
   texture, shaders, mock craft), `references/color-type.md` (palettes,
   chroma quarantine, dual-mode, typography).
   `references/gradient-fields.md` - light as a buildable device at CARD scale as
   well as page scale: the two-function authoring doctrine (one luminance
   function + one chroma function, never a stop list), the four archetypes, the
   four source tests (trough · off-axis · saturation arc · hue gate), sixteen
   measured kinds with construction primitives, and the grain and banding rules.
   Read whenever any surface is about to carry a gradient - C9 bans the naive
   two-stop ramp and this is what replaces it.
   `references/measuring.md` - how to read a value off a capture without
   inventing it: the provenance tiers (A/B/C/D), the six procedural errors that
   produced about thirty wrong numbers in one verification pass, and the
   read-back to run before a value ships.
7. `references/matrix.md` - index of every reference (57 at last count);
   `references/posts/<slug>.md` - per-reference deep dives (look up on demand
   when a lock cites one). Slug convention: citations use author + the first 4
   digits of the post id (7 digits where an author's ids collide, e.g.
   yurygok-2089624 vs yurygok-2089981); filenames carry the full id - locate by
   prefix match (`posts/basit_designs-2017*.md`).

## The constants (enforced always, asked never)

- **C1** Quarantine chroma: neutral shell, ≤1 accent hue in the UI layer;
  remaining color lives in one signature asset, semantic states, or photos.
- **C2** Show the feature: working product fragments / mechanisms / frozen
  interactions - never icon + paragraph cards.
- **C3** Separation ladder: hairlines, tone steps, or one soft shadow. Zero
  drop shadows on dark. Never mid-contrast (#333/#ccc-class) borders.
- **C4** Hierarchy by size + gray value at weight 400-600; bold is the last
  resort. Two-tone headlines; 3-4 step gray ramps.
- **C5** Two voices: grotesque prose + mono data voice. All numerals mono/
  tabular; microcaps 11-13px @ +0.06-0.1em.
- **C6** Two motion registers, never mixed: ambient = linear constant velocity;
  interaction = 150-800ms eased. Never ease an infinite loop.
- **C7** Loops close frame-perfectly; concurrent loops on desynced,
  non-commensurate periods.
- **C8** Radii in stepped 3-tier families, nested concentrically
  (outer = inner + padding). Radius 0 is a family, not a violation.
- **C9** Texture every large gradient: 2-6% grain or a print/pixel process.
  A flat un-grained CSS gradient is the loudest generic-AI tell.
- **C10** Diegetic realistic microcopy: zero lorem, versioned filenames,
  arithmetic that reconciles, one fictional client brand threaded through.
- **C11** Opacity is the attention system: one full-contrast focal; siblings
  ghosted 15-45%; disabled dimmed ~25%, never hidden. Scope: this governs UI
  layers and outline illustration. Inside a solid-face isometric drawing the
  rule inverts - depth is occlusion, and a faded far solid is a tell
  (`isometric-and-light.md` § A1a, A2b).
- **C12** Ambient background ⇒ page composed at t=0. Entrances only as
  word-group blur reveals (blur(12px)→0, 400-500ms, 100-150ms stagger).

## Working rules

- User's explicit instructions override everything here; this skill fills the
  remaining freedom.
- Existing design systems: PRIMITIVES (token scales, motion contract, theming)
  are infrastructure - adopt and map the locked direction onto them; never
  produce a different look beside a serious system, never introduce parallel
  literals; add only missing tokens, section-scoped and listed in the lock
  file. The DESIGN-STATE layer (current look, palette mood, sections) is
  evidence, not authority: adopt only after the owner chooses build-on / keep
  parts / scratch in Q0 (`discovery.md` § Trust model + mapping protocol).
  Owner-authored systems are infrastructure by definition.
- Interview in plain language. The codes (F1-F8, AX1-17, C1-C12, QI, slugs)
  are ledger bookkeeping and never appear in a question the owner must
  answer - say what it looks like and name a site they know; number
  questions "3 of ~8", not "AX3". A question the owner cannot answer without
  the nomenclature is a defect (`question-flow.md` § Question phrasing +
  glossary).
- The same codes never reach SHIPPED OUTPUT either. The interview rule above
  protects the owner; this one protects everyone who later reads the page.
  Nothing a visitor can see or a screen reader can speak - headline, sub,
  caption, label, direction label, legend, chart or swatch key, tooltip,
  footer, alt text, aria-label, SVG text - may contain F1-F8, C1-C12, AX1-17,
  Q numbers or reference slugs. When a lock row becomes copy, translate it
  through `question-flow.md` § Plain-language glossary first: the lock says
  "C2", the screen says "zero icon-and-paragraph cards"; the lock says
  "F2 85 + F4 15", the screen says "ink & air". Codes belong in the lock
  file, in source comments and in internal docs, nowhere else. A code in
  user-visible copy is a ship blocker of the same severity as an em dash
  (`quality-bar.md` § 1) and is checked by the `codes 0` grep in the QA loop.
- Never force a single choice on a style question - weighted multi-select is
  the contract (the "I liked all 3" rule).
- Never guess an unanswered lock; ask, or mark `(delegated)` if told to decide.
- Warn before mixing clashing families (style-families.md § Blend behavior);
  offer the scale-split resolution.
- Product truth: feature fragments must depict what the product actually does;
  invent presentation, never capability.
- The content model is a ceiling, not a floor: an airy direction renders fewer
  words of the same message; cut copy before shrinking type or narrowing the
  measure. Ask the owner only when a cut removes a message.
- Multi-screen pages are CATALOGS, not one design repeated: each screen takes a
  different screen kind and a different device, and renders a different slice of
  the product's real material (`recipes.md` § One-Screen Catalog). Repeating the
  same headline + sub + CTA on every screen is the fastest way to make a set of
  genuinely distinct directions read as generic (`quality-bar.md` § 1).
- First screens are decided by ONE question before anything is drawn: does the
  field own the page, or is there no field? Three of the five production heroes
  run a field edge to edge with the type set directly on it; two run no field
  at all. There is no third answer, and a container with its own background is
  a defect - an opaque column is what silently prevents every full-bleed field
  (`hero-atmosphere.md`). Section-scale instincts do not transfer here.
- Two or more illustrations on one screen or in one section are a SET, and a
  set may not use a device twice. Before writing markup, run the fit-method per
  cell and write the set table (cell · verb · register · device · hero object)
  into the lock file; a repeated value in the device column is a build stop,
  not a taste note (`illustration-ideation.md` § The set law,
  `quality-bar.md` § 3b). The fit-method is a BUILD step: it runs whether or
  not the QI proposal stage ran - delegation removes the questions, never the
  method.
- Persistent chrome (transport controls, toggles, progress) holds ONE position
  and ONE skin across every screen - never nested in a container whose width
  changes per direction, or it jumps on every transition.
- The reference plates in `assets/features/` are the one piece of visual
  evidence that ships WITH the skill; the media archive is optional, the plates
  are not. Open them at the QS and QC stages. Two of the sixteen are
  counter-examples - `photographic-ground-trio.jpg` reuses one photograph across
  two siblings and `gradient-sheet.jpg` carries two tiles that fail the tells.
  Copy the METHOD, never the instance.
- Every value you write into a doc carries a provenance tier and was measured by
  the protocol in `references/measuring.md`. Solve the capture scale before
  quoting px, gate hue at chroma >= 12, never audit grain or banding from a
  JPEG, and write "not measurable from these frames" rather than a plausible
  number. A fabricated value is worse than a missing one: nothing downstream
  questions it.
- Look before you build: when the media archive is present locally, open the
  frames of the references the locks cite BEFORE writing the screen and AGAIN
  during visual QA (`quality-bar.md` § 4). Text analyses carry the values;
  the frames carry the density and the quality of line - the two things a
  build most often gets wrong.
- Render tier is a decision, not a habit: take the LOWEST tier that holds
  (`render-tiers.md` § 1), write it and its gate into the lock file's `RENDER:`
  line, author the poster BEFORE the live version, and wire all four stop
  conditions. A 3D engine loaded for a flat field, an uncapped DPR on a soft
  field, or a canvas with no poster are ship blockers, not preferences.
- The zone plates in `assets/plates/` are GEOMETRY, never style. They show where
  the parts sit, what crosses the fold and where the light comes from, drawn as
  grey bars and dashed boxes on purpose. A build that resembles a plate has
  failed. The look comes from the locked blend and the family docs; the captures
  in `assets/heroes/` show the standard, under the terms in their NOTICE
  (study the pattern, never reproduce the page).
- Copy punctuation: ALWAYS "-", NEVER "—" (em dash) in anything the owner
  ships - UI copy, captions, labels, README, docs. This is a standing owner
  rule and a top generated-copy tell (`quality-bar.md` § 1).
- Judge renders, never thumbnails: visual QA happens at 1440×900 and
  390×844 in a real browser; an 800-px pane screenshot is not verification.

## Visual evidence

The source media for every reference - photos and extracted video frames -
ships WITH this skill at `references/media/<full-slug>/`, one directory per
reference, named to match its post file in `references/posts/`. Paths in this
skill are relative to the skill folder, so the archive travels wherever the
skill is installed and there is nothing to set up.

What is here and what is not: the extracted FRAMES and the still captures are
included; the source videos they were extracted from are not (they are large
and redundant - `scripts/fetch-posts.sh` in the taste repo re-fetches them from
the fxtwitter API on demand). Frames are archived at reduced resolution, enough
to read density, line quality and light shape, not enough to reproduce anyone's
artwork.

Open the media to verify a claim or calibrate a value before locking or
implementing, and again during visual QA; the per-post analyses in
`references/posts/` carry the measured values, the media is ground truth for
the two things a build most often gets wrong - density and the quality of
line. Guardrails: references are vocabulary,
not templates - adapt patterns and values, never clone a reference's
composition or brand into a project; a lock cites the pattern, never "make it
look like this image". Without media access the skill is fully functional on
the text analyses.

## Output checklist (include in the response for design-sensitive work)

1. Lock file path + which locks this work serves (or: question flow run first).
2. Constants check: chroma quarantine · no icon+blurb · separation ladder ·
   grain on gradients · mono data voice · diegetic microcopy · zero internal
   codes in visible copy, captions, labels or alt text.
3. Modes: which are required, both verified if dual (materials re-derived,
   never inverted).
4. Motion: register split (ambient linear / interaction eased), loop closure,
   reduced-motion fallback, stop conditions.
   Ghost tiers: verify every dimmed/evidence layer on a real display AND
   zoomed out - 15-30% layers on near-black sit at the visibility threshold
   and die in screenshots/JPEG; hover overlays need the layer beneath dropped
   to ≤5% or occluded, never two mid-luminance layers overprinting.
4b. Field / first screen (any page with a hero): the `RENDER:` line (tier ·
   what draws it · DPR cap · poster path · stop conditions · the gate) and the
   `FOLD:` line (what crosses the fold, top edge, message intact at both
   desktop sizes). A field shipped without a poster, or a hero whose message is
   cut by the fold, is reported as unfinished.
4c. Fields and cells (any page with a gradient or a card grid): the `FIELD:`
   line (kind G1-G16 · source position in percentages · the luminance function ·
   the chroma function · grain % · banding budget) and the `CELLS:` line
   (anatomy · ladder rung · layers kept · which dials siblings vary on). A
   gradient with a light vertex within 3 points of centre, or a small cell built
   by scaling a large one down, is reported as unfinished.
5. References: which family docs / posts backed the choices.
   Illustration sets: the Pass-1 direction (method + register + material
   system) and, per feature, each QI row's topology + what its loop asserts + its
   poster frame + its swap-test and read-back results; the concept divergence
   table with no repeated Topology and no repeated Device; one register contract
   for the whole set, written as literal values, with the built set verified
   for parity (grid, module, stroke, face values, loop length).
6. Polish pass: numbers / state text / toggles / confirmations / loading /
   hover rows / entrances / errors - each applied or explicitly gated
   (`polish-moments.md`); no state change shifts layout.
7. Quality bar + visual QA (`quality-bar.md`): the QA line from the lock file
   (viewports rendered · tells 0 · codes 0 · budgets · set table per multi-cell
   surface with devices unique · refs compared) - a screen that
   was not rendered at full size is reported as unrendered, never verified.
8. Honest handoff state: distinguish locally verified · committed · pushed/PR ·
   deployed · independently verified live. Never report further than proven.
