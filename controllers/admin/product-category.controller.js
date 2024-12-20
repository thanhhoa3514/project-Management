const ProductCategory = require("../../models/product-category.model");
const filterStatusCategoryHelpers = require("../../helpers/filterStatus");
const systemConfig = require("../../config/system");
const createTreeCategoryHelpers = require("../../helpers/createTreeCategory");
const Account = require("../../models/account-model");
const paginationHelpers = require("../../helpers/pagination");


// [GET] admin/products-category
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusCategoryHelpers(req.query);

  // Filter products by status deleted
  let find = {
    deleted: false,
  };

  // Filter products by status if status exists
  if (req.query.status) {
    // Append status to query
    find.status = req.query.status;
  }

  // Pagination
  const countTotalItemsPage = await ProductCategory.countDocuments(find);

  let objectPagination = paginationHelpers(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countTotalItemsPage
  );

  // End pagination

  // Query products
  const records = await ProductCategory.find(find)
  

  // Create the level
  const newRecords = createTreeCategoryHelpers.tree(records);

  for (const record of records) {

    // Take out the information of users who created product
    const userCreated = await Account.findOne({
      _id: record.createdBy.account_Id,
    });

    // If user is already existing add new fields by locals variables user
    if (userCreated) {
      record.accountFullName = userCreated.fullName;
    }

    // Take out the information of users who updated product recently
    const updatedRecently=record.updatedBy[record.updatedBy.length-1];
    // console.log(updatedByRecently);


    // Check if the product has been updated recently
    if(updatedRecently){
      const userUpdatedRecently = await Account.findOne({
        _id: updatedRecently.account_Id,
      });

      updatedRecently.accountFullName=userUpdatedRecently.fullName;
    }
    
  }

  res.render("admin/pages/products-category/index", {
    pageTitle: "Category product page",
    filterStatus: filterStatus,
    records: newRecords,
  
  });
};

// [PATCH] /admin/products/change-status-category/:inactive/:123
// module.exports.changeStatusCategory = async (req, res) => {

//   const status=req.params.status;

//   const idCategory=req.params.id;

//   await ProductCategory.updateOne({_id:idCategory},{status:status});

//   res.redirect(req.get("Referrer") || "/");
// };

// [GET] admin/products-category/create
module.exports.create = async (req, res) => {
  // const permissions=res.locals.role.Permission_groups;
  // console.log(permissions);
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  // Create the level
  const newRecords = createTreeCategoryHelpers.tree(records);

  res.render("admin/pages/products-category/create", {
    pageTitle: "Create Products Category",
    records: newRecords,
  });
};

// [POST] admin/products-category/create

module.exports.createCategoryPOST = async (req, res) => {

  // const permissions=res.locals.role.Permission_groups;
  // console.log(permissions);
  if (req.body.position == "") {
    const countDocuments = await ProductCategory.countDocuments();
    req.body.position = countDocuments + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.createdBy = {
    account_Id: res.locals.user.id,
  };

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

// [GET] admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    
    const idCategory = req.params.id;
    // console.log(idCategory);
  
    const record = await ProductCategory.findOne({
      _id: idCategory,
      deleted: false,
    });
    // console.log(record);
  
    const data = await ProductCategory.find({
      deleted: false,
    });
  
    const newRecords = createTreeCategoryHelpers.tree(data);
  
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Edit Products Category",
      record: record,
      tree: newRecords,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    
  }
};

// [PATCH] admin/products-category/edit/:id

module.exports.editPATCH = async (req, res) => {
  const idCategory = req.params.id;

  req.body.position = parseInt(req.body.position);
  try {

    const updatedBy={
      account_Id: res.locals.user.id,
      updateAt: new Date()
    };

    await ProductCategory.updateOne(
      {
        _id: idCategory,
      },
      {
        ...req.body,
        $push: {
          updatedBy: updatedBy,
        }
      },
    );
    req.flash("success","Successfully updated");
  } catch (error) {
    req.flash("error","Error updating");
    console.log(error);
    return res.status(500).send("Server Error");
  }

  res.redirect(req.get("Referrer") || "/");

};

// [GET] /admin/products-category/detail/:id

module.exports.detailCategory=async(req, res) => {
  try {
    
    const find={
      deleted:false,
      _id:req.params.id
    };
  
    const record = await ProductCategory.findOne(find);
    console.log(record);
    // Render view with products and filter status
    res.render("admin/pages/products-category/detail", {
      pageTitle: record.title,
      record:record
    });
  } catch (error) {

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};