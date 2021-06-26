const DB = require("../utils/db");
const generateToken = require("../utils/generateToken");

module.exports = async (req, res, next) => {
  const { username, db } = req.data;

  try {
    const token = generateToken();
    const user = { username, token };

    const newData = db.map(obj => {
      if (username === obj.username) {
        const item = { ...obj };

        item.token = token;
        return item;
      }

      return obj;
    });

    await DB.writeToDB(JSON.stringify(newData));

    return res
      .status(201)
      .json({ message: `Login for "${username}" verified`, user });
  } catch (err) {
    return next(err);
  }
};
