//creating roomtypes table AKA collections
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  noOfPeople: { type: Number, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  desc: { type: String, required: true },
});

const RoomType = mongoose.model("RoomType", roomSchema);

module.exports = RoomType;
