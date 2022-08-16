const router = require("express").Router();
const User = require("../Controllers/UserControllers");
const verify = require("./auth");
//Add Users To Database
router.post("/register", User.register);

//Login Users
router.post("/login", User.login);

//user auth check
router.post("/auth", verify, User.auth);

module.exports = router;
