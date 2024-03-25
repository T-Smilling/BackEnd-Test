const express=require("express");
const router=express.Router();
const controller=require("../../controllers/client/search.controller");

router.get("/search",controller.index);

module.exports=router;