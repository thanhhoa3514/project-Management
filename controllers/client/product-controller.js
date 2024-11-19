// [GET] /products

const Product = require("../../models/product-model");
const productHelpers = require("../../helpers/products");
const ProductCategory = require("../../models/product-category.model");
const productCategoryHelpers = require("../../helpers/product-category");
// console.log(Product);

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = productHelpers.priceNewProducts(products);
  res.render("client/pages/products/index", {
    pageTitle: "Products",
    products: newProducts, // Pass the products data to the template
  });
};

// [GET] products/slugCategory
module.exports.category = async (req, res) => {
  // console.log(req.params.slugCategory);
  try {
    const category = await ProductCategory.findOne({
      slug: req.params.slugCategory,
      status: "active",
      deleted: false,
    });
    const listSubCategory = await productCategoryHelpers.getSubCategory(category.id);


    const listSubCategoryID = listSubCategory.map((item) => item.id);


    const products = await Product.find({
      products_category_id: { $in: [category.id, ...listSubCategoryID] },
      // status: "active",
      deleted: false,
    }).sort({ position: "desc" });
    // console.log(products);

    const newProducts = productHelpers.priceNewProducts(products);

    res.render("client/pages/products/index", {
      pageTitle: category.title,
      products: newProducts, // Pass the products data to the template
    });
  } catch (error) {
    // redirect("/products");
    console.log(error);
    res.redirect(`/products`);
  }
};

// [GET] products/details
module.exports.detail = async (req, res) => {
  try {
    let find = {
      deleted: false,
      slug: req.params.slug,
      status: "active",
    };

    const product = await Product.findOne(find);
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
