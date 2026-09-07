# Material, effect and URL refinement - 2026-09-07

The owner found plastic-looking materials, heat that worked only on hover and
a weak miniature hero. This update revisits those five scenes and the skill's
criteria for accepting their output. The catalog remains at 70 scenes and 104
reference entries.

## What changes

- **material-study:** tighter edge profiles, a more informative studio
  environment, quieter speckled fired ceramic, directional satin metal and
  glass that refracts a real typographic backing plane. The original GLB is
  re-exported from the same procedural geometry.
- **glass-identity:** a clear optical finish and an actual behind-object
  landmark make transmission and local refraction visible. The small vector
  identity and large outline remain related.
- **physical-schedule:** manufactured bar profiles, controlled grazing light,
  finer finish and status-light sockets. The mobile overview frames all task
  bars; Inspect the finish opens a deliberate closer crop. Both poses have
  matching desktop/mobile fallback posters.
- **thermal-type:** an advected field starts at the displayed hot aperture and
  affects image detail and the headline without requiring hover. A cached
  known composition is sampled by one WebGL pass; semantic DOM text is retained.
  Pause/resume, clear reduced motion, forced fallback and context loss are
  supported. This is a procedural optical effect, not a fluid simulation or
  arbitrary live-DOM refraction.
- **menu-preview:** a composed original paper/architectural miniature replaces
  the loose stacked-shape placeholder. Menu preview and keyboard selection keep
  their existing behavior. Artwork is scoped separately from icon CSS.

The skill adds `material-evidence.md` and `causal-effects.md`, linked from the
entrypoint and craft review. They turn general warnings into observable checks:
transmitted landmarks, reflection gradients, filtered texture scale, surface
interfaces and source-to-target motion. Own before/after examples are included.
The five exact scene prompts describe the revised real implementation.

## Stable addresses

`site/js/scene-routes.js` maps the 30 original, case-sensitive letter IDs to
stable descriptive addresses. The renderer retains internal IDs; display order
remains a separate curated list. For example, `#a` resolves to `#narrow-dark`,
while `#A` resolves to `#example-run`. Existing descriptive IDs are unchanged.

Both hash links and `?v=` work. If both are supplied with conflicting values,
the hash wins and the query is normalized to it. The prompt generator uses the
same mapping. Manual navigation creates useful browser history; autoplay
replaces the current entry rather than adding one every five seconds.

## Evidence and limits

Before and after output was captured in Chrome 152 at 1440x900, 1280x720 and
390x844. Thirty final captures cover the five scenes, material choices, plan
inspection and menu previews. Separate browser recordings show ambient heat
on desktop/mobile with the pointer outside the text, followed by pause.

The original material screenshots, the glass identity sequence, the schedule
reference still and heat time samples were reviewed. Material identification
from an image remains a visual judgment; the result is an original study,
not a scientific material classification or a claim of identical source finish.
The ceramic signal is deliberately restrained. The clear-glass direction uses
visible typographic refraction rather than relying on a mint surface alone.

The complete route/prompt checks pass, alongside focused checks for legacy URL
compatibility, browser history, pixel changes in heat source/headline regions,
stable outside pixels, texture-upload stability, context loss, reduced motion,
menu behavior and retained inspection fallback. See the checked-in reports in
`docs/verification/`.

Local and production state are verified separately in the delivery evidence.
Browser viewport testing does not establish Safari, Firefox or physical-phone
parity. Recorded heat output advanced 195 frames over 6.5 seconds with no new
texture upload in that interval on this Mac; this is an observation, not a
cross-device CPU or FPS guarantee.

## Reproduce the focused checks

Use the same Playwright module and Chrome executable environment variables as
the existing showcase scripts; run against a chosen local server URL:

```sh
node scripts/verify-refinement.mjs http://127.0.0.1:8761/
node scripts/verify-showcase.mjs http://127.0.0.1:8761/
node scripts/verify-prompts.mjs http://127.0.0.1:8761/
node scripts/verify-motion-expansion.mjs http://127.0.0.1:8761/
node scripts/export-showcase-model.mjs
node scripts/export-refined-posters.mjs http://127.0.0.1:8761/
```

Exporters mutate generated assets; finish them before running fallback checks.
Validate a clean Git export of the portable skill before packaging it.
