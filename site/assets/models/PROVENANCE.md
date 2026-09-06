# Folded aperture

`folded-aperture.glb` is original geometry authored for Drawn To on 2026-09-06.
It is not a downloaded third-party model. Rebuild with
`node scripts/export-showcase-model.mjs` from the repository root.

`foldMark()` in `site/js/graphics/models.js` is the single geometry definition.
Its base outline is 2.2x2.4 scene units, with .30 extrusion, .13 bevel size and
.14 bevel thickness. The centered mesh pivots at the origin. The group pose is
(.12, -.48, -.15) radians. The flat mark uses the same aperture outline with
intentional small-size optical simplification. The GLB is texture-free; the
live viewer applies ceramic, brushed metal or transmissive glass in one shared
studio environment. Geometry units are arbitrary scene units, not a physical
manufacturing specification. Repository MIT terms apply to this original model.
