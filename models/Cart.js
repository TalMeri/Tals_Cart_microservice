const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  nourishmentId: String,
  amount: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less than 1."],
  }
});

const CartSchema = new Schema({
  userId: String,
  items: {
    type: [ItemSchema],
    default: [],
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("cart", CartSchema);
