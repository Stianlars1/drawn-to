---
name: drawn-to
description: >-
  A design-direction system for coding agents: a measured taste library (51
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
5. **Section variants (QS) + illustration proposals (QI)** - for each section
   in scope, offer 2-3 concrete composition variants from
   `references/recipes.md`, filtered by the locked blend; redesigns always
   include "keep structure, reskin to the locks". For feature-card work,
   then propose 2-4 creative illustration concepts PER FEATURE
   (`references/illustration-ideation.md`) and lock the picks.
6. **Lock + enforce + quality bar + polish** - record every lock as it
   happens in `docs/design-locks/YYYY-MM-DD-<task>.md` in the target project;
   implement from the lock file + dimension docs; every visual change serves a
   named lock. Then, before handoff, two passes that never get skipped:
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
5. `references/production-formula.md` - page-scale architecture measured off
   seven famous production sites (containers, air, running order, nav,
   buttons, closing CTA); feeds AX13-AX15 and full-page sanity checks.
   `references/scroll-scrub.md` - the scroll-scrubbed product-scene pattern
   (registered-property poses, three drivers, sticky-run geometry, mobile
   playbook, fallback ladder); read before building any scrubbed hero or
   chapter composite.
   `references/illustration-ideation.md` - the per-feature illustration
   engine: fit-method (verb → metaphor register → hero + evidence), device
   catalog with construction recipes, the QI proposal protocol, HTML/CSS/SVG
   build guidance; read before proposing or building feature graphics.
   `references/animation-craft.md` - implementation doctrine (Emil Kowalski /
   Apple fluid-interfaces distillation): the animate-at-all gate, tool
   ladder, property rules, curve/duration tables, spring + gesture physics,
   interruptibility, clip-path toolkit, never-ship list; read before WRITING
   any animation code. motion-grammar = taste; animation-craft = mechanics.
   `references/isometric-and-light.md` - two optional paths: isometric
   objects (blueprint line-art / soft-shaded, construction math, production
   route) and structured light (why shaped gradients read expensive, recipes
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
7. `references/matrix.md` - index of every reference (51 at last count);
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
  ghosted 15-45%; disabled dimmed ~25%, never hidden.
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
- Interview in plain language. The codes (F1-F8, AX1-15, C1-C12, QI, slugs)
  are ledger bookkeeping and never appear in a question the owner must
  answer - say what it looks like and name a site they know; number
  questions "3 of ~8", not "AX3". A question the owner cannot answer without
  the nomenclature is a defect (`question-flow.md` § Question phrasing +
  glossary).
- The same codes never reach SHIPPED OUTPUT either. The interview rule above
  protects the owner; this one protects everyone who later reads the page.
  Nothing a visitor can see or a screen reader can speak - headline, sub,
  caption, label, direction label, legend, chart or swatch key, tooltip,
  footer, alt text, aria-label, SVG text - may contain F1-F8, C1-C12, AX1-15,
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
- Persistent chrome (transport controls, toggles, progress) holds ONE position
  and ONE skin across every screen - never nested in a container whose width
  changes per direction, or it jumps on every transition.
- Look before you build: when the media archive is present locally, open the
  frames of the references the locks cite BEFORE writing the screen and AGAIN
  during visual QA (`quality-bar.md` § 4). Text analyses carry the values;
  the frames carry the density and the quality of line - the two things a
  build most often gets wrong.
- Copy punctuation: ALWAYS "-", NEVER "—" (em dash) in anything the owner
  ships - UI copy, captions, labels, README, docs. This is a standing owner
  rule and a top generated-copy tell (`quality-bar.md` § 1).
- Judge renders, never thumbnails: visual QA happens at 1440×900 and
  390×844 in a real browser; an 800-px pane screenshot is not verification.

## Visual evidence

The source media for every reference - photos and extracted video frames  - 
lives in the taste repo at
`/Users/stian/Documents/claudee/my_taste/references/media/<full-slug>/`
(deliberately not shipped inside this skill folder - the originals stay their
authors'). Any clone can rebuild it locally with `scripts/fetch-posts.sh`
from the repo root (fxtwitter fetch + ffmpeg frame extraction, per slug or in
batch); the folder is git-ignored. On a machine that has it,
open the media to verify a claim or calibrate a value before locking or
implementing; the per-post analyses in `references/posts/` are the portable
evidence, the media is ground truth. Guardrails: references are vocabulary,
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
5. References: which family docs / posts backed the choices.
6. Polish pass: numbers / state text / toggles / confirmations / loading /
   hover rows / entrances / errors - each applied or explicitly gated
   (`polish-moments.md`); no state change shifts layout.
7. Quality bar + visual QA (`quality-bar.md`): the QA line from the lock file
   (viewports rendered · tells 0 · budgets · refs compared) - a screen that
   was not rendered at full size is reported as unrendered, never verified.
8. Honest handoff state: distinguish locally verified · committed · pushed/PR ·
   deployed · independently verified live. Never report further than proven.
