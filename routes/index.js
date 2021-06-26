const express = require("express");

const signUp = require("../controllers/signUp");
const signIn = require("../controllers/signIn");
const signOut = require("../controllers/signOut");
const validateUser = require("../middleware/validateUser");
const validateToken = require("../middleware/validateToken");
const verifyUser = require("../middleware/verifyUser");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/signup", validateUser, signUp);
router.post("/signin", [validateUser, verifyUser], signIn);
router.post("/signout", [validateToken, verifyToken], signOut);

module.exports = router;
