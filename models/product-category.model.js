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
  createdBy: {
    account_Id: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  deleted: {
    type: Boolean,
    default: false,
    required: false,
  },
  deletedBy: {
    account_Id: String,
    deletedAt: Date,
  },
  updatedBy: [
    {
      account_Id: String,
      updatedAt: Date,
    }
  ],
},{
  timestamps: true,
});
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category");

module.exports = ProductCategory;