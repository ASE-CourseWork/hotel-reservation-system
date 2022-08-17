//creating roomtypes table AKA collections
const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  number: { type: Number, required: true },
});

const Branches = mongoose.model("Branches", branchSchema);

module.exports = Branches;
