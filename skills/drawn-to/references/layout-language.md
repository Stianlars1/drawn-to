# Layout Language

Synthesized from 45 reverse-engineered X/Twitter design references. Citations use `author-XXXX` (first 4 digits of the post id; 5 digits where 4 collide, e.g. `yurygok-2089624` vs `yurygok-2089981`). Corpus split: 16 dark, ~19 light, ~10 dual/mixed. Target use: premium SaaS/product landing pages, refetch.sh-grade (80% editorial monochrome / 15% staged atmosphere / 5% blueprint).

---

## 0. The four layout families

NOTE: A-D below are LAYOUT grammars, orthogonal to the style families F1-F8 in `style-families.md` (an F2 page may use grammar B or C). Do not conflate the two systems.

Every reference falls into one of four grammars. Pick ONE per section; never blend within a section.

| Family | Count | Ground | Separation | Radius | Signature |
|---|---|---|---|---|---|
| **A. Editorial divider-cut (dark)** | 12/45 | #090909–#101013 | 1px alpha rules, fill-steps | 0–16px | structure is felt, not seen (basit_designs-2017, 0xSero-2090, xchylerdrenth-2090, LexnLin-2089, piyushsphere-2089, yurygok-2089624, yurygok-2089981, marcelkargul-2089632, marcelkargul-2090148, helvetiica-2089, mnowakdesign-2089321, mnowakdesign-2089684) |
| **B. Soft floating-card light** | ~14/45 | #F7F7F7–#FBFBFC | borderless + one wide soft shadow, or 1px #ececec hairline | 14–64px | puffy cards, gradients dissolving into text (Triopixels-2089, LexnLin-2024, adriankuleszo-2089253, adriankuleszo-2089887, adriankuleszo-2090, _heyfaisal-2089734, kevserctk-2090, mickces-2088, piyushsphere-2088, GrahamPaterson-2089, _heyrico-2090, insporadesign-2087, jeetnirnejak-2089, cabralorenzo-2090) |
| **C. Print/brand mat (blueprint light)** | 5/45 | #fff mats on gray mounts | 1px #ececec hairline frames, exposed grids | 0 | white mats, hatched gutters, mono metadata (basit_designs-2089995, devxnuj-2090, designbynavneet-2089, its_sslvr-2088 dark variant, xchylerdrenth-2090 boards) |
| **D. Component stage** | ~11/45 | flat single-color field | none - pure figure/ground | per component | element 30–57% of canvas width, 80–97% negative space (flornkm-2089, arknow91-2089, madebylalit-2087, madebylalit-2088, cabralorenzo-2090, jeetnirnejak-2089, insporadesign-2088, recentdesign-2089, _heyfaisal-2089369, TheKartikBansal-2089, mnowakdesign-2089321) |

---

## 1. Grid systems & bento anatomies

