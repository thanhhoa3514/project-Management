const express = require("express");

const router=express.Router();

const controller=require("../../controllers/client/cart-controller");
router.get("/",controller.index);

router.post("/add/:productId",controller.addPOST);
router.get("/delete/:productId",controller.deleteProduct);
router.get("/update/:productId/:quantity",controller.updateProduct);


module.exports = router;