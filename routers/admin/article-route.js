const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controllers/admin/article-controller");
const validatesArticle = require("../../validates/admin/article.validate");

router.get("/", controller.index);
router.get("/create", controller.createArticle);
router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validatesArticle.validateArticle,
    validatesArticle.sanitizeArticle,
    controller.createArticlePOST
  );

  router.get("/edit/:id", controller.editArticle);

module.exports = router;


