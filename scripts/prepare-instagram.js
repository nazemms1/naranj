/**
 * Prepares photographs taken from Naranj's own Instagram account (@naranj.sy)
 * for the site.
 *
 * Instagram serves story frames at 480px with the account's caption text burnt
 * into the lower third, so each job here carries the crop that removes that
 * text. Nothing is upscaled: these files are used at their native size, in the
 * arch panel and the gallery, never stretched across a full-bleed hero.
 *
 * Originals live in public/images/src (gitignored); run this after adding one.
 */
const sharp = require("sharp");
const fs = require("fs");

const OUT = "public/images";
const SRC = "public/images/src";

const jobs = [
  {
    in: "ig-courtyard-damascus.jpg",
    out: "courtyard-night.jpg",
    /* Drops the "دمشق · سوريا" caption burnt across the lower third. */
    crop: { left: 0, top: 0, width: 480, height: 615 },
  },
];

(async () => {
  if (!fs.existsSync(SRC)) {
    console.error(`missing ${SRC} — put the downloaded originals there first`);
    process.exit(1);
  }

  for (const job of jobs) {
    const from = `${SRC}/${job.in}`;
    if (!fs.existsSync(from)) {
      console.warn(`skip ${job.in} — not in ${SRC}`);
      continue;
    }

    const info = await sharp(from)
      .extract(job.crop)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(`${OUT}/${job.out}`);

    console.log(`${job.out}  ${info.width}x${info.height}  ${info.size}b`);
  }
})();
