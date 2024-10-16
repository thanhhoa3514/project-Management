const Product = require("../../models/product-model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const bodyParser = require("body-parser");

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

  res.redirect(req.get("Referrer") || "/");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids }},{
         deleted: true,
          deletedAt: new Date()

        } );
      break;
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


  res.redirect(req.get("Referrer") || "/");
};