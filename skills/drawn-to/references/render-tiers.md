# Render tiers - what actually draws the field

`hero-atmosphere.md` describes first-screen composition. This file covers
what DRAWS a selected field or object and how to keep it responsive. On 2026-08-21 the five production
heroes the owner points at were probed live at 1440x900 and the answer was not
CSS:

| Site | What draws the hero ground | Measured |
|---|---|---|
| Antigravity | **WebGL2 canvas**, full viewport | 1440x900 CSS, backing store 2880x1800 (DPR 2.0) |
| Codex | **`<video>` + 2D canvas** | `floral_a.mp4`, source 2560x2560, `object-fit: cover` into 1440x1200; canvas 2d at DPR 2 over it |
| Linear | **nothing** - flat `#08090A` | product shot is a plain `<img>`, 1440 wide, top at y 490 |
| Raycast | **WebGL canvas**, container width | inside a 1200x942 hero-background box on a 1440 viewport, so the shafts fade out before the viewport edges |
| Vercel | **WebGL2 canvas**, overscanned | 1701x1134 CSS at x -131 / y -145, backing store 2520x1680 = **DPR 1.48 on a DPR-2 display**, `mix-blend-mode: screen`, `pointer-events: none`, transparent parent |

Three of five are WebGL. One is filmed. One deliberately renders nothing. A
skill that only knows CSS gradients cannot build four of these five, and the
fifth (Linear) it can only build by knowing that "no field" is the answer.

This file is the ladder, the budgets, the fallbacks and the skeletons. It is
mechanics, not taste: `hero-atmosphere.md` decides WHETHER there is a field and
what it looks like, `graphic-language.md` and `style-families.md` decide what
it is made of, `animation-craft.md` governs anything that moves. This file
decides which technology draws it and what that costs.

---

## 1. The ladder - take the lowest tier that holds

Use the lowest-complexity option that serves the locked material and the
project. These are implementation routes, not a universal cost ranking: asset
size, animation, resolution, browser and existing dependencies change the cost.
Record the reason for a heavier route in the lock file. "It would look cooler in three.js" is not a reason.

| Tier | Technology | Native to | Cost signature |
|---|---|---|---|
| **T0** | A still image (or a hand-authored SVG) | any field that never moves | one decode, zero frames |
| **T1** | CSS - gradients, `mask-image`, `filter`, `mix-blend-mode`, `@property`, keyframes | shaped light, slabs, arcs, rings, hairline scaffolds, dot grids, tone steps | compositor only if you animate transform/opacity; a large animated `filter: blur()` is NOT compositor-only |
| **T2** | SVG - `feTurbulence`, `feGaussianBlur`, `mask`, `pattern`, path animation | grain, halftone, line-art, redlines, anything that must stay crisp at any DPR | filter cost depends on the browser, area and caching; a full-viewport `feTurbulence` recomputed each frame can be expensive |
| **T3** | Canvas 2D | particle marks up to ~2 000, per-frame compositing of a video or image, dither passes | fill-rate bound; every `drawImage` of a full-viewport source is a full-frame blit |
| **T4** | Raw WebGL - one quad, one fragment shader | full-viewport per-pixel work: animated bloom, dithered falloff, fluid/mist, > 2 000 marks | one draw call, but you pay `resolution x DPR^2` fragments EVERY frame |
| **T5** | three.js / React Three Fiber | real geometry, camera, lights, materials, an imported model | runtime and scene-graph cost vary by imports/version; coordinate rendering with the app |
| **T6** | Authored motion - video, Lottie, Rive, Spline | optical realism (bokeh, film grain, real light), or motion an animator authored by hand | video spends bytes/decode; Lottie, Rive and Spline still render at runtime; measure the delivered asset |

### The promotion gates

Move UP one tier only when one of these is true. Cite the gate in the lock file.

- **T1 -> T2** the effect needs real noise (grain, dither, halftone) or a mask
  that CSS gradients cannot describe, and it does not move.
- **T2 -> T3** more than ~50 independently positioned marks, or the field must
  read from a video/image per frame.
