const express = require("express");

const router = require("./routes");
const error = require("./utils/Error");

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.use("/api", router);

app.all("*", (req, res, next) => {
  const err = error("Resource not found", 404);
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    return res.status(500).json({ message: "Server error", status: 500 });
  }

  return res
    .status(err.statusCode)
    .json({ message: err.message, status: err.statusCode });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
