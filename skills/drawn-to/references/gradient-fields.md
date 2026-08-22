# Gradient fields - light as a buildable device, at card scale and page scale

Why this file exists: the skill forbids the naive gradient (C9: an un-grained
CSS gradient is the loudest generic-AI tell) and, until now, offered no
buildable alternative. The only gradient question in the bank was gated behind
one family. So an agent that needed a coloured surface had two options: break a
constant, or ship a flat fill. This file is the third option, and it is the one
the corpus actually uses.

The finding that reorganises everything below: **the expensive fields in this
corpus are almost never colour ramps.** They are chroma-only fields, structured
one-directional light events, quantised photographs, and value-pinned ramps in
which the luminance never moves at all. Sixteen kinds were measured across
thirteen references; the existing docs described about five of them.

Companion files: `isometric-and-light.md` Path B (light at hero and closing-CTA
scale, where the object is the subject), `color-type.md` § 6 (where a field sits
in the palette), `graphic-language.md` § 4 (the observed vocabulary),
`render-tiers.md` (what draws it), `quality-bar.md` (whether it ships).

**Provenance.** Every value carries a tier. **A** = re-measured and confirmed by
an adversarial pass. **B** = single measurement with the capture scale solved and
a sibling reference corroborating the mechanism. **C** = ratios only, scale never
solved. Never quote a C value as absolute px.

---

## 0. Authoring doctrine - one luminance function plus one chroma function

Author a field as **two functions, never as a list of hex stops.** Decide what
the luminance does across the box, decide what the chroma does across the box,
and let the hexes fall out. A stop list is the artefact of the decision, not the
decision, and it is why a picked palette reads picked.

Every field that survived verification resolves to one of four archetypes:

| Archetype | Luminance | Chroma | Measured example |
|---|---|---|---|
| **Value-pinned chroma ramp** | pinned 99.8-100.0 % | S 6.4 -> 91.7 %, hue 311.6 -> 346.9, R pinned 254-255 | basit_designs-2089995 hero slab (B) |
| **Hue-locked value ramp** | 0 -> 100 % over 218 levels | hue locked inside 3.5 deg, S arcs 65.9 -> 46.0 -> 0 | the LeadBurst tile (A) |
| **Chroma-only field** | pinned 96.2-99.5 % | S 5.7-28.5 %, hue sweeping freely | devxnuj-2090 (B) |
| **Channel-clamped photograph** | photographic | one RGB channel clamped <= 8 across the whole image | kevserctk-2090 (B) |

Three consequences worth stating plainly, because each one inverts a habit:

- **A ramp whose value never moves does not read as a gradient.** It reads as ink
  or as a lit surface. Pin V, pin one RGB channel, and let the other two carry
  the axis (basit_designs-2089995 holds R at 254-255 across fifteen sampled
  stops).
- **A ramp whose hue never moves is the strongest value ramp.** The best pure
  ramp measured on either sheet locks hue inside 3.5 degrees while luminance
  travels the entire 218-level range, and carries its variety in a saturation
  ARC instead: 65.9 % at L 8.0, 46.0 % at L 51.4, 0 % at L 98.8 (A).
- **Flat saturation across a value range reads as a colour overlay**, because
  that is what it is.

---

## 1. The source test - four checks, in order of cost

A field reads authored when the drawing implies a light POSITION. Someone
decided where the light was. These four checks are how you find out whether
anyone did, and they are cheap enough to run on your own output before shipping.

**1. Trough test (the cheapest and the most decisive).** Sample one column
straight down the field and find the per-column luminance minimum, then fit it
across x. **A field with a real source is non-monotonic.** Measured on the
Metricly tile: the trough fits `y = -0.000553x^2 + 0.4156x + 387.44` (rms
3.13 px over 92 samples), and the bottom edge reads 206.2 / 197.1 / 184.2 /
184.7 / 183.2 / 195.3 / 206.2 at x = 5 / 125 / 245 / 365 / 485 / 605 / 725 - the
field is lit from the two bottom CORNERS, not the bottom centre (A). A
monotonic ramp over more than 80 % of its height is paint, not light.

