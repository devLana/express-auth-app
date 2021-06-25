module.exports = arr => {
  const maxId = arr.reduce((acc, user) => Math.max(acc, user.id), 0);
  return maxId + 1;
};
