const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");



const upload = multer();
const router = express.Router();

const controller = require("../../controllers/admin/product-controller");
const validates = require("../../validates/admin/product.validate");
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMultiStatus);

router.delete("/delete/:id", controller.deleteProduct);

router.get("/create", controller.createProduct);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createProductPOST,
  controller.createProductPOST
);
router.get("/edit/:id", controller.editProduct);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createProductPOST,
  controller.editProductPATCH
);

router.get("/detail/:id", controller.detail);

module.exports = router;
