#!/usr/bin/env python3
"""Fetch public X metadata and original media into an untracked local archive.

The portable study archive is curated separately; this command never overwrites
its minimized provenance or reduced frames. A raw metadata cache is optional.
"""
import argparse
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request
from library import ROOT, entries


def get(url, accept):
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Accept': accept})
    with urllib.request.urlopen(request, timeout=45) as response:
        content_type = response.headers.get('Content-Type', '').split(';')[0]
        data = response.read()
    if not data:
        raise ValueError(f'Empty response: {url}')
    return data, content_type


def atomic(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.part')
    temporary.write_bytes(data)
    temporary.replace(path)


def tweet_for(post_id, cache):
    path = cache / (post_id + '.json')
    if path.exists():
        try:
            cached = json.loads(path.read_text())
            if cached.get('code') == 200 and str(cached.get('tweet', {}).get('id')) == post_id:
                return cached['tweet']
        except (ValueError, AttributeError):
            pass
    raw, content_type = get('https://api.fxtwitter.com/i/status/' + post_id, 'application/json')
    if 'json' not in content_type:
        raise ValueError(f'{post_id}: API returned {content_type}')
    data = json.loads(raw)
    if data.get('code') != 200 or str(data.get('tweet', {}).get('id')) != post_id:
        raise ValueError(f'{post_id}: API did not return the requested post')
    atomic(path, raw)
    return data['tweet']


def media_items(tweet):
    result = []
    for n, media in enumerate((tweet.get('media') or {}).get('all', []), 1):
        kind = media.get('type')
        if kind == 'photo':
            result.append((f'photo_{n}', media['url'], 'image'))
        elif kind in ('video', 'gif'):
            variants = [v for v in media.get('variants', []) if v.get('content_type') == 'video/mp4']
            url = max(variants, key=lambda v: v.get('bitrate', 0))['url'] if variants else media['url']
            result.append((f'video_{n}', url, 'video'))
    articles = [('article', tweet.get('article') or {})]
    # A linked tutorial may carry its images/videos on the quoted article.
    quoted_article = (tweet.get('quote') or {}).get('article')
    if quoted_article:
        articles.append(('quoted_article', quoted_article))
    for prefix, article in articles:
        media = ([article['cover_media']] if article.get('cover_media') else []) + article.get('media_entities', [])
        for n, item in enumerate(media, 1):
            info = item.get('media_info', {})
            if info.get('original_img_url'):
                result.append((f'{prefix}_{n}', info['original_img_url'], 'image'))
            else:
                variants = [v for v in info.get('variants', []) if v.get('content_type') == 'video/mp4']
                if variants:
                    chosen = max(variants, key=lambda v: v.get('bit_rate', v.get('bitrate', 0)))
                    result.append((f'{prefix}_{n}', chosen['url'], 'video'))
    return result


def download_media(directory, name, url, kind):
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme != 'https' or parsed.hostname not in ('pbs.twimg.com', 'video.twimg.com'):
        raise ValueError(f'Unexpected media origin: {parsed.hostname}')
    if kind == 'image':
        extension = Path(parsed.path).suffix.lower().lstrip('.') or 'jpg'
        path_without_extension = parsed.path.rsplit('.', 1)[0] if '.' in parsed.path.rsplit('/', 1)[-1] else parsed.path
        url = urllib.parse.urlunsplit(('https', parsed.netloc, path_without_extension, urllib.parse.urlencode({'format': extension, 'name': 'orig'}), ''))
    else:
        extension = 'mp4'
    target = directory / (name + '.' + extension)
    if target.is_file() and target.stat().st_size:
        return target.name, 'cached'
    raw, content_type = get(url, 'image/*,video/mp4,application/octet-stream')
    expected = 'image/' if kind == 'image' else 'video/'
    if not (content_type.startswith(expected) or content_type == 'application/octet-stream'):
        raise ValueError(f'{target.name}: unexpected response type {content_type}')
    if raw.lstrip().startswith((b'<html', b'<!DOCTYPE')):
        raise ValueError(f'{target.name}: HTML instead of media')
    atomic(target, raw)
    return target.name, 'downloaded'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ids', nargs='+', help='Post IDs; defaults to all indexed X references')
    parser.add_argument('--output', type=Path, default=ROOT / 'references' / 'media')
    parser.add_argument('--metadata-cache', type=Path, help='Optional full fxtwitter response cache')
    parser.add_argument('--metadata-only', action='store_true')
    args = parser.parse_args()
    ids = args.ids or [m[1] for row in entries() if (m := re.search(r'-(\d{19})$', row['slug']))]
    if any(not re.fullmatch(r'\d{19}', post_id) for post_id in ids):
        parser.error('Every post ID must have 19 digits')
    output = args.output.resolve()
    portable = (ROOT / 'skills' / 'drawn-to').resolve()
    if output == portable or portable in output.parents:
        parser.error('Original downloads must stay outside the portable skill')
    cache = args.metadata_cache or output / '_raw-meta'
    failures = []
    for post_id in dict.fromkeys(ids):
        try:
            tweet = tweet_for(post_id, cache)
            author = tweet['author']['screen_name']
            if not re.fullmatch(r'[A-Za-z0-9_]+', author):
                raise ValueError('Invalid author path component')
            media = media_items(tweet)
            if not args.metadata_only:
                for name, url, kind in media:
                    download_media(output / f'{author}-{post_id}', name, url, kind)
            print(f'{author}-{post_id}: {len(media)} assets' + (' (metadata only)' if args.metadata_only else ' ready'))
        except (OSError, ValueError, KeyError) as exc:
            failures.append(post_id)
            print(f'ERROR {post_id}: {exc}')
    if failures:
        parser.exit(1, f'{len(failures)} post(s) incomplete; successful downloads retained for retry\n')

if __name__ == '__main__':
    main()
