const Product=require("../../models/product-model");

// [GET] admin/products

module.exports.index= async(req, res) => {
    // console.log(req.query.status);

    let filterStatus=[
        {
            name:"All",
            status:"",
            class:""
        },
        {
            name:"Active",
            status:"active",
            class:""
        },
        {
            name:"Inactive",
            status:"inactive",
            class:""
        }
    ];


    // Check if status is active and finding where the element is active 
    if(req.query.status){
        const index=filterStatus.findIndex(item=>item.status==req.query.status);

        if(index!=-1){
            // Make the current status active by adding the class
            filterStatus[index].class="active";
        }

    }else {

        const index=filterStatus.findIndex(item=>item.status=="");
        filterStatus[index].class="active";
    }

 

    // Filter products by status deleted
    let find={
        deleted: false
    };


    // Filter products by status if status exists
    if(req.query.status){
        
        // Append status to query
        find.status=req.query.status;
    }

    let keyword="";

    if(req.query.keyword){
        keyword=req.query.keyword;
        
        // Append keyword to query
        const regex=new RegExp(keyword,"i");// i is no special character is lower or upper case
        find.title=regex;
    }

    // Query products
    const products= await Product.find(find);

    // console.log(products);


    // Render view with products and filter status
    res.render("admin/pages/products/index",{
        pageTitle:"Product page",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
};