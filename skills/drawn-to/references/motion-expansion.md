# Motion, optical volume and inspectable objects

The 2026-09-07 expansion studies 35 supplied URLs belonging to 23 posts:
19 new references and four revisits. All 35 original post media files were
retrieved; a linked tutorial contributes ten more media files. These 45 files
contain 44 unique byte payloads. The 19 video files total about 354 seconds.
Analysis uses 304 overview frames, a continuous 4fps low-resolution activity
pass and selected 8fps native-resolution transition windows. These are sampled
readings, not a claim of manually reviewing every frame.

X's direct web fetch returned HTTP 403 for the supplied URLs. Public metadata
and original media were retrieved separately. The Orbkit, Soundscape, vgpu and
Hermeus websites were opened independently; their current pages are distinct
from what the recordings establish. Keep this boundary in later specifications.

## Distinct visual directions

| Direction | Essential qualities | References |
|---|---|---|
| Optical/mineral orb | Defined limb, internal density, angle-sensitive highlights, coherent state response | [Orbkit](posts/zzzzshawn-2096548536972370319.md) |
| Cinematic optical environment | Monumental scale, architectural opening, transmitted/reflected sky, grounded water | [Architectural hero](posts/JameslabiQ-2096555751133376528.md) |
| Inspectable mechanical object | Subassemblies, contact interfaces, bevels, roughness contrast, articulated internals | [Camera workbench](posts/omarsar0-2096339043919237288.md) |
| Synthetic portrait | Matte face, layered mechanical enclosure, luminous visor, deliberate negative space | [Portrait hero](posts/_heyfaisal-2096513753865240860.md) |
| Phosphor/matrix material | Crisp cell gaps, dark unlit cells, signal geometry beneath emission and bloom | [Matrix](posts/eve_bouff-2096417545096200466.md), [macro halftone](posts/mnowakdesign-2091952693279436862.md) |
| Modular instrument | Distinct useful modules, consistent controls, precise values and signal evidence | [Soundscape](posts/emilwidlund-2093066923693011027.md), [industrial panel](posts/SebCornelius-2092618652994744578.md) |
| Living diagram | One semantic clock, coherent packet/shape identity, deliberate transitions and holds | [Fanout](posts/jeetnirnejak-2092611495448445101.md), [particle method](posts/semochkin_alex-2091816203383664688.md) |
| Spatial linework | Consistent projection, contour/ruling agreement and disciplined annotations | [SVG wave](posts/kairevicius-2090424600886759913.md), [wire posters](posts/its_sslvr-2092129852514029770.md) |
| Warm illustrated environment | Material contrast, layered terrain, readable sky and real foreground detail | [Terrain UI](posts/sinvpasha-2092537706446299362.md), [four hero directions](posts/Talhadesignn-2093215721954377839.md) |
| Optical type distortion | Physical motivation, localized deformation, stable reading block and readable rest | [Heat typography](posts/RobertJohns-2090832456081608791.md) |

## The renderer is a consequence of the effect

Choose among authored video, detailed still art, procedural shader, actual 3D
and projected SVG after identifying what must change. A camera with explodable
internals needs coherent geometry. A cinematic portrait can use an authored
asset. A constrained wave sheet can be native SVG. Dense surface or volume
fields often benefit from a fragment shader. Do not add Three.js solely because
a reference appears spatial, or replace a rich material with a generic gradient
merely because CSS is easy to write.

For orbs, distinguish opaque displaced stone/metal, transmissive shell,
volumetric scattering, emissive filaments and a patterned disc. Their lighting,
internal structure and silhouette behavior differ. An internal gradient with a
circular clip is not automatically a glass or volume model. Define object scale,
limb behavior, roughness/thickness, light source, density and state response
before tuning color. See [material craft](three-dimensional-craft.md).

For video-driven surfaces, specify resting frame, play trigger, completion,
interruption and reversal. Hover has a focus/tap equivalent. A decorative loop
pauses offscreen and under reduced motion; one-shot inspection returns to a
composed state. Use a stable poster during decode and avoid fetching every
catalog video's bytes at startup. A montage's cut timing is not an effect's
animation duration.

## Input, time and composition

- Keep text and controls independent of the rendering surface. A small semantic
  API or data attributes can connect choices to a scene without baking labels
  into a texture or video. Retain an accessible equivalent for canvas text.
- Use a single logical clock for a coordinated sequence. Continuous geometry
  can derive from that clock while status labels change at meaningful events.
  Delay, work and merge are different states, not arbitrary stagger decoration.
- Reuse stable particles or vertices through morphs. Define authored target
  geometry and avoid an accidental intermediate stall. A deliberate hold should
  communicate something; it should not conceal a broken transition.
- For inspection, expose a real surface, layer or material difference. A hover
  glow alone does not fulfil a promised exploded view or material comparison.
- Match mobile composition independently: position, camera, crop, type size and
  input path. Keep essential controls and visual evidence available. If a scene
  cannot fit, give it a deliberate detail view or readable scroll region.

## Craft review

Review the image/object at whole-frame and close-up scales. Check contact,
edge thickness, seams, material separation, internal density, reflection shape,
light direction, geometry continuity and texture frequency. Verify the complete
motion arc and reversals; compare start, peak, intermediate and rest states.
A detailed object can still fail if the page places text across its most active
region or hides its distinguishing feature on a phone.

Test actual renderer cost at the delivered size and DPR. Stop hidden loops,
dispose replaced buffers/materials/textures, reduce costly allocations during
interaction and keep one active catalog scene. Demand-render static inspection
states. Video decoding, bloom passes and geometric rebuilds have different costs;
measure them instead of equating GPU use with efficiency. Deterministic
`setTime`/`setValue` interfaces help produce matched posters and reproducible
visual checks, as the [vgpu workflow](posts/vercel-2092999180780556643.md) illustrates.

## Sources, reuse and boundaries

The [Orbkit repository](https://github.com/zzzzshawn/orbkit) distinguishes its
MIT runtime/selected examples from 19 XorDev-derived shaders under non-commercial
attribution terms. Do not call all its source unrestricted. The new Drawn To
showcase uses original effects and art; source studies provide visual vocabulary.
A claim in a caption such as a modeled-piece count or the renderer used remains
an author claim unless code or runtime inspection independently supports it.

The [resource roundup](posts/levithefirst-2092975925306507619.md) is a tool map,
not a command to install another collection of skills or replace project
conventions. Prefer current primary documentation for implementation decisions.
