#!/usr/bin/env python3
"""Rebuild the Markdown and JSON indexes from canonical post metadata."""
import argparse
from library import REFS, entries, render

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Report drift without writing")
    args = parser.parse_args()
    rows = entries()
    outputs = dict(zip(("matrix.md", "_index.json"), render(rows)))
    drift = [name for name, text in outputs.items() if not (REFS / name).exists() or (REFS / name).read_text() != text]
    if args.check:
        if drift:
            parser.exit(1, "Index drift: " + ", ".join(drift) + "\n")
    else:
        for name, text in outputs.items():
            (REFS / name).write_text(text)
    print(f"{len(rows)} references; indexes {'current' if args.check else 'rebuilt'}")
if __name__ == "__main__":
    main()
