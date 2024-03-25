module.exports.registerPost=(req,res,next) =>{
  if(!req.body.fullName){
    req.flash("error",`Bạn cần nhập họ tên!`);
    res.redirect("back");
    return;
  }
  if(!req.body.email){
    req.flash("error",`Bạn cần nhập email!`);
    res.redirect("back");
    return;
  }
  if(!req.body.password){
    req.flash("error",`Bạn cần nhập mật khẩu!`);
    res.redirect("back");
    return;
  }
  next();
}
module.exports.loginPost=(req,res,next) =>{
  if(!req.body.email){
    req.flash("error",`Bạn cần nhập email!`);
    res.redirect("back");
    return;
  }
  if(!req.body.password){
    req.flash("error",`Bạn cần nhập mật khẩu!`);
    res.redirect("back");
    return;
  }
  next();
}
module.exports.forgotPassword=(req,res,next) =>{
  if(!req.body.email){
    req.flash("error",`Bạn cần nhập email!`);
    res.redirect("back");
    return;
  }
  next();
}

module.exports.resetPasswordPost=(req,res,next) =>{
  if(!req.body.password){
    req.flash("error",`Bạn cần nhập mật khẩu mới!`);
    res.redirect("back");
    return;
  }
  if(!req.body.confirmPassword){
    req.flash("error",`Bạn cần xác nhận mật khẩu!`);
    res.redirect("back");
    return;
  }
  if(req.body.confirmPassword !== req.body.password){
    req.flash("error","Xác nhận mật khẩu không trùng khớp");
    res.redirect("back");
    return;
  }
  next();
}