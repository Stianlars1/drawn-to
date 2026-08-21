# Motion Grammar

Synthesized from 45 reverse-engineered X/Twitter design references. Motion census: **27/45 contain motion** (15 full-choreography, 8 sequence, 4 micro); 18 are static - and even the statics are staged as frozen interaction moments or "animation-ready" separable planes (piyushsphere-2089, marcelkargul-2090148, _heyrico-2090, adriankuleszo-2090).

Citation convention: slugs shortened to `author-first4digits`; a 5th digit is added only where an author has two posts sharing the first 4 (e.g. adriankuleszo-2089253 = …2089253, adriankuleszo-2089328 = …2089328, adriankuleszo-2089887 = …2089887; basit_designs-2089627 = …2089627, basit_designs-2089995 = …2089995; marcelkargul-2089632 = tabs, marcelkargul-2090148 = iso cards; _heyfaisal-2089369 = delete morph, _heyfaisal-2089734 = FLOWAI).

---

## 1. Core thesis: motion IS the feature (semantic motion)

**UNIVERSAL - 21/27 motion refs.** In this taste, animation is never decoration: every loop, hover, and transition literally enacts the capability being sold. The test is stated verbatim in the owner's gold reference: "each feature is understandable from the animation ALONE without reading the text" (LexnLin-2024). Mute the copy and the pitch must survive.

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
Multiple loops run simultaneously on deliberately non-aligned clocks so the composition never beats in unison:
- **2.45s / 2.5s / 5s / 7.4s / continuous** - five cards, co-prime-ish (LexnLin-2024)
- **~2s / ~3.3s / footage-synced (11.6s)** - three cards (AlexandruDranga-2090)
- **6.0s radar / 3.0s-per-pitch marquee / ~15px/s smoke drift** (basit_designs-2017)
- **2.33s breath vs ~24s hue orbit - non-commensurate, loop never visibly repeats** (madebylalit-2088)
- **4–6s ambient node drift under 300–400ms hovers** (Triopixels-2089)
- **staggered per-quadrant cut waves at ~3.5/6/8.5/12.5s so some region is always mid-animation** (mnowakdesign-2089684)
- **ambient dial loop persists through camera moves** (adriankuleszo-2089253)

### 2b. Seamless-loop closure - 16/27 verified
Last frame equals first frame, engineered rather than hoped for:
- End state pixel-identical to frame 1 (flornkm-2089, arknow91-2089, marcelkargul-2089632 "frame 36 = frame 1", its_sslvr-2088, madebylalit-2087 "frame-perfect seam", recentdesign-2089, Triopixels-2089, _heyfaisal-2089369)
- Closure techniques: fade out to the intro's blank state (~800ms) and restart (adriankuleszo-2089253); camera returns to its opening wide shot (adriankuleszo-2089328, Triopixels-2089); full state reset on container mouse-out (insporadesign-2088); exact integer revolutions per loop - one 360° per 20s (madebylalit-2087), one field revolution per 10.5s (its_sslvr-2088); `loopDuration`-driven math, never open-ended time accumulation (alaymanguy-2088); non-commensurate periods as the alternative to closure for indefinite states (madebylalit-2088)
- Counter-example logged as a defect: dial demo starts at 62, ends at 3 - "loop is not seamless" (cabralorenzo-2090)

### 2c. Two motion registers - 13/27, the corpus's sharpest discipline
**Ambient register = constant velocity, zero easing. Interaction register = short and eased.** Never mixed (basit_designs-2017: "Generic AI pages ease everything, which makes ambience feel like UI and UI feel like soup").
- Ambient linear values: radar 60°/s (basit_designs-2017); gradient field ~34°/s (its_sslvr-2088); orb ring 18°/s = 1 rev/20s (madebylalit-2087); hue orbit ~15°/s (madebylalit-2088); marquee ~35px/s (LexnLin-2024); marquee 1 icon-pitch (~86px)/3s (basit_designs-2017); smoke ~15px/s; shader crest ~10px/s (insporadesign-2087); camera drift 5–15px/s (mnowakdesign-2089684); mist morph ~1.4/255 luma per 167ms, zero pan (basit_designs-2089627); shader uSpeed < 1 - "drift, never demand attention" (alaymanguy-2088)
- Why linear: "any ease would create a visible heartbeat at the seam" (madebylalit-2087)
- Interaction register: 200–450ms eased, detailed in §3–4.
- Exception: ambient *breathing* (not rotation) uses sinusoidal ease-in-out, period 2000–2500ms, zero hold, zero overshoot (madebylalit-2088).

---

## 3. Easing table

