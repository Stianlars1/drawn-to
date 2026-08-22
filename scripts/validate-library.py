#!/usr/bin/env python3
"""Validate the Drawn To taste library.

Checks:
  1. Every post in drawn-to/references/posts/ has frontmatter with the
     required keys (slug, url, kind, mode, motion) and slug matches filename.
  2. Every reference-doc citation slug (author-NNNN…) prefix-matches a post
     file. Unknown citations are errors; ambiguous 4-digit citations for
     colliding authors are errors.
  3. Every file named in drawn-to/SKILL.md's read-order exists.
  4. matrix.md row count equals the number of posts.
  5. (warn only) posts without a media dir in drawn-to/references/media/.

Exit 0 = clean (warnings allowed), 1 = errors.
"""
import re, sys, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKILL = ROOT / "skills" / "drawn-to"
REFS = SKILL / "references"
POSTS = REFS / "posts"
MEDIA = REFS / "media"

errors, warnings = [], []

# --- 1. posts frontmatter ---------------------------------------------------
post_files = sorted(POSTS.glob("*.md"))
post_names = [p.stem for p in post_files]
REQUIRED = ("slug:", "url:", "kind:", "mode:", "motion:")
for p in post_files:
    head = p.read_text().split("---")
    if len(head) < 3:
        errors.append(f"{p.name}: missing frontmatter block")
        continue
    fm = head[1]
    for key in REQUIRED:
        if key not in fm:
            errors.append(f"{p.name}: frontmatter missing '{key}'")
    m = re.search(r"slug:\s*(\S+)", fm)
    if m and m.group(1) != p.stem:
        errors.append(f"{p.name}: slug '{m.group(1)}' != filename")

# --- 2. citation integrity ---------------------------------------------------
# collision map: author + first-4 prefixes that are ambiguous
prefix_count = collections.Counter()
for name in post_names:
    m = re.match(r"(.+)-(\d+)$", name)
    if m:
        prefix_count[(m.group(1), m.group(2)[:4])] += 1

CITE = re.compile(r"\b([A-Za-z_][A-Za-z0-9_]*)-(\d{4,19})\b")
IGNORE_AUTHORS = {"claude", "gpt", "sonnet", "opus", "haiku"}  # model ids etc.
doc_files = [f for f in REFS.glob("*.md")] + [SKILL / "SKILL.md"]
for doc in doc_files:
    text = doc.read_text()
    for m in CITE.finditer(text):
        author, digits = m.group(1), m.group(2)
        if author.lower() in IGNORE_AUTHORS:
            continue
        # plausible reference citation only if author matches a known post author
        if not any(n.startswith(author + "-") for n in post_names):
            continue
        matches = [n for n in post_names if n.startswith(f"{author}-{digits}")]
        if not matches:
            errors.append(f"{doc.name}: citation '{author}-{digits}' matches no post")
        elif len(matches) > 1:
            errors.append(
                f"{doc.name}: citation '{author}-{digits}' ambiguous ({len(matches)} posts) - use 7 digits"
            )

# --- 3. SKILL.md read-order files -------------------------------------------
skill_text = (SKILL / "SKILL.md").read_text()
for ref in re.findall(r"`references/([A-Za-z0-9_.-]+\.md)`", skill_text):
    if not (REFS / ref).exists():
        errors.append(f"SKILL.md names references/{ref} - file missing")

# --- 4. matrix row count ------------------------------------------------------
matrix = (REFS / "matrix.md").read_text()
rows = re.findall(r"^\|\s*\d+\s*\|", matrix, flags=re.M)
if len(rows) != len(post_files):
    errors.append(f"matrix.md has {len(rows)} rows but posts/ has {len(post_files)} files")
for link in re.findall(r"\]\(posts/([^)]+)\)", matrix):
    if not (POSTS / link).exists():
        errors.append(f"matrix.md links posts/{link} - file missing")

# --- 5. media presence (warn) -------------------------------------------------
for name in post_names:
    if not (MEDIA / name).is_dir():
        warnings.append(f"no media dir for {name} (ok if intentionally text-only)")

# --- 6. copy rule: ALWAYS "-", NEVER an em dash (owner rule; generated-copy tell) ---
EM = "\u2014"
for doc in sorted(SKILL.rglob("*.md")):
    for i, line in enumerate(doc.read_text().splitlines(), 1):
        if EM in line and "NEVER" not in line and "Em dashes (" not in line:
            errors.append(f"{doc.relative_to(SKILL)}:{i}: em dash in text - use '-'")

# --- report -------------------------------------------------------------------
for w in warnings:
    print(f"WARN  {w}")
for e in errors:
    print(f"ERROR {e}")
print(f"\n{len(post_files)} posts · {len(errors)} errors · {len(warnings)} warnings")
sys.exit(1 if errors else 0)
