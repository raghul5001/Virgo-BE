const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
        type: Number, // Add price field
        required: true,
      },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
