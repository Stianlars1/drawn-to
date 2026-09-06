# Three-dimensional craft - geometry, material, light and delivery

Use when a direction depends on modeled objects, physical material, spatial
image collections or a live GPU field. This is the craft layer above
`render-tiers.md`: a renderer that runs correctly can still look basic.

The September showcase exercises actual Three.js/WebGL scenes, an original GLB
and a native WebGPU particle field with a WebGL fallback. Implementation lives
in the taste repository under `site/js/graphics/`; it is an example to inspect,
not a dependency every installed skill must load. Source references:
DmitryLepisov-2093247, nilseller-2093007, basit_designs-2095821,
krispuckett-2095994 and hugorcd-2092999.

## Start from the visible evidence

Name what makes the chosen reference distinctive before selecting technology:

- **Geometry:** silhouette, thickness, bevel profile, apertures, face changes,
  joinery and small details that remain meaningful at delivered size.
- **Material:** rough/smooth regions, transmission through thickness, reflection
  structure, directional brushing, scattering or a deliberate print process.
- **Light:** key direction, softbox shapes, dark regions between reflections,
  contact and cast shadows, reflected color and the relation to the backdrop.
- **Camera:** perspective/orthographic choice, scale, viewing angle and a focal
  hierarchy. Shallow depth of field belongs to showcase artwork, not essential
  editable UI text.
- **Motion:** what actually changes in space, which surfaces reveal themselves,
  and what remains fixed. Flat circles following one oval do not recreate the
  spatial character of a depth-varying photographic flow.

Record the few load-bearing qualities for this scene. Do not invent a universal
number of layers, lights or polygons. The point is to preserve the craft that
made the reference worth choosing, while making original work.

## Choose the route for the image you need

| Need | Useful route | What it must prove |
|---|---|---|
| A finished character, optical scene or detailed static illustration | Original generated/commissioned asset or prerender | Real material/detail and a crop that belongs in the layout |
| Physical object with changing view, light or material | Three.js or an existing 3D renderer | Actual geometry, credible lighting and reliable resource ownership |
| Designer-supplied model | glTF/GLB through the project's loader | Correct scale, materials, normals, textures, transforms and provenance |
| Many particles, per-pixel fields or computed image treatments | WebGL, WebGPU, or vgpu where its current API fits | Visible intended effect, actual backend recorded and fallback tested |
| Photographic collection with spatial motion | CSS 3D or a coordinated scene renderer | Original image quality, foreshortening/depth and protected reading zones |
| A composition whose appearance is fixed | Still/poster | The same visual standard without unnecessary runtime work |

Three.js is not evidence of quality by itself. A rounded box plus a shiny
material is a primitive, not automatically a finished product rendering.
Likewise a still or CSS implementation can be excellent when it actually
achieves the intended image.

## Model and scene contract

For a modeled study, record enough to reproduce the shot:

1. Subject and original asset/source, units, bounding box, origin and pivot.
2. Silhouette and important cross-sections; bevel radius relative to thickness.
3. Material roles per surface: base color, roughness, metalness, transmission,
   thickness and any normal/roughness/color texture, with their color spaces.
4. Environment and key/fill/rim roles; tone mapping, exposure and output space.
5. Camera/projection, framing, ground/contact relationship and static pose.
6. Animation driver, allowed user interaction, pause state and cleanup owner.
7. Poster and failure path, with the same crop and semantic composition.

The values chosen for a new scene are implementation decisions, not measurements
of an unknown source renderer. Pin dependencies and verify APIs against their
current official documentation or installed source.

## What the first showcase drafts taught us

These were visible weaknesses in working renders, not hypothetical rules:

Own browser comparisons (first result on the left, revision on the right):
[spatial collection](../assets/studies/kinetic-before-after.jpg),
[physical schedule](../assets/studies/schedule-before-after.jpg),
[ribbon reflections](../assets/studies/ribbon-before-after.jpg).
Open the relevant comparison rather than trusting the improvement label. These
are reduced overview images, not source measurements or proof of all motion
phases. The revised schedule still has simpler directional brushing than its
reference; improvement and equal finish are separate conclusions.

### Glass that reads as plastic

Enabling transmission and lowering roughness was insufficient. A nearly uniform
mint face on a flat background read like an opaque molded token. Judge what is
visible through the volume, how edges accumulate color, the sharp/soft
reflection shapes and the contrast between front face, bevel and side wall.
The environment is part of the material's appearance. Do not fix an unreadable
material by blindly adding bloom or turning exposure up.

### A ribbon with color but no convincing folds

