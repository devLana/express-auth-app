module.exports = arr => {
  const min = 0;
  const max = arr.length;

  return Math.floor(Math.random() * (max - min)) + min;
};
