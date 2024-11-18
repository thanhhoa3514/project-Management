// const ProductCategory = require("../../models/product-category.model");
// const createTreeCategoryHelpers = require("../../helpers/createTreeCategory");

// [GET] /home

module.exports.index=async(req, res) => {
    
  

  // Create the level
//   const newProductsCategory = createTreeCategoryHelpers.tree(records);
    res.render("client/pages/home/index",{
        pageTitle:"Home page",
        
    });
};