#!/usr/bin/env bash
# Renders marketing/post.html to PNG with headless Chrome.
# Usage: bash tools/export-posts.sh   → marketing/post-square.png, marketing/post-story.png
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
URL="file:///$(pwd -W 2>/dev/null || pwd)/marketing/post.html"
shot() { # $1 hash  $2 height  $3 out
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --virtual-time-budget=8000 --window-size=1080,"$2" --screenshot="$(pwd -W 2>/dev/null || pwd)/marketing/$3" "$URL#$1" 2>/dev/null
}
shot square 1080 post-square.png
shot story 1920 post-story.png
echo "Exported marketing/post-square.png and marketing/post-story.png"
