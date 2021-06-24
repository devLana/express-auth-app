const express = require("express");

const signUp = require("../controllers/signUp");
const signIn = require("../controllers/signIn");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
