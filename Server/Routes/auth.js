const jwt = require("jsonwebtoken");

//verify the jwt token against the expected token secret
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access Denied" + token);

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).send("Invalid Token");
  }
};
