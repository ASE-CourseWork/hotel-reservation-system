const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const Branch = require("../Models/BranchModel");

module.exports.login = async (req, res, next) => {
  try {
    //check if user is available
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Email Dosn't exists");
    //compare the password
    const match = req.body.password == user.password;
    if (!match) return res.status(400).json("Invalid Password");

    if (user && match) {
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          account: user.account,
          branch: user.branch != "" ? user.branch : "admin",
        },
        process.env.TOKEN_SECRET
      );
      res.json({
        Access_Token: token,
      });
      return;
    }
    res.send("failed");
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    //check if email already registered
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json("Email already exists");

    await Branch.find({ branch: req.body.branch }).then((resp) => {
      //register user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        account: req.body.account,
        branch: resp[0]._id,
      });
      user.save((error) => {
        if (error) {
          res.status(400).json("something went wrong" + error.message);
        } else {
          res.status(201).json("Registration success");
        }
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports.auth = async (req, res, next) => {
  res.json({ Success: true, Account: req.user.account });
};
