const fs = require("fs");
const path = require("path");

const assetsPath = path.join(__dirname, "..", "..", "assets");

function getCategories() {
  return fs.readdirSync(assetsPath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const config = JSON.parse(
        fs.readFileSync(path.join(assetsPath, d.name, "config.json"))
      );
      return {
        name: d.name,
        wallpaper: path.join(assetsPath, d.name, "wallpaper.png"),
        apps: config.apps
      };
    });
}

module.exports = { getCategories };
