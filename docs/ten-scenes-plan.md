# Ten scenes implementation plan

Goal: 55 working showcase pages, ten new material-rich scenes, curated opening.
Spec: `docs/design-locks/2026-09-06-ten-scenes.md`.
The owner's existing direction and current mixture/publication answers authorize
implementation; the process does not restart a previously completed interview.

- [x] Create original artwork for the five image-led compositions, inspect it,
  save prompts/provenance under `site/assets/atelier/`, and choose mobile crops.
- [x] Add `js/catalog-order.js`, consume it in `catalog.js`, make home links use
  the opening ID, and verify `new Set(ORDER).size === 55`, existing IDs and wrap.
- [x] Build `js/atelier/runtime.js` and per-scene modules with
  `mountStudio(host, {kind, signal, reducedMotion, still}) -> cleanup`.
  Scene state exposes narrow QA hooks for deterministic frames/poster export.
- [x] Build `js/expansion/studio.js` and `css/atelier-studio.css` for optical type,
  woven spectrum, aperture control and chromatic relief. Each control has a
  visible result and keyboard route; canvas-only concepts get readable DOM text.
- [x] Build `js/expansion/atelier-editorial.js` and `css/atelier-editorial.css` for
  night garden, paper theatre, living terrarium and red chamber. Use distinct
  composition, crop and type roles, never generic image-in-rounded-card filler.
- [x] Build `js/expansion/atelier-collection.js` and `css/atelier-collection.css`
  for specimen cabinet and contact sheet; selections, detail views and ordering
  must be real and retain semantic buttons/dialogs.
- [x] Integrate assets and modules through `site/index.html`. Check deterministic
  arrival and page chrome at each target size before choosing final posters.
- [x] Extend `scripts/verify-showcase.mjs` for 55 IDs, the reordered neighbor
  assertion, new interactions, forced posters and the four new GPU owners.
  Run the browser checks against the actual site, not a mocked scene adapter.
- [x] Capture all ten at three sizes and meaningful alternate states, review
  against the recorded craft promise and reference material, then fix/retest.
- [ ] Update showcase docs, commit/push, verify Vercel production and exact assets,
  and save a self-contained delivery/review under outputs/ten-scenes.
