# Layout Language

Synthesized from 45 reverse-engineered X/Twitter design references. Citations use `author-XXXX` (first 4 digits of the post id; 5 digits where 4 collide, e.g. `yurygok-2089624` vs `yurygok-2089981`). Corpus split: 16 dark, ~19 light, ~10 dual/mixed. Target use: premium SaaS/product landing pages, refetch.sh-grade (80% editorial monochrome / 15% staged atmosphere / 5% blueprint).

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

### Bento anatomy 4 - hairline lattice (light; ONE rectangle ruled inside)
- No cards at all: one bordered rectangle 1131.5 CSS wide, ruled internally with 1 px hairlines. Row 1 splits into three equal 376 px cells; row 2 into two 564.5 px cells whose divider lands on the container's exact horizontal midpoint and therefore does NOT align with either row-1 divider. **That misalignment is what makes it a bento rather than a table.** Radius 0 (verified square at 8x), cell fill #FFFFFF on page #F5F6F8, rule 1 px integrating to ~#E5E7E6. No shadow, no gap, no fill tint, no hover affordance - all of the roundness, depth, gradient and shadow budget is spent INSIDE the drawings (Tier B, chatsheet; plate `assets/features/iso-automation-grid.jpg`).
- Internal rhythm is byte-identical in both rows and the row change does not disturb it: cell top rule -> title cap-top 31 CSS; title baseline -> body first baseline 37.5; last body baseline -> illustration top ink 48.5; padding ~26; measure 324 / 513 CSS. The illustration is clipped 2.0-2.5 CSS px short of the bottom rule in every cell.

### Bento anatomy 5 - compressed-band dark (flat fills, uniform hairline, no shadow)
- 6-column grid; row 1 = three span-2 tiles at aspect 0.9932 (0.68 % off square, deliberately not `aspect-ratio: 1`), row 2 = two span-3 tiles at aspect 1.2957. Ground #151515 (luminance 21.00), card fill #1f201f (31.72), **uniform 1 px #252525 border on all four edges** - not a gradient border, and the bottom edge is the brightest. Corner radius fits a true circular arc (rms 0.43 px); no squircle needed. No drop shadow anywhere (Tier A, stashr; plate `assets/features/dark-bento-scenes.jpg`).
- The measured ratios fit a **1152 px container with a 16 px gap** to 0.02 % - use those round numbers, not the derived decimals.
- The entire decorative layer lives inside a **16-luminance band** over the fill: dot grid +5 to +30 at the dot core, rings +10 dimming outward, connectors +16. The only saturated colour in the section is the payload. White is rationed to exactly two jobs: the primary CTA and the saved artifact.

### Column patterns observed
- **2×2 (+ optional full-width finale)**: 0xSero-2090 (~699px cells), Triopixels-2089 (2×2 + full-width analytics card), basit_designs-2017 (2×2 capability grid, cells ~265×225px), kevserctk-2090 (industry 2×2), mnowakdesign-2089684 (quad reel).
- **3-up equal row**: AlexandruDranga-2090 (3×578px, gap 34), adriankuleszo-2089253 (3×~380px, gap 32), LexnLin-2024 (3×343px), _heyfaisal-2089734 (3×~400px).
- **3+2 (three narrow, then two wide)**: marcelkargul-2090148 (3×392px×435 then 2×596px×340, gap 24), _heyfaisal-2089734 (3 equal then 55/45 pair), _heyrico-2090 (3 top + 2 optically centered below), adriankuleszo-2089328 Datawizz (3 equal + 2 wide, gap 16).
- **60/40 mirrored rows**: 690/462px then 462/690px of a 1168px content width, equal heights, zig-zag reading path (adriankuleszo-2089887); LexnLin-2024 row 2 is 709/340 (≈2:1); basit_designs-2089995 mirrors gradient placement A-B-A across a triptych.
- **2+1**: two ~592px cards then a full-width card below (LexnLin-2089).
- **Split feature rows 40/60–55/45**: featured product card 40/60 text/media (LexnLin-2089), dark finale 40/60 (adriankuleszo-2089887), hero 55/45 (adriankuleszo-2089328 Datawizz), onboarding 50/50 (helvetiica-2089), split card 53/47 (piyushsphere-2088), index-column 320px + media 830px, gap 100px (piyushsphere-2089).
- **Row-span / portrait cells**: a cell taller than it is wide must carry a SEQUENCE (§ 5 archetype 11); its graphic bleeds to both side edges (99 % of width) while square siblings hold 9-14 % margins. Every other named bento in this corpus uses landscape cells, which is why "mixed spans" previously had nothing behind it.
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

