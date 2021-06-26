const DB = require("../utils/db");
const error = require("../utils/Error");

module.exports = async (req, res, next) => {
  const { token } = req.params;

  try {
    const db = await DB.readFromDB();
    const data = JSON.parse(db);

    const isValidToken = data.find(obj => token === obj.token);

    if (!isValidToken) {
      const err = error("Not found. Invalid token", 404);
      throw err;
    }

    return res
      .status(200)
      .json({ message: "User token verified", status: 200 });
  } catch (err) {
    return next(err);
  }
};
