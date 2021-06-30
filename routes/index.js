const express = require("express");

const signUp = require("../controllers/signUp");
const signIn = require("../controllers/signIn");
const signOut = require("../controllers/signOut");
// const checkToken = require("../controllers/checkToken");
const validateUser = require("../middleware/validateUser");
const validateSignOut = require("../middleware/validateSignOut");
const verifyUser = require("../middleware/verifyUser");
const verifySignOut = require("../middleware/verifySignOut");
// const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/signup", validateUser, signUp);
router.post("/signin", [validateUser, verifyUser], signIn);
router.post("/signout", [validateSignOut, verifySignOut], signOut);
// router.get("/verifyToken/:token", validateToken, checkToken);

module.exports = router;
