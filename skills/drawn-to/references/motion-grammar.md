# Motion Grammar

Synthesized from 45 reverse-engineered X/Twitter design references. Motion census: **27/45 contain motion** (15 full-choreography, 8 sequence, 4 micro); 18 are static - and even the statics are staged as frozen interaction moments or "animation-ready" separable planes (piyushsphere-2089, marcelkargul-2090148, _heyrico-2090, adriankuleszo-2090).

> **Corpus note (2026-08-22).** The census counts in this file were computed on
> the first 45 references and have not been re-derived. The library now holds 57
> (`matrix.md`). Twelve references are therefore NOT reflected in the ratios
> above: 0xhammermann-2090, flohoeller-2090, marcelkargul-2089371 /-2089404
> /-2090509 /-1952697, local-feature-graphics, local-production-heroes,
> local-chatsheet-iso-bento, local-stashr-dark-bento, local-vite-feature-sheet
> and local-keep-photographic-trio. The named patterns hold - the newer
> references corroborate rather than contradict them - but treat every "n/45"
> as a floor, not a total, and read the newer posts directly before citing a
> ratio.


Citation convention: slugs shortened to `author-first4digits`; a 5th digit is added only where an author has two posts sharing the first 4 (e.g. adriankuleszo-2089253 = …2089253, adriankuleszo-2089328 = …2089328, adriankuleszo-2089887 = …2089887; basit_designs-2089627 = …2089627, basit_designs-2089995 = …2089995; marcelkargul-2089632 = tabs, marcelkargul-2090148 = iso cards; _heyfaisal-2089369 = delete morph, _heyfaisal-2089734 = FLOWAI).

---

## 1. Core thesis: motion IS the feature (semantic motion)

**Explanatory motion - observed in 21/27 early motion references.** When an
animation explains a feature, its behavior should help communicate that capability.
LexnLin-2024 demonstrates features with their copy covered. A character gesture,
image collection, atmosphere or interface transition can instead serve identity,
composition or orientation; it need not enact a marketing verb.

Catalog of semantic-motion devices observed:

| Device | What it does | Refs |
|---|---|---|
| **Loops that enact the copy** | Rows reorder = "organize"; title types itself = "effortless input"; chips compress into `client-delivery-v3.zip` = "one-click handoff"; annotations pop on footage = "annotate videos"; kanban card drags itself = "visual pipelines" | LexnLin-2024, AlexandruDranga-2090, Triopixels-2089, adriankuleszo-2089328 |
| **Simulated cursor tours** | A scripted cursor walks the grid with narrative pacing, firing one-shot micro-anims en route; the demo is directed like a screen recording | basit_designs-2017, adriankuleszo-2089253, toolfolio-2089, mickces-2088 |
| **Live micro-demos with real state** | OTP with a printed pass rule ("Enter 123456 to pass"), demos that write real rows (name · Hz · duration) into a live list, true disabled states, A/B rigs with user-operated stressors | toolfolio-2089, mickces-2088, ImranUxi-2089, flornkm-2089, GrahamPaterson-2089 |
| **Count-ups riding draw-heads** | % chip rides the glowing bar head while numerals count up; employee counter (14→132) eased in lockstep with the slider tick; slider counts through real intermediates (005, 012, 027…) | mnowakdesign-2089684, adriankuleszo-2089253, recentdesign-2089, jeetnirnejak-2089 |
| **State-change hovers** | Hover acts out the feature's actual state change: toggle flips color+label+avatar layout+saturation, not a lazy scale | Triopixels-2089, kail_designs-2089, insporadesign-2088, arknow91-2089 |
| **Self-running scripted intros** | 3-beat story (problem ~2s → hold ~0.9s → resolve ~0.7s), canceled by any pointer-down | jeetnirnejak-2089, recentdesign-2089 |
| **Feature-shows-itself system feedback** | Continue button silently morphs gray→green when the Mac is discovered; trackpad announces itself with a dot-grid ripple wave (~800ms); touch = radial ripple (~600ms) | helvetiica-2089 |
| **Physics as demonstration** | Gel track dents/ripples with drag velocity; metaball fission for a speed dial; goo split for confirm-to-delete; glyphs with real gravity | recentdesign-2089, arknow91-2089, _heyfaisal-2089369, toolfolio-2089 |
| **Data animating the way the product creates value** | Forecast line forks into a 3-color scenario fan with flare at the split; leaderboard re-sorts live with motion-blurred swaps + green score flash | mnowakdesign-2089684 |
| **Transition as material** | One persistent shader lerps palette uniforms through intermediate hues + defocus pass instead of image crossfade | insporadesign-2087 |
| **Generative proof** | Demo visuals regenerate per replay (blob faces, confetti, waveforms) to prove a "never the same twice" claim instead of stating it | mickces-2088 |

