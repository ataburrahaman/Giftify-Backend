const mongoose = require("mongoose");
const { Schema } = mongoose;

const childSchema = new Schema({
  productDetails: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  productId:{
    type: Number
  },
  quantity: {
    type: Number
  }
});

const cartSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    cartItems: [childSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