- **T3 -> T4** the work is per-pixel across the whole viewport AND it moves:
  animated blur or bloom, a dithered falloff that shifts, a mist that morphs,
  more than ~2 000 marks. This is the gate Antigravity, Raycast and Vercel all
  passed.
- **T4 -> T5** there is real 3D: perspective geometry, a camera that moves, a
  light that shades a surface, or a model file. A flat field usually does not justify adding a 3D engine. Reusing an
  existing renderer can be cheaper than introducing another pipeline. An
  isometric illustration can be drawn in 2D or rendered from an orthographic
  3D scene; choose by its geometry, motion and assets (`isometric-and-light.md`).
- **any -> T6** the motion is authored rather than computed (a designer's Rive
  or Lottie), or optical realism is required and is cheaper filmed than
  simulated. Codex is the reference: real bokeh, real film grain, real
  depth of field, from a camera, when the selected footage achieves the required look at lower total cost.

### The demotion checks (run before you write the first line)

- Does it move? No -> T0/T1/T2. A still field is a still field, however
  expensive it looks.
- Is it one shape with a falloff? -> T1. A slab, beam, arc or lit ring often needs only CSS gradients and a mask.
  Add grain only for the selected finish; use a shader if its animation or
  an existing pipeline warrants one.
- Is the product's own UI the visual? -> no field at all (Linear). The strongest
  hero in the set renders nothing.

---

## 2. Budgets - the numbers that keep it at 60fps

**The frame.** 16.6 ms total. A hero field may take **4 ms**. Everything else
belongs to layout, paint and the rest of the page.

**Device pixel ratio.** This is the single biggest lever and the one most often
left at the default.

- Full-bleed bloom / mist / soft light: clamp the backing store to
  **1.25-1.5** even on DPR 2. Measured: Vercel runs 1.48. Soft light has no
  high-frequency detail to lose, and the clamp cuts fragment count by ~55 %.
- Crisp geometric fields (particle marks with hard edges, line-art, text-like
  shapes): **up to DPR 2** as a starting cap; inspect detail on the target display. Measured: Antigravity runs 2.0. Clamping here
  produces visible aliasing on every mark.
- Phones: clamp one step further (1.0-1.25) or drop to the poster (§ 3).

```js
const dpr = Math.min(window.devicePixelRatio || 1, SOFT_FIELD ? 1.5 : 2)
canvas.width  = Math.round(rect.width  * dpr)
canvas.height = Math.round(rect.height * dpr)
```

**Fill rate.** 1440x900 at DPR 2 is 5.2 Mpx per frame; at 1.5 it is 2.9 Mpx.
Budget one full-viewport fragment pass. Prefer one coordinated full-viewport renderer; multiple
canvases need a measured reason, and combining passes does not eliminate their cost.

**Overscan, not clipping.** A bloom clipped by the viewport shows a hard edge
the moment the window is resized. Vercel oversizes the canvas past every edge
(-131 x, -145 y on a 1440x900 viewport) so the falloff always dies in
off-screen pixels. Overscan by ~10 % of the shorter axis, and set
`pointer-events: none` so the field never eats a click.

**Screen blending and the ground.** Vercel uses screen over black. For each
normalized channel, screen is `1 - (1 - source) * (1 - backdrop)`: a black
source leaves any backdrop unchanged, not only #000. Residual non-black pixels
in a supposedly empty source lift the ground. Choose screen, additive or normal
compositing for the intended material and check the result. Bloom is emitted
light; a physical dark object can also cast a contact shadow.

**Animation eligibility - one decision for all four conditions.**

Observe the stable field container, not a canvas hidden by the poster path.
This helper is called after the live renderer is ready. `start()` and `stop()`
must be idempotent; `start()` paints a valid frame before revealing the live
layer, and `usePoster()` hides it so the authored background remains visible.
Use the same gate for canvas rAF, video playback or a CSS animation driver.

