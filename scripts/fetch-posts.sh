#!/bin/bash
# Compatibility entry point; originals go to the ignored local archive.
set -eu
REPO="$(cd "$(dirname "$0")/.." && pwd)"
exec python3 "$REPO/scripts/fetch-posts.py" "$@"