### Cells across breakpoints

Every recipe in `recipes.md` is measured at 1440 while the QA loop mandates
rendering at 390x844, and nothing said what happens in between. State per
recipe, in an **At 390** line: what collapses (columns), what reflows (row-span
cells become full-width), what the visual ratio becomes, and what must never
shrink. The focal object never shrinks - **re-crop it instead** (rule 16: never
shrink a whole screenshot to fit). The one place fluid math already exists in
this skill is `scroll-scrub.md`'s `clamp(380px, vh - 220, 620px)`; copy that
pattern rather than inventing per-breakpoint pixel tables.

Two consequences that follow from § 5b: a cell that was 520 px wide at 1440 and
becomes 340 px at 390 has crossed two rungs of the deletion ladder, so its L5
ground grid and L6 construction guides must actually be removed at that
breakpoint, not merely scaled. And a portrait cell that reflows to full width
stops being a sequence cell - either keep the sequence horizontal or drop to the
square treatment.

## 5. Card anatomy archetypes

Visual:text ratios across feature cards run 55–80% visual (18/20 feature-card designs; mode ≈65–70%): 80/20 (LexnLin-2024, piyushsphere-2089, insporadesign-2087), 70/30 (AlexandruDranga-2090, cabralorenzo-2090, jeetnirnejak-2089), 65/35 (0xSero-2090, LexnLin-2089), 60/38 (Triopixels-2089, basit_designs-2089995), 55–60/40 (_heyfaisal-2089734, adriankuleszo-2089253, marcelkargul-2090148, basit_designs-2017).

1. **Media-panel + hairline divider + text** (dark editorial): card bg #101113, padding 16px → media panel 65% of height, radius 8px, slate gradient fill → full-width 1px divider → 18–19px/600 title → 14px muted 2-line desc. Identical anatomy on every card of the page (LexnLin-2089). Variant without divider: hard edge between 70% visual and 30% cream text strip (AlexandruDranga-2090).
2. **Visual-dissolves-into-text** (soft light): the gradient visual fades to pure white BEFORE the title line - zero seam, no divider, ever; visual top ~60%, text bottom ~38%, padding 28–32px (Triopixels-2089).
3. **Text-top, illustration-fills-rest**: top-aligned title 20px/600 + 2-line desc capped at ~85% width, illustration takes remaining ~70% of card and bleeds off clipped edges (adriankuleszo-2089887); text-top 45% / live visual 55% (adriankuleszo-2089328 Droxy).
4. **Split card, L/R**: 53/47 text/image with a hard seam and no divider stroke; title pinned to card top, desc+CTA pinned to bottom, 240px air between; image half is full-bleed gradient + one curated UI shot (piyushsphere-2088). Featured-product variant 40/60 text/media (LexnLin-2089, adriankuleszo-2089887 finale).
5. **Plate card** (blueprint): ~65% illustration plate centered in black negative space / ~35% text; the text block is itself split ~55/45 into title+desc | numbered spec list; FIG.n label in 11px mono #454545 sits 16–20px from the top-left corner (0xSero-2090).
6. **Banded data card**: one skeleton reused across all viz types - header 8% / hero stat 12% / visualization 42% / detail 24% / footer 14% of card height, 28px side inset, surfaces stepping lighter downward #1C1C1E→#343436 (yurygok-2089624, yurygok-2089981). Content/action-tray split ~70/30 with tonal step (mnowakdesign-2089321).
7. **Caption-outside**: card is 100% product mock; title ~17px/700 + one 13px muted sentence sit ON THE PAGE BG ~20px below the card edge (LexnLin-2024); titles/desc/links directly on the section background, card chrome only around visuals (adriankuleszo-2089253); title 24px/500 + 18px desc placed BELOW a text-free 830×430px photo panel, 28px gap (piyushsphere-2089); zero captions at all - diegetic microcopy inside the artwork only (_heyrico-2090).

