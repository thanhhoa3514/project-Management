const ProductCategory = require("../../models/product-category.model");
const createTreeCategoryHelpers = require("../../helpers/createTreeCategory");
module.exports.category = async(req,res,next)=>{
    // console.log("Always go through here");
    
    const productsCategory = await ProductCategory.find({
        deleted: false
    });
    const newProductsCategory = createTreeCategoryHelpers.tree(productsCategory);

        
    res.locals.layoutProductsCategory=newProductsCategory;

    next();
};