const error = require("./Error");

module.exports = (next, message) => {
  const err = error(message, 400);
  return next(err);
};
