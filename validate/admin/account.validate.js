module.exports.createPost=(req,res,next) =>{
  if(!req.body.fullname){
    req.flash("error",`Bạn cần nhập accounts!`);
    res.redirect("back");
    return;
  }
  next();
}