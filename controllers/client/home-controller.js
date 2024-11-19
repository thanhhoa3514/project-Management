// const ProductCategory = require("../../models/product-category.model");
// const createTreeCategoryHelpers = require("../../helpers/createTreeCategory");
const Product = require("../../models/product-model");
const productHelpers=require("../../helpers/products");
// [GET] /home

module.exports.index = async (req, res) => {
  // Take the prevalent product out
  const productFeatured = await Product.find({
    featured:"1",
    deleted:false,
    status: "active",
  });
  const newProducts=productHelpers.priceNewProducts(productFeatured);
  // console.log(productFeatured);
  res.render("client/pages/home/index", {
    pageTitle: "Home page",
    productFeatured:newProducts
  });
};
