const Account=require("../../models/account.model");
const systemConfig = require("../../config/system");

//[GET] admin/auth/login
module.exports.index=async (req,res) =>{
  if(req.cookies.token){
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  }
  else {
    res.render("admin/pages/auth/login",{
      pageTitle: "Đăng nhập",
    });
  }
}
//[POST] admin/auth/login
module.exports.create=async (req,res) =>{
  const email=req.body.email;
  const password=req.body.password;
  const user= await Account.findOne({
    email:email,
    deleted:false
  });
  if(!user){
    req.flash("error","Email đã tồi tại!");
    res.redirect("back");
    return;
  }
  if(password!=user.password){
    req.flash("error","Sai mật khẩu!");
    res.redirect("back");
    return;
  }
  if(user.status== "inactive"){
    req.flash("error","Tài khoản bị khóa!");
    res.redirect("back");
    return;
  }
  res.cookie("token",user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

module.exports.logout=async(req,res)=>{
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}