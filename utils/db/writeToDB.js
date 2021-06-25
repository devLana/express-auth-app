const path = require("path");
const fs = require("fs");

module.exports = data => {
  return new Promise((resolve, reject) => {
    const databaseFile = path.resolve(process.cwd(), "database", "index.json");

    try {
      const db = fs.writeFileSync(databaseFile, data, "utf8");
      resolve(db);
    } catch (err) {
      reject(err);
    }
  });
};
