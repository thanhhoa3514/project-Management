const Role = require("../../models/role-model");
const systemConfig = require("../../config/system");
const { json } = require("body-parser");

// [GET] admin/roles

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index", {
    pageTitle: "Permissions",
    records: records,
  });
};

// [GET] admin/roles/create

module.exports.createRole = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Create Permissions",
  });
};

// [POST] admin/roles/create

module.exports.createRolePOST = async (req, res) => {
  // console.log(req.body);

  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] admin/roles/edit/:id

module.exports.editRole = async (req, res) => {

    try {
        
        let find={
            _id: req.params.id,
            deleted: false,
        }
    
        const data= await Role.findOne(find);
        //console.log(data);
    
        res.render("admin/pages/roles/edit", {
          pageTitle: "Create Permissions",
          data: data
        });
    } catch (error) {
       res.redirect(`${systemConfig.prefixAdmin}/roles`); 
    }

    //console.log(res.params.id);

  };



  // [PATCH] admin/roles/edit/:id

module.exports.editRolePATCH = async (req, res) => {

    try {
        
        const id=req.params.id;
        //console.log(req.body);
      
        await Role.updateOne({ _id:id }, req.body);
    
        req.flash("success","Successfully updated!");
        res.redirect(`${systemConfig.prefixAdmin}/roles`); 

    
        // res.redirect(req.get("Referrer") || "/");
    } catch (error) {
        req.flash("error","Updated Fail!");
        res.redirect(`${systemConfig.prefixAdmin}/roles`); 
    }
};



// [GET] admin/roles/permissions
module.exports.permissions = async (req, res) => {

  let find = {
    deleted: false,
  };

  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions",{
    pageTitle: "Authentication",
    records: records,
  });
};

module.exports.editPermissionPATCH = async (req, res) => {
  try {
    
    //console.log(req.body.permissions);
  
    const permissions = JSON.parse(req.body.permissions);
    // console.log(permissions);
  
    for (const item of permissions) {
      // const id=permission.id;
      // const permissions=permission.permissions;
  
      await Role.updateOne(
        { _id: item.id },
        { Permission_groups: item.permissions }
      );
    }
  
    req.flash("success","Successfully updated!");
  
    res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    req.flash("error","Updated Fail!");
    res.redirect(req.get("Referrer") || "/");
  }
};
