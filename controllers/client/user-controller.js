const User = require("../../models/user-model");
const CryptoJS = require("crypto-js");
const generateHelpers= require("../../helpers/generateStringRandom");

const ForgotPassword = require("../../models/forgot-password.model");
const sendMailHelpers=require("../../helpers/sendMail");
const Cart = require("../../models/cart-model");

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

    // console.log(req.cookies.cartId);
    // console.log(userInfo.id);

    const record= Cart.findOne({
        user_id:userInfo.id
    });
    if(record){

        res.cookie("cartId",record.id);
    }else{
        
        await Cart.updateOne({
            _id:req.cookies.cartId,
        },{
            user_id:userInfo.id
        })
    }

    req.flash("success", "Login Success");

    res.cookie("tokenUser",userInfo.tokenUser);
    res.redirect("/");

};

// [GET] user/logout
module.exports.logout= async (req, res) => {
    res.clearCookie("cartId");
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
    const otp=generateHelpers.randomDigit(6);
    const objectForgotPassword ={
        email: email,
        otp:otp,
        expireAt: Date.now()
    }

    // console.log(objectForgotPassword);

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    const subject = "Reset Your Account Password";
    const html = `
        <div style="font-family: Arial; max-width: 600px; margin: auto;">  
            <h2>Reset Password</h2>  
            <p>Hello ${email},</p>  
            <p>You requested a password reset for your account. Please use the following OTP to reset your password:   
                <b style="color: blue;">${otp}</b>  
            </p>  
            <p>If you did not request this reset, you can safely ignore this email.Someone might have accidentally entered your email address</p>  
            <p>This OTP will expire in 3 minutes.</p>  
            <p>Thank you,<br>Your Company Support Team</p>  
        </div>
    `;
    sendMailHelpers.sendMail(email,subject,html);
    // send email to reset password
    // const token = cryptoRandomString(20);
    // userInfo.resetPasswordToken = token;
    // userInfo.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    // await userInfo.save();
    res.redirect(`/user/password/otp?email=${email}`);
};


// [GET] user/password/otp
module.exports.otpPassword= async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password",{
        pageTitle: "Otp",
        email: email
    });

};

// [POST] user/password/otp
module.exports.otpPasswordPost= async (req, res, next) => {
    const email = req.body.email;
    const otp = req.body.otp;
    // console.log(email);
    // console.log(otp);

    const result= await ForgotPassword.findOne({
        email: email,
        otp: otp,
        // expireAt: { $gt: Date.now() }
    });
    if(!result) {
        req.flash("error", "OTP is incorrect or expired");
        res.redirect(req.get("Referrer") || "/user/password/forgot");
        return;
    }
    const user= await User.findOne({
        email: email
    })
    // console.log(result);
    res.cookie("tokenUser",user.tokenUser);

    res.redirect(`/user/password/reset`);

};

// [GET] user/password/reset
module.exports.resetPassword= async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Reset Password",
    });
};

// [POST] user/password/reset
module.exports.resetPasswordPost= async (req, res) => {
    const password = req.body.password;
    const tokenUser= req.cookies.tokenUser;
    // console.log(password, tokenUser);


    const cipherText = CryptoJS.SHA256(password).toString();
    await User.updateOne({
        tokenUser: tokenUser,
        password: cipherText
    });

    req.flash("success", "Reset Password Successfully");
    res.redirect("/");
};

// [GET] user/info
module.exports.info= async (req, res) => {
    // const tokenUser= req.cookies.tokenUser;

    // const info = await User.findOne({
    //     tokenUser: tokenUser,
    //     deleted: false
    // }).select("-password");
    // // console.log(info);
    res.render("client/pages/user/info", {
        pageTitle: "Info User",
        // info:info
    });
};