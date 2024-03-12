const express = require("express");
const router = express.Router();
const validate=require("../../validate/admin/product.validate");
const controller = require("../../controllers/admin/products-category.controller");
const multer = require('multer');
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage : storageMulter()});

router.get("/", controller.index);
router.get("/create" , controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost
);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.delete("/delete/:id",controller.delete);
router.patch("/change-multi", controller.changeMulti);
router.get("/edit/:id",controller.edit);
router.get("/detail/:id",controller.detailProduct);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPost
);

module.exports = router;