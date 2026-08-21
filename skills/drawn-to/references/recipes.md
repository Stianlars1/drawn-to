# Section recipes

Concrete, named composition variants per section kind, distilled from the 45-reference corpus. Companion to `style-families.md` (families F1–F8, the 12 constants) and `layout-language.md` (grids, card anatomy). Citations use the same slug convention.

**How the skill uses this doc.** After the blend and axis locks are settled, walk the sections in scope. For each section kind: (1) filter this kind's variants by family compatibility with the chosen blend - a variant whose **Families** line clashes with the dominant family is not offered; (2) present 2–3 surviving variants as a weighted question in the QS stage, using each variant's name + one-line essence as the option label and **Choose when** as the hint; (3) on selection, build from **Anatomy** + **Ingredients**, with the 12 constants applied silently. For **redesigns**, always add one more option - *"keep current structure, reskin to the locks"* - and, before asking, map each existing section onto its nearest recipe here so the question reads "your current hero is closest to Centered Stack; keep it, or switch to …". The 12 constants (chroma quarantine, show-the-feature, separation ladder, motion registers, etc.) are assumed everywhere below and never restated per variant.

Evidence density varies by kind: heroes, feature grids, bentos, and component demos are richly covered; **pricing has exactly one direct reference** and **closing CTA is mostly observed fused into footers or hero devices** - variants there marked **(derived)** are extrapolated from the closest evidence, not observed whole.

---

## Hero

### Centered Stack - the badge → H1 → sub → CTAs → media spine
- **Anatomy:** container ~1200px. Badge pill ~24px tall (icon + 11px caps at +0.1em) → 24px → H1 56–72px/500–600, line-height 1.05–1.15, tracking −1 to −2%, 2 lines → 24–28px → subhead 16–20px, max-width 480–640px → 40–48px → CTA pair, gap 12–16px (pill radius for marketing chrome) → 64–80px → full-width media panel ~3:1, radius 24px. Nav ~65–72px: logo left, links center, pill CTA right.
- **Ingredients:** the media panel carries the page's ONE signature asset (pixel-mosaic aurora, marble, texture); float the product's core input over it - prompt bar ~660×64px, full radius, shadow 0 8px 24px rgba(0,0,0,.12), dead-center (kevserctk-2090). Logo row below: identical 40px circles + 18px/600 wordmarks, space-between. Motion: word-group blur reveal in reading order - blur(12px)→0 + fade + ~8px rise, 400–500ms per group, 100–150ms stagger, ease-out (adriankuleszo-2089253); skip entrances entirely if the background is alive.
- **Evidence:** kevserctk-2090, adriankuleszo-2090249, designbynavneet-2089 (variant B). Register: Stripe/Vercel-light.
- **Families:** F2, F6 native. F1: ground #0A0C10, frame with two full-height 1px rails, CTAs become white pill + ghost. F3: the media panel *is* the atmosphere asset. F5: media becomes a sharp-cornered gradient slab with halftone.
- **Choose when:** default SaaS hero; product has one strong media asset or input to show.

