# Gradient fields - light as a buildable device, at card scale and page scale

The catalog describes several ways a field can carry a composition: a simple
ramp, structured light, a processed photograph, an ink slab or a quiet wash.
Choose the material for the brief. A smooth gradient is valid when intentional;
grain and dither are treatments, not universal quality gates.

Companion files: `isometric-and-light.md` Path B (light around objects),
`color-type.md` (palette roles), `render-tiers.md` (drawing technology),
`quality-bar.md` (visual QA) and `measuring.md` (measurement definitions).

**Provenance.** The A/B/C labels below preserve the source analyses' verification
history; they do not remove capture limitations. CSS px require independently
known scale. Unsuffixed px are legacy capture-space readings unless the cited
post establishes CSS scale. Hexes describe sampled pixels, not recovered source
tokens. Texture sigmas below describe the decoded file, not original grain.
Legacy `L`/brightness readings have no preserved common formula; do not use them
as relative luminance or for contrast. See `measuring.md` before reusing a value.

## 0. Authoring - name the channel behavior

Describe what the field does across the box, then choose stops, masks, an image
or a shader that achieves it. The following are useful observed patterns, not an
exhaustive classification. In this table V and S are HSV quantities on encoded
sRGB; C_rgb is the 0-255 channel range. None is relative luminance Y.

| Archetype | Value/channel behavior | Chroma behavior | Recorded example |
|---|---|---|---|
| **HSV-value-pinned chroma ramp** | V 99.8-100.0%; R 254-255 | S 6.4 -> 91.7%, hue 311.6 -> 346.9 | basit_designs-2089995 hero slab (B) |
| **Hue-locked tonal ramp** | dark to near-white; legacy brightness span 218 levels | hue within 3.5 deg; S 65.9 -> 46.0 -> 0 | LeadBurst tile (A) |
| **Near-constant-V hue field** | V 96.2-99.5% | S 5.7-28.5%, hue varies | devxnuj-2090 (B) |
| **Channel-limited photograph** | photographic tonal structure | one sampled RGB channel <= 8 | kevserctk-2090 (B) |

- Pinning V or an RGB channel can produce an ink-like saturated ramp. It does
  not keep brightness constant: `#FFEEFC -> #FE2454` has V approximately 100%
  at both ends, but relative sRGB luminance Y approximately 0.894 -> 0.230.
- Hue, saturation and tonal shape can be varied independently as design choices.
  A constant hue or saturation is not evidence that the field was made with an
  overlay; several different constructions can produce the same pixels.
- Check contrast on the final composite using relative luminance, not HSV V or
  an undocumented legacy brightness statistic.

---

## 1. Composition diagnostics - apply only to the matching field

These checks help describe an observed field or compare a reconstruction with a
chosen reference. They cannot prove physical lighting, author intent or quality.

**1. Trough profile.** For a multi-lobe field, sample clean columns and locate
their brightness minima, using one explicitly named statistic throughout.
The Metricly tile's legacy profile fits
`y = -0.000553x^2 + 0.4156x + 387.44` (rms 3.13 capture px over 92 samples).
Its bottom-edge readings were 206.2 / 197.1 / 184.2 / 184.7 / 183.2 / 195.3 /
206.2 at x = 5 / 125 / 245 / 365 / 485 / 605 / 725 (A). Two lower-corner
sources are a plausible reconstruction, not a uniquely recovered light rig.
A monotonic ramp is valid, including falloff from an offscreen source; G2 and
directionless photographic fields do not need a trough.

**2. Source placement.** Inspect a named equal-value contour when the field has
one. Earlier samples put two vertices at 44.8% and 50.11% of width (A).
That difference describes asymmetry, not authorship. Centre, edge and offscreen
sources are all available; choose according to balance, subject and text placement.
Do not reject a field merely because its vertex is within 3 percentage points of centre.

**3. Saturation profile.** Record HSV S separately from the chosen brightness
statistic. The LeadBurst samples give S 65.9 / 46.0 / 0 at legacy brightness
8.0 / 51.4 / 98.8. This sequence decreases; it does not demonstrate a mid-tone
peak. Check the actual profile rather than requiring a particular arc.

**4. Hue stability.** The historical JPEG sampling convention is `C_rgb >= 12`.
Below it, hue excursions are unreliable; above it, still check compression and
sample placement. The original verification retracted apparent multi-stop hue
journeys after gating. State the gate, and do not translate it into an OKLCH threshold.

