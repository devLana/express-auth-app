const badRequest = require("../utils/badRequestError");

module.exports = (req, res, next) => {
  const { body } = req;
  const hasUsername = "username" in body;
  const hasToken = "token" in body;

  const message = "Bad request";

  if (!hasUsername || !hasToken) {
    return badRequest(next, message);
  }

  const { username, token } = body;

  if (typeof username !== "string" || typeof token !== "string") {
    return badRequest(next, message);
  }

  if (!username || !username.trim() || !token || !token.trim()) {
    return badRequest(next, message);
  }

  return next();
};
