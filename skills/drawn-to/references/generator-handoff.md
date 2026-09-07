# Receive a generator direction

Use this workflow when a prompt says it was exported by the Drawn To generator and names exact property contracts. Those selections are an approved, scoped direction. The generator does not replace the skill's discovery, questions, design record, implementation or visual review.

## Resolve the selected knowledge

The handoff names a generator contract version, a catalog ID and its knowledge source revision. Current receiving contract: **1**. Read the matching skill entry point, this guide and the selected files under [scene-contracts](scene-contracts/). Each file has independently addressable `properties` with stable local IDs, role, label, canonical text and supporting `sources`. A public property ID is the scene's canonical slug followed by `::` and the local property ID.

Match both the file and property key. A property ID is a precise reference, not a term to search approximately. Read the property's canonical text and the specified sections of supporting post files. Follow their relevant media links to inspect the visual evidence. Original showcase knowledge is explicitly valid when `sources` is empty; do not invent an external attribution. Scene-level inspiration does not automatically support every property. Auric Orbit and Plasma share an orb inspiration but have different original contracts.

The complete compatibility profiles in [showcase-styles.json](showcase-styles.json) and original full-scene exports are assembled from these same atomic contracts. Generator instructions select individual contracts instead of requiring the user to paste a complete scene description.

If an installed skill is older or incompatible, use the handoff's revision-pinned public entry point and selected resources as one coherent version. A missing installation can use those public resources without changing a global installation. Do not mix current local knowledge with an older exported selection merely because the filenames match. If matching resources cannot be read, name the exact missing files/keys and ask for access; continue only with work independent of those missing references. An unpublished local catalog has no public fallback; say so rather than inventing a URL.

## Read the selections by target and role

A direction can concern a full page, a section, a component or a graphic. In a page, shared defaults and each section's selections have separate scopes. Apply a scene's composition only to its selected surface.

- Selected properties apply only in the named role and target.
- An inherited property is a resolved default, not permission to import the entire source scene.
- An explicitly open role masks the source's default. It remains a question where consequential.
- An excluded role is outside the requested transfer.
- Multiple influences within one role remain a relationship to resolve with the user. Do not silently choose a dominant reference or invent blend percentages.

The particle-orb example selects Plasma shape and color plus Particle Assembly graphic construction. It does not select that particle source's numeric subject, page layout, palette, controls or gather/release behavior. Its layout, typography and motion remain open. Read the particle source's relevant graphic evidence; its discussion of a criticized landing page is not an instruction to reproduce that page.

## Continue the work with the user

Read the existing project, established infrastructure and any prior approved direction. Follow [discovery](discovery.md). Reuse known product facts rather than restarting an interview. Ask one to three focused questions at a time about consequential gaps: purpose, placement, content, subject, assets, target platform, behavior and relationships between selected sources.

Do not reopen the visual choices the user already made. Distinguish a chosen visible quality from the implementation used in the showcase. A three-dimensional appearance does not itself require Three.js; a source parameter or benchmark does not establish runtime quality for a new project.

Use the skill's [question flow](question-flow.md) for actual open decisions and record accepted choices in the [design lock](lock-file.md). Preserve the source-property-target connections in that record. Mark new combinations as proposed adaptations, with observable acceptance criteria derived from the selected properties.

Once the requested scope is authorized, implement and verify through [quality bar](quality-bar.md), plus relevant material, causal-effect, layout and motion guidance. Compare whole composition and close details at desktop and mobile sizes. Review normal behavior, interruption, reduced motion and fallback states where meaningful. A source resolves only as metadata until its selected quality is actually present in the output. Report remaining differences and refine substantial gaps.

## Maintain the shared source

Edit the canonical JSON files under `references/scene-contracts/`. Keep independently selectable properties atomic. Use nonselectable context records for full-scene requirements that cannot honestly be assigned to one property. Cite exact existing post headings only where the post supports that property. Inspect the source before adding an attribution.

Run `node scripts/build-generator.mjs`, then `node scripts/build-showcase-prompts.mjs` from the repository root. The first regenerates the full-scene compatibility profile and browser catalog; the second regenerates the existing scene prompts. Run their `--check` modes and the library validator before delivery. These scripts belong to the repository, not a portable installation requirement.

Published generator catalogs are immutable generated archives, not another editable knowledge source. Stamp a public source revision only after its matching skill files exist at that revision. Keep older published snapshots for old shared directions; a migration creates a new copy and explains changed or unavailable properties.
