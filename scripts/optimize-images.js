/**
 * Normalises the real Naranj photography into web-ready files.
 * Sources are the originals pulled from the Gemini Group image server and
 * kept untouched in public/images/src (excluded from the build output).
 */
const sharp = require("sharp");
const fs = require("fs");

const OUT = "public/images";
const SRC = "public/images/src";

const jobs = [
  // --- The house itself ---
  { in: "naranj-hero.png",       out: "hall-day.jpg",       w: 2200 },
  { in: "naranj-wide.jpg",       out: "hall-signed.jpg",    w: 1706 },
  { in: "naranj-mark.png",       out: "hall-mood.jpg",      w: 1800 },
  { in: "cut-facade-night.jpg",  out: "facade-night.jpg",   w: 1400 },
  { in: "cut-entrance.jpg",      out: "entrance.jpg",       w: 1400 },
  { in: "cut-terrace.jpg",       out: "terrace.jpg",        w: 1400 },
  { in: "cut-fountain-staff.jpg",out: "fountain.jpg",       w: 1100 },
  // --- Gemini Group's own Syrian sweets photography ---
  { in: "interior-1.jpg",        out: "sweet-baklava.jpg",  w: 1800 },
  { in: "interior-2.jpg",        out: "sweet-maamoul.jpg",  w: 1800 },
  { in: "interior-3.jpg",        out: "sweet-ghraybeh.jpg", w: 1800 },
  { in: "interior-4.jpg",        out: "sweet-maamoul-2.jpg",w: 1800 },
];

(async () => {
  let total = 0;
  for (const job of jobs) {
    const src = `${SRC}/${job.in}`;
    if (!fs.existsSync(src)) { console.log("SKIP (missing)", job.in); continue; }
    await sharp(src)
      .resize({ width: job.w, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(`${OUT}/${job.out}`);
    const kb = Math.round(fs.statSync(`${OUT}/${job.out}`).size / 1024);
    total += kb;
    const meta = await sharp(`${OUT}/${job.out}`).metadata();
    console.log(job.out.padEnd(22), `${meta.width}x${meta.height}`.padEnd(11), kb + "KB");
  }
  console.log("---- total", total + "KB");
})();
