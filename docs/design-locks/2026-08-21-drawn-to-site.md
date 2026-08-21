---
task: Drawn To - project landing page (GitHub Pages, docs/index.html)
product: Drawn To, an agent skill that locks design direction from a measured taste library
features: measured library · weighted interview · lock file · illustration engine · scroll-scrub · animation craft · polish moments
target: this repo, docs/
blend: FIVE locked directions cycling over one content model (see Q1)
mode: per direction (A dark · B light · C light paper · D dark · E black)
language: English
constraints: static HTML/CSS/JS, no framework, Pages-hosted; View Transitions with instant fallback
delivery: lock + build
status: locked → rebuilding as one screen (revision R1)
---

# Design locks - Drawn To site (interview of 2026-08-21)

Round 1 of this file was written without the interview (delegated) and is
superseded - recorded here as revision R0. Round 2 ran the skill's own flow:
Q0 brief confirmed by the owner; Q1–Q4 answered; remaining axes inherited per
family (rule 5) and listed below.

| # | Axis | Locked | Firmness | Consequence |
|---|------|--------|----------|-------------|
| R0 | (all) | revised - delegated single-direction site replaced by the owner's interview | - | history kept |
| Q0 | Job | **Convince first**: the page IS the proof - same content rendered as five locked directions, live | must-have | running order per direction may vary; content identical |
| Q1 | Directions | **A** narrow dark sharp (F1 80 + F4 15 + F8 5) → **B** wide light pastel (F6 70 + F3 30) → **C** paper & print (F5 70 + F4 30) → **D** dark atmosphere (F3 60 + F8 25 + F1 15) → **E** Vercel-home (F1-wide 85 + F8 15) | must-have | each is a full lock set, not a recolor; sequence as listed |
| Q2 | Cycle | **Auto, 5 s, always** | must-have | reduced-motion: no auto, arrow keys/click advance (accessibility is not a style choice); ?v=a&still for QA |
| Q3 | Transition | **Cross-fade with 2 px blur, 700 ms** via `document.startViewTransition`; fallback instant | must-have | fade-through family (polish-moments); no directional wipe |
| Q4 | Anchor | **Everything morphs, no switcher** | prefer | only the URL hash carries state; invisible keyboard control remains |
| AX12 | Copy voice | confident-plain marketing + witty mono captions (inherited from current copy) | prefer | identical strings in all five |

## Per-direction locks (inherited from families; recipes from `recipes.md`)

**A - narrow dark sharp** (F1/F4/F8): ground #0A0C10 · 1px rgba(255,255,255,.08) dividers, shared edges, zero shadows · radius 0 + pills · accent #5B8CFF · 1120 col with rails, blueprint grid outside · type Inter 500 / Geist Mono · hero = Centered-Stack-left + FIG plates (label/drawing/caption rows) · proof full-bleed · steps divider-cut 3×2 · constants ledger · families 4×2 cells · close Editorial Dark with one lit line.
**B - wide light pastel** (F6/F3): ground #F4F6FB → pastel horizon gradient (#E6ECFF→#FBF7FF) with 3 % grain, one asset reused hero + close · squircle radius 28/20/pill · separation = one soft hue-tinted shadow `0 24px 48px -12px rgba(50,70,130,.14)`, no borders · accent #2349DA, status green only · 1400 col · hero centered stack, stats as pill chips · steps pebble cards · proof in squircle frame · families as pastel tiles · close on the same gradient.
**C - paper & print** (F5/F4): paper #F3F2EE, white mats #FFFFFF with 1px #E3E1DB frames, radius 0 · charcoal ink #3B3B3B weight 500, mono ledger meta, slashed-zero indices · halftone band (8 px pitch, 3 px dot) clipped to one rect per screen, crop marks at the hero mat, 2 % grain · accent = one gradient slab #F27BB4→#7A4EC9 covering ≤30 % of the hero mat · hero left, meta column right · library as a print ledger sheet · proof in a mat with caption ledger · close = display-size install line.
**D - dark atmosphere** (F3/F8/F1): ground #05070A · ONE structured-light asset: prism rays + rings + dot field behind the hero, reused dimmer at the close · glass panels rgba(255,255,255,.04) + inset 0 1px 0 rgba(255,255,255,.08), no drop shadows · radius 16/12/pill · accent #35C9D6 as light only · 1232 col · hero centered with the lit command pill · steps glass cards · constants glass table · close = prism re-lit.
**E - Vercel-home** (F1 wide/F8): ground #000 · 1400 col · section margin 208 · H1 tiny left (40/500 −0.06em) + one lit object centre (ring + glow) + three mono lines right · borders as `box-shadow: 0 0 0 1px rgba(255,255,255,.1)` rings, cards #0A0A0A r12 · accent = the lit object only · 2×2 outlined bento for the four pillars with inset image panels · mono feature lists · centered 2-line close + pills.

