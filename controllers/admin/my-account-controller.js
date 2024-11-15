
const Account = require("../../models/account-model");
const CryptoJS = require("crypto-js");

// [GET] admin/edit
module.exports.index = async (req, res) => {
    // console.log(res.locals.user);
    // Render view with products and filter status
    res.render("admin/pages/my-account/index", {
      pageTitle: "Account page",
    });
};

// [GET] admin/edit/
module.exports.edit = async (req, res) => {

    // Render view with current user's information
    res.render("admin/pages/my-account/edit", {
      pageTitle: "Edit account",
    });
}
// [PATCH] admin/my-account/edit
module.exports.editPATCH=async (req, res) => {
    const id = res.locals.user.id;

    const emailExists = await Account.findOne({
      _id: { $ne: id }, // exclude the current record
      email: req.body.email,
      deleted: false,
    });
  
    if (emailExists) {
      req.flash("error", "Email already exists");
    } else {
      if (req.body.password) {
        const cipherText = CryptoJS.SHA256(req.body.password).toString();
        req.body.password = cipherText;
      } else {
        delete req.body.password;
      }
      //  console.log(req.body);
      await Account.updateOne({ _id: id }, req.body);
      req.flash("success", "Successfully updated!");
    }
    res.redirect(req.get("Referrer") || "/");

};