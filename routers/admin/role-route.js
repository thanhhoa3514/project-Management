const express = require("express");

const router = express.Router();

const controller = require("../../controllers/admin/role-controller");
router.get("/", controller.index);

router.get("/create", controller.createRole);
router.post("/create", controller.createRolePOST);

router.get("/create", controller.createRole);
router.get("/edit/:id", controller.editRole);

router.patch("/edit/:id", controller.editRolePATCH);

module.exports = router;
