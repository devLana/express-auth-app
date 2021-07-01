const error = require("../utils/Error");

module.exports = (req, res, next) => {
  const { token } = req.params;

  if (!token || !token.trim() || token.length !== 45) {
    const err = error("Invalid token. Logging user out", 403);
    throw err;
  }

  return next();
};
