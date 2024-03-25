const express = require("express");
const route=express.Router();
const productControl=require("../../controllers/client/product.controller.js");

route.get("/",productControl.index);
route.get("/:slugCategory",productControl.category)
route.get("/detail/:slugProduct",productControl.detailClient);
module.exports=route;