Corollary for statics: features staged as **frozen micro-interactions** - I-beam cursor mid string-swap, rerouting toast, tooltip mid-action (piyushsphere-2089); illustrations drawn as **discrete separable planes so animation is assembly, not redraw** (marcelkargul-2090148).

---

## 2. Loop engineering

### 2a. Desynchronized concurrent periods - 7 refs
These examples use deliberately different clocks for independent activity.
Coordinated scenes may instead share a period or phase:
- **2.45s / 2.5s / 5s / 7.4s / continuous** - five cards, co-prime-ish (LexnLin-2024)
- **~2s / ~3.3s / footage-synced (11.6s)** - three cards (AlexandruDranga-2090)
- **6.0s radar / 3.0s-per-pitch marquee / ~15px/s smoke drift** (basit_designs-2017)
- **2.33s breath vs ~24s hue orbit - non-commensurate, loop never visibly repeats** (madebylalit-2088)
- **4–6s ambient node drift under 300–400ms hovers** (Triopixels-2089)
- **staggered per-quadrant cut waves at ~3.5/6/8.5/12.5s so some region is always mid-animation** (mnowakdesign-2089684)
- **ambient dial loop persists through camera moves** (adriankuleszo-2089253)

### 2b. Seamless-loop closure - 16/27 verified
The cycle boundary is continuous in pose and velocity, engineered rather than hoped for:
- End state pixel-identical to frame 1 (flornkm-2089, arknow91-2089, marcelkargul-2089632 "frame 36 = frame 1", its_sslvr-2088, madebylalit-2087 "frame-perfect seam", recentdesign-2089, Triopixels-2089, _heyfaisal-2089369)
- Closure techniques: fade out to the intro's blank state (~800ms) and restart (adriankuleszo-2089253); camera returns to its opening wide shot (adriankuleszo-2089328, Triopixels-2089); full state reset on container mouse-out (insporadesign-2088); exact integer revolutions per loop - one 360° per 20s (madebylalit-2087), one field revolution per 10.5s (its_sslvr-2088); `loopDuration`-driven math, never open-ended time accumulation (alaymanguy-2088); non-commensurate periods as the alternative to closure for indefinite states (madebylalit-2088)
- Counter-example logged as a defect: dial demo starts at 62, ends at 3 - "loop is not seamless" (cabralorenzo-2090)

### 2c. Steady drift, periodic action and interaction
Steady rotation and marquees often use linear timing. Breathing, pendulums and
semantic scenes can ease or pause within a repeated period. Interaction should
respond promptly and retarget cleanly. A linear clock does not imply constant
screen-space velocity; choose timing from the event, as the examples below show.
- Ambient linear values: radar 60°/s (basit_designs-2017); gradient field ~34°/s (its_sslvr-2088); orb ring 18°/s = 1 rev/20s (madebylalit-2087); hue orbit ~15°/s (madebylalit-2088); marquee ~35px/s (LexnLin-2024); marquee 1 icon-pitch (~86px)/3s (basit_designs-2017); smoke ~15px/s; shader crest ~10px/s (insporadesign-2087); camera drift 5–15px/s (mnowakdesign-2089684); mist morph ~1.4/255 luma per 167ms, zero pan (basit_designs-2089627); shader uSpeed < 1 - "drift, never demand attention" (alaymanguy-2088)
- Why linear: "any ease would create a visible heartbeat at the seam" (madebylalit-2087)
- Interaction register: 200–450ms eased, detailed in §3–4.
- Exception: ambient *breathing* (not rotation) uses sinusoidal ease-in-out, period 2000–2500ms, zero hold, zero overshoot (madebylalit-2088).

