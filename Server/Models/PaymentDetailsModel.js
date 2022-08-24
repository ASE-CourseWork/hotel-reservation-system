//creating booked rooms collection
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  cardNumber: { type: Number, required: true },
  cardName: { type: String, required: true },
  expirydate: { type: String, required: true },
  securitycode: { type: Number, required: true },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reservations",
    required: true,
  },
});

const PaymentDetails = mongoose.model("PaymentDetails", PaymentSchema);

module.exports = PaymentDetails;
