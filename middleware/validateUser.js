const badRequest = require("../utils/badRequestError");

module.exports = (req, res, next) => {
  const { body } = req;
  const hasUsername = "username" in body;
  const hasPassword = "password" in body;

  const message = "Bad request. Check your input values";

  if (!hasUsername || !hasPassword) {
    return badRequest(next, message);
  }

  const { username, password } = body;

  if (typeof username !== "string" || typeof password !== "string") {
    return badRequest(next, message);
  }

  if (!username || !username.trim() || !password) {
    return badRequest(next, message);
  }

  return next();
};
