const User = require("../../models/user-model");
const CryptoJS = require("crypto-js");
const generateHelpers= require("../../helpers/generateStringRandom");

const ForgotPassword = require("../../models/forgot-password.model");
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


// [GET] user/login
module.exports.login = (req, res) => {
    res.render("client/pages/user/login", {
      pageTitle: "Login",
    });
};

// [POST] user/login
module.exports.loginPOST= async (req, res) => {

    // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    const userInfo = await User.findOne({ 
        email:email, 
        deleted: false
    });
    if(!userInfo){
        req.flash("danger","Password or email not found");
        res.redirect(req.get("Referrer") || "/");
        return;

    }
    const cipherText = CryptoJS.SHA256(password).toString();
    //req.body.password = cipherText;
    //const password = req.body.password;
    if (cipherText != userInfo.password) {
        req.flash("error", "Email or Password is incorrect");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    if(userInfo.status==="inactive") {
        req.flash("error", "Access Denied");
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    req.flash("success", "Login Success");

    res.cookie("tokenUser",userInfo.tokenUser);
    res.redirect("/");

};

// [GET] user/logout
module.exports.logout= async (req, res) => {
    res.clearCookie("tokenUser");
    req.flash("success", "Logout Successfully");
    res.redirect("/");
};

// [GET] user/password/forgot
module.exports.forgotPassword= async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Get forgot Password",
    });
};

// [POST] user/password/forgot
module.exports.forgotPasswordPost= async (req, res) => {
    // console.log(req.body);
    const email = req.body.email;
    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
        req.flash("error", "Email not found");
        res.redirect(req.get("Referrer") || "/user/password/forgot");
        return;
    }
    // Record user information in a database
    const opt=generateHelpers.randomDigit(6);
    const objectForgotPassword ={
        email: userInfo.email,
        opt:opt,
        expireAt: Date.now()+300
    }

    // console.log(objectForgotPassword);

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    // send email to reset password
    // const token = cryptoRandomString(20);
    // userInfo.resetPasswordToken = token;
    // userInfo.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    // await userInfo.save();
    res.send("ok");
};