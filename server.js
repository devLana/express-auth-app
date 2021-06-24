const express = require("express");

const app = express();
const port = process.env.PORT || 3030;

const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
