const categoryMiddleware = require("../../middlewares/client/category.middleware");
const productRoutes = require("./products-route");

const homeRoutes = require("./home-route");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
};
