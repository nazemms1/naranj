const sharp = require("sharp");
const S = "public/images/src/naranj-fran.png";
const parts = {
  "facade-night":   { left: 0,    top: 0,    width: 828,  height: 1085 },
  "entrance":       { left: 832,  top: 0,    width: 1088, height: 1085 },
  "terrace":        { left: 0,    top: 1090, width: 1210, height: 830  },
  "fountain-staff": { left: 1214, top: 1090, width: 706,  height: 830  },
};
(async () => {
  for (const [name, box] of Object.entries(parts)) {
    await sharp(S).extract(box).jpeg({ quality: 90 }).toFile(`public/images/src/cut-${name}.jpg`);
    console.log("cut", name, box.width + "x" + box.height);
  }
})();
