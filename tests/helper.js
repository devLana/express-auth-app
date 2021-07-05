const DB = require("../utils/db");

module.exports = async () => {
  const data = [{ id: 1, username: "Jack", password: "1234abc" }];
  await DB.writeToDB(JSON.stringify(data));
};
