# Material evidence - make the intended finish visible

Use with [three-dimensional craft](three-dimensional-craft.md) when a selected
reference depends on glass, ceramic, metal or other physically rendered objects.
This is an output review method, not a required renderer or a parameter preset.
The owner's material feedback on the 70-scene showcase prompted these checks.

## Specify an observable finish

A shader's material name is not its appearance. State the intended surface in
visible terms: clear polished volume with colored thick edges, satin nickel
with directional reflection, fired ceramic with a fine body beneath glaze.
Acrylic and glass can overlap optically; do not claim to identify a substance
scientifically from a screenshot. Here the concern is the chosen visual finish
and whether its cues survive the composition.

For each important material, record:

| Observable quality | How to inspect | What would reject this attempt |
|---|---|---|
| Transparent volume | A real background feature seen through the object, plus its unchanged part outside it; inspect more than one angle | Uniform tint is the only evidence; a painted overlay pretends to be transmission; no readable thickness cue |
| Reflection structure | Face, bevel and side under a coherent environment; inspect the light and dark intervals together | The whole metal face goes black, or a broad white reflection erases shape or labels |
| Surface scale | Whole scene, actual delivered pixels and a close crop at the actual DPR | Brushing/pores exist only in a parameter or disappear into mipmaps; texture shimmers instead of suggesting finish |
| Manufactured geometry | Cross-section, edge profile, apertures and interfaces | Rubber-like bevels on a machined part, overlapping caps, floating pieces or visible triangulation |
| Grounding | Contact and shadow softness/direction, including under each raised part | One generic oval is used as proof of contact everywhere, or light/shadow disagree |

The background landmark can be typography, a scene detail, a line or another
object that belongs in the chosen design. A diagnostic checkerboard is useful
in a test, but does not automatically belong in the delivered artwork. Keep the
landmark genuinely behind the volume. Compare its behavior with an opaque
material and with the background changed; feature detection alone is not proof.

## Diagnose before adding detail

A featureless reflection often comes from the lighting environment or a planar
surface. Increasing transmission, metalness, bloom or texture count will not
necessarily repair it. Inspect normals, face curvature, UV/tangent direction,
lighting coverage and the actual transmission input first.

A shallow crown added without coherent tessellation produced visible facets in
one trial. It was rejected. More geometry is not progress when it introduces
surface seams. Use a continuous, reviewed construction or retain the simpler
geometry and solve the actual lighting/composition problem.

Brushing and ceramic pores have a delivered spatial frequency. Extremely fine
noise may average to one value at the target size. Review the filtered result;
use multiscale detail where needed, with plausible intensity and no exaggerated
dirt to prove that a clean material has a texture.

For physical labels, inspect the brightest reflection state as well as the
resting shot. The surface can be expressive without washing out the information.
Essential UI text can remain a semantic foreground layer where appropriate.

## Do not move the quality threshold after a failed render

Keep three conclusions separate:

- The interaction and renderer work.
- The page is internally coherent and readable.
- The selected reference's important finish is present.

Record an actual-size crop and a complete frame for the last two. Name the
remaining gap rather than calling any improvement reference parity. A passing
script does not classify a material as luxurious. Use the owner's criticism to
revise the observable criteria, then rerun the same case. Do not invent a new
universal aesthetic prohibition from one rejected look.

## Source and implementation boundaries

The [material reference](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)
describes physical transmission, attenuation, anisotropy and related properties.
Those controls are implementation tools, not guarantees of the desired image.
Read the installed renderer when diagnosing its actual limits. The showcase's
`graphics/three-stage.js`, `graphics/optical-bench.js` and `graphics/models.js`
provide one original implementation and a calibration plane; they are not a
portable dependency every host must install.


## Concrete calibration examples

These are our own browser outputs, earlier result at left and refinement at
right: [glass transmission](../assets/studies/glass-refinement.jpg) and
[physical schedule](../assets/studies/schedule-material-refinement.jpg).
They demonstrate specific changes, not a blanket claim of reference parity.
Read the actual-size scene and temporal behavior as well as these reduced views.
