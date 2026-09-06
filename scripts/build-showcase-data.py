#!/usr/bin/env python3
"""Generate current library counts for the static showcase without media payloads."""
import json
from library import ROOT, entries
rows = entries()
data = {'total': len(rows), 'visual': sum(row['kind'] != 'resource' for row in rows), 'resources': sum(row['kind'] == 'resource' for row in rows)}
target = ROOT / 'site/js/library-data.js'
target.write_text('window.DrawnToLibrary = ' + json.dumps(data, separators=(',', ':')) + ';\n')
print(f'Showcase data: {len(rows)} indexed references')
