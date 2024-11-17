const Article=require("../../models/article-model");
const systemConfig = require("../../config/system");
const Account = require("../../models/account-model");

// [GET] admin/articles/index

module.exports.index = async (req, res) => {

    // Filter products by status deleted
  let find = {
    deleted: false,
  };


  // Get products
  const articles= await Article.find(find);

//   for (const article of articles) {

//     // Take out the information of users who created product
//     const userCreated = await Account.findOne({
//       _id: article.createdBy.account_Id,
//     });

//     // If user is already existing add new fields by locals variables user
//     if (userCreated) {
//       product.accountFullName = userCreated.fullName;
//     }

//     // Take out the information of users who updated product recently
//     const updatedRecently=article.updatedBy[article.updatedBy.length-1];
//     // console.log(updatedByRecently);


//     // Check if the product has been updated recently
//     if(updatedRecently){
//       const userUpdatedRecently = await Account.findOne({
//         _id: updatedRecently.account_Id,
//       });

//       updatedRecently.accountFullName=userUpdatedRecently.fullName;
//     }
    
//   }
//   console.log(articles);
  res.render("admin/pages/article/index", {
    pageTitle: "Article",
    articles: articles
  });
};

// [GET] admin/articles/create
module.exports.createArticle = async (req, res) => {
  res.render("admin/pages/article/create", {
    pageTitle: "Create Article",
  });
};

// [POST] admin/articles/create
module.exports.createArticlePOST = async (req, res) => {
  //   console.log(req.body);
  // Check If the title  already exists
 
    const existTitle = await Article.findOne({
      title: req.body.title,
    });


    if (existTitle) {
      req.flash("error", "Title already exists!");
      res.redirect(req.get("Referrer") || "/");
      return;
    }

    req.body.author = res.locals.user.fullName;

    req.body.createdBy = {
      account_Id: res.locals.user.id,
    };
    //   console.log(req.body);

    const newArticle = new Article(req.body);
    await newArticle.save();

    req.flash("success", "Article created successfully");

    res.redirect(`${systemConfig.prefixAdmin}/articles`);

  
};


// [GET] admin/articles/edit/:id
module.exports.editArticle=async (req, res) => {
    try {
        const find = {
          deleted: false,
          _id: req.params.id,
        };
    
        const article = await Article.findOne(find);
    
        // const category = await ProductCategory.find({
        //   deleted: false,
        // });
    
        // Create the level
        //const newCategory = createTreeCategoryHelpers.tree(category);
    
        // Render view with products and filter status
        res.render("admin/pages/article/edit", {
          pageTitle: "Edit item",
          article: article,
        //   category: newCategory,
        });
      } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/articles`);
      }

};

// [PATCH] admin/articles/edit/:id
module.exports.editArticlePATCH=async(req, res)=>{
    // console.log(req.body);
    const id = req.params.id;
    req.body.author = res.locals.user.fullName;
    // if (req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }

    try {

        const updatedBy={
          account_Id: res.locals.user.id,
          updateAt: new Date()
        };
    
    
        await Article.updateOne({ _id: id }, {
          ...req.body,
          $push: {
            updatedBy: updatedBy,
          }
        });
        req.flash("success", "Successfully updated!");
        res.redirect(req.get("Referrer") || "/");
    } catch (error) {
        req.flash("error", "Error updating");
    }

}


// [GET] admin/articles/detail
module.exports.detail=async(req, res)=>{
    try {
        const find = {
          deleted: false,
          _id: req.params.id,
        };
    
        const article = await Article.findOne(find);
    
        res.render("admin/pages/article/detail",{
            pageTitle: "Detail Article",
            article:article
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/articles`);
    }
}