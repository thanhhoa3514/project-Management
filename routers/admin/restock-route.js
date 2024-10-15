const express = require("express");

const router=express.Router();

const controller=require("../../controllers/admin/restock-controller");
router.get("/",controller.restock);
router.patch("/restock-item/:id",controller.restockItem);


module.exports = router;