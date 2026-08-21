# Isometric objects & structured light — two paths

Reverse-engineered from Marcel Kargul's work (kargul.studio): the Services
bento + CTA dome (local saves, marcelkargul-2090148, marcelkargul-2090509),
the Hunt.io hero + footer (marcelkargul-2089371, marcelkargul-2089404), the
six-hero collage (local_HPbqQYUXAAAbrLQ.jpeg) and the Chatsheet hero video
(marcelkargul-1952697). Two distinct crafts live here and both are offered as
a PATH the lock-in flow can choose: (A) isometric objects as the illustration
language, (B) light with geometry instead of blob gradients. Media:
`references/media/local-marcel-isometric/` + the slugs above.

---

## Path A — Isometric objects

### A1. Two registers

**Blueprint iso (dark, monochrome)** — the Services bento, marcelkargul-2090148:
- Objects are 1px line-art on a visible isometric graph-paper grid (~24px
  cells, 4-6% white). The grid is a MATERIAL the object stands on, never
  decoration: dashed iso guides overshoot every object and run to the card
  walls; selection-handle squares sit on key vertices; a dashed bounding
  box frames the hero object — literally Figma's chrome as vocabulary.
- Three gray tiers, one white focal: guides #3F3F3F-class · outlines
  #7A7A7A-class · ONE white edge/face per illustration (the ribbon's near
  edge, the front window). Faces are flat near-background tones (+2-4%),
  never gradients; depth by opacity dimming 25-40%, never shadow.
