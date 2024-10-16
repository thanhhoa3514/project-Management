const express = require("express");
const multer = require("multer");
const storageMulter=require("../../helpers/storageMulter");
const upload = multer({  storage: storageMulter()  });
const router = express.Router();

const controller = require("../../controllers/admin/product-controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMultiStatus);

router.delete("/delete/:id", controller.deleteProduct);

router.get("/create", controller.createProduct);

router.post(
  "/create",
  upload.single("thumbnail"),
  controller.createProductPOST
);

module.exports = router;
