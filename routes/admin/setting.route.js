const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/settings.controller");
const multer = require('multer');
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage : storageMulter()});
const validate=require("../../validate/admin/product.validate");

router.get("/general",controller.general);
router.patch("/general",controller.generalPatch);

module.exports = router;