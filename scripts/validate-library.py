#!/usr/bin/env python3
"""Validate index consistency, local references, sources and portable evidence."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import sys
from library import SKILL, REFS, entries, render


def validate(skill=SKILL):
    refs = skill / 'references'
    errors = []
    try:
        rows = entries(refs)
    except (ValueError, OSError) as exc:
        return [str(exc)], 0
    names = {r['slug'] for r in rows}
    authors = {n.rsplit('-', 1)[0] for n in names if re.search(r'-\d+$', n)}
    for name, expected in zip(('matrix.md', '_index.json'), render(rows)):
        if not (refs / name).exists() or (refs / name).read_text() != expected:
            errors.append(f'{name}: generated index drift; run scripts/rebuild-index.py')
    for row in rows:
        slug = row['slug']
        if not (refs / 'media' / slug).is_dir() and row.get('media_status') != 'text-only':
            errors.append(f'{slug}: missing media directory')
        m = re.search(r'-(\d{19})$', slug)
        if m and m[1] not in row['url']:
            errors.append(f'{slug}: source URL does not contain its post id')
    docs = list(skill.rglob('*.md'))
    for doc in docs:
        text = doc.read_text()
        rel = doc.relative_to(skill)
        for n, line in enumerate(text.splitlines(), 1):
            if '\u2014' in line and 'NEVER' not in line and 'Em dashes (' not in line:
                errors.append(f'{rel}:{n}: em dash conflicts with owner copy preference')
        # Explicit Markdown links must resolve relative to the document.
        for target in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)', text):
            target = target.strip().split(' "', 1)[0].strip('<>')
            parsed = urlsplit(target)
            if parsed.scheme or not parsed.path or any(x in target for x in ('<slug>', '<task>', '...')):
                continue
            path = doc.parent / unquote(parsed.path)
            if not path.exists():
                errors.append(f'{rel}: missing Markdown target {target}')
        # Backticked concrete paths to the portable asset trees.
        for target in re.findall(r'`((?:assets|references)/(?:[A-Za-z0-9_.*/-]+))`', text):
            if '<' in target or '...' in target:
                continue
            # Literal format examples use placeholder names and are not citations.
            if any(s in target for s in ('/slug', '/frame_', '/f_NNN', '/video_N')):
                continue
            if '*' in target:
                found = list(skill.glob(target))
            else:
                found = (skill / target).exists()
            if not found:
                errors.append(f'{rel}: missing named path {target}')
        for author, digits in re.findall(r'\b([A-Za-z0-9_]+)-(\d{4,19})\b', text):
            if author not in authors and len(digits) != 19:
                continue
            matches = [n for n in names if n.startswith(f'{author}-{digits}')]
            if len(matches) != 1:
                errors.append(f'{rel}: citation {author}-{digits} resolves to {len(matches)} posts')
    source_path = refs / 'sources.json'
    if source_path.exists():
        batch = json.loads(source_path.read_text())
        seen = set()
        for source in batch['references']:
            slug = source['slug']
            if slug in seen or slug not in names:
                errors.append(f'sources.json: duplicate or unindexed source {slug}')
            seen.add(slug)
            evidence_path = refs / source['evidence']
            if not evidence_path.exists():
                errors.append(f'{slug}: missing evidence manifest')
                continue
            evidence = json.loads(evidence_path.read_text())
            if evidence.get('slug') != slug:
                errors.append(f'{slug}: evidence join key mismatch')
            for asset in evidence['assets']:
                if not re.fullmatch(r'[a-f0-9]{64}', asset.get('sha256', '')):
                    errors.append(f'{slug}/{asset["file"]}: missing original hash')
                paths = [x['file'] for x in asset.get('sampling', {}).get('archive', [])]
                if asset.get('archive_file'):
                    paths.append(asset['archive_file'])
                for path in paths:
                    if not (evidence_path.parent / path).is_file():
                        errors.append(f'{slug}: missing evidence file {path}')
        requested = {re.search(r'/status/(\d+)', u)[1] for u in batch['request_urls'] if '/status/' in u}
        indexed = {r['slug'].rsplit('-', 1)[-1] for r in batch['references']}
        if requested != indexed:
            errors.append('sources.json: requested post coverage mismatch')
    payload = sum(p.stat().st_size for p in skill.rglob('*') if p.is_file())
    if payload > 50 * 1024 * 1024:
        errors.append(f'Portable skill exceeds project 50 MiB budget: {payload / 1024**2:.2f} MiB')
    return sorted(set(errors)), len(rows)

if __name__ == '__main__':
    errors, count = validate()
    for error in errors:
        print('ERROR', error)
    print(f'{count} references; {len(errors)} errors')
    sys.exit(bool(errors))
