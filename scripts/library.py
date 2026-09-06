"""Shared, dependency-free index logic for the Drawn To repository.

The maintained frontmatter subset uses single-line scalar values and lists.
New values are JSON-quoted (also valid YAML); no external YAML loader is needed.
"""
from pathlib import Path
import collections
import json
import re

ROOT = Path(__file__).resolve().parent.parent
SKILL = ROOT / "skills" / "drawn-to"
REFS = SKILL / "references"
FIELDS = ("slug", "url", "kind", "mode", "motion", "summary", "radius", "density", "illustration", "order")

def frontmatter(path):
    text = path.read_text()
    if not text.startswith("---\n") or "\n---\n" not in text[4:]:
        raise ValueError(f"{path.name}: missing frontmatter")
    header, body = text[4:].split("\n---\n", 1)
    data = {}
    for line in header.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        match = re.fullmatch(r"([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)", line)
        if not match:
            raise ValueError(f"{path.name}: unsupported multiline frontmatter: {line}")
        key, value = match.groups()
        if key in data:
            raise ValueError(f"{path.name}: duplicate key {key}")
        try:
            data[key] = json.loads(value)
        except json.JSONDecodeError:
            if value.startswith("[") and value.endswith("]"):
                data[key] = [x.strip().strip("\"'") for x in value[1:-1].split(",") if x.strip()]
            else:
                data[key] = value.strip("'")
    return data, body

def entries(refs=REFS):
    result = []
    for path in sorted((refs / "posts").glob("*.md")):
        data, _ = frontmatter(path)
        for key in FIELDS:
            if key not in data or data[key] in (None, ""):
                raise ValueError(f"{path.name}: missing {key}")
        if data["slug"] != path.stem:
            raise ValueError(f"{path.name}: slug does not match filename")
        if not isinstance(data["order"], int):
            raise ValueError(f"{path.name}: order must be integer")
        result.append(data)
    orders = [x["order"] for x in result]
    if sorted(orders) != list(range(1, len(result) + 1)):
        raise ValueError("Post order must be unique and contiguous from 1")
    return sorted(result, key=lambda x: x["order"])

def compact(row):
    return {"slug": row["slug"], "url": row["url"], "author": row.get("author"),
            "kind": row["kind"], "mode": row["mode"], "motion_level": row["motion"],
            "one_liner": row["summary"], "axes": {k: row[k] for k in ("radius", "density", "illustration")},
            "tags": row.get("tags", []), "owner_label": row.get("owner_label")}

def label(slug, rows):
    m = re.fullmatch(r"(.+)-(\d+)", slug)
    if not m:
        return slug
    author, digits = m.groups()
    for n in range(4, len(digits) + 1):
        prefix = author + "-" + digits[:n]
        if sum(r["slug"].startswith(prefix) for r in rows) == 1:
            return prefix
    return slug

def cell(value):
    return str(value).replace("|", "\\|").replace("\n", " ")

def render(rows):
    lines = [f"# Taste matrix - all {len(rows)} references", "",
             "Generated from post frontmatter by `python3 scripts/rebuild-index.py` in the taste repository.",
             "Edit the post metadata, not this table. `_index.json` contains the same current entries.",
             "The count includes visual references and resources; it is not a count of videos or independent preference votes.", "",
             "| # | Ref | Kind | Mode | Motion | Radius | Density | Illustration | What it is |",
             "|---|---|---|---|---|---|---|---|---|"]
    for row in rows:
        values = [row["order"], f'[{label(row["slug"], rows)}](posts/{row["slug"]}.md)']
        values += [row[k] for k in ("kind", "mode", "motion", "radius", "density", "illustration", "summary")]
        lines.append("| " + " | ".join(map(cell, values)) + " |")
    lines += ["", "## Distribution", ""]
    for key in ("kind", "mode", "motion"):
        counts = collections.Counter(r[key] for r in rows)
        lines.append(f"- **{key.title()}**: " + " · ".join(f"{k} {v}" for k, v in sorted(counts.items())))
    lines += ["", "See [style families](style-families.md) for direction seeds and [newer references](september-expansion.md) for the September expansion.", ""]
    return "\n".join(lines), json.dumps([compact(r) for r in rows], indent=2, ensure_ascii=False) + "\n"
