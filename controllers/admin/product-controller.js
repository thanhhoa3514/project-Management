const Product=require("../../models/product-model");
const filterStatusHelpers=require("../../helpers/filterStatus");
const searchHelpers=require("../../helpers/search");


// [GET] admin/products

module.exports.index= async(req, res) => {
    // console.log(req.query.status);

    // Filter status from request query string
    const filterStatus = filterStatusHelpers(req.query);


    // Filter products by status deleted
    let find={
        deleted: false
    };


    // Filter products by status if status exists
    if(req.query.status){
        
        // Append status to query
        find.status=req.query.status;
    }

    const objectSearch=searchHelpers(req.query);


    if(objectSearch.regex){
    
        find.title=objectSearch.regex;
    }

    // Query products
    const products= await Product.find(find);

    // console.log(products);


    // Render view with products and filter status
    res.render("admin/pages/products/index",{
        pageTitle:"Product page",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    });
};