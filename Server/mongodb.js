require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.DB;
try {
  mongoose.connect(uri);
} catch (e) {
  console.log(e);
}
