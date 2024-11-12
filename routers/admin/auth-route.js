const express = require("express");
const validatesLogin = require("../../validates/admin/auth.validate");

const router = express.Router();

const controller = require("../../controllers/admin/auth-controller");
router.get("/login", controller.login);
router.post("/login", validatesLogin.loginPost, controller.loginPOST);
router.get("/logout", controller.logout);


module.exports = router;
