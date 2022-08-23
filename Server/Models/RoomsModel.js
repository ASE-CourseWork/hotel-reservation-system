//creating roomtypes table AKA collections
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  RoomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true,
  },
  noOfRoom: { type: Number, required: true },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branches",
    required: true,
  },
  room: [
    {
      ID: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const RoomType = mongoose.model("Rooms", roomSchema);

module.exports = RoomType;
