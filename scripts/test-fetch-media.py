#!/usr/bin/env python3
"""No network: preserve direct media and nested tutorial assets at best quality."""
import importlib.util
from pathlib import Path
spec=importlib.util.spec_from_file_location('fetcher',Path(__file__).with_name('fetch-posts.py'))
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
post={'media':{'all':[{'type':'video','url':'fallback','variants':[{'content_type':'video/mp4','bitrate':1,'url':'low'},{'content_type':'video/mp4','bitrate':9,'url':'high'}]}]},'quote':{'article':{'cover_media':{'media_info':{'original_img_url':'cover'}},'media_entities':[{'media_info':{'__typename':'ApiGif','variants':[{'content_type':'video/mp4','bit_rate':4,'url':'gif'}]}},{'media_info':{'__typename':'ApiVideo','variants':[{'content_type':'application/x-mpegURL','url':'playlist'},{'content_type':'video/mp4','bit_rate':2,'url':'low2'},{'content_type':'video/mp4','bit_rate':12,'url':'high2'}]}}]}}}
assert module.media_items(post)==[('video_1','high','video'),('quoted_article_1','cover','image'),('quoted_article_2','gif','video'),('quoted_article_3','high2','video')]
assert module.media_items({'quote':{'text':'unrelated announcement'}})==[]
print('Direct video, quoted-article cover, GIF and best-quality article video are preserved.')
