#!/bin/sh
# Test every design on sample + stress data, then rebuild index.html and gallery.html in the repo root.
# Needs: python3 and node (no packages). Add --live to also fetch real weather and check all designs on it.
set -e
cd "$(dirname "$0")/.."
node scripts/test.js
python3 scripts/build.py
[ "$1" = "--live" ] && node scripts/live-check.js
echo "done: index.html and gallery.html rebuilt"
