//creating coupon table AKA collections
const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  coupon: { type: String, required: true },
  percentage: { type: Number, required: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