Constants enforced in all five: C1–C12. Grain on every gradient (B, C slab, D light) - SVG feTurbulence overlay. Numbers tabular; count-up once per session, never per cycle.

## Polish pass (to run before handoff)
POLISH: applied - count-up (first view only), copy button (reserved width, text+icon swap, success colour, quiet revert), hero word-group reveal (first paint only, not per cycle), transition blur 2 px · gated - no hover lifts on dark (C3), no entrance choreography per cycle (the cross-fade IS the entrance), no ambient loops except D's rings (linear).

References: basit_designs-2017, 0xSero-2090, Triopixels-2089, adriankuleszo-2089253, basit_designs-2089995, devxnuj-2090, marcelkargul-2089371/2089404, production-formula (Vercel, Linear, Raycast measures), flohoeller-2090.

## Revision R1 - owner review of the shipped cycling page (2026-08-21, 11:00)

Owner verdict on the live build (screenshots at ~1840 px): eyebrow labels on every
screen ("oser AI slop"), 7-word H1 breaking onto three lines, paper mat (C) cut by
the fold, cramped narrow text columns (E), triangle-in-a-ring "object" (E), conic
stripes as "light" (D), too many CTAs and stats. Root cause recorded in
`references/quality-bar.md` (added because of this review). Rows below ADD to the
ledger; nothing above is erased. Where a row below conflicts with "Per-direction
locks" above, the row below wins and the older line is `revised (R1)`.

| # | Axis | Locked | Firmness | Consequence |
|---|------|--------|----------|-------------|
| Q5 | Page shape | **One screen: 100 vw × 100 svh, no scroll.** Content budget per screen: brand top-left · GitHub link top-right · H1 · one sub line · install command (copy) · ONE signature visual · a discreet mono line bottom-left naming the direction ("02 / 05 · wide light pastel" - a label, never a switcher) · three numbers as one mono line only where the direction carries it (A, C, E; not B, D). Nav links, "Read the source", "Install" button: removed. | must-have | the budgets in quality-bar.md § 2 are hard limits; fold verified at 1440×900 and 1280×720; 390×844 stacks |
| Q6 | Headline | **"Give your agent taste."** (4 words, one line in every direction; `text-wrap: balance`). Sub line: "A measured taste library and a lock-in interview for coding agents." | must-have | identical strings in all five; no eyebrow anywhere (the direction label at the bottom is the only mono caps) |
| Q7-A | Signature visual A | "The page measuring itself": one large blueprint plate - a redline of a hero section with dimension lines and real values (1120 · 28 · 0.08 · 0), hairlines, one blue accent, mono labels | must-have | replaces the FIG.01-04 plates (revised R1) |
| Q7-B | Signature visual B | Typographic poster on the pastel horizon gradient with 3 % grain + ONE soft squircle surface carrying the command; no cards, no chips, no pills | must-have | replaces stat chips + pebble cards (revised R1) |
| Q7-C | Signature visual C | The current paper composition halved: serif H1, gradient slab with finer halftone (4 px pitch), white mat that fits the fold with ≥ 48 px air; crop marks stay | must-have | mat content cut, not air (revised R1) |
| Q7-D | Signature visual D | "One light": a single slanted beam from top-right (shaped gradient: one defined edge, soft falloff) lighting the H1, a fading dust field, grain; NO rays, NO rings, NO centered blob | must-have | 100 % redesign of the D field (revised R1) |
| Q7-E | Signature visual E | One large thin ring with a single lit arc (comet), slow linear rotation (ambient register), H1 small at left, three mono lines at right; the triangle is gone | must-have | replaces triangle-in-ring (revised R1) |
| Q8 | Delivery | Build locally → visual QA loop at 1440×900 / 1280×720 / 390×844 → full-size screenshots shown to the owner → push on "ok" | must-have | QA + POLISH lines recorded below before handoff |
| AX12 | Copy punctuation | ALWAYS "-", NEVER "—" - in every string on the page | must-have | standing owner rule |

