/**
 * Builds the site icons out of the restaurant's own wordmark.
 *
 * SOURCE: public/naranj-wordmark.png, which scripts/extract-logo.js lifts from
 * the operator's brand assets. Nothing here is drawn or invented — the orange
 * blossom is cropped straight out of that mark.
 *
 * The full wordmark is three elements wide (calligraphy, blossom, Latin
 * script) and turns to mush below about 64px, so the icon is the blossom
 * alone: it is the one element that still reads at 16px in a browser tab. It
 * is set ivory on ink, which is exactly how the header renders it in the dark
 * theme, and padded so the petals never touch the tile edge.
 */
const sharp = require("sharp");

const SOURCE = "public/naranj-wordmark.png";

// A generous box around the blossom; the alpha trim below finds its real
// bounds, so these numbers only have to contain it, not frame it.
const BLOSSOM = { left: 430, top: 0, width: 360, height: 350 };

const INK = { r: 14, g: 17, b: 22, alpha: 1 }; // --c-ink-950
const PAD = 0.14; // share of the tile left clear around the mark

const OUTPUTS = [
  { file: "app/icon.png", size: 512 },
  { file: "app/apple-icon.png", size: 180 },
  { file: "public/icon-192.png", size: 192 },
  { file: "public/icon-512.png", size: 512 },
];

/**
 * Wraps a PNG in an ICO container. Nothing here re-encodes the image: the ICO
 * format has allowed a whole PNG as its payload since Vista, and every browser
 * that still asks for /favicon.ico by name understands it. Worth keeping
 * because Next only links `icon.png`, and bare /favicon.ico hits from crawlers
 * would otherwise 404.
 */
function pngToIco(png) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(48, 6); // width
  header.writeUInt8(48, 7); // height
  header.writeUInt8(0, 8); // palette size: not paletted
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(header.length, 18); // payload offset
  return Buffer.concat([header, png]);
}

(async () => {
  const mark = await sharp(SOURCE)
    .extract(BLOSSOM)
    .trim({ threshold: 1 })
    .png()
    .toBuffer();

  const { width, height } = await sharp(mark).metadata();
  const longest = Math.max(width, height);

  async function tile(size) {
    const inner = Math.round(size * (1 - PAD * 2));
    const scaled = await sharp(mark)
      .resize({
        width: Math.round((width / longest) * inner),
        height: Math.round((height / longest) * inner),
        kernel: "lanczos3",
      })
      .toBuffer();

    return sharp({
      create: { width: size, height: size, channels: 4, background: INK },
    })
      .composite([{ input: scaled, gravity: "centre" }])
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  for (const { file, size } of OUTPUTS) {
    await require("node:fs/promises").writeFile(file, await tile(size));
    console.log(file.padEnd(24), `${size}x${size}`);
  }

  await require("node:fs/promises").writeFile(
    "app/favicon.ico",
    pngToIco(await tile(48)),
  );
  console.log("app/favicon.ico".padEnd(24), "48x48");
})();