**FFT is descriptive, not a quality score.** The earlier mid-band test ranked
the weakest field at 55.5% and the preferred ramp at 8.1%; content and JPEG DCT
residue altered the result. Spectral energy can describe frequency structure
with controlled input and a stated window, not whether a field reads as real.

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
#FE2454. This saturated ramp can read as ink on a lit surface. Its near-constant
HSV V does not prevent its relative luminance from changing substantially.
Allow V to drift when the intended tonal shape calls for it.

### G3. Clipped light box (A)
This recipe uses a **rectangle with hard edges**, rather than a wash. Measured inset
`59px 0 25px 374px` in a 750 x 468 cell (376 x 384). The top edge is a genuine
one-to-two-row step (chroma 2 -> 61); the bottom edge is hard; the LEFT edge is
invisible because the fill's own horizontal dissolve reaches white about 40 px
before it reaches the clip. Two lobes on ONE vertical axis at 91.3 % x: magenta
#F96AD4 at 34.6 % y (chroma 143), coral #FF8BAD at 72.9 % y (chroma 116).
Vertical hue path 315.6 -> 322.1 -> 336.1 -> 356.3. Horizontal dissolve over
300 px to chroma 3 (#FEFDFB). Build `overflow: hidden` on a rect with the lobes
inside to preserve this recipe's hard edges. The card's CTA pill uses a related
coral-to-magenta palette (#F68B85 -> #F26FBF): different sampled hexes and the
reverse order from the field, linked by hue rather than an identical gradient.

### G4. Hue-locked value ramp on literal black (A)
Base is literal `#000000` (100 % exact in a 44 x 44 sample). Twelve-step
left-edge ladder, every step within 2 levels: #070C22 · #0D1945 · #16286F ·
#2A3F98 · #465EB8 · #7084D4 · #9FACE4 · #C7CFF0 · #E2E6F8 · #F3F4FA · #F8F9FD ·
#FCFCFC. Hue locked 227.0-230.5. HSV saturation samples as § 1.3. Legacy equal-brightness-90 contour vertex at
44.8 % x / 50.9 % y, equivalent radius 944 px = 126 % of width (rms 4.0 px). The
chroma ridge sweeps diagonally rather than sitting still: x = 0 for y 20-180,
then x = 38 / 92 / 144 / 208 / 253 at y = 200 / 220 / 240 / 260 / 280. The right
edge has less RGB-range chroma than the left at the same row (C_rgb 73 vs 90).
A left-side source is one reconstruction compatible with that pattern.

### G5. Slot-cast columnar beam with occluder shadow (B)
A 7 px white slot emitting a 4.7-degree column **upward only**, truncated by the
panel it sits behind and spilling past its edge. Along the axis: #F8F8F8 core,
the panel lifted L40 -> L102 immediately above, then L86 at 140 px, L81 at
240 px, L77 at 255 px. Below the core it collapses - L76, L60, L43, L29, L24
within 18 px, dipping under the nearby ground reading. This recipe models a
slot emitting upward with an occluder below; a symmetric glow changes that story.

### G6. Anisotropic shaft rosette (B)
Six to nine unequal wedges from one lit prism on #000000, plus a dot map
brightened by proximity. Along a ray: #D9F6F8 · #ABF0F5 · #BFF2F8 · #349AA7 ·
#266F7A · #1A4D54 · #11343A · #0A1F22 · #041213 · #000000. Radial but **7.2:1
anisotropic at equal radius** - that ratio is the whole effect. Hue locked
186-190 on chromatic samples; hue is undefined at the black endpoint. Decoded
texture sigma 3.16 legacy levels (1.24% of 255); source grain unknown. **Fails** as evenly spaced
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
#F595B0 / #FCCBDC. Interior #FDF8FF -> #EBE6FD -> #FFFFFF. The recorded halo becomes dimmer as it expands; an inverse coupling can
recreate this appearance, but the capture does not prove energy conservation.

### G9. Defocused-subject field (B)
A real subject photographed and blurred until only flow survives - a
**near-constant-HSV-V image**, not an isoluminant one. V 96.2-99.5 % everywhere, S 5.7-28.5 %, hue sweeping:
#F9E7E3 (h11/S9) · #ECE7F5 (h260/S6) · #F6D5F2 (h307/S14) · #FDC7D3 (h347/S21) ·
#FCC9CF (h353/S20) · #FEC0B5 (h9/S29) · #FCD9C5 (h22/S22) · #E8D9F8 (h271/S13).
No single ramp direction is identified in the source analysis. Decoded texture
sigma is 2.81 legacy levels (1.10% of 255), against 0.00 on the page control;
source grain is unknown. A processed image can supply this multihue field at
large scale without a live mesh renderer.

### G10. Filamentary fluid field, one asset at three scales (B)
Ink diffusing in water: filamentary at every zoom level, #F4F8FC to #1B4A8C.
Decoded texture sigma 2.07 legacy levels (0.81% of 255); source grain
unknown. The recorded spectrum places 27.7% of energy in f4-48, which describes
this sample rather than explaining how much grain the source needed. Reads real for the tendril structure and the
topographic "shoreline" contours in a close crop; reads fake the moment it is
scaled down until the filaments become blobs. **Rule: this kind has a minimum
size.**

### G11. Quantised photographic light, one channel clamped (B)
A real aurora quantised to a 17 px square grid with hairline separators and R
clamped under 6: #010000 · #01317B · #02317A · #014187 · #06B6CF · #01B7DB.
Decoded texture sigma 2.64 legacy levels (1.03% of 255), against 0.01 on
the page; source grain unknown. A channel clamp is a possible reconstruction
of these sampled colors, not proof that the original photograph used one.

### G12. Self-scrimming field (B)
A saturated single-hue field that gets darker and more saturated toward one
corner. These are two observed changes, not a recovered compositing method. Violet: #6D25CF top-right,
#6E3DC1 centre, #27104A bottom-left, #3E1E6A bottom-right. Amber: #C87912,
#BC7E13, #4E2C0E, #643B0D. Indigo: #574DBE, #5049B8, #272760, #43466E.
Direction 178 degrees with a specular streak crossing it. The dark end sits at
33-40% of the top legacy brightness reading with **HSV S rising 12-15 points**.
One reconstruction authors the darker, more saturated colors directly. A uniform
black overlay preserves HSV S when it uniformly scales encoded RGB channels;
other color spaces and compositing paths differ. Both overlays and authored
shadow colors are valid if the final composite serves the material and keeps
text readable.

### G13. Hue-matched contact shadow (B)
The insporadesign-2087 correction is local shadow, not page-wide bloom.
The recorded page sample at (20,20) is #F7F6F2 on all three slides. It does not
support the old claim of an 80-120px blurred copy re-tinting the entire page.
Near the card, recorded legacy brightness differences are -46 below, -14 sideways,
-13 above, reaching 72 / 71 / 54 frame-px, with the tint related to the card
(#D2C8AD under amber, #C5C9D5 under indigo). Below is 3.3x the sideways depth at
the same reach; the sampled page edge remains unchanged. This describes the
decoded capture, not the original CSS. The following is a **proposed CSS
reconstruction**; tune its reach and color at the target scale. Physical dark
objects can use an analogous contact shadow when the locked material calls for it.
```css
box-shadow: 0 34px 84px -18px hsl(var(--card-h) 40% 55% / .42),
            0 0 46px            hsl(var(--card-h) 35% 60% / .13);
```

### G14. Amplitude-modulated halftone over a chroma ramp (B)
A screen laid over G2, with coverage correlated with the underlying sampled tones so
the dots **dissolve rather than fade**: 14.2-14.5 % ink in the saturated zones
collapsing to 6.6 % where the field goes near-white, and zero in the top ~15 %
of the value range. Pitch 5.95 px horizontal / 6.10 vertical, square grid, zero
rotation; dot 2.62-3.08 px. Screening also costs value - the screened slab's encoded maximum channel
falls 237 -> 197 (HSV V approximately 92.9% -> 77.3%) across the ramp where
the unscreened slab holds HSV V near 100%.

### G15. Sheen stripes (B)
Diagonal white stripes at 45 degrees, decoded texture sigmas 16.68 and 25.15 legacy levels
(6.5% and 9.9% of 255, not recovered overlay alphas), period **7.8 % of container width on one surface and 10.8 %
on another**. These ratios can guide a responsive reconstruction; distinguish a stripe width
from the full light-plus-gap period. At another size, tune deliberately: at a fixed 60 px
it reads as hatching rather than as light, and varying it per surface is what
makes two surfaces read as one device seen at two distances.

### G16. Photographic light-leak plate as a clip fill (A)
A real, grainy, single-hue plate clipped to a path via `<image>`, used where a
brand gradient would go. Recorded decoded median rgb(110,22,229), p95 rgb(130,30,250), and local
per-channel texture sd 3.4 in an 82-quality JPEG. This describes that compressed
file, not the original plate's grain amplitude. **There is no single streak
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
  9.5 % margin. The source example uses it as a margin; larger uses need their own composition check.

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
For the recorded dissolving-dot treatment, vary dot radius or threshold a
mask by a named tonal signal; fading a fixed-dot layer changes opacity, not ink
coverage. The static example above is only the base screen.

**Sheen stripes.**
```css
background-image: repeating-linear-gradient(45deg,
  rgba(255,255,255,.085) 0 calc(var(--period) / 2),
  transparent calc(var(--period) / 2) var(--period));
mix-blend-mode: soft-light;             /* proposed alpha; --period is the FULL cycle */
```

**Photographic light-leak plate.** Define the clipping geometry inside
`<clipPath>` and apply it to the image; the image is not a clip-path child:
```html
<svg viewBox="0 0 400 240" role="img" aria-label="Abstract light field">
  <defs><clipPath id="field-clip"><rect width="400" height="240" rx="16"/></clipPath></defs>
  <image href="/light-plate.avif" width="400" height="240"
         preserveAspectRatio="xMidYMid slice" clip-path="url(#field-clip)"/>
</svg>
```
Use a unique clip id when several SVG instances share a document.

**Per-glyph text shadow** (for type sitting directly on a field): the recorded
example differs by 40 legacy brightness levels between samples 24 px below and
30 px above a baseline, but only 10 between strokes. A glyph-following shadow
is a plausible reconstruction, not a uniquely recovered filter. Proposed CSS:
```css
text-shadow: 0 14px 34px rgba(2,20,35,.55), 0 2px 6px rgba(2,20,35,.35);
```

---

## 4. Grain and banding

- **Choose the finish.** Smooth materials, visible stipple, halftone and film
  texture are all legitimate. Preserve the locked material; do not add noise
  solely to pass a universal grain percentage. Verify the final export at 1x.
- **Separate the measurements.** Historical decoded sigmas range from 0.81% to
  4.95% of 255, with patch, image structure and compression affecting the result.
  These are neither grain-opacity settings nor verified source amplitudes.
  Compare equivalent patches; follow `measuring.md` for source limitations.
- **JPEG limits.** Inspect decoded banding/texture as output artifacts, but do
  not use them to recover original grain or banding. The earlier pass found DCT
  structure masquerading as a gradient staircase and fine noise attenuated by
  quantization. State when source grain/banding is not measurable from the file.
- **Choose the patch first.** Exclude glyphs, UI and edges, account for a broad
  tonal slope, and state the window. A minimum-sigma search may locate flat
  candidates; the minimum is not an unbiased estimate of the material's texture.
- **Banding heuristic.** For a monotonic single-channel 8-bit ramp,
  `pixel span / abs(channel delta)` approximates spacing between quantized
  levels; a zero delta has no ramp. It is not a visibility threshold, and other
  channels, interpolation space and encoding matter. Adding intermediate stops
  between the same endpoints does not create more 8-bit levels. If banding is
  visible, adjust the tonal shape, use an appropriate higher-precision pipeline,
  or add controlled dither before final quantization; recheck the encoded output.

---

## 5. Where a field is allowed to sit

Card scale as well as page scale. The role decides almost everything else, so it
is asked as its own axis (`question-flow.md` AX4b):

| Role | Legal kinds | Notes |
|---|---|---|
| Page ground | G1, G4, G9, G10, G12, G16 | must survive at full viewport; G10 has a minimum size |
| Card ground | G2, G3, G9, G11, G14, G16 | see `layout-language.md` § 5 archetype 9 |
| Bounded panel inside a card | G3, G5, G15 | the clip IS the design; hard edges |
| Text scrim | G12, per-glyph shadow, overlay | choose the light/dark treatment by contrast on the final composite |
| Border or seam | G15, rim treatments | |
| Payload / light event inside an illustration | G5, G6, G7, G8, G13 | `isometric-and-light.md` Path B |
| None | - | always available, and correct more often than not |

Record the decision in the lock file as a `FIELD:` line - kind (G1-G16) · source
position in percentages of the box · the named color quantities/functions ·
finish (smooth / grain / other) and its units · output banding observations.