Exemplars: after QA, screenshot each direction at 1440×900 into `assets/exemplars/<a-e>-<family>.png` and link them from the skill's style-families.md as owned, CC0 exemplar plates.

## Build R1 - what shipped (2026-08-21, rebuilt through the skill)

One file, `docs/index.html`: `100svh`, `overflow:hidden`, no scroll, no sections.
Every screen carries brand · GitHub · H1 · one sub line · the copy command · one
signature visual · the direction label; three numbers in A, C, E only. Engine
kept as locked: View Transitions cross-fade 700 ms / blur 2 px, auto 5 s, hash
state, arrow keys, `?v=<a-e>&still` freeze, reduced-motion drops auto + rotation
and advances on click. H1 reveal and count-up run on the FIRST paint only (C12).

Signature visuals as built: **A** one blueprint plate that redlines this hero at
1:1 - the drawn column, headline, sub bar and command box sit on the same left
edge as the real ones, dimensioned 1120 · 28 · 44 · r 0 · 0.08 in one blue
(#5B8CFF) over 1 px hairlines; mobile shows a natural-scale detail crop.
**B** pastel horizon with a masked light rim + 3 % grain, one white squircle
(r 28, `0 24px 48px -12px rgba(50,70,130,.14)`) carrying the command; no cards,
chips or pills. **C** paper #F3F2EE, white mat with a 1 px #E3E1DB frame holding
the fold with ~78 px air, Instrument Serif H1, ledger numbers top-right, gradient
slab #F27BB4→#7A4EC9 at 28 % of the mat with a 4 px-pitch halftone on its right
half, L crop marks, grain. **D** one light: a single slanted beam from the upper
right with one defined edge and a long falloff, a turbulence dust field that
dies out along the beam, grain; no rays, no rings, no blob; the glass pill keeps
GitHub and nothing else. **E** #000, H1 40/500/-0.06em left, one large thin ring
with a single lit comet arc rotating linearly (ambient register), three mono
lines right. All five clear the illustration bar (specific · layered · shaped
light · one line · two distances · one object), so no direction ships bare.

QA: 1440×900 ✓ · 1280×720 ✓ · 390×844 ✓ · tells 0 · budgets ✓ (H1 4 words / 1 line desktop, 2 on mobile · sub 66 ch on one line · 1 command + 1 link · 3 numbers in A/C/E, 0 in B/D · 0 eyebrows · no scroll: scrollHeight = innerHeight at every size) · refs compared: basit_designs-2017, 0xSero-2090, Triopixels-2089, adriankuleszo-2089253, basit_designs-2089995, devxnuj-2090, marcelkargul-2089371, marcelkargul-2089404, flohoeller-2090, its_sslvr-2088

POLISH: applied - copy control with reserved width (6 ch, measured: box 305.8 px before and after the state change, button 25 px, zero layout shift) and three-channel success (word copy→copied, icon→check with a stroke draw, colour→#35C56A), quiet revert at 1600 ms · count-up once on first paint, tabular numerals · H1 word-group blur reveal on first paint only · cross-fade 700 ms / blur 2 px between directions · gated - no hover lifts on dark (C3), no per-cycle entrances (the cross-fade IS the entrance, C12), no ambient loop except E's ring (linear, stops under reduced-motion: verified from renders, identical pixels at t=1.2 s and t=5.2 s with the flag on, different with it off)
