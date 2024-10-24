
const ProductCategory = require("../../models/product-category.model");
const filterStatusCategoryHelpers = require("../../helpers/filterStatus");
const systemConfig=require("../../config/system");



// [GET] admin/products-category
module.exports.index = async (req, res) => {

  const filterStatus = filterStatusCategoryHelpers(req.query);

    // Filter products by status deleted
    let find = {
      deleted: false,
    };

    // Filter products by status if status exists
  if (req.query.status) {
    // Append status to query
    find.status = req.query.status;
  }

      // Query products
    const records = await ProductCategory.find(find);

    res.render("admin/pages/products-category/index", {
      pageTitle: "Category product page",
      filterStatus: filterStatus,
      records:records
    });
};

// [PATCH] /admin/products/change-status-category/:inactive/:123
// module.exports.changeStatusCategory = async (req, res) => {


//   const status=req.params.status;

//   const idCategory=req.params.id;


//   await ProductCategory.updateOne({_id:idCategory},{status:status});


//   res.redirect(req.get("Referrer") || "/");
// };

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