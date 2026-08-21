# Animation recipes — ready-to-build implementations

Companion to `animation-craft.md` (which holds the gate, curves, springs and
never-ship rules). Adapted from Emil Kowalski's `animate` skill recipes.
Start from the recipe, adapt to the project's tokens — never rebuild from
scratch. Curves are the trio from animation-craft: `--ease-out`,
`--ease-in-out`, `--ease-drawer`.

## Button press

Any pressable element. `scale()` carries the label and icons with it — that
is what makes it read as a physical press. `:active` is a real press on
touch, so no hover gating needed here.

```css
.button { transition: transform 160ms var(--ease-out); }
.button:active { transform: scale(0.97); }
```

## Dropdown / popover / menu / select

Scales out of its trigger, not out of thin air — the origin is the whole
point.

```css
.popover {
  transform-origin: var(--transform-origin); /* Base UI supplies this */
  transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out);
}
.popover[data-starting-style],
.popover[data-ending-style] { opacity: 0; transform: scale(0.95); }
```

## Tooltip

Popover shape, faster — plus the detail most miss: after the first tooltip
opens, neighbours open instantly (skip delay AND animation), which makes the
whole toolbar feel faster without losing the accidental-hover guard.

```css
.tooltip {
  transform-origin: var(--transform-origin);
  transition: transform 125ms var(--ease-out), opacity 125ms var(--ease-out);
}
.tooltip[data-starting-style],
.tooltip[data-ending-style] { opacity: 0; transform: scale(0.97); }
.tooltip[data-instant] { transition-duration: 0ms; }
```

## Modal

The one popover that stays center-origin (not anchored to a trigger).
Backdrop animates alongside so the two read as one surface.

```css
.modal {
  transform-origin: center;
  transition: opacity 250ms var(--ease-out), transform 250ms var(--ease-out);
}
.modal[data-starting-style],
.modal[data-ending-style] { opacity: 0; transform: scale(0.96); }
.backdrop { transition: opacity 250ms var(--ease-out); }
```

## Drawer / sheet

Vaul's approach: hidden by its own height, iOS drawer curve. Adding drag
turns it into a gesture problem — see Drag to dismiss.

```css
.drawer { transform: translateY(0); transition: transform 500ms var(--ease-drawer); }
.drawer[data-closed] { transform: translateY(100%); }
```

## Toast

`ease` and slightly slower than the UI budget on purpose — Sonner reads as
elegant because the motion is tuned to the component's personality. Rapidly
added/removed ⇒ transitions, never keyframes.

```css
.toast {
  opacity: 1; transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); }
}
```

No `@starting-style` support → mount-flag fallback:

```jsx
useEffect(() => { setMounted(true); }, []);  // <div data-mounted={mounted}>
```

When stacked toasts reflow, opacity-vs-height has no formula — tune, then
re-check next day.

## Accordion / collapse

One of the few sanctioned `height` animations — it costs layout every frame,
so keep it short and measure the real height in JS (or use a primitive that
supplies it); never animate to `auto`.

```css
.content {
  overflow: hidden;
  transition: height 200ms var(--ease-out), opacity 200ms var(--ease-out);
}
```

## Stagger a group entrance

Occasional-view lists only. Decorative — must never block interaction.

```css
.item { opacity: 0; transform: translateY(8px);
        animation: fadeIn 300ms var(--ease-out) forwards; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
.item:nth-child(4) { animation-delay: 150ms; }
@keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
```

30-80ms between items in product UI (corpus word-group reveals at 100-150ms
are marketing-tier — motion-grammar governs those).

## Hold to confirm

Destructive actions. Progress fills linear (progress never eases); release
snaps. The asymmetry IS the design: slow where the user decides, fast where
the system responds.

```css
.overlay { clip-path: inset(0 100% 0 0); transition: clip-path 200ms var(--ease-out); }
.button:active .overlay { clip-path: inset(0 0 0 0); transition: clip-path 2s linear; }
.button:active { transform: scale(0.97); }
```

## Tab indicator with perfect color sync

Timing separate color transitions never lands. Duplicate the tab list, style
the copy as the active state, clip it to the active tab, animate the clip —
text and background change together because ONE element is being revealed.

```css
.tabs-active-copy {
  clip-path: inset(0 60% 0 20%);  /* driven by the active tab's position */
  transition: clip-path 250ms var(--ease-in-out);
}
```

(Corpus twin: marcelkargul-2089632's underline-as-light rides the same
clip/position mechanics.)

## Scroll reveal

Marketing surfaces only — never functional daily UI. Fire ONCE.

```css
.reveal { clip-path: inset(0 0 100% 0); transition: clip-path 600ms var(--ease-in-out); }
.reveal[data-visible] { clip-path: inset(0 0 0 0); }
```

Trigger via IntersectionObserver or `useInView({ once: true, margin: "-100px" })`.
For scrubbed (not fired) reveals, use `scroll-scrub.md` instead.

## Drag to dismiss

Springs, not durations — the user can reverse mid-motion. Full physics in
animation-craft §5.

```js
// Flick beats distance: dismiss on velocity, not threshold alone
const velocity = Math.abs(swipeAmount) / (Date.now() - dragStart);
if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) dismiss();

// Transform on the element directly — a CSS var on the parent recalcs all children
element.style.transform = `translateY(${distance}px)`;
```

The four details that separate good drag from bad: pointer capture on start ·
multi-touch protection (`if (isDragging) return`) · damping past boundaries ·
friction instead of a hard wall. Settle with
`{ type: "spring", duration: 0.5, bounce: 0.2 }` so an interrupted drag keeps
its velocity.

## Masking a crossfade that won't settle

Two states visibly overlapping despite easing/duration tuning → blur the
seam so the eye reads one transformation. Under 20px (Safari cost).

```css
.content { transition: filter 200ms ease, opacity 200ms ease; }
.content.transitioning { filter: blur(2px); opacity: 0.7; }
```

## Programmatic without a library (WAAPI)

CSS-grade performance, JS control, zero bundle.

```js
element.animate(
  [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
  { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' },
);
```
