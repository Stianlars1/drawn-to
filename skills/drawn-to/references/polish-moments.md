# Polish moments - where the small animations live, and what each one is

`animation-craft.md` says HOW to animate and when NOT to. This doc is the
missing half: a map of the MOMENTS that separate "built" from "felt" - the
number that should count, the label that should swap in place, the copy button
that should confirm, the check that should be earned. Distilled from
transitions.dev (Jakub Antalik, 18 transitions + decision rules), pixel-point's
animate-text (24 specs), Emil Kowalski's purpose gate, and the corpus
(refetch CountUp, basit_designs-2017 hover, insporadesign light decay).

Run the **polish pass** (bottom of this file) before any handoff.

## The state-change contract

The approved motion budget is the first gate. A static direction remains static;
polish still checks clear feedback, stable layout and readable state. The table
below is a catalog of optional treatments, not a list to apply everywhere.

1. Reserve enough room for changing text and numbers; do not let the primary
   action jump when its label changes.
2. Make important state changes understandable. A direct text/icon update is
   often correct; animation is optional and follows frequency, purpose and
   reduced-motion preferences.
3. Success needs a clear accessible signal. Use text, an icon or both as useful;
   a color shift may support them, but is not required and cannot stand alone.
4. Errors need persistent, actionable explanation. Do not rely on a shake or
   automatically erase the message while the error remains unresolved.

## Decision rules - match the element, then the verb

| You see | Optional treatment after the gate | Example values (not measured requirements) |
|---|---|---|
| A **number updates** (counter, price, balance, stat) | Number pop-in: each digit re-enters with blur; last two digits stagger | 500 ms · 8 px · blur 2 · stagger 70 ms · `cubic-bezier(.34,1.45,.64,1)` · tabular-nums |
| A **stat scrolls into view** for the first time (proof rows, "2 662 frames") | Count-up once: ease-out to the value, unit stays still, tabular digits; reduced-motion → final value | ~1.1 s ease-out, once per page (refetch CountUp) |
| **Text changes in place** ("Processing…"→"Done", "Save"→"Saved", tab captions) | Text-states swap: exit up+blur, enter from below; width reserved | 150 ms · 4 px · blur 2 · ease-in-out |
| **Two icons share a slot** (menu↔close, sun↔moon, copy↔check) | Icon swap: stacked in one grid cell, crossfade + blur + scale from .25 | 250 ms · blur 2 · ease-in-out |
| **Confirmation / done** (copied, saved, paid, uploaded) | Success check: fade + rotate from 80° + Y-bob + stroke-draw, paired with icon swap; semantic green | 500 ms · bob ease `cubic-bezier(.34,1.35,.64,1)` · path delay 80 ms |
| **Copy-to-clipboard button** | = text swap + icon swap + success color; revert after 1.4–2 s; width reserved | as above |
| **Headline + supporting line enter** (hero, empty state, onboarding) | Texts reveal: staggered blurred rise; exit is ONE quiet fade, never a reverse stagger | 500 ms · 12 px · blur 3 · stagger 40 ms · `cubic-bezier(.22,1,.36,1)` |
| **Hero title wants a signature entrance** | soft-blur-in per character (Apple register) or per-word crossfade (calm keynote) | per-char 900 ms/25 ms stagger, y 16, blur 12 · per-word 700 ms/70 ms, y 8 |
| **Hovering one item in a row** (avatars, chips, tag pills) | A quiet highlight; optional neighbor displacement in an approved playful showcase | lift −4 px · 320 ms · falloff .45 · return `cubic-bezier(.34,3.85,.64,1)` |
| **Validation error** (wrong PIN, invalid field) | Clear inline error text + invalid/focus state; motion optional, error persists until resolved | 6 px · 80/60 ms segments · hold 3 s · revert 280 ms |
| **Clearing an input** | Fly-out + per-word dissolve, new state flies in | 400/400 ms · 12 px · blur 2 |
| **Placeholder → loaded content** | Skeleton pulse then cross-fade + cross-blur into the real content | pulse 1 s · reveal 400 ms · blur 2 |
| **"Thinking" / streaming label** | Shimmer sweep across muted text, linear loop | 2 s · linear · band 400 % |
| **Segmented control / view switcher** | Sliding pill, first position written without transition | 250 ms · `cubic-bezier(.22,1,.36,1)` |
| **Hover hint on a trigger** | Tooltip: delayed fade+scale in, instant out; neighbours instant after the first | in 150 ms delay 80 ms scale .98 · out 50 ms |
| **Element changes width/height** on state | Reserve space or use a suitable transition if it clarifies the change; profile layout work | 300 ms · `cubic-bezier(.22,1,.36,1)` |
| **Anchored surface opens from a trigger** | Dropdown: origin at trigger, pre-scale .97, close .99 | open 250 / close 150 |
| **Centered surface** | Modal: scale .96, softer close; backdrop with it | open 250 / close 150 |
| **Panel slides into a region / page ↔ page** | Panel reveal (blur 2, 400/350 ms) · page side-by-side (8 px, blur 3, 250 ms) | |
| **Badge/dot appears on a trigger** | Slide in + pop the dot with one overshoot | slide 260 · pop 500 `cubic-bezier(.34,1.36,.64,1)` |
| **Nothing matches** | Don't invent - leave static, or ask. Static is a legitimate answer (animation-craft gate). | |

