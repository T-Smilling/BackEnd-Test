const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema(
  {
    websiteName: String,
    logo:String,
    phone:String,
    email: String,
    address:String,
    copyright:String,
  },
  {
    timestamps:true
  }
);
const Setting = mongoose.model("Setting", SettingSchema, "Setting-General");
module.exports=Setting;