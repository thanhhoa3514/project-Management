const Product = require("../../models/product-model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");

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
  let objectPagination = {
    // page: parseInt(req.query.page, 10) || 1,
    currentPage: 1,
    limitItems: 4,
    // skip: (req.query.page - 1) * 5
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  // Check if page is not a number. If it's not, set it to 1 and skip to 0. This will prevent any errors.
  if(isNaN(objectPagination.currentPage)){
    objectPagination.currentPage = 1;
    objectPagination.skip = 0;
  }

  // Calculate the total number of pages skip
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;


  const countTotalItems = await Product.countDocuments(find);

  const totalPages=Math.ceil(countTotalItems / objectPagination.limitItems);

  objectPagination.totalPages = totalPages;


  // End pagination

  // Query products
  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

  // Render view with products and filter status
  res.render("admin/pages/products/index", {
    pageTitle: "Product page",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination:objectPagination
  });
};
