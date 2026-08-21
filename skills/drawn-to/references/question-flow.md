# Question flow — the lock-in protocol

Turns a task brief into a locked design direction through interactive, weighted
questions, then into a per-project lock file that implementation must serve.
Modeled on the refetch.sh Q1-Q25 process; generalized to the whole taste library.

## Protocol rules

1. **Q0 is one batched fact-gathering exchange**; its answers persist in the
   lock file's frontmatter, not as Q-rows. Style questions then run **one at a
   time**, numbered Q1, Q2, … Each answer locks before the next question, and
   the lock is recorded in the lock file immediately — never batched. Ask
   questions in the owner's language (mirror the brief); the docs and lock
   file stay English.
2. **Every style question is multi-select with weights.** The owner often likes
   several options at once; forcing a single choice is the failure mode this
   skill exists to fix. Always allow answers like "70% A + 20% B + 10% C", and
   say so in the question. A single pick is just a 100% weight.
   *Exclusive axes:* some axes are physically exclusive per surface (AX2
   separation: "pick ONE per surface"). There, weights mean a **scale or
   surface split** (e.g. 70% = page cards, 30% = one special section), never a
   mix on one surface — say this in the question when the axis is exclusive.
   *Weights that don't sum to 100 are queried, never silently normalized.*
   Every lock also records **firmness**: `must-have` / `prefer` / `open` —
   so later trade-offs know which locks may flex and which never do.
3. **Options cite evidence.** Each option names 1-2 reference slugs (see slug
   convention in SKILL.md) and, where apt, a famous site, plus one line of
   concrete values (hex/px/ms) — never adjectives alone.
4. **Never ask about the constants** (C1-C12 in SKILL.md). They are enforced
   silently in every direction.
5. **Inheritance — ask only where the blend leaves a fork.** For each axis:
   look up each blended family's value in the dimension docs and weight it by
   the blend percentage. Inherit without asking only if BOTH hold:
   (a) one value carries ≥70% of total blend weight, and
   (b) the dominant family resolves the axis to a single value/sub-mode.
   If the dominant family itself forks (e.g. F1 radius: sharp-0 shared-border
   vs soft cards 12-24), ask. Record inherited axes in the lock file under
   "Inherited from blend". Blend mechanics also pre-assign: secondary family →
   texture + graphic device source, tertiary → one ornament layer; treat those
   as inherited when only one legal option remains, otherwise ask.
   Target 5-9 questions for a single section, 9-14 for a full page or site
   (QS section-variant questions included in the budget).
6. **Warn on clashes and mode conflicts.** If a requested blend pairs clashing
   families (`style-families.md` § Blend behavior lists all four), state the
   clash reason and offer resolutions — the generic rule plus any pair-specific
   ones:
   *Generic:* the dominant family keeps the page; the clashing family gets
   either (a) ONE contained surface where it applies its own physics internally
   (e.g. a surface-inverted dark finale card — adriankuleszo-2089887,
   kevserctk-2090 Pro tier), or (b) demotion to a ≤10% non-physics garnish
   (type/meta/one ornament only), or (c) substitution by its same-register
   counterpart in the required mode (F1 Editorial Monochrome ⇄ F2 Ink & Air are
   dark/light counterparts).
   *Pair-specific:* Tactile Instruments resolves by scale (component inside any
   host); Blueprint Sheet demotes to ≤10% garnish; two Staged Atmosphere assets
   → one asset reused at multiple scales; Paper & Print × Emissive Signal →
   pick one material metaphor.
   *Mode conflicts:* also warn when a requested family's ground band
   contradicts the locked mode (F1 and F8 are dark-ground systems; F5/F6 light)
   — offer the counterpart or the contained-surface resolution.
   *Bookkeeping:* a rejected blend consumes no Q number and is not logged; the
   re-answer revises the same question.
7. **Never guess, never substitute your own preference.** An unanswered
   question is an open question. If the owner says "just decide", pick the
   dominant family's value and mark the lock `(delegated)`.
8. **Sibling locks may seed proposals.** If the brief says "like <project X>"
   and X has a known lock (e.g. refetch.sh = 80% F1 + 15% F3 + 5% F4), present
   X's blend as candidate A, labeled as such — still ask, never auto-apply.

## Question phrasing — the owner must never need the nomenclature

The internal codes (F1-F8, AX1-15, C1-C12, QI, reference slugs) are
BOOKKEEPING, not interview language. Rules:

