# Style Families

Synthesis of 45 reverse-engineered X/Twitter design references. Companion to the lock-in skill: §1 lists invariants that become silent defaults; §2 defines the families offered as blend weights; §3 defines how families combine; §4 accounts for outliers.

**Citation convention:** `author-XXXX` = author + first 4 digits of the numeric id. Where one author has colliding ids, 7 digits are used (`basit_designs-2089627` vs `basit_designs-2089995`; `adriankuleszo-2089253/2089328/2089887`; `mnowakdesign-2089321/2089684`; `yurygok-2089624/2089981`; `_heyfaisal-2089369/2089734`).

Corpus shape: 20 light, 16 dark, 5 dual-theme, 4 mixed. 27/45 contain motion (15 full-choreography, 8 sequence, 4 micro).

---

## The constants

Invariants across (nearly) the whole corpus. These are skill defaults — never ask about them, always enforce them.

### C1. Quarantine chroma; allow at most one accent hue in the UI layer — 45/45 quarantine, 38/45 hold to ≤1 accent
The shell (page, cards, text, chrome) is neutral; all remaining color lives in exactly one of: a signature artwork/texture, semantic states, or photography. 38/45 hold the UI chrome to one accent family or zero (LexnLin-2024, basit_designs-2017, piyushsphere-2088, kevserctk-2090, 0xSero-2090, xchylerdrenth-2090, yurygok-2089624, yurygok-2089981, ImranUxi-2089, _heyfaisal-2089734, _heyfaisal-2089369, toolfolio-2089, jeetnirnejak-2089, GrahamPaterson-2089, marcelkargul-2090148 — zero accent, marcelkargul-2089632 — luminance only, insporadesign-2088123, mickces-2088, cabralorenzo-2090, recentdesign-2089, helvetiica-2089, TheKartikBansal-2089, basit_designs-2089627, basit_designs-2089995, Triopixels-2089, madebylalit-2087, mnowakdesign-2089321, designbynavneet-2089, adriankuleszo-2090249, adriankuleszo-2089887, adriankuleszo-2089328, LexnLin-2089, arknow91-2089, flornkm-2089, its_sslvr-2088, piyushsphere-2089714, kevserctk-2090, alaymanguy-2088).
- Rule: pick one accent hex; every interactive/active/measured element uses it; second hues only as semantic states (green=success, red=fail, amber=warn — 0xSero-2090, yurygok-2089624, Triopixels-2089, helvetiica-2089).
- Multi-hue exceptions are still quarantined: multiple neons but each strictly semantic (mnowakdesign-2089684); 4 pastels that never sit under text (devxnuj-2090); one hue field per card + one shared warm accent (_heyrico-2090).

### C2. Show the feature; never icon + paragraph — 33/45; 0/45 counter-examples
Features are depicted as working product fragments, mechanisms, or frozen interactions: real kanban/zip/annotation loops (AlexandruDranga-2090), skeleton dashboards where only 3-5 selling data points render (LexnLin-2089), CLI diagrams with real commands (0xSero-2090), frozen mid-edit code with an I-beam cursor (piyushsphere-2089714), a dial that IS the illustration (jeetnirnejak-2089), docs you verify by hovering (GrahamPaterson-2089), sounds demoed inside the UI they serve (mickces-2088). Not one reference in 45 uses icon+blurb feature cards.
- Rule: every feature card's visual is a plausible fragment of the product doing that feature, salted with realistic data.

