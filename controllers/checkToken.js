const DB = require("../utils/db");
const error = require("../utils/Error");

module.exports = async (req, res, next) => {
  const { token } = req.params;

  try {
    const db = await DB.readFromDB();
    const data = JSON.parse(db);

    const isValidToken = data.find(obj => token === obj.token);

    if (!isValidToken) {
      const err = error("Invalid token. Logging user out", 403);
      throw err;
    }

    return res
      .status(200)
      .json({ message: "Token verified. User is logged in", status: 200 });
  } catch (err) {
    return next(err);
  }
};