The first ribbon was a broad pale surface with weak dark intervals. It had
iridescence enabled yet lacked the reflection structure and shaped folds that
made the source arresting. Inspect silhouette, cross-section, twist, normals,
reflection bands and the dark side of each fold. Close/weld continuous geometry
where needed; overlapping thin surfaces and inconsistent normals can create
seams or shimmer. Changing a palette alone does not repair this.

### A physical schedule that is only extruded bars

Extrusion supplied depth but not the source's workmanship. Legible direct labels,
precise grid/row relationships, thin status slits, bevels, directional highlights
and contact shadows establish the object. Brushed metal requires a directional
material cue; a uniform shiny gray fill is not equivalent. Preserve meaningful
micro-detail at actual size without filling the stage with unrelated controls.

### A lit ground that becomes a visible rectangle

The first studio plane lit to a different value than the page and introduced an
unintended horizon/rectangle. Compose background, receiver and light together.
A shadow-catching plane can preserve a shared backdrop while receiving real
shadow; an intentionally bounded stage is also valid. The boundary must belong
to the composition rather than reveal an implementation accident.

### A particle field that is only a starfield

The first particle implementation formed a silhouette but released into an
even scatter. The reference had coherent strands, concentrated light and
foreground/background structure. A larger particle count alone would not
repair that. The revised study clusters initial density, uses a shared curved
wind field, aligns short trails to projected velocity and varies size/brightness
with depth. Field edges taper before they expose a rectangular canvas boundary.
Check gather, transition and release at normal speed and in composed frames.

### A spatial collection clipped by an invisible box

The first deeper image flow gained foreshortening but cut pictures at internal
top/bottom boundaries. Numerically clear text was not enough: those hard seams
made the composition look accidental. The revised path checks projected plane
corners against the text and chrome, while images crop only at a real viewport
edge or an intentional frame. Inspect the actual images, not just their collision
rectangles.

## Lighting and material checks

Inspect the scene at the intended output size and in a close crop:

- Does the object read through its silhouette before the shader detail?
- Are there distinct face/bevel/side/reflection roles, or one washed-out value?
- Do specular highlights reveal curvature and thickness? Are dark intervals
  preserved where the material needs them?
- Does transparency reveal a volume or simply resemble low opacity?
- Do shadow direction, softness and contact agree with the lighting story?
- Do small joins, controls, labels and edge profiles survive delivery size?
- Are there visible seams, z-fighting, wrong-sided faces, clipped bloom or a
  backdrop boundary that was never designed?
- Does a small flat mark preserve the same recognizable geometry as its large
  model, allowing deliberate optical simplification rather than a different mark?

A scene can be technically correct and still miss these checks. Compare its
appearance to the chosen reference before declaring the material successful.

## Runtime and proof

- Load the renderer only when its scene is needed. A catalog should have one
  active scene owner, with cleanup on departure and safe handling of late async
  loads. Dispose geometry, materials, textures, render targets, shadow targets,
  listeners, observers and animation work that the scene owns.
- Combine visibility, intersection, reduced motion, Save-Data and user pause into
  one eligibility decision. Do not let one listener restart work forbidden by
  another condition. Keep the static composition useful.
- Record the actual backend. `navigator.gpu` existing does not prove an adapter,
  valid pipeline or successful WebGPU draw. Inspect compilation messages and
  rendering; test a forced WebGL/poster path separately.
- Treat shader warnings/errors as evidence to resolve. A fallback that silently
  hides a compilation error is not a successful WebGPU demonstration.
- Measure what is actually measured: JavaScript submission time is CPU time,
  not GPU frame time. Hardware, resolution, DPR and active material features
  affect performance. Use GPU timing support where available and label gaps.
- For models, verify the imported GLB in the same lighting as the procedural
  source. Re-export from one geometry definition rather than maintaining two
  silently diverging shapes.

## Current source pointers

Three.js `MeshPhysicalMaterial` documents transmission, iridescence, anisotropy
and their cost, and recommends an environment map. See the
[material reference](https://threejs.org/docs/pages/MeshPhysicalMaterial.html).
Renderer behavior and cleanup are documented in the
[WebGL renderer](https://threejs.org/docs/pages/WebGLRenderer.html) and
[cleanup guide](https://threejs.org/manual/en/cleanup.html).
The newer [WebGPU renderer guide](https://threejs.org/manual/en/webgpurenderer.html)
explains its backend path; do not equate it with native WebGPU support in every
browser or with an unchanged WebGL shader API.

For vgpu, read the current [official documentation](https://vgpu.sh/) or its CLI
for the installed version before using a remembered snippet. The locally listed
skill snapshot was 0.3.1 while package metadata reported 0.4.0 during this run;
version drift is a reason to inspect, not to guess the API.
