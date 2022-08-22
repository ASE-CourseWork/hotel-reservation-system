//creating user table AKA collections
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  account: { type: String, required: true },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branches",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
