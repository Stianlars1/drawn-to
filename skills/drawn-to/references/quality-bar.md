# Quality bar - judge the requested design in the render

Use this document for visual review and for verification after implementation.
For review-only requests, report findings without changing UI or lock files.
For authorized fixes, iterate on the concrete issues and recheck the affected
states. An approved direction is the starting point, not another interview.

## 1. What counts as a defect

Separate three things in the report:

- **Functional/content failure:** unreadable essential text, obscured action,
  false product claim, missing state, keyboard failure or broken layout.
- **Departure from the approved direction:** a different composition, type role,
  material, density or motion budget. Cite the lock and show the discrepancy.
- **Taste suggestion:** a possible improvement, labeled as judgment rather than
  proof that a source or output is generated. A preference is not a failure of
  physics or accessibility.

Check the actual scope. A footer is not a hero poster; a form is not a feature
illustration; a repeated collection is not a set of unrelated claims. The
scoped C1-C12 defaults live in `style-families.md`.

**Content and hierarchy**

- Is the main message understandable before decorative detail? Does the primary
  action have an obvious place in the reading order?
- Check headline breaks and awkward orphan words at each target width. Short
  headlines can be powerful, but six words is not a universal ceiling.
- Remove redundant labels, repeated unsupported triads and proof claims that
  have no source. Real comparison data and navigation are not subject to an
  arbitrary zero-or-three rule.
- Check all body text, legal copy, prices, units and demo values. Arithmetic and
  category labels must agree. Fictional demo data is clearly distinguished from
  claims about customers or results.
- Preserve the owner's hyphen preference. Internal family/axis/question codes
  and reference slugs stay out of product copy and accessibility labels.
  Technical names are allowed when the product actually teaches those names.

**Surfaces and composition**

- Verify essential content contrast and focus indicators on the actual ground.
  Opacity is not a contrast measurement. Decorative low-contrast structure may
  recede; essential information may not depend on barely visible ink.
- Check content overflow, accidental clipping, overlapping layers, inconsistent
  alignment and spacing, and nested corners that visibly fight their container.
- A physical object may use depth, shadow and blur; a flat control needs a
  readable boundary. Judge the chosen material, not a forbidden hex list.
- A deliberate split hero or bounded artwork is valid. Reject a box when it
  weakens this composition or violates its lock, not merely because it is a box.
- Animated imagery must not cover words, controls or essential evidence at any
  phase. Inspect extremes, not just the best poster frame.
- Persistent controls in a carousel or cycling presentation retain a stable
  position unless their movement conveys an explicit state change.

## Reference craft calibration

A clean layout and working controls are only part of the result. For a
reference-led task, identify the qualities that made the selected work strong:
spatial hierarchy, image quality, model detail, reflection structure, light,
texture, typography and motion. Compare those qualities directly in the render.
Matching the broad family, palette or aperture shape is not enough if the
reference's distinctive depth and finish have disappeared.

Distinguish **functional pass**, **coherent art direction** and **reference-level
finish** in the review. If the result is merely competent while the reference is
richly constructed, state the specific gap and iterate on it. Do not hide that
gap behind compliance with the brief, and do not invent one when the work
already holds up. Original composition is welcome; lower craft is not the price
of originality. Compare a whole screen, actual-size detail and meaningful motion
phases. See `three-dimensional-craft.md` for model/material/light diagnostics.

## 2. Budgets follow the kind of surface

Set the budgets in the lock, based on product content and target viewports.
These are useful starting points, not universal pass/fail thresholds:

| Surface | What to protect | What may vary |
|---|---|---|
| Short hero/poster | One primary reading path, concise promise, clear next action | Type scale, number of lines, full field/bounded media/split/no image |
| Pricing/comparison | Comparable plan rows, transparent units, primary choices and details | Three or more plan actions, longer copy, proof counts, emphasis material |
| Editorial page/footer | Readable type, coherent art and a usable navigation ending | Serif body, static illustration, long page, landscape or image-first composition |
| Feature set | Distinct meaningful claims inside a coherent set | Object size, arrangement and even repeated primitives when their role differs |
| Onboarding/form | Labels, validation, focus, reachable action and continuity | Number of steps, stable repeated preview, responsive ordering |
| Collection/portfolio | Recognizable items, reading anchors and usable browsing | Repeated crops, varied image color, animation within a protected envelope |
| Data/tool UI | Scanability, exact values, stable controls and relevant states | Density, multiple semantic hues, short immediate transitions or no animation |

For long prose, a roughly 45-75 character measure is a useful starting point;
compact labels, mobile text, captions and forms have different needs. Do not
remove necessary content merely to fit a poster recipe.

At the fold, preserve the message and next action where the brief calls for a
single-screen first impression. A clearly continuing product shelf may extend
below the viewport. Scrolling is legitimate on a long page; do not force every
section into 100svh. Check the crop against its meaning and responsive intent.

## 3. Judge the illustration's role

- **Feature explanation:** does the image help explain this actual capability?
  Use the claim-to-scene method and read-back test in `illustration-ideation.md`.
  Accurate product fragments and purposeful diagrams beat interchangeable filler.
