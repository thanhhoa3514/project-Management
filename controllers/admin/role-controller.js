const Role = require("../../models/role-model");
const systemConfig = require("../../config/system");

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
