const productRoutes = require("./products-route");

const homeRoutes = require("./home-route");
module.exports = (app) => {
  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
};