Tie-break: prefer the lighter transition (resize over panel, dropdown over
modal, success check over a celebration modal). If the element is hit 100+
times a day (shortcuts, command palette), the gate wins: no motion.

## Text effect families (animate-text) - pick by unit, not by mood

- **Per-character emphasis** - hero titles, one-line statements: `soft-blur-in`
  (Apple register), `per-character-rise` (no blur, crisp), `typewriter` (editorial
  stepped; corpus: 105 ms/char type, 45 ms/char delete).
- **Per-word phrasing** - headlines that should READ: `per-word-crossfade`
  (calm), `shared-axis-y` (hard-cut staircase 78 ms, `steps(1,end)` - sharp
  editorial swaps), `spring-scale-in` (playful, one overshoot).
- **Per-line editorial** - stacked copy: `mask-reveal-up`, `line-by-line-slide`.
- **Whole-phrase state transitions** - labels, captions, status: `fade-through`
  (420/260 ms, y 6, blur 2 - replace in the same slot, no direction),
  `micro-scale-fade` (600 ms, scale .96 - the premium tiny pop for short
  titles; non-overlapping swap), `focus-blur-resolve` (heavy blur → crisp).
- **Swap contract**: define exit, enter, overlap and micro-delay explicitly; for
  whole-phrase swaps keep overlap 0–20 ms so strings never overprint (the
  counter overprint defect); for per-word swaps overlap ~170 ms is fine.
- Unit matters more than effect: paragraphs per-word (per-char lags), labels
  whole, headlines per-char or per-word.

## Motion tokens (shared vocabulary)

Durations 40 stagger · 80 micro · 150 quick (close, swap) · 250 fast (open,
icon swap, tabs) · 350 medium · 400 slow (panel open, reveal) · 500 very slow
(emphasis: badge pop, text reveal, success). Easings: smooth ease-out
`cubic-bezier(.22,1,.36,1)` for open/close/slide/resize; ease-in-out for swaps;
linear for shimmer/spinners/ambient; bouncy `cubic-bezier(.34,1.36,.64,1)` only
for pops; strong bouncy `cubic-bezier(.34,3.85,.64,1)` only for hover-return.
Distances 4 (swap) · 8 (badge, slide, shake) · 12 (reveal) · 30 (check).
Scales .96 modal · .97 dropdown · .98 tooltip · .99 close. Blur 2 (swap,
icon, skeleton) · 3 (reveal, page) · 8–12 (success open, hero per-char).
These sit inside animation-craft's bands; the corpus's marketing choreography
(loops, scrub) runs longer by design.

## Implementation laws (from the snippets that work)

- Enumerate transitioned properties; never `transition: all`.
- Prefer interruptible CSS transitions or WAAPI retargeting; avoid forcing layout merely to replay an effect.
- Keep both states mounted for swaps (icon swap, text stack) - no remount flicker.
- `will-change` only on the animated pieces; animate the inner piece, not the container (badge dot, not the trigger).
- Every snippet ships its `prefers-reduced-motion` guard - keep feedback (color, final value), drop travel.
- Success check: `stroke-dasharray` = `path.getTotalLength()` rounded up; round caps.
- Count-ups and pop-ins: tabular numerals so widths never jitter; the unit glyph never moves.
- If the project has the `transitions-dev` or `animate-text` skills installed, adapt their snippets to the approved motion budget and current component (namespaced `t-*`, JSON contracts) - don't re-derive what is already tuned.

## The polish pass (before handoff)

Review only the moments the surface actually has. First apply the frequency,
accessibility and locked-motion gates in `animation-craft.md`. Then check:

1. Updating values remain exact and readable, with stable units/signs.
2. State text and icons change in a stable slot, with no accidental overprint.
3. Copy/save/send actions acknowledge the actual outcome accessibly.
4. Loading and errors explain the current state; errors do not vanish early.
5. Hover has an equivalent focus/keyboard path; touch does not depend on hover.
6. Any chosen entrance or loop has a useful static fallback and combined stop conditions.
7. Repeated input retargets cleanly; visual animation never delays canonical data.

The number-wheel and menu-preview references add two useful options:
kitlangton-2096041 keeps surrounding labels stable while digits change;
pqoqubbw-2093012 previews the consequence of a menu choice. Both still need
accessibility and interruption checks in a new implementation.
Record `POLISH: applied <list> · gated <list> · unresolved <list>` in the lock.
