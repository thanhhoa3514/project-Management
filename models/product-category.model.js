const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
  title: String, 
  parent_id: {
    type:String, 
    default: "",
  },
  description: String,
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
},{
  timestamps: true,
});
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category");

module.exports = ProductCategory;