8. **Photographic ground + veil split** (Tier A). One photograph at `cover` across the **full inner rectangle** (413.0 x 374.6 CSS), not cropped to the media zone, then the bottom 26.20 % hard-cut by a flat `rgba(255,255,255,0.68)` veil. The 10-90 transition measures 2.50 CSS px against a resample floor of 1.5 - that is antialiasing of a non-integer boundary, not a fade. No second background token, no gradient stop, no radius change, no border, no inner shadow at the seam. The consequence is the reason to build it this way: each card's text panel is auto-tinted by its own photograph, so nobody picks a panel colour (card 1 runs #DDDFD9 at 2 % width to #F5F6F0 at 85 %; cards 2 and 3 run #F3EEE4 to #F8F5ED), and the profile is non-linear across x and varies with y - no CSS `linear-gradient` reproduces it. Media zone 413.2 x 276.4 CSS, aspect 1.4951 -> build `aspect-ratio: 3/2` (0.91 CSS px off exact). Split 73.80 / 26.20; media:text 2.817:1.
   - Separation is by **lightness alone**: measured object-to-ground contrast 2.06:1 / 1.73:1 / 3.12:1 with no scrim, no vignette and no glass panel. It works because the photograph is chosen so the region under the object is tonally flat - 39.57 % of one card's media sits within +/-6 luminance of its modal 226.
   - Shadow ceiling for an object floating on photography: peak darkening 4.95 % of ground, reach 12 CSS px, y-offset 3 -> `box-shadow: 0 3px 12px rgba(0,0,0,0.055)`.
   - Constant text mass is what lets a 95 %-empty card read as a choice: one title line and exactly two body lines on **every** card of the row, enforced by editing copy, never by flexing the frame. (keep; plate `assets/features/photographic-ground-trio.jpg`.)