---

## 3. Easing table

| Easing | Where it belongs | Measured instances |
|---|---|---|
| **Linear driver** | steady rotations/marquees or direct scroll progress where that is the intended relationship | 60°/s radar (basit_designs-2017); 18°/s orb (madebylalit-2087); 35px/s marquee (LexnLin-2024); scroll-linked word highlight "scrubbed, no easing" (adriankuleszo-2089328); scroll peel scroll-linked not time-based (kail_designs-2089) |
| **Ease-out** | Entrances, hover-in, reveals, camera settling - the default interaction curve | word blur-reveal 400–500ms (adriankuleszo-2089253, ImranUxi-2089); tab underline enter 650ms `cubic-bezier(0.16,1,0.3,1)` (marcelkargul-2089632); goo split 350–450ms (_heyfaisal-2089369); chips fade+rise 300ms (AlexandruDranga-2090); tooltip 150–200ms (GrahamPaterson-2089); carousel slide 450ms, long deceleration tail (ImranUxi-2089); screen push 400–450ms (helvetiica-2089) |
| **Ease-in** | Exits and "suction"/absorption - exits are faster than entrances | tab underline exit 400ms vs 650ms enter (marcelkargul-2089632); chips converge into zip pill ~450ms "ease-in then snap" (AlexandruDranga-2090); goo merge ~20% faster than split (_heyfaisal-2089369) |
| **Spring / overshoot** | ONLY discrete physical acts and programmatic corrections: shuffles, fissions, drops, pops, motorized snaps | row shuffle `cubic-bezier(0.34,1.56,0.64,1)` 400–450ms, ~4–6px overshoot (LexnLin-2024); dial fission stiffness ~180 / damping ~18, 4–6px overshoot (arknow91-2089); Auto correction ~10% overshoot, ~1.2s settle (jeetnirnejak-2089); cube tumble stiffness ~120 / damping ~14, 1–2 oscillations, 500–700ms (recentdesign-2089); character pop scale 0→1.06→1, ~400ms, ONE overshoot (mickces-2088); nav dot slide ~400ms spring (toolfolio-2089); icon pop 0.6→1 ~250ms slight overshoot (adriankuleszo-2089328); knob release ~stiffness 300 / damping 30 - energy dissipates as width contraction, NOT bounce (flornkm-2089) |
| **Sinusoidal ease-in-out** | Ambient breathing for stare-at states (loading/thinking); period 2000–2500ms, no hold, no overshoot | madebylalit-2088 |
| **Ease-in-out** | Camera moves and long draws | zoom 700ms / dolly 700–800ms / pull-back 900ms (adriankuleszo-2089253); chart draw 800–1500ms (mnowakdesign-2089684, adriankuleszo-2089328); camera 600ms (GrahamPaterson-2089) |
| **Expo-out** | Product-film camera zooms, paired with motion blur | ~600–700ms zooms (toolfolio-2089); implied build 600ms expo-out (marcelkargul-2090148) |
| **Stepped / discrete** | Typewriters and variant swaps | type ~105ms/char, delete ~45ms/char (2.5x faster), caret always visible (LexnLin-2024); color-variant swap <150–310ms, "instant", no crossfade (kail_designs-2089); zone recolor 120ms crossfade (cabralorenzo-2090) |
| **None (1:1 per frame)** | Direct manipulation - the value NEVER tweens | dial numeral tracks pointer per-frame, "hardware encoder" (cabralorenzo-2090); drag gives continuous fractional f-stops, zero smoothing (jeetnirnejak-2089); input mapping direct, only reactive layers spring (recentdesign-2089) |
| **No springs at all** | Documentation / inspector / teaching UI - "inspector-calm" | pure ease-out everywhere, zero overshoot (ImranUxi-2089); tooltip 150–200ms, highlight 120ms, no springs (GrahamPaterson-2089) |

