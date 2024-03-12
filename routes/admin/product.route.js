const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer = require('multer');
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage : storageMulter()});
const validate=require("../../validate/admin/product.validate");
router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.delete);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost
);
router.get(
  "/edit/:id",
  controller.edit
);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPost
);
router.get("/detail/:id",controller.detailProduct);
module.exports = router;