| Easing | Where it belongs | Measured instances |
|---|---|---|
| **Linear / constant velocity** | ALL infinite ambient motion: rotations, marquees, drifts, shader time, scroll-scrubbed effects | 60°/s radar (basit_designs-2017); 18°/s orb (madebylalit-2087); 35px/s marquee (LexnLin-2024); scroll-linked word highlight "scrubbed, no easing" (adriankuleszo-2089328); scroll peel scroll-linked not time-based (kail_designs-2089) |
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
- **Cursor-driven, never autoplay:** hovers, typing, and clicks drive every demo; ~3s per feature, expo-out camera zooms with motion blur between beats (toolfolio-2089).
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

## 8. Restraint rules

- **"Hold state measurably static."** Glow-region luminance flat across 7 consecutive frames - zero idle pulsing, "confidence" (marcelkargul-2089632). Leave ~500ms of full rest between consecutive state changes in a loop (marcelkargul-2089632).
- **Structure never moves; only materials move.** Layout, type, and cursors stay fixed while chrome renders, smoke, and gradients flow inside them (basit_designs-2017); slide transitions move NOTHING positionally - opacity, blur, and shader uniforms only (insporadesign-2087).
- **Ambient motion sits just above the perception threshold:** ~3° per frame ring rotation, "alive, not spinning" (madebylalit-2087); mist at ~1.4/255 luma per 167ms - "motion you feel rather than watch" (basit_designs-2089627).
- **One ambient layer per section** maximum (Triopixels-2089); backgrounds drift, never demand attention (alaymanguy-2088).
- **Springs are rationed** to pointer-driven and physical moments; plain fallbacks stay 180–250ms ease-out with zero deformation (flornkm-2089); documentation and teaching UI get no springs at all (GrahamPaterson-2089, ImranUxi-2089).
- **Sinusoidal, overshoot-free cadence for stare-at states** - calibrated for a 30s+ gaze (madebylalit-2088).
- **Static must be complete.** 18/45 refs carry zero motion and still read finished; three animated refs deliberately ship composed at t=0 (basit_designs-2089627, AlexandruDranga-2090, Triopixels-2089). Reduced-motion expectation follows: every choreography must degrade to its settled end-state frame without losing the pitch - the corpus's statics prove the layouts work frozen (piyushsphere-2089 stages the same semantics as stills).
- **State honesty even in demos:** disabled controls actually gray out and rewrite their captions (mickces-2088); chevrons dim to ~25% at range ends instead of hiding (insporadesign-2087, jeetnirnejak-2089); values clamp visibly and stay where released - no snap-back (cabralorenzo-2090).
- **Interruptibility:** any touch cancels a scripted intro (jeetnirnejak-2089); prefer transitions over keyframes for anything a user can interrupt mid-flight (ImranUxi-2089); press states are stable, holdable poses - commit on release so gestures are cancelable (flornkm-2089).

---

## Rules

