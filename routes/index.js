const express = require("express");

const signIn = require("../controllers/signIn");

const router = express.Router();

router.post("/signin", signIn);

module.exports = router;
