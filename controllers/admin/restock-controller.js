const Product = require("../../models/product-model");
const paginationHelpers = require("../../helpers/pagination");

module.exports.restock = async (req, res) => {
  let find = {
    deleted: true,
  };

  const countTotalItems = Product.countDocuments(find);
  let objectPagination = paginationHelpers(
    {
      currentPage: req.query.page || 1,
      limitPage: 4,
    },
    req.query,
    countTotalItems
  );

  const products = await Product.find(find)
    .limit(objectPagination.limitPage)
    .skip(objectPagination.skip);

  // console.log(products);
  res.render("admin/pages/restock/index", {
    pageTitle: "Restock page",
    products: products,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/restore/:id
module.exports.restockItem = async (req, res) => {
  const productId = req.params.id;

  await Product.updateOne(
    { _id: productId },
    {
      deleted: true,
      restoreBy: {
        account_Id: res.locals.user.id,
        restoreAt: new Date(),
      },
    }
  );
  req.flash("success", "Restock successfully!");

  res.redirect(req.get("Referrer") || "/");
};

//  [PATCH] admin/restock/:status/:id

module.exports.changeStatus= async (req, res) => {

  const status = req.params.status;
  const productId = req.params.id;

  const updatedBy={
    account_Id: res.locals.user.id,
    updateAt: new Date()
  };

  await Product.updateOne({ _id: productId }, {
     status: status,
     $push: {
      updatedBy: updatedBy,
    }
  });

  req.flash("success", "Successfully updated!");

  res.redirect(req.get("Referrer") || "/");

};