### Duration norms
- **Hover feedback: 100–450ms.** Fast lane 100–200ms: fill crossfade ≤150ms (_heyfaisal-2089369), highlight 120ms (GrahamPaterson-2089), pill-group reveal ~150ms (kail_designs-2089), lift ~150ms (mickces-2088), LED ignite ~200ms (insporadesign-2088). Semantic-state lane 300–400ms ease-out with **symmetric same-duration reversal on leave** (Triopixels-2089). Hover envelope with hold: in ~230ms / hold ~570ms / out ~200ms (basit_designs-2017).
- **State morphs: 300–550ms** (arknow91-2089 open 450–550ms; _heyfaisal-2089369 split 350–450ms; flornkm-2089 300–350ms; helvetiica-2089 pushes 400–450ms; toolfolio-2089 pill morph ~350ms).
- **Enter/exit asymmetry, two polarities:** (a) committing enters are *slower* than exits - 650ms in / 400ms out (marcelkargul-2089632), merge 20% faster than split (_heyfaisal-2089369), delete 2.5x faster than type (LexnLin-2024); (b) *light* inverts it - ignite fast ~200ms, decay slow ~350ms "like a phosphor lamp cooling" (insporadesign-2088), accent decays ~300ms after separation (arknow91-2089), blur in 250ms / release 350ms (insporadesign-2087).
- **Stagger intervals: 60–180ms between siblings** - ~100ms chips (AlexandruDranga-2090), 100–120ms per word / 150ms per group (ImranUxi-2089), 100–150ms word groups (adriankuleszo-2089253), 80–180ms bars/rows/cards (mnowakdesign-2089684), ~60ms folder papers (toolfolio-2089), 80–120ms implied cascade (_heyrico-2090). Sections stagger 400–800ms; "never move two hierarchy levels at once" (mnowakdesign-2089684).
- **Camera: 600–900ms** per move; dwell 1.5–3s per subject (adriankuleszo-2089328 1.5–2s; GrahamPaterson-2089 2–3s reading pauses; toolfolio-2089 ~3s per feature).
- **Full transitions (blur+color+text): 850–1200ms** total, color lerp 900–1200ms with long ease-out tail (insporadesign-2087).
- **One-shot icon micro-anims: ~400–450ms, fired once** on cursor pass, not looped (basit_designs-2017).

---

## 4. Sequencing & causality

- **Single-cause events fire on ONE clock, zero stagger.** A tab activation runs bar width + text color + pill gradient + glow simultaneously (marcelkargul-2089632); all light-linked layers (bar, wash, shadow, halo, 1.01 scale) on one cue - "which is what makes it read as electricity, not UI" (insporadesign-2088).
- **Multi-object events stagger 60–180ms** (see above) - siblings cascade; a single state change never does.
- **Content leads shape by ~1 frame:** the label starts sliding out from behind the icon before the container deforms (_heyfaisal-2089369).
- **Position leads color by 80–100ms:** knob lands before the track crossfade finishes (flornkm-2089).
- **Text strictly after refocus:** fade out with the blur, fade in 250–300ms after sharpness returns, description trailing title by ~120–150ms (insporadesign-2087).
- **Ordered choreography, reversed on close:** open = rotate + → × (~150ms) THEN fission; close = un-rotate FIRST, then absorb, land squashed, relax (arknow91-2089).
- **Safe option resolves first:** Cancel sharpens before Confirm mid-morph (_heyfaisal-2089369).
- **One scalar, several instruments, distinct lags:** value echoed across counter, dial, and track with ~100ms per-instrument lag so the system feels mechanical, not synced-by-code (recentdesign-2089); one scroll scalar drives ring fill + section label (toolfolio-2089); gauge chases the thumb with ~100ms lag (recentdesign-2089).
- **Secondary motion trails 150–250ms and damps within 600–800ms** of rest (recentdesign-2089); needle afterimage ghosts decay ~120ms, 2–3 copies (jeetnirnejak-2089).
- **Markers pop as the draw-head passes them,** not before (mnowakdesign-2089684).
- **Velocity, not position, drives feedback amplitude:** gel deformation scales with drag speed (recentdesign-2089); blur scales with speed - 0 at rest, peak ~8–12px mid-transition, crisp within ~100ms of settle (_heyfaisal-2089369).

---

## 5. Cursor choreography

The corpus treats the cursor as a directed actor (~14/27 motion refs feature a visible performing cursor):

