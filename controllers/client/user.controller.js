const User=require("../../models/user.model");
const Cart=require("../../models/cart.model");
const ForgotPassword=require("../../models/forgot-password.model");
const generateHelper= require("../../helper/generate");
const sendMailHelper=require("../../helper/sendMail");
//[GET] user/register
module.exports.register=async (req,res) =>{
  res.render("client/pages/user/register",{
    pageTitle: "Đăng kí tài khoản",
  });
}
//[POST] user/register
module.exports.registerPost=async (req,res) =>{
  const existEmail=await User.findOne({
    email: req.body.email,
    deleted:false
  });
  if(existEmail){
    req.flash("error","Email đã tồn tại");
    res.redirect("back");
    return;
  }
  const user= new User(req.body);
  await user.save();
  req.flash("success","Đăng kí thành công");
  res.cookie("tokenUser",user.tokenUser);
  res.redirect("/user/login");
}

//[GET] user/login
module.exports.login=async (req,res) =>{
  res.render("client/pages/user/login",{
    pageTitle: "Đăng nhập tài khoản",
  });
}

//[POST] user/login
module.exports.loginPost=async (req,res) =>{
  const email=req.body.email;
  const password=req.body.password;
  const user= await User.findOne({
    email:email,
    deleted:false
  });
  if(!user){
    req.flash("error","Email không tồn tại");
    res.redirect("back");
    return;
  }
  if(password !== user.password){
    req.flash("error","Sai mật khẩu");
    res.redirect("back");
    return;
  }
  if(user.status == "inactive"){
    req.flash("error","Tài khoản bị khóa");
    res.redirect("back");
    return;
  }
  res.cookie("tokenUser",user.tokenUser);
  await Cart.updateOne({
    _id:req.cookies.cartId
  },
  {
    user_id: user_id 
  })
  res.redirect("/");
}
//[GET] user/logout
module.exports.logout=async (req,res) =>{
  res.clearCookie("tokenUser");
  res.redirect("/");
}

//[GET] user/password/forgot
module.exports.forgot=async (req,res) =>{
  res.render("client/pages/user/forgot-password",{
    pageTitle: "Quên mật khẩu",
  })
}

//[POST] user/password/forgot
module.exports.forgotPost=async (req,res) =>{
  const email=req.body.email;
  const user=await User.findOne({
    email:email,
    deleted: false
  });
  if(!user){
    req.flash("error","Email không tồn tại");
    res.redirect("back");
    return;
  }
  // Tạo OTP
  const otp=generateHelper.generateRandomNumber(8);
  const objectForgotPassword ={
    email:email,
    otp:otp,
    expireAt: Date.now()
  }
  const forgotPassword= new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  //Gửi OTP cho người dùng
  const subject="Mã OTP xác minh lấy lại mật khẩu";
  const html=`
    Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Mã có thời hạn nhập là 3 phút. Lưu ý không chia sẻ cho bất kì ai.
  `
  sendMailHelper.sendMail(email,subject,html);
  res.redirect(`/user/password/otp?email=${email}`);
};

//[GET] user/password/otp
module.exports.otpPassword=async (req,res) =>{
  const email=req.query.email;
  res.render("client/pages/user/otp-password",{
    pageTitle: "Nhập mã OTP",
    email:email,
  })
}

//[POST] user/password/otp
module.exports. otpPasswordPost=async (req,res) =>{
  const email=req.body.email;
  const otp=req.body.otp;
  const result= await ForgotPassword.findOne({
    email:email,
    otp:otp
  });
  if(!result){
    req.flash("error","OTP không tồn tại");
    res.redirect("back");
    return;
  }
  const user=await User.findOne({
    email: email
  });
  res.cookie("tokenUser",user.tokenUser);
  res.redirect("/user/password/reset");
}

//[GET] /user/password/reset
module.exports.resetPassword= async (req,res) =>{
  res.render("client/pages/user/reset-password",{
    pageTitle: "Đổi mật khẩu",
  })
}
//[POST] user/password/reset
module.exports.resetPasswordPost=async (req,res) =>{
  const password=req.body.password;
  const tokenUser= req.cookies.tokenUser;
  
  await User.updateOne(
  {
    tokenUser:tokenUser
  },
  {
    password:password
  })
  req.flash("success", "Bạn đã đổi mật khẩu thành công")
  res.redirect("/");
}

//[GET] /user/info
module.exports.infoUser= async (req,res) =>{
  res.render("client/pages/user/infoUser",{
    pageTitle: "Thông tin tài khoản",
  });
}