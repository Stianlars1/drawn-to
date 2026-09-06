# Showcase: 55 screens

The original 30 screens retain their IDs (`a` through `z`, then `A` through `D`).
Twenty-five additional compositions exercise the September references. The
latest ten were built using the published Drawn To 1.1 direction and craft guide,
with original image-generation and ordinary implementation tools. They are
original interpretations, not reproductions of the authors' artwork.

The first 25 positions now interleave the latest ten with the previous fifteen.
The original thirty follow. `site/js/catalog-order.js` owns this sequence;
visible numbering follows the sequence, while stable URL IDs remain unchanged.

Serve locally from the repository root:

```sh
python3 scripts/build-showcase-data.py
python3 -m http.server 8757 --directory site --bind 127.0.0.1
```

Open `http://127.0.0.1:8757/?still` to start at the new optical-typography scene.
Arrow keys and the fixed transport navigate. Keys inside page controls stay with
those controls. Manual navigation updates the URL, so reload preserves the page.
Home links return to the opening scene. Deliberate interaction with a control
holds the catalog cycle so a scene cannot disappear while it is being explored.

- `?still` stops the catalog cycle; scene motion can still run.
- `?poster` or `?t=0` composes a still for inspection.
- `?gpu=off` exercises poster-only GPU scenes and their material/state choices.
- `?gpu=webgl` forces the particle field's WebGL2 implementation.
- Reduced motion stops the cycle and scene animation. Save-Data selects posters.

## Latest ten compositions

| Current position | ID | Craft and behavior |
|---|---|---|
| 01 | optical-type | Large type actually refracted through a Three.js lens; pointer and keyboard position control |
| 02 | night-garden | Original cinematic conservatory with transmitted light and water reflection; composed detail views |
| 03 | woven-spectrum | Original reflective strips with distinct dark/bright intervals; tension and spatial movement |
| 05 | aperture-control | Modeled metal instrument, nine moving blades, engraved scale and a matching moving indicator |
| 06 | paper-theatre | Original detailed paper world, transparent cutout and three editorial chapters |
| 08 | red-chamber | Chrome and deep red textile, with whole-scene and material-detail compositions |
| 09 | chromatic-relief | Closed blue fins with visible depth, changing wave shape and actual cast shadow |
| 11 | specimen-cabinet | Six original material specimens, proportion-preserving crops and accessible detail dialogs |
| 13 | living-terrarium | Thick glass, condensation, plants and stone; a composed detail magnifier |
| 15 | contact-sheet | A film-like editing surface with actual selection, reordering and inspection |

The intervening positions bring earlier character, collection, pixel, illustration
and material work into the opening sequence. See the [current design lock](design-locks/2026-09-06-ten-scenes.md)
for the complete sequence and property-level reference influences. The six
image-led pages use the original artwork and curation interface; they are not
described as live 3D simulations. Prompts and provenance are under
`site/assets/atelier/`.

## Earlier September compositions

These were positions 31-45 in the first expansion. The numbers below identify
that historical release; the live catalog now places these pages earlier.

| Initial position | ID | Main reference | Implementation |
|---|---|---|---|
| 31 | scenic-close | AdityaSur11-2096160317458030911 | Original engraved landscape, serif editorial close |
| 32 | warm-choices | DesignByMoein-2095937596665024817 | Character-led choice cards |
| 33 | character-close | DesignByMoein-2096289484577071567 | Original tactile studio scene and practical footer |
| 34 | arch-editorial | LexnLin-2096045877760795063 | Broad image apertures with responsive crops |
| 35 | kinetic-collection | basit_designs-2095862418518008252 | CSS 3D image flow, stable reading anchors |
| 36 | action-result | disarto_max-2093019047851913475 | Editable brief and deterministic result preview |
| 37 | pixel-plan | PostiauxCharles-2095509261908382083 | Lit-cell field, resin prerender and physical control details |
| 38 | rolling-decisions | kitlangton-2096041674073874765 | Rolling digits and exact 100% weight allocation |
| 39 | menu-preview | pqoqubbw-2093012429240431093 | Keyboard/hover/tap selection and adjacent preview |
| 40 | working-widgets | MSchwaibold-2096059496812716307 | Paper note, contrast, radius and review tools |
| 41 | glass-identity | DmitryLepisov-2093247212629139641 | Live Three.js transmission and small/large mark |
| 42 | physical-schedule | nilseller-2093007384465531068 | Modeled schedule, satin faces, shadows and selective focus |
| 43 | iridescent-ribbon | basit_designs-2095821165306732974 | Closed twisted geometry and reflective thin-film material |
| 44 | particle-assembly | krispuckett-2095994089917522241 | Native WebGPU flow, matched WebGL2 fallback |
| 45 | material-study | DmitryLepisov-2093247212629139641 | Original imported GLB, three live materials |

The particle silhouette uses the generated current library count (85 in this
revision). It does not imply 85 showcase pages. `library-data.js` is generated
from the canonical post library, independently of the historical snapshot page.

## Files and ownership

