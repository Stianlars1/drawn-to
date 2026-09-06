# Measuring - how to read a value off a capture without inventing it

A capture gives evidence about its decoded pixels and recorded frames. Inferring
the original CSS, source image, timing or construction requires additional
evidence. Keep the observation, inference and chosen implementation value apart.

## Provenance - record verification and source limits separately

| Tier | Meaning | How to write it |
|---|---|---|
| **A** | Independently re-measured | Value + source, units, method and relevant uncertainty. A second measurement cannot recover information absent from the source. |
| **B** | One measurement with a stated method | Value + source and limitations. A similar reference can support the proposed mechanism, not prove the original implementation. |
| **C** | Scale or another necessary source property is unresolved | Capture-px, ratios, percentages and recorded frame counts remain usable. Do not label capture-px as CSS px or derive source seconds from an unknown frame cadence. |
| **D** | Refuted | Remove from active guidance; retain in source history only with the correction. |

For every measured value, identify the file and frame/crop. If CSS scale is known,
state how it was obtained. If the value is an implementation choice, label it
**proposed** rather than assigning it a measurement tier. Old analyses without
this information remain observations with unresolved provenance, regardless of
their tier label.

## Quantities - name the color space and units

- **Encoded RGB:** the decoded channel values; this library's historical hexes
  and 0-255 channel readings assume sRGB unless the source profile says otherwise.
- **HSV V:** `max(R,G,B) / 255`, often reported as a percentage. It is not
  luminance or perceived brightness. HSV S is `(max-min)/max` (zero at black).
- **RGB-range chroma:** `C_rgb = max(R,G,B) - min(R,G,B)`, in 0-255 encoded
  channel units. Historical `C >= 12` hue checks refer to this quantity, not
  OKLCH C or CIELAB chroma.
- **Relative sRGB luminance Y:** linearize each normalized sRGB channel with
  `c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4`, then take
  `0.2126 R + 0.7152 G + 0.0722 B`. Y runs 0-1 and is the quantity used in
  the [WCAG relative-luminance definition](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance).
- **Legacy L / luma / brightness readings:** several older posts use these
  names for a 0-255 statistic without preserving its formula. Retain them as
  **legacy encoded-brightness readings**, not Y or perceptual lightness. Do not
  convert them into contrast ratios or a source-light claim without remeasurement.
- **Texture sigma:** name the measured channel/statistic, patch, detrending and
  decoded file. A sigma percentage means `100 * sigma / 255`; it is not an
  overlay opacity, noise amplitude, or the original image's grain setting.

For example, `#FFEEFC -> #FE2454` holds HSV V near 100% while relative luminance
falls from approximately 0.894 to 0.230. A V-pinned ramp is not an isoluminant ramp.

## Six measurement checks

### 1. Establish scale before quoting CSS px

Use capture metadata plus known viewport/DPR/zoom/resizing history, a computed
DOM measurement, or an independently known dimension in the same image plane.
State uncertainty and check a second independent dimension when possible.

A round-looking container, guessed icon size or familiar gutter is a scale
**hypothesis**, not an invariant. For example, a board's ratios may fit a proposed
1152px container with a 16px gap closely; without a known scale that remains a
reasonable reconstruction, not proof of its original CSS. Responsive grid tracks,
percentages, transforms and fluid type legitimately produce fractional values.
Report measured fractions with sensible precision; round proposed tokens separately.

### 2. Identify what the capture records

A screenshot, source-video frame and recording of a video player have different
limits. A player's displayed duration does not establish the source frame cadence:
playback can pause, change speed or repeat/drop frames. Record motion in captured
frames unless timestamps and playback mapping justify source seconds. Even a known
recording fps establishes recording time, not necessarily the source animation's time.

### 3. Gate hue readings near neutral

For this JPEG corpus, `C_rgb >= 12` is a conservative sampling convention that
removed unstable low-chroma hue excursions. It is not a universal noise threshold:
compression, resampling, pixel profile and local content still matter above it.
State the gate and inspect several clean samples. Below it, prefer channel values
and omit the hue path. A hue angle near neutral cannot establish a lighting direction.

### 4. Separate decoded texture from source grain

Choose content-free, comparable patches of the intended material before measuring.
Avoid type, UI, edges and large tonal slopes; state the patch and any detrending.
A low-variance search can help locate candidate flat patches, but selecting the
minimum sigma as the material's grain estimate biases the result downward.

A recorded 44x44 patch changed from sigma 0.00 on flat ground to 15.05 over a
headline. That is content contamination, not grain. JPEG quantization can remove
fine grain and introduce blocks/ringing, so decoded-file sigma cannot recover
the source's grain amplitude. The earlier pass observed strong attenuation with
luma AC quantization steps of 10-15; this is evidence about those files, not a
universal JPEG cutoff.

Decoded texture and banding can still be reported as artifacts of **that file**.
Do not infer source-grain settings or original banding from them. For source
questions, inspect a known lossless original or an uncompressed render, otherwise
write **"source grain/banding not measurable from this file"**.

### 5. Recover text ink only when the stroke supports it

Sample the interior of a sufficiently thick stroke, away from antialiased edges:
the mean of the whole glyph also includes background. Use the lighter interior
for light text, the darker interior for dark text. A subpixel stroke with no solid
interior does not uniquely reveal its authored ink or opacity. Integrating its
profile can describe effective coverage only with known background, scale and
compositing assumptions; otherwise report the visible pixels instead of a source hex.

### 6. Read gradients in two dimensions

Sample both axes in clean regions, excluding labels, and state each channel delta.
The original pass misclassified two vertical CTA gradients after sampling through
their labels. A non-monotonic profile can suggest multiple lobes; a monotonic one
does not prove a flat overlay. See `gradient-fields.md` for archetype-specific
composition diagnostics, not universal tests of whether light is real.

## Read-back before publishing a value

1. Is this a measurement, an inference, or a proposed build value?
2. Which source, frame/crop, method and tier support it?
3. Is scale known independently? Are these capture-px or CSS px?
4. Which color quantity and units are used? Is hue stable enough to report?
5. Does a texture statement describe the decoded file or the original source?
6. Do timing claims use recorded frames, recording time, or verified source time?
7. Does the precision reflect uncertainty, including legitimate fractional geometry?

Referenced by `SKILL.md` and the reference-comparison stage in `quality-bar.md`.
