const DB = require("../utils/db");

module.exports = async (req, res, next) => {
  const { username, db } = req.data;

  try {
    const newData = db.map(obj => {
      if (username === obj.username) {
        const item = { ...obj };

        delete item.token;
        return item;
      }

      return obj;
    });

    await DB.writeToDB(JSON.stringify(newData));

    return res
      .status(200)
      .json({ message: `User "${username}" signed out`, status: 200 });
  } catch (err) {
    return next(err);
  }
};
