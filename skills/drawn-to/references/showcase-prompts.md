# Use a specific showcase style

Use this path when the user chooses a Drawn To scene and asks for its look,
material, effect or a copyable prompt. The chosen scene is an established
visual direction. Discover product facts and consequential gaps; do not send
the user back through a generic family interview.

The portable [showcase-styles.json](showcase-styles.json) contains a separate
visual contract for each of the 70 scene IDs. Look up the exact ID, including
case for the original `a`-`z`, `A`-`D` routes. Each entry supplies composition,
material/light/type, behavior, scene-specific acceptance checks, source
vocabulary and actual implementation paths. The public showcase is
https://drawn-to.vercel.app/ and its source is
https://github.com/Stianlars1/drawn-to. Public source paths are repository paths,
not files promised to exist in an installed skill.

## Preserve what the user selected

Inspect the rendered scene and its implementation. State the few properties
that make the scene identifiable. Keep those properties through adaptation:
object-to-type scale, silhouette, depth layers, edge treatment, material response,
light direction, image detail, motion relationship and reading space. Colors
and a family label alone cannot carry the direction.

The specific scene matters. `optical-type` needs thick refracting glass over
enlarged typography; `woven-spectrum` needs many separately thickened ribbons
with changing reflections; `night-garden` needs a detailed original environment
with glass, warm interior light and water reflections; `paper-theatre` needs an
authored layered paper world. Their media requirements differ. Replacing a
high-detail image with a few CSS shapes, or physical refraction with backdrop
blur, changes the chosen look.

Distinguish the actual showcase technique from the source inspiration. The
night garden is original raster artwork with deliberate crop changes; its
inspiration does not establish a live 3D renderer. The optical scene uses a
Three.js glass mesh and a texture plane; it does not establish that arbitrary
DOM behind any wrapper can be refracted by the same code. Retain semantic text
and controls when text or images are represented inside a canvas.

Some original studies synthesize several families or teach a workflow. Cite
that honestly. A supporting reference is not evidence that the page was copied
from that post or that the author used our implementation. Keep references,
original showcase artwork and implementation source distinct.

## A prompt that travels

The prompt must identify one stable scene URL and contain enough concrete
visual instructions to remain useful without the preceding conversation.
Include the exact composition, material/light/type contract, meaningful behavior,
asset requirements, full reference URLs and implementation URLs, then focused
acceptance checks. Preserve user product facts if known. Ask for missing subject,
content, placement or platform decisions only when they change the result.
Do not silently copy the showcase's marketing text into an unrelated product.

The repository generates one public text file per scene using
`scripts/build-showcase-prompts.mjs`. It validates the scene registry, source
paths and unique prompts. The UI fetches only the requested text. To maintain
these prompts, edit the canonical profile, regenerate, then verify both the
clipboard content and the prompt's fidelity to the current rendered scene.
The header copy action exports a visual direction; an install command and a
workflow prompt are different actions and should have distinct labels.

## Review against the selected scene

Compare whole composition and close-up material detail, including mobile and
motion/fallback states. Preserve meaningful illustrations, choices and evidence
on small screens. Reflow, use an explicit detail view, or allow a readable scroll
region when necessary. Hiding the third card or clipping text is not a responsive
solution. Do not describe a text/metadata check as a visual reproduction test.
A prompt is a reproducible brief and source trail, not a guarantee that every
model will generate identical pixels. When output falls short, name the missing
qualities and revise the output or the under-specified profile.


## Stable scene links

The showcase uses descriptive canonical names independently of display order.
The original case-sensitive letter links remain aliases; `a` and `A` are distinct
scenes. The repository's `site/js/scene-routes.js` is the shared mapping used by
the browser and prompt generator. Export the current canonical link when a
prompt is copied. Do not interpret a URL name as a sequence position.
