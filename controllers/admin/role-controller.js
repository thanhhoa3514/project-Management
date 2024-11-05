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
