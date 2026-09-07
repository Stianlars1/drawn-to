# Direction studio

The static `/generator` page turns deliberate visual choices into a Drawn To skill invocation. It offers all 70 showcase scenes and 376 independently selectable properties, two entry paths, and Full page, Section, Component and Graphic scopes. UI, documentation and generated instructions are English. There are no AI calls, accounts or runtime backend services.

## Source ownership

Maintain `skills/drawn-to/references/scene-contracts/<canonical-slug>.json`. Each property has a stable local ID, one role, canonical knowledge text and bounded supporting reference sections. Empty supporting sources identify original showcase knowledge. Scope source evidence carefully: a scene's orb inspiration does not automatically support its typography. Nonselectable context records hold complete-scene checks, runtime facts and other cross-cutting requirements.

`node scripts/build-generator.mjs` validates the contracts and frames, assembles the existing `showcase-styles.json` compatibility view, and emits a content-addressed browser catalog. Run `node scripts/build-showcase-prompts.mjs` next to regenerate full-scene exports. Do not hand-edit either generated view.

The receiving path is `skills/drawn-to/references/generator-handoff.md`. The exported prompt names exact property keys and supporting resources by target/role, includes the matching skill version's public URLs when available, and leaves consequential open decisions for the agent. It does not copy property appearance descriptions into a synthesized brief.

## State and recovery

Page defaults, section defaults and explicit choices have separate scopes. Explicit open/excluded roles mask inheritance; Reset restores it. Multiple sources in one role are recorded as a question, never silently blended. Registry-backed section kinds such as Pricing survive a share even when a private custom section name is omitted.

Default sharing includes structural selections only. Every authored string is excluded unless the user explicitly includes context and names. Links over 8000 characters use the same portable JSON download/import format. An imported/shared direction gets a new local draft ID. Existing local work remains available.

Local storage uses immutable revision records. Concurrent branches remain recoverable rather than overwriting one another. Storage failure preserves active drafts in this tab and offers download/copy; it does not claim durable saving. Recent drafts opens the actual latest saved revision, and recovery copies get separate IDs.

## Source snapshots and publication

Source JPEGs have content-addressed filenames and a verified frame manifest. A later capture cannot replace an earlier image. The catalog fingerprint binds the image hashes, exact contracts and knowledge revision. Keep published historical catalog files and their referenced image files together.

An unstamped catalog is explicitly local/unpublished. To create portable public handoffs:

1. Regenerate and verify the canonical knowledge, frames and compatibility outputs.
2. Commit and push those source files on the feature branch. Production publication is separate.
3. Run `node scripts/stamp-generator-source.mjs <full-published-commit-SHA>`.
4. The tool verifies authoritative files against the Git tree and anonymously checks both public guide resources before writing the stamp.
5. Run both generators, verify their `--check` modes and commit the final published catalog/manifest.

The stamp excludes itself and generated aggregates from the knowledge digest, preventing a circular commit reference. Source edits invalidate an existing published stamp. Mark a developing stamp unpublished until its changed source is actually available at a new immutable revision.

## Local preview and checks

`node scripts/serve-site.mjs 0` prints an available localhost URL and supports extensionless paths like production.

Run:

- `python3 scripts/validate-library.py`
- `python3 scripts/build-showcase-data.py --check`
- `node scripts/build-generator.mjs --check`
- `node scripts/build-showcase-prompts.mjs --check`
- `node --test tests/generator/*.test.mjs`
- `node scripts/verify-generator.mjs http://127.0.0.1:PORT/generator`
- `node scripts/verify-generator-engines.mjs http://127.0.0.1:PORT/generator`
- `node scripts/verify-prompts.mjs http://127.0.0.1:PORT/ .eval-output/prompts.json`

Browser scripts use an installed Playwright module through `PLAYWRIGHT_MODULE`; Chromium may use `CHROME_EXECUTABLE`. Firefox and WebKit use their installed Playwright browser executables. A WebKit pass is an engine check, not a claim of testing native Safari. Reports and screenshots are local evaluation artifacts.

Refresh source frames with `node scripts/capture-generator-sources.mjs http://127.0.0.1:PORT/`; `--only=plasma-study,auric-orbit` preserves other scenes. The operator may provide a verified `--source-revision` for capture provenance. The script does not infer the revision of an arbitrary server.

## Later element picker

The next milestone is an Auric Orbit pilot with an explicit Pick elements mode. It will reuse property contracts and the current compiler for Copy prompt/Add to generator. HTML elements and named 3D regions need intentional mappings; hovering an arbitrary DOM node cannot establish material/source provenance.
