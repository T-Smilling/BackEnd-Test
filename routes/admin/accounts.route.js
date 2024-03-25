const express = require("express");
const router = express.Router();
const multer = require('multer');
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage : storageMulter()});
const controller = require("../../controllers/admin/accounts.controller");
const validate=require("../../validate/admin/account.validate");

router.get("/",controller.index);
router.get("/create",controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  controller.createPost
);
module.exports=router;