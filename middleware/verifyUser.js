const DB = require("../utils/db");
const error = require("../utils/Error");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const db = await DB.readFromDB();
    const data = JSON.parse(db);

    const userExists = data.find(({ username: user, password: pass }) => {
      return username.toLowerCase() === user.toLowerCase() && password === pass;
    });

    if (!userExists) {
      const err = error("Invalid user & password combination", 403);
      throw err;
    } else if (userExists && userExists.token) {
      const err = error(`User ${username} is already logged in`, 403);
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
