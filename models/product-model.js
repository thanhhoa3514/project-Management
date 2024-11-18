const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: String,
    products_category_id: {
      type: String,
      default: "",
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    featured:String,
    position: Number,
    slug: {
      type: String,
      slug: "title", // the-name-of-the-product
      unique: true,
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
    restoreBy: {
      account_Id: String,
      restoreAt: Date,
    },
    updatedBy: [
      {
        account_Id: String,
        updatedAt: Date,
      }
    ],
  },
  {
    timestamps: true,

  }
);
const Product = mongoose.model("Product", productSchema, "products");
// console.log(productSchema);

module.exports = Product;
