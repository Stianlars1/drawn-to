# Reference media - third-party material

One directory per reference, named to match its analysis in
`../posts/<slug>.md` and its row in `../matrix.md`. The directory name is a join
key, not a label: `<author>-<full post id>` for X posts, `local-<subject>` for
captures with no post behind them. The human-readable description of each one is
the one-liner column in `../matrix.md`.

## What is here

- **Extracted video frames** at reduced resolution (`frames_*/f_NNN.jpg`), enough
  to read density, line quality, light shape and motion timing. **Capped at 10 frames per
  source video and 800 px wide**, evenly sampled across the original capture with
  the first and last sampled frame always kept, so the recording
  span remains represented. This sparse set does not prove loop closure.
  The per-post analyses were written against the full captures; the measured
  values in them are not re-derivable from this subset, and are not meant to be.
  The archive is for calibrating density and quality of line, not for re-running
  a measurement.
- **Stills and captures** (`photo_*.jpg`, `*.png`) at reduced resolution.
- `_meta/*.json` - minimal post provenance: id, URL, author handle and display
  name, date, post text, and the media dimensions. The fetch API returns a full
  author profile (follower and following counts, location, join date, avatar and
  banner URLs, bio); **that is stripped before anything is published here.** The
  skill needs to know which post a frame came from, not who follows its author.

## What is deliberately not here

- **The source videos.** They remain in the local original archive for replay and denser analysis. `scripts/fetch-posts.py` in
  the taste repo re-fetches them from the fxtwitter API on demand. They are
  git-ignored by pattern.
- **Full-resolution originals.** The package uses reduced study images; reduction does not grant reuse rights.
- **Every frame of every capture, and full resolution.** The 10-frame cap and
  the 800 px width keep the skill within this repository's 50 MiB payload target. Installer limits vary; Git checkout overhead is not a portable-skill size measurement. Stills are held at 1200 px.

## Rights

Every frame, photo and capture belongs to the person or company who made it -
the designers credited in each `../posts/<slug>.md`, and the companies whose
pages were captured. **Nothing here is licensed by this repository, and this
repository's licence does not extend to these files.** They are included as
study material so that an agent using this skill can look at the work it is
reasoning about, the way a design review pins printouts to a wall.

## Rules of use, enforced by the skill

- **References are vocabulary, never templates.** A lock cites the PATTERN ("one
  soft-shaded isometric scene per automation, dashed leader paths between
  cells"), never "make it look like this image" (`../../SKILL.md` § Visual
  evidence).
- **Never trace, copy or re-use** artwork, copy or marks from a frame in a build.
- **Never ship a frame, or a crop of one, as an asset of a delivered site.**
- Being in this archive is not an endorsement. Several references carry
  documented defects, listed in their own post files under "Slop shipped in this
  reference" and encoded as tells in `../quality-bar.md` § 1.

If you own any of this work and would rather it were not archived here, open an
issue on the repository and it will be removed.

## Regenerating

`scripts/fetch-posts.py` from the taste repo root re-fetches metadata and media
into ignored `references/media/` at repository root by post id. Frame
extraction and reduced packaging are separate curation steps. Paths in the
script are derived from its own location, so a clone works without editing.

The September batch includes per-source `evidence.json` manifests with original
hashes, source metadata and archive sample names. Text-only resources can have
no media directory when explicitly marked in their post metadata.