### Living Atmosphere - the environment is the only animated element
- **Anatomy:** page canvas inset in an off-white matte (#F3F7F8, ~48px padding, radius 24px). Frosted full-round pill nav ~48px tall, parked in the lightest zone of the field. Centered column, max-width ~62%: nav → 90px → 2-line headline → 24px → subcopy → 40px → capture row (translucent pill input ~360×44 + solid pill button, 12px gap) → 40px → device cluster cut by the fold, stat cards orbiting asymmetrically.
- **Ingredients:** one blurred atmospheric video/shader morphing in place - ~1/255 luminance per 150ms, zero pan, no loop seam; the field continues through the device screen so hardware reads as glass. Dark stat cards rgba(10,14,18,0.85), radius 14–16px, no border, no shadow - luminance does all separation. Serif carries numerals, sans carries labels; "^" caret as the delta glyph. Park the field's dark mass behind every text block so white type never needs a scrim (insporadesign-2087). Ship fully composed at t=0 - zero entrance choreography.
- **Evidence:** basit_designs-2089627 (anchor), insporadesign-2087, its_sslvr-2088 (poster register).
- **Families:** F3 native; blends with F1 (basit_designs-2017) and F8 (glow physics on accents). F2 adaptation: freeze the field to a still, keep 40–80px blur + 2–6% grain.
- **Choose when:** brand moment matters more than information density; AI/ambient positioning.

### Pipeline Diagram - the hero illustration argues the product, bottom-to-top
- **Anatomy:** flat tinted wash edge to edge (#dbf3ff class - NO gradient; depth from element lighting only). Centered stack (badge → H1 ~72px/1.08 → sub 20px max-width ~500px → single pill CTA 187×44px) → ~80px → the diagram, z-ordered top-down as output→transform→input: clean output UI card ~717×249px radius 24 borderless (shadow 0 24px 60px rgba(30,90,120,0.10)) → ~120px connector-fan zone → ~85px logo squircle chip → paper/input stack fading out via alpha mask over the last 40%.
- **Ingredients:** 8–10 curved 1.5–2px bezier connectors in cool gray #ccd6e2 with exactly ONE accent line (#34a2d5). Dot grid 2px dots at ~19px pitch, bg −7% luminance, radially faded, confined behind the illustration. Input artifacts get 2–3% grain, 2–6° rotations, a page curl; the output card stays perfectly clean - material contrast = before/after. Tint every neutral toward the bg hue (#6e8895 body on blue).
- **Evidence:** adriankuleszo-2090249.
- **Families:** F6, F2 native. F1 adaptation: redraw as 1px line-art on black, depth via 25–40% opacity dimming, semantic hue only (0xSero-2090 vocabulary).
- **Choose when:** the product is a transformation (input → intelligence → output) that a static screenshot can't tell.

### Split Hero on Exposed Grid - drafting-table scaffold, product window in situ
- **Anatomy:** 1px #E8E8E8 column rules run full page height; outer ~48px gutters filled with 45° hatching or 8px-pitch ruling. Nav ~72px with full-width 1px bottom divider. H1 (64–72px/600/1.08, −2%) + 18px/1.55 paragraph left at ~55% width; CTA pair right-aligned on the paragraph baseline. Hero padding 96px top / 72px bottom. Product shown as a macOS window, radius 24 outer / 16 inner panels, frosted title bar that samples the backdrop hue; artwork survives only as an 80–140px matte around the window, never behind text.
- **Ingredients:** fully art-directed product UI (real threads, counts, one AI moment) as the entire illustration; monochrome marketing chrome, saturation reserved for semantic states + the matte artwork. Dark variant: 55/45 text/media split on #0a0710 with a 3D prop and one violet accent (adriankuleszo-2089328 Datawizz).
- **Evidence:** designbynavneet-2089 (variant A), adriankuleszo-2089328, piyushsphere-2089714 (hairline-framed headline band).
- **Families:** F2+F4 native; F1: rails at rgba(255,255,255,0.06–0.09) on #0A0C10 (basit_designs-2017 rails).
- **Choose when:** design-engineer audience; the product UI itself is the proof and deserves a stage.

### Scrubbed Product Stage - the product's core flow told by the visitor's scroll
- **Anatomy:** H1 (2 lines max) + one-line sub + "New →" link + 2 pills, then a staged frame ≤1040px wide, `clamp(380px, vh−220, 620px)` tall, stuck dead-centre (`(vh − stage-h)/2`) for ~150vh of scroll while the scene scrubs through the product's 3-5 core beats; proof row lands under the frame. Phone: 100svh math, stage ~4:5.2 of width, scrub 110svh.
- **Ingredients:** the real product UI inside a staged environment (OS desktop, glass frame - the page's ONE glass moment); poses as registered `@property` numbers on one element, a single linear keyframe track with held beats, `view-timeline` + `@supports(animation-timeline: scroll())`; optional real-keyboard takeover of the same poses. Full implementation recipe: `scroll-scrub.md`.
- **Evidence:** the refetch.sh hero (shipped implementation, the owner's favorite); adriankuleszo-2089328 (scroll-scrubbed highlight, sticky step-rail); ImranUxi-2089 (user-operated over autoplay). Famous: Linear release pages.
- **Families:** F1/F2 native (the stage is the F3 touch); any family hosting a real product flow.
- **Choose when:** the hero of a product with a demonstrable flow (capture→process→result); when a video would otherwise autoplay. One long pinned run per page, never more.

---

### One-Screen Poster - the whole page is one 100 svh screen, one message, one signature visual
- **Anatomy:** `min-height:100svh`, no scroll, no sections. Brand top-left, one link/action top-right (nav = 2 items). H1 ≤ 6 words on ONE designed line break (`text-wrap:balance` + `<br>`), 48–96px by family → 16–24px → one sub line ≤ 120 chars → 32–40px → the install/capture control (one) → the rest of the screen belongs to ONE signature visual. Bottom edge: one discreet mono line (direction label, version, or three tabular numbers) - the only mono caps on the page. Everything fits the fold at 1440×900 AND 1280×720 with ≥ 48px air top and bottom; at 390×844 the visual moves below the copy or becomes the ground.
- **Ingredients:** the signature visual carries the family: F1 = a measured blueprint plate (redline with real values), F3/F8 = one shaped light (beam, arc, lit ring - never a centred blob), F5 = a paper mat with one gradient slab + halftone + crop marks, F6 = the horizon gradient with 3% grain and one soft surface, Vercel-register = one lit object with H1 small at left and mono lines at right. Zero eyebrows, ≤ 2 CTAs, 0 or 3 numbers. Polish: copy control with reserved width + success state; count-up once. If the page cycles directions (view transitions), entrances run on first paint only - each new skin arrives composed (C12).
- **Evidence:** its_sslvr-2088 (poster register), basit_designs-2017 (one lit line on near-black), marcelkargul-2089371 (structured light as the only object); budgets from `quality-bar.md` § 2.
- **Families:** every family can render it; the visual changes, the skeleton does not. Clash: F4 + F6 on one screen (blueprint over pastel) - pick one.
- **Choose when:** the product has one message and the visual can carry it (a skill, a tool, a launch); when every added section would dilute; when the page must be judged at a glance. Not for products that must explain a workflow - use Scrubbed Product Stage or a short-scroll page.

## Feature section - grid/cards

### Self-Demo Loop Grid - every card is a working fragment animating its own headline
- **Anatomy:** 3 equal cards (~343–578px), gap 24–34px, equal heights. Card: #fff, radius 24px, 1px #eef0f3 hairline, shadow 0 8px 30px rgba(16,24,40,0.06); inner elements radius 12–16px. Visual area 70–80%; captions demoted OUTSIDE the card - 17px/700 title ~20px below the card edge + one 13px muted sentence on the page bg. In-card text-strip variant: 70/30 visual/text with a hard edge, title ~26px + exactly 2 description lines (AlexandruDranga-2090).
- **Ingredients:** each card's loop literally enacts its verb (reorder = organize, type-on = effortless input, zip-suction = handoff) with realistic data (versioned filenames, plausible counts). Loops on non-commensurate periods (2.45/2.5/5/7.4s/continuous). Typewriter 105ms/char type, 45ms/char delete; marquees 35px/s linear with 60px fade masks; springs cubic-bezier(0.34,1.56,0.64,1) only for discrete acts. Optional camera tour: zoom ~2.2×, dolly 600–800ms ease-in-out, dwell 1.5–2s per card, loop back to the opening frame (adriankuleszo-2089253, adriankuleszo-2089328 Droxy).
- **Evidence:** LexnLin-2024 (anchor), AlexandruDranga-2090, adriankuleszo-2089253.
- **Families:** F2 native; F6 (warm-neutral variant, one family at three temperatures + crop-mark frames). F1: swap shell to #101113 card + rgba(255,255,255,0.08) border, media panel on slate gradient (LexnLin-2089 anatomy).
- **Choose when:** motion budget exists and each feature has a demonstrable interaction.

### FIG-Plate Shared-Border Grid - the marketing page as a numbered technical document
- **Anatomy:** 2×2 true bordered grid - cells ~699px sharing ONE central 1px #202020 divider and one row rule, radius 0 everywhere, no fills, no shadows, on #0a0a0a. Cell = ~65% line-art plate centered in black negative space / ~35% text block, itself split ~55/45 into "01 Title" + 3-line description | numbered spec list (1.1/1.2/1.3, ~32px row spacing). FIG.n label in 11px mono #454545, 16–20px from the top-left corner. CTA: solid white rectangle ~169×28px, black uppercase mono 11px +0.08em with ">".
- **Ingredients:** product-truthful 1px line-art - real shell commands, real hyperparameters, dotted leader lines between mono keys and values, depth via 25–40% opacity dimming, ghost circles behind nodes. Title and body the same size; hierarchy purely a 4-step gray ramp (#fff > #929292 > #555 > #202020). Hue strictly semantic: green #a9e494 / red #c25b52 / amber #dcc17e.
- **Evidence:** 0xSero-2090 (anchor), xchylerdrenth-2090 (equal-column strip cousin: 5 cols, full-height dividers, "→ 0.1" indices, ~90px dead air).
- **Families:** F1+F4 native. Light adaptation: identical skeleton with #ebebeb hairlines on #fff, radius 0 (piyushsphere-2089714 light theme, F5-adjacent). Never with F6.
- **Choose when:** dev-tool/infra credibility; audience reads hyperparameters; motion budget is zero.

### Pebble Dissolve Grid - squircle cards whose visual melts into the text
- **Anatomy:** 2×2 grid + one full-width finale card, gap 32–40px; grid cards aspect ~1.6:1, finale ~2.4:1. Radius 13–15% of card width (48–64px at ~420px), continuous corners. Zero borders and dividers; one wide soft shadow per card: 0 24px 48px −12px rgba(50,70,130,0.14). Visual zone top ~60% (gradient #C8D6FB→#8FA5F5 + masked 1px white grid at ~28px cells) fading to pure white BEFORE the title line - no seam ever; text bottom ~38%, left-aligned, padding 28–32px, title 18–20px/600 + 2-line 14–15px #8A8F98.
- **Ingredients:** features as floating pseudo-UI fragments (pills, chips, avatars, bars), each with its own small shadow; stack depth by tone/opacity steps 1/0.7/0.45; fanned pills at −4 to −8°. One indigo accent element per card max (#2349DA). Bespoke semantic hover per card, 300–400ms ease-out, symmetric exit; one ambient drift layer ±10–14px over 4–6s.
- **Evidence:** Triopixels-2089.
- **Families:** F6 native - documented clash with F1 and F4 (opposite separation physics); warn if requested together. F2 adaptation: radius down to 16–24px, hairline instead of shadow, keep the dissolve.
- **Choose when:** consumer-friendly premium; the page must read soft, not engineered.

### Caption-Free Vignette Grid - oversized cropped fragments, zero captions
- **Anatomy:** 3-up top row + 2-up bottom row optically centered; all cards identical ~14:9, radius ~7% of width (~36px at 515px), no border, no card shadow - flat on white. Each card: one oversized white UI fragment (icon rail, pill stack, chat window, notification stack) bleeding off 1–2 card edges, over a blurred photo field (gaussian 40–80px) re-textured with film grain, dissolve speckle, or ~4px halftone mesh.
- **Ingredients:** one dominant hue field per card + one shared warm accent motif (the same photo) across the set; shadow only on the white fragments (0 12px 32px rgba(0,0,0,0.10)); exactly one dark (#333) element in the whole set as anchor; all copy diegetic inside the fake UI ("agent is replying…"); max 3 repeated elements per card; a repeated 3-item diagonal stagger (~50px x-offset per step) as compositional signature.
- **Evidence:** _heyrico-2090.
- **Families:** F3+F6 native. F2 adaptation: add the caption-outside layer (17px/700 + 13px muted, 20px below) per the caption-demotion law.
- **Choose when:** illustration-set moment (showcase, gallery, secondary features) where captions would add noise.

---

## Feature section - bento

### Divider-Cut Bento - regions cut from one dark surface, structure felt not seen
- **Anatomy:** two full-height 1px rails frame a ~985px column on a ~1226px viewport; section dividers run full-bleed between them at +4–8 luma of the bg (#15181D on #0A0C10); inner sub-splits dashed 1px at ~4/4px, even fainter. No card fills, no radii, no gaps, no shadows. 2×2 capability cells ~265×225px, padding 24–28px: 20px icon (1.5px stroke) → 12px → 14–15px/500 title → 8px → 13px/400 body; text under 40% of cell height, the rest deliberate dark air. Media panel splits a feature band 46:54.
- **Ingredients:** ambient material motion at constant velocity (radar 60°/s, marquee 1 item/3s, smoke ~15px/s); hover = directional gradient 1px border brightest on one edge + ≤8% color wash, envelope 230ms in / ~570ms hold / 200ms out; a simulated cursor tours the grid with narrative pacing and fires one-shot icon events (~430ms) en route. One accent hue per section over a 3-step gray ramp.
- **Evidence:** basit_designs-2017 (anchor; the owner's declared favorite dark tone).
- **Families:** F1 native (+F3 for smoke/chrome inside the cells). Clashes with F6.
- **Choose when:** the Linear-grade editorial dark statement section; the page's flagship feature moment.

### Mirrored 60/40 + Dark Finale - zig-zag bento with an ending
- **Anatomy:** bento on an inset #F1F2F2 panel over a #F9FAFC page; ONE 16px token = panel padding = card gap. Row 1: 690 + 462px (60/40 of 1168px), height 557px; row 2 mirrors 462 + 690px; row 3: single 1168×399px near-black finale card (#141318, 40% text / 60% embedded dark-mode canvas). White cards radius 14–16px, 1px #E2E2E2 hairline, no layout-level shadows. Text top-aligned per card: ~20px/600 title + 2-line 16px/1.6 #6C737D capped at ~85% width; illustration fills the remaining ~70% and bleeds off clipped edges.
- **Ingredients:** the product's own UI chrome as illustration vocabulary (selection handles, dashed marquees, version pills, named cursors); ONE fictional client brand threaded through all five cards; exactly one full-contrast focal per card, alternates ghosted 15–30%; repeatable content (variants, swatches) half-cropped and dimmed at edges; micro-copy salted with "9:41" bars, percentages, version labels. Header: 13px caps eyebrow +0.08em → 48px/600 two-line H2 −0.02em → 16px subcopy, centered, ~120px above the panel.
- **Evidence:** adriankuleszo-2089887 (owner: "LOVES this one").
- **Families:** F2 native. F6 adaptation: swap hairlines for the one soft shadow - never both (one separation physics per surface).
- **Choose when:** 4–6 features with rich product visuals; the section needs rhythm and a full-stop.

### Media-Panel 2+1 - one strict card grammar, skeleton-UI illustrations
- **Anatomy:** two cards ~592px wide, gap ~28px, plus a full-width third card below. Card: bg #101113, padding 16px → media panel ~65% of height, radius 8px, slate vertical gradient #152636→#31424A → full-width 1px hairline divider → 18–19px/600 title → 14px muted 2-line description. Cards bordered 1px rgba(255,255,255,0.08); featured sibling ranked by a brighter top-edge gradient border only. Section header: centered H2 52–56px/700/−0.03em + 16px #A4A5A7 subhead, ~64px above.
- **Ingredients:** skeleton dashboard fragments where everything is grayed bars except the 3–5 data points that sell the feature (those get the one blue family); hub-and-spoke mechanism diagrams with dashed orbits; blueprint grid (70–80px cells, ~5% blue) only OUTSIDE the container; vertical in-card dividers inset to ~70% of card height.
- **Evidence:** LexnLin-2089 (anchor); the identical anatomy repeats across every section of the page.
- **Families:** F1 native (+F4 garnish). Light twin: LexnLin-2024 shell (white/r24/#eef0f3).
- **Choose when:** agency/product pages needing a repeatable card system across many sections.

### Punched-Chip 3+2 - whisper-step cards with mechanism illustrations
- **Anatomy:** section = full-bleed #232323 container, radius ~33px, inset ~18px inside an #EFEFEF page frame, side padding ~90px. Row 1: three cards 392×435px; row 2: two cards ~596×340px; uniform 24px gap. Cards #2E2E2E (+4–5% over the page - no border, no shadow), radius 16px, padding 24–28px. Order: 22–24px/700 title → isometric illustration filling the upper region → 4–6 line #9D9D9D body → bottom-anchored pill chips. Chips filled with the page token #232323 so they read as punched holes; ~26px tall, 11px/700 caps #EFEFEF.
- **Ingredients:** isometric 2:1 line-art of the actual deliverable as an exploded mechanism, on a 3-tier gray ramp (#3F3F3F guides / #7A7A7A outlines / one #EFEFEF–#FFF focal per illustration); dashed iso-guides extending to card edges; Figma selection handles + "px" leader-line labels; 45° diamond crosshatch (~4px pitch, ≤8% contrast) on the wide cards only. Built as separable planes - the animation pass is assembly (guides draw ~400ms, planes converge 600ms expo-out, 120ms stagger), not redraw.
- **Evidence:** marcelkargul-2090148.
- **Families:** F1 (warm variant) + F4 native. Zero accent hue by design.
- **Choose when:** services/capabilities section for a design-literate audience; illustrations must be animation-ready.

---

## Feature section - editorial rows/chapters

### Numbered Index + Photo Panels - spec-sheet chapters over cinematic imagery
- **Anatomy:** full-bleed section framed by 1px hairlines (#1a1a1a on #000 dark / #ebebeb on #fff light) with dividers above/below the headline block; a ~110px decorative texture strip above it (dithered 2–3px pixel field on dark, 20px graph-paper grid on light - same slot, theme-specific texture). Headline: editorial serif ~66px/1.15, two-tone by color not size (line 1 full contrast, line 2 ~#858585). Body: index column ~320px (mono "1.0/1.1/1.2" 15px + sans labels 18px; inactive rows 45% opacity with chevron) + media column ~830px, gap ~100px. Panels 830×430px, radius 16, text-free; caption below - 24px/500 title + 18px description, 28px gap; ~120px breathing room between chapters.
- **Ingredients:** features staged as frozen micro-interactions composited on photography (mid-edit code with I-beam cursor and selection highlight; failover node graph on 1px dashed connectors); photo mood matched to theme (dusk for dark, daylight for light - never one asset recolored); chip materials re-derived per theme (black 45–60% + backdrop-blur glass over photo in dark, solid white + soft shadow in light); provider rows opacity-ramped 1.0→0.35 toward both edges.
- **Evidence:** piyushsphere-2089714 (anchor, dual-theme proof).
- **Families:** F1+F3 native; the light theme is the F2 twin. Strong dual-theme choice.
- **Choose when:** 2–4 premium features without bento clutter; a dual-theme build is planned.

### Split-Card Chapters - one feature per full-width editorial spread
- **Anatomy:** each chapter is one wide card ~1.82:1, centered with equal margins, split 53/47 text-left/image-right with a hard seam and no divider stroke. Radius 9–10px, shadow near zero (~0 2px 40px rgba(0,0,0,0.04)) - separation via tone contrast against a page tinted 2–6% toward the card's accent hue. Text column padding ~52px left / ~86px top / ~82px bottom, measure ≤60 CPL: mono slashed-zero index "01 / 03" (~22px, "/ 03" at 40% gray) → 20px → 40px/500 title pinned top; 5-line 20px/2.0 description + dark pill CTA (277×61px, #252525, radius 14) pinned bottom; ~240px empty air between - 30–45% of card height.
- **Ingredients:** image half = one grained gradient (stipple σ≈4–6) carrying one curated UI shot; alternate crop treatment per chapter - L-shaped corner bleed with ~65/96px gradient reveals, then dead-center float; one persistent product accent inside every shot while the ambient gradient hue changes per card; text half strictly grayscale.
- **Evidence:** piyushsphere-2088 (anchor); gradient-slab discipline from basit_designs-2089995.
- **Families:** F5+F3 native; comfortable in F2. Radius stays small - do not squirclify.
- **Choose when:** enterprise register; few features, each deserving a full editorial spread.

### Alternating Solution Rows - text/media zig-zag bound by one texture
- **Anatomy:** rows alternate text-left/media-right then media-left/text-right; sections separated by background-tone steps (white → #F7F7F7 → #EFEFEF) and ~120px vertical padding - no dividers. Text column: eyebrow caps → H2 36–40px/500 → body 13–16px; media column: the page's one signature texture with floating glass UI fragments (white 35–50% + backdrop blur + 1px white/60 border). Radii family 8/12/16/24.
- **Ingredients:** features as miniature working fragments (routing diagram with real model names, workflow checklist with done = blue-filled check circles / pending = white ring + blue dot on a 1px connector, 60% progress bar); headings #3A3A3A at 500, never pure black; one saturated accent total (#3770E9 class).
- **Evidence:** _heyfaisal-2089734 (anchor).
- **Families:** F2+F3 native.
- **Choose when:** many features to narrate at moderate depth; the safe, high-frequency light recipe.

### Sticky Step-Rail - one morphing panel narrates a process
- **Anatomy:** sticky scroll section: left media panel ~460px card whose content morphs per step (code → log rows → weight chips → endpoint swap); right rail of steps joined by a 1px vertical progress line, steps lighting in sequence, inactive steps dimmed. Ground #0a0710, cards #141319, radius 12, 1px rgba(255,255,255,.06). Optionally preceded by a scroll-scrubbed manifesto: max-width ~560px, ~28px/500 text brightening word-by-word #4a4653→#fff, 2–3 key phrases tinted the accent.
- **Ingredients:** step content is product-truthful fragments, not icons; scrubbing is scroll-linked (no easing), while step-panel swaps are 200–300ms ease-out; one violet-class accent; glows clipped inside card bounds and reserved for wide cards.
- **Evidence:** adriankuleszo-2089328 (Datawizz quadrant).
- **Families:** F1 native. F2 adaptation: white cards + hairline, keep the rail-and-morph mechanics.
- **Choose when:** the feature is a pipeline/workflow with a natural step order.

---

## Pricing

Corpus is thin here: **one direct pricing reference** (kevserctk-2090). Variant 1 is observed; 2 and 3 are derived from the closest structural evidence and marked as such.

### Surface-Inversion Pair - the featured tier is a geometric clone with the artwork as its skin
- **Anatomy:** centered H2 ~48px/500 + subhead → 2-segment Monthly/Annual toggle ~290×48px (active segment white with hairline border, radius 10) → two equal cards ~460px wide, gap 24px, radius 14px, padding 32px. Card order: plan name 20px/600 → price ~48px/700 + "/month" 16px/600 → 2-line description 16px → full-width CTA ~56px tall, radius 8 → 6 feature rows (40px circular check chip + 16px label, row gap 20px). The Pro card is a pixel-identical geometric clone of Starter with only the surface swapped to the page's signature artwork, all text flipped white, CTA solid white - no badge, no scale change, no accent border.
- **Ingredients:** check chips re-derived per surface - #F4F4F5 with black check on light, white at ~18% alpha with white check on the image; two button languages (pill in nav/hero, 8px rects in cards); the artwork here is its second of three appearances on the page (hero, Pro card, footer banner), which is what binds pricing to the rest.
- **Evidence:** kevserctk-2090 (sole direct pricing ref); emphasis-by-surface-inversion corroborated by adriankuleszo-2089887's dark finale card.
- **Families:** F2+F3 native; F6 friendly. F1 version: invert by luminance - featured card gets the +4–8% lighter surface and a brighter top-edge gradient border (LexnLin-2089 featured-card device) instead of artwork.
- **Choose when:** default pricing; 2–3 tiers; a signature asset exists to reuse.

### Divider-Cut Tier Table (derived) - pricing as a shared-border spec sheet
- **Anatomy:** 2–3 tier columns sharing ONE 1px divider (#202020 on #0a0a0a dark / #ebebeb on #fff light), radius 0, no fills, no shadows; a full-width rule above and below the table. Per column: mono tier index ("→ 01"), tier name and price on one line (price numerals mono, unit glyphs "$" "/mo" dimmed to ~40% opacity), 3-line description, spec-numbered feature list (1.1/1.2/1.3, dotted leader lines between mono keys and values), solid white rectangular CTA ~28px tall in 11px uppercase mono.
- **Ingredients:** emphasis without geometry changes - featured column at 100% row opacity, siblings at 60/35% (C11), or featured column surface stepped +4% luma; semantic hue only (green check glyphs). Derived by mapping the pricing content model onto 0xSero-2090's shared-border grid + xchylerdrenth-2090's equal-column strips and opacity-state rows; yurygok-2089624 supplies the dimmed-unit-glyph numeral treatment.
- **Evidence:** (derived) 0xSero-2090, xchylerdrenth-2090, yurygok-2089624.
- **Families:** F1+F4 native. Never with F6.
- **Choose when:** the rest of the page is divider-cut/blueprint and floating pricing cards would break the system.

### Banded Meter Card (derived) - each tier as an ops-grade data card
- **Anatomy:** one card per tier on the banded skeleton: header 8% (tier name + "/" muted breadcrumb, e.g. "Pro / for teams") / hero stat 12% (price ~40px, "$" and "/mo" at ~40% opacity) / visualization 42% (usage meters, included-quota bars - solid = included, dashed outline = add-on) / detail 24% (keyed feature table with dot bullets) / footer 14% (mono uppercase status line "BILLED ANNUALLY · CANCEL ANYTIME" left, dark pill + white pill CTAs right). 28px side inset held constant; bands stepping lighter downward #1C1C1E→#343436; card radius 20–24px on #101012, separation by lightness only.
- **Ingredients:** every number reconciles (quota rows sum to the plan total); one accent per tier from the semantic set; mono for all data, sans for prose. Derived by pouring pricing content into yurygok-2089624/yurygok-2089981's proven card grammar - the corpus's strongest "one skeleton, any content" system.
- **Evidence:** (derived) yurygok-2089624, yurygok-2089981.
- **Families:** F1 native (+F4 blueprint-grid garnish in the viz band).
- **Choose when:** usage-based/infra pricing where quotas and meters are the real story.

---

## Testimonial / social proof

### Full-Width Quote Card - one client, display treatment
- **Anatomy:** single card ~1216×480px spanning the container; internal split ~26% attribution / 74% quote, separated by a 1px vertical divider (#2D3238) inset to run only ~70% of card height. Attribution column: client logo top-left; name 15px/600 + role 14px muted pinned bottom-left. Quote column: oversized quote glyph above a 22–24px quote at 1.6 line-height (#C9C9C9–#E8E8E8 on dark); "View case study ↗" 14px/600 with hairline underline. Card 1px rgba(255,255,255,0.08) border, radius 16–20px, no shadow.
- **Ingredients:** the card border may pick up a faint accent tint near a gradient sheen; one testimonial at a time - no carousels of three shrunken quotes.
- **Evidence:** LexnLin-2089.
- **Families:** F1 native; F2 twin with 1px #ececf0 on white and #111/#555 text.
- **Choose when:** one flagship client quote deserves a full section beat.

### Proof-as-UI - testimony rendered as product artifacts, not adjectives
- **Anatomy:** 3 proof cards ~260px wide, radius 16, layered soft shadow (~0 20px 50px rgba(30,40,90,.15)) floating over the hero/section; card = photo or avatar top (~55%), name 13px/600, role line with linked company, then the proof itself as UI - verified email/phone rows as bordered chips with green check icons, KPI numbers, star-rating microcopy row.
- **Ingredients:** numbers that reconcile and plausible identities (C10); green strictly for verified/positive; on dark, the same idea becomes skeleton fragments where only the 3–5 selling data points render (LexnLin-2089 device).
- **Evidence:** adriankuleszo-2089328 (Seamless.AI quadrant).
- **Families:** F2/F6 native; F1 via the skeleton-fragment adaptation.
- **Choose when:** the product's output IS the social proof (data quality, results, scores).

### Monochrome Trust Strip - logos disciplined into one voice
- **Anatomy:** one row, container-width. Three proven treatments: (a) every mark forced into an identical 40px black circle + 18px/600 wordmark, justified space-between (kevserctk-2090); (b) all logos tinted one gray (#7E8AA0), optically size-matched, even ~56–64px gaps (adriankuleszo-2089253); (c) logo row opacity-ramped 1.0→0.35 toward both edges to imply an infinite marquee in a static layout (piyushsphere-2089714). If animated: 35px/s strictly linear with ~60px mask-image fade at both edges (LexnLin-2024).
- **Ingredients:** never full-color logo salad; the strip sits 40–64px below the hero subhead or above a feature grid as a quiet beat, not a section.
- **Evidence:** kevserctk-2090, adriankuleszo-2089253, piyushsphere-2089714, LexnLin-2024.
- **Families:** all - the treatment letter is chosen by family (a/b for F2/F6, c for F1/F3).
- **Choose when:** always, whenever client logos exist; pick one treatment and commit.

### Rotated Card Deck - playful shuffle stack
- **Anatomy:** 3 white testimonial cards stacked with 2–4° alternating rotation offsets; 2px ink outline (#110340 class), radius 24–28px, hard 4px offset shadow instead of blur; arrow control shuffles the next card to front with a ~400ms rotate-while-translating ease-out.
- **Ingredients:** cream ground #F8F8EE, single ink color for all strokes; sticker-type headline above. This is the corpus's one Playful Ink exemplar - offer as a named spice only, never a default.
- **Evidence:** kail_designs-2089 (whirrls third).
- **Families:** Playful Ink lane only (see style-families coverage note); clashes with F1/F4/F5.
- **Choose when:** deliberately playful brand; the whole page already speaks the 2px-outline dialect.

---

## Closing CTA

Thin as a standalone kind: in the corpus the closing beat is usually fused into the footer (LexnLin-2089) or reuses hero devices. Variant 3 is assembled from adjacent evidence.

### Artwork Banner Close - the signature asset's final appearance
- **Anatomy:** full container-width banner, aspect ~3.2:1, radius 16px, filled by the page's ONE signature artwork (its third and last appearance after hero and pricing); centered white 2-line H2 ~44px/500 + one white button (8px-radius rect, not pill - component context). Sits directly above the footer columns.
- **Ingredients:** no new gradient may be invented for this banner - reuse, recrop, or mirror the existing asset (single-asset discipline); text parked on the artwork's calmest region.
- **Evidence:** kevserctk-2090.
- **Families:** F2+F3 native; F6. F5 version: sharp-cornered gradient slab with halftone clipped to a rectangle (basit_designs-2089995 slab grammar).
- **Choose when:** a signature asset exists; the page needs a warm, bound-together ending.

### Editorial Dark Close - one earned lit moment on near-black
- **Anatomy:** centered short headline (white, 500 weight) + single CTA on #0a0710-class ground, ~100px breathing gap above the CTA row (TheKartikBansal-2089 gap discipline); optional preceding manifesto block scroll-scrubbed #4a4653→#fff. The CTA is the page's ONE iridescent moment: a gradient sheen sweep (blue→violet→amber, ~1s hue travel, linear) across the pill - reserved for this single element, nowhere else; or drifting sparkle particles around a plain white pill.
- **Ingredients:** everything else stays inside the gray ramp so the lit CTA reads as signal; no badges, no supporting cards; exit is faster than entrance on any hover state (C6).
- **Evidence:** adriankuleszo-2089328 (Datawizz "Get Started Now" with sparkles), mnowakdesign-2089684 (iridescent sweep reserved for the single hero CTA), TheKartikBansal-2089 (breathing gap).
- **Families:** F1 native with F8 as the one-lit-element garnish.
- **Choose when:** dark editorial pages; the close should feel inevitable, not loud.

### Display Contact Close (derived) - the CTA is an email set at display size
- **Anatomy:** instead of a button: a display-size contact email (~34px) above a full-width hairline, adjacent to the footer watermark; optionally preceded by a one-line invitation in the muted gray tier. Merges into the Watermark footer below - treat CTA + footer as one composed close.
- **Ingredients:** the email is real and clickable; no form, no button chrome - confidence as the device. Derived from LexnLin-2089's footer close (display email + hairline + watermark), promoted to the page's final CTA.
- **Evidence:** (derived) LexnLin-2089.
- **Families:** F1 native; F2/F5 (charcoal on white with #ececec hairline).
- **Choose when:** agency/studio/portfolio register where "email us" beats "start free trial".

---

## Footer

### Watermark Close - the brand mark oversized, cropped, at whisper opacity
- **Anatomy:** footer container with 40px top corners; 4 zones top-to-bottom: link columns (optional) → display-size email ~34px → full-width 1px hairline → legal line. The signature: the logo mark blown up to 350–450px, cropped by an edge, at 2–12% opacity - as gray watermark over texture (LexnLin-2089), dark-on-dark embossed relief at ~4% lightness delta (helvetiica-2089), ghost glyph at 2–3% luminance (basit_designs-2089995), ~400px #d9d9d9 mark cropped by the banner edge (devxnuj-2090), or a ~350px gaussian-blurred icon at 3–4% echoing state (marcelkargul-2089632).
- **Ingredients:** optionally swap the page's background texture for a richer one here only (quilted dark glass, LexnLin-2089) - the footer may be the page's most material moment.
- **Evidence:** LexnLin-2089 (anchor), helvetiica-2089, basit_designs-2089995, devxnuj-2090, marcelkargul-2089632.
- **Families:** F1 native; works in F2/F5 with light-mode ghost values.
- **Choose when:** default close for editorial pages; the brand mark is strong enough to carry it.

### Framed Legal Bar - the legal row gets its own container
- **Anatomy:** 4-column grid above (~40% brand column + 3 link columns; column headers 16px/600, links 15px/400); then, instead of a bare top border, a separate hairline-outlined bottom bar - 1px #E5E7EB, radius 12px, padding ~24px - holding copyright left / legal links right with a 1px divider between the links. Social glyphs as line icons in 40px hairline-bordered squares, radius 8px.
- **Ingredients:** zero decorative dividers elsewhere in the footer - the framed bar is the only drawn structure; pairs naturally with an Artwork Banner Close directly above.
- **Evidence:** kevserctk-2090.
- **Families:** F2 native; F6. F1 version: same geometry with rgba(255,255,255,0.08) frame on #090909.
- **Choose when:** SaaS pages with real link inventory; the tidy, product-led close.

### Playful Arc - a shape breaks the page edge
- **Anatomy:** giant navy ellipse arc rising from the bottom edge, content (wordmark, links, CTA) centered on the arc's crest; nav pill persists above. One clickable easter egg on the arc's edge (pull-cord lamp) recolors the entire arc instantly (<310ms, random pick per click) while foreground type stays one constant contrast-safe color.
- **Ingredients:** 2px ink outlines, cream ground, yellow display type on the navy surface; instant state swaps, tweens reserved for spatial motion.
- **Evidence:** kail_designs-2089 (whirrls).
- **Families:** Playful Ink spice only.
- **Choose when:** the page already committed to the playful lane; an easter egg fits the brand.

---

## Component showcase / interactive demo (docs/playground moments)

### Instrument Stage - one component, physics-true, on a flat field
- **Anatomy:** single component at 30–57% of canvas width, centered on a flat field with ≥80% negative space: #FBFBFB plain (flornkm-2089), #F2F1EE warm with 2px/32px dot grid (cabralorenzo-2090), or #040607 with 1px/40px HUD grid at 6–8% white plus corner-only brackets (recentdesign-2089). Optional nested shell: outer gray card radius 28px / inner white panel radius 20px inset ~10px, with a bottom "chin" strip carrying a 13px muted hint (jeetnirnejak-2089).
- **Ingredients:** the non-negotiable - direct-manipulation values update 1:1 per pointer event, zero tween; springs only for programmatic corrections (~10% overshoot, ~1.2s settle) with energy dissipated as contraction, not wobble. Scripted 3-beat intro (problem ~2s / hold ~0.9s / resolve ~0.7s) cancelled by any touch; an A/B rig (Plain/Stretch segmented control) inside the demo; one scalar echoed across 2–3 instruments with distinct lags; state by grey-idle→accent-ignition (<100ms on, ~300ms off); all numerals mono, zero-padded; demo scripted as acts ending on the exact idle frame.
- **Evidence:** jeetnirnejak-2089, cabralorenzo-2090, flornkm-2089, recentdesign-2089.
- **Families:** F7 by definition - blends by scale into any host family's ground (F2 light, F1/F8 dark).
- **Choose when:** the one component that should make the page memorable; hero-adjacent playground moments.

### Playground Window - a component library staged as an app
- **Anatomy:** app window (radius 16px, 1px rgba(255,255,255,0.06) border) at ~82% width over a full-bleed grainy mesh-gradient wallpaper; inside, two detached panels with a ~6px gutter - sidebar ~165px (#151515; items 12px, 24px row height; active = white text + 4px accent dot that springs between items ~400ms) and canvas (#121212, radius 12). Component centered at <20% of canvas area with one 11px muted hint line; floating variant dock bottom-center (dark pill #1C1C1C, drag-handle dots, 14px swatches, 6px gaps); description panel slides in as a ~35% third column with props as mono chips and install-command tabs.
- **Ingredients:** app chrome stays monochrome + one accent so the wallpaper and components own all color; theming proven live by a dark/light toggle (~250ms token fade); demos driven by recorded cursor interaction, never autoplay; film grammar for tours - expo-out camera zooms ~600ms with motion blur, ~3s per component, macro close-up for the detail beat.
- **Evidence:** toolfolio-2089 (rareui.com).
- **Families:** F1 shell + F3 wallpaper; F7 content. Light-mode canvas (~#ECECEC) proven in the same ref.
- **Choose when:** multiple components to show; the page is itself a registry/library.

### Inspector Docs - documentation rendered as a live redline layer
- **Anatomy:** the documented UI (a phone mock or component, centered on flat #E5E5E5) is the page; hovering any element reveals a Figma-inspector tooltip - white card radius 14–16px, 16px padding, shadow 0 12px 32px rgba(0,0,0,0.12): 15px/600 title with ◇ prefix, 13–14px behavioral prose, then a token table of lowercase mono gray keys + mono value chips on #F0F0F0 pills radius 4 (real token names: `text-xlarge-medium`, `strong-fg`). Spacing shown as measurement bands with centered mono value chips - idle white with 1px blue border, active solid blue with white numeral; hovering one token highlights EVERY instance of it. A state switcher (Default / Long title / Two-tone) proves rules survive variants.
- **Ingredients:** exactly one annotation hue (#3B82F6) kept strictly separate from the documented UI's palette; guideline copy is behavioral with fallback paths ("32px → text-large-medium, never regular"); motion inspector-calm - tooltip 150–200ms ease-out, highlight ~120ms, camera 600ms, zero springs.
- **Evidence:** GrahamPaterson-2089.
- **Families:** F4 (light) native; the documented subject can belong to any family.
- **Choose when:** design-system docs, spec pages, "how it's built" sections for the owner's own systems.

### A/B Teaching Carousel - anti-pattern vs correct, user-operated
- **Anatomy:** dark centered carousel: active card ~58vw at ~16:9, bg #161616–#181818, 1px #242424 border, radius 16–20px, elevation border-only; adjacent cards peek ~40px per side, dimmed to 35%. Card = ~80% interactive stage / ~20% control bar split by a 1px hairline; two-column comparisons split by a single 1px vertical rule at 50%. Controls: 4px slider tracks with white fill, live mono px readouts, pill toggles. Advance: slide ~450ms ease-out, no overshoot, incoming card un-dims during the slide.
- **Ingredients:** fixed verdict grammar on every card - gray X-in-circle = anti-pattern, accent-blue check-in-circle = correct; each lesson has one user-operated stressor (slider, toggle, play), never prose alone; derived values in blue-outlined mono pills vs authored inputs in plain black pills; cyan translucent overlays (~rgba(34,211,238,0.35)) for padding visualization; the shell practices what it teaches (tabular-nums readouts, concentric radii, ease-out only).
- **Evidence:** ImranUxi-2089 (interfaces.dev).
- **Families:** F1+F4 native.
- **Choose when:** teaching/comparing interaction details; changelog or "craft" pages demonstrating quality claims.
