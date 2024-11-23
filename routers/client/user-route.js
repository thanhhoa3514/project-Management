const express = require("express");

const router=express.Router();

const controller=require("../../controllers/client/user-controller");

const validateRegister= require("../../validates/client/user.validate");
router.get("/register",controller.register);
router.post("/register",validateRegister.registerPost,controller.registerPOST);

router.get("/login",controller.login);
router.post("/login",validateRegister.loginPost,controller.loginPOST);

router.get("/logout",controller.logout);




module.exports = router;