#!/usr/bin/env bash
# Renders marketing/posts.html to PNG with headless Chrome:
#   marketing/out/fr/post-1.png … post-6.png  and  marketing/out/ar/post-1.png … post-6.png  (1080x1350)
# Usage: bash tools/export-posts.sh
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
ROOT="$(pwd -W 2>/dev/null || pwd)"
for l in fr ar; do
  mkdir -p "marketing/out/$l"
  for p in 1 2 3 4 5 6; do
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
      --virtual-time-budget=8000 --window-size=1080,1350 \
      --screenshot="$ROOT/marketing/out/$l/post-$p.png" "file:///$ROOT/marketing/posts.html#p=$p&l=$l" >/dev/null 2>&1
  done
done
echo "Exported 12 posts to marketing/out/fr and marketing/out/ar"
