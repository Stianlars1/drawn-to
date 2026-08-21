# Discovery - repo recon before any question

Runs BEFORE Q0, always. Goal: arrive at the first question already knowing the
product, so questions are sharp and the owner only fills gaps - never explains
their own repo. The more the skill understands the product, the better the
locks.

## What to read (in order; skip what doesn't exist)

1. **Prior locks**: `docs/design-locks/*.md` in the target project. If a lock
   file covers this task area, resume it - confirm it still stands instead of
   re-asking; never re-litigate a lock silently.
2. **Own-skill check**: if the repo carries its own locked design skill
   (refetch-design class, usually `.claude/skills/*design*`), STOP - that
   skill governs; Drawn To only fills what it leaves open.
3. **Project instructions**: `CLAUDE.md`, `AGENTS.md`, `.cursorrules`,
   `README.md` - root and relevant package dirs.
4. **Product docs**: `docs/**/*.md` - list them all, skim titles, read the
   most product-relevant handful (specs, feature docs, changelogs, marketing
   copy). In a monorepo, include the app package's docs.
5. **Design system**: token/theme files (`globals.css`, `*tokens*`,
   `tailwind.config.*`, `theme.*`, design-system dirs), font setup. Record
   what exists - adoption is the owner's call in Q0, never automatic (see
   Trust model below).
6. **Existing UI**: the page/section tree (`app/` or `pages/`), section and
   component names, and one representative page's markup - enough to know
   what already exists and how it is built.
7. **Product source signals**: `package.json` name/description, app manifest,
   feature names in source - enough to name real features and real data
   shapes (what a record/request/file looks like).

Cap the recon at a few minutes of reading. Deeper source dives happen later,
during implementation, when a specific fragment needs product truth (C2/C10).

## What to extract - the product-truth brief

- What the product IS and DOES: the real feature list (4-6, priority guess).
- Audience, and the tone + language of existing copy.
- Data domain for fragments: what a record/entity actually looks like.
- Existing visual state: tokens, colors, radii, fonts in use; which sections
  exist today; greenfield vs redesign.
- Constraints: framework, theming setup, i18n.
- Lock candidates (never auto-locks): an existing brand hue is an AX4
  candidate; an existing radius system seeds an AX3 option; existing mode
  support informs AX1 - all subject to the trust model below.

## Trust model - facts, infrastructure, and design state

Discovery findings come in three classes with DIFFERENT defaults:

- **Product facts** (what the product does, real features, data shapes,
  audience, constraints): trusted and used. These cannot be "badly designed"
  - they are what the fragments must depict (C2/C10).
- **Infrastructure tokens** - the primitives of an existing design system:
  color scales, spacing scale, radius scale, type scale, motion durations/
  easings, reduced-motion contract, theming mechanism. **Default: ADOPT.**
  The skill locks a DIRECTION and expresses it THROUGH these primitives; it
  never produces "a different look" on top of a serious system. Report them,
  say "I'll build the direction on these", and do NOT ask - unless a lock
  materially contradicts them (then ask that one thing). Owner-authored
  systems (package author / repo owner = the owner, e.g. a personal
  create-next-app generator) are infrastructure by definition.
- **Design state** - thematic and surface decisions: the current palette
  mood, component styles, light/dark behaviour, existing sections and their
  look. NEVER adopted automatically: the skill is often invoked precisely
  because this layer is the problem. Report neutrally and ask in Q0:

  > "Eksisterende design funnet: <one-liner>. Tokens/primitiver bygger jeg
  > på. For selve looken: (a) bygg videre, (b) behold deler - si hvilke,
  > (c) start fra scratch (kun skillens referanser styrer)."

  Scratch is an explicit opt-in and applies to the design-state layer;
  primitives stay unless the owner also says "new tokens".

## Expressing a direction through an existing system (mapping protocol)

When infrastructure tokens exist, every family value is MAPPED, never
duplicated:
- Ground/surfaces → the system's darkest/lightest surface tokens; verify they
  fall inside the family band (F1 #080808-#101013 etc.) and say so if not  - 
  then add ONE section-scoped alias, don't fork the palette.
- Accent → the system's accent scale (the owner's brand hue is a fact, never
  re-chosen); semantic colors from the system's semantic tokens.
- Separation → the system's border/alpha token at the family's alpha; if the
  system lacks a hairline alpha, add a section-scoped token and note it.
- Radii → the nearest tiers in the system's radius scale (a radius-0 family
  uses the scale's 0 and button tier; never invent a fourth tier).
- Motion → the system's durations/easings where they match animation-craft's
  bands; its reduced-motion contract wins over a local one.
- Type → the system's families and scale; family metrics (weight, tracking)
  applied within it.
Everything added lives in one section-scoped file, listed in the lock file
under "Tokens added", each with the lock it serves. Zero parallel literals.

## How it feeds Q0

Open Q0 by presenting the brief back in 5-8 lines: "Dette fant jeg - stemmer
det?" (mirror the owner's language). Corrections are facts and cost no
question budget. Then ask ONLY the gaps discovery could not answer. Mark every
inference as an inference - never present a guess as a finding.

For REDESIGNS: additionally list the current page's sections with a one-line
read of each (what it is, which family it resembles today), so blend and
recipe questions can reference "dagens hero" concretely.
