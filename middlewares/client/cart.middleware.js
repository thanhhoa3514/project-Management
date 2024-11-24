const Cart = require("../../models/cart-model");
module.exports.cartId = async (req, res, next) => {
  // console.log("Always go through here");
  // console.log(req.cookies.cartId);

  if (!req.cookies.cartId) {
    const cart = new Cart({
      isGuest: !res.locals.user, // Set based on whether user is logged in
      lastAccessed: new Date()
    });
    await cart.save();

    const expiresCookie = 365 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie),
    });
  } else {
    const cart = await Cart.findOne({ _id: req.cookies.cartId });
    if (cart) {
      // Update last accessed time
      await cart.updateLastAccessed();
      
      cart.totalQuantity = cart.products.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
      
      res.locals.miniCart = cart;
    }
  }
  next();
};
