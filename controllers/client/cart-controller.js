const Cart=require("../../models/cart-model");

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