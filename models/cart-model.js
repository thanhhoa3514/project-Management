const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id:String,
    products:[
        {
            product_id:String,
            quantity:Number
        }
    ],
    lastAccessed: {
      type: Date,
      default: Date.now,
      index: true // Add index for better query performance
    },
    isGuest: {
      type: Boolean,
      default: true // Mark if cart belongs to non-logged in user
    }
  },
  
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema, "carts");
// console.log(productSchema);
// Update lastAccessed timestamp whenever cart is accessed
cartSchema.methods.updateLastAccessed = function() {
  this.lastAccessed = new Date();
  return this.save();
};

// Static method to clean up old guest carts
cartSchema.statics.cleanupOldGuestCarts = async function() {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  
  try {
    const result = await this.deleteMany({
      isGuest: true,
      lastAccessed: { $lt: threeDaysAgo }
    });
    
    console.log(`Cleaned up ${result.deletedCount} abandoned guest carts`);
    return result;
  } catch (error) {
    console.error('Error cleaning up guest carts:', error);
    throw error;
  }
};
module.exports = Cart;
