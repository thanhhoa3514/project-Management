const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingsMiddleware = require("../../middlewares/client/setting.middleware")

const homeRoutes = require("./home-route");
const productRoutes = require("./products-route");
const searchRoutes = require("./search-route");
const cartRoutes = require("./cart-route");
const checkoutRoutes = require("./checkout-route");
const userRoutes = require("./user-route");
const chatRoutes = require("./chat-route");





module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use(userMiddleware.infoUser);
  app.use(settingsMiddleware.settingGeneral);



  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
  app.use("/search", searchRoutes);
  app.use("/cart", cartRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/user", userRoutes);
  app.use("/chat", chatRoutes);





};
