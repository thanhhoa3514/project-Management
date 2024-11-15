const Account = require("../../models/account-model");
const systemConfig = require("../../config/system");
const { json } = require("body-parser");
const CryptoJS = require("crypto-js");
const Role = require("../../models/role-model");

// [GET] admin/accounts

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Account.find(find).select("-password -token");

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    });
    record.role = role;
  }
  res.render("admin/pages/accounts/index", {
    pageTitle: "List of accounts",
    records: records,
  });
};

// [GET] admin/Accounts/create

module.exports.createAccount = async (req, res, next) => {
  const roles = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/accounts/create", {
    pageTitle: "Create new account",
    roles: roles,
  });
};

// [POST] /admin/accounts/create

module.exports.createAccountPOST = async (req, res, next) => {
  const emailExists = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (emailExists) {
    req.flash("error", "Email already exists");
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
    return;
  } else {
    const cipherText = CryptoJS.SHA256(req.body.password).toString();
    req.body.password = cipherText;
    const record = new Account(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};


// [GET] admin/accounts/edit/:id
module.exports.editAccount=async(req, res) => {

    let find={
        _id: req.params.id,
        deleted: false
    }
    try {
        const data= await Account.findOne(find);
        const roles= await Role.find({
            deleted: false
        });

        res.render("admin/pages/accounts/edit", {
        pageTitle: "Edit Account",
        data:data,
        roles: roles,
        });
    } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        
    }

};


// [PATCH] /admin/accounts/edit/:id

module.exports.editAccountPATCH=async(req, res) => {
    // console.log(req.body);

    const id=req.params.id;

    const emailExists = await Account.findOne({
        _id: {$ne: id},  // exclude the current record
        email: req.body.email,
        deleted: false,
    });

    if(emailExists){
        req.flash("error", "Email already exists");
        
    }else{

        if(req.body.password){
            const cipherText = CryptoJS.SHA256(req.body.password).toString();
            req.body.password = cipherText;
        }else{
            delete req.body.password;
        }
        //  console.log(req.body);
        await Account.updateOne({_id:id},req.body);
        req.flash("success","Successfully updated!");
    }
    res.redirect(req.get("Referrer") || "/");

}

// [GET] admin/account/details/:id
module.exports.detailAccount= async(req, res)=> {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const record = await Account.findOne(find).select("-password -token");
    console.log(record);
    // Render view with products and filter status
    res.render("admin/pages/accounts/detail", {
      pageTitle: DetailAccounts,
      record: record,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
}