- **The tour:** simulated cursor tours a grid in the same rotational direction as the ambient element (radar CCW → tour BR→BL→TL→TR), with narrative pacing - slow pass ~800ms/cell, fast pass ~450ms/cell, then rest - firing one-shot ~430ms icon anims as it passes (basit_designs-2017).
- **Presentational pace:** a drag choreography takes a deliberate ~2.8s, cursor arcs with slight bob, dragged item tilts ±8° following drag direction, spring-smoothed cursor easing (adriankuleszo-2089253).
- **Cursor-directed tour (toolfolio):** staged hovers, typing, and clicks drive the demo; ~3s per feature, expo-out camera zooms with motion blur between beats (toolfolio-2089).
- **Pre-hover attraction:** the surface deforms toward the cursor from ~150–200px away, 10–15% of radius, ~100–150ms spring lag - reaction before contact (arknow91-2089).
- **Cursor as composition:** oversized ~56px black arrow with white outline and drop shadow, part of the frame (_heyfaisal-2089369); custom rounded blue translucent triangle (adriankuleszo-2089253); system grab/grabbing hand as the ONLY affordance for wheel controls (cabralorenzo-2090).
- **Tooltips:** fade+slide in 150–200ms ease-out with 8–12px translate, anchored to cursor; dwell 2–3s for comprehension (GrahamPaterson-2089); tooltip text swaps in place with no layout shift (insporadesign-2088); tooltip follows cursor over heatmap cells (toolfolio-2089).
- **Click feedback:** key press flashes ~150ms fade-back (helvetiica-2089); pressed FAB dims to gray (GrahamPaterson-2089); ignite pressed control <100ms, relax ~300ms after release (recentdesign-2089).
- **Named multiplayer cursors** (colored arrow + 11px dark pill label, one warm one cool) idle with sub-pixel jitter to imply liveness (basit_designs-2017, adriankuleszo-2089887).
- **Any touch cancels the scripted demo** - autonomy always yields to the user (jeetnirnejak-2089).

---

## 6. Hover grammar

What hover DOES in this taste:
1. **Enacts the real state change.** Focus-Mode pill: #15191A→#1D9847 green, label crossfades "Disabled"→"Active now", avatar cluster de-overlaps, greyscale→color, rings fade in - 300–400ms ease-out, symmetric reversal (Triopixels-2089).
2. **Behaves as a light source.** 1px gradient border brightest on the bottom edge fading up the sides + directional ≤8% teal wash - "light behaves as if it has a source" (basit_designs-2017); LED bar blooms with an upward-cast logo shadow and matching ceiling halo - shadows cast AWAY from the fake source (insporadesign-2088); underline = light source with under-lit pill gradient + glow cone bleeding through the divider (marcelkargul-2089632).
3. **Reveals actions in place.** Tile dims to ~30%, 2×2 pill group fades in ~150ms, "Copied!" confirmation renders inside the tile - no global toast (kail_designs-2089).
4. **Merges liquid surfaces.** Accent drawn as a 2px gradient stroke on the metaball seam, glyph recolors ~200ms AFTER surfaces merge; multi-bridge states keep per-seam hues (arknow91-2089).
5. **Lifts only when lift is the message.** translateY(−2px) + shadow growth 150ms - used on the card that demos the *hover sound* (mickces-2088); offset bracket frame closed by ~1.01 hover scale (insporadesign-2088).

What hover NEVER does:
- Generic scale/lift on feature cards - explicitly contrasted against the semantic toggle (Triopixels-2089).
- Uniform outlines - always a directional/gradient border (basit_designs-2017).
- Hue changes in monochrome systems - state is luminance only, #8A8A8A→#FFF (marcelkargul-2089632, insporadesign-2088).
- Snap on exit - reversal is eased at the same duration (Triopixels-2089); or decays slower than it ignited (insporadesign-2088).
- Queue with other animations - hover feedback ≤150ms and independent of any morph in flight (_heyfaisal-2089369).

---

## 7. Entrance patterns

