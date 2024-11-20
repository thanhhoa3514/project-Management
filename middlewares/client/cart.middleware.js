const Cart = require("../../models/cart-model");
module.exports.cartId = async (req, res, next) => {
  // console.log("Always go through here");
  // console.log(req.cookies.cartId);

  if (!req.cookies.cartId) {
    // Create a new cart object
    const cart = new Cart();
    await cart.save();


    const expiresCookie=24*60*60*1000;
    // Save the cart id into cookie
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie),
      
    });
  } else {
    // Take the existing cart object
  }

  next();
};
