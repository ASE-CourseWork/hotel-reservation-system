//creating booked rooms collection
const mongoose = require("mongoose");

const BookedroomSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reservations",
    required: true,
  },
  roomsBooked: { type: Number, required: true },
});

const BookedRooms = mongoose.model("booked_rooms", BookedroomSchema);

module.exports = BookedRooms;
