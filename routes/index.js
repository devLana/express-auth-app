const express = require("express");

const signUp = require("../controllers/signUp");
const signIn = require("../controllers/signIn");
const validator = require("../middleware/validator");
const verifyUser = require("../middleware/verifyUser");

const router = express.Router();

router.post("/signup", validator, signUp);
router.post("/signin", [validator, verifyUser], signIn);

module.exports = router;
