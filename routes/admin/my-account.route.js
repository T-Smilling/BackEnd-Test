const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/my-account.controller");
const multer = require('multer');
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage : storageMulter()});
const validate=require("../../validate/admin/product.validate");

router.get("/",controller.index);
router.get("/edit",controller.edit);
router.patch("/edit", upload.single("thumbnail"),controller.editPatch);

module.exports = router;