- Textures do the material work: dense parallel hatch lines follow a curved
  surface (the ribbon's curl is ~40 hatch strokes that bend with the form);
  stipple/noise fills shadow faces and cut-aways; a 4px diamond crosshatch
  on one plane per board. All at ≤8% contrast.
- The object IS the deliverable (C2 at illustration grade): Branding = logo
  plate + color chips on a slanted sheet; Product UI/UX = three layered
  screens with a px-ruler label; Full-stack = a PCB-like board with a logo
  chip and Figma→code node; Landing pages = a folded ribbon sheet carrying a
  3-bar chart; Full websites = a fan of browser windows with NEXT.js and
  Framer logos, dashed path threading them.
- The dome CTA (light): same vocabulary inverted — white paper #EDEDED,
  #c9c9c9 outlines, a wireframe geodesic dome with meridians, a cut-away
  wedge whose interior is stipple, iso primitives around it (stairs,
  cylinders, lego brick, pie wedge, arc ring), dashed bezier orbit lines with
  dot nodes, handles on the bounding boxes. Faces here carry SOFT GRADIENTS
  (white → #e6e6e6, 1-2% per face) — the "soft gradients that make the
  section feel like a product" comment in the post.

**Soft-shaded iso (light, one chroma hero)** — Chatsheet hero video:
- A single blue disc (concentric ring "core") sits on an iso plane with a
  soft blue radial under it (the only strong chroma); integration app tiles
  (Slack, Gmail, Drive, Sheets, Notion…) are small iso tiles scattered on
  dotted connector paths that converge into the core; from the core a
  conveyor rail of iso cards ("Automation Action", "Strategy Contract",
  "Personalized Outreach" — pill + checklist) runs up-right and slides
  continuously along the iso axis (linear, constant velocity — C6 ambient).
- Faces: white → #eef1f5 soft gradients, blue-tinted contact shadows
  (`0 12px 32px rgba(40,80,200,.14)`-class), 1px edges at 8-10% navy.
  Tiles bob ±4px slowly; the conveyor never eases; loop closes on the
  period of one card advance.
- Serif headline over it: the illustration carries the modern register, the
  type the editorial one.

### A2. Construction (the math, so it can be built in code)

- Projection: 2:1 dimetric ("pixel isometric") — axes at ±26.57° (tan = 0.5)
  on a square grid; or true isometric at ±30°. Pick one per project; the
  corpus uses 2:1 (flatter, cleaner hatch).
- SVG face transforms (2:1): top `matrix(1 0.5 -1 0.5 tx ty)` → for 30°:
  left face `matrix(0.866 0.5 0 1 tx ty)`, right face `matrix(0.866 -0.5 0 1
  tx ty)`, top `matrix(0.866 0.5 -0.866 0.5 tx ty)`. Draw every face as a
  2D rect/path in its own plane, then place; extrusion = same face offset
  along the vertical by height h.
- CSS alternative: `transform-style: preserve-3d; transform: rotateX(60deg)
  rotateZ(45deg)` on a stage (2:1-ish), children built as flat planes with
  `translateZ`. Cheaper for animated stacks; SVG for line textures.
- Lighting order is a contract: top lightest · left mid · right darkest
  (one light from upper-left), consistent for every object on the page.
- Textures: hatch = `<pattern>` of 1px lines at the face's angle, 4-6px
  pitch, opacity 6-8%; stipple = `feTurbulence baseFrequency .9 + feColorMatrix`
  masked to the face, 3-6%; dashed guides `stroke-dasharray 3 4`; handles =
  4-6px squares with 1px stroke.
- Motion: translate along an iso axis = (dx, dx·0.5); assembly = separable
  planes fading/sliding in (graphic-language R8); conveyor = linear
  `translate` loop with period = one item pitch; never ease an infinite
  iso loop (C6).

### A3. How these were made — and the production route

Marcel's set is vector work in Figma (the handles, px labels and dashed
bounding boxes ARE Figma chrome; his stack lists Figma · Rive · Lottie ·
After Effects), exported as SVG and, per his caption, "ready for animation"
= drawn as separable layers. Route for this skill:
- Static hero/CTA/bento art: author in Figma (or generate SVG directly) →
  inline SVG with the gray tiers as CSS variables so it re-themes.
- Animated: build in code with the A2 vocabulary (SVG groups per plane,
  CSS/WAAPI on transforms), or Rive for rich scenes; never ship video for
  line-art.
- Never raster: iso line-art must stay crisp at any DPR (`vector-effect:
  non-scaling-stroke`).

### A4. Where it fits (lock guidance)

- Native to F4 Blueprint Sheet (dark line-art) and F2 Ink & Air / F6 (soft-
  shaded light). As a garnish on F1 (one iso object per section).
- Choose when each feature/service has a physical deliverable to draw, when
  the audience respects engineering drawings, or when a "how it flows"
  story needs a stage (conveyor).
- Avoid when the product is abstract (no object to draw) — then UI
  fragments beat invented machinery.

---

## Path B — Structured light (why these gradients look expensive)

A radial blob gradient looks cheap for four reasons: no shape, no direction,
saturation everywhere, no grain. Every "expensive" example here gives light
GEOMETRY:

1. **Shaped falloff** — the gradient follows a form: a curved horizon band
   (Metricly: lavender→blue with a lighter arc rim; LeadBurst: navy→blue
   horizon rising from the bottom), a diagonal slab confined to one panel
   (Signilo: pink→coral inside a rounded panel), wedge rays (Hunt.io footer:
   light SHAFTS radiating from the hex prism), concentric rings (Hunt.io
   radar nodes).
2. **Line-work over light** — structure drawn on top modulates it: PCB
   traces with rounded corners and node pads (Flowpilot), spectrum sine
   ribbons threading an envelope (InboxWarden), nested rounded-rect
   outlines (Signilo), dashed connectors (BugScout), a hex-dot world map
   whose dots brighten near the source (Hunt.io). The eye reads the light
   THROUGH geometry.
3. **Anisotropic glow** — rays/streaks and 1px rings at falling opacity,
   not one blurred circle. Hunt.io footer = conic/linear shafts from the
   prism + a tight radial base + the dot field lit by proximity; hero = teal
   radar rings around cyan hex prisms, red threat dots with 2-3 tight
   rings, 1px connectors with rounded corners to mono label chips.
4. **Chroma rationing** — one hue family + white/black; a second hue only
   semantic (red = threat) or as thin spectrum strokes (ribbons, gradient
   text) at <3% surface area. Light pages keep 60-80% white.
5. **Grain + banding control** — 2-6% noise over every field (C9); pastels
   at low chroma; no hard stops except deliberate slabs.
6. **One light source** — tile shadows tint toward it, glows sit under
   objects, rays point away from it; everything agrees on one position.
7. **Objects sit IN the light** — glass tiles with tinted shadows, hex
   prisms with a lit top face, an envelope with ribbons passing through; the
   gradient is an environment, not wallpaper.

### B1. Construction recipes

- Horizon arc: `radial-gradient(120% 60% at 50% 115%, hue 0%, transparent
  70%)` (light rising from below) + a 1px lighter rim via a second, tighter
  radial; or an SVG ellipse stroke at 30% opacity.
- Diagonal slab: `linear-gradient(135deg, a, b)` inside a rounded panel +
  white mat around it; grain on the slab only.
- Rays: SVG wedge paths from the source with a linear gradient along each
  wedge (opacity .18 → 0), 6-10 wedges of uneven width, blur 12-24px,
  masked by a radial so they die at ~40% of the canvas; or
  `repeating-conic-gradient` masked radially.
- Rings: concentric SVG circles, 1px, opacity 0.18/0.12/0.07, optional slow
  linear pulse (scale 1 → 1.05, 4s) — ambient register.
- Hex-dot map: `<pattern>` of 2-3px hexagons, masked by a continent
  silhouette, brightness multiplied by a radial mask from the source.
- Ribbons: SVG paths 2-3px with gradient strokes + a blurred duplicate
  (glow) at 30%; 3-5 ribbons in spectrum hues through one object.
- Tinted shadows for glass tiles: `0 12px 32px -8px rgba(hue, .18)`; top
  face `linear-gradient(180deg, #fff, #f0f3ff)`; 1px border white/60.
- Always: grain layer (feTurbulence) over the field, and check the field
  on a real display — banding shows in 8-bit exports.

### B2. Where it fits

Heroes and closing CTAs (F3 Staged Atmosphere's asset discipline applies:
ONE light system per page, reused), dark security/infra brands (Hunt.io
register: black + teal + red-semantic), light SaaS heroes (pastel horizon +
glass tiles). In AX10 "structured light" is now a named asset option.

---

## Per-link reverse-engineering (short form; files in `posts/`)

- **marcelkargul-2090148** (corpus): monochrome iso line-art service cards —
  see its post file.
- **Services bento / CTA dome** (`local-marcel-isometric`, marcelkargul-2090509):
  above, A1.
- **marcelkargul-2089371 — Hunt.io hero**: black ground; hex-dot world map;
  cyan hex prisms as nodes with teal radar rings; red threat dots with tight
  concentric glows; 1px rounded-corner connectors to mono label chips
  (Unique error page · JA4 fingerprint · Hash Match · Campaign); one flag
  badge as the only non-palette color; H1 left-bottom, sub + pill right —
  the map is the hero object, the copy steps aside.
- **marcelkargul-2089404 — Hunt.io footer**: the same prism alone, dead
  center, emitting light SHAFTS across the dot map; two-line H1 + one pill;
  the footer as a second hero with the asset reused (F3 discipline).
- **HPbq collage — six light heroes**: shaped pastel fields (arc horizon,
  diagonal slab, rising horizon), line-work over light (traces, ribbons,
  outlines, dashed connectors), glass tiles with tinted shadows, hub-and-
  spoke icon rows, one dashboard shot bleeding off the bottom.
- **marcelkargul-1952697 — Chatsheet hero (video)**: soft-shaded iso
  conveyor, A1 second register; motion: linear conveyor along the iso
  axis, tiles bob, dotted paths converge; serif H1.
