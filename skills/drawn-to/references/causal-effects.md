# Effects with a visible cause

Use when heat, wind, gravity, light, liquid or another implied physical source
is part of the chosen page. Identify what causes the effect, where it travels,
what it affects and how it decays. The implementation can be stylized, but that
relationship should be visible without needing a technical explanation.

## A cause is different from an input trigger

In the thermal-type review, the image depicted a hot engine but the headline
changed only during hover. The interaction worked and still missed the scene's
premise. The heat source should establish an ambient field; hover may modulate
it. Conversely, a preview explicitly triggered by a choice should not acquire
ambient motion merely because another page benefits from it.

For a source-driven effect, specify these distinct parts:

- Source location in the composed scene, including the mobile crop.
- Carrier direction, extent and falloff: where the field goes, rather than an
  arbitrary whole-element shake.
- Affected content: what image detail, type, surface or particles respond to
  the same field, and what stays outside it.
- Normal unattended behavior, pointer/touch behavior, pause and reduced motion.
- A readable rest/failure state and who owns animation/resources.

## Heat is a field, not a hover wiggle

For a heat-haze direction, local refraction can affect both nearby image detail
and type. Advection gives the perturbation a travel direction. Bound its extent
and amplitude; preserve the headline's block position and readable character
structure. Do not shake the entire text transform, blur the whole page or add
unrelated orange smoke merely to make the effect obvious.

A cached texture composition and one shader field is one suitable route. SVG,
authored motion or another renderer may fit a different surface. A texture of
a known headline is not arbitrary live-DOM refraction. Preserve semantic DOM
content, font/crop parity and restoration on failure. Rebuild cached content
when its inputs change, rather than uploading it on every frame.

## Verify the cause over time

Capture the normal page with the pointer outside the effect. Inspect multiple
moments, including the source, the carrier and the target. Then inspect hover,
interruption, pause and the clear reduced-motion state. Confirm actual pixel
changes in the intended region and stable output outside it; this supports a
functional check but does not replace visual judgment of the motion.

A screenshot can show a distorted word but cannot prove an ambient field.
Likewise, an animation counter can advance while the visible effect is wrong.
Check the full composition and a close time sequence. On mobile, recompute the
source from the displayed asset crop so the field does not originate in empty
space or continue pointing at the desktop coordinates.

The showcase uses `?still` to pause navigation and `?t=0` or `?poster` for a scene
still. Test the intended mode explicitly; do not confuse a paused slideshow
with reduced motion. The distinction is specific to that showcase, not a URL
convention to impose on another project.

See [RobertJohns](posts/RobertJohns-2090832456081608791.md) for the observed heat
reference. Its recording establishes localized, ongoing distortion; it does
not reveal the original implementation or prove a physical fluid simulation.
