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
      .status(200)
      .json({ message: `Login for "${username}" verified`, status: 200, user });
  } catch (err) {
    return next(err);
  }
};
