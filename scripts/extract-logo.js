/**
 * Lifts the official Naranj wordmark out of the photo watermark and rebuilds
 * it as a transparent PNG: luminance becomes the alpha channel, so the white
 * calligraphy survives and the photo behind it drops away.
 *
 * Two versions are written — ivory for the dark theme and deep ink for the
 * light one — because a single ivory mark vanishes on limestone.
 */
const sharp = require("sharp");

const CROP = { left: 10, top: 790, width: 270, height: 165 };
const THRESHOLD = 186;

const VARIANTS = [
  { file: "public/naranj-wordmark.png", rgb: [250, 246, 238] },      // ivory, on charcoal
  { file: "public/naranj-wordmark-dark.png", rgb: [32, 26, 15] },    // deep ink, on stone
];

(async () => {
  const { data, info } = await sharp("public/images/src/naranj-wide.jpg")
    .extract(CROP)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (const variant of VARIANTS) {
    const rgba = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i += 1) {
      const v = data[i * info.channels];
      const a =
        v <= THRESHOLD
          ? 0
          : Math.min(255, Math.round(((v - THRESHOLD) / (255 - THRESHOLD)) * 255));
      rgba[i * 4] = variant.rgb[0];
      rgba[i * 4 + 1] = variant.rgb[1];
      rgba[i * 4 + 2] = variant.rgb[2];
      rgba[i * 4 + 3] = a;
    }

    const trimmed = await sharp(rgba, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .png()
      .trim({ threshold: 1 })
      .toBuffer();

    await sharp(trimmed)
      .resize({ width: 880, kernel: "lanczos3" })
      .png({ compressionLevel: 9 })
      .toFile(variant.file);

    const m = await sharp(variant.file).metadata();
    console.log(variant.file.padEnd(34), m.width + "x" + m.height);
  }
})();
