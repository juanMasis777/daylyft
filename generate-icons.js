const sharp = require("sharp");
const fs = require("fs");

const svgBuffer = fs.readFileSync("public/icon.svg");

sharp(svgBuffer).resize(192, 192).png().toFile("public/icon-192.png")
.then(() => console.log("icon-192.png created!"))
.catch(err => console.error(err));

sharp(svgBuffer).resize(512, 512).png().toFile("public/icon-512.png")
.then(() => console.log("icon-512.png created!"))
.catch(err => console.error(err));
