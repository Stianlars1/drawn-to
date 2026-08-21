---
name: Add a reference
about: Propose a design reference for the taste library
title: "ref: <author> — <what it is>"
labels: reference
---

**Link** (X post, site, video):

**What it is** (hero / feature cards / bento / component / motion…):

**Why it belongs** — name the specific craft decisions, not adjectives
(e.g. "1px alpha dividers at +6 luma, loops desynced 2.45/5s"):

**Which family/constant it strengthens or challenges**:

Checklist for the maintainer: fetch media locally (never committed) →
frame-level analysis → `posts/<author>-<id>.md` with frontmatter → matrix row
→ `python3 scripts/validate-library.py` green.
