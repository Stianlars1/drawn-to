# Drawn To repository notes

The portable skill lives in `skills/drawn-to/`. The repository README and skill
entry point describe the current routes. Historical plans under `docs/plans/`
are history, not the current source of counts or procedures.

- `references/posts/*.md` inside the skill is canonical for analysis and index metadata.
- `matrix.md` and `_index.json` are generated together by `scripts/rebuild-index.py`.
- `sources.json` records the latest supplied batch and joins its per-source evidence manifests.
- Reduced evidence ships under `skills/drawn-to/references/media/`.
- Original downloads and raw responses go to ignored `references/media/` at repository root.
- Source videos and full captures are kept out of the portable skill package.

Run `python3 scripts/validate-library.py` before delivery. It checks source
coverage, generated-index drift, post metadata, local links/citations, evidence
files and the project's 50 MiB payload budget. It does not prove visual quality
or certify inherited numerical measurements.

The September continuation recovered the interrupted work in
`.claude/worktrees/drawn-to-references-ef9f3c`, completed the missing analyses,
added inline article media and website assets, and corrected mode routing,
measurement assumptions and executable recipe defects. See the maintained
`references/september-expansion.md` for the design synthesis.
