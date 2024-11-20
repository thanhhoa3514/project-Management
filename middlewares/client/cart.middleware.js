const Cart = require("../../models/cart-model");
module.exports.cartId = async (req, res, next) => {
  // console.log("Always go through here");
  // console.log(req.cookies.cartId);

  if (!req.cookies.cartId) {
    // Create a new cart object
    const cart = new Cart();
    await cart.save();


    const expiresCookie=365*24*60*60*1000;
    // Save the cart id into cookie
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie),
      
    });
  } else {
    // Take the existing cart object

    const cart= await Cart.findOne({_id:req.cookies.cartId})
    // console.log(cart);
    cart.totalQuantity=cart.products.reduce((sum,item) =>{
      return sum+item.quantity
    },0 );

    res.locals.miniCart=cart;
  }

  next();
};
