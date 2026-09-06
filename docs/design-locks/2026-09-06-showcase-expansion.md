---
task: Expand the Drawn To showcase from 30 screens with new reference-led output
product: Drawn To visual reference library and design-direction skill
target: site/
status: locally-verified
language: English
source_baseline: aee73857e8df41eff44b804bcdb4a58f88a74ebe
---

# Showcase expansion

The user requested 10-20 additional screens based on the new supplied references,
and exploration of Three.js, 3D models, rendering, GPU/WebGL and related
showcase examples. The owner selected 15 additional screens. This adds to the
existing 30-screen catalog; original direction IDs and navigation remain valid.
The user also requested visual output testing of Drawn To, skill corrections
and retesting. Those independent baseline trials precede the final skill patch.

## Confirmed constraints

- The site's role remains proof of the skill's range, with varied real content
  about Drawn To. It is not a new paid product or a claim about invented customers.
- Keep the persistent transport at one viewport position and retain manual keys,
  URL-selected screens and reduced-motion behavior. New interactive controls
  must not accidentally trigger the page-level arrow/space shortcuts.
- New screen IDs are descriptive lowercase slugs, avoiding the macOS screenshot
  filename collision between existing lowercase/uppercase one-letter IDs.
- Use the skill's new role-based interpretation: landscapes, collections,
  onboarding and brand art do not need invented technical claim diagrams.
- Use original artwork and geometry. Reference media remains study material.
- Three.js is locally pinned; renderer modules load only for applicable screens.
  A departing page disposes its scene, listeners and animation work. Every GPU
  screen has a composed poster/fallback and a controlled clock for QA.
- No external deployment or push is included in this local build request.

## Delivered compositions

The final 15-screen inventory, reference mapping and rendering choices are in
[showcase.md](../showcase.md). It spans an illustrated close, two character
surfaces, arch imagery, a spatial collection, action/result, a pixel chooser,
rolling weights, an explanatory menu, working widgets, a glass identity, physical
schedule, iridescent ribbon, particle field and imported model/material study.
The working-widget and menu pages widen the interaction vocabulary; one particle
scene combines gather and flowing release, avoiding two near-identical fields.
These are evaluator design decisions within the owner's approved varied scope,
not invented exact style weights attributed to the owner.

## Quality calibration from owner review

The owner rejected a merely clean/basic bar and explicitly asked for the
references' depth, details, materials, reflections, light and attention to detail.
The initial functional/role-coherence review was too permissive for this goal.
Reference-level finish is assessed separately and weak scenes are refined before
handoff. A working Three.js shader or an attractive palette is insufficient.

The original warm-footer trial reached a coherent illustrated finish and was
checked again unchanged. The kinetic collection was retested with spatial depth
and foreshortening, preserving its original content and assets. The
first GPU studies showed washed-out glass/ribbon materials and generic schedule
bars; these are retained as before evidence and are the concrete basis for the
new three-dimensional craft guide.

Cycle pause and scene motion are separate: `?still` holds the catalog on one
page while its scene can run. `?poster` or `?t=0` requests a composed still
for QA. Per-page motion controls and reduced motion retain their own behavior.

## Verification record

- New screens: 15, captured at 1440x900, 1280x720 and 390x844; no observed
  essential-content overflow, broken image, scene mount or page errors.
- Three output trials: original baselines retained; targeted onboarding error
  refinement and spatial-collection retest completed. These are guided retests,
  not a fresh blind generative benchmark or a proof of universal output quality.
- Catalog: all 45 routes smoke-tested; navigation/reload, input-key isolation,
  actual clipboard result, renderer teardown/late loads, reduced motion,
  Save-Data and poster controls verified.
- Graphics: actual native WebGPU and forced WebGL2 rendered; Three.js uses actual
  WebGL2 and the material study imports the original GLB. Desktop/mobile posters
  were regenerated from final scenes. No GPU frame-time claim is made.
- Visual judgment: initial missing spatial/material detail was corrected. The
  final finer finish qualifications are recorded in showcase.md. Functional pass
  does not imply every screen equals its reference.
- Not checked: physical mobile devices, Safari/Firefox and full screen-reader
  session. No push, deployment or public live verification in this local scope.