- **Word-group blur reveal (the signature entrance):** headline resolves in reading order from gaussian blur + opacity; ~400–500ms per group, 100–150ms stagger, ease-out; body and links resolve last (adriankuleszo-2089253). Word-level variant: blur(12px)→0 + fade + 8px rise, ~400ms per word at 100–120ms cadence; grouped variant: 3 groups at ~150ms stagger, ~500ms each, ~850ms total (ImranUxi-2089).
- **Virtual camera as narrator:** one continuous camera - zoom in ~700ms ease-in-out (to ~2.2x), dolly card-to-card 700–800ms, pull back ~900ms - turns a static section into a guided tour; ambient loops keep running through camera moves so the scene never freezes (adriankuleszo-2089253). Auto-camera grid tour with 1.5–2s dwell, seamless return to opening frame (adriankuleszo-2089328). Reels: parallel quadrant tracks with staggered cut waves; finale = the only zoomed-out flat full-product shot (mnowakdesign-2089684).
- **Scroll-scrubbed devices:** manifesto text brightens word-by-word #4a4653→#fff, scroll-linked with NO easing; sticky step-rail with left media panel morphing per step (adriankuleszo-2089328). Hero peels on scroll - scales to ~92% + rotates ~−2.5°, revealing a marquee wall; scroll-linked, not time-based (kail_designs-2089).
- **Chart entrances:** line draws left→right 700–1500ms ease-in-out, dot markers pop as the head passes, supporting rows fade up at ~100ms stagger; forecast forks flare at the split before branching (mnowakdesign-2089684, adriankuleszo-2089328).
- **Cascade order = hierarchy order:** breadcrumb words → sidebar items → cards → badges last (~200ms after their card) (mnowakdesign-2089684); titles resolve before descriptions, links last (adriankuleszo-2089253).
- **The null entrance:** when the background is alive, ship the page fully composed at t=0 - zero fades, zero staggers (basit_designs-2089627); pure loops start live with no entrance choreography (AlexandruDranga-2090, Triopixels-2089).
- **Draw-on annotations:** hand-drawn marker ellipse draws itself in ~600–700ms ease-in-out with an overshoot loop (helvetiica-2089).
- **Screen transitions (native):** pushes 400–450ms ease-out with parallax - outgoing slides ~40% and dims; sheets rise ~450ms with layered stagger (helvetiica-2089).

---

## 8. Restraint techniques in the cited scenes

- **"Hold state measurably static."** Glow-region luminance flat across 7 consecutive frames - zero idle pulsing, "confidence" (marcelkargul-2089632). Leave ~500ms of full rest between consecutive state changes in a loop (marcelkargul-2089632).
- **Still reading anchors.** In basit_designs-2017, layout and type stay fixed while chrome renders, smoke and gradients flow inside them; slide transitions move NOTHING positionally - opacity, blur, and shader uniforms only (insporadesign-2087).
- **Ambient motion sits just above the perception threshold:** ~3° per frame ring rotation, "alive, not spinning" (madebylalit-2087); mist at ~1.4/255 luma per 167ms - "motion you feel rather than watch" (basit_designs-2089627).
- **A restrained ambient budget** keeps the Triopixels and alaymanguy examples calm.
  A kinetic collection can have several moving items inside one protected envelope.
- **Springs are rationed** to pointer-driven and physical moments; plain fallbacks stay 180–250ms ease-out with zero deformation (flornkm-2089); documentation and teaching UI get no springs at all (GrahamPaterson-2089, ImranUxi-2089).
- **Sinusoidal, overshoot-free cadence for stare-at states** - calibrated for a 30s+ gaze (madebylalit-2088).
- **Static must be complete.** 18/45 refs carry zero motion and still read finished; three animated refs deliberately ship composed at t=0 (basit_designs-2089627, AlexandruDranga-2090, Triopixels-2089). For reduced motion, select a composed frame that preserves the intended meaning, rather than always using the final frame - the corpus's statics prove the layouts work frozen (piyushsphere-2089 stages the same semantics as stills).
- **State honesty even in demos:** disabled controls actually gray out and rewrite their captions (mickces-2088); chevrons dim to ~25% at range ends instead of hiding (insporadesign-2087, jeetnirnejak-2089); values clamp visibly and stay where released - no snap-back (cabralorenzo-2090).
- **Interruptibility:** any touch cancels a scripted intro (jeetnirnejak-2089); prefer transitions over keyframes for anything a user can interrupt mid-flight (ImranUxi-2089); press states are stable, holdable poses - commit on release so gestures are cancelable (flornkm-2089).

