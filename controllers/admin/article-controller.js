

// [GET] admin/articles/index

module.exports.index=async(req,res)=>{


    res.render("admin/pages/article/index",{
        pageTitle:"Dashboard page",
    });
};