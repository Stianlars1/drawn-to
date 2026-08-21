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

## Revision R2 - four more directions + a transport control (2026-08-21, owner request)

Owner on the shipped nine-screen cycle: "likte dette bedre" - R1 approved and pushed
(`aaeb541`). Then: more directions, each designed as its OWN screen through the skill,
plus a small pill control to pause the cycle and step through it by hand. Rows below ADD
to the ledger; R1 stands.

| # | Axis | Locked | Firmness | Consequence |
|---|------|--------|----------|-------------|
| Q9 | Directions | Four appended after E: **F** ink & air (F2 85 + F4 15) · **G** isometric blueprint (F4 75 + F1 25) · **H** emissive signal (F8 80 + F1 20) · **I** tactile instrument (F7 70 + F2 30). The cycle is nine, and with these the page demonstrates all eight families - the "8 families" on screen is now visibly true | must-have | the direction label reads "NN / 09"; the three numbers are carried by A, C, E, F, G and withheld from B, D, H, I |
| Q10 | Transport | An **icon-only pill** in the bottom bar, right of the numbers: previous · pause/play · next. Pause stops the auto-cycle; any manual step restarts the 5 s timer; Space toggles. Skinned per direction (glass in D, ring in E, radius-2 in C and G, machined in I) | must-have | narrows Q4 for CONTROLS only - the bottom-left label stays a label, never a switcher |
| Q10a | Transport under reduced motion | The toggle is **not rendered** - there is no auto-cycle to pause - and only the two arrows ship | must-have | accessibility is not a style choice (Q2) |
| Q7-F | Signature visual F | The page's own column scaffold exposed: 1 px #E8E8E8 rules on a 1120 grid running the full height, 48 px 45-degree hatched drafting gutters hugging the sheet, two blue registration crosses on the origin rule; no colour field at all | must-have | F2's separation is whitespace and tone, so the scaffold IS the illustration |
| Q7-G | Signature visual G | One 2:1 dimetric object: five sheets of a lock file exploded along the vertical, dashed iso guides overshooting, selection handles on the focal sheet, three gray tiers with ONE white near-edge, mono indices 01-05 and a 52 px rise dimension, on a dotted iso ground plane | must-have | F4 leads here for once; zero accent hue by design (marcelkargul-2090148 register) |
| Q7-H | Signature visual H | One light, and it is the product's own entry point: ≥95 % of the frame under 15 % luminance, headline dimmed to #C6C6CE, the install command emitting - amber bloom concentrated at the prompt, a fill hairline under it with one lit head, 40 px HUD grid at 2 % | must-have | the headline recedes and the command ignites (F8 doctrine); no loop - the poster is composed at t=0 |
| Q7-I | Signature visual I | The command built as hardware: bezel with two recessed screws, a recessed track, a machined cap with 3 px of height carrying the mono command, and a lit indicator window whose amber lens turns green on copy. Pressing it depresses 1:1 with no tween; the release eases | must-have | the copy control IS the signature object, so the screen carries exactly one |

## Revision R3 - the catalog turn (2026-08-21, owner review of the nine)

