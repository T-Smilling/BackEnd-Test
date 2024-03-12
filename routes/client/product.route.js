const express = require("express");
const route=express.Router();
const productControl=require("../../controllers/client/product.controller.js");

route.get("/",productControl.index);
route.get("/detail/:slug",productControl.detailClient);
module.exports=route;