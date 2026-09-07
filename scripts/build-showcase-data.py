#!/usr/bin/env python3
"""Generate current library counts for the static showcase without media payloads."""
import json
import sys
from library import ROOT, entries
rows = entries()
data = {'total': len(rows), 'visual': sum(row['kind'] != 'resource' for row in rows), 'resources': sum(row['kind'] == 'resource' for row in rows)}
target = ROOT / 'site/js/library-data.js'
expected = 'window.DrawnToLibrary = ' + json.dumps(data, separators=(',', ':')) + ';\n'
if '--check' in sys.argv:
    if not target.exists() or target.read_text() != expected:
        raise SystemExit('Showcase counts have drifted; run scripts/build-showcase-data.py')
else:
    target.write_text(expected)
print(f'Showcase data: {len(rows)} indexed references')
