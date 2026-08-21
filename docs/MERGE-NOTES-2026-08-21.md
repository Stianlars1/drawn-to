# Merge note - two parallel sessions edited the same skill docs (2026-08-21)

Two Claude sessions worked on `skills/drawn-to/` at the same time and found the
SAME class of defect independently. Both sets of edits are wanted. Neither side
supersedes the other; a merge that drops either half loses real work.

## The two lines of work

**main** (`7da5c7a` → `1477fe2`, tagged `skill-round15`) - the x402 reverse
engineering session:
- `references/posts/0xhammermann-2090450716380831921.md` - reference 52,
  measured across all 301 frames; matrix row + counts (52 refs, 2 963 frames).
- `illustration-ideation.md` - the **claim-to-scene derivation ladder**:
  claim + antagonist → 9 claim shapes → scene topology → cast → what the loop
  asserts → **swap test** → **read-back test** → absence check → set register
  contract with literal values. Also fixed fit-method step 2 in place
  ("register decided ONCE for the whole set, never per card") and step 5.
- `isometric-and-light.md` - the paper-white register corrected against
  measurement (true 30 deg, ONE stroke weight per card with colour assigning
  role, refused third face value, flat non-compounding shadows), plus A1a
  (grid pitch + shared world origin), A2b-A2g (module architecture, interiors
  that open, payloads, actors/apertures, motion grammar, timing) and the
  legal-transform contract.
- `quality-bar.md` - iso construction tells, illustration-bar items 7/8/9,
  and the rendered-**set re-test** inside the QA loop.
- `motion-grammar.md` rule 25 → poster frames · `graphic-language.md` R7 and
  `SKILL.md` C11 scoped to the register they were measured on.

**claude-desktop/infallible-rubin-183fb3** (`a7940e5` → …) - the site-build
session:
- internal codes (F1-F8, C11, Q3…) as a **ship blocker** in shipped copy, with
  a grep that proves it (it caught `<text>F1</text>` baked into
  `assets/families.svg`, which the README displays).
- `## The set law - a device is spent when it is used` and
  `## The fit-method runs at BUILD time` in `illustration-ideation.md`.
- **The four dials** (primitive · arrangement · depth · symmetry) - each card
  turns one notch on 3-4 independent dials while the finish is held fixed.
- `## 3b. The set bar` and per-screen-KIND budgets in `quality-bar.md`.
- `A2b. The generator` in `isometric-and-light.md`, the `One-Screen Catalog`
  recipe, plus the site itself (`docs/index.html`, the lock file).

## What conflicts, and how to resolve it

Dry-run merge of the branch into main: 5 shared files, 3 conflict blocks.

| File | Conflict | Resolution |
|---|---|---|
| `illustration-ideation.md` | 1 block: main's derivation ladder (Steps 1-7) vs the branch's "set law" + "fit-method runs at BUILD time" | **Keep both.** Order: fit-method → set law → derivation ladder → "runs at BUILD time" → device catalog. Keep main's fixed step 2 wording ("decided ONCE for the whole set"); the branch still carries the old "one per PROJECT, restated per card" line that both sessions independently identified as the root defect. |
| `quality-bar.md` | 2 blocks: main's illustration-bar items 7/8/9 + set re-test vs the branch's "3b. The set bar" + per-screen-KIND budgets | **Keep both.** They are the same finding from two angles: main adds non-transferability, one-register-per-set and the iso construction check; the branch adds the set bar and the KIND budgets. Fold the branch's set bar in as § 3b after main's item 9, and keep main's QA step 5 (rendered-set re-test). |
| `SKILL.md`, `isometric-and-light.md`, `recipes.md` | auto-merge clean | no action |

Both halves overlap in intent (a set of illustrations must be governed as a
set) and differ in mechanism: main tests each concept against its siblings
(swap + read-back); the branch constrains what a set may reuse (spent devices,
four dials). Together they are the complete rule. Delete neither.

## Recommended sequence

1. The branch session merges `main` into its branch BEFORE writing more skill
   docs, so it stops building on the stale fit-method text.
2. Resolve the three blocks as above.
3. Run `python3 scripts/validate-library.py` (must report 52 posts, 0 errors)
   and the code-leak grep from `a7940e5`.
4. Merge to main.
