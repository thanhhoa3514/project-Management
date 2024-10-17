const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String, // the name of the product
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: "title", // the-name-of-the-product
    unique: true

  },
  deleted: {
    type: Boolean,
    default: false,
    required: false,
  },
  deletedAt: Date,
  restoreAt: Date,
},{
  timestamps: true,
  // toObject: { virtuals: true },
  // toJSON: { virtuals: true }
});
const Product = mongoose.model('Product', productSchema, "products");
// console.log(productSchema);

module.exports = Product;
