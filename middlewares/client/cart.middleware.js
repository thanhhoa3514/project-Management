const Cart = require("../../models/cart-model");
module.exports.cartId = async (req, res, next) => {
  // console.log("Always go through here");
  // console.log(req.cookies.cartId);
  try {
    const expiresCookie = 7 * 24 * 60 * 60 * 1000;
    if (!req.cookies.cartId || req.cookies.cartId === "undefined") {
      // Check if there's an existing empty guest cart
      const existingEmptyCart = await Cart.findOne({
        user_id: null,
        products: { $size: 0 },
        isGuest: true,
      });

      if (existingEmptyCart) {
        // Reuse existing empty cart
        res.cookie("cartId", existingEmptyCart._id.toString(), {
          expires: new Date(Date.now() + expiresCookie),
          httpOnly: true,
        });
        res.locals.miniCart = existingEmptyCart;
      } else {
        // Create new cart only if no empty cart exists
        const cart = new Cart({
          user_id: null,
          isGuest: true,
          lastAccessed: new Date(),
        });
        await cart.save();

        res.cookie("cartId", cart._id.toString(), {
          expires: new Date(Date.now() + expiresCookie),
          httpOnly: true,
        });
        res.locals.miniCart = cart;
      }
    } else {
      // Validate existing cart
      const cart = await Cart.findById(req.cookies.cartId);

      if (cart) {
        // Update last accessed time
        cart.lastAccessed = new Date();
        await cart.save();

        // Calculate total quantity
        cart.totalQuantity = cart.products.reduce((sum, item) => {
          return sum + item.quantity;
        }, 0);

        res.locals.miniCart = cart;
      }else {
        // If cart not found, follow the same empty cart creation logic
        const existingEmptyCart = await Cart.findOne({
          user_id: null,
          products: { $size: 0 },
          isGuest: true
        });

        if (existingEmptyCart) {
          res.cookie("cartId", existingEmptyCart._id.toString(), {
            expires: new Date(Date.now() + expiresCookie),
            httpOnly: true
          });
          res.locals.miniCart = existingEmptyCart;
        } else {
          const newCart = new Cart({
            user_id: null,
            isGuest: true,
            lastAccessed: new Date()
          });
          await newCart.save();

          res.cookie("cartId", newCart._id.toString(), {
            expires: new Date(Date.now() + expiresCookie),
            httpOnly: true
          });
          res.locals.miniCart = newCart;
        }
      }
    }
  } catch (error) {
    console.error("Cart middleware error:", error);
  } finally {
    next();
  }
};
// Scheduled cleanup job
async function cleanupGuestCarts() {
  try {
    // Remove empty guest carts older than 1 hour
    const oneHourAgo = new Date(Date.now() - 1*60 * 60 * 1000);
    
    const result = await Cart.deleteMany({
      isGuest: true,
      products: { $size: 0 },
      lastAccessed: { $lt: oneHourAgo }
    });

    console.log(`Cleaned up ${result.deletedCount} empty guest carts`);
  } catch (error) {
    console.error('Cart cleanup error:', error);
  }
}

// Schedule cleanup every hour
function scheduleCartCleanup() {
  // Run immediately on startup
  cleanupGuestCarts();
  
  // Then schedule hourly
  setInterval(cleanupGuestCarts, 1*60 * 60 * 1000);
}

// Call this when your app starts
// scheduleCartCleanup();

module.exports.scheduleCartCleanup = scheduleCartCleanup;