# Animation craft — implementation doctrine

Distilled from Emil Kowalski's skills repo (github.com/emilkowalski/skills),
his animations.dev material, and Apple's Designing Fluid Interfaces — merged
with this corpus where they meet. Division of labor: `motion-grammar.md` is
TASTE (what the owner's references do, marketing surfaces included);
`scroll-scrub.md` is the scrubbed-scene pattern; THIS doc is BUILD DOCTRINE —
how any animation is implemented so it survives strict review. For product UI
and interactive components this doc governs; for marketing choreography
(loops, scrub scenes, camera moves) motion-grammar's registers govern and
this doc still supplies the mechanics.

Where the motion SHOULD exist — the small moments (numbers, state text,
confirmations, loading, hover rows) — is mapped in `polish-moments.md`; this
doc and that one are the two halves of the same discipline.

## 1. The gate — before any motion

Two failure modes; the worse one is animating what shouldn't animate.

| Frequency of exposure | Verdict |
| --- | --- |
| 100+ times/day (keyboard shortcuts, command palette, core nav) | No animation. Ever. |
| Tens of times/day (hovers, list nav, frequent toggles) | Near-imperceptible or nothing |
| Occasional (modals, drawers, toasts, settings) | Standard animation |
| Rare / first-time (onboarding, success, empty states) | The delight budget lives here |

- Keyboard-initiated actions are a disqualifier, not a judgment call
  (Raycast opens with no animation — correct at hundreds of uses/day).
- Name the purpose in ONE word before building: feedback · spatial
  consistency · state indication · bridging a jarring change · explanation
  (marketing only) · delight (rare-tier only). Can't name it → don't build it.
- Data being read or acted on never moves for style; decoration belongs on
  marketing surfaces.
- Producing zero lines of animation is sometimes the correct deliverable.

## 2. Tool ladder — cheapest that works

1. **CSS transition** — hover, press, class/attribute state toggles.
2. **CSS `@starting-style`** — entry on mount, no JS.
3. **CSS animation** — predetermined motion that must stay smooth while the
   main thread is busy (runs off-thread; rAF-based JS drops frames under load).
4. **WAAPI** `element.animate()` — programmatic control, CSS performance,
   zero bundle.
5. **Motion (motion.dev)** — springs, layout/exit animations, gesture values.

Never install a motion library for a fade. If the task is really a component
(toast, drawer, dropdown, command menu), reach for a proven primitive instead
of hand-rolling focus management around a div.

## 3. Properties

- Animate **`transform` and `opacity` only** (GPU; skip layout+paint).
  `clip-path` is the sanctioned third (§7). `height` tolerated only for
  accordions — keep those ≤200ms since they cost layout every frame.
- **Never `scale(0)`**; enter from `scale(0.9-0.97)` + `opacity: 0` —
  nothing real appears from nothing.
- **`transform-origin` at the trigger** for popovers/dropdowns/menus/
  tooltips (`var(--transform-origin)` in Base UI). Modals exempt: centered.
- **Percentages in `translate()`** move by the element's own size —
  `translateY(100%)` hides any drawer regardless of height. Prefer over px.
- In Motion, **use the full transform string** — `x`/`y`/`scale` shorthands
  run on the main thread and drop frames under load:
  `animate={{ transform: "translateX(100px)" }}`.
- **Never drive a child's transform via a CSS variable on the parent** — it
  recalcs styles for every child; set `transform` on the element directly.
- `transition: all` is always a defect — name the properties.

## 4. Curves and durations

Token trio (built-ins are too weak; never hand-roll new curves — take them
from easing.dev / easings.co):

```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);   /* strong UI ease-out — the corpus's easeOutQuint (Raycast, refetch) */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement/morph */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* iOS drawer curve */
```

Decision order: entering/exiting → ease-out · moving/morphing on screen →
ease-in-out · hover/color → ease · constant motion (marquee, progress) →
linear · default → ease-out. **Never `ease-in` on UI** — it delays the exact
moment the user watches; ease-out at 200ms *feels* faster than ease-in at
200ms.

| Element | Duration |
| --- | --- |
| Press feedback | 100-160ms |
| Tooltips, small popovers | 125-200ms |
| Dropdowns, selects | 150-250ms |
| Modals, drawers | 200-500ms |
| Marketing / explanatory | may run longer (motion-grammar governs) |

Product UI stays under 300ms. Perceived speed is a design material: a faster
spinner makes the same load feel shorter; tooltips after the first open
instantly (`[data-instant] { transition-duration: 0ms; }`).

## 5. Springs and gesture physics (the Apple doctrine)

Springs respond to new input mid-flight; fixed durations can't. Reach for
them for drag with momentum, "alive" elements, reversible gestures,
decorative pointer-tracking (interpolate via `useSpring`, never bind raw).

- Think **damping ratio + response**, not mass/stiffness: damping 1.0 =
  critically damped (no bounce), <1.0 overshoots; response = snappiness in
  seconds (not a duration — settle time emerges).
- House default: **damping 1.0 everywhere; bounce (~0.8 damping / bounce
  0.1-0.3) ONLY when the gesture carried momentum** — overshoot on a faded-in
  menu is wrong, on a flicked card right. Apple ships: move 1.0/0.4 ·
  rotation 0.8/0.4 · drawer 0.8/0.3. Motion mapping:
  `{ type: "spring", duration: 0.4, bounce: 0 }`.
- **Interruptibility is the most important principle**: never lock input
  during a transition; always animate from the PRESENTATION (current
  on-screen) value, never the logical target; blend velocity on reversal
  (no hard cuts); decompose 2D motion into independent X and Y springs.
- **Velocity handoff**: the settle animation starts at the finger's release
  velocity — `relativeVelocity = gestureVelocity / (target - current)`
  (Motion takes raw px/s via `velocity`). This seam separates fluid from fine.
- **Momentum projection**: pick the snap target from where the gesture is
  GOING, not where it ended:
  `project(v, rate=0.998) = (v/1000) * rate / (1 - rate)` →
  `target = nearestSnapPoint(current + project(releaseVelocity))`.
- **Rubber-banding** past boundaries:
  `(overshoot * d * 0.55) / (d + 0.55 * |overshoot|)` — progressive
  resistance, never a wall.
- Drag details: respect the grab offset (never snap to center) ·
  `setPointerCapture` · ignore extra touch points mid-drag · ~10px
  hysteresis before committing a direction · dismiss on flick velocity
  (`|distance|/ms > ~0.11`), not distance alone · track a short
  position/timestamp history for release velocity.
- Respond on pointer-DOWN, not release; feedback is continuous during the
  gesture (1:1), never only at the end.

## 6. Enter/exit discipline

- **Transitions, not keyframes, for anything triggered rapidly** (toasts,
  toggles): transitions retarget from the current value; keyframes restart
  from zero.
- Entry without JS:

```css
.el { opacity: 1; transform: translateY(0);
      transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); } }
```

  (fallback: `data-mounted` set in an effect).
- **Exit the way it entered** — same edge, same path; mirror easings on
  reversible transitions. Exits run faster than enters (~20-40%), EXCEPT
  physical light which decays slower than it ignites (motion-grammar).
- **Asymmetric deliberate/response timing**: slow where the user decides
  (hold-to-confirm 2s linear — progress never eases), snappy where the
  system responds (release 200ms ease-out).
- Stagger group entrances 30-80ms per item in product UI (the corpus's
  100-150ms word-group reveals are marketing-tier); stagger is decorative —
  never block interaction while it plays.
- Press feedback: `scale(0.97)` on `:active`, 100-160ms — `scale()` carries
  children with it, which is what makes it read as a press.

## 7. clip-path toolkit

`inset(t r b l)` eats in from each side; hardware-accelerated.

- **Tab indicator with perfect color sync**: duplicate the tab list, style
  the copy as active, clip it to the active tab, animate the clip
  (~250ms ease-in-out) — text and background change as ONE element.
- **Hold-to-confirm**: overlay `inset(0 100% 0 0)` → `inset(0 0 0 0)` over
  2s linear on `:active`; snap back 200ms ease-out on release.
- **Reveal on scroll** (marketing only): `inset(0 0 100% 0)` → 0 over
  ~600ms ease-in-out, fired ONCE (`useInView { once: true }`).
- **Comparison slider**: two stacked images, drag drives the top one's
  right inset. No extra DOM.

## 8. Masking and polish

- A crossfade that reads as two overlapping objects: add `filter: blur(2px)`
  + slight opacity dip during the transition — the eye merges them into one
  transformation. Keep blur <20px (Safari). (Corpus twin: insporadesign-2087's
  defocus-between-slides.)
- Modal + backdrop animate opacity together so they read as one surface.
- Match motion to the component's personality — a toast may run `ease` and
  slightly slow to feel elegant; a dashboard stays crisp. Opacity-vs-height
  in entering lists has no formula: tune, then re-check next day.

## 9. Reduced motion and pointer gating — ships WITH the animation

```css
@media (prefers-reduced-motion: reduce) { .el { animation: fade 0.2s ease; } }
@media (hover: hover) and (pointer: fine) { .el:hover { transform: scale(1.05); } }
```

Reduced motion = fewer and gentler, not zero: keep opacity/color that aid
comprehension, drop movement. Touch fires false hovers — gate all hover
motion. (`:active` press feedback needs no gate.)

## 10. Debug protocol

Play at 2-5× duration or step frames in the DevTools Animations panel (sync
between coordinated properties, origin correctness, abrupt easing ends);
test gestures on a real device via local IP + remote devtools; review with
fresh eyes the next day.

## Recipes

Ready-to-build implementations of the common cases — button press, dropdown/
popover, tooltip, modal, drawer, toast, accordion, stagger, hold-to-confirm,
tab indicator, scroll reveal, drag-to-dismiss, blur masking, WAAPI — live in
`animation-recipes.md`. When the request matches one, start from the recipe.

## Never ship

`transition: all` · `scale(0)` entrances · `ease-in` on UI · built-in
ease-out on deliberate motion · animation on keyboard/100+-per-day actions ·
UI >300ms without cause · center-origin trigger popovers · keyframes on
rapid triggers · animating width/height/margin/top/left · Motion shorthand
props under load · ungated hover motion · missing reduced-motion ·
everything entering at once · symmetric press/release on deliberate actions ·
input locked during a transition · gesture snap ignoring velocity.

## Corpus cross-checks

The doctrine and the taste corpus agree where they overlap: `--ease-out` IS
the corpus's easeOutQuint (Raycast, refetch Q); exit-faster-than-enter and
the light-decay exception are marcelkargul-2089632 / insporadesign-2088123;
linear-for-progress is C6's ambient register; 1:1 direct manipulation with
zero tween is F7 Tactile Instruments' non-negotiable; springs-carry-velocity
is why the corpus's drag demos feel mechanical-real. Where marketing
choreography needs longer, scripted sequences, motion-grammar and
scroll-scrub govern — but their mechanics still follow §3, §5 and §9.
