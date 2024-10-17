const Product = require("../../models/product-model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const bodyParser = require("body-parser");
const systemConfig=require("../../config/system");

// [GET] admin/products

module.exports.index = async (req, res) => {
  // Filter status from request query string
  const filterStatus = filterStatusHelpers(req.query);

  // Filter products by status deleted
  let find = {
    deleted: false,
  };

  // Filter products by status if status exists
  if (req.query.status) {
    // Append status to query
    find.status = req.query.status;
  }

  // Import module
  const objectSearch = searchHelpers(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Pagination

  const countTotalItems = await Product.countDocuments(find);

  let objectPagination = paginationHelpers(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countTotalItems
  );

  // End pagination

  // Query products
  const products = await Product.find(find)
    .sort({position: "desc"})
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  // Render view with products and filter status
  res.render("admin/pages/products/index", {
    pageTitle: "Product page",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/change-status/:inactive/:123
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const productId = req.params.id;

  await Product.updateOne({ _id: productId }, { status: status });

  req.flash("success","Successfully updated!");

  res.redirect(req.get("Referrer") || "/");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success",`Successfully updated status ${ids.length} products !`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success",`Successfully updated status ${ids.length} products !`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids }},{
         deleted: true,
          deletedAt: new Date()

        } );
      req.flash("delete",`${ids.length} Items have been removed!`);

      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] =item.split("-");
        position= parseInt(position);

        // console.log(id);
        // console.log(position);

        await Product.updateOne({ _id:id},{
          position: position
        })
        req.flash("success",`${ids.length} Items have been change its position!`);

      }
    
    // case "restore-all":
    default:
      break;
  }
  res.redirect(req.get("Referrer") || "/");
};

// [DELETE] /admin/products/delete/:id

module.exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  await Product.updateOne({ _id: productId },
    { deleted: true,
      deletedAt: new Date()
    });

  req.flash("delete","Item has been removed!");
  
  res.redirect(req.get("Referrer") || "/");
};

// [GET] /admin/products/create
module.exports.createProduct = async (req, res) => {


  // Render view with products and filter status
  res.render("admin/pages/products/create", {
    pageTitle: "New item",
  });
};

// [POST] /admin/products/create

module.exports.createProductPOST = async (req, res) => {
  req.body.price=parseInt(req.body.price);
  req.body.discountPercentage=parseInt(req.body.discountPercentage);
  req.body.stock=parseInt(req.body.stock);

  if(req.body.position==""){
    const countDocuments = await Product.countDocuments();
    req.body.position=countDocuments+1;
    // console.log(countDocuments);
  }else{
    req.body.position=parseInt(req.body.position);
  }

  const newProduct = new Product(req.body);
  await newProduct.save();

  // Render view with products and filter status
  res.redirect(`${systemConfig.prefixAdmin}/products`)
};