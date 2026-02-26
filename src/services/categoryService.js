const fs = require("fs");
const path = require("path");

const assetsPath = path.join(__dirname, "..", "..", "assets");

function getCategories() {
  return fs.readdirSync(assetsPath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const cfgPath = path.join(assetsPath, d.name, "config.json");
      if (!fs.existsSync(cfgPath)) return null;

      try {
        const config = JSON.parse(fs.readFileSync(cfgPath));
        return {
          name: d.name,
          wallpaper: path.join(assetsPath, d.name, "wallpaper.png"),
          apps: config.apps
        };
      } catch (err) {
        console.warn(`Skipping category ${d.name}: failed to read config.json`, err);
        return null;
      }
    })
    .filter(Boolean);
}

module.exports = { getCategories };