```js
function watchFieldMotion({ target, start, stop, usePoster }) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const connection = navigator.connection
  let inView = false, disposed = false

  const reconcile = () => {
    if (disposed) return
    const eligible = inView && !document.hidden &&
      !motion.matches && !connection?.saveData
    if (eligible) start()
    else {
      stop()
      usePoster()
    }
  }
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    reconcile()
  })
  io.observe(target)
  document.addEventListener('visibilitychange', reconcile)
  motion.addEventListener('change', reconcile)
  connection?.addEventListener?.('change', reconcile)
  reconcile()

  return () => {
    disposed = true
    io.disconnect()
    document.removeEventListener('visibilitychange', reconcile)
    motion.removeEventListener('change', reconcile)
    connection?.removeEventListener?.('change', reconcile)
    stop()
    usePoster()
  }
}
```

Return this disposer from the mounting effect and separately release renderer
resources. Browsers without `navigator.connection` supply no Save-Data signal;
the other gates still work. A decode/context failure stays on the poster and
must not attach this watcher until the live renderer is usable. Reduced motion
uses the named composed poster, not an arbitrary paused animation frame.

---

## 3. The fallback ladder - the poster IS the design

Order of operations for every field above T2:

1. **Author the poster first.** One still frame of the field, exported at
   1440-wide (and 780-wide for phones), set as the `background-image` of the
   field container. Judge the hero on the poster alone. If the poster does not
   pass `quality-bar.md` § 3, the animated version will not save it.
2. **Ship the poster as the ground.** The canvas mounts on top and fades in
   over 300-400 ms when its first frame is ready. Nothing pops.
3. **The type is never inside the canvas.** Keep the H1 as DOM text above the field for selection, semantics and
   assistive technology. Load it independently of the field module; actual LCP
   still depends on fonts, resource loading and which element is largest.
4. **No WebGL context, decode failure, `save-data`, reduced motion, or a
   phone under the budget** -> the poster stays and nothing else happens. All
   five paths land on the same still, so all five are already designed.
5. **Never block first paint on the field.** Dynamic-import the field module;
   load the visible poster promptly. A video poster or frame can be an LCP
   candidate. `preload="none"` is a hint and does not prevent an autoplaying
   video from fetching; set its source/play state only when eligible if avoiding
   that fetch matters, and handle a rejected `play()` promise with the poster.

```html
<div class="field" style="background-image:url(/field-poster.avif)">
  <canvas hidden data-field="shafts"></canvas>
</div>
<h1>Real DOM text, on top, always</h1>
```

---

## 4. Recipes - the corpus's effects, per tier

### Grain (when the selected material uses it)

**T1, tiled PNG/AVIF** - cheapest, works everywhere, no filter cost:
```css
.grain::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:url(/noise-128.avif) repeat;background-size:128px;
  opacity:.05;mix-blend-mode:overlay}
```
**T2, SVG turbulence** - no asset, but rasterised once per size; keep it on a
static layer, never animate its attributes:
```html
<svg width="0" height="0"><filter id="g">
  <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/>
</filter></svg>
```
**T4, in-shader hash** - free when a shader already runs; the only option when
the grain must move with the field:
```glsl
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
col += (hash(gl_FragCoord.xy + uTime) - .5) * 0.06;   // +/-0.03 channel amplitude before clipping
```
The snippets use proposed effect settings. Overlay opacity, shader amplitude
and decoded-pixel sigma are different quantities (`measuring.md`); do not copy a
reported grain percentage into an unrelated parameter. A smooth material needs no grain.

### Bloom on true black (Vercel's dots)

**T1** for a fixed object - stack shadows instead of one blur, so the falloff
has structure:
```css
.dot{background:#fff;border-radius:50%;
  box-shadow:0 0 8px 2px rgba(255,255,255,.55),
             0 0 24px 8px rgba(255,255,255,.22),
             0 0 72px 24px rgba(255,255,255,.08)}
```
**T4** when the animation needs per-pixel work: draw the source, then an additive pass at
2-3x radius, and composite the canvas with `mix-blend-mode: screen` over `#000`.
Bloom belongs at the light source, never spread evenly over the object
(`style-families.md` F8, `color-type.md`).

