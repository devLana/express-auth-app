module.exports = arr => {
  const arrLength = arr.length;
  // const arrIndexLength = arr.length - 1;

  // return Math.floor(Math.random() * (arrIndexLength - (0 + 1))) + 0;
  return Math.floor(Math.random() * arrLength);
};
