const User = require("../../models/user-model");
const CryptoJS = require("crypto-js");

// [GET] user/register

module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Register",
  });
};

// [POST] user/register
module.exports.registerPOST = async (req, res) => {
  //   console.log(req.body);

  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    req.flash("danger", "Email already exists");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  const cipherText = CryptoJS.SHA256(req.body.password).toString();
  req.body.password = cipherText;
  const userInfo = new User(req.body);
  await userInfo.save();

  res.cookie("tokenUser",userInfo.tokenUser);
  req.flash("success","Register successfully");
  res.redirect("/");
};
