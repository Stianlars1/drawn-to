# Reference media - third-party material

One directory per reference, named to match its analysis in
`../posts/<slug>.md` and its row in `../matrix.md`. The directory name is a join
key, not a label: `<author>-<full post id>` for X posts, `local-<subject>` for
captures with no post behind them. The human-readable description of each one is
the one-liner column in `../matrix.md`.

## What is here

- **Extracted video frames** at reduced resolution (`frames_*/f_NNN.jpg`), enough
  to read density, line quality, light shape and motion timing.
- **Stills and captures** (`photo_*.jpg`, `*.png`) at reduced resolution.
- `_meta/*.json` - minimal post provenance: id, URL, author handle and display
  name, date, post text, and the media dimensions. The fetch API returns a full
  author profile (follower and following counts, location, join date, avatar and
  banner URLs, bio); **that is stripped before anything is published here.** The
  skill needs to know which post a frame came from, not who follows its author.

## What is deliberately not here

- **The source videos.** They are large (193 MB across 31 files in the full
  archive) and redundant once frames are extracted. `scripts/fetch-posts.sh` in
  the taste repo re-fetches them from the fxtwitter API on demand. They are
  git-ignored by pattern.
- **Full-resolution originals.** Nothing here is at a resolution that would let
  anyone reproduce the original artwork.

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

`scripts/fetch-posts.sh` from the taste repo root re-fetches metadata and media
into this folder by post id, then extracts frames with ffmpeg. Paths in the
script are derived from its own location, so a clone works without editing.
