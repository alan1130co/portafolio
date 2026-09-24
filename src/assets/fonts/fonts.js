import localFont from "next/font/local";

// Each family/weight declared here must match what's actually used in the
// app (checked via `grep fontWeight` across src/) AND the wght axis range
// the binary was instanced to (via fonttools varLib.instancer) — the two
// have to stay in sync, since the instanced files no longer contain
// interpolation data outside their range.
//   Sora:          used at 700/800  -> file instanced to wght 700-800
//   Inter:         used at 400/500/600 -> file instanced to wght 400-600
//   JetBrains Mono: used at 400/600/700 -> file instanced to wght 400-700
//
// All three are still variable (fvar/gvar intact) rather than static
// per-weight files: with 2-3 weights needed per family, one variable file
// shared across every weight (one HTTP request, shared glyph outlines) is
// smaller in total than separate static instances per weight (each with
// its own full glyph table) — measured trade-off, not an assumption.
// They're also subset to the Unicode ranges the app actually renders
// (scripts/subset-fonts.sh) — glyph tables only, wght axis and OS/2/hhea
// metrics (ascender/descender/unitsPerEm, which next/font's automatic
// fallback size-adjust is computed from) are untouched.

export const sora = localFont({
  src: [
    { path: "./Sora-Variable.woff2", weight: "700", style: "normal" },
    { path: "./Sora-Variable.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
});

export const inter = localFont({
  src: [
    { path: "./Inter-Variable.woff2", weight: "400", style: "normal" },
    { path: "./Inter-Variable.woff2", weight: "500", style: "normal" },
    { path: "./Inter-Variable.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [
    { path: "./JetBrainsMono-Variable.woff2", weight: "400", style: "normal" },
    { path: "./JetBrainsMono-Variable.woff2", weight: "600", style: "normal" },
    { path: "./JetBrainsMono-Variable.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jbmono",
  // Root-cause fix for the CLS-vs-Safari-invisible-text tradeoff (see git
  // history): next/font's automatic fallback (adjustFontFallback, on by
  // default) always sizes against Arial — a proportional font — even
  // though this family is monospace. Its size-adjust matches JetBrains
  // Mono's *average* string width, which is exact for typical prose but
  // wrong for short strings with an atypical letter mix (hero badge, CV
  // button, lang toggle), so swapping in the real font changed their
  // width enough to collapse 2 lines into 1 and shove the photo up
  // (the CLS 0.29 regression). Disabled here; a manually-calibrated
  // monospace fallback is declared in globals.css instead (see
  // "jbmono-fallback" there) so every string — not just average ones —
  // occupies the same width under fallback or real font, independent of
  // font-display. That makes "swap" safe to use everywhere, including
  // the Safari bug where "optional" left this text unpainted for
  // several seconds on real iPhones.
  adjustFontFallback: false,
  fallback: ["jbmono-fallback"],
  display: "swap",
});
