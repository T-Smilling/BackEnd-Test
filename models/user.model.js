const mongoose = require("mongoose");
const generate= require("../helper/generate");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    password: String,
    email: String,
    tokenUser:{
      type:String,
      default: generate.generateRandomString(30)
    },
    phone:String,
    avatar: String,
    status:String,
    deleted: {
      type: Boolean,
      default: false
    },
    deleteAt: Date
  },
  {
    timestamps:true
  }
);
const User = mongoose.model("User", userSchema, "User");
module.exports=User;