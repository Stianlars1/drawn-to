# Scroll-scrubbed product scenes - the refetch stage pattern

Reverse-engineered from the shipped implementation in the refetch.sh repo
(`refetch-website/src/components/refetch/stage/` + `src/app/sections/hero.css`,
`chapters.css`, `manifesto.css`). Zero animation libraries: native CSS
scroll-driven animations (`animation-timeline`, `view-timeline`, `@property`)
plus ~100 lines of React for the interactive takeover. This is the owner's
favorite motion device - a product flow told as a scrubbable scene.

## What it is

The hero pins a staged product frame (a macOS desktop with the real app
window) while ~1.5 viewports of scroll scrub it through the product's core
flow (capture → land → enrich → recognize → hover → select → inspect). The
visitor owns the pace and can reverse it; the same scene can also be driven by
the visitor's real keyboard, and collapses to a composed still where scrubbing
isn't possible.

## Why it feels good (the load-bearing decisions)

1. **Scrub, not autoplay**: progress maps to scroll position - reversible,
   user-paced, never waiting on a video. Easing lives in the SPACING of the
   keyframe stops, not in the scrub (the timeline itself is linear).
2. **Semantic motion (C2/C6)**: the scene enacts the product's actual flow
   with the real UI fragments - product truth, not a rendered mock.
3. **Beats with holds**: stops leave gaps (fill 12-30%, land 34-45%, spin
   46-62%, hover 68-78%, peek 86-92%) so each beat reads before the next  - 
   the scene breathes instead of morphing continuously.
4. **One element owns all state**: every pose is a number on the stage root;
   everything below derives via `calc()`/`clamp()`/`color-mix()`. React never
   animates anything.
5. **Three drivers, one source of truth**: the same registered properties are
   driven by the scroll timeline, by keyboard-set scene attributes (ordinary
   CSS transitions interpolate them), or held at the final pose. No drift
   between paths.

## The architecture (recipe)

**1. Pose scalars.** One registered custom property per beat of the flow:

```css
@property --p-fill { syntax: "<number>"; inherits: true; initial-value: 0; }
/* --p-focus, --p-land, --p-spin, --p-recog, --p-hover, --p-select, --p-peek */
```

Everything in the scene reads them: `clip-path: inset(0 calc((1 - var(--p-fill)) * 100%) 0 0)`,
`rotate: calc(var(--p-spin) * 900deg)`, sub-windows via
`clamp(0, calc((var(--p-hover) - 0.75) * 4), 1)` (a beat can carve a sharper
inner window out of a longer scalar), accent blends via
`color-mix(in srgb, var(--rf-accent) calc(var(--p-fill) * 100%), var(--rf-control))`.

**2. One keyframe track.** A single `@keyframes` with %-stops; each property
appears only at the stops that change it and holds between. `animation: scene
linear both;` - linear, because pacing belongs to the stop spacing.

**3. The sticky run + view timeline.** Geometry is three numbers:

```css
--rf-vh: 100vh;                                       /* svh on phones */
--rf-stage-h: clamp(380px, calc(var(--rf-vh) - 220px), 620px);
--rf-stick-top: calc((var(--rf-vh) - var(--rf-stage-h)) / 2);  /* dead centre */
--rf-scrub-len: 150vh;                                /* how long it stays */
```

