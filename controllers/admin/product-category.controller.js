
const ProductCategory = require("../../models/product-category.model");
const systemConfig=require("../../config/system");



// [GET] admin/products-category
module.exports.index = async (req, res) => {

    // Filter products by status deleted
    let find = {
      deleted: false,
    };


      // Query products
    const records = await ProductCategory.find(find);

    res.render("admin/pages/products-category/index", {
      pageTitle: "Category product page",
      records:records
    });
};
// [GET] admin/products-category/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products-category/create", {
      pageTitle: "Create Products Category",
    });
};

// [POST] admin/products-category/create

module.exports.createCategoryPOST = async (req, res) => {

    if(req.body.position==""){
      const countDocuments = await ProductCategory.countDocuments();
      req.body.position=countDocuments+1;
    }else{
      req.body.position=parseInt(req.body.position);
    }


    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};