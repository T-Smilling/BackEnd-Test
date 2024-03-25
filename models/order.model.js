const mongoose = require("mongoose");
const generate= require("../helper/generate");
const OrderSchema = new mongoose.Schema(
  {
    cart_id:String,
    userInfo:{
      fullName:String,
      phone:String,
      address:String
    },
    products:[
      {
        product_id:String,
        price:Number,
        discountPercentage:Number,
        quantity: Number
      }
    ]
  },
  {
    timestamps:true
  }
);
const Order = mongoose.model("Order", OrderSchema, "Order");
module.exports=Order;