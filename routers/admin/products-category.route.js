const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();
const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
// router.patch("/change-status-category/:status/:id", controller.changeStatusCategory);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createCategoryPOST,
  controller.createCategoryPOST
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createCategoryPOST,
  controller.editPATCH
);
router.get("/detail/:id", controller.detailCategory);

module.exports = router;