### C3. Separation ladder: hairlines, tone steps, or one soft shadow — never mid-contrast borders — 45/45
- Dark (16/16): 1px rgba(255,255,255,0.06–0.12) dividers (basit_designs-2017 #15181D on #0A0C10; LexnLin-2089; yurygok-2089624 #2A2A2A) or 2–6% lightness fill-steps with zero borders (marcelkargul-2090148 #232323→#2E2E2E; helvetiica-2089 #1d1d1d on #080808; mnowakdesign-2089684 page→card→chip +4%/step). Zero drop shadows on dark, 16/16.
- Light (19/20): 1px #ececf0/#E5E7EB-class hairlines (LexnLin-2024, mickces-2088, adriankuleszo-2089887) or borderless + one soft wide shadow with alpha ≤0.14 and blur ≥3× offset (Triopixels-2089 `0 24px 48px -12px rgba(50,70,130,0.14)`; LexnLin-2024 `0 8px 30px rgba(16,24,40,0.06)`; piyushsphere-2088 rgba(0,0,0,0.04)). Sole exception: playful 2px ink outline + 4px hard offset shadow (kail_designs-2089, whirrls only).
- Rule: never use #333/#ccc-class visible borders; on dark never use shadows; tint light-mode shadows toward the ambient hue (adriankuleszo-2090249 rgba(30,90,120,0.10)).

### C4. Hierarchy by size and gray value, weight 400–600 — 35/45 (5 exceptions, 5 n/a)
Display weight stays 400–600 (xchylerdrenth-2090 at 400; basit_designs-2017 "nothing bolder than 500"; kevserctk-2090 H1 72px/500; _heyfaisal-2089734 64px/500). Hierarchy devices: 3–4 step gray ramps (dark #EDEDED/#8b8e93/#5d5e60; light #111/#555/#9aa), two-tone headlines at one size (piyushsphere-2089714 #fff→#898989; xchylerdrenth-2090; its_sslvr-2088 700-white over 400-grey), title and body at the same size differentiated by color alone (0xSero-2090), trailing phrases at ~55% opacity (basit_designs-2089995). Tracking on display: −1 to −3%.
- Rule: reach for a gray step or a size jump before ever reaching for bold. 700+ is allowed only in the playful lane (kail_designs-2089, marcelkargul-2090148 titles).

### C5. Two-voice type: one grotesque + a mono data voice — mono explicit in 15/45, tracked microcaps in 22/45
Monospace carries every numeral, label, axis, status line, and index: slashed-zero indices "01 / 03" (piyushsphere-2088), spec numbering 1.0/1.1 (piyushsphere-2089714), token chips (GrahamPaterson-2089), telemetry footers "AUTOSCALE ON · 3 WORKERS" (yurygok-2089624), instrument numerals (cabralorenzo-2090, jeetnirnejak-2089, recentdesign-2089), ledger rows and fig. numbers (devxnuj-2090), witty stage captions (mickces-2088). Microcap layer: uppercase 11–13px at +0.06–0.1em tracking (0xSero-2090, yurygok-2089981 0.08em, cabralorenzo-2090 0.06em, adriankuleszo-2089887 +0.08em).
- Rule: numerals always tabular/mono so widths never jitter (ImranUxi-2089, jeetnirnejak-2089, recentdesign-2089 zero-padded "005").

### C6. Two motion registers, never mixed — 27/27 motion refs
Ambient/material motion is strictly linear constant-velocity: 60°/s radar (basit_designs-2017), 18°/s orb ring (madebylalit-2087), ~15°/s hue orbit (madebylalit-2088), 35px/s marquee (LexnLin-2024), ~10px/s shader drift (insporadesign-2087), ~1 luma/150ms mist morph (basit_designs-2089627). Interaction motion is short and eased: 150–800ms, ease-out entrances. Easing an infinite loop creates a seam heartbeat (madebylalit-2087) — never do it.
- Exit faster than enter for UI state (tab underline 650ms out-enter / 400ms in-exit, marcelkargul-2089632; goo merge ~20% faster than split, _heyfaisal-2089369) — EXCEPT physical light, which decays slower than it ignites (200ms on / 350ms off, insporadesign-2088123).
- Springs only for discrete physical acts, ≤1 overshoot ~4–10%, energy dissipated as contraction not wobble (flornkm-2089, LexnLin-2024 cubic-bezier(0.34,1.56,0.64,1), jeetnirnejak-2089, arknow91-2089). Documentation/inspector UI gets zero springs (GrahamPaterson-2089, ImranUxi-2089).

### C7. Loops close frame-perfectly; concurrent loops desync — 17/27 explicit seamless loops, 6/27 multi-period
Last frame equals first frame (arknow91-2089, flornkm-2089, madebylalit-2087, its_sslvr-2088, recentdesign-2089, AlexandruDranga-2090, adriankuleszo-2089253 fades back to its intro blank); interactive state fully resets on mouse-out (insporadesign-2088123). Concurrent loops run on non-commensurate periods so nothing beats in unison: 2.45/2.5/5/7.4s (LexnLin-2024), ~2s/~3.3s/footage-synced (AlexandruDranga-2090), 2.33s breath vs 24s hue orbit (madebylalit-2088).

### C8. Radii come in stepped families, nested concentrically — ~20 refs explicit, 0 counter-examples
Outer radius = inner radius + padding (12+8=20, ImranUxi-2089). Tiers: 24 outer / 12–16 inner (LexnLin-2024); 8/12/16/24 (_heyfaisal-2089734); 24/16/10–12/pill (designbynavneet-2089); 50/33/22 logical (TheKartikBansal-2089); card 20–24 / inner 4–8 / buttons pill — "three tiers, never one" (yurygok-2089981). The sharp-zero pole is a family trait, not a violation (0xSero-2090, xchylerdrenth-2090, basit_designs-2089995, devxnuj-2090 all radius 0 with radius only on buttons).
- Rule: define 3 radius tiers per project; never one radius everywhere; pill vs ~8–12px = marketing chrome vs component UI (kevserctk-2090, designbynavneet-2089).

### C9. Texture every large gradient: 2–6% grain or a print/pixel process — 11/13 gradient-bearing refs
Stipple noise σ≈4–6 (piyushsphere-2088), 2–3% monochrome grain (devxnuj-2090, adriankuleszo-2090249), 4–6% film grain baked into shaders (insporadesign-2087), grain toggle as a product feature (alaymanguy-2088), halftone 8px pitch/3px dot (basit_designs-2089995), 8–10px pixel-mosaic cells (kevserctk-2090), grain+halftone over photo blur (_heyrico-2090). Exceptions are deliberate: perfectly smooth falloff as a premium-shader statement (madebylalit-2088, its_sslvr-2088).
- Rule: a flat un-grained CSS gradient is the single loudest generic-AI tell in this corpus. Never ship one at card scale or larger.

### C10. Diegetic, realistic microcopy — zero lorem in 45/45; explicit realism device in 18/45
Versioned filenames ("client-delivery-v3.zip", AlexandruDranga-2090), "9:41" status bars and "99,8% Biometric Match" (adriankuleszo-2089887), arithmetic that reconciles (450K+330K+255K+95K=1.13M, yurygok-2089624), real shell commands and hyperparameters (0xSero-2090), real token names (GrahamPaterson-2089), live Hz/duration rows written by every interaction (mickces-2088), plausible ops telemetry ("exit 137 · oom at 08:41 · retry 2 of 3", yurygok-2089624).
- Rule: content fidelity is part of the visual style. Invent one fictional client brand and thread it through a whole section (adriankuleszo-2089887 "Identiq").

### C11. Opacity is the attention system: one full-contrast focal, siblings ghosted 15–45% — 12/45
One hero per composition at full contrast; alternates at 15–30% (adriankuleszo-2089887), stacked fragments dimmed 25–40% (0xSero-2090), row-states 100/60/35% (xchylerdrenth-2090), stack depth 1/0.7/0.45 (Triopixels-2089), inactive carousel slides 35% (ImranUxi-2089), edge-fading logo rows 1.0→0.35 (piyushsphere-2089714), disabled controls dimmed to ~25% — never hidden (insporadesign-2087).

### C12. When the background is alive, the page ships composed at t=0
Zero entrance choreography over ambient fields (basit_designs-2089627, LexnLin-2024, Triopixels-2089). When entrances exist, they are word-group blur-reveals in reading order: blur(12px)→0 + fade + ~8px rise, 400–500ms per group, 100–150ms stagger, ease-out (adriankuleszo-2089253, ImranUxi-2089).

---

## Families

Eight families. Every reference belongs to 1–2. The refetch.sh gold standard (80% Editorial Monochrome / 15% Staged Atmosphere / 5% Blueprint) maps to families F1, F3, F4 below.

### F1. Editorial Monochrome — the dark divider-cut editorial system, Linear-grade
Structure is felt, not seen: near-threshold hairlines cut a black field into a bento; a 3-step gray ramp does all hierarchy; one accent; ambient linear motion.
- **Members (14):** basit_designs-2017 (anchor), 0xSero-2090, xchylerdrenth-2090, LexnLin-2089, yurygok-2089624, yurygok-2089981, marcelkargul-2090148, marcelkargul-2089632, helvetiica-2089, ImranUxi-2089, mnowakdesign-2089321, piyushsphere-2089714, adriankuleszo-2089328 (Datawizz quadrant), its_sslvr-2088.
- **Ground:** #080808–#101013 (#0A0C10 basit_designs-2017, #090909 LexnLin-2089, #101012 yurygok-2089624, #101113 xchylerdrenth-2090); warm variant #232323 (marcelkargul-2090148). Surfaces +2–6%: #101113/#131316/#1d1d1d.
- **Separation:** 1px rgba(255,255,255,0.06–0.09) dividers at +4–8 luma, dashed for inner sub-splits (basit_designs-2017); or pure fill-steps (marcelkargul-2090148, helvetiica-2089); etched grooves 1px #0A0A0A + 1px #161616 highlight (marcelkargul-2089632); stepped-gray bands lightening downward #1C1C1E→#343436 (yurygok-2089981). Zero shadows, always.
- **Radius:** two sub-modes — shared-border grid at radius 0 (0xSero-2090, xchylerdrenth-2090: radius only on buttons 6–8px) or soft cards 12–24px with 8–12px media panels (LexnLin-2089, yurygok-2089624).
- **Type:** display 400–500 weight, 54–72px, −1 to −3% tracking; ramp #EDEDED/#8b8e93/#5d5e60; two-tone sentences; mono metadata at +8–12% tracking ("[ SECTION ]", "→ 0.1", "FIG.1").
- **Texture:** blueprint grid 56–80px cells at ≤8% white, confined outside the container or in viz zones (LexnLin-2089, basit_designs-2017, yurygok-2089624); dither/pixel strips (piyushsphere-2089714); embossed logo relief at ~4% lightness delta (helvetiica-2089); watermark logos ~450px at 12% opacity (LexnLin-2089).
- **Graphic device:** skeleton UI fragments with only load-bearing data rendered; mechanism diagrams (hub-and-spoke, pipelines); generative monochrome line systems (barcode gradients, dot-plot spheres, xchylerdrenth-2090); accent-tinted dark neutrals for themed builds (#0f0408/#251017/#371923, mnowakdesign-2089321).
- **Motion register:** ambient constant-velocity materials (radar 60°/s, marquee 1 item/3s, smoke 15px/s) + eased 200–450ms interactions; hover = directional gradient 1px border + ≤8% color wash (basit_designs-2017); light-as-state indicators (marcelkargul-2089632); measurably static hold states.
- **Choose when:** dev tools, AI infra, agencies, technical audiences, "serious craft" positioning; the owner's declared favorite dark tone (basit_designs-2017 owner note).
- **Closest famous:** Linear, Attio, Vercel, Prime Intellect, Resend.

### F2. Ink & Air — the airy premium light editorial system
Charcoal ink on near-white; separation by whitespace and tone steps; one accent; working UI fragments as all illustration; reads expensive through restraint.
- **Members (10):** _heyfaisal-2089734 (anchor), LexnLin-2024, kevserctk-2090, mickces-2088, designbynavneet-2089, adriankuleszo-2089887, adriankuleszo-2089253, adriankuleszo-2089328 (light quadrants), GrahamPaterson-2089, basit_designs-2089995.
- **Ground:** #f7f7f7–#FAFAFA–#FFFFFF pages, white cards; section separation by tone steps white→#F7F7F7→#EFEFEF + 96–120px padding instead of dividers (_heyfaisal-2089734, kevserctk-2090).
- **Ink:** headings #161616–#3A3A3A soft charcoal — never pure black in half the members (_heyfaisal-2089734 #3A3A3A, mickces-2088 #161616, devxnuj-adjacent #3b3b3b); body #6B7280–#8A8A8A; subheads max-width 480–640px.
- **Separation:** 1px #ececf0/#E5E7EB hairlines on cards (LexnLin-2024, mickces-2088, adriankuleszo-2089887 #E2E2E2) or shadow ≤ 0 8px 30px rgba(16,24,40,0.06).
- **Radius:** 12–24px outer / 8–16px inner; pill for marketing CTAs, 8–12px for component CTAs (kevserctk-2090, designbynavneet-2089).
- **Accent:** exactly one — #3770E9 (_heyfaisal-2089734), #ed6917 (LexnLin-2024), #2F5BE7 (adriankuleszo-2089253), #2684E6 family (adriankuleszo-2089887); partner logos forced to one gray (#7E8AA0 adriankuleszo-2089253; 40px black circles kevserctk-2090).
- **Graphic device:** live UI-fragment demos with captions demoted OUTSIDE the cards (17px/700 title + one 13px muted sentence, LexnLin-2024); prompt bars floated over hero media (kevserctk-2090, adriankuleszo-2089887); exposed hairline grids with hatched 48px gutters (designbynavneet-2089); black ink pills reserved for commitments (Save/Send, LexnLin-2024).
- **Motion register:** the corpus's richest — concurrent semantic loops on desynced periods; typewriters at 105ms/char type, 45ms/char delete (LexnLin-2024); camera tours (zoom ~700ms, dolly 700–800ms, pull-back 900ms ease-in-out, adriankuleszo-2089253); word-group blur reveals.
- **Choose when:** SaaS landing default; premium-but-approachable; product-led storytelling; this is the light half of the owner's day-to-day lane.
- **Closest famous:** Stripe, Vercel light mode, Linear light marketing pages.

### F3. Staged Atmosphere — one atmospheric chroma asset over a neutral shell
All page energy comes from a single reused environmental asset — mist, aurora, marble, shader field, blurred macro photo, oil painting — while the UI stays grayscale.
- **Members (15):** basit_designs-2089627 (anchor), kevserctk-2090, _heyfaisal-2089734, piyushsphere-2088, piyushsphere-2089714, designbynavneet-2089, devxnuj-2090, _heyrico-2090, its_sslvr-2088, insporadesign-2087, madebylalit-2087, madebylalit-2088, toolfolio-2089, alaymanguy-2088, basit_designs-2017.
- **The asset discipline:** ONE signature asset reused at 2–3+ scales — aurora 3× across hero/pricing/footer (kevserctk-2090), marble at every scale (_heyfaisal-2089734), one flower macro across five cards (_heyrico-2090), one gradient ramp rotated/mirrored/cropped (basit_designs-2089995-adjacent). Never invent per-section gradients.
- **Construction values:** photographic blur 40–80px pushed past recognition (_heyrico-2090, devxnuj-2090); 3 color stops max for generated gradients (alaymanguy-2088); grain 2–6% always (C9); process the asset to own it — pixel mosaic 8–10px cells (kevserctk-2090), halftone, dither.
- **Composition rules:** park the asset's dark mass behind the text block so white type never needs a scrim (insporadesign-2087, its_sslvr-2088); continue the field through device screens so hardware reads as glass (basit_designs-2089627); use artwork only as a thin 80–140px matte around product windows, never behind text (designbynavneet-2089); let the page bloom with a blurred copy of the artwork at 25–35% opacity (insporadesign-2087); allow transient illegibility as a designed phase (~2s per loop, its_sslvr-2088).
- **Motion register:** ambient in-place morph (~1/255 luma per 150ms, zero pan, basit_designs-2089627); shader idle drift ~10px/s; palette-uniform lerp 900–1200ms through intermediate hues instead of crossfade (insporadesign-2087); constant-velocity revolutions ~10–24s/loop (its_sslvr-2088, madebylalit-2087); no entrance choreography (C12).
- **Choose when:** heroes, brand moments, pricing emphasis (surface-inversion Pro card, kevserctk-2090), posters, AI/ambient states, anywhere emotional register matters more than information density.
- **Closest famous:** Raycast, Reflect, Apple Intelligence ambient glow, Rive marketing.

### F4. Blueprint Sheet — engineering measurement vocabulary as the ornament layer
Design-tool and drafting-table paratext (plates, redlines, leader lines, registration marks) is the ONLY decoration; works on black or white.
- **Members (9):** 0xSero-2090 (anchor), GrahamPaterson-2089, ImranUxi-2089, yurygok-2089624, yurygok-2089981, xchylerdrenth-2090, marcelkargul-2090148, cabralorenzo-2090, jeetnirnejak-2089.
- **Vocabulary:** FIG.1–4 plate labels in 11px mono #454545 + triple numbering (nav 01–04, sections 01/02, specs 1.1–2.3) (0xSero-2090); dotted leader lines between mono keys and values; "+" registration crosses in viz-zone corners on 40–64px blueprint grids at 4–8% white (yurygok-2089624, yurygok-2089981); dashed iso-guides extending past objects to card edges + Figma selection handles + "px" annotations (marcelkargul-2090148); corner-only 1px brackets with ~40px arms + status dots (recentdesign-2089-adjacent); fixed setpoint slashes and mono captions (cabralorenzo-2090); redline measurement bands with mono value chips — idle white/blue-outline, active solid blue (GrahamPaterson-2089); cyan padding overlays and live px readouts (ImranUxi-2089).
- **Color:** semantic only — green #a9e494 / red #c25b52 / amber #dcc17e for scores (0xSero-2090); one annotation hue kept strictly separate from the documented UI's palette (#3B82F6, GrahamPaterson-2089); derived values typographically distinguished from inputs (accent-outlined "20px", ImranUxi-2089).
- **Radius:** 0 by default; when rounded, concentric-precise (12+8=20).
- **Graphic device:** product-truthful line-art — 1px strokes, 8–10px geometric nodes, depth via 25–40% opacity dimming, never shadow (0xSero-2090); isometric 2:1 exploded mechanisms of the deliverable itself with a 3-tier gray ramp (#3F3F3F guides / #7A7A7A outlines / one #FFF focal, marcelkargul-2090148).
- **Motion register:** inspector-calm — tooltips 150–200ms ease-out, highlights ~120ms, zero springs (GrahamPaterson-2089); direct-manipulation values tracked 1:1 with no tween (cabralorenzo-2090).
- **Choose when:** dev-tool credibility, docs, spec sheets, data-heavy dashboards, audiences who read hyperparameters. In blends this family is the 5–10% garnish (refetch's Blueprint 5%).
- **Closest famous:** Prime Intellect, interfaces.dev, Berkeley Mono / engineering-plate aesthetic, Figma inspector.

### F5. Paper & Print — print artifacts give digital surfaces physical authority
Halftone ink, crop marks, paper grain, mats and hairline frames: screens pretending to be press sheets.
- **Members (5):** basit_designs-2089995 (anchor), devxnuj-2090, AlexandruDranga-2090, piyushsphere-2088, adriankuleszo-2090249.
- **Artifact kit:** black halftone dots 8px pitch / 3px dot / ~30% coverage clipped to exact rectangles (basit_designs-2089995); 45° sheen stripes ~60px wide at 6–10% white alpha; ~14px-pitch paper speck grids on ONE panel per board; stipple grain σ≈4–6 on gradients (piyushsphere-2088); dashed crop-mark borders overshooting corners + 7px solid corner squares #937d46 (AlexandruDranga-2090); paper sheets at 2–6° rotations with page curls and 2–3% film grain vs perfectly clean output UI — material contrast as before/after (adriankuleszo-2090249); white mats with 1px #ececec hairlines, radius 0, no shadows (basit_designs-2089995, devxnuj-2090).
- **Chroma:** 85–90% of every board near-white; one gradient ramp reused via rotation/mirror/crop covering 28–47% of the container; ghost watermarks at 2–3% luminance.
- **Type:** charcoal ink #3b3b3b (never #000); weight locked ~500, hierarchy by scale jumps 12→14→24→~100px (devxnuj-2090); mono ledger metadata (fig. 01, slashed-zero "01 / 03", est. dates, 01/02/03 chips in 1px circles); sentence-case headlines ending with a period; ~240px deliberate dead-air between title block and description (piyushsphere-2088).
- **Signature contrast engine:** soft organic blur vs hard 1px hairline geometry, restated in every tile; hairlines switch color exactly where they cross an image edge (gray #c9c9c9 on paper, white ~70% over imagery) (devxnuj-2090).
- **Motion register:** essentially static; when animated, loops stay semantic and desynced (AlexandruDranga-2090).
- **Choose when:** brand boards, editorial marketing, numbered series cards, portfolio/identity work — the "generate this kind of visual for typical sections" wish the owner recorded (basit_designs-2089995 owner note).
- **Closest famous:** high-end studio brand boards (Area 17 / Studio Dumbar register); the light-mode cousin of refetch's editorial monochrome.

### F6. Soft Pastel Stage — pebble radii and hue fields, the friendly premium lane
Pastel or warm-neutral color fields, extreme squircle rounding, borderless shadow separation, pseudo-UI fragments floating like physical layers.
- **Members (6):** Triopixels-2089 (anchor), _heyrico-2090, adriankuleszo-2089253, adriankuleszo-2090249, AlexandruDranga-2090, TheKartikBansal-2089.
- **Ground:** flat tinted washes — #dbf3ff ice-blue (adriankuleszo-2090249), #F0F5FE (adriankuleszo-2089253), page tinted 2–6% toward each card's accent hue (piyushsphere-2088-adjacent); or one dominant hue field per card with one shared warm accent motif (_heyrico-2090: cyan #77dbff / teal #7dd4dd / periwinkle #86abd5 + flower oranges #eea733).
- **Radius:** the extreme pole — 13–15% of card width, continuous-corner squircle (Triopixels-2089 48–64px at 420px); ~7% of width (_heyrico-2090); iOS-icon 28–32% on avatars/tiles (TheKartikBansal-2089); radii step 50→33→22.
- **Separation:** zero borders; one wide soft shadow per card (`0 24px 48px -12px rgba(50,70,130,0.14)`, Triopixels-2089) or a thick solid sticker outline replacing elevation entirely (24px ring flipping #fff↔#000 with theme, TheKartikBansal-2089).
- **Signature seam move:** the gradient dissolves into the text zone — no divider, no image/text seam anywhere (Triopixels-2089).
- **Neutrals:** one family at multiple temperatures (sage/taupe/tan, AlexandruDranga-2090); warm-tinted inversions — cream #f2efe8 ↔ warm near-black #1a1710, never neutral #121212 (TheKartikBansal-2089); neutrals hue-shifted toward the bg (#6e8895 body on blue, adriankuleszo-2090249).
- **Accent:** one indigo/blue (#2349DA Triopixels-2089, #2F5BE7 adriankuleszo-2089253) or warm accent (#E8442E at ~2% surface area); green strictly for status (#1D9847/#61FF6B/#34B368).
- **Motion register:** bespoke semantic hover choreography per card, 300–400ms ease-out, symmetric on exit (Triopixels-2089); one ambient drift layer (±10–14px over 4–6s); spring-smoothed drag demos.
- **Choose when:** consumer-friendly SaaS, HR/collab/support products, approachable premium, anywhere Editorial Monochrome would read cold.
- **Closest famous:** Amie, Luma, Family-app warmth, high-end Framer-template territory.

### F7. Tactile Instruments — components rendered as physical hardware
Dials, wheels, toggles, goo and gel: the component demonstrates its own physics; scale is a component/demo, not a page.
- **Members (8):** cabralorenzo-2090, jeetnirnejak-2089, flornkm-2089, _heyfaisal-2089369, arknow91-2089, insporadesign-2088123, recentdesign-2089, toolfolio-2089.
- **Hardware metaphors:** ~60 discrete gauge ticks at 4.5° pitch with dock-fisheye magnification ~1.5×/200ms spring (cabralorenzo-2090); f-number ring rotating under a fixed index like a real lens (jeetnirnejak-2089); knob stretching +21% toward its destination on press, energy dissipated as contraction (flornkm-2089); metaball goo splits with velocity-coupled blur (feGaussianBlur ~8–12 + alpha contrast; split 350–450ms, merge 20% faster) (_heyfaisal-2089369, arknow91-2089); gel deformation amplitude mapped to drag velocity, fill line refracting through the dent (recentdesign-2089); fully modelled bezel/track/cap toggles with lit indicator windows (insporadesign-2088123).
- **The non-negotiable:** direct-manipulation values update 1:1 per pointer event, zero tween (cabralorenzo-2090, jeetnirnejak-2089, recentdesign-2089); programmatic corrections (Auto) get the spring, ~10% overshoot (jeetnirnejak-2089).
- **Grounds:** quiet mono canvases — #F2F1EE warm dot-grid (cabralorenzo-2090), #FBFBFB (flornkm-2089), #F7F7F7 (_heyfaisal-2089369), #1f2326 (arknow91-2089), #040607 + 40px HUD grid (recentdesign-2089). Component ≥50% of canvas width for demos; state colors swap discretely with ~120ms crossfade.
- **Value redundancy:** one scalar echoed across 2–3 instruments (counter/dial/track) with distinct lags so the system feels mechanical (recentdesign-2089, jeetnirnejak-2089, toolfolio-2089 scroll pill).
- **Demo grammar:** scripted 3-beat intro cancelled by any touch (jeetnirnejak-2089); A/B rig inside the demo (Plain/Stretch, flornkm-2089); four-act scripts ending on the exact idle frame (recentdesign-2089).
- **Choose when:** hero components, playgrounds, interactive product-feel moments, the one component that makes a page memorable.
- **Closest famous:** Rauno Freiberg / Emil Kowalski craft demos, iOS hardware metaphors, Teenage Engineering software.

### F8. Emissive Signal — luminance as the accent; color behaves as light
Near-invisible resting states that ignite; bloom concentrated where the action is; glow with physics.
- **Members (8):** mnowakdesign-2089684 (anchor), madebylalit-2088, madebylalit-2087, arknow91-2089, marcelkargul-2089632, insporadesign-2088123, recentdesign-2089, kail_designs-2089.
- **Ground rule:** ≥95% of the frame under ~15% luminance so every accent reads emissive (mnowakdesign-2089684); resting UI near-invisible — buttons filled with the background color, 1px ring +6% (arknow91-2089); idle grey hairlines, amber ignition <100ms (recentdesign-2089).
- **Glow physics:** bloom 8–24px at ~35% opacity concentrated at draw heads, fill fronts, and metaball seams — never spread uniformly (mnowakdesign-2089684, arknow91-2089 seam gradient strokes); halo brightness inversely coupled to scale — light is conserved (madebylalit-2088); shadows cast AWAY from the fake light source (insporadesign-2088123); a dark pinch point survives peak bloom — never clip to a formless white blob (madebylalit-2088).
- **Accents:** amber #ffb43c/#ff9c28 (recentdesign-2089), semantic neon set blue #4D9FFF / green #22C55E / red #FF3B6B / violet #A855F7 — one hue per message (mnowakdesign-2089684), AI-state trio magenta #E921B8 / violet #8E0EF7 / blue #4A7DFF (madebylalit-2087, madebylalit-2088), PlayStation canon #50de88/#d95dbb/#bf4e6c (arknow91-2089).
- **Post treatment:** film grain + shallow DoF (4–12px off focal plane) + slow constant camera drift 5–15px/s unify scenes; one iridescent gradient sweep reserved for the single hero CTA (mnowakdesign-2089684).
- **Motion register:** staggered relay cuts so something is always mid-animation; chart lines draw 800–1500ms with the % chip riding the draw head; sibling stagger 80–180ms; ends on the one full zoomed-out product shot (mnowakdesign-2089684).
- **Choose when:** motion reels, launch films, dashboards-as-marketing, AI thinking/loading states, dark-mode selection states (marcelkargul-2089632).
- **Closest famous:** Linear release videos, Raycast launch films, Apple Intelligence glow.

---

## Blend behavior

The owner answers taste questions as weighted blends (refetch.sh = 80% Editorial Monochrome / 15% Staged Atmosphere / 5% Blueprint Sheet). The corpus itself blends the same way — many references are two families in one artifact.

**Blend mechanics (derived from every dual-membership reference):**
- The dominant family owns ground, separation system, and radius family. The secondary (≤30%) contributes the texture and graphic device. A tertiary (≤10%) is one ornament layer only: a blueprint grid, one lit element, one print artifact.
- Staged Atmosphere contributes exactly ONE asset per page, reused at multiple scales — never two atmospheres (kevserctk-2090 aurora ×3; _heyfaisal-2089734 one marble everywhere).
- Blueprint Sheet almost never leads; it garnishes (grid outside the container at ~5% contrast, LexnLin-2089; corner crosses in viz zones only, yurygok-2089624).

**Proven pairings (co-occurrence inside single references):**
- **F1 Editorial Monochrome + F4 Blueprint Sheet** — 6 refs (0xSero-2090, xchylerdrenth-2090, yurygok-2089624, yurygok-2089981, marcelkargul-2090148, ImranUxi-2089). The native dark-technical blend; blueprint mono/numbering slots directly into the gray ramp.
- **F2 Ink & Air + F3 Staged Atmosphere** — 5 refs (kevserctk-2090, _heyfaisal-2089734, designbynavneet-2089, GrahamPaterson-adjacent, basit_designs-2089995). Grayscale light shell + one chroma asset = the highest-frequency light-page recipe in the corpus.
- **F1 Editorial Monochrome + F3 Staged Atmosphere** — 3 refs (basit_designs-2017 smoke/chrome inside divider bento; piyushsphere-2089714 photography under hairline frames; its_sslvr-2088 shader posters on a dark editorial stage). The refetch blend itself.
- **F6 Soft Pastel Stage + F5 Paper & Print** — 2 refs (AlexandruDranga-2090 crop marks around warm-neutral animated cards; adriankuleszo-2090249 grainy paper inside a pastel wash). Reconciliation rule: keep outer cards near-square (≤6–10px) when print artifacts frame them.
- **F6 Soft Pastel Stage + F2 Ink & Air** — dual-membership evidence (adriankuleszo-2089253 belongs to both): warm consumer pages take F6 ground/radius/shadow with F2 ink, caption discipline and hairline sub-panels. The natural HR/consumer blend.
- **F7 Tactile Instruments inside any page family** — components adopt the host's ground (toolfolio-2089 dark shell over atmosphere wallpaper; cabralorenzo-2090 warm light; recentdesign-2089 HUD dark). Tactile is a component-scale family: blend it by scale, not by surface.
- **F8 Emissive Signal as garnish on F1 Editorial Monochrome** — marcelkargul-2089632 (one glowing indicator on a #0F0F0F system), helvetiica-adjacent state colors. One lit element per screen.

**Clashes (zero co-occurrence in 45 refs — warn if requested together):**
- **Soft Pastel Stage × Blueprint Sheet** — squircle/shadow/pastel vs radius-0/hairline/mono are opposite separation systems.
- **Soft Pastel Stage × Editorial Monochrome** — shadow-borne softness vs near-threshold hairline structure; pick one separation physics per surface.
- **Paper & Print × Emissive Signal** — printed ink and emitted light are contradictory material metaphors.
- **Two Staged Atmosphere assets on one page** — breaks the single-asset discipline that makes pages read "complete, whole" (kevserctk-2090 owner note).

**Dual-theme rule:** the same skeleton may carry dark and light, but materials are re-derived per mode, never inverted: glass-over-photo ↔ solid-white+shadow (piyushsphere-2089714), accent demoted to gray in light mode (mnowakdesign-2089321 #d2303e→#98989e), warm-tinted inversion (TheKartikBansal-2089), theme-matched photography — dusk for dark, daylight for light (piyushsphere-2089714).

---

## Coverage check

All 45 references cluster into the families above. The following contribute something beyond a surface style and should be surfaced by the skill as resources/lessons rather than only as style exemplars:

- **alaymanguy-2088 (ShaderGradient)** — production tooling for Staged Atmosphere: 3-stop constraint, grain toggle, `loopDuration` perfect loops, URL-serialized presets, `@shadergradient/react`. The default answer to "animated mesh gradient without a 10MB video".
- **ImranUxi-2089 (interfaces.dev)** — a craft curriculum that doubles as constants-verification: concentric radii (outer = inner + padding), tabular-nums, border-not-shadow on dark, text-wrap balance, optical padding, transition-over-keyframe, entrance stagger values. Cite it when enforcing C3/C5/C8.
- **GrahamPaterson-2089** — the documentation pattern itself (docs as live inspector, shared-token highlighting, behavioral guideline copy with fallback paths). Reusable for the owner's own design-system docs, independent of family.
- **toolfolio-2089 (rareui.com)** — component registry plus the film grammar for demoing components: cursor-driven (never autoplay), expo-out camera zooms with motion blur, ~3s per feature, one-line mono hint per demo.
- **kail_designs-2089** — three harvestable asset sites (handkit.design, coolshap.es, whirrls.com). Its whirrls third is the corpus's only **Playful Ink** exemplar (cream #F8F8EE, single ink #110340, 2px outlines, hard 4px offset shadows, sticker type) — one data point is too few for a family; offer it as a named spice, never a default.
- **mickces-2088 (sonaut)** — the sound-design dimension: procedural UI sounds demoed diegetically; also the strongest "marketing page IS the product" exemplar (every play writes real data).
- **mnowakdesign-2089321 + TheKartikBansal-2089** — family-agnostic theming lessons: token-flip presentation (identical canvas/content, only tokens change), 3-token status badges with constant hue and flipped luminance, per-mode accent demotion. Apply to any family's dual-theme build.
- **madebylalit-2087 + madebylalit-2088** — proof that ambient brand motion should be built as parameterized generators (both are outputs of a Claude-built tool), not hand-keyed one-offs. Relevant to the owner's tooling interests beyond style.
