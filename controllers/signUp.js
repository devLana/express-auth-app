const DB = require("../utils/db");
const getId = require("../utils/getId");
const generateToken = require("../utils/generateToken");
const error = require("../utils/Error");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username.trim() || !password) {
    const err = error("Bad request. Check your input values", 400);
    return next(err);
  }

  try {
    const db = await DB.readFromDB();
    const data = JSON.parse(db);

    const userExists = data.some(({ username: user }) => {
      return username.toLowerCase() === user.toLowerCase();
    });

    if (userExists) {
      const err = error("This username has been taken. Try another one", 403);
      return next(err);
    }

    const id = getId(data);
    const token = generateToken();
    const newUser = { id, username, password, token };
    const newData = [...data, newUser];

    await DB.writeToDB(JSON.stringify(newData));

    delete newUser.id;
    delete newUser.password;

    return res
      .status(201)
      .json({ message: `New user "${username}" created`, user: newUser });
  } catch (err) {
    return next(err);
  }
};
