const router = require("express").Router();
const User = require("../Controllers/UserControllers");
//Add Users To Database
router.post("/register", User.register);

//Login Users
router.post("/login", User.login);

module.exports = router;
