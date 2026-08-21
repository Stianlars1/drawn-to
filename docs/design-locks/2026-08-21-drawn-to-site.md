---
task: Drawn To — project landing page (GitHub Pages, docs/index.html)
product: Drawn To, an agent skill that locks design direction from a measured taste library
features: measured library · weighted interview · lock file · illustration engine · scroll-scrub · animation craft · polish moments
target: this repo, docs/
blend: FIVE locked directions cycling over one content model (see Q1)
mode: per direction (A dark · B light · C light paper · D dark · E black)
language: English
constraints: static HTML/CSS/JS, no framework, Pages-hosted; View Transitions with instant fallback
delivery: lock + build
status: locked → building
---

# Design locks — Drawn To site (interview of 2026-08-21)

Round 1 of this file was written without the interview (delegated) and is
superseded — recorded here as revision R0. Round 2 ran the skill's own flow:
Q0 brief confirmed by the owner; Q1–Q4 answered; remaining axes inherited per
family (rule 5) and listed below.

| # | Axis | Locked | Firmness | Consequence |
|---|------|--------|----------|-------------|
| R0 | (all) | revised — delegated single-direction site replaced by the owner's interview | — | history kept |
| Q0 | Job | **Convince first**: the page IS the proof — same content rendered as five locked directions, live | must-have | running order per direction may vary; content identical |
| Q1 | Directions | **A** narrow dark sharp (F1 80 + F4 15 + F8 5) → **B** wide light pastel (F6 70 + F3 30) → **C** paper & print (F5 70 + F4 30) → **D** dark atmosphere (F3 60 + F8 25 + F1 15) → **E** Vercel-home (F1-wide 85 + F8 15) | must-have | each is a full lock set, not a recolor; sequence as listed |
| Q2 | Cycle | **Auto, 5 s, always** | must-have | reduced-motion: no auto, arrow keys/click advance (accessibility is not a style choice); ?v=a&still for QA |
| Q3 | Transition | **Cross-fade with 2 px blur, 700 ms** via `document.startViewTransition`; fallback instant | must-have | fade-through family (polish-moments); no directional wipe |
| Q4 | Anchor | **Everything morphs, no switcher** | prefer | only the URL hash carries state; invisible keyboard control remains |
| AX12 | Copy voice | confident-plain marketing + witty mono captions (inherited from current copy) | prefer | identical strings in all five |

## Per-direction locks (inherited from families; recipes from `recipes.md`)

**A — narrow dark sharp** (F1/F4/F8): ground #0A0C10 · 1px rgba(255,255,255,.08) dividers, shared edges, zero shadows · radius 0 + pills · accent #5B8CFF · 1120 col with rails, blueprint grid outside · type Inter 500 / Geist Mono · hero = Centered-Stack-left + FIG plates (label/drawing/caption rows) · proof full-bleed · steps divider-cut 3×2 · constants ledger · families 4×2 cells · close Editorial Dark with one lit line.
**B — wide light pastel** (F6/F3): ground #F4F6FB → pastel horizon gradient (#E6ECFF→#FBF7FF) with 3 % grain, one asset reused hero + close · squircle radius 28/20/pill · separation = one soft hue-tinted shadow `0 24px 48px -12px rgba(50,70,130,.14)`, no borders · accent #2349DA, status green only · 1400 col · hero centered stack, stats as pill chips · steps pebble cards · proof in squircle frame · families as pastel tiles · close on the same gradient.
**C — paper & print** (F5/F4): paper #F3F2EE, white mats #FFFFFF with 1px #E3E1DB frames, radius 0 · charcoal ink #3B3B3B weight 500, mono ledger meta, slashed-zero indices · halftone band (8 px pitch, 3 px dot) clipped to one rect per screen, crop marks at the hero mat, 2 % grain · accent = one gradient slab #F27BB4→#7A4EC9 covering ≤30 % of the hero mat · hero left, meta column right · library as a print ledger sheet · proof in a mat with caption ledger · close = display-size install line.
**D — dark atmosphere** (F3/F8/F1): ground #05070A · ONE structured-light asset: prism rays + rings + dot field behind the hero, reused dimmer at the close · glass panels rgba(255,255,255,.04) + inset 0 1px 0 rgba(255,255,255,.08), no drop shadows · radius 16/12/pill · accent #35C9D6 as light only · 1232 col · hero centered with the lit command pill · steps glass cards · constants glass table · close = prism re-lit.
**E — Vercel-home** (F1 wide/F8): ground #000 · 1400 col · section margin 208 · H1 tiny left (40/500 −0.06em) + one lit object centre (ring + glow) + three mono lines right · borders as `box-shadow: 0 0 0 1px rgba(255,255,255,.1)` rings, cards #0A0A0A r12 · accent = the lit object only · 2×2 outlined bento for the four pillars with inset image panels · mono feature lists · centered 2-line close + pills.

Constants enforced in all five: C1–C12. Grain on every gradient (B, C slab, D light) — SVG feTurbulence overlay. Numbers tabular; count-up once per session, never per cycle.

## Polish pass (to run before handoff)
POLISH: applied — count-up (first view only), copy button (reserved width, text+icon swap, success colour, quiet revert), hero word-group reveal (first paint only, not per cycle), transition blur 2 px · gated — no hover lifts on dark (C3), no entrance choreography per cycle (the cross-fade IS the entrance), no ambient loops except D's rings (linear).

References: basit_designs-2017, 0xSero-2090, Triopixels-2089, adriankuleszo-2089253, basit_designs-2089995, devxnuj-2090, marcelkargul-2089371/2089404, production-formula (Vercel, Linear, Raycast measures), flohoeller-2090.