1. **Make every animation a literal demo of its headline verb** - reorder = organize, type-on = effortless input, fork = forecast. If the copy were muted, the loop alone must pitch the feature (LexnLin-2024, AlexandruDranga-2090, mnowakdesign-2089684).
2. **Split motion into two registers and never mix them:** ambient = strictly linear constant velocity (rotations 15–60°/s, marquees ~35px/s or 1 item/3s, drifts 5–15px/s); interaction = 200–450ms eased (basit_designs-2017, madebylalit-2087, LexnLin-2024).
3. **Give every concurrent loop its own period** (e.g. 2.45s / 2.5s / 5s / 7.4s / continuous, or 2s / 3.3s / footage-synced); for indefinite states use non-commensurate periods (2.33s + 24s) so the loop never visibly repeats (LexnLin-2024, AlexandruDranga-2090, madebylalit-2088).
4. **Close every loop frame-perfectly:** end state = frame 1, via exact integer revolutions, a fade back to the intro blank, a camera return to the opening shot, or full state reset on mouse-out (madebylalit-2087, adriankuleszo-2089253, insporadesign-2088, arknow91-2089).
5. **Default interaction curve = ease-out enter (300–650ms), ease-in exit ~20–40% faster** (tab: 650ms in / 400ms out; goo merge 20% faster than split); invert only for light, which ignites fast (~200ms) and decays slow (~350ms) (marcelkargul-2089632, _heyfaisal-2089369, insporadesign-2088).
6. **Reserve springs for discrete physical acts** - shuffle, fission, drop, motorized correction - at ~4–6px or ~10% overshoot, one oscillation (stiffness 120–300, damping 14–30); dissipate energy as squash/contraction, never cartoon bounce; docs and inspector UI get zero springs (LexnLin-2024, arknow91-2089, flornkm-2089, jeetnirnejak-2089, GrahamPaterson-2089).
7. **Never tween a direct-manipulation value:** numerals track the pointer 1:1 per frame; save easing for secondary instruments, which chase with ~100ms distinct lags (cabralorenzo-2090, jeetnirnejak-2089, recentdesign-2089).
8. **Stagger siblings 60–180ms (sweet spot 100–150ms); stagger sections 400–800ms; never animate two hierarchy levels at once** (adriankuleszo-2089253, ImranUxi-2089, mnowakdesign-2089684).
9. **Run single-cause state changes on one synchronized clock with zero internal stagger** - bar, text, gradient, glow together - so the change reads as electricity, not choreography (marcelkargul-2089632, insporadesign-2088).
10. **Sequence with causality:** content leads shape by 1 frame; position lands 80–100ms before color; text exits with the blur and re-enters 250–300ms after refocus, description trailing title ~130ms; reverse the open order on close (_heyfaisal-2089369, flornkm-2089, insporadesign-2087, arknow91-2089).
11. **Typewrite at ~105ms/char, delete at ~45ms/char (2–3x faster), hold ≥1.5s before deleting, always show a caret** (LexnLin-2024).
12. **Ride the value with the motion:** attach the % chip to the progress-bar draw-head; ease count-ups in lockstep with the control driving them, ending together with an ease-out settle; count through real intermediates and zero-pad or use tabular-nums to kill width jitter (mnowakdesign-2089684, adriankuleszo-2089253, recentdesign-2089, ImranUxi-2089).
13. **Direct demos with a cursor, not autoplay:** scripted cursor with narrative pacing (slow pass ~800ms/stop, fast pass ~450ms, rest), one-shot ~430ms micro-anims fired en route, ~3s dwell per feature; cancel any scripted intro on pointer-down (basit_designs-2017, toolfolio-2089, jeetnirnejak-2089).
14. **Start reacting before contact:** deform toward the cursor from ~150–200px away (10–15% of radius, 100–150ms spring lag); ignite pressed controls <100ms; relax ~300ms after release (arknow91-2089, recentdesign-2089).
15. **Make hover enact the feature's real state change** (color + label + layout + saturation, 300–400ms ease-out) **and reverse it symmetrically at the same duration** - never a generic scale/lift, never a snap on leave (Triopixels-2089).
16. **Render hover light directionally:** 1px gradient border brightest on one edge fading up the sides + ≤8% directional wash; cast shadows away from the fake source; in monochrome systems change luminance only (#8A8A8A→#FFF), never hue (basit_designs-2017, insporadesign-2088, marcelkargul-2089632).
17. **Reveal headlines as word-group blur cascades:** blur(12px)→0 + fade + ~8px rise, 400–500ms per group, 100–150ms stagger, reading order, ease-out, no overshoot; body and CTAs resolve last (adriankuleszo-2089253, ImranUxi-2089).
18. **Tour static sections with one continuous camera:** zoom ~700ms ease-in-out, dolly 700–800ms, pull back ~900ms (or expo-out ~600ms with motion blur for film tone); dwell 1.5–3s; keep ambient loops running through every move; end where you started (adriankuleszo-2089253, toolfolio-2089, adriankuleszo-2089328).
19. **Scrub scroll-driven effects linearly with scroll position** (word highlights, hero peels, sticky step rails) - never convert them to time-based tweens (adriankuleszo-2089328, kail_designs-2089).
20. **Draw charts left→right in 700–1500ms ease-in-out; pop markers only as the head passes; flare at fork points before branching; concentrate bloom at draw-heads and fill-fronts, never spread it evenly** (mnowakdesign-2089684, adriankuleszo-2089328).
21. **Scale feedback with velocity, not position:** gel dents, content blur (0 at rest → 8–12px mid-flight → crisp within 100ms of settle), and motion trails (2–3 ghosts, ~120ms decay) all track speed (recentdesign-2089, _heyfaisal-2089369, jeetnirnejak-2089).
22. **Hold states dead still:** no idle pulsing on active indicators (luminance flat), ~500ms full rest between loop events, at most one ambient layer per section, ambient amplitude just above perception (~3°/frame, ~1 luma level/150ms) (marcelkargul-2089632, Triopixels-2089, madebylalit-2087, basit_designs-2089627).
23. **Skip entrance choreography when the background is alive** - ship the page composed at t=0 and let one ambient material carry the life (basit_designs-2089627, AlexandruDranga-2090).
24. **Keep demos honest:** true disabled states with rewritten captions, dimmed (25%) not hidden range-end controls, visible clamps, no snap-back, real data written by every interaction; regenerate procedural visuals per replay when the claim is "generative" (mickces-2088, insporadesign-2087, cabralorenzo-2090, jeetnirnejak-2089).
25. **Design every choreography to degrade to its settled final frame** - the static end-state must carry the full pitch, as proven by the corpus's frozen-interaction statics; use CSS transitions (not keyframes) for anything a user can interrupt mid-flight (piyushsphere-2089, marcelkargul-2090148, ImranUxi-2089, flornkm-2089).

## Addendum - hover-light grammar (flohoeller-2090)

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