`index.html` is now the small shell. `css/catalog.css` and `js/catalog.js` retain
the original catalog. The editorial, interactive and GPU expansion modules each
own their descriptors, styles and asset directory. `extra-common.css` supplies
shared stage/typography rules. The newer studio, editorial and collection modules
are separate units under `js/expansion/`, with their own `atelier-*.css` files.
A descriptor provides `render()` and an optional
`mount(root, {signal, reducedMotion, still})` returning cleanup.

The shell aborts and disposes the previous mount before navigation. Async renderer
loads are checked against that signal; only one scene owns active resources.
Three.js 0.185.1 and the required addons are pinned under `vendor/three/` with
their license. Renderer modules load on demand. Native WebGPU is used directly
for particles; the vgpu site was researched, but no vgpu package is installed.

`js/atelier/runtime.js` owns the four newer Three.js scenes' lifecycle and common
studio environment. Separate scene builders own geometry, framing and interaction.
The lens and aperture render on demand; the woven and relief scenes may animate.
Continuous control states have three matching fallback images, with desktop and
portrait crops. The fallback exposes discrete controls so it does not imply
continuous live rendering. Context loss returns to the composed image controls.

See the PROVENANCE files beside each asset group. The interactive static material
images have an executable original `source.html`. The GLB can be rebuilt from
the same original geometry as the live scene:

```sh
node scripts/export-showcase-model.mjs
```

Rebuild the newer studio posters after changing a model or camera:

```sh
node scripts/export-studio-posters.mjs http://127.0.0.1:8757/
```

This optional development command needs Playwright/Chromium and Python with
Pillow. It uses the same `PLAYWRIGHT_MODULE` and `CHROME_EXECUTABLE` overrides
described below, plus optional `PYTHON_BIN`. It captures actual scene PNGs,
encodes lossless WebP, checks RGBA equality and replaces each file atomically.
Capture and review the finished site after the export has completed.

## Verification and finish

The latest ten have 30 default captures at 1440x900, 1280x720 and 390x844, plus
54 captures covering control extremes, motion poses and detail states. The
earlier fifteen received the same three-size review in their own expansion.
All 55 routes received a browser smoke check. Interactions, navigation/reload,
clipboard failure, GPU lifecycle, reduced motion, native WebGPU, forced WebGL2
and poster-only states were exercised. Home, wraparound, new ordering, automatic
hold on interaction, nine GPU scene owners, modal focus and new scene controls
are covered by the current browser scripts. The earlier spatial collection also
received a 193-phase projected-corner check at all three sizes, followed by
visual inspection; rectangles alone cannot establish a good crop.

`scripts/verify-showcase.mjs` makes the core integration checks repeatable. It
needs an independently installed Playwright package and Chromium. It does not
install dependencies, start servers or publish anything:

```sh
node scripts/verify-showcase.mjs http://127.0.0.1:8757/
```

Optional environment variables: `PLAYWRIGHT_MODULE` resolves a package outside
the repository, `CHROME_EXECUTABLE` selects an existing Chrome executable, and
`EXPECT_WEBGPU=1` requires a successful native WebGPU backend. Without that last
flag the actual backend is reported. An optional second argument chooses the
JSON report path; the default is ignored `.eval-output/showcase-verification.json`.

Drawn To separates functional correctness, coherent art direction and
reference-level finish. The first flat collection, weak reflection studies,
generic bars and uniform starfield failed that last criterion. Their revisions
are concrete examples in `three-dimensional-craft.md`. The final set is stronger
and varied, but it is not uniformly equal to the references' finest workmanship.
The glass/ceramic/metal faces and the schedule's directional brushing still have
less nuance; the menu miniatures remain relatively schematic. The character,
pixel, widget, spatial collection and ribbon studies carry the source craft more
successfully. In the newer ten, visual review corrected overlapping type, a dark
metal instrument, thin relief geometry, a misframed mobile camera, an obscured
mobile caption and a magnifier's initial transient crop. The cinematic garden,
paper world, red material scene and optical experiment provide especially clear
variation. These are visual judgments, not conclusions from passing tests.

This local validation does not cover physical mobile devices, Safari/Firefox,
a full screen-reader audit or measured GPU frame time. The original 30 screens
were not newly art-directed or exhaustively visually reviewed in this expansion.

## Per-scene style prompts

Every scene has a header copy action and a readable prompt preview. These are
visual direction briefs, separate from install commands and workflow prompts.
They describe the selected composition, material/light/type, behavior, asset
requirements and real source implementation, with focused acceptance checks.

Edit `skills/drawn-to/references/showcase-styles.json`, then run:

```sh
node scripts/build-showcase-prompts.mjs
node scripts/build-showcase-prompts.mjs --check
node scripts/verify-prompts.mjs http://127.0.0.1:8758/ .eval-output/prompts.json
```

The browser check uses the same `PLAYWRIGHT_MODULE` and `CHROME_EXECUTABLE`
options as the main verification. It checks all 55 clipboard exports, every
header at three sizes, denied clipboard/manual recovery, loading failure,
legacy mobile content preservation and repaired control behavior.

The original thirty styles are refined in `site/css/legacy-polish.css`; bespoke
bento drawings live in `site/js/legacy-details.js`. Keep historical measurements
labelled and preserve complete content on mobile. The archived comparison uses
a horizontally inspectable image on narrow screens, with a visible swipe hint.
