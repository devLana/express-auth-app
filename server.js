require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const router = require("./routes");
const error = require("./utils/Error");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:9000",
      "http://localhost:9090",
      "https://devlana-auth-app.netlify.app",
    ],
    methods: ["GET,POST"],
  })
);
app.use(helmet());
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

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
