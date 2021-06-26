const DB = require("../utils/db");
const error = require("../utils/Error");

module.exports = async (req, res, next) => {
  const { username, token } = req.body;

  try {
    const db = await DB.readFromDB();
    const data = JSON.parse(db);

    const userExists = data.find(({ username: user, token: authToken }) => {
      return (
        username.toLowerCase() === user.toLowerCase() && token === authToken
      );
    });

    if (!userExists) {
      const err = error("Invalid user credentials", 403);
      throw err;
    }

    req.data = {
      username: userExists.username,
      db: data,
    };

    next();
  } catch (err) {
    next(err);
  }
};
