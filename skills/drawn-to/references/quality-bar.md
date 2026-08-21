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
- Em dashes ( - ) anywhere in copy - headline, sub, captions, labels, footer.
  Owner's standing rule: ALWAYS "-", NEVER " - ". An em dash is the single
  most reliable tell of generated copy; a hyphen with spaces does the job.
- Triads ("Fast · Secure · Scalable"), sparkles ✦, emoji, "✨ New" pills above
  the headline, lorem, placeholder avatars, "Trusted by 10,000+ teams" without
  a real logo row.

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
6. **One** - one signature object per screen. Two competing objects halve each
   other.

If any condition fails: ship NO illustration. A typographic hero on a well-set
ground is a strong, legitimate answer; a weak object is the single fastest way
to look generated. Devices and construction: `illustration-ideation.md`,
`isometric-and-light.md`, `graphic-language.md`.

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
4. **Compare to the references** - if the media archive exists locally
   (`references/media/<full-slug>/`, populated by `scripts/fetch-posts.sh`;
   never committed), open 2–3 frames of the references the lock file cites,
   side by side with the render. Same ground value? Same separation physics?
   Same density, or is the render busier? Same quality of line and light, or
   is the render cheaper? If the render loses the comparison, it is not done.
   Without media: compare against the measured values in the post analyses
   and say so in the QA line.
5. **Locks** - every visual choice names a lock; every lock is visible in the
   render.
6. **Polish pass** - `polish-moments.md`.
7. **Record** in the lock file:
   `QA: 1440×900 ✓ · 1280×720 ✓ · 390×844 ✓ · tells 0 · budgets ✓ · refs compared: <slugs or "text only">`.

The owner's screenshot beats yours. If the owner sends one, it is the
ground-truth viewport - fix what it shows, do not explain it.

## 5. Honesty clause

If you cannot render (no browser in the environment), say so and hand off with
`QA: unrendered - owner please check at 1440×900 and 390×844`. Never write
"verified" for a screen you have not seen at full size.
