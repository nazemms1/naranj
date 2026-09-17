/**
 * Gemini Group's brand images. Two of them are composites (venue on the left,
 * dishes on the right), so only the venue panel is kept — the group's own
 * framing, just cropped to the part that identifies the restaurant.
 */
const sharp = require("sharp");
const fs = require("fs");

const jobs = [
  { in: "brand-jazeel.png", out: "brand-jazeel.jpg", crop: { left: 0, top: 0, width: 1193, height: 1082 } },
  { in: "brand-nara.png",   out: "brand-nara.jpg",   crop: { left: 0, top: 0, width: 1213, height: 1080 } },
  { in: "brand-nora.png",   out: "brand-nora.jpg" },
  { in: "brand-gemini.jpg", out: "brand-gemini.jpg" },
];

(async () => {
  for (const job of jobs) {
    const src = `public/images/src/${job.in}`;
    if (!fs.existsSync(src)) { console.log("SKIP", job.in); continue; }
    let pipe = sharp(src);
    if (job.crop) pipe = pipe.extract(job.crop);
    await pipe
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(`public/images/${job.out}`);
    const m = await sharp(`public/images/${job.out}`).metadata();
    const kb = Math.round(fs.statSync(`public/images/${job.out}`).size / 1024);
    console.log(job.out.padEnd(20), `${m.width}x${m.height}`.padEnd(11), kb + "KB");
  }
})();