Owner on the nine: two directions loved outright (G isometric, I instrument),
one defect ("ingen padding inn til teksten" - F set its copy flush ON the
scaffold rule), one rejection ("denne var rar" - A drew a second copy of the
whole screen, nav bars and headline text included), one structural note ("det
blir litt generisk med alle sider som har helt samme innhold"), and one
irritation ("kontrollpanelet flytter seg mellom hver overgang").

The structural note is a SKILL defect, not a build defect, and it was fixed
upstream first: `recipes.md` gained **One-Screen Catalog** (ten screen kinds
with per-kind budget deltas, a content law and a device law),
`quality-bar.md` gained four tells (same content model repeated · the page
drawn twice · text flush on its own construction line · chrome that moves),
`question-flow.md` Q0 gained the **single-or-set** question so the recipe is
reachable by interview instead of sitting there as prose, and
`isometric-and-light.md` gained **§A2b The generator** - projection helper,
four arrangements, a subject-to-object table for seven subjects, a light and
dark material table, an annotation kit and failure modes - so the register
that produced G can be rebuilt for an app, a UI surface, a data flow or a
database, in either mode.

| # | Axis | Locked | Firmness | Consequence |
|---|------|--------|----------|-------------|
| Q11 | Page shape | **A catalog of twenty screens**, not one poster repeated. Each screen carries a screen KIND, a device and its own slice of the product's real material | must-have | kinds in play: poster (8) · instrument (2) · feature trio (2) · gallery (2) · ledger · metrics · frozen interaction · chapters · bento · closing. No kind-and-device pair repeats |
| Q12 | Content | **The headline is per screen, not global.** Only the brand, the direction label and the install command recur; every screen argues a different true statement (the weights, the corpus, the lock file, the constants, discovery, C2) | must-have | supersedes Q6's "identical strings in all five". Screen 01 and screen 20 both carry "Give your agent taste." - the catalog opens and closes on the anchor |
| Q13 | Transport | **Fixed to the viewport, one position, one skin.** `position:fixed`, right 24 / bottom 20, a neutral scrim pill (rgba(128,128,134,.14) + blur 16 + a .32 hairline) with #8E8E94 icons that reads on #000 and on #FAFAFA alike; rendered ONCE outside the per-screen markup so it survives the cross-fade | must-have | supersedes R2's per-direction skinning: nesting it in `.col` made it jump on every transition because the column width changes per direction (1120-1400) |
| Q7-A | Signature visual A | revised (R3): a **framed FIG. 01 figure** - wireframe bars, no live copy, its own frame and label, redlined 1120 / 28 / 44 / r 0 / 0.08 - beside the headline, never a second rendering of the screen it sits on | must-have | replaces the full-width self-portrait |
| Q7-F | Signature visual F | revised (R3): the scaffold rules align to the column's PADDING box, so the copy sits one 40 px gutter inside the first rule | must-have | flush-to-the-rule read as missing padding |

## Revision R4 - the catalog goes to thirty (2026-08-21, question round answered)

Owner answered the four open axes: all four content slices in scope · **most
life** (eight of ten carry a beat or an interaction) · **six light of ten**, so
the set ends 20 dark / 10 light · the two trios rebuilt in place, not replaced.

Also this round, from a fourteen-agent audit: the internal-code rule became a
ship gate, illustration SETS gained their own law and bar, and the four dials
the corpus actually uses were written down. Three defects the adversarial pass
found in the rebuilt trios were fixed (an invented token, a row count that did
not reconcile, and an easing curve whose control points were drawn by eye).

| # | Direction | Kind | Device | Ground | Behaviour | Slice |
|---|---|---|---|---|---|---|
| 21 | proof diptych | comparison | split frame with a travelling divider | dark | beat | same model, same brief, one variable |
| 22 | the refusals | ledger | struck-through refusal list | light | still | what it will not ship |
| 23 | two registers | metrics | dual timeline, two runners | dark | beat | ambient is linear, interaction is eased, never mixed |
| 24 | stop conditions | instrument | rotary selector with detents | light | interaction | when motion stops: off-screen, reduced motion, pointer |
| 25 | the contact sheet | gallery | dense plate grid, one scan pass | light | beat | fifty-one references with their measured values |
| 26 | the clash matrix | matrix | eight-by-eight grid, marked cells | dark | interaction | which families cannot be blended |
| 27 | a real run | frozen interaction | terminal log advancing | dark | beat | the tool in use |
| 28 | works with | marquee | horizontal conveyor, linear | light | beat | anything that reads a skill file |
| 29 | the measured page | spec sheet | redline of production values | light | still | containers, air, three type sizes |
| 30 | both modes | comparison | one skeleton split down the middle | light | interaction | materials re-derived, never inverted |

No kind-and-device pair repeats against screens 1-20. Comparison, ledger,
metrics, gallery, instrument and frozen interaction all recur with a different
device and a different slice, which the set law permits; matrix and marquee are
new kinds.

## Revision R6 - screen one becomes an instrument (2026-08-21)

Owner on the core sample: "seems a bit too easy representing this skill... i
like it, in one way, but its not enough". Correct. R5 showed what the library
CONTAINS and was finished in one glance; it had no mechanism, and a screen
whose job is to be the proof has to show the thing working.

| # | Axis | Locked | Firmness | Consequence |
|---|------|--------|----------|-------------|
| Q7-A | Signature visual, screen 1 | revised (R6): the core **reads itself.** A lit head walks down the column one lamina at a time at a constant cadence, and a readout beside it names the reference it is crossing - index, kind, mode and measured ground, with a swatch of that exact ground under it. An elbow leader keeps the head connected to the readout as it travels. Fifty-one real rows, no invented ones | must-have | the object is now a machine reading its own corpus, not an inventory of it |
| Q14 | Beat, screen 1 | revised (R6): 240 ms per lamina, so one full pass of the corpus takes 12.2 s. Discrete steps at a constant rate, which is the ambient register; under reduced motion the head holds the first lamina and the readout holds its values | must-have | verified from renders: the readout differs between t=2 s and t=5 s, and two reduced-motion renders at different times are pixel-identical |
| Q15 | Narrow viewports | The readout is withheld below 720 px, where its 10-12 px mono would fall under the legibility floor. The column, the dimension chain and the foot ledger stay | prefer | an honest degradation, not a squeeze |

Material added in the same pass: a lit top edge per stratum at the lamina's own
colour times 1.35, which is how stacked material actually reads; a contact
shadow rather than a glow; and the read head as a gradient band with a white
leading edge so it is unmistakably a head.

## Revision R5 - screen one remade (2026-08-21)

Owner on the landing screen: remake it, simple but unique and spectacular,
attention to detail, "why didn't I think of this".

| # | Axis | Locked | Firmness | Consequence |
|---|------|--------|----------|-------------|
| Q7-A | Signature visual, screen 1 | revised (R5): **a core sample.** One isometric column of fifty-one laminae; each lamina is one reference and its colour is that reference's MEASURED ground, in corpus order. The eight whose analyses describe the ground in words rather than a hex are drawn as hatched voids. Lighting contract holds - top lightest, left mid, right darkest - and a 0.75 px seam gives every stratum an edge so the near-black ones do not dissolve into the page. Dashed guides overshoot, handles on the crown, one dimension chain reading 51, three leaders naming real values, a foot ledger reading "one reference per lamina / 43 of them measured to the hex" | must-have | replaces the FIG figure (revised R5). The colour is not chosen, it is read - that is the whole idea, and it is checkable against the reference analyses |
| Q14 | Beat, screen 1 | A light band travels down the core at constant linear velocity, 9 s, clipped to the silhouette - the corpus being read. Stops under reduced motion | prefer | ambient register, closes frame-perfectly |

Built by the method in `illustration-ideation.md` § How to actually build one:
isolated in its own file, rendered at 2x and read label by label, squinted at
25 % against the other dark screens before assembly. The 2x pass caught three
defects invisible at delivered size - dark laminae dissolving into the ground,
leader labels running past the frame, and a crown that did not obey the light.

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

QA (R4, screens 21-30): 1440×900 ✓ · 1280×720 ✓ · 500×844 ✓ (the same max-width:720px rules at a wider viewport) · tells 0 · codes 0 · em dashes 0 · no screen scrolls · behaviour as locked: beat or interaction on 21, 23, 24, 25, 26, 27, 28, 30 and still on 22, 29 · grounds 6 light / 4 dark · every value on screen traced to a file: 51 references and the 22/19/5/5 mode split from the matrix, the 5 proven pairings and 3 clashes from the blend rules, the seven container widths from the production measurements, 28 lock rows from the ledger itself.

QA: 1440×900 ✓ (all twenty) · 1280×720 ✓ (all twenty) · 390×844 ✓ (the first nine, in-browser at 375) and 500×844 ✓ (the eleven catalog screens, headless - the same `max-width:720px` rules, at a wider viewport) · tells 0 · no screen scrolls at any size · kinds and devices unique · em dashes 0 · refs compared: the eleven from R1/R2 plus designbynavneet-2089, LexnLin-2024, marcelkargul-2090148 + local-marcel-isometric, mnowakdesign-2089684, recentdesign-2089, cabralorenzo-2090, insporadesign-2088123, jeetnirnejak-2089, 0xSero-2090, Triopixels-2089, yurygok-2089624, AlexandruDranga-2090, kevserctk-2090, piyushsphere-2089714

BUG (fixed): the transport was first rendered into a `const chrome` binding, which collides with Chrome's global `chrome` and threw `SyntaxError: Identifier 'chrome' has already been declared` in headless - every screen rendered blank. Caught because the QA loop renders instead of trusting the code.

POLISH: applied - copy control with reserved width (6 ch, 305.8 px before and after the state change, zero layout shift) and three-channel success; in I the channels are physical (the cap depresses 1:1, the lens turns green, a live region announces "Copied") · count-up once on first paint · H1 word-group blur reveal on first paint only · cross-fade 700 ms / blur 2 px · transport: pause/play icon swap in place, aria-pressed and aria-label swap with it, a manual step restarts the 5 s timer, Space toggles, and under reduced-motion the toggle is not rendered at all · gated - no hover lifts on dark (C3), no per-cycle entrances (C12), no ambient loop except E's ring (linear, stops under reduced-motion)

## Revision R7 - the corpus reaches 52 (2026-08-21, merge of the parallel session)

A second session grew the library to 52 references while this branch was
building the catalog. `docs/MERGE-NOTES-2026-08-21.md` names both sides as
wanted, so the merge kept both and re-derived every number on the page from the
merged matrix rather than editing the strings by hand.

**Superseded:** the R4 QA line's "51 references and the 22/19/5/5 mode split" is
now **52 references** with **23 light / 19 dark / 5 mixed / 5 both**, and **44**
grounds measured to a hex (8 described in words, drawn as voids). Family member
counts are unchanged: 14 · 10 · 15 · 9 · 5 · 6 · 8 · 8, which is 75 memberships
across 52 references because a reference may belong to two families.

Re-derived and regenerated, not retyped: the core object at 52 laminae (viewBox
`52 84 470 600`), `CORELAM`, the 44-stop background gradient built from the
measured grounds, the contact sheet at 52 tiles, and every copy string carrying
a count.

**Two regressions the merge caused, both found by rendering and both fixed:**

1. The core grew one lamina (8 px in projection) and its bottom vertex landed on
   the caption, eating the "l" of "lamina". Fixed by translating the stack group
   up 18 px rather than moving the caption - that restores the composition the
   direction was locked with and keeps the dimension line, corner ticks and
   leader in the same relationship. The leader's base y moved with it (180 →
   162) in both the static markup and the beat that redraws it.
