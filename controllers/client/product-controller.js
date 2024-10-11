const Product = require("../../models/product-model");
// console.log(Product);

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status:"active",
    deleted:false
  });

  const newProducts=products.map(item=>{
      item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
      return item
  });
  console.log(newProducts);
  res.render("client/pages/products/index", {
    pageTitle: "Products",
    products: newProducts, // Pass the products data to the template
  });
};
