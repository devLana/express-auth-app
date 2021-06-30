const badRequest = require("../utils/badRequestError");

module.exports = (req, res, next) => {
  const { token } = req.params;

  const message = "Bad request";

  if (!token || !token.trim() || token.length !== 45) {
    return badRequest(next, "Invalid token. Logging user out");
  }

  return next();
};
