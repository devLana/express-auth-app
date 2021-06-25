const path = require("path");
const fs = require("fs");

module.exports = data => {
  return new Promise((resolve, reject) => {
    const databaseFile = path.resolve(process.cwd(), "database", "index.json");

    try {
      fs.writeFileSync(databaseFile, data, "utf8");
    } catch (err) {
      reject(err);
    }
  });
};