- **Brand/character:** does the artwork create the approved identity, with a
  clear silhouette, coherent material, consistent lighting and a deliberate
  relationship to the layout? A mascot does not need to impersonate a chart.
- **Editorial landscape:** judge the composition of terrain and negative space,
  ink/detail hierarchy, crop and relationship to typography. See
  AdityaSur11-2096160 in `september-expansion.md`.
- **Photography/collection:** judge selection, crop, sequence, coherent treatment
  and breathing room for text. Repeated apertures are useful organization.
- **Isometric scene:** select the actual register in `isometric-and-light.md`
  first. Verify its projection, line hierarchy, connected geometry, depth model
  and transform rules. Paper-white rules do not govern soft-shaded material.
- **Field/material:** inspect silhouette, light/value/chroma behavior, texture
  and readability. Use matching diagnostics in `gradient-fields.md`; symmetry,
  a smooth finish or a monotonic falloff is not inherently a defect.

Look at the silhouette from a distance and the relevant detail close up.
Do not impose three layers, exactly one black face or a technical hairline on
an artwork whose role does not call for them. Fix a weak illustration or agree
an appropriate simpler treatment; do not silently delete requested artwork.

## 3b. Sets: distinction or continuity

The lock states whether the set is independent claims, a sequence, a shared
world, a collection or an identity system. Check the relevant relationship:

- Independent features: each image should make its own claim. Swapping labels
  should make a meaningful mismatch; if not, revisit the explanation.
- A sequence: preserve the object and its evolving state. Reordering should
  break the story. Do not replace repeated structure with unrelated devices.
- A shared world: check common coordinates, material and state meaning across
  the views. Synchronization may be the point.
- A collection: repeat a coherent frame while the contents remain distinct.
- Identity: retain the recognizable atom across small and large applications;
  test actual delivered sizes, not only the large showcase.

One register is valid. If the direction deliberately combines registers, check
that explicit contract. Do not require an unrelated device or a different stage
position in every cell. Repetition is a problem when it removes information,
not when it supplies continuity.

## 3c. First-screen checks

Choose the relationship before polishing: full field, bounded field, split
copy/evidence, image-first, product shelf or type-led. Name the reading zone and
where imagery can travel/crop. Compare several motion phases and both desktop
heights; a bright frame behind the heading can break a good poster.

For animated fields use `render-tiers.md`: select a renderer for actual behavior,
keep a composed poster, combine stop conditions, and clean up resources. Text
and controls remain usable DOM elements. A no-JavaScript check applies where the
chosen rendering strategy promises a static fallback; do not claim that a
complex application is fully usable without JavaScript merely because its hero is.

## 4. Visual verification

1. Read the lock and identify the required surfaces, states, modes and sizes.
2. Render in a real browser. For responsive web work inspect 1440x900,
   1280x720 and 390x844, plus any specifically requested viewport. Capture the
   actual viewport, DPR and state; a thumbnail is supplementary evidence.
3. Check content, hierarchy, contrast, crop and alignment from sections 1-3.
   Compare quiet decorative layers at 1x and 25% scale; report what disappears.
   Essential text and controls are assessed with the applicable accessibility
   requirements, not decorative luminance deltas.
4. Inspect relevant rest, hover, focus-visible, pressed, loading, error and
   success states. Verify keyboard operation and focus return for interactive
   surfaces. Test reduced motion and repeat/interrupt behavior where motion exists.
5. Open the cited reference frames beside the output. Compare the intended
   density, material, line quality, crop and reading order. If media is missing,
   say text-only comparison; do not imply visual parity.
6. For sets, run the relationship-specific test in section 3b. Check them
   together and at actual cell size. For moving materials, include extreme frames.
7. Run the scoped `polish-moments.md` pass. Static can be the correct polished
   result. Record concrete evidence, outstanding issues and limitations using
   the QA fields in `lock-file.md`; they start pending, never pre-checked.
8. If implementation/fixes are authorized, fix real issues and recheck affected
   views. For review-only, return prioritized findings instead of editing.

Internal-code checks inspect rendered visible text and alt/aria/title values,
excluding source comments. Do not blindly flag a legitimate model or domain term
that resembles a ledger code; inspect its context.

## 5. Honest handoff

Do not mark a view verified without seeing it. Distinguish a static capture,
a working interaction, source-code inspection and an inferred implementation.
The owner's screenshot establishes what their viewport shows; compare the
conditions when it differs from yours. A missing capture or inaccessible tool
is an explicit limitation, never a filled-in checkmark.

## Reusing and reviewing a showcase direction

Use [showcase-prompts.md](showcase-prompts.md) for the exact scene contract.
A copyable prompt must preserve the scene's particular composition, material
and effect, with a truthful asset/implementation trail. Test copying and manual
fallback on every registered scene. Review the description against the actual
source and render; a valid URL alone does not establish visual fidelity.

For responsive polish, inspect the children inside clipped stages as well as
document scroll width. Count meaningful cards and diagrams before and after
reflow. A hidden third card, missing diagram or offscreen selected row is a
regression even if the body has no overflow. Preserve dated archive labels on
mobile, and distinguish example terminal/data content from captured results.
