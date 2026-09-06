# Showcase: 45 screens

The original 30 screens retain their IDs (`a` through `z`, then `A` through `D`).
Fifteen additional compositions exercise the September references. They are
original implementations, not reproductions of the authors' artwork.

Serve locally from the repository root:

```sh
python3 scripts/build-showcase-data.py
python3 -m http.server 8756 --directory site --bind 127.0.0.1
```

Open `http://127.0.0.1:8756/?v=scenic-close&still` to start at screen 31.
Arrow keys and the fixed transport navigate. Keys inside page controls stay with
those controls. Manual navigation updates the URL, so reload preserves the page.

- `?still` stops the catalog cycle; scene motion can still run.
- `?poster` or `?t=0` composes a still for inspection.
- `?gpu=off` exercises poster-only GPU scenes and their material/state choices.
- `?gpu=webgl` forces the particle field's WebGL2 implementation.
- Reduced motion stops the cycle and scene animation. Save-Data selects posters.

## New compositions

| Screen | ID | Main reference | Implementation |
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
revision). It does not imply 85 new showcase pages. `library-data.js` is generated
from the canonical post library, independently of the historical snapshot page.

## Files and ownership

`index.html` is now the small shell. `css/catalog.css` and `js/catalog.js` retain
the original catalog. The editorial, interactive and GPU expansion modules each
own their descriptors, styles and asset directory. `extra-common.css` supplies
shared stage/typography rules. A descriptor provides `render()` and an optional
`mount(root, {signal, reducedMotion, still})` returning cleanup.

The shell aborts and disposes the previous mount before navigation. Async renderer
loads are checked against that signal; only one scene owns active resources.
Three.js 0.185.1 and the required addons are pinned under `vendor/three/` with
their license. Renderer modules load on demand. Native WebGPU is used directly
for particles; the vgpu site was researched, but no vgpu package is installed.

See the PROVENANCE files beside each asset group. The interactive static material
images have an executable original `source.html`. The GLB can be rebuilt from
the same original geometry as the live scene:

```sh
node scripts/export-showcase-model.mjs
```

## Verification and finish

The 15 new screens were captured and reviewed at 1440x900, 1280x720 and 390x844.
All 45 routes received a browser smoke check. Interactions, navigation/reload,
clipboard failure, GPU lifecycle, reduced motion, native WebGPU, forced WebGL2
and poster-only states were exercised. The spatial collection additionally
received a 193-phase projected-corner check at all three sizes, followed by
visual inspection; rectangles alone cannot establish a good crop.

`scripts/verify-showcase.mjs` makes the core integration checks repeatable. It
needs an independently installed Playwright package and Chromium. It does not
install dependencies, start servers or publish anything:

```sh
node scripts/verify-showcase.mjs http://127.0.0.1:8756/
```

Optional environment variables: `PLAYWRIGHT_MODULE` resolves a package outside
the repository, `CHROME_EXECUTABLE` selects an existing Chrome executable, and
`EXPECT_WEBGPU=1` requires a successful native WebGPU backend. Without that last
flag the actual backend is reported. An optional second argument chooses the
JSON report path; the default is ignored `.eval-output/showcase-verification.json`.

The revised skill separates functional correctness, coherent art direction and
reference-level finish. The first flat collection, weak reflection studies,
generic bars and uniform starfield failed that last criterion. Their revisions
are concrete examples in `three-dimensional-craft.md`. The final set is stronger
and varied, but it is not uniformly equal to the references' finest workmanship.
The glass/ceramic/metal faces and the schedule's directional brushing still have
less nuance; the menu miniatures remain relatively schematic. The character,
pixel, widget, spatial collection and ribbon studies carry the source craft more
successfully. These are visual judgments, not conclusions from passing tests.

This local validation does not cover physical mobile devices, Safari/Firefox,
a full screen-reader audit or measured GPU frame time. The original 30 screens
were not newly art-directed or exhaustively visually reviewed in this expansion.