### Bento anatomy 1 - divider-cut (dark editorial only, 4/45)
No card fills, no radii, no gaps: regions are cut from one surface by 1px rules.
- Frame the content column with two full-height 1px rails (~985px column on a 1226px viewport, rails at x≈120/x≈1106); run section dividers full-bleed between them (basit_designs-2017).
- Dividers sit at +4–8 luma above bg (#15181D on #0A0C10); inner sub-splits go dashed 1px at ~4/4px, even fainter (basit_designs-2017).
- Shared-border table variant: cards share edges through ONE central 1px #202020 divider (x≈731) and one row rule - a true bordered grid, radius 0, no shadows, no fills (0xSero-2090).
- Equal-column strips with full-height 1px dividers: 5 cols, ~28px cell padding, mono index top-aligned, copy bottom-aligned, ~90px dead air between (xchylerdrenth-2090).
- Full-bleed hairline frame + horizontal dividers above/below the headline block; hairline color #1a1a1a on #000 dark, #ebebeb on #fff light (piyushsphere-2089).

### Bento anatomy 2 - floating cards with gaps (dominant, ~14/45)
- Uniform gap 16–40px; 24px is the mode (LexnLin-2024 24–26, kevserctk-2090 24, marcelkargul-2090148 24, _heyfaisal-2089734 24, kail_designs-2089 20–24, basit_designs-2017 card rows 24, adriankuleszo-2089253 32, Triopixels-2089 32–40, AlexandruDranga-2090 34, adriankuleszo-2089328 16–20, mnowakdesign-2089684 12–16).
- Tight gutters, generous outer margins: card:gap ratio ~17:1 (578px cards, 34px gap, ~58–70px outer margins) (AlexandruDranga-2090).
- Equal row heights inside a row, always (adriankuleszo-2089887: 557/556px; AlexandruDranga-2090: 532px all three).

### Bento anatomy 3 - inset-panel with one gutter token (1/45 but the cleanest system)
- Bento sits on an inset #F1F2F2 panel over a #F9FAFC page; ONE 16px token = panel padding = card gap, everywhere (adriankuleszo-2089887).

### Column patterns observed
- **2×2 (+ optional full-width finale)**: 0xSero-2090 (~699px cells), Triopixels-2089 (2×2 + full-width analytics card), basit_designs-2017 (2×2 capability grid, cells ~265×225px), kevserctk-2090 (industry 2×2), mnowakdesign-2089684 (quad reel).
- **3-up equal row**: AlexandruDranga-2090 (3×578px, gap 34), adriankuleszo-2089253 (3×~380px, gap 32), LexnLin-2024 (3×343px), _heyfaisal-2089734 (3×~400px).
- **3+2 (three narrow, then two wide)**: marcelkargul-2090148 (3×392px×435 then 2×596px×340, gap 24), _heyfaisal-2089734 (3 equal then 55/45 pair), _heyrico-2090 (3 top + 2 optically centered below), adriankuleszo-2089328 Datawizz (3 equal + 2 wide, gap 16).
- **60/40 mirrored rows**: 690/462px then 462/690px of a 1168px content width, equal heights, zig-zag reading path (adriankuleszo-2089887); LexnLin-2024 row 2 is 709/340 (≈2:1); basit_designs-2089995 mirrors gradient placement A-B-A across a triptych.
- **2+1**: two ~592px cards then a full-width card below (LexnLin-2089).
- **Split feature rows 40/60–55/45**: featured product card 40/60 text/media (LexnLin-2089), dark finale 40/60 (adriankuleszo-2089887), hero 55/45 (adriankuleszo-2089328 Datawizz), onboarding 50/50 (helvetiica-2089), split card 53/47 (piyushsphere-2088), index-column 320px + media 830px, gap 100px (piyushsphere-2089).
- **Grid finale**: close multi-row grids with a full-width card, usually surface-inverted dark (adriankuleszo-2089887: 1168×399px dark card; Triopixels-2089; LexnLin-2089; marcelkargul-2090148 wide row).

### Container behavior
- Content column ≈1200px on 1440 viewports: 1200–1220 (LexnLin-2089), 1200 (kevserctk-2090, designbynavneet-2089, adriankuleszo-2089887, adriankuleszo-2089328 ×2), 1224 (marcelkargul-2090148). Narrow single-column pages run 700–1000px (mickces-2088 ~720px, kail_designs-2089 whirrls ~1000px).
- **Page-as-matted-object** (5/45): float the whole page as a rounded card on an outer canvas - 1440px white card r24 on texture (_heyfaisal-2089734); canvas inset in #F3F7F8 matte, 48px padding, r24 (basit_designs-2089627); page card on #FAFAFA (kevserctk-2090); dark r33 container inset 18px inside an #EFEFEF frame (marcelkargul-2090148); app window r16 + 1px rgba(255,255,255,0.06) over wallpaper (toolfolio-2089).
- **Exposed grid** (5/45): 1px #E8E8E8 column rules running full page height, outer ~48px gutters filled with 45° hatching or 8px-pitch ruling (designbynavneet-2089); blueprint hairlines deliberately overshooting content bounds + dashed register frames (xchylerdrenth-2090); full-height rails (basit_designs-2017, 0xSero-2090, piyushsphere-2089).
- Background grids stay OUTSIDE or BEHIND content at ≤8% contrast: blueprint grid 70–80px cells ~5% blue strokes only outside the container (LexnLin-2089); dot grid 2px/19px pitch, bg −7% luma, radially faded, confined to a band behind the illustration (adriankuleszo-2090); 40px HUD grid at 6–8% white (recentdesign-2089); 40–64px blueprint cells at 4–8% white + "+" corner crosshairs (yurygok-2089624, yurygok-2089981); 32px dot grid #D8D6D1 on #F2F1EE (cabralorenzo-2090).

---

## 2. Separation strategies, ranked by frequency

1. **Borderless + one soft wide shadow** (~14/45, light mode only). Alpha 0.04–0.14, blur 24–60px, blur ≥3× offset, and tint the shadow toward the palette: `0 24px 48px -12px rgba(50,70,130,0.14)` (Triopixels-2089), `0 8px 24px rgba(24,36,80,0.08)` (adriankuleszo-2089253), `0 24px 60px rgba(30,90,120,0.10)` (adriankuleszo-2090), `0 8px 30px rgba(16,24,40,0.06)` (LexnLin-2024), `0 12px 24px rgba(0,0,0,0.06)` (_heyfaisal-2089369), ~0.04 near-invisible (piyushsphere-2088, mickces-2088), `0 12px 32px rgba(0,0,0,0.10–0.12)` on floating fragments/tooltips only (_heyrico-2090, GrahamPaterson-2089).
2. **1px alpha dividers / hairline shared structure** (~14/45, mostly dark). rgba(255,255,255,0.06–0.09) on dark: #15181D on #0A0C10 (basit_designs-2017), rgba(255,255,255,0.08) (xchylerdrenth-2090, LexnLin-2089), #242424 on #161616 (ImranUxi-2089), #2A2A2A (yurygok-2089624), rgba(255,255,255,.06) (adriankuleszo-2089328 Datawizz), 1px #2e3235 ring ≈ +6% (arknow91-2089).
3. **Hairline-bordered floating light cards** (6/45). 1px #eef0f3 (LexnLin-2024), #E5E7EB (kevserctk-2090), #E2E2E2 (adriankuleszo-2089887), #ececf0 (adriankuleszo-2089328 Droxy), #ececec (mickces-2088, basit_designs-2089995 mats).
4. **Borderless lightness-step, no shadow** (6/45, dark). Card = bg +2–8% lightness: #2E2E2E on #232323, +4–5% (marcelkargul-2090148); #1d1d1d on #080808 (helvetiica-2089); #151515 on #0F0F0F ~2% lift (marcelkargul-2089632); stepped bands #1C1C1E→#343436 lightening downward inside one card (yurygok-2089981); rgba(10,14,18,0.85) cards on mist, luminance only (basit_designs-2089627); tone-shift-only content/tray split in dark mode (mnowakdesign-2089321).
5. **Inset/etched groove** (2/45). 1px #0A0A0A dark line + 1px #161616 highlight below = embossed hairline (marcelkargul-2089632); inset-highlight banding (yurygok-2089981).
6. **Thick outline / hard offset shadow** (2/45, playful-sticker lane only). 12px (logical) solid ring flipping #fff↔#000 with theme, replaces elevation entirely (TheKartikBansal-2089); 2px navy ink outlines + 4px 4px 0 hard offset shadows on cream (kail_designs-2089 whirrls).
7. **Dashed crop-mark frame** (1/45). 1px dashed hairline drawn ~2px outside the card, dashes overshooting corners, + ~7px solid corner squares (AlexandruDranga-2090).

**Mode law (UNIVERSAL, 16/16 dark refs): dark mode never uses drop shadows.** Every dark design separates by 1px alpha rules or 2–8% fill-steps (basit_designs-2017, 0xSero-2090, LexnLin-2089, xchylerdrenth-2090, marcelkargul-2089632, marcelkargul-2090148, helvetiica-2089, yurygok-2089624, yurygok-2089981, mnowakdesign-2089321, mnowakdesign-2089684, its_sslvr-2088, ImranUxi-2089, arknow91-2089, madebylalit-2088, insporadesign-2088). Light mode splits between shadow-only (soft family) and hairline (editorial/print family).

**Line-weight law (UNIVERSAL, 22/22 designs that draw lines): every structural line is 1px** (dashed variants also 1px). The only ≥2px outlines in the corpus are the two deliberate sticker/ink styles (TheKartikBansal-2089, kail_designs-2089).

**Divider inset move**: run vertical in-card dividers only ~70% of card height, inset top and bottom (LexnLin-2089); light-mode seams get tone-step + 1px hairline, dark mode tone-step alone (mnowakdesign-2089321).

---

## 3. Radius systems

### Observed families
- **Sharp 0** (5/45, families A/C): all containers, pills, buttons square (0xSero-2090); zero radii on panels/bands/cards (basit_designs-2089995, devxnuj-2090); containers 0 with 6–8px allowed on buttons only (xchylerdrenth-2090); divider-cut bento (basit_designs-2017 video 1).
- **Small 2–8px** (4/45): split cards 9–10px (piyushsphere-2088); ~8px at 1x posters (its_sslvr-2088); media panels 8–12px inside 16–20px cards (LexnLin-2089).
- **Medium 10–16px** (12+/45 - the default card radius): 14–16 (adriankuleszo-2089887, GrahamPaterson-2089, basit_designs-2089627), 12–16 (mnowakdesign-2089684, toolfolio-2089), 16 (marcelkargul-2090148, piyushsphere-2089 panels, adriankuleszo-2089253), 16–20 (ImranUxi-2089, LexnLin-2089), 12–14 (mickces-2088, adriankuleszo-2089328 Droxy 14).
- **Large 20–28px** (9/45): 24 (LexnLin-2024, cabralorenzo-2090, adriankuleszo-2090, kevserctk-2090 hero media), 28 outer / 20 inner (jeetnirnejak-2089), 20–24 (yurygok-2089624/20899), ~20 (mnowakdesign-2089321), 16–24pt (helvetiica-2089), 28 (basit_designs-2017 stat cards).
- **Pill / full-round**: whole components (flornkm-2089 track r=height/2, _heyfaisal-2089369 pills r=65px at 130px height, arknow91-2089 circles, madebylalit-2087 orb); nav bars as full-round frosted pills (basit_designs-2089627, kail_designs-2089 whirrls).
- **Squircle ~13–15% of width**: 48–64px on a ~420px card, continuous corners - the "pebble" silhouette (Triopixels-2089); 7% of width ≈ 36px on illustration tiles (_heyrico-2090); avatar radius 32% of side = iOS-icon proportion (TheKartikBansal-2089).

### Radius-hierarchy patterns (12/45 explicit; UNIVERSAL: never one radius everywhere)
- **24/16/12/8 descending nest**: page frame 24 → cards 16 → buttons/chips 12 → nested tiles 8 (_heyfaisal-2089734); window 24 → inner panels 16 → buttons 10–12 → chips pill (designbynavneet-2089); outer card 24 → inner elements 12–16 (LexnLin-2024).
- **Concentric formula**: outer radius = inner radius + padding (20 = 12 + 8) (ImranUxi-2089).
- **Three tiers, stated as law**: card 20–24 → inner 4–8 → buttons pill - "three distinct radius tiers, never one" (yurygok-2089981); section 33 → card 16 → chip pill (marcelkargul-2090148); card 50 → avatar 33 → button/panel 22 logical (TheKartikBansal-2089); shell 28 → panel 20 (jeetnirnejak-2089); outer 16–20 → media 8–12 → buttons 8 → footer container 40 (LexnLin-2089).
- **Two button-radius languages by context**: full pill for marketing chrome (nav/hero CTAs), ~8px rects for CTAs inside cards/components (kevserctk-2090); pills for marketing, 10–12px in-product (designbynavneet-2089).
- Family correlation: radius 0 belongs exclusively to families A/C (editorial/blueprint); squircle ≥13% belongs exclusively to family B (soft light).

---

## 4. Spacing & air

### Padding norms
- Card padding: 16px (adriankuleszo-2089887 gutter token), 16–24px (0xSero-2090), 24–28px (basit_designs-2017 cells, marcelkargul-2090148), 24–32px (LexnLin-2024, Triopixels-2089 28–32, kail_designs-2089 whirrls 32), 28–32px + 24px band padding (yurygok-2089981), 28px side inset held constant across every band of a data card (yurygok-2089624).
- Section vertical padding: 96–120px (LexnLin-2089), ~120px (_heyfaisal-2089734), 64–96px gaps in lieu of dividers (kevserctk-2090), 120px panel→next-panel breathing (piyushsphere-2089).
- One spacing token governing all insets: single ~22px (logical) token for text padding, avatar margin, button insets (TheKartikBansal-2089); one 20px padding ring on all four card sides (mnowakdesign-2089321); 16px page gutter at every breakpoint, 40px between sections, 8px title→body (GrahamPaterson-2089).

### Deliberate dead-air moves (the signature of this taste)
- ~240px empty air between top-anchored title and bottom-anchored description+CTA = 30–45% of card height left empty (piyushsphere-2088).
- 40–55% of each card as empty gray between title block and color slab (basit_designs-2089995).
- 55–65% of any poster is empty paper; content clustered in max 3 zones (devxnuj-2090).
- ~90px air between mono index and copy inside feature-strip cells (xchylerdrenth-2090).
- Text occupies <40% of a bento cell's height; the rest is deliberate dark air (basit_designs-2017).
- ~100px breathing gap before the CTA row (TheKartikBansal-2089).
- 97% negative space around a single glowing element (madebylalit-2088); ~80% empty stage around each component demo (toolfolio-2089).

### Negative-space ratios, component stages
Component occupies 30–57% of canvas width, centered on a flat field: ~30% (arknow91-2089), ~36% (madebylalit-2087), ~49% (insporadesign-2088), ~50% (flornkm-2089 track 800px on 1600), ~57% (insporadesign-2087), <20% of canvas area (toolfolio-2089), <3% of frame area (madebylalit-2088).

### Edge-bleed & cropping (12+/45)
- Crop repeatable content (variants, swatches, icon rails) at 1–2 card edges and FADE the outermost items - implies a larger canvas without words (adriankuleszo-2089887: carousel + swatch row half-cropped and dimmed; _heyrico-2090: fragments bleed off 1–2 edges, oversized instead of shrunk).
- Fade masks over hard crops, always: dissolve marquee tiles over the last ~60px with a mask-image gradient (LexnLin-2024); alpha-mask illustration stacks over the last 40% (adriankuleszo-2090); opacity-ramp logo rows 1.0→0.35 toward both edges to imply an infinite marquee (piyushsphere-2089).
- L-shaped reveal crop: pin a screenshot to a corner, crop two edges, expose one rounded corner with ~65px/~96px gradient reveals; alternate with dead-center float in sibling cards (piyushsphere-2088).
- Props render at ~80% scale, cropped by the container (basit_designs-2017).
- **Watermark move** (5/45): oversized brand mark cropped by an edge at whisper opacity - ~450px logo at 12% in the footer (LexnLin-2089), dark-on-dark embossed relief at ~4% lightness delta bleeding off-canvas (helvetiica-2089), ghost glyph at 2–3% luminance offset (basit_designs-2089995), ~400px #d9d9d9 mark cropped by banner edge (devxnuj-2090), ~350px blurred icon at 3–4% opacity echoing selection (marcelkargul-2089632).

---

## 5. Card anatomy archetypes

Visual:text ratios across feature cards run 55–80% visual (18/20 feature-card designs; mode ≈65–70%): 80/20 (LexnLin-2024, piyushsphere-2089, insporadesign-2087), 70/30 (AlexandruDranga-2090, cabralorenzo-2090, jeetnirnejak-2089), 65/35 (0xSero-2090, LexnLin-2089), 60/38 (Triopixels-2089, basit_designs-2089995), 55–60/40 (_heyfaisal-2089734, adriankuleszo-2089253, marcelkargul-2090148, basit_designs-2017).

1. **Media-panel + hairline divider + text** (dark editorial): card bg #101113, padding 16px → media panel 65% of height, radius 8px, slate gradient fill → full-width 1px divider → 18–19px/600 title → 14px muted 2-line desc. Identical anatomy on every card of the page (LexnLin-2089). Variant without divider: hard edge between 70% visual and 30% cream text strip (AlexandruDranga-2090).
2. **Visual-dissolves-into-text** (soft light): the gradient visual fades to pure white BEFORE the title line - zero seam, no divider, ever; visual top ~60%, text bottom ~38%, padding 28–32px (Triopixels-2089).
3. **Text-top, illustration-fills-rest**: top-aligned title 20px/600 + 2-line desc capped at ~85% width, illustration takes remaining ~70% of card and bleeds off clipped edges (adriankuleszo-2089887); text-top 45% / live visual 55% (adriankuleszo-2089328 Droxy).
4. **Split card, L/R**: 53/47 text/image with a hard seam and no divider stroke; title pinned to card top, desc+CTA pinned to bottom, 240px air between; image half is full-bleed gradient + one curated UI shot (piyushsphere-2088). Featured-product variant 40/60 text/media (LexnLin-2089, adriankuleszo-2089887 finale).
5. **Plate card** (blueprint): ~65% illustration plate centered in black negative space / ~35% text; the text block is itself split ~55/45 into title+desc | numbered spec list; FIG.n label in 11px mono #454545 sits 16–20px from the top-left corner (0xSero-2090).
6. **Banded data card**: one skeleton reused across all viz types - header 8% / hero stat 12% / visualization 42% / detail 24% / footer 14% of card height, 28px side inset, surfaces stepping lighter downward #1C1C1E→#343436 (yurygok-2089624, yurygok-2089981). Content/action-tray split ~70/30 with tonal step (mnowakdesign-2089321).
7. **Caption-outside**: card is 100% product mock; title ~17px/700 + one 13px muted sentence sit ON THE PAGE BG ~20px below the card edge (LexnLin-2024); titles/desc/links directly on the section background, card chrome only around visuals (adriankuleszo-2089253); title 24px/500 + 18px desc placed BELOW a text-free 830×430px photo panel, 28px gap (piyushsphere-2089); zero captions at all - diegetic microcopy inside the artwork only (_heyrico-2090).

Placement laws: title+desc left-aligned bottom or top, never centered inside cards; desc capped at 2 lines (LexnLin-2024, AlexandruDranga-2090, LexnLin-2089, adriankuleszo-2089887); one full-contrast focal object per card, everything else ghosted to 15–30% opacity (adriankuleszo-2089887); text never sits on a busy zone - dark shader mass parked behind the text block (insporadesign-2087), annotations only on the calmest gradient region (basit_designs-2089995), text never on pastels (devxnuj-2090).

---

## 6. Section composition

### Section header formula (family B/A shared)
Eyebrow 11–13px caps at +6–10% tracking → H2 44–56px/500–700 at −2 to −3% tracking → 15–16px muted subhead, all centered; header sits 48–120px above the grid (Triopixels-2089: 12/44/15, 48px; LexnLin-2089: 52–56px/700/−0.03em + 16px subhead, 64px; adriankuleszo-2089887: 13px eyebrow +0.08em → 48px/600 −0.02em → 16px, 120px; marcelkargul-2090148: 36px/700, 90px above grid).

### Hero staging (centered stack, 6/45)
badge pill (~24px tall, icon + 11px caps at 0.1em) → H1 56–72px, line-height 1.05–1.15, tracking −1 to −2% (2 lines) → subhead 16–20px, max-width 480–640px (2 lines) → CTA pair, gap 12–16px → media/illustration. Vertical rhythm ≈ 24 / 24–28 / 40–48 / 64–80px (adriankuleszo-2090: 24/28/48/80; kevserctk-2090: 24–32 steps, 64 before media; basit_designs-2089627: nav→90→headline→24→sub→40→CTA row→40→device; designbynavneet-2089: 24 badge→H1, 40 H1→CTAs, hero padding 96 top/72 bottom). Hero media panel full container width at ~3:1, radius 24 (kevserctk-2090). Z-order can diagram the pipeline: input artifact at bottom → logo chip → output UI card on top (adriankuleszo-2090).

### Feature sections
- Depicted-feature grids per family: divider-cut 2×2 with media panel 46:54 split (basit_designs-2017); FIG-plate shared-border 2×2 (0xSero-2090); soft 2×2+full-width (Triopixels-2089); 3+2 (marcelkargul-2090148); mirrored 60/40 bento with dark finale (adriankuleszo-2089887).
- Alternating text-left/media-right solution rows (_heyfaisal-2089734); sticky step-rail: left media panel morphs per step, right rail with 1px progress line (adriankuleszo-2089328 Datawizz).

### Pricing
Two equal ~460px cards, gap 24px, radius 14px; the featured tier is a pixel-identical geometric clone of the base card with only the surface swapped to the signature artwork, text flipped white, CTA solid white - no badge, no scale change (kevserctk-2090).

### Footers
- Watermark close: logo mark ~450px at ~12% opacity + display-size email (~34px) above a full-width hairline; footer container with 40px top corners (LexnLin-2089).
- Legal row framed in its own 1px #E5E7EB, r12 container instead of a bare top border; 4-column grid above (kevserctk-2090).
- Full-width banner reusing the page's one signature artwork (~3.2:1, r16) (kevserctk-2090); giant navy arc rising from the bottom edge (kail_designs-2089 whirrls).

### Numbering / meta layers (8–10/45; family A/C signature)
Always monospace, always a size tier below body:
- FIG.1–FIG.4 plate labels + triple numbering - nav 01–04, sections 01/02, specs 1.1–2.3 - cross-referencing the page like a spec document (0xSero-2090).
- Spec-sheet feature index: mono "1.0/1.1/1.2" 15px + sans label 18px; inactive rows at 45% opacity with chevron (piyushsphere-2089).
- Slashed-zero mono series counter "01 / 03" ~22px, current black, "/ 03" at 40% gray (piyushsphere-2088).
- "→ 0.1"…"→ 0.5" indices in equal-column strips (xchylerdrenth-2090); 01/02/03 mono chips inside 1px circles + "fig. 01" ledger rows (devxnuj-2090).
- Mono-caps encoding keys and provenance footers: "ONE DOT = ONE SAMPLED PROMPT", "FINISHED 12 MIN AGO · 4m 08s" (yurygok-2089981, yurygok-2089624).
- Binding device: one signature artwork repeated exactly 3× (hero media, Pro card surface, footer banner) makes three sections read as one object (kevserctk-2090); one fictional client brand threading all five cards of a bento (adriankuleszo-2089887).

---

## Rules

1. Set the content column to ~1200px (1200–1225 measured) on a 1440 viewport; use 700–1000px only for single-column playground/tool pages (LexnLin-2089, kevserctk-2090, marcelkargul-2090148, adriankuleszo-2089887, mickces-2088).
2. Dark mode: never use drop shadows. Separate with 1px rgba(255,255,255,0.06–0.09) rules or 2–8% lightness steps - 16/16 dark references comply (basit_designs-2017, 0xSero-2090, marcelkargul-2090148, helvetiica-2089, yurygok-2089981).
3. Light mode borderless cards: exactly one wide soft shadow - alpha 0.04–0.14, blur 24–60px (blur ≥3× the y-offset), tinted toward the palette hue, e.g. `0 24px 48px -12px rgba(50,70,130,0.14)` (Triopixels-2089, adriankuleszo-2090, adriankuleszo-2089253).
4. Draw every structural line at 1px; sub-splits go 1px dashed (4/4px). Reserve ≥2px outlines for deliberate sticker/ink styles only (basit_designs-2017, 0xSero-2090; exceptions TheKartikBansal-2089, kail_designs-2089).
5. For dark editorial bento, cut regions from one surface: two full-height 1px rails framing a ~985px column, dividers at +4–8 luma of bg, radius 0, no card fills, no gaps (basit_designs-2017, 0xSero-2090).
6. In shared-border grids, neighbors share ONE 1px divider - never two adjacent borders (0xSero-2090).
7. In gap bentos, use one gutter token (16 or 24px) for both panel padding and card gaps; keep all cards in a row exactly equal height (adriankuleszo-2089887, marcelkargul-2090148).
8. Split 2-card rows 60/40 (~690/462 at 1168px) and mirror the next row 40/60; close multi-row grids with a full-width, surface-inverted finale card (adriankuleszo-2089887, Triopixels-2089).
9. For 3+2 grids: three ~392px cards then two ~596px wide cards, uniform 24px gap (marcelkargul-2090148, _heyfaisal-2089734).
10. Build a 3-tier radius hierarchy, never one radius: 24 page / 16 card / 12 button / 8 nested tile, or concentric outer = inner + padding (_heyfaisal-2089734, ImranUxi-2089, yurygok-2089981, TheKartikBansal-2089).
11. Split button radius by context: full pill for marketing chrome (nav, hero CTAs), 8–12px rects inside components and cards (kevserctk-2090, designbynavneet-2089).
12. Reserve radius 0 for editorial/blueprint sections and squircle (13–15% of card width, continuous corners) for soft light cards; never mix the two in one section (0xSero-2090, basit_designs-2089995 vs Triopixels-2089).
13. Give feature cards 55–80% visual area (target ~65–70%); cap copy at title + 2 description lines (LexnLin-2024, AlexandruDranga-2090, 0xSero-2090, LexnLin-2089).
14. Demote captions outside or below the visual - on the page background 20px below the card, or below a text-free media panel with a 28px gap; never overlay text on a busy zone (LexnLin-2024, piyushsphere-2089, adriankuleszo-2089253).
15. Engineer dead air: anchor title to card top and desc+CTA to card bottom leaving 30–45% of the card empty; on posters keep 55–65% empty with content in ≤3 clusters (piyushsphere-2088, basit_designs-2089995, devxnuj-2090).
16. Bleed repeatable content off 1–2 card edges and fade the outermost items (opacity ramp 1.0→0.35 or a 40–60px alpha mask); never hard-crop and never shrink whole screenshots to fit (adriankuleszo-2089887, _heyrico-2090, piyushsphere-2089, LexnLin-2024).
17. On component stages, size the element at 30–57% of canvas width on a flat field and give it ≥80% negative space (flornkm-2089, arknow91-2089, insporadesign-2087, madebylalit-2088).
18. Stage heroes as a centered stack: badge → H1 56–72px/1.05–1.15/−2% → subhead max-width 480–640px → CTA pair (gap 12–16px) → media; rhythm 24 / 28 / 40–48 / 64–80px (kevserctk-2090, adriankuleszo-2090, basit_designs-2089627).
19. Header a section as: 11–13px caps eyebrow (+6–10% tracking) → 44–56px H2 (−2 to −3%) → 15–16px subhead, 48–120px above the grid; pad sections 96–120px vertically and skip decorative dividers between sections (Triopixels-2089, adriankuleszo-2089887, LexnLin-2089, kevserctk-2090).
20. Add a mono meta layer: number cards/sections with FIG.n, 01/03, or 1.0/1.1 indices at 11–15px mono, current index full-contrast, siblings at 40–45% (0xSero-2090, piyushsphere-2088, piyushsphere-2089, xchylerdrenth-2090).
21. Mat the page as an object when presenting: float it as a 16–33px-radius card inset 18–48px on a flat outer canvas or full-bleed texture (_heyfaisal-2089734, basit_designs-2089627, marcelkargul-2090148, toolfolio-2089).
22. Keep background grids/dot fields outside or behind content at ≤8% contrast, radially or linearly faded - 19–80px pitch depending on scale (LexnLin-2089, adriankuleszo-2090, yurygok-2089624, recentdesign-2089).
23. Close pages with a watermark: brand mark 350–450px at 2–12% opacity (or 4% embossed lightness delta on dark), cropped by an edge (LexnLin-2089, helvetiica-2089, basit_designs-2089995, devxnuj-2090).
24. Build data cards on one banded skeleton - header 8 / stat 12 / viz 42 / detail 24 / footer 14% of height, 28px side inset, surfaces lightening downward #1C1C1E→#343436 - and reuse it across every visualization type (yurygok-2089624, yurygok-2089981).
25. Emphasize a featured card by surface inversion only: clone the sibling's exact geometry and swap the fill (artwork or dark surface); no badges, no scale changes, no accent borders (kevserctk-2090, adriankuleszo-2089887).
