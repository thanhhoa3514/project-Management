const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // user_id:String,
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: String,
      address: String,
    },
    products: [
      {
        product_id: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
      required: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema, "orders");
// console.log(productSchema);

module.exports = Order;
