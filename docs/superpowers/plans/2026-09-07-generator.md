# Drawn To Generator Implementation Plan

> For agentic workers: use subagent-driven-development for bounded tasks and review the combined result. Execute the owner's approved plan without reopening settled choices.

**Goal:** A complete static visual reference generator whose selections invoke exact Drawn To skill contracts.

**Architecture:** Skill-owned atomic scene contracts generate the legacy aggregate and an immutable browser catalog. Pure selection/compilation/persistence modules drive a source-led interface. External inspiration and original scene work remain separate.

**Tech Stack:** Native JavaScript modules, CSS, HTML, Node built-in tests, existing Python library validation and Playwright browser verification.

**Spec:** `docs/design-locks/2026-09-07-generator.md`.

## Global constraints

English UI/exports/docs; no AI/backend; 70 presets; four target scopes; all selected properties directly addressable in skill; pure deterministic compiler; open decisions do not inherit; local drafts and private-by-default versioned sharing; preserve current pages and aliases. Worktree only. No production publication without later approval.

## Shared interfaces

Canonical files: `skills/drawn-to/references/scene-contracts/<canonical-slug>.json`.

```json
{"schema":1,"id":"legacy-or-modern-id","slug":"canonical-slug","name":"Existing style name","kind":"hero","references":[],"implementation":[],"art":"Original asset requirement","properties":[{"id":"shape","role":"shape","label":"Visible, specific label","text":"Atomic original showcase contract.","selectable":true,"sources":[{"id":"full-library-slug","section":"Exact existing heading"}]}],"sections":{"composition":["shape"],"surface":[],"behavior":[],"checks":[]}}
```

Roles are `layout,typography,color,shape,graphics,material,light,motion,interaction,context`. `context` is never selectable. At most one selectable property per role per scene. Preserve all existing visual detail and asset/check facts in canonical text; split unrelated clauses into separate properties/context records. Every property belongs in exactly one or more assembled scene sections. Cite only supporting post sections. Empty external sources means the original scene contract is the source, not an invented reference. Public property ID is `<slug>::<property.id>`.

Browser catalog:

```json
{"schema":1,"id":"content hash","sourceRevision":"git commit","sourcePublished":false,"scenes":[{"id":"canonical-slug","legacyId":"a","name":"Title","kind":"hero","thumbnail":"assets/generator/scenes/slug.webp","properties":["slug::shape"],"defaults":{"shape":"slug::shape"},"url":"/?still#slug"}],"properties":{"slug::shape":{"id":"slug::shape","sceneId":"slug","role":"shape","label":"Specific label","text":"Canonical contract","path":"references/scene-contracts/slug.json","key":"shape","sources":[]}},"roles":[{"id":"shape","label":"Shape"}]}
```

State: `{schema:1,catalogId,scope,name,targets:[{id,kind,name,baseScene,choices:{role:{mode:'selected'|'open'|'excluded',propertyIds:[]}}}],context:{product,platform,intent},updatedAt}`. `targets[0]` is `page` for Full page, otherwise the single active target. Page targets supply inherited defaults to sections. Internal IDs are generated and user text never enters structural IDs. Scope values `page,section,component,graphic`.

`createDirection(catalog, {scope, sceneId, example})`; `resolveTarget(catalog,state,targetId)` returns role rows `{role,mode,origin,propertyIds}`; `reduceDirection(catalog,state,command)` returns new state without mutation. Commands: scope, base, choose, open, exclude, reset, context, rename, add-target, remove-target, move-target, duplicate-target. `compilePrompt(catalog,state)` returns `{text,sources,open,issues}`. Compiler must not copy property appearance prose into output.

UI exports `mountGenerator({catalog,initialState,services})` from `site/js/generator/views/workspace.js`; root entry owns catalog loading and persistence and injects `services` (`loadDrafts,saveDraft,share,download,importFile,copy`). Core exports live in `core/state.js`, `core/prompt.js`, `core/codec.js`, `core/drafts.js`. Pure modules use `.js`, with `site/js/generator/package.json` type module.

## Tasks

- [x] 1. Curate 70 atomic canonical scene contracts in two nonoverlapping sets. Preserve original full-scene facts; verify every cited section. Root validates count, assembly and positive property scope.
- [x] 2. Add catalog builder and validator; derive legacy showcase-styles.json from contracts; update maintenance docs and new generator receiving path in the skill. Validate with existing library scripts and all70 prompt generation.
- [x] 3. Write meaningful failing state/compiler/codec tests, run RED, then implement pure modules. Assert the three-property particle-orb case, open masking, explicit override preservation, target inheritance, deterministic export and privacy/round-trip constraints.
- [x] 4. Build visually ambitious responsive workspace using real catalog/API. Create `generator.html`, scoped CSS, view modules, dialogs, source inspection and source-to-choice motion. Inputs use delegated commands and textContent/escaped output. Root integrates without changing core interfaces.
- [x] 5. Capture all70 reproducible actual showcase thumbnails; wire Use in generator in shared scene header. Verify aliases and header sizing.
- [x] 6. Integrate separate drafts, strict share/import codec, immutable catalog snapshots, explicit context disclosure and storage/multitab recovery. Exercise clipboard denied, no storage, malformed catalog and long input paths.
- [x] 7. Run browser flows and visual QA at target sizes. Fix material gaps, then independently review spec compliance and implementation. Exercise matching/outdated/absent skill handoffs and small controlled output trial.
- [ ] 8. Record evidence, create a reviewable branch/PR if tooling permits, and present local/deployed preview separately from production release. Later picker stays queued as agreed.

## Initial rulings

- Source publication: a local development catalog must say its source revision is not published. A final public source manifest is stamped only after the canonical contract commit exists remotely; no fake pinned URLs.
- Generated aggregates are compatibility views, not another maintained knowledge database.
- Work ownership is nonoverlapping: two contract authors own their assigned JSON files; interface author owns HTML/CSS/views; root owns core, catalog build, receiving guide, integration and tests.
