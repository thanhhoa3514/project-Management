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

    if(req.query.status){
        const index=filterStatus.findIndex(item=>item.status==req.query.status);

        if(index!=-1){
           
            filterStatus[index].class="active";
        }
        // console.log(index);
    }else {
        const index=filterStatus.findIndex(item=>item.status=="");
        filterStatus[index].class="active";
    }

    // console.log(req.query.status);
    let find={
        deleted: false
    };

    if(req.query.status){
        find.status=req.query.status;
    }

    const products= await Product.find(find);

    // console.log(products);

    res.render("admin/pages/products/index",{
        pageTitle:"Product page",
        products: products,
        filterStatus: filterStatus
    });
};