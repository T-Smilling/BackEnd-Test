const express=require("express");
const router=express.Router();
const controller=require("../../controllers/client/users.controlller");

router.get("/not-friend",controller.not-friend);

module.exports=router;