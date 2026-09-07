# Motion expansion - 2026-09-07

This update adds nineteen reference analyses and fifteen original showcase
scenes. The library now has 104 references and the showcase has 70 scenes.
Existing deep links remain stable. The new work leads the curated opening,
followed by the prior optical/cinematic selection and original catalogue.

## Source coverage

35 requested URLs resolve to 23 distinct posts. Four are revisits and remain
single entries. The 35 direct-post media files and ten linked tutorial assets
were retrieved: 45 files, 44 unique byte payloads. Nineteen video files total
about 354 seconds. Review includes all supplied images, 304 overview frames,
1,415 low-resolution activity samples and fifteen one-second native-resolution
transition windows sampled at 8fps. It does not claim every decoded frame was
manually reviewed.

X returned HTTP 403 to direct web fetching. Public metadata and original media
were retrieved independently, and that distinction is recorded. Orbkit,
Soundscape, vgpu and Hermeus were separately opened in a real browser. Their
current contents are not substituted as proof of the historical recordings.
The resource roundup's sites were checked where accessible; failed retrievals
are not described as successful review.

The portable skill carries reduced images/selected frames and source hashes.
Original recordings, text, article content, all overview sheets and dense
samples remain in the owner's local evidence archive. No original source video
or third-party brand artwork is used as a showcase asset. Orbkit's source
license boundary is documented; the new shader effects are original code.

## New scenes

| Stable ID | Source vocabulary | Actual construction and interaction |
|---|---|---|
| auric-orbit | Orbkit | Displaced mineral mesh, different roughness/metal channels, glowing veins, state and light controls |
| camera-obscura | Camera workbench | Original camera with instanced fine detail, internal parts, optics and three assembly views |
| plasma-study | Orbkit | Original sphere-projected procedural field, three palettes, energy and pointer response |
| phosphor-field | Macro halftone + matrix | Original cell-mask shader with three signal forms and adjustable density |
| silver-tide | vgpu | Original periodic wave shader exported to two 16-second videos; deferred hover/button playback and pace |
| cloud-chamber | Architectural optical hero | Original environment art, coupled crop/object placement, live glass, fine rings and interior cloud field |
| ember-portrait | Synthetic portrait hero | Original detailed portrait, three deliberate inspection crops and captions |
| terrain-interface | Tactile terrain UI | Original fiber landscape surrounding a working three-state collection preview |
| sunlit-field | Illustrated hero collection | Original engraved landscape with three composed detail views |
| chamber-control | Industrial control dashboard | Native instrument console with working local controls and reconciled response values |
| quiet-frequency | Soundscape | Opt-in Web Audio tone, live scope, frequency/filter/echo/level controls and lifecycle cleanup |
| common-clock | Fanout + isometric mechanisms | Original vector sequence with one six-second clock, packets and semantic milestones |
| vector-foundry | SVG wave + wire posters | Coherent native SVG surface, stable paths, three wave states and height input |
| thermal-type | Heat-distorted typography | Original heat chamber art plus bounded live SVG text displacement |
| morph-study | Programmable particle method | Stable particles, three authored targets and interruptible position morphs |

Each scene has its own full exported style prompt. The canonical profiles live
in `skills/drawn-to/references/showcase-styles.json`; the existing prompt builder
now derives coverage from the registered scene count rather than fixing it at
55. The profiles identify actual renderer and asset limits, including the
difference between a detailed image and a freely inspectable 3D object.

## Architecture and artifacts

- `site/js/expansion/motion-{shared,rendered,editorial,instruments}.js` contains
  the descriptors and interaction adapters.
- `site/js/motion/runtime.js` owns a single mounted 3D/shader renderer and its
  resize, visibility, motion preference, pointer and disposal lifecycle.
- `site/js/motion/scenes/` contains independent original visual constructions.
- `site/js/motion/film.js` loads video only when playback is requested, retaining
  a composed poster and selectable light states otherwise.
- `site/assets/motion/` carries the five original raster assets, generation
  briefs, matched posters and original encoded films. Its NOTICE identifies
  those assets separately from reference evidence.
- `scripts/export-motion-posters.mjs` and `scripts/export-motion-film.mjs`
  reproduce those artifacts. The film exporter streams frames into ffmpeg;
  it does not require hundreds of intermediate PNG files.

## Verification

The current browser suites cover all 70 routes and prompt exports, the original
interaction suite, live renderer state changes, native controls, video and
audio behavior, reduced motion, disposal and matching fallback assets. The new
scenes are captured at 1440x900, 1280x720 and 390x844 and reviewed visually.

Real output review corrected a weak initial water material, unconvincing
studio reflections in the outdoor glass scene, a faint initial particle form,
repeated typographic treatment, short-desktop instrument clipping and mobile
text over busy imagery. These corrections informed the updated quality bar.

The original camera is a considered showcase model, not a reconstruction of
all 1,877 pieces claimed in the reference caption. The projected plasma field
is not presented as a physically measured volumetric solver. Raster inspection
scenes do not promise unrestricted orbit. These boundaries are included in the
style prompts so another agent does not silently promise more than the scene
actually delivers.

### Tested environment and remaining limits

The checks ran in Chrome 152 on the development Mac. Eight representative
mobile states were additionally captured with a device scale factor of two.
The camera retains up to 2x rendering resolution for its fine geometry and
renders only when its inspection state changes; animated scenes cap at 1.5x.
These are viewport and density checks, not tests on physical phones or proof
of Safari/Firefox parity.

The [new interaction report](verification/2026-09-07-motion-verification.json),
[whole-showcase report](verification/2026-09-07-showcase-verification.json) and
[prompt report](verification/2026-09-07-prompt-verification.json) preserve the
executed checks. Rapid video selection and cancellation before decode have
specific coverage. Hover input is tested in a browser; Save-Data and document
visibility use controlled preference/event simulations.

Two 16-second H.264 films total about 14.3 MiB and are deferred until playback.
Short local performance observations separately time JavaScript update and
WebGL command submission. They do not measure complete GPU work or establish
a general CPU/FPS guarantee.