---

## Applying the motion references

1. **Name the event and role.** A feature demo explains capability; a collection
   arranges content around still anchors; a character expresses identity;
   functional feedback communicates state. Use the corresponding QA criteria.
2. **Choose its timing.** A steady marquee or rotation commonly uses a linear
   driver. A repeated character gesture or semantic cycle can ease and hold.
   Responsive interaction uses a curve or spring suited to interruption.
3. **Choose the relationship between clocks.** Independent activity can use
   different periods. Related events, sequences and shared worlds can run in
   unison or with deliberate phase offsets. A fixed one-period-per-cell rule
   would erase meaningful synchronization.
4. **Check the actual loop boundary.** Preserve continuity of pose and intended
   velocity. A source recording's start/end need not be a loop boundary, and
   duplicating the first frame at the end can create a stutter. For an authored
   loop, test the transition itself and choose its static poster separately.
5. **Select rather than accumulate recipes.** The measured easing, duration,
   cursor, gesture and light treatments above belong to their source events.
   Keep the approved motion budget; no automatic blur entrance, camera tour,
   cursor actor or spring is required for a static or differently composed page.
6. **Keep direct input honest.** Canonical values update immediately. A visual
   follower may smooth or spring if it stays understandable; it must not delay
   the real value, obscure an error or make the control inaccessible.
7. **Preserve causality and reading space.** Motion can show where a state came
   from or how an object changes. Inspect extremes so moving collection items,
   overlays and gestures do not cover essential text/actions.
8. **Use a complete fallback and combined stop conditions.** Name the poster
   for a semantic loop, or a useful static arrangement for a collection. Honor
   reduced motion and interruptions; use `render-tiers.md` for background
   renderer eligibility and `animation-craft.md` for implementation mechanics.

## Addendum - isometric scenes (0xhammermann-2090)

- The camera NEVER moves: no rotate, no dolly, no scroll parallax between grid
  and objects, no scene rotation. The world opens, slides or fills instead.
  Full construction and transform contract: `isometric-and-light.md` § A2, A2f.
- This exemplar distinguishes its independent claims with different rhetoric
  (never-arrives / passes-directly / opens-and-closes). Preserve meaningful
  distinction when transferring that method; a sequence or shared-world scene
  may deliberately repeat an action as its state evolves.
- Stillness is a legal phase and often the largest one (the exemplar holds
  1133 ms with nothing moving); idle bobs, floats and pulses are the
  generated-motion tell.

Addendum - hover-light grammar (flohoeller-2090)

- Hover may be LIGHT ONLY: no scale, lift, or border change anywhere - a
  brand-hued underglow blooming under the tile, ~250ms ease-out ignite,
  500-600ms lamp decay. The corpus's most minimal complete hover grammar.
- "Hover changes hue; ambient carries position": a pointer may recolor/charge
  orbiting glyphs (gray → accent) while the constant-velocity rotation runs
  unbroken through hovers, pans, and zooms - never pause the ambient register
  for an interaction.
- Proximity build-once: a diagram may assemble in causal order on FIRST
  pointer approach (hub → satellites +150ms → frame/empty slots +300-450ms),
  then persist composed. One one-shot light-sweep along a connector is
  allowed as it first draws, then it rests as a static hairline. Distinct
  from in-view entrances: pointer-proximity triggered, runs once.

---

## Board motion - measured additions (2026-08-22)

Distilled from two full-choreography feature boards analysed frame by frame
(182 frames and 842 frames). Tiers: **A** = adversarially re-measured, **B** =
scale solved, **C** = ratios and frame counts only.

**Harmonic lock (Tier B).** On this coordinated board, the reported oscillator
periods are integer divisions of its master loop - 182/1, 182/2, 182/3. Verified by FFT
of the temporal stack: one cell returns k = 2 at 60 % of its moving pixels,
another k = 3 at 62 %. **That lock, not a crossfade, is why a multi-cell loop has
no visible seam.** For a reconstruction of this shared cycle, compare period and phase directly;
an FFT bin index alone is not a general loop-quality test.

