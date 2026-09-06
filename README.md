<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
  <img alt="Drawn To - a visual reference library and design direction skill" src="assets/hero-light.svg" width="100%">
</picture>

# Drawn To

A personal visual reference library and a portable skill for making deliberate
web design decisions. It helps an agent understand the product, ask useful
questions, propose weighted directions and implement the approved result.

The library covers technical and editorial interfaces, warm character-led UI,
serif and illustrated landscapes, kinetic image collections, product flows,
physical materials and motion. The eight starting families and twelve craft
defaults organize the evidence; they do not force every project into one look.

See the [current reference index](skills/drawn-to/references/matrix.md) and the
[September expansion](skills/drawn-to/references/september-expansion.md).

The [local showcase](docs/showcase.md) now contains 45 screens, including 15 new
reference-led compositions, original character/landscape artwork, spatial image
flow, live Three.js materials, an original GLB and a native WebGPU particle study.
Three independent output trials informed a stricter visual review and retest.
Working controls and a coherent direction are assessed separately from the
references' material, lighting and motion finish.

## Install

```sh
npx skills add Stianlars1/drawn-to
```

Or, for Claude Code, use the plugin route. Choose one installation route per
host to avoid loading duplicate copies:

```text
/plugin marketplace add Stianlars1/drawn-to
/plugin install drawn-to@drawn-to
```

For a local copy, use the host's skill directory and copy `skills/drawn-to/` as a
whole. The entry point and relative references travel together. In a chat
without filesystem access, provide `SKILL.md`, `style-families.md`,
`question-flow.md`, `lock-file.md` and relevant references as attachments;
pasting the entry point alone cannot make its linked files available.

Ask for a design direction, invoke Drawn To explicitly, continue from an
existing design lock, or request a review against that lock. The skill has
separate routes for those tasks. It also has a library-maintenance route.

To update an existing global skill installation:

```sh
npx skills update drawn-to --global --yes
```

For an existing Claude Code plugin installation:

```sh
claude plugin marketplace update drawn-to
claude plugin update drawn-to@drawn-to
```

Start a new session after updating so the host loads the current instructions.
The [GitHub releases](https://github.com/Stianlars1/drawn-to/releases) also provide
a complete skill ZIP. See [release maintenance](docs/releasing.md) for the
source, installation and publication checks.

## How it works

For a new direction, discovery reads existing project facts and infrastructure.
The interview asks only consequential gaps, using plain language and visible
examples. Multiple favorites can be combined with weights. Composition and
illustration choices become an explicit project lock.

Approved implementation resumes that lock without restarting the interview.
Review-only work reports deviations and opportunities without editing the UI.
The quality check follows the actual visual role: an onboarding sequence needs
continuity, a collection can repeat apertures, and an illustrated footer does
not have to look like a technical product diagram.

```text
New direction  -> discovery -> weighted choices -> lock -> implementation + QA
Approved work  -> existing lock -> relevant recipes -> implementation + QA
Review only    -> existing lock + rendered UI -> evidence-backed findings
Library update -> source coverage -> visual analysis -> synthesis -> validation
```

The lock records decisions, rationale and remaining freedom. Its verification
fields start pending and are filled from actual checks. Local verification,
commit, push, deployment and live verification are separate states.

## What's inside

```text
skills/drawn-to/
  SKILL.md                         task router and working contract
  assets/
    features/ · heroes/ · plates/   visual plates and own layout diagrams
  references/
    discovery.md                   product facts, infrastructure and visual state
    style-families.md               family seeds and scoped craft defaults
    question-flow.md                plain-language weighted interview
    lock-file.md                   decision ledger, revisions and QA record
    qi-protocol.md                 whole-set direction, then feature scenes
    recipes.md                     section compositions and product flows
    september-expansion.md         newer directions and deeper favorite readings
    production-formula.md           historical page-scale measurements
    hero-atmosphere.md              first-screen composition, fields and crop
    layout-language.md              grids, anatomy, spacing and cell scale
    color-type.md                   color roles and varied typographic systems
    graphic-language.md             UI, illustration and image treatments
    illustration-ideation.md         feature meaning and set relationships
    practitioner-methods.md          ways to generate a coherent visual system
    isometric-and-light.md           projection, material and structured light
    gradient-fields.md               field construction and measurement limits
    render-tiers.md                  renderer choice, poster and runtime gates
    three-dimensional-craft.md       modeled materials, light, GPU and output lessons
    motion-grammar.md                temporal structure and interaction
    animation-craft.md               implementation mechanics
    animation-recipes.md             component recipes to adapt and verify
    scroll-scrub.md                  scroll-controlled product scenes
    polish-moments.md                feedback and optional motion treatments
    quality-bar.md                   role-specific visual and functional review
    measuring.md                     observed, inferred and proposed quantities
    library-maintenance.md           source, analysis and integration workflow
    matrix.md · _index.json          generated current index
    sources.json                     supplied URL coverage for the latest batch
    posts/                          individual analyses and canonical index metadata
    media/                          reduced evidence and minimal provenance
scripts/
  fetch-posts.py · fetch-posts.sh     original downloads to the ignored local archive
  library.py · rebuild-index.py      canonical index generation
  validate-library.py                index, source, citation and asset checks
  build-showcase-data.py             current showcase library count
  export-showcase-model.mjs          original GLB from shared geometry
  verify-showcase.mjs                browser integration and renderer lifecycle checks
```

## Evidence and limits

Analyses distinguish observed appearance, measured quantities, uncertain capture
scale and proposed implementation. A still does not prove animation or mobile
behavior; a compressed frame cannot recover original grain settings. The newest
batch was inspected through all supplied stills, uniform video samples and
larger favorite details. It was not manually inspected at every decoded frame.

The portable media archive contains reduced frames and stills. Original videos,
full-resolution study files and raw API responses stay in the local archive.
Each new evidence manifest records source URLs, hashes, metadata and the actual
archived sample names. The index includes articles and resource tours as well
as visual design references; those are not interchangeable categories of proof.

## Extend the library

Use [library-maintenance.md](skills/drawn-to/references/library-maintenance.md).
The repository helpers use Python's standard library:

```sh
python3 scripts/fetch-posts.py --ids 2095991462416490862
python3 scripts/rebuild-index.py
python3 scripts/validate-library.py
```

The fetcher includes article imagery, validates responses, resumes retained
files and keeps original media outside the portable package. Extract and curate
frames deliberately, write the analysis, and connect useful patterns to the
relevant recipes. Update active instructions when new evidence contradicts them.

## Earlier application example

<img alt="An earlier Latch feature-bento exploration using dark dividers and technical illustrations" src="assets/latch-bento.jpg" width="100%">

This earlier application shows the dark technical lane. It is one possible
result from the library, not the required style for every project or evidence
that the updated skill has been benchmarked across production websites.

## Credits and rights

Each [indexed reference](skills/drawn-to/references/matrix.md) links to its author
and original source. The per-post credits and source manifests are maintained
with the library, rather than in a separate author list that can drift.

Animation guidance draws on [Emil Kowalski's skills](https://github.com/emilkowalski/skills).
Historical production research originated in the [Refetch](https://refetch.sh)
project. The current skill has been reviewed and continued with Claude and Codex.

The repository's MIT license applies to its own skill text, analyses and scripts.
Third-party images and frames remain their owners' material and are included as
study references under the relevant NOTICE files. They are not licensed for
reuse as product artwork. Own zone diagrams carry their CC0 notice inside the
SVG. See [LICENSE](LICENSE) and the [media notice](skills/drawn-to/references/media/NOTICE.md).
