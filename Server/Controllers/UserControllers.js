const User = require("../Models/UserModel");

module.exports.login = async (req, res, next) => {
  try {
    //check if user is available
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Email Dosn't exists");
    //compare the password
    const match = req.body.password == user.password;
    if (!match) return res.status(400).json("Invalid Password");
    //todo: jwt token
    res.json("login success");
  } catch (err) {
    next(err);
  }
};
module.exports.register = async (req, res, next) => {
  try {
    //check if email already registered
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json("Email already exists");

    //register user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save((error) => {
      if (error) {
        res.status(400).json("something went wrong" + error.message);
      } else {
        res.status(200).json("Registration success");
      }
    });
  } catch (err) {
    next(err);
  }
};