**Anchor pinning (Tier B).** Name the ONE object per cell that cannot move, and
pin it to sub-pixel accuracy for the whole loop; animate everything else relative
to it. Verification: template-match the anchor against frame 1 - residual under
1.0 at every frame (measured 0.00 for one tile across all 182 frames, centroid
drift under 0.3 px for another). Without an anchor the cell reads as drifting
even when every element is individually correct.

**Dwell budget (Tier B).** One discrete event per loop per cell; everything else
is a hold or a slow float. The measured event occupies **24 % of the loop** and
the other 76 % is a dead hold. A loop that RESTS - 5.15 s of complete stillness
measured between pulse rounds on the second board - is a legitimate and calming
choice that generators never make.

**Unison in a shared-world board (Tier B).** This source clusters satellite
peaks at 49-58% of the loop. Preserve that coordinated relationship when using
this recipe. Independent feature demos or another approved choreography may
use stagger or different periods instead.

**Three easings, named and distinguished.** "ease-in-out" was covering all three:
- **Raised cosine** for ambient hover. Verify against normalised 0.077 / 0.26 /
  0.62 / 0.84 / 0.96 at t = 0.18 / 0.36 / 0.55 / 0.73 / 0.91.
- **easeInOut of power ~2.4 with dwells at both ends** for lane slides, roughly
  `cubic-bezier(0.65, 0, 0.35, 1)`.
- **Front-loaded settle** for a pop: `cubic-bezier(0.22, 1, 0.36, 1)` or a
  critically damped spring.

**Carousel step (Tier A).** 58 frames per slot with an exponential ease-out whose
per-frame displacement decays at a constant ratio of ~0.82 (time constant ~5
frames, settling over ~26): 118, 107, 85, 72, 64, 50, 43, 36, 30, 24, 20, 16, 13,
10, 8, 7, 5, 4, 3, 3, 2, 2, 1, 1, 1, 1. That decay curve IS the character of the
motion; a linear slide with an ease-out tail is not the same object.

**Orbit (Tier A).** 3.1292 degrees per frame, linear, no easing (straight-line fit
residual rms 0.732 deg over 65 frames), full revolution 115.04 frames, two dots
exactly antipodal. Ambient register: avoid accidental stop/start seams in steady drift; eased periodic gestures are valid (C6).

**Round-robin pulse (Tier A).** One item in flight at a time, fixed interval
(8.4 frames), fixed round length (50.5 frames for six marks), **always inward
toward the hub**, each pulse fading in and out over 3-5 frames so it never
occupies the whole path. A path fully covered by its own pulse stops reading as a
path.

**Cursor choreography (Tier A).** Travel with a hard ease-out - about 90 % of the
distance in the first third, then a 4-6 frame settle of 10 / 5 / 5 px. Dwell
1.5-2.0 s on the control. A consequence must be visible within 6 frames of the
click. And the gate that decides whether a cursor appears at all: **cursor when
the heading's verb belongs to the USER, no cursor when it belongs to the
SYSTEM.**

**Lift furniture (Tier B).** When an object leaves a surface: a dashed footprint
ellipse at its rest position, two parallel vertical rails one object-diameter
apart spanning the travel, and NO scale change on the object - mask area measured
constant at 238-246 px across the whole loop, i.e. a pure `translateY`. Three
pieces of furniture to sell one 40 px translate, and it is far more convincing
than a shadow.

**Report motion in FRAMES when the capture is a screen recording of a player.**
One of these boards yielded an fps range of [30.0, 32.3] and nothing narrower;
every second-based figure derived from a guessed 30.07 fps was wrong
(`measuring.md`).

## Repetition follows the event

A linear clock can drive nonlinear motion. Drift, a character's repeated gesture,
a shared-world mechanism and direct input have different timing needs. The
Moein character loops (DesignByMoein-2095937 / DesignByMoein-2096289) are eased
periodic action; the brand board (adriankuleszo-2096048) has reveal/hold/exit.
Do not turn either into a constant-speed rotation. Separate capture duration
from an authored loop, and use presentation timestamps for variable-rate video.
