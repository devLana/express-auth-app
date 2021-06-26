const badRequest = require("../utils/badRequestError");

module.exports = (req, res, next) => {
  const { token } = req.params;

  const message = "Bad request";

  if (!token || !token.trim() || token.length !== 45) {
    return badRequest(next, `${message}. Invalid token`);
  }

  return next();
};
