const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account-model");
const Product = require("../../models/product-model");
const User = require("../../models/user-model");

// [GET] admin/dashboard

module.exports.dashboard = async (req, res) => {
  const statistics = {
    categoryProduct: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };
  async function countDocuments(model, conditions) {
    return model.countDocuments(conditions);
  }
  statistics.categoryProduct.total = await countDocuments(ProductCategory, {
    deleted: false,
  });
  statistics.categoryProduct.active = await countDocuments(ProductCategory, {
    status: "active",
    deleted: false,
  });
  statistics.categoryProduct.inactive = await countDocuments(ProductCategory, {
    status: "inactive",
    deleted: false,
  });

  statistics.product.total = await countDocuments(Product, {
    deleted: false,
  });
  statistics.product.active = await countDocuments(Product, {
    status: "active",
    deleted: false,
  });
  statistics.product.inactive = await countDocuments(Product, {
    status: "inactive",
    deleted: false,
  });

  statistics.account.total = await countDocuments(Account, {
    deleted: false,
  });
  statistics.account.active = await countDocuments(Account, {
    status: "active",
    deleted: false,
  });
  statistics.account.inactive = await countDocuments(Account, {
    status: "inactive",
    deleted: false,
  });

  statistics.user.total = await countDocuments(User, {
    deleted: false,
  });
  statistics.user.active = await countDocuments(User, {
    status: "active",
    deleted: false,
  });
  statistics.user.inactive = await countDocuments(User, {
    status: "inactive",
    deleted: false,
  });
  res.render("admin/pages/dashboard/index", {
    pageTitle: "Dashboard page",
    statistics: statistics,
  });
};
