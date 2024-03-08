const express=require("express");
const router=express.Router();
const homeController=require("../../controllers/admin/dashboard.controller");

router.get("/",homeController.dashboard);

module.exports=router;