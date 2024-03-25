const express=require("express");
const router=express.Router();
const controller=require("../../controllers/client/cart.controller");

router.get("/",controller.index);
router.post("/add/:idProduct",controller.addPost);
router.get("/delete/:idProduct",controller.delete);
router.get("/update/:idProduct/:quantity",controller.update);
module.exports=router;