# Question flow - the lock-in protocol

Turns a task brief into a locked design direction through interactive, weighted
questions, then into a per-project lock file that implementation must serve.
Use this flow for a new direction or consequential choices that remain open.
Approved continuation uses `lock-file.md`; review-only uses `quality-bar.md`.
Reuse known facts and choices instead of reopening this interview.

## Protocol rules

1. **Q0 is one batched fact-gathering exchange**; its answers persist in the
   lock file's frontmatter, not as Q-rows. Style questions then run **one at a
   time**, numbered Q1, Q2, … Each answer locks before the next question, and
   the lock is recorded in the lock file immediately - never batched. Ask
   questions in the owner's language (mirror the brief); the docs and lock
   file stay English.
2. **Every style question is multi-select with weights.** The owner often likes
   several options at once; forcing a single choice is the failure mode this
   skill exists to fix. Always allow answers like "70% A + 20% B + 10% C", and
   say so in the question. A single pick is just a 100% weight.
   *Conflicting choices:* explain how weighted ingredients apply to distinct
   roles or surfaces when they cannot occupy the same role. A hairline and a
   contact shadow may coexist with different jobs; do not invent exclusivity
   from the family names.
   *Weights that don't sum to 100 are queried, never silently normalized.*
   Every lock also records **firmness**: `must-have` / `prefer` / `open`  - 
   so later trade-offs know which locks may flex and which never do.
3. **Options cite evidence.** Use descriptive reference links and concrete
   visible differences. Keep reference IDs and detailed measurements in the
   ledger; the owner should not need internal codes to answer.
4. Apply the scoped defaults in `style-families.md` where they fit. Do not
   interview about routine craft; ask if a consequential choice remains open.
   The owner's new references can legitimately change the default direction.
5. **Inheritance - ask only where the blend leaves a fork.** For each axis:
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
6. **Resolve actual material and mode conflicts.** Family combinations are not
   intrinsically illegal. Explain a real conflict in plain language: competing
   depth cues, incompatible geometry, unreadable contrast or an asset that does
   not work in the required mode. Offer a role/surface split, a material
   adaptation or a different ingredient. Let the owner's weights and brief
   determine the resolution; do not cap a family at 10% just because the
   original corpus used it as garnish. A correction revises the same question.
7. **Never guess, never substitute your own preference.** An unanswered
   question is an open question. If the owner says "just decide", pick the
   dominant family's value and mark the lock `(delegated)`.
8. **Sibling locks may seed proposals.** If the brief says "like <project X>"
   and X has a known lock (e.g. refetch.sh = 80% F1 + 15% F3 + 5% F4), present
   X's blend as candidate A, labeled as such - still ask, never auto-apply.

## Question phrasing - the owner must never need the nomenclature

The internal codes (F1-F8, AX1-17, C1-C12, QI, reference slugs) are
BOOKKEEPING, not interview language. Rules:

- **Ask in plain words.** Lead every question and option with what it looks
  like, in one sentence a non-designer understands: "Skarpe hjørner og tynne
  lysende skillelinjer - som Linear" - not "AX2 separasjonsfysikk, eksklusiv
  per flate". Keep codes and slugs in the ledger. In questions, link the example using a
  descriptive name instead.
- **Famous anchors beat slugs in options.** "som Linear / som Raycast / som
  Stripe light" communicates; `basit_designs-2017` belongs in the lock file.
- **One decision per question, max 2 lines per option.** If an option needs
  a paragraph, it is two questions or a preview.
