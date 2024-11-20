const Product= require("../../models/product-model");
const productHelpers = require("../../helpers/products");

// [GET] /search
module.exports.index= async (req, res) => {

    const keyword= req.query.keyword;

    let newProducts=[];
    
    // if keyword is existing

    if(keyword){
        const regex=new RegExp(keyword,"i");
        const products= await Product.find({
            $or: [
                {name: regex},
                {description: regex},
                {title: regex}
            ],
            deleted:false,
            status:"active",
        });
        // console.log(products);
        newProducts=productHelpers.priceNewProducts(products);
    }
    res.render("client/pages/search/index", {
        pageTitle: "Results",
        keyword:keyword,
        products:newProducts
    });
};