### Dithered falloff (Raycast's shafts)

If the selected shaft treatment needs a noisy edge, two options are:

**T1+T2** static: `linear-gradient` bands, `mask-image` for the falloff, grain
layer over the whole thing at 6-8 %.
**T4** animated - ordered dither in the shader:
```glsl
const mat4 bayer = mat4( 0., 8., 2.,10., 12., 4.,14., 6.,
                         3.,11., 1., 9., 15., 7.,13., 5.);
float d = bayer[int(mod(gl_FragCoord.x,4.))][int(mod(gl_FragCoord.y,4.))]/16.;
float a = step(d, falloff);          // falloff = your 0..1 gradient
```

### Particle mark field (Antigravity's confetti)

Density is the design, not the count. Marks 2-10 px, random rotation, 0.5-2 %
surface coverage, denser at two edges so the centre stays clear for the type
(`hero-atmosphere.md`). Independent steady drift can use a linear time driver and differing periods.
Periodic breathing or coordinated events can ease and share a clock; check the
intended loop seam and motion rather than requiring every mark to move linearly.

- **T3 canvas 2D** up to ~2 000 marks. One path per mark, `setTransform` per
  mark, no shadows.
- **T4 WebGL** beyond that, or when the marks must respond to the pointer:
  one instanced quad, position/rotation/hue in an attribute buffer.

```js
// density mask: 1 at the edges, ~0 through the middle band
const density = (x, y, w, h) => {
  const dx = Math.min(x, w - x) / w, dy = Math.min(y, h - y) / h
  return 1 - Math.min(1, Math.min(dx, dy) * 3.2)
}
```

### Out-of-focus photographic ground (Codex)

Filmed beats simulated. Codex ships a 2560x2560 mp4 at `object-fit: cover`,
muted, looped, autoplaying, with a 2D canvas pass over it.

```html
<video muted loop playsinline preload="none"
       poster="/field-poster.avif" class="field"></video>
```
For inline background playback use `playsinline` and `muted`; these help
meet browser playback policy but do not guarantee playback. Set the source and
call `play()` through the eligibility gate; catch rejection and retain the poster. If a still
must stand in for the video, the optics come from the table in
`hero-atmosphere.md`: `blur(56-120px) saturate(2.5-4.5) contrast(1.1-1.2)`,
because blurring desaturates and the saturate pass is what puts the mass back.

### Light shafts / structured light

Whether it is full-bleed or container-width is a composition decision with a
measurable consequence: Raycast's shafts live in a **1200-wide box on a 1440
viewport**, so they die before the viewport edges and the page keeps a dark
frame. Vercel's canvas **overscans past every edge**. Pick one deliberately and
write it in the lock file. Construction recipes for the shapes themselves:
`isometric-and-light.md` Path B.

---

## 5. Skeletons

### Raw WebGL - one quad, one fragment shader (T4)

Renderer-loop excerpt, not a standalone WebGL setup. `link` must compile/link
GLSL ES 3.00 sources and check errors; `quad` must upload six vec2 vertices.
Handle a null context by retaining the poster before this code runs. Attribute
`a` is the vertex position. Update the backing size on resize; this loop sets
the matching viewport. Delete buffers/programs on disposal and use the poster
on context loss. Attach the shared eligibility gate to its start/stop functions.

```js
const gl = canvas.getContext('webgl2', {alpha:true, antialias:false,
                                        powerPreference:'low-power'})
const prog = link(gl, VERT, FRAG)                 // VERT: gl_Position = vec4(a,0,1)
const buffer = quad(gl)                         // two triangles, clip space
gl.useProgram(prog)
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
const position = gl.getAttribLocation(prog, 'a')
gl.enableVertexAttribArray(position)
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
const uT = gl.getUniformLocation(prog,'uTime')
const uR = gl.getUniformLocation(prog,'uRes')

let raf = 0, t0 = performance.now()
const frame = now => {
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.uniform1f(uT, (now - t0) / 1000)
  gl.uniform2f(uR, canvas.width, canvas.height)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  raf = requestAnimationFrame(frame)
}
const start = () => raf ||= requestAnimationFrame(frame)
const stop  = () => { cancelAnimationFrame(raf); raf = 0 }
```

