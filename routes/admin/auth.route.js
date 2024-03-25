const express = require("express");
const router = express.Router();
const multer = require('multer');
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage : storageMulter()});
const controller = require("../../controllers/admin/auth.controller");

router.get("/login",controller.index);
router.post("/login",controller.create);
router.get("/logout",controller.logout);
module.exports=router;