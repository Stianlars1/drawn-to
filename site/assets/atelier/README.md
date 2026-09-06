# Original atelier artwork

These assets were generated for the ten-scene showcase expansion on 2026-09-06
with OpenAI's built-in imagegen tool. They are original artwork, not downloaded
reference images. Prompts are recorded in `PROMPTS.md`; original generated
filenames, dimensions, encoding and SHA-256 hashes are in `provenance.json`.

- `night-garden.webp`: original cinematic glass-conservatory scene.
- `red-chamber.webp`: original chrome and velvet material photograph.
- `paper-theatre.webp`: original paper-engineering book scene.
- `paper-cutout.webp`: imagegen edit of that same original book, retaining alpha.
- `living-terrarium.webp`: original glass/botanical miniature.
- `specimen-cabinet.webp`: original six-cell specimen atlas, three columns and
  two rows. CSS crops each square cell without stretching its contents.

Lossless WebP conversion changes the encoding, not the artwork. Original PNGs
remain retained in the local image-generation archive. The contact-sheet page
reuses these new studies and the earlier original blue-ink garden; it is a
curation interface, not a claim that every thumbnail came from a different shoot.

The `posters/` directory contains actual browser renders of the four new
Three.js scenes, with three meaningful control states at desktop and portrait
sizes. Those scenes are original procedural geometry, not generated pictures.
`frames.json` records their settings. Rebuild them with
`scripts/export-studio-posters.mjs`; see `docs/showcase.md` for the local tools.

The owner's reference library informed composition, material and light choices.
No third-party reference pixels are included in the page artwork. These new
assets are not a new third-party reference entry and do not change the library's
85-reference count.