`antialias:false` because a soft field has no edges to alias and MSAA costs
memory bandwidth. `alpha:true` only when the field composites over page
content; opaque is cheaper.

### React Three Fiber (T5 - real 3D only)

```jsx
const Scene = dynamic(() => import('./Scene'), {ssr:false,
  loading: () => null})                         // this component mounts INSIDE Canvas

<Canvas
  dpr={[1, 1.5]}                    // clamp, never uncapped
  frameloop="demand"                // render on change, not every frame
  gl={{antialias:false, powerPreference:'low-power'}}
  onCreated={({invalidate}) => …}>  // call invalidate() when state changes
  <Suspense fallback={null}><Scene/></Suspense>
</Canvas>
```

Keep the DOM poster behind the Canvas, not inside the R3F scene graph.
`frameloop="demand"` avoids continuous draws while a scene is unchanged; an
animated scene must invalidate as needed through the same eligibility gate. Dispose geometries and materials on
unmount, or a route change leaks the whole scene. A fixed camera is a register choice for technical
drawings. Real 3D scenes may move their camera when that serves the approved direction.

### Authored motion (T6)

- **Lottie** - runtime vector animation; cost depends on renderer, layers,
  masks and animated properties. Choose a compatible player/build and compare
  SVG and canvas when layer count or area is high; measure on target devices.
- **Rive** - a state machine, so it can respond to hover/scroll/state without a
  re-export. The right choice when the designer owns the motion AND the motion
  has states. Check the chosen renderer/runtime bundle size.
- **Spline** - fastest path to a 3D object, heaviest payload (often > 1 MB plus
  a runtime). Acceptable for one signature object with a poster; never for a
  background field.
- **Video** - a direct way to preserve filmed optics. h264 for reach, plus a
  webm/av1 source for size. Always `poster`, `muted`, `playsinline`, `loop`.

---

## 6. The tells - render-tier failures

Add these to the walk in `quality-bar.md` § 1 for any page carrying a field:

- **A canvas field with no poster.** First paint is an empty box, then the field
  pops in. Every real implementation lands on a still first.
- **Text inside the canvas.** No LCP, no selection, no screen reader. Always a
  defect, never a style.
- **The field keeps running off screen or in a hidden tab.** Four stop
  conditions, all four wired (§ 2).
- **Reduced motion honoured by stopping mid-animation**, or by removing the
  field entirely, instead of holding a composed frame.
- **Uncapped DPR on a soft field.** DPR 2 on a full-bleed bloom is ~2x the
  fragments for zero visible gain - and it is the usual cause of a hero that
  janks on a laptop.
- **Two full-viewport canvases**, or a canvas plus a large animated CSS
  `filter: blur()` over the same area.
- **An added rendering engine without a need.** Prefer an existing suitable
  pipeline or simpler implementation; record and measure the reason for adding one.
- **A field whose delivered banding or texture conflicts with the selected material.** Smooth gradients are valid.
- **Bloom as a uniform ring** around an object instead of concentrated at the
  light source.
- **A blend layer that unintentionally lifts the ground**, usually because its
  nominally empty pixels are not black/transparent. Check the actual composite.
- **A field that eats clicks** - `pointer-events: none` missing.
- **"60fps" claimed but never measured.** Record the number: DPR used, canvas
  size, and the frame time you observed.

## 7. What goes in the lock file

One line, next to the field's own lock:

```
RENDER: <tier> · <what> · dpr <cap> · poster <path> · stops: io+hidden+rM+saveData
        · gate: <the reason this tier was needed>
```

Example, written against the measurements above:

```
RENDER: T4 raw WebGL · full-bleed shaped-light field, overscan 10 %, screen over #000
        · dpr 1.5 · poster /hero-field.avif · stops: io+hidden+rM+saveData
        · gate: falloff must animate across the whole viewport (T1 cannot)
```