The run wraps the stage; a `::after` spacer of `--rf-scrub-len` gives it
length (a sticky box cannot travel into its parent's padding). The run gets
`view-timeline: --hero block`; the stage gets `position: sticky; inset-block-
start: var(--rf-stick-top)` and:

```css
animation-timeline: --hero;
animation-range-start: cover calc(var(--rf-vh) - var(--rf-stick-top));
animation-range-end: cover calc(var(--rf-vh) - var(--rf-stick-top) + var(--rf-scrub-len));
```

 -  so the scene runs exactly while the frame is stuck, derived from the same
three numbers. ALL of this sits inside `@supports (animation-timeline:
scroll())`: unsupported browsers get no spacer, no sticky, no dead scroll  - 
plain flow with the final pose.

**4. Interactive takeover (optional but the magic).** A driver state machine:
`scroll` (default, CSS owns everything) → `keyboard` (the visitor performs the
product's real gesture; scene numbers are set via `[data-scene]` rules and
move on ordinary transitions - registered properties are transitionable:
`transition: --p-fill 520ms linear, --p-spin 1400ms linear, --p-hover 700ms
ease-out 120ms;` durations mirror the real app) → back to `scroll` when the
visitor scrolls >24px. Discipline: listeners only while the stage is ≥35% in
view (IntersectionObserver); `focus({ preventScroll: true })`; Space acts only
while the stage owns focus (never hijack page scroll); Escape unwinds
stepwise; a visible hint chip invites the gesture, hidden on touch.

**5. Product-true geometry.** The staged window keeps the app's real minimum
width (430px) and is scaled by a ResizeObserver-computed `--rf-win-zoom =
min(1, availW/winW, availH/winH)` (floor 0.3) - never reflowed. Real row
heights pre/post state change are measured into `--rf-land-h1/h2` so the list
shifts exactly as the app's would. Popover position derives from geometry
(centred window ⇒ right edge computable), not from rects - no feedback loop.

**6. SSR**: gate on `CSS.supports("animation-timeline: scroll()")` via
`useSyncExternalStore` with a `false` server snapshot so first client render
matches the HTML.

## The mobile playbook (why it also works on phones)

- `--rf-vh: 100svh` - the sticky offset is fixed, so measure against the SMALL
  viewport; a height that grows when browser bars retract pushes the frame
  off-centre mid-scroll. This one line is the biggest mobile fix.
- Shorter scrub (`110svh` vs `150vh`) - thumbs scroll in flicks.
- Stage goes taller than wide (~4:5.2 of available width) and
  `--rf-stick-top: max(84px, centered)` so it clears the floating nav.
- The desktop framing is PRUNED, not shrunk: menubar keeps app name + two
  menus + clock; dock keeps five real tiles; blanks/separators/battery die.
- Side-panels become bottom sheets: solid background, `backdrop-filter`
  removed (perf), the window dims to 55% but STAYS visible - the story is
  "this row, inspected", which needs the row on screen; the window's
  peek-shift is zeroed so it never slides off-stage.
- Touch = no keyboard hint, no Space key prop (`(hover: none)` media).

## Fallback ladder (every rung composed, none broken)

1. Full: scroll-scrubbed + keyboard takeover (desktop, supporting browser).
2. No `animation-timeline` support: static final scene in plain flow,
   keyboard driver still live. No spacer ⇒ no dead scroll.
3. `prefers-reduced-motion`: poses still change state, nothing travels
   (translations zeroed); entrances collapse to fades via a travel token.
4. The final pose must carry the full pitch alone - it is the still most
   visitors' screenshots will show.

## Smaller-scale reuse (same idea, fewer numbers)

- **Chapter composites**: 2-3 registered props (`--c1..--c3`) per feature
  composite, each on its own `view-timeline`, scrubbing one mini-beat as the
  composite crosses the viewport; final pose held where unsupported.
- **Word-lit paragraph**: the paragraph is the timeline (`view-timeline:
  --thesis`); each word animates opacity over
  `animation-range: cover calc(10% + var(--i) * 0.9%) / calc(19% + var(--i) * 0.9%)`
  - index-driven stagger with zero JS.
- **Entrance reveals**: one staged entrance on first paint (semantic chunks
  100ms apart via `--rf-chunk` indexes), never per-line cascades.

## Choose when / avoid when

- **Choose**: hero product stages (the flagship use), feature chapters where
  a flow has 2-3 beats, "how it works" walkthroughs, any place a video would
  otherwise autoplay. Fits F1/F2/F3 pages; the stage itself is the one glass
  moment (refetch Q8).
- **Avoid**: content pages (docs, pricing) where scroll-jacking irritates;
  more than ONE long pinned run per page; scenes without a real product flow
  to tell (scrub demands a story with beats); any beat that only works at one
  viewport size.

## Evidence

Implementation: `refetch-website/src/components/refetch/stage/stage.css`
(poses, keyframe track, drivers, mobile), `Stage.tsx` (zoom/metrics, gating),
`useStageScene.ts` (driver state machine), `src/app/sections/hero.css`
(sticky-run geometry), `chapters.css`, `manifesto.css`. Corpus relatives:
adriankuleszo-2089328 (scroll-scrubbed word highlight, sticky step-rail),
ImranUxi-2089 (user-operated stressors over autoplay), toolfolio-2089
(cursor-driven demos). Constants served: C2 (show the feature), C6 (two
registers - scrub is user-driven interaction), C7 (composed end states), C12.