- **Ask in plain words.** Lead every question and option with what it looks
  like, in one sentence a non-designer understands: "Skarpe hjørner og tynne
  lysende skillelinjer — som Linear" — not "AX2 separasjonsfysikk, eksklusiv
  per flate". Codes and slugs may follow in parentheses for the ledger; they
  are never required to answer.
- **Famous anchors beat slugs in options.** "som Linear / som Raycast / som
  Stripe light" communicates; `basit_designs-2017` belongs in the lock file.
- **One decision per question, max 2 lines per option.** If an option needs
  a paragraph, it is two questions or a preview.
- **Show, don't describe, when the host allows**: for material/color/layout
  choices, render a small side-by-side preview (HTML file opened in the
  browser, or the question tool's preview field) — text is for scope,
  trade-offs and facts. A blend question answered blind is a phrasing
  failure.
- **Conflicts from multi-picks are resolved, not re-asked.** When the owner
  picks more than a slot can hold (three concepts, two blends), apply the
  constants (C11: one focus) to propose ONE concrete resolution and ask for
  a yes/adjust — never open a fresh abstract question about the conflict.
- **Offer "anbefalt" batching on QI**: after the first 1-2 features, offer
  "vil du velge per feature, eller ta mine anbefalinger for resten og
  justere etterpå?" — five consecutive concept menus is fatigue, not rigor.

## Plain-language glossary — what the owner hears instead of the code

Use the LEFT column in the lock file, the RIGHT column in questions. Never
show the owner "AX3" or "F4"; show "Spørsmål 3 av ~8" and the plain phrase.
Mirror the owner's language.

| Code | Say instead (plain) | Anchor the owner knows |
|---|---|---|
| F1 Editorial Monochrome | dark, near-black, thin light dividers, type does the work | Linear, Vercel, Prime Intellect |
| F2 Ink & Air | light, airy, charcoal text, lots of white space, one accent | Stripe, Vercel light |
| F3 Staged Atmosphere | one atmospheric image/gradient carries the mood, UI stays gray | Raycast, Reflect |
| F4 Blueprint Sheet | technical-drawing look: grid, FIG labels, measurement lines | Prime Intellect, interfaces.dev |
| F5 Paper & Print | print feel: halftone, crop marks, paper grain, white mats | high-end brand boards |
| F6 Soft Pastel Stage | pastel fields, very round corners, soft shadows, friendly | Amie, Luma |
| F7 Tactile Instruments | components as hardware: dials, wheels, switches you can drag | Rauno/Emil demos |
| F8 Emissive Signal | near-dark with small glowing lit elements, light as the accent | Linear release films |
| Q1 Blend | "Which of these directions are you drawn to — and how much of each?" | — |
| AX1 Ground & mode | "Dark or light page — and which black/white exactly?" | — |
| AX2 Separation | "How do surfaces separate: thin lines, tone steps, or one soft shadow?" | Linear lines vs Stripe shadow |
| AX3 Radius | "Sharp corners, slightly rounded, or pebble-round?" | Prime Intellect vs Linear vs Amie |
| AX4 Accent | "The one accent color — which, and where is it allowed?" | — |
| AX5 Texture | "Any texture: grain, halftone, blueprint grid — or flat?" | — |
| AX6 Graphic device | "How do we picture each feature: real UI pieces, diagrams, line-art, light?" | — |
| AX7 Motion budget | "How much motion: none, hover only, entrances, full scenes, scroll-driven?" | — |
| AX8 Type voices | "Display type: clean grotesque, a serif moment, or playful bold?" | — |
| AX9 Meta layer | "Number the pieces (FIG.01, 1.0) or keep it clean?" | — |
| AX10 Atmosphere asset | "If there is one big visual — gradient, photo, shader, light — which one?" | — |
| AX11 Card anatomy | "How much of each card is picture vs text, and where does text sit?" | — |
| AX12 Copy voice | "Tone of the words: sober, confident-plain, witty, warm?" | — |
| AX13 Page architecture | "Page width, air between sections, and the order of sections" | — |
| AX14 Nav | "Top bar: plain on the page, floating rounded bar, or bar with a rule?" | Linear vs Raycast vs Vite |
| AX15 Buttons | "Buttons: pills, squarish, or light-with-ring?" | Linear vs Vercel vs Raycast |
| QS | "For this section, which composition?" (2-3 named variants) | — |
| QI | "For this feature, which illustration idea?" (2-4 concepts) | — |
| Qf | "Build in phases with check-ins, or straight through?" | — |
| C1-C12 | never mentioned — enforced silently | — |

## Q0 — Scope (facts, not style; discovery runs first)

Before Q0, run the repo recon in `discovery.md` and build the product-truth
brief. Q0 is then one batched exchange: open by presenting the brief in 5-8
lines ("Dette fant jeg — stemmer det?"), take corrections as free facts, and
ask ONLY what discovery couldn't answer of the following:

- **What is being built**: hero / full landing page / feature section (cards,
  bento) / pricing / component / full site / subpage / brand board — and, for
  feature work, the format (grid/bento vs alternating rows) and item count;
  for a full page/site, the section inventory (sets the question budget).
- **Product truth**: product + audience one-liner, AND the real feature list
  (4-6 items, priority order) plus the data domain (what a record/file/request
  actually looks like). C2/C10 need this — fragments depict real capability
  with plausible data; presentation is invented, capability never.
- **Target project path**: where the lock file and code live
  (`<target>/docs/design-locks/`).
- **Existing design system**: primitives (color/spacing/radius/type/motion
  tokens) are ADOPTED by default — state "I build the direction on these" and
  map families onto them (`discovery.md` § mapping protocol); owner-authored
  systems always. Ask only about the design-state layer: build on the current
  look / keep named parts / start from scratch — the skill may have been
  invoked because the current look is the problem (`discovery.md` § Trust
  model). "Scratch" never silently discards primitives; if the owner wants
  new tokens too, they say so.
- **Mode requirement**: dark / light / both. (Both ⇒ dual-theme rules from
  `color-type.md`: re-derive materials per mode, never invert.)
- **Copy language**: site copy language (C10 diegetic microcopy and the
  fictional client brand are content decisions — a Norwegian product needs a
  plausible Norwegian client, not translated chrome).
- **Constraints only, not style**: performance budget, reduced-motion
  requirements, target framework (ask; assume Next.js only if unstated).
  Stylistic motion appetite is NOT collected here — that is AX7.
- **Delivery depth**: exploration only (locks, no build) · design spec ·
  full implementation · implementation + visual QA pass. Determines where
  the flow stops.

## Q1 — Blend proposal

From Q0, propose 2-3 candidate blends. Format each option as:

```
A. 70% F1 Editorial Monochrome + 20% F3 Staged Atmosphere + 10% F4 Blueprint
   → divider-cut dark bento, one smoke/chrome asset, mono FIG meta
   (basit_designs-2017 + refetch.sh recipe)
```

Rules for proposing:
- Dominant family owns ground, separation system, radius family. Secondary
  (≤30%) contributes texture + graphic device. Tertiary (≤10%) is one ornament
  layer only.
- Prefer proven pairings: F1+F4 (dark technical), F2+F3 (light SaaS default),
  F1+F3 (refetch blend), F6+F5 (warm print), F6+F2 (warm HR/consumer —
  adriankuleszo-2089253 belongs to both), F7 inside any host, F8 garnish on F1.
- A secondary F2 contributes ink, caption discipline, hairlines, and type —
  not texture (the "secondary contributes texture" mechanic fits F3/F5-class
  secondaries).
- The owner reweights freely; lock the final percentages.

## Axis question bank

Ask only the divergent ones (rule 5). Each axis lists its options with source
values — pull full detail from the dimension docs before writing the question.
Conditional axes fire when the named family is **present in the blend at any
weight** — a 10% F3 asset still needs its AX10 lock; sub-threshold
contributions are never designed unlocked. At very low weights (≤10%) the
question may collapse to confirming the anchor reference's values.

**AX1 — Ground & mode** (`color-type.md`)
Dark editorial #080808-#101013 · dark object-stage #1f1f1f-#232323 · light warm
#F7F6F2-ish · light pure #fff/#FAFAFA · tinted wash (#dbf3ff-class) · both.

**AX2 — Separation physics** (`layout-language.md`) — exclusive per surface
(rule 2): 1px alpha dividers (dark, rgba(255,255,255,.06-.12)) ·
lightness-steps 2-6% borderless · light hairlines #ececf0-class · borderless +
one soft shadow (alpha ≤.14, blur ≥3× offset, hue-tinted) · thick sticker
outline (playful lane).

**AX3 — Radius family** (`layout-language.md`)
Sharp 0 (radius only on buttons 6-8px) · small 2-8 · medium 10-16 (corpus
default) · large 20-28 · squircle 13-15% of width · always as a 3-tier nested
system (outer = inner + padding). Note: F1 forks between sharp-0 and soft-card
sub-modes — always asked when F1 dominates.

**AX4 — Accent** (`color-type.md`)
One hue for all interactive/active/measured elements. Corpus bands: product
blue #2F5BE7-#3B82F6 · signal orange/amber #ed6917-#F5A11E · zero-accent
(luminance only) · owner-supplied brand hue. Semantic green/red/amber allowed
on top; never a second decorative hue.

**AX5 — Texture layer** (`graphic-language.md`)
Grain 2-6% on gradients (mandatory when gradients exist, C9) · halftone 8px
pitch · pixel-mosaic 8-10px cells · blueprint grid 40-80px at 4-8% contrast,
confined · dither strips · none (flat editorial). Often pre-assigned by blend
mechanics (secondary family) — ask only if >1 legal option remains.

**AX6 — Graphic device for features** (`graphic-language.md`)
UI fragments w/ real data (corpus default) · skeleton fragments (3-5 selling
data points live, rest gray) · line-art mechanism / isometric exploded ·
diegetic product chrome (handles, cursors) · shader/atmosphere asset · processed
photography. Combinable with weights. Usually asked — most families admit
several devices.

**AX7 — Motion budget** (`motion-grammar.md`)
Static + frozen interactions · micro (hover state-changes only, 200-450ms) ·
sequence (entrances + one ambient layer) · full choreography (semantic loops on
desynced periods, cursor tours, camera moves) · scroll-scrubbed product scene
(the flow told by the visitor's scroll — pinned stage or per-composite
mini-beats; implementation recipe in `scroll-scrub.md`; max ONE long pinned
run per page). Always split ambient (linear) vs interaction (eased) per C6;
loops close frame-perfectly per C7. Q0 constraints (perf, reduced-motion) cap
this axis; they do not answer it. Whatever level locks, implementation follows
`animation-craft.md` (gate, curves, springs, interruptibility, never-ship).

**AX8 — Type voices** (`color-type.md`)
Display grotesque 400-500 @ −1..−3% tracking (default) · display serif moment
(earned exception, 5/45) · playful 700+ (kail-lane only). The corpus measures
metrics, not typefaces — do NOT invent a font question. Faces come from
project tokens; if greenfield, default to a grotesque meeting the metrics
(Inter, Geist, Instrument Sans class) + a mono for the data voice (Geist Mono,
JetBrains Mono, Berkeley Mono class — convention, not corpus-measured) and note
the choice `(delegated)` unless the owner raises fonts.

**AX9 — Meta/numbering layer** (only if F1, F4, or F5 is in the blend)
FIG.n plates · 1.0/1.1 spec indices · 01/03 slashed-zero chips · none.
Numbering must encode a real sequence, never decoration.

**AX10 — Atmosphere asset** (only if F3 is in the blend)
Which SINGLE asset: generated mesh gradient (shadergradient.co, 3 stops,
grain on) · processed photo (blur 40-80px + pixel-mosaic/halftone) · shader
field / WebGL · painting matte (80-140px frame only) · structured light
(shaped falloff + line-work + rings/rays from one source —
`isometric-and-light.md` §B) · isometric scene (line-art or soft-shaded —
`isometric-and-light.md` §A). Where it recurs (2-3
scales minimum), and where its dark mass parks relative to text.

**AX11 — Card anatomy** (only for cards/bento tasks; `layout-language.md`)
Visual-area ratio 55-80% (mode 65-70) · caption inside vs demoted outside ·
split 50/50 w/ dead-air · edge-bled content w/ fade masks · uniform vs bento
mixed spans · per-card accent vs shared accent.

**AX12 — Copy voice** (C10 companion; always relevant for pages, skip for
pure components)
Tone: sober-technical (yurygok-2089624 telemetry) · confident-plain (Linear
register) · witty mono captions ("CLICK TO WORRY AGAIN", mickces-2088) ·
warm-friendly (F6 lane). Plus: the fictional client brand's name (one, threaded
through the whole section — adriankuleszo-2089887 "Identiq"), and the copy
language from Q0. Numbers must reconcile; filenames versioned.

