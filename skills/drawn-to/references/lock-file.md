# Lock file and implementation record


Write to `docs/design-locks/YYYY-MM-DD-<task>.md` in the TARGET project (path
from Q0; create the dir). If no target project exists yet, write it in the
current directory and say so - move it when the project is scaffolded. Create
it when Q1 locks; update after every single lock - never batch at the end.
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
status: locking | locked | implemented | verified
---

# Design locks - <task>

| # | Axis | Locked | Consequences |
|---|------|--------|--------------|
| Q1 | Blend | 70/20/10 F1/F3/F4 | ground #0A0C10, 1px alpha dividers, radius 0+8 |
| Q2 | Accent | #3B82F6 | interactive+measured only; green/red semantic |
| … | | | |
| QS1 | Hero variant | <recipe name> | anatomy + ingredient consequences |
| AX16a | First screen: composition | full field / bounded media / split / type-led / product shelf | extent, reading zone and crop |
| AX16b | First screen: composition | 70 three zones / 30 product shelf | zone map, what crosses the fold |
| AX4b | Gradient role | card ground, G3 clipped box | overflow:hidden rect, source at 91 % x |
| QC1 | Card anatomy | veil-split photographic | media 3/2, split 73.8/26.2, radius 0 |

Inherited from blend (not asked): AX2 separation = 1px alpha dividers, …
Craft defaults applied: <relevant defaults from style-families.md>.
Deliberate departures: <what the approved brief changes and why>.
References consulted: basit_designs-2017, 0xSero-2090, …

SET TABLES (one per explanatory set; record its relationship as independent
features, sequence, shared world or collection, then use the matching test in
`quality-bar.md` § 3b):

| Surface | Cell | Claim or role | Register | Device | Hero object |
|---|---|---|---|---|---|
RENDER: <T0-T6> · <what draws the field> · dpr <cap> · poster <path>
        · stops: io+hidden+rM+saveData · gate: <why this tier>   (render-tiers.md)
FIELD:  kind <G1-G16 or other> · role/extent <where it sits>
        · source <position or not applicable> · quantities/functions <named color space + units>
        · finish <smooth / grain / other + parameter units> · output banding <observed / not checked>
CELLS:  anatomy <n> · ladder rung <cell width band> · layers kept <L1-L9>
        · dials varied <list>                              (layout-language.md 5, 5a, 5b)
FOLD:   crosses the fold: <media only> · top edge <y / % of viewport>
        · message intact at 1440×900 and 1280×720             (quality-bar.md § 3c)
POLISH: applied <list> · gated <list>            (polish-moments.md)
QA: 1440x900 <pending> · 1280x720 <pending> · 390x844 <pending>
    · issues <pending> · codes <pending> · content/contrast <pending>
    · states/focus <pending> · sets <relationship + test + result or n/a>
    · refs compared <slugs or text-only> · evidence <capture paths>
    · limitations <not checked / unavailable / none>
```

Each locked row carries its firmness (`must-have`/`prefer`/`open`) in the
Locked cell. **Revisions never erase**: a changed lock keeps its row, its
state becomes `revised (<reason>)`, and the replacement is added as a new
row - the ledger is history, not just current state.

## During implementation

- Reuse accepted illustration decisions. For new explanatory scenes, use the
  relevant fit-method in `illustration-ideation.md`; for brand, landscape,
  collection or identity roles, record their actual visual contract instead.
  A set records independent claims, sequence, shared world, collection or
  identity and its matching test. Existing rows need updates only when their
  decisions or verification change; an approved continuation does not restart QI.

- Before any visual decision, check the lock file. Every visual change must
  serve the approved direction. Routine implementation choices within that
  direction may be recorded with their reason; ask only when a consequential
  unresolved choice would alter the approved direction or product scope.
- Use relevant measured or proposed values with their stated provenance; look
  up cited `posts/<slug>.md`
  when a lock needs deeper detail (a specific hover, a loop structure) - slugs
  are id prefixes, find files by prefix match (`posts/basit_designs-2017*.md`).
- Preserve necessary content and readable type. Edit redundant wording or
  recompose when needed (`quality-bar.md` § 2); ask before removing a message
  that the approved scope requires.
- Before presenting: the visual QA loop (`quality-bar.md` § 4 - render at
  full size, walk the tells and budgets, compare to the cited frames, fix),
  then the scoped polish pass and the Completion guidance in SKILL.md. The QA and
  POLISH lines go into the lock file; a screen that was never rendered at
  full size is handed off as unrendered, not verified.

Fields are optional when irrelevant: a static footer does not need a GPU budget.
Pending is the initial state. Never paste checkmarks from an example as evidence.
Review-only work reports findings without writing this file unless requested.
