const systemConfig = require("../../config/system");
const requireAuthenticationMiddleware = require("../../middlewares/admin/auth.middleware");
const dashboardRoutes = require("./dashboard-route");
const productRoutes = require("./product-route");
const restockProductRoutes = require("./restock-route");
const productCategoryRoutes = require("./products-category.route");
const roleRoutes = require("./role-route");
const accountRoutes = require("./account-route");
const authenticateRoutes = require("./auth-route");
const profileRoutes = require("./my-account.route");
const articleRoutes = require("./article-route");


module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(
    PATH_ADMIN + "/dashboard",
    requireAuthenticationMiddleware.requireAuth,
    dashboardRoutes
  );
  app.use(
    PATH_ADMIN + "/products",
    requireAuthenticationMiddleware.requireAuth,

    productRoutes
  );
  app.use(
    PATH_ADMIN + "/products-category",
    requireAuthenticationMiddleware.requireAuth,
    productCategoryRoutes
  );

  app.use(
    PATH_ADMIN + "/restock",
    requireAuthenticationMiddleware.requireAuth,
    restockProductRoutes
  );
  app.use(
    PATH_ADMIN + "/roles",
    requireAuthenticationMiddleware.requireAuth,
    roleRoutes
  );
  app.use(
    PATH_ADMIN + "/accounts",
    requireAuthenticationMiddleware.requireAuth,
    accountRoutes
  );
  app.use(PATH_ADMIN + "/auth", authenticateRoutes);
  app.use(
    PATH_ADMIN + "/my-account",
    requireAuthenticationMiddleware.requireAuth,
    profileRoutes
  );

  app.use(
    PATH_ADMIN + "/articles",
    requireAuthenticationMiddleware.requireAuth,
    articleRoutes
  );
};
