module.exports = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).send("Bad request");
  }
};
