const Product=require("../../models/product.model");
const Account=require("../../models/account.model");
const systemConfig = require("../../config/system");
//[GET] admin/my-account
module.exports.index=async (req,res) =>{
  res.render("admin/pages/my-account/index",{
    pageTitle:"Mô tả tài khoản",
  })
}
//[GET] admin/my-account/edit
module.exports.edit=async (req,res) =>{
  res.render("admin/pages/my-account/edit",{
    pageTitle:"Chỉnh sửa tài khoản",
  })
}
//[PATCH] admin/my-account/edit
module.exports.editPatch=async (req,res) =>{
  const id=res.locals.user.id;
  console.log(id);
  console.log(req.body);
  await Account.updateOne({_id:id},req.body);
  req.flash("success", "Thành công!")
  res.redirect("back");
}