2. Screen 3 rendered the three numbers twice - once composed inside the mat,
   once again in the bottom bar. Dropped `c` from `WITH_NUMS`; the composed
   placement inside the mat is the one the direction locked, and the bottom bar
   now carries only the direction label. `f` and `t` keep the bottom-bar
   placement, which is their only one.

QA (R7): 1440×900 ✓ - screens 1, 3, 14, 25, 27 re-rendered at full size after
the count change (the five that carry a derived number) · caption clear of the
object with 7 px of air · no duplicate strings · codes 0 · em dashes 0 · library
validates at 52 posts / 0 errors.

NOTE (open, for the owner): `references/_index.json` still holds **45** entries
and is not generated by anything in `scripts/`. It is stale against the 52-post
library. Left as found - regenerating or retiring it is a call for the owner,
not a merge-time edit.

### QA trap - screen keys collide in filenames

The catalog keys screens `a`-`t` and then `A`-`D`. macOS filesystems are
case-insensitive by default, so a QA pass that writes `shots/<key>.png` silently
overwrites: `a` and `A` are the same file, as are `b`/`B`, `c`/`C`, `d`/`D`.
This bit during the R7 pass - a batch capture of `a`, `y`, `A` produced a
screen-27 image sitting at screen 1's filename, which reads as screen 1 having
changed when it had not. Prefix the case (`lower-a.png` / `upper-A.png`) or the
run will report the wrong screen as verified. That failure is silent: nothing
errors, the image is simply of a different screen.
