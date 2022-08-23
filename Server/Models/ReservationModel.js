//creating booked rooms collection
const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  booking: [
    {
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
        required: true,
      },
      noOfRooms: { type: Number, required: true },
    },
  ],
  payment: { type: Boolean, required: true },
  arrival: { type: Date, required: true },
  departure: { type: Date, required: true },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branches",
    required: true,
  },
  total: { type: Number, required: true },
});

const ReservationModel = mongoose.model("reservations", ReservationSchema);

module.exports = ReservationModel;
