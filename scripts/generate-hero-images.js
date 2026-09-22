// Regenerates the static hero-photo AVIF/WebP variants in public/hero/ from
// the source at src/assets/img/hero-photo.jpg. Run after replacing that
// source photo, or to change HERO_WIDTHS (keep in sync with the constant of
// the same name in src/components/Hero/Hero.jsx).
const path = require("node:path");
const fs = require("node:fs");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "src", "assets", "img", "hero-photo.jpg");
const OUT_DIR = path.join(__dirname, "..", "public", "hero");
const WIDTHS = [384, 480, 640, 750, 828, 960];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const w of WIDTHS) {
    await sharp(SRC).resize({ width: w }).avif({ quality: 50, effort: 6 }).toFile(path.join(OUT_DIR, `hero-${w}.avif`));
    await sharp(SRC).resize({ width: w }).webp({ quality: 75 }).toFile(path.join(OUT_DIR, `hero-${w}.webp`));
  }
  const blurBuffer = await sharp(SRC).resize({ width: 16 }).blur(2).jpeg({ quality: 40 }).toBuffer();
  console.log("Generated", WIDTHS.length * 2, "image variants in", OUT_DIR);
  console.log("Blur data URL (paste into HERO_BLUR_DATA_URL in Hero.jsx):");
  console.log(`data:image/jpeg;base64,${blurBuffer.toString("base64")}`);
}

main();
