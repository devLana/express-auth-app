const DB = require("../utils/db");
const getId = require("../utils/getId");
const generateToken = require("../utils/generateToken");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  if (!username.trim() || !password) {
    return res
      .status(400)
      .send({ message: "Bad request. Check your input values" });
  }

  try {
    const db = await DB.readFromDB();
    const data = JSON.parse(db);

    const userExists = data.some(({ username: user }) => {
      return username.toLowerCase() === user.toLowerCase();
    });

    if (userExists) {
      return res
        .status(403)
        .json({ message: "This username has been taken. Try another one" });
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
    return res.status(500).json({ message: "Server Error" });
  }
};
