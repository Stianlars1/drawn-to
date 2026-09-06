# Library maintenance

Use for adding references or reviewing the skill itself. Do not run a product
scope/style interview merely to maintain the library. Ask for missing intent
when it would change the work; preserve the user's ratings without inventing
weights or treating duplicates as additional votes.

## Source coverage

1. Preserve the requested URL list. Normalize X post IDs and their photo URLs;
   explicitly record malformed joins, duplicates and unavailable sources.
2. Open the original source. If the page cannot be retrieved, record the error
   and use an available public metadata/media endpoint with attribution. Do not
   claim a page was viewed merely because its media was downloaded.
3. Retain all available post media, article covers and inline article images.
   A linked website is a separate capture, even when it belongs to the same
   reference. Distinguish original post, later website and authoring-tool UI.
4. Keep original files and raw metadata in the local archive. The portable skill
   carries reduced visual evidence and minimal provenance, not source video or
   full author profiles. Failed downloads do not count as completed sources.

## Visual analysis

Use `measuring.md`. For video: record source dimensions, duration, rates and
presentation-timestamp limits; inspect a uniform timeline plus important state
changes and larger favorite details. Record actual samples. Do not claim a
frame-by-frame manual review from a contact sheet or an inferred FPS.

For each source explain what is visible, hierarchy, composition, type/material,
motion when evidenced, why the reference helps, transferable decisions and
limitations. Articles and tool tours need process/resource analysis, not an
invented card anatomy. Distinguish measured source quantities, visual estimates
and suggested implementation tokens. A detail can be useful without fake precision.

Study favorites more closely across ALL dimensions; do not assume which quality
the owner liked. Separate the owner's exact wording from the reviewer's reading.
An attractive reference can contain defects, but compare against actual usability
and the intended visual role, not a prohibition imposed by an unrelated recipe.

## Integration

- `posts/<slug>.md` is canonical for description and index metadata. It includes
  slug, URL, author, kind, mode, motion, summary, radius, density, illustration
  and stable order. Use `media_status: text-only` only for an explicitly
  media-free source. Source-space radius measurements do not become CSS tokens.
- `matrix.md` and `_index.json` are generated from that metadata. Do not hand-edit
  one while leaving the other stale. Source manifests retain input coverage and
  per-asset hashes; they are not a replacement for qualitative analysis.
- Add useful patterns to the relevant recipe/dimension/method document. Update
  active instructions in place when evidence refutes them; do not leave a wrong
  recipe active and append a contradicting correction at the end.
- Keep `SKILL.md` a short task router. Store the lock template and illustration
  interview in their own documents so approved work can skip the interview.
- Check that a new direction is supported end to end: scope question, proposal,
  recipe, implementation advice and QA must all permit it.

## Repository helpers

These tools live in the [taste repository](https://github.com/Stianlars1/drawn-to),
not inside an installed portable skill. They use Python's standard library:

```sh
# Explicit IDs are best for an incremental batch. No publish or install occurs.
python3 scripts/fetch-posts.py --ids 2095991462416490862
python3 scripts/rebuild-index.py
python3 scripts/validate-library.py
```

The fetcher chooses the highest-bitrate offered MP4, includes article imagery,
keeps originals under ignored `references/media/`, validates responses before
replacing files, and resumes successful downloads. `--metadata-only` performs a
metadata pass; `--metadata-cache` accepts FULL API responses. Minimized published
metadata is not a raw cache. Frame extraction and reduced packaging are deliberate
curation steps, not hidden side effects of fetching.

Before delivery, validate index drift, source coverage, paths/citations, evidence
files and package size. Run realistic behavioral trials for a substantial skill
change, plus executable checks for changed code recipes. A passing metadata check
does not prove taste, every numeric claim, accessibility or production runtime.
Report exactly what was reviewed and what remains unverified. Keep installation,
commit, push and publication distinct; external publishing requires its own scope.
