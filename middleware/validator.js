const error = require("../utils/Error");

const badRequest = next => {
  const err = error("Bad request. Check your input values", 400);
  return next(err);
};

module.exports = (req, res, next) => {
  const { body } = req;
  const hasUsername = "username" in body;
  const hasPassword = "password" in body;

  if (!hasUsername || !hasPassword) {
    return badRequest(next);
  }

  const { username, password } = body;

  if (typeof username !== "string" || typeof password !== "string") {
    return badRequest(next);
  }

  if (!username || !username.trim() || !password) {
    return badRequest(next);
  }

  return next();
};
