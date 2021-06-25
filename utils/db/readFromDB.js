const path = require("path");
const fs = require("fs");

module.exports = () => {
  return new Promise((resolve, reject) => {
    const databaseFile = path.resolve(process.cwd(), "database", "index.json");

    // fs.readFile(databaseFile, "utf8", (err, db) => {
    //   if (err) {
    //     console.error(err);
    //     reject(err);
    //   }

    //   resolve(db);
    // });
    try {
      const db = fs.readFileSync(databaseFile, "utf8");
      resolve(db);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
