import localFont from "next/font/local";

// Same families/weights as the previous self-hosted fonts.css: each family
// is a single variable-font file declared once per weight (not a
// `weight: "300 800"` variable range), so text renders identically to
// before.

export const sora = localFont({
  src: [
    { path: "./Sora-Variable.woff2", weight: "400", style: "normal" },
    { path: "./Sora-Variable.woff2", weight: "600", style: "normal" },
    { path: "./Sora-Variable.woff2", weight: "700", style: "normal" },
    { path: "./Sora-Variable.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
});

export const inter = localFont({
  src: [
    { path: "./Inter-Variable.woff2", weight: "300", style: "normal" },
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
    { path: "./JetBrainsMono-Variable.woff2", weight: "500", style: "normal" },
    { path: "./JetBrainsMono-Variable.woff2", weight: "600", style: "normal" },
    { path: "./JetBrainsMono-Variable.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jbmono",
  display: "swap",
});
