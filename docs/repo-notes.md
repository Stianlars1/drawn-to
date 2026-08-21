# my_taste

Personal design-taste system. 45 saved X/Twitter references reverse-engineered
(frame by frame) into a measured taste library, and a portable skill that locks
style/tone/direction through interactive weighted questions before any UI work.

## Layout

```
drawn-to/                 ← THE SKILL (portable, self-contained, lightweight)
  SKILL.md                  contract: process, constants C1-C12, checklist
  references/
    discovery.md            repo recon before any question + trust model
    style-families.md       master: 12 constants, 8 families, blends, clashes
    question-flow.md        the lock-in protocol + axis question bank + QS variants
    recipes.md              31 named composition variants across 9 section kinds
    production-formula.md   page-scale values measured off 7 famous sites
    scroll-scrub.md         scroll-scrubbed product scenes (the refetch stage pattern)
    illustration-ideation.md per-feature illustration engine (fit-method, devices, QI)
    animation-craft.md      implementation doctrine (Emil Kowalski / Apple distillation)
    animation-recipes.md    ready-to-build component recipes (press, popover, drawer…)
    isometric-and-light.md  isometric objects + structured-light paths (Kargul set)
    layout-language.md      grids, separation, radius, air - measured
    motion-grammar.md       registers, easing table, loops, cursor choreography
    graphic-language.md     UI-fragments, line-art, texture, shaders, mock craft
    color-type.md           palettes, chroma quarantine, dual-mode, typography
    matrix.md               index of every reference (51 and counting)
    posts/                  per-reference deep dives (51)
references/               ← heavy archive (NOT part of the skill)
  media/                    downloaded post media + extracted frames (~260 MB)
  _index.json               structured summary of the first 45 analyses (later refs: posts/ only)
scripts/
  validate-library.py       library integrity check (citations, frontmatter,
                            matrix, SKILL read-order) - run before publishing
docs/plans/               ← build plan + status
```

## Using the skill

- **Claude Code (this machine):** copy or symlink `drawn-to/` into a project's
  `.claude/skills/` (or `~/.claude/skills/` for global). Invoke with
  `/drawn-to` or just ask to design something - the description auto-triggers.
- **Codex CLI / Copilot CLI / Gemini CLI:** copy `drawn-to/` into the host's
  skills location; the SKILL.md format is portable.
- **ChatGPT:** paste `skills/drawn-to/SKILL.md` + `skills/drawn-to/references/style-families.md`
  (and `question-flow.md` for the interactive flow) as project instructions.

The skill's output per project is a lock file:
`docs/design-locks/YYYY-MM-DD-<task>.md` in the target repo - the contract
implementation must serve, à la refetch.sh's Q1-Q25.

## Regenerating / extending the library

New saved post → append its id to the fetch script pattern
(`fxtwitter` API → `references/media/`), extract frames (ffmpeg, 2-6 fps),
run one analysis agent with the template in `docs/plans/2026-08-20-taste-skill.md`,
then refresh the synthesis docs if the new reference shifts a pattern.
