const express = require("express");

const router=express.Router();

const controller=require("../../controllers/client/user-controller");

const validateRegister= require("../../validates/client/user.validate");
router.get("/register",controller.register);
router.post("/register",validateRegister.registerPost,controller.registerPOST);


module.exports = router;