9. **Bounded light-field ground** (Tier A). The field is a rectangle with hard edges, not a wash: measured inset `59px 0 25px 374px` in a 750 x 468 cell. Build `overflow: hidden` on a rect with the lobes inside - never a masked wash. Full construction, lobe positions and the CTA-reuse rule: `gradient-fields.md` G3. This is the answer to "we need a coloured card ground without shipping the two-stop tell".
10. **Micro / chip cell** (Tier C, ratios only). 48 x 48 CSS plate, radius 12, fill 10-12 luminance above the page, 1 px hairline **brighter on the top and left only** - one light direction expressed in a single pixel. Glyph ink box 38 % of plate width, 23 px padding each side. No gradient (invisible at best, banding at worst), no shadow, no second colour. Column pitch 312 CSS, body wraps at ~327, copy 9 words / 54 chars. At this size the graphic is an index mark, not an argument: do not attempt a scene, and do not let the swap test fail the row for it (`quality-bar.md` § 3b relief clause).
11. **Portrait / row-span cell** (Tier C). 372 x 538 at 1x. Its graphic ink runs 99 % of width by 59 % of height - it bleeds to BOTH side edges, where a square sibling's focal object holds a 9-14 % side margin. The tall cell is the only one in its grid carrying a SEQUENCE: three stations on 1 px vertical drop-lines with 8 px dot terminals. **Rule: a tall cell earns its height by carrying an ordered process. A tall cell with one centred object is a square cell with padding.**
12. **Two-inset card (chrome row + copy block)** (Tier A ratio). The card's control row (filter pill + action button) is inset **further** than the title and description block below it - measured ratio 1.40:1 between the two insets. Encode the difference deliberately; equal insets read as a template. Companion control grammar: a **dashed** border means "empty slot, add something", a **solid** border means "commit" - two controls, two border styles, one semantic difference. The dash is authored, not the browser default: measured period 16.978 capture px at dash 9.89 / gap 7.11 = 1.39:1, i.e. `stroke-dasharray: 3 2` at a ~5.2 px period. (stashr.)
13. **Hub-lattice card** (Tier A). The many-to-one card, built so it does not collapse into the generated integrations picture:
   - Marks sit on a **rectangular lattice, not a circle**: x at card centre +/- 386.9 capture px, y at hub -231.1 / 0 / +232.9 (ratios to the hub tile's 163.24 width: 2.37 and 1.42). The circular feeling comes entirely from the rings and the bezier tangents.
   - Every mark sits in a circular chip that is a **thin ring with NO fill** - 160 capture px diameter (0.98 of the hub tile), ring peak luminance 35.0 (#232323) on a 31.72 card, interior left as the card fill so the dot grid shows through. Glyph about half the chip.
   - Three concentric rings at r = 140.5 / 195.5 / 251 (constant step 55.25 = 0.34 hub-tile widths) which **dim outward**: peak luminance 36.4 / 35.9 / 35.1. Each band is asymmetric with the long tail on the OUTSIDE (rise 8 px inward, fall 13 px outward, FWHM 11.3 / 12.4) - a stroke with a soft outer edge, not a hairline circle.
   - **Three** connectors, not six: one continuous cubic bezier per diametrically opposite pair, control points at 0.435 of the horizontal span, horizontal tangents at both ends (RMSE 1.66 capture px over 21 sampled points), stroke ~1.6 in neutral #30302f. Paint the hub tile LAST so it occludes the crossing.
   - Decorative layers are tinted, the diagram is not: dot grid #35344a (blue exceeds green by ~23), rings violet-leaning, connectors neutral.

Placement laws: title+desc left-aligned bottom or top, never centered inside cards; desc capped at 2 lines (LexnLin-2024, AlexandruDranga-2090, LexnLin-2089, adriankuleszo-2089887); one full-contrast focal object per card, everything else ghosted to 15–30% opacity (adriankuleszo-2089887); text never sits on a busy zone - dark shader mass parked behind the text block (insporadesign-2087), annotations only on the calmest gradient region (basit_designs-2089995), text never on pastels (devxnuj-2090).

**Two measured exceptions to "text never sits on a busy zone"**, both mechanisms rather than loopholes. (a) **Veil split** - a hard-edged flat white veil at 0.68 over the photograph's own continuation. Verify contrast per card, never once for the row: the panel IS the photo, and measured title contrast across three cards of one row was 15.96 / 17.88 / 17.74:1 with body copy at 6.8-8.7:1. (b) **Per-glyph shadow** - the field 24 px below a baseline dropped 40 L against the field 30 px above it, but only 10 L between glyph strokes, so the shadow follows the letterforms instead of boxing them: `text-shadow: 0 14px 34px rgba(2,20,35,.55), 0 2px 6px rgba(2,20,35,.35)` (basit_designs-2089627).

### 5a. The card dials - where siblings may legitimately differ

Mirrors the dial table in `illustration-ideation.md` § The set law. Six dials on
which sibling cards may differ without breaking the set:

| Dial | Notches |
|---|---|
| **Ground** | flat · photograph · bounded field · artwork |
| **Chrome** | borderless + one soft shadow · hairline · dashed frame + corner marks · none |
| **Text position** | below · beside · above · absent |
| **Footer / control band** | present or absent, and its inset relative to the copy block (§ 5 archetype 12) |
| **Aspect** | square · landscape · portrait |
| **Emphasis** | surface inversion only (rule 25) |

**The governing clause.** Geometry may vary between siblings when the finish is
rigid, or the finish may vary when the geometry is rigid - never both. What may
never vary within a row: equal heights (rule 7), one gutter token (rule 7), one
separation physics per surface (rule 3).

### 5b. Cell scale ladder - what to delete as the cell narrows

A cell's graphic is not one thing that gets smaller. It is a stack of nine
layers, and shrinking works by DELETING layers in a fixed order, never by
scaling the whole drawing down. A small cell built by scaling reads as a big
cell photographed from far away.

The nine layers, in build order: **L1** focal object · **L2** satellites ·
**L3** connectors · **L4** ground contact · **L5** ground grid · **L6**
construction guides · **L7** in-graphic labels · **L8** micro-texture · **L9**
handles, ticks and registration marks.

| Cell width at 1x | Delete | Notes |
|---|---|---|
| >= 520 px | nothing | the full stack is legal |
| 370-520 | L8, L7 | keep at most three label runs of <= 2 words |
| 280-370 | L5, L6 | ground grid and construction guides go |
| 200-280 | L2, L3 | let the object bleed and clip it instead |
| 120-200 | L4 collapses | the contact shadow becomes a 1-2 px hairline seam at luminance 232 (#E8E8E8 on white) - a soft shadow at this size smears the seam shut |
| <= 60 | everything but L1 | silhouette only: no gradient, no shadow, no label |

**Sizing law.** Ink bounding box at **73-83 % of cell width with 8-14 % side
margins**, OR bleed to 100 % and clip with `overflow: hidden`. Never a modest
centred object with a comfortable margin - that is the exact shape that reads
empty. Measured ink coverage: 17.1-17.8 % when sparse and spread, 36.5 % for a
z-stack, 48.3-55.9 % when clipped. Vertical 34-73 % of cell height, variable
because copy eats it.

**Budgets, all measured (Tier C - ratios and percentages only):**

- **Repetition count is three.** Every non-bleeding small cell that spreads to
  73-83 % does it with exactly three repeated units.
- **Accent budget: exactly one accented element per small cell.** Two and the
  eye has nowhere to land.
- **Text inside the graphic:** 0 runs below 200 px of cell width · 1 run of <= 2
  words at 200-280 · <= 3 runs of <= 2 words at 280-372 · 6-7 runs only above a
  band aspect of 2.4. Every run must be the object's own content, never a
  caption about the object.
- **Caption budget outside:** title 2-3 words, body 9-13 words / 54-88 chars.
- **Contrast budget for scaffolding:** object stroke at 70-82 % white, dashed
  guides 16-22 %, dotted guides 2-3 %, on a card 10-12 luminance above the page
  (measured 190-217 / 79-93 / 48-53 on a luminance-46 card - a 30:1 spread).
  Guides brighten monotonically toward the object: six consecutive dashes
  measured 79, 81, 84, 88, 91, 93, which is a radial mask on the guide layer.
- **Ink budget as a fraction of card area:** strong lines 1.38-2.13 %, mid lines
  1.87-3.42 %, faint construction grid 6.43-11.63 %.
- **Small-cell devices that survive** (measured): z-stack at 7 px inset per side
  per layer (scale 0.94), maximum 3 layers, seam = a 1-2 px hairline at
  luminance 232 · diagonal cascade at a constant step with pill radius = h/2 ·
  socket grid with 3 of 6 slots empty and a 1 px inner highlight on the top and
  left edges only · segmented ring, outer 193 CSS with a 26 band (52 % of cell
  width), 18 segments at 20-degree pitch with ~2 px gaps · leader line as 1 px
  dashed 3/3 plus a 3 px dot terminal, an 8 px gap and a 12 px mono label ·
  corner handles as 8 x 8 filled squares at every plane vertex.

**Texture pitch is a fraction of the host cell, not an absolute.** A 4 px
crosshatch calibrated on a 596 CSS px card is a materially different object in a
250 px one. Scale pitch with cell width, with ONE exception: inside a SET, hold
pitch constant across differently-sized cells - a shared pitch is what makes a
wide card and a narrow card read as one material.

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
25. Emphasize a featured card by surface inversion only: clone the sibling's exact geometry and swap the fill (artwork or dark surface); no badges, no scale changes, no accent borders (kevserctk-2090, adriankuleszo-2089887). **Rule 25 governs EMPHASIS - how one card is ranked above its siblings. It does not forbid variation**; the legal axes of variation are the six card dials in § 5a.
