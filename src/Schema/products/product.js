const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new Schema({
  productId:{
    type: Number,
    unique: true
  },
  productImage: {
    type: String,
    trim: true,
    required: "image is required"
  },
  productName: {
    type: String,
    trim: true,
    required: "brandName is required"
  },
  brandName: {
    type: String,
    trim: true,
    required: "brandName is required"
  },
  description: {
    type: String,
    trim: true,
    required: "description is required"
  },
  price: {
    type: String,
    trim: true,
    required: "price is required"
  },
  category: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true,
    required: "gender is required"
  },
  isnew: {
    default: true,
    type: Boolean
  },
  sale: {
    default: false,
    type: Boolean
  },
  outOfStock: {
    default: false,
    type: Boolean
  },
  discountByPercentage: {
    type: Number
  },
  rating: {
    type: Number
  },
  count: {
    type: Number
  },
  seller: {
    type: String
  },
  type: {
    type: String
  }
});

productSchema.plugin(AutoIncrement, { inc_field: 'productId', start_seq: 10000 });

module.exports = mongoose.model("Product", productSchema);
