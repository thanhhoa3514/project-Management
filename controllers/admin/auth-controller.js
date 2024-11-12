const Account = require("../../models/account-model");
const CryptoJS = require("crypto-js");
const systemConfig = require("../../config/system");


// [GET] admin/auth/login

module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Login",
  });
};

// [POST] admin/auth/login
module.exports.loginPOST = async (req, res) => {
  // console.log(req.body);
  // const {email,password}=req.body;
  const email = req.body.email;

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email or Password is incorrect");
    res.redirect(req.get("Referrer") || "/");
    return;
  }

  const cipherText = CryptoJS.SHA256(req.body.password).toString();
  req.body.password = cipherText;
  const password = req.body.password;

  if (password != user.password) {
    req.flash("error", "Email or Password is incorrect");
    res.redirect(req.get("Referrer") || "/");
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", "Your account is not active");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};