**2. Off-axis test.** Fit the iso-luminance-90 contour and find its vertex. The
best-authored tile on the sheet puts its vertex at **44.8 %** of tile width; the
weakest puts it at **50.11 %** (A). A vertex within 3 percentage points of 50 %
means nobody decided where the light was - it was centred because centring is
the default. Refuse symmetry unless the brief asked for it.

**3. Saturation arc.** When hue is locked, saturation must peak in the mid-tone
and fall at both ends (65.9 / 46.0 / 0 across the value range, A). Flat S is an
overlay.

**4. Hue gate.** Read hue only where **chroma >= 12**. Below that, hue in a
4:2:0 JPEG is noise. This single rule retracted three separate "multi-stop hue
journey" findings in the verification pass: a claimed 109-degree hue path
measured 34 degrees once gated, i.e. an ordinary two-stop periwinkle ramp.

> **Do NOT use an FFT mid-band gate** ("at least 10 % of energy in f4-48 means
> the field is real"). It was tried and it inverts the ranking: it adopts the
> weakest field on the sheet at 55.5 % and rejects the best-authored ramp at
> 8.1 %. It is normalised by total energy, so at low amplitude the JPEG's own
> DCT residue dominates the mid band, and it cannot tell a crop containing UI
> from a clean one (the same crop scores 39.2 % clean and 53.0 % with a headline
> in frame). The synthetic controls DO reproduce - a pure two-stop 135deg linear
> puts 99.9 % of its energy in f1-4 and 0.1 % in the mid band; a two-blob mesh
> gives 90.1 / 0.0 - so the measure describes synthetic input and nothing else.

---

## 2. The sixteen kinds

Schema for each: *shape · stops · direction · falloff and edge · what sits on it
· grain · why it reads real · how it fails.*

### G1. Corner-light bowl (A)
Two mirrored radial sources at the bottom corners under a linear ramp, so the
field's darkest line is a shallow parabola rather than a straight edge.
Bottom-edge ladder and the parabola in § 1. Corner ladder #B9CFFF / #B4C8FD /
#9AB0FB against a bottom-centre #A2BEFD; corner-to-centre delta +23 R / +17 G /
+2 B - the corners are warmer as well as brighter, which is what stops it
reading as a vignette. Flat hold at the top: exactly #F3F1F2 to y 99, within one
level to y 118, chroma >= 6 only from y 150. **Fails** when the two sources
merge into one centred bloom.

### G2. Value-pinned chroma ramp - the ink slab (B)
Horizontal, V held 99.8-100.0 %, R pinned 254-255, S climbing 6.4 -> 91.7 %.
Fifteen measured stops from #FFEEFC through #FF89F1, #FF39BB, #FF187C to
#FE2454. Reads as saturated ink on a lit surface rather than as a gradient
because the eye reads value first and value never moves. **Fails** the moment V
is allowed to drift - it becomes an ordinary pink-to-red ramp.

### G3. Clipped light box (A)
The field is a **rectangle with hard edges**, not a wash. Measured inset
`59px 0 25px 374px` in a 750 x 468 cell (376 x 384). The top edge is a genuine
one-to-two-row step (chroma 2 -> 61); the bottom edge is hard; the LEFT edge is
invisible because the fill's own horizontal dissolve reaches white about 40 px
before it reaches the clip. Two lobes on ONE vertical axis at 91.3 % x: magenta
#F96AD4 at 34.6 % y (chroma 143), coral #FF8BAD at 72.9 % y (chroma 116).
Vertical hue path 315.6 -> 322.1 -> 336.1 -> 356.3. Horizontal dissolve over
300 px to chroma 3 (#FEFDFB). Build `overflow: hidden` on a rect with the lobes
inside - **never a masked wash**. The card's CTA pill re-uses the two lobe hexes
in the same top-to-bottom order (#F68B85 -> #F26FBF), which is what makes it a
system instead of a palette.

### G4. Hue-locked value ramp on literal black (A)
Base is literal `#000000` (100 % exact in a 44 x 44 sample). Twelve-step
left-edge ladder, every step within 2 levels: #070C22 · #0D1945 · #16286F ·
#2A3F98 · #465EB8 · #7084D4 · #9FACE4 · #C7CFF0 · #E2E6F8 · #F3F4FA · #F8F9FD ·
#FCFCFC. Hue locked 227.0-230.5. Saturation arc as § 1.3. Iso-lum-90 vertex at
44.8 % x / 50.9 % y, equivalent radius 944 px = 126 % of width (rms 4.0 px). The
chroma ridge sweeps diagonally rather than sitting still: x = 0 for y 20-180,
then x = 38 / 92 / 144 / 208 / 253 at y = 200 / 220 / 240 / 260 / 280. The right
edge is *less* saturated than the left at the same row (C73 vs C90) - the source
is on the left and the field admits it.

### G5. Slot-cast columnar beam with occluder shadow (B)
A 7 px white slot emitting a 4.7-degree column **upward only**, truncated by the
panel it sits behind and spilling past its edge. Along the axis: #F8F8F8 core,
the panel lifted L40 -> L102 immediately above, then L86 at 140 px, L81 at
240 px, L77 at 255 px. Below the core it collapses - L76, L60, L43, L29, L24
within 18 px, dipping under ambient. The asymmetry IS the physics: a slot casts
one way. **Fails** as a symmetric glow around the slot.

### G6. Anisotropic shaft rosette (B)
Six to nine unequal wedges from one lit prism on #000000, plus a dot map
brightened by proximity. Along a ray: #D9F6F8 · #ABF0F5 · #BFF2F8 · #349AA7 ·
#266F7A · #1A4D54 · #11343A · #0A1F22 · #041213 · #000000. Radial but **7.2:1
anisotropic at equal radius** - that ratio is the whole effect. Hue locked
186-190 at every intensity. Grain 1.24 % (3.16 L). **Fails** as evenly spaced
rays of equal length, which is a starburst clip-art.

### G7. Emissive lobe with a two-term bloom and a dark pinch (B)
Three lens petals on #000000 meeting at a pinch that stays at ~50 % of lobe
brightness and never clips to white. Cores #FFFCFC / #FEF7FD; per-lobe hues
#676EF7 (h237), #9B5CE7 (h273), #EEA3F7 (h292); tails #0C0E30, #0A020D,
#010103, hue-segmented per axis. Two bloom terms, not one big blur. **Fails**
the instant the pinch blows out - it becomes a formless white blob.

### G8. Rim-caustic annulus (B)
Saturation confined to the outer quarter of a disc: S <= 9 % inside 0.44 R,
51-88 % at 0.78-0.90 R, zero from 1.02 R outward, interior within 2-3 % of
white. Inner ring by angle: 0deg #793CF6 · 45 #9838FB · 90 #CC9CFC · 135 #D840F8
· 180 #ED1BCD · 225 #E922B1 · 270 #F664E6 · 315 #D085F8. Outer ring #F8BADB /
#F595B0 / #FCCBDC. Interior #FDF8FF -> #EBE6FD -> #FFFFFF. Light is conserved:
halo brightness is inversely coupled to scale.

### G9. Defocused-subject field (B)
A real subject photographed and blurred until only flow survives - a
**chroma-only image**. V 96.2-99.5 % everywhere, S 5.7-28.5 %, hue sweeping:
#F9E7E3 (h11/S9) · #ECE7F5 (h260/S6) · #F6D5F2 (h307/S14) · #FDC7D3 (h347/S21) ·
#FCC9CF (h353/S20) · #FEC0B5 (h9/S29) · #FCD9C5 (h22/S22) · #E8D9F8 (h271/S13).
No direction, because it is a field and not a ramp. Grain 1.10 % (2.81 L)
against a 0.00 L page control. This is the cheapest way to get many hues without
a mesh gradient, and the only one in the corpus that survives at large surface
area.

### G10. Filamentary fluid field, one asset at three scales (B)
Ink diffusing in water: filamentary at every zoom level, #F4F8FC to #1B4A8C.
Grain only 0.81 % (2.07 L) because the filaments already fill the mid band
(27.7 % of energy in f4-48). Reads real for the tendril structure and the
topographic "shoreline" contours in a close crop; reads fake the moment it is
scaled down until the filaments become blobs. **Rule: this kind has a minimum
size.**

### G11. Quantised photographic light, one channel clamped (B)
A real aurora quantised to a 17 px square grid with hairline separators and R
clamped under 6: #010000 · #01317B · #02317A · #014187 · #06B6CF · #01B7DB.
Grain 1.03 % (2.64 L) against 0.01 L page. The clamp is what keeps a photograph
out of mud, and the quantisation is what makes it yours rather than stock.

### G12. Self-scrimming field (B)
A saturated single-hue field that darkens toward one corner **by getting more
saturated, not by having black laid over it**. Violet: #6D25CF top-right,
#6E3DC1 centre, #27104A bottom-left, #3E1E6A bottom-right. Amber: #C87912,
#BC7E13, #4E2C0E, #643B0D. Indigo: #574DBE, #5049B8, #272760, #43466E.
Direction 178 degrees with a specular streak crossing it. The dark end sits at
33-40 % of the top luminance with **S rising 12-15 points**. That rise is the
whole trick: `::after { background: linear-gradient(transparent, rgba(0,0,0,.6)) }`
holds S constant and reads muddy; a genuinely deeper, more saturated colour
reads like the same material in shadow.

### G13. Hue-matched contact shadow (B)
Not a bloom - a **darkening**. Measured -46 L below the card, -14 L sideways,
-13 L above, reaching 72 / 71 / 54 frame-px, with the tint derived from the card
(#D2C8AD under amber, #C5C9D5 under indigo). Below is 3.3x the sideways depth at
the same reach. It dies completely well before the page edge.
```css
box-shadow: 0 34px 84px -18px hsl(var(--card-h) 40% 55% / .42),
            0 0 46px            hsl(var(--card-h) 35% 60% / .13);
```

### G14. Amplitude-modulated halftone over a chroma ramp (B)
A screen laid over G2, with coverage modulated by the underlying luminance so
the dots **dissolve rather than fade**: 14.2-14.5 % ink in the saturated zones
collapsing to 6.6 % where the field goes near-white, and zero in the top ~15 %
of the value range. Pitch 5.95 px horizontal / 6.10 vertical, square grid, zero
rotation; dot 2.62-3.08 px. Screening also costs value - the screened slab's V
falls 237 -> 197 across the same ramp where the unscreened slab holds V at 100 %.

### G15. Sheen stripes (B)
Diagonal white stripes at 45 degrees, alpha measured at 6.5 % (sigma 16.68 L)
and 9.9 % (25.15 L), period **7.8 % of container width on one surface and 10.8 %
on another**. Express the period as a percentage, never in px: at a fixed 60 px
it reads as hatching rather than as light, and varying it per surface is what
makes two surfaces read as one device seen at two distances.

### G16. Photographic light-leak plate as a clip fill (A)
A real, grainy, single-hue plate clipped to a path via `<image>`, used where a
brand gradient would go. Median rgb(110, 22, 229), p95 rgb(130, 30, 250), grain
sd 3.4 per channel even in an 82-quality JPEG. **There is no single streak
angle** - structure-tensor orientation measures 6, -25, -45 and +29.5 degrees in
four different patches of the same plate, so quoting one angle makes a rebuild
look wrong. `linear-gradient(135deg, #7017E7, #BD34FE)` is the exact slop
signature this kind replaces. Fallback when no plate exists: drop the field and
use the flat ground.

### Two partial kinds
- **Spectral ceiling haze** (A): a 148-degree hue sweep held to the upper half
  only, peak chroma 27, vertical decay 22 / 20 / 19 / 16 / 14 / 11 / 9 / 5 / 2 /
  0 reaching zero at 51 % of height. Violet-to-mint asymmetry 5.4:1.
- **Multi-hue mesh surviving only as a margin** (B): genuinely chaotic, hue span
  190 degrees, V span 7.2:1 - and legible only because it is confined to a
  9.5 % margin. Above roughly 15 % of surface area it reads fake at any quality.

---

## 3. Construction primitives - what to type

**Value-pinned ramp.** Author in HSV with V locked. Pin one RGB channel and let
the other two carry the axis.

**Clipped light box.** `overflow: hidden` on a rect, lobes inside it, and size
the dissolve so it reaches the ground colour *before* one of the edges - that
edge then reads as open while the others read as cut.

**Self-scrim.** Same hue at S 60-65 / V 43-47 at the light end and S 76-80 /
V 14-18 at the dark end; paint the specular streak on top at
`mix-blend-mode: screen` so it brightens without lifting the black point.

**Halftone over a ramp.**
```css
background-image: radial-gradient(circle at 50% 50%, #000 0 1.4px, transparent 1.5px);
background-size: 6px 6px;               /* measured 5.95 x 6.10 */
clip-path: inset(0 0 0 0);              /* an exact rectangle, never a soft mask */
```
then mask by the underlying luminance so coverage collapses to zero in the top
15 % of the value range.

**Sheen stripes.**
```css
background-image: repeating-linear-gradient(45deg,
  rgba(255,255,255,.085) 0 var(--period), transparent var(--period) calc(var(--period)*2));
mix-blend-mode: soft-light;             /* --period: 7.8% of container width */
```

**Photographic light-leak plate.** A real plate clipped to the path with
`<image>` inside a `clipPath`. Never one angle, never a synthesised streak.

**Per-glyph text shadow** (for type sitting directly on a field): the measured
example drops 40 L between 24 px below a baseline and 30 px above it, but only
10 L between glyph strokes - so the shadow follows the letterforms instead of
boxing them.
```css
text-shadow: 0 14px 34px rgba(2,20,35,.55), 0 2px 6px rgba(2,20,35,.35);
```

---

## 4. Grain and banding

- **Grain floor.** Any authored field carries visible stipple. Measured range
  across the archive 0.81 % to 4.95 % of 255, and it is **stratified**: heavy
  (3.8-5.0 %) on structureless ramps, light (0.8-1.4 %) where the field already
  carries filaments, quantisation cells or a halftone. Structure substitutes for
  grain; nothing else does.
- **Do not audit grain or banding from a JPEG.** Verified: progressive 4:2:0
  with luma AC quantisation steps of 10-15 quantises grain under about four
  levels to zero, so a source carrying 1.5 % grain arrives reading 0.2 sigma.
  Every content-free window on one six-tile sheet returned 0.00-0.37 % - the file
  simply cannot answer the question. Band edges are the same story: one
  "49 px staircase" turned out DCT-grid-locked (edge-phase peak/mean 3.11 against
  1.30 for a genuinely fine ramp). Write **"not measurable from this file"**.
- **Find the window before you measure.** A 44 x 44 window that returns 0.00 on
  clean ground returns 15.05 slid over a headline. Search for the minimum-sigma
  window first; a window containing type or UI inflated grain by 12x to 60x in
  the verification pass.
- **The banding budget you CAN compute before emitting:** `pixel span / total
  channel delta`. Above 12 px per level step, add stops or add grain.

---

## 5. Where a field is allowed to sit

Card scale as well as page scale. The role decides almost everything else, so it
is asked as its own axis (`question-flow.md` AX4b):

| Role | Legal kinds | Notes |
|---|---|---|
| Page ground | G1, G4, G9, G10, G12, G16 | must survive at full viewport; G10 has a minimum size |
| Card ground | G2, G3, G9, G11, G14, G16 | see `layout-language.md` § 5 archetype 9 |
| Bounded panel inside a card | G3, G5, G15 | the clip IS the design; hard edges |
| Text scrim | G12, per-glyph shadow | never a black overlay |
| Border or seam | G15, rim treatments | |
| Payload / light event inside an illustration | G5, G6, G7, G8, G13 | `isometric-and-light.md` Path B |
| None | - | always available, and correct more often than not |

Record the decision in the lock file as a `FIELD:` line - kind (G1-G16) · source
position in percentages of the box · the V function · the chroma function ·
grain % · banding budget in px per channel step.
