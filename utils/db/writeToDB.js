const path = require("path");
const fs = require("fs");

module.exports = data => {
  return new Promise((resolve, reject) => {
    const databaseFile = path.resolve(process.cwd(), "database", "index.json");

    // fs.writeFile(databaseFile, data, "utf8", (err, db) => {
    //   if (err) {
    //     console.error(err);
    //     reject(err);
    //   }

    //   resolve(db);
    // });
    try {
      const db = fs.writeFileSync(databaseFile, data, "utf8");
      resolve(db);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
