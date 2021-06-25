const path = require("path");
const fs = require("fs");

module.exports = () => {
  return new Promise((resolve, reject) => {
    const databaseFile = path.resolve(process.cwd(), "database", "index.json");

    try {
      const db = fs.readFileSync(databaseFile, "utf8");
      resolve(db);
    } catch (err) {
      reject(err);
    }
  });
};
