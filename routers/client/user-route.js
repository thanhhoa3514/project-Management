const express = require("express");

const router = express.Router();

const controller = require("../../controllers/client/user-controller");

const validateRegister = require("../../validates/client/user.validate");
router.get("/register", controller.register);
router.post(
  "/register",
  validateRegister.registerPost,
  controller.registerPOST
);

router.get("/login", controller.login);
router.post("/login", validateRegister.loginPost, controller.loginPOST);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);
router.post(
  "/password/forgot",
  validateRegister.forgotPasswordPost,
  controller.forgotPasswordPost
);
router.get("/password/otp", controller.otpPassword);
router.post("/password/otp", controller.otpPasswordPost);

router.get("/password/reset", controller.resetPassword);
router.post(
  "/password/reset",
  validateRegister.resetPasswordPost,
  controller.resetPasswordPost
);

module.exports = router;
