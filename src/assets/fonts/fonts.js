import localFont from "next/font/local";

// Each family/weight declared here must match what's actually used in the
// app (checked via `grep fontWeight` across src/) AND the wght axis range
// the binary was instanced to (via fonttools varLib.instancer) — the two
// have to stay in sync, since the instanced files no longer contain
// interpolation data outside their range.
//   Sora:          used at 700/800  -> file instanced to wght 700-800
//   Inter:         used at 400/500/600 -> file instanced to wght 400-600
//   JetBrains Mono: used at 400/600/700 -> file instanced to wght 400-700

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
  display: "swap",
});
