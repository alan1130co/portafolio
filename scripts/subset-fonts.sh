#!/bin/bash
# Subsets src/assets/fonts/*.woff2 down to the Unicode ranges actually used
# by the app (ASCII + Latin-1 Supplement for Spanish diacritics + General
# Punctuation for dashes/bullet/quotes), while keeping each font variable
# (fvar/gvar intact, same wght axis range as before) so the existing
# next/font weight declarations in fonts.js keep working unchanged and only
# one file is still downloaded per family. Requires
# `pip install fonttools[woff]` (brotli extra, for woff2).
#
# CAUTION — this is lossy and applies IN PLACE to whatever is currently
# checked in. Like the earlier wght-range narrowing (see git log on these
# files), there's no pristine full-range/full-glyph source kept in the repo.
# If you need to widen UNICODES (new hardcoded symbol, new language) or the
# wght range, re-download the original variable font from upstream
# (fonts.google.com / github.com/rsms/inter / JetBrains Mono releases)
# first — running this again on the already-subset file can only ever
# remove glyphs, never restore them.
#
# After changing UNICODES, re-verify coverage before committing: extract
# every character actually rendered by the app (translations*.js + JSX text
# nodes) and confirm each maps to a real glyph (not just falls through to
# .notdef) in the new font's cmap.
set -euo pipefail
cd "$(dirname "$0")/../src/assets/fonts"

# Basic Latin + Latin-1 Supplement (Spanish diacritics: á é í ó ú ñ Ñ Ó, ¿,
# middle dot) + General Punctuation (em dash, bullet, ellipsis, quotes).
UNICODES="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-205E,U+224B,U+25C6,U+269B,U+27A4,U+2197"

TMPDIR="${TMPDIR:-/tmp}"
for f in Sora-Variable Inter-Variable JetBrainsMono-Variable; do
  before=$(stat -c%s "$f.woff2")
  python -m fontTools.subset "$f.woff2" \
    --output-file="$TMPDIR/$f.subset.woff2" \
    --flavor=woff2 \
    --unicodes="$UNICODES" \
    --layout-features='*' \
    --glyph-names \
    --symbol-cmap \
    --legacy-cmap \
    --notdef-glyph \
    --notdef-outline \
    --recommended-glyphs \
    --name-IDs='*' \
    --name-legacy \
    --name-languages='*'
  mv "$TMPDIR/$f.subset.woff2" "$f.woff2"
  echo "$f: ${before}B -> $(stat -c%s "$f.woff2")B"
done
