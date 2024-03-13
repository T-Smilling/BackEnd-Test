const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/Role.controller");
const multer = require('multer');
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage : storageMulter()});
const validate=require("../../validate/admin/product.validate");

router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",controller.createPost);
router.get("/detail/:id",controller.detail);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",controller.editPost);
router.get("/permissions",controller.permissions);

module.exports = router;