const Product = require("../../models/product-model");
const paginationHelpers = require("../../helpers/pagination");

module.exports.restock=async(req, res) => {
    let find={
        deleted: false
    }

    const countTotalItems=Product.countDocuments(find);
    let objectPagination = paginationHelpers(
        {
            currentPage: req.query.page || 1,
            limitPage: 4,
        },
        req.query,
        countTotalItems 
    );

    const products= await Product.find(find).limit(objectPagination.limitPage).skip(objectPagination.skip);

    // console.log(products);
    res.render("admin/pages/restock/index",{
        pageTitle:"Restock page",
        products: products,
        pagination: objectPagination,
    });
};