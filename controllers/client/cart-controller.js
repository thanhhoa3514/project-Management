const Cart=require("../../models/cart-model");
const Product = require("../../models/product-model");
const productHelpers = require("../../helpers/products");

// [POST] cart/add/:id
module.exports.addPOST= async(req, res) => {
    const productId=req.params.productId;
    const quantity=parseInt(req.body.quantity);

    const cartId = req.cookies.cartId;
    // console.log(productId);
    // console.log(quantity);
    // console.log(cartId);
    const cart= await Cart.findOne({_id: cartId});


    // console.log(cart.products);
    const existingProducts = cart.products.find(item=> item.product_id === productId);
    if(existingProducts){
        // Update existing
        const quantityNew=quantity+existingProducts.quantity;
        // Check in database
        await Cart.updateOne({_id: cartId, "products.product_id": productId}, {
            $set: {
                "products.$.quantity": quantityNew
            }
        });
        req.flash('success', "Your product has been updated!");
    }else{
        
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }
        
        // Update collection that go a same id with cookies
        await Cart.updateOne({_id:cartId},{
            $push: {
                products: objectCart
            }
        } );
    }
    req.flash('success', "Added product to cart successfully");
    res.redirect(req.get("Referrer") || "/");

}

// [GET] products/cart/:productId
module.exports.index=async(req,res) => {

    const cartId = req.cookies.cartId;

    const cart= await Cart.findOne({_id: cartId});

    // console.log(cart);
    if(cart.products.length > 0){
        for (const item of cart.products) {

            const productId=item.product_id;

            const productInfo= await Product.findOne({
                _id: productId,
                
            }).select("title thumbnail slug price discountPercentage");

            // Calculating new price for each product
            productInfo.priceNew=productHelpers.priceNewOneProduct(productInfo);

            // Add key 
            item.productInfo=productInfo;

            // Total price of each product
            item.totalPrice=productInfo.priceNew*item.quantity;
        }
    }

    // Total price of all products
    cart.totalPrice=cart.products.reduce((sum,item)=>{
        return sum+item.totalPrice;
    },0);
    // console.log(cart.products);
    res.render("client/pages/cart/index", {
        pageTitle: "Cart",
        cartDetail:cart
    });
};

// [GET] products/cart/delete/:productId

module.exports.deleteProduct= async (req, res) => {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;

    await Cart.updateOne({
        _id:cartId,

    },{
        $pull: {
            products: {
                product_id: productId
            }
        }
    });
    req.flash('success',"Deleted product out of a cart successfully");
    // res.send("ok");
    res.redirect(req.get("Referrer") || "/");
    
};