#!/bin/sh
# Screenshot one design from a built site in headless Chrome, at an exact viewport width (via an iframe).
# Usage: scripts/shots.sh <site-dir> <design-id> <width> <out.png>    (needs network: it loads live weather)
SITE=$(cd "$1" && pwd); ID=$2; W=$3; OUT=$4
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WRAP=$(mktemp /tmp/wth-wrap-XXXXXX.html)
printf '<body style="margin:0;background:#888"><iframe src="file://%s/gallery.html#%s" style="width:%spx;height:1500px;border:0;display:block"></iframe></body>' "$SITE" "$ID" "$W" > "$WRAP"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=$((W+16)),1520 --virtual-time-budget=12000 --screenshot="$OUT" "file://$WRAP" >/dev/null 2>&1
rm -f "$WRAP"
