const path = require("path");
const fs = require("fs");

class DB {
  constructor() {
    this.databaseFile = path.resolve(process.cwd(), "database", "index.json");
  }

  readFromDB = () => {
    return new Promise((resolve, reject) => {
      try {
        const data = fs.readFileSync(this.databaseFile, "utf8");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  writeToDB = data => {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(this.databaseFile, data, "utf8");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
}

module.exports = new DB();
