const express = require("express");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const upload = multer();
const router = express.Router();
const validatesAccount = require("../../validates/admin/account.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/account-controller");
router.get("/", controller.index);
router.get("/create", controller.createAccount);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validatesAccount.createAccountPOST,
  controller.createAccountPOST
);

router.get("/edit/:id", controller.editAccount);

router.patch(
    "/edit/:id",
    upload.single("avatar"),
    uploadCloud.upload,
    validatesAccount.createAccountPATCH,
    controller.editAccountPATCH
  );


module.exports = router;