**AX13 — Page architecture** (full pages/sites only; `production-formula.md`)
Container 1200-1400px · section air 96-128px padding or 208px margins ·
running order from the production skeleton (hero → proof/logos → 2-4 feature
chapters → how-it-works → social proof → centered CTA → footer, 6-9 sections
total) — lock the actual order and count · proof placement (under the hero
frame / own section / both — refetch locked both).

**AX14 — Nav bar** (full pages/sites; `production-formula.md`)
Transparent bar on the page bg (Linear/Vercel/Resend) · floating rounded bar
inside the container: 1px alpha border, radius ~16, blur, inset top highlight
(Raycast; the refetch lock) · bar with a bottom rule (Vite).

**AX15 — Buttons** (`production-formula.md`)
Pills 32/44px, light-grey fill + inset 1px ring, 13-16px/500 (Linear; the
refetch lock) · squarish r6-8, 32/40px (Vercel) · 36px r8 light fill + 2px
dark ring + white glow (Raycast) · pill-for-marketing vs r8-for-component
split rides AX3/C8.

**Qf — Delivery phasing** (process, asked last, full pages/sites only)
Phased build with a live checkpoint after each phase (the refetch Q19 choice —
owner's standing preference) · straight through, review at the end.

## QS — Section variants (after axis locks, before implementation)

The axes lock the STYLE; QS locks the COMPOSITION. For each section in scope
(from Q0's section inventory), in page order:

- Filter `recipes.md` by the locked blend (each recipe lists its native
  families) and the locked axes; present 2-3 genuinely different variants as
  one weighted question (QS1, QS2, …), each with its anatomy line, values, and
  evidence slugs.
- REDESIGNS: always include "keep current structure, reskin to the locks" as
  an option, and name the existing section concretely ("dagens hero:
  <one-line read from discovery>").
- Weights across variants mean the usual: a split is legal when it maps to
  distinct surfaces/sub-sections; otherwise the top weight wins and the
  runner-up's named ingredient may be grafted (say which).
- QS locks are recorded like Q locks, in the same table, numbered QS1, QS2, …

## QI — Per-feature illustration proposals (feature-card/bento tasks)

After the section variant locks: for EACH real feature from Q0, propose 2-4
creative illustration concepts per the protocol in `illustration-ideation.md`
(fit-method: verb → metaphor register → hero object + evidence chips; concepts
must span ≥2 registers; each names its motion opportunity and build cost).
Weighted picks as always; grafting a runner-up's ingredient is legal. Locks
recorded as QI1, QI2, … one row per feature. The whole set shares one
material system — lock that first if the blend leaves it open.

## The lock file

Write to `docs/design-locks/YYYY-MM-DD-<task>.md` in the TARGET project (path
from Q0; create the dir). If no target project exists yet, write it in the
current directory and say so — move it when the project is scaffolded. Create
it when Q1 locks; update after every single lock — never batch at the end.
Q0 facts live in the frontmatter. In an explicitly stated dry-run/simulation,
show the file content instead of writing it.

```markdown
---
task: <what is being built>
product: <one-liner>
features: <the real feature list from Q0>
target: <project path>
blend: 70% F1 + 20% F3 + 10% F4
mode: dark
language: <site copy language>
constraints: <perf / reduced-motion / framework>
status: locking | locked | shipped
---

# Design locks — <task>

| # | Axis | Locked | Consequences |
|---|------|--------|--------------|
| Q1 | Blend | 70/20/10 F1/F3/F4 | ground #0A0C10, 1px alpha dividers, radius 0+8 |
| Q2 | Accent | #3B82F6 | interactive+measured only; green/red semantic |
| … | | | |
| QS1 | Hero variant | <recipe name> | anatomy + ingredient consequences |

Inherited from blend (not asked): AX2 separation = 1px alpha dividers, …
Constants enforced: C1-C12 (see drawn-to SKILL.md).
References consulted: basit_designs-2017, 0xSero-2090, …
```

Each locked row carries its firmness (`must-have`/`prefer`/`open`) in the
Locked cell. **Revisions never erase**: a changed lock keeps its row, its
state becomes `revised (<reason>)`, and the replacement is added as a new
row — the ledger is history, not just current state.

## During implementation

- Before any visual decision, check the lock file. Every visual change must
  serve a named lock; a change that serves no lock is unsanctioned taste —
  propose a new lock instead of sneaking it in.
- Pull exact values from the dimension docs; look up cited `posts/<slug>.md`
  when a lock needs deeper detail (a specific hover, a loop structure) — slugs
  are id prefixes, find files by prefix match (`posts/basit_designs-2017*.md`).
- Run the output checklist from SKILL.md before presenting the work.
