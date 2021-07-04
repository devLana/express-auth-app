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
      const err = error("Invalid username & password combination", 403);
      throw err;
    }

    if (userExists && userExists.token) {
      delete userExists.token;

      const newData = data.map(item => {
        if (item.id === userExists.id) {
          return userExists;
        }
        return item;
      });

      await DB.writeToDB(JSON.stringify(newData));

      const err = error("Previous session has ended. Sign in again", 403);
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