- **Show, don't describe, when the host allows**: for material/color/layout
  choices, render a small side-by-side preview (HTML file opened in the
  browser, or the question tool's preview field) - text is for scope,
  trade-offs and facts. A blend question answered blind is a phrasing
  failure.
- **Conflicts from multi-picks are resolved, not re-asked.** When the owner
  picks more than a slot can hold (three concepts, two blends), apply the
  intended hierarchy and roles to propose a concrete resolution and ask for
  a yes/adjust - never open a fresh abstract question about the conflict.
- **Offer "anbefalt" batching on QI**: after the first 1-2 features, offer
  "vil du velge per feature, eller ta mine anbefalinger for resten og
  justere etterpå?" - five consecutive concept menus is fatigue, not rigor.

## Plain-language glossary - what the owner hears instead of the code

Use the LEFT column in the lock file, the RIGHT column everywhere a human
reads words: in questions AND in shipped copy, captions, labels, legends
and alt text. Never show the owner "AX3" or "F4"; show "Spørsmål 3 av ~8"
and the plain phrase. Mirror the owner's language. The rule does not stop
at the interview - if a person who has never read this skill will see the
string, it carries the plain phrase, never the code (`quality-bar.md` § 1,
nomenclature tell). The section above governs asking; this table governs
asking and shipping alike.

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
| Q1 Blend | "Which of these directions are you drawn to - and how much of each?" | - |
| AX1 Ground & mode | "Dark or light page - and which black/white exactly?" | - |
| AX2 Separation | "How do surfaces separate: thin lines, tone steps, or one soft shadow?" | Linear lines vs Stripe shadow |
| AX3 Radius | "Sharp corners, slightly rounded, or pebble-round?" | Prime Intellect vs Linear vs Amie |
| AX4 Palette roles | "Which colors carry the brand, content, categories and state?" | - |
| AX5 Texture | "Any texture: grain, halftone, blueprint grid - or flat?" | - |
| AX6 Graphic device | "How do we picture each feature: real UI pieces, diagrams, line-art, light?" | - |
| AX7 Motion budget | "How much motion: none, hover only, entrances, full scenes, scroll-driven?" | - |
| AX8 Type voices | "Which type roles fit: serif-led, clean sans, mixed voices or bold display?" | - |
| AX9 Meta layer | "Number the pieces (FIG.01, 1.0) or keep it clean?" | - |
| AX10 Atmosphere asset | "If there is one big visual - gradient, photo, shader, light - which one?" | - |
| AX11 Card anatomy | "How much of each card is picture vs text, and where does text sit?" | - |
| AX12 Copy voice | "Tone of the words: sober, confident-plain, witty, warm?" | - |
| AX13 Page architecture | "Page width, air between sections, and the order of sections" | - |
| AX14 Nav | "Top bar: plain on the page, floating rounded bar, or bar with a rule?" | Linear vs Raycast vs Vite |
| AX15 Buttons | "Buttons: pills, squarish, or light-with-ring?" | Linear vs Vercel vs Raycast |
| AX4b Gradient role | "If there is a coloured field, what job does it do - the page, one card, a panel inside a card - and where is the light coming from?" | - |
| QC Card anatomy | "For these cards, which anatomy?" (2-3 named, with a photo/field/micro option) | - |
| AX16a First screen: relationship | "Does this need full-screen imagery, a bounded image, split evidence, a product shelf or type on its own?" | - |
| AX16b First screen: composition | "Which of these relevant compositions are you drawn to, and what would you combine?" | - |
| AX17 Render tier | "Should that background be a still, a light drawn layer, or a live one that costs a bit of bundle and battery?" | - |
| QS | "For this section, which composition?" (2-3 named variants) | - |
| QI | "For this feature, which illustration idea?" (2-4 concepts) | - |
| Qf | "Build in phases with check-ins, or straight through?" | - |
| C1-C12 | scoped craft defaults, discussed only when a real decision remains | - |

## Q0 - Scope (facts, not style; discovery runs first)

Before Q0, run the repo recon in `discovery.md` and build the product-truth
brief. Q0 is then one batched exchange: open by presenting the brief in 5-8
lines ("Dette fant jeg - stemmer det?"), take corrections as free facts, and
ask ONLY what discovery couldn't answer of the following:

- **What is being built**: hero / full landing page / feature section (cards,
  bento) / pricing / component / full site / subpage / brand board - and, for
  feature work, the format (grid/bento vs alternating rows) and item count;
  for a full page/site, the section inventory (sets the question budget).
- **Page shape** (landing pages): one screen (100 vw × 100 svh, no scroll -
  one reading path and budgets chosen for the content) ·
  short scroll (3-5 sections) · long-form. Fewer screens is the stronger
  default for a product with one message; ask, don't assume the long page.
- **Single view or several related views?** If unresolved, identify the
  relationship: independent claims, an ordered process, a shared world, an
  image collection or a showcase of different directions. A sequence preserves
  its object/preview; a collection may repeat its aperture and controls. Use
  `recipes.md`'s One-Screen Catalog only when the purpose is to demonstrate
  range. Then settle the needed view count, navigation and actual content.
- **Product/content truth**: product, audience and the actual content needed
  for this surface. Feature explanations need the relevant capabilities and
  data shapes; a footer or collection may instead need links, brand material
  and an image inventory. Invent presentation, not capability or customers.
- **Target project path**: where the lock file and code live
  (`<target>/docs/design-locks/`).
- **Existing design system**: primitives (color/spacing/radius/type/motion
  tokens) are ADOPTED by default - state "I build the direction on these" and
  map families onto them (`discovery.md` § mapping protocol); owner-authored
  systems always. Ask only about the design-state layer: build on the current
  look / keep named parts / start from scratch - the skill may have been
  invoked because the current look is the problem (`discovery.md` § Trust
  model). "Scratch" never silently discards primitives; if the owner wants
  new tokens too, they say so.
- **Mode requirement**: dark / light / both. (Both ⇒ dual-theme rules from
  `color-type.md`: re-derive materials per mode, never invert.)
- **Copy language**: the language and voice of the actual surface. If fictional
  demo data is needed, identify it as such and fit it to the product domain;
  no fictional client is required for a footer, collection or ordinary UI.
- **Constraints only, not style**: performance budget, reduced-motion
  requirements, target framework (discover from the project; ask if an implementation needs
  a framework choice and none is established).
  Stylistic motion appetite is NOT collected here - that is AX7.
- **Delivery depth**: exploration only (locks, no build) · design spec ·
  full implementation · implementation + visual QA pass. Determines where
  the flow stops.

## Q1 - Blend proposal

From Q0, propose 2-3 candidate blends. Format each option as:

```
A. Mostly dark editorial, with atmospheric imagery and a little technical drawing.
   Thin dividers, one material family and restrained labels.
   Suggested mix: 70% editorial + 20% atmosphere + 10% technical drawing.
```

Choose distinct compositions as well as palettes. Read `september-expansion.md`
when the brief calls for warmth, serif, illustration, identity systems,
onboarding or kinetic collections. The families are starting points, not a
closed menu. Keep reference IDs and technical values in the ledger.

Rules for proposing:
- A useful starting blend gives the dominant family the main structure and
  lets other ingredients supply material, typography or imagery. Assign actual
  roles to the weights; the original 70/20/10 pattern is not a fixed cap.
- Prefer proven pairings: F1+F4 (dark technical), F2+F3 (light SaaS default),
  F1+F3 (refetch blend), F6+F5 (warm print), F6+F2 (warm HR/consumer  - 
  adriankuleszo-2089253 belongs to both), F7 inside any host, F8 garnish on F1.
- A secondary F2 contributes ink, caption discipline, hairlines, and type  - 
  not texture (the "secondary contributes texture" mechanic fits F3/F5-class
  secondaries).
- The owner reweights freely; lock the final percentages.

## Axis question bank

Ask only the divergent ones (rule 5). Each axis lists its options with source
values - pull full detail from the dimension docs before writing the question.
Read an axis when its decision applies to the surface. A small ingredient may
need a material decision, but an already specified choice does not become a new
question because its family appears in the blend. Record routine choices within
the approved direction; ask only about consequential unresolved alternatives.

**AX1 - Ground & mode** (`color-type.md`)
Dark editorial #080808-#101013 · dark object-stage #1f1f1f-#232323 · light warm
#F7F6F2-ish · light pure #fff/#FAFAFA · tinted wash (#dbf3ff-class) · both.

**AX2 - Surface separation** (`layout-language.md`)
Choose useful boundary/depth roles: hairline · tone step · contact shadow ·
material edge · deliberate outline · no drawn boundary. Combine them where they
do different jobs. Source values are reconstruction examples; actual contrast
and the approved material determine the implementation.

**AX3 - Shape family** (`layout-language.md`)
Sharp, gently rounded, pill, squircle or a deliberate mixture by role. Use the
existing scale and only as many tiers as the product needs. Concentric
outer = inner + padding applies to equal-offset circular corners, not all
shapes. Ask about a fork only when the brief or existing lock has not resolved it.

**AX4 - Palette roles** (`color-type.md`)
Choose the brand, content, category and semantic roles. Neutral-plus-one-accent
is a useful technical option; multiple coherent hues and colorful imagery are
also available. Reuse established brand choices and verify essential contrast.

**AX4b - Gradient/field role** (when a field is part of this surface;
`gradient-fields.md`)
Decide its job and extent: page ground · card ground · bounded panel · text
scrim · border/seam · material/light event · none. Source position matters when
the field depicts a source; centre, edge and offscreen positions are all valid.
Directionless or graphic fields need no invented light position. Record the
named color quantities/functions, chosen finish and output observations in the
optional `FIELD:` line from `lock-file.md`. HSV V is not relative luminance;
grain opacity, noise amplitude and pixel sigma have different units.

**AX5 - Finish** (`graphic-language.md`)
Smooth · grain/stipple · halftone · pixels · a confined grid/hatch · photographic
texture · flat. Select for the intended material and delivered scale, not as a
mandatory repair for gradients. Reuse the locked finish when it is established.

**AX6 - Graphic device for features** (`graphic-language.md`)
UI fragments w/ real data (corpus default) · skeleton fragments (3-5 selling
data points live, rest gray) · line-art mechanism / isometric exploded ·
diegetic product chrome (handles, cursors) · shader/atmosphere asset · processed
photography. Combinable with weights. Usually asked - most families admit
several devices.

**AX7 - Motion budget** (`motion-grammar.md`)
Static + frozen interactions · micro (hover state-changes only, 200-450ms) ·
sequence (entrances + one ambient layer) · full choreography (semantic loops on
desynced periods, cursor tours, camera moves) · scroll-scrubbed product scene
(the flow told by the visitor's scroll - pinned stage or per-composite
mini-beats; implementation recipe in `scroll-scrub.md`; max ONE long pinned
run per page). Distinguish continuous drift, periodic semantic scenes and user interaction
per C6; authored loops need continuity per C7. Q0 constraints (perf, reduced-motion) cap
this axis; they do not answer it. Whatever level locks, implementation follows
`animation-craft.md` (gate, curves, springs, interruptibility, never-ship).

**AX8 - Type voices** (`color-type.md`)
A clean grotesque, a serif-led editorial system, a restrained mixed-type
system, handwritten annotations or purposeful bold display. Faces and scales
come from established project tokens where available. If the choice is open,
show relevant reference treatments and ask in plain language; never invent
owner delegation. Updating numbers need stable advances, not necessarily mono.

**AX9 - Meta/numbering layer** (only if F1, F4, or F5 is in the blend)
FIG.n plates · 1.0/1.1 spec indices · 01/03 slashed-zero chips · none.
Numbering must encode a real sequence, never decoration.

**AX10 - Atmosphere/image system** (when this role is present)
Choose the actual material: smooth or textured gradient · photograph/film ·
painting/illustrated landscape · shader field · structured light · isometric
scene · another supplied asset. Decide full-field, bounded, split or repeated
placement using the composition. One asset reused at several scales is one
cohesion technique; related images, poses or scenes can form a system too.
No fixed grain, blur, matte thickness or reuse count is required.

**AX11 - Card anatomy** (only for cards/bento tasks; `layout-language.md`)
Visual-area ratio 55-80% (mode 65-70) · caption inside vs demoted outside ·
split 50/50 w/ dead-air · edge-bled content w/ fade masks · uniform vs bento
mixed spans · per-card accent vs shared accent.

**AX12 - Copy voice** (C10 companion; always relevant for pages, skip for
pure components)
Tone: sober-technical (yurygok-2089624 telemetry) · confident-plain (Linear
register) · witty mono captions ("CLICK TO WORRY AGAIN", mickces-2088) ·
warm-friendly (F6 lane), or the established product voice. Use the copy
language from Q0. Add clearly fictional, internally consistent demo content only
where a product fragment needs it; ordinary copy needs no invented client.

**AX13 - Page architecture** (full pages/sites only; `production-formula.md`)
Container 1200-1400px · section air 96-128px padding or 208px margins ·
running order from the production skeleton (hero → proof/logos → 2-4 feature
chapters → how-it-works → social proof → centered CTA → footer, 6-9 sections
total) - lock the actual order and count · proof placement (under the hero
frame / own section / both - refetch locked both).

**AX14 - Nav bar** (full pages/sites; `production-formula.md`)
Transparent bar on the page bg (Linear/Vercel/Resend) · floating rounded bar
inside the container: 1px alpha border, radius ~16, blur, inset top highlight
(Raycast; the refetch lock) · bar with a bottom rule (Vite).

**AX15 - Buttons** (`production-formula.md`)
Pills 32/44px, light-grey fill + inset 1px ring, 13-16px/500 (Linear; the
refetch lock) · squarish r6-8, 32/40px (Vercel) · 36px r8 light fill + 2px
dark ring + white glow (Raycast) · pill-for-marketing vs r8-for-component
split rides AX3/C8.

**AX16 - The first screen** (any task whose scope includes a hero or a
one-screen page; `hero-atmosphere.md`, plates in `assets/plates/zone-*.svg`)
Settle the relationship first, then composition details only if they remain open.
Use plain descriptions and relevant references, including named sites when useful.

*16a, extent and relationship:* full-screen field, bounded media panel,
side-by-side copy and evidence, image-first composition, or no atmosphere?
Select using the product and supplied references. Full bleed is one option,
not a prerequisite for a hero.

*16b, composition:* offer relevant arrangements, including examples such as:
- scattered marks across the whole screen, thinning in the middle so the words
  sit in clear air, and the words are the only object (particle field)
- one photographic or filmed surface, thrown far out of focus, with the words,
  the icon and the button sitting straight on it (filmed ground)
- no background at all: the words at the left edge, and the product itself as a
  wide shelf underneath that runs off the bottom of the screen (product shelf)
- broad diagonal shafts of one colour crossing the screen, with the words
  placed inside the light where it is already dark (light shafts)
- an almost empty screen with the words small at the left, one glowing object
  holding the middle, and a short column of text at the right (three zones)

A bounded illustration, side-by-side evidence or an image-first scene is also
available. If weighted ingredients imply conflicting alignment, describe how
they occupy different roles or resolve the main reading spine; do not treat
50/50 itself as an invalid answer.

**AX17 - Render tier and motion budget** (only if the composition includes a field,
or any hero object moves; `render-tiers.md`)
Usually NOT a question: take the lowest tier that holds and state it. Ask only
when the owner has a constraint the tiers trade against - bundle size, a
no-JavaScript requirement, an existing 3D asset, a designer-authored Rive or
Lottie file, or a hard "must work on a five-year-old laptop". Then the question
is about the trade, in plain words: "this field can be a still image that never
moves, a lightweight drawn layer, or a live one that costs a bundle and a bit
of battery - which end do you want?" The answer is recorded as the `RENDER:`
line in the lock file (tier · what · DPR cap · poster path · stop conditions ·
the gate that justified the tier).

**Qf - Delivery phasing** (process, asked last, full pages/sites only)
Phased build with a live checkpoint after each phase (the refetch Q19 choice  - 
owner's standing preference) · straight through, review at the end.

## QS - Section variants (after axis locks, before implementation)

The axes lock the STYLE; QS locks the COMPOSITION. For each section in scope
(from Q0's section inventory), in page order:
(For several views, use the relationship chosen in Q0. Sequences preserve
continuity, collections keep coherent browsing, and a range showcase can vary
screen kind and device using `recipes.md` § One-Screen Catalog. Present the
relevant running order without forcing every view to change its frame.)

- Select or adapt recipes by the approved material, content and axes; native
  family tags are clues, not exclusions. Present useful distinct variants as
  one weighted question (QS1, QS2, …), each with its anatomy line, values, and
  evidence slugs.
- REDESIGNS: always include "keep current structure, reskin to the locks" as
  an option, and name the existing section concretely ("dagens hero:
  <one-line read from discovery>").
- Weights across variants mean the usual: a split is legal when it maps to
  distinct surfaces/sub-sections; otherwise the top weight wins and the
  runner-up's named ingredient may be grafted (say which).
- QS locks are recorded like Q locks, in the same table, numbered QS1, QS2, …

## QC - Card anatomy (runs between QS and QI, for any card/bento task)

QS settles the SECTION. QI settles the PICTURE. Nothing settled the CARD, and
AX11 was the one axis in the bank written as a flat comma list with no named
options, no evidence and no "choose when" - six independent decisions on one
line. QC is the mechanism that answers it.

Use `layout-language.md` § 5 for relevant card examples, adapting them to the
locked content and material. Present a few useful alternatives only where the
anatomy remains open; distinguish observed values from proposed build tokens. Then confirm the six **card dials**
(`layout-language.md` § 5a) - Ground · Chrome · Text position · Footer band ·
Aspect · Emphasis - and note which of them siblings are allowed to vary on,
keeping a recognizable relationship across the set. Geometry and finish may
vary together when the approved roles make that useful; do not impose change
or uniformity solely to satisfy a dial count.

For a small-cell row, also settle the rung on the cell scale ladder
(`layout-language.md` § 5b), because it decides which layers exist at all.

Record as QC1, QC2 … in the lock file, one per card kind on the page.

## QI - Per-feature illustration proposals (feature-card/bento tasks)

Use [qi-protocol.md](qi-protocol.md). Pass 1 offers distinct whole-set
methods/material directions. Once one direction is approved, Pass 2 varies
the scene and hero object for each feature within that set contract. A single
register is valid; do not require multiple registers in every feature.
Record each accepted choice and any remaining delegated freedom.

## The lock file

Use [lock-file.md](lock-file.md) for the template, revision rules and implementation record.
