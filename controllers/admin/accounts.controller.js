const Account=require("../../models/account.model");
const Role=require("../../models/roles.model");
const systemConfig = require("../../config/system");
//[GET] admin/accounts
module.exports.index= async(req,res) =>{
  let find={
    deleted:false
  };
  const records=await Account.find(find).select("-password -token");
  for(const record of records){
    const role=await Role.findOne({
      _id:record.role_id,
      deleted:false
    });
    record.role=role;
  }
  
  res.render("admin/pages/accounts/index", {
    pageTitle: "Tài khoản",
    records:records
  });
}
//[GET] admin/accounts/create
module.exports.create=async(req,res)=>{
  let find={
    deleted:false
  }
  const records=await Role.find(find);
  res.render("admin/pages/accounts/create" ,{
    pageTitle: "Tạo mới tài khoản",
    records:records
  })
}

//[POST] admin/accounts/create
module.exports.createPost=async(req,res)=>{
  const emailExist=await Account.findOne({
    email:req.body.email,
    deleted: false
  });
  if(emailExist){
    req.flash("error",`Email ${req.body.email} đã tồn tại`);
    res.redirect("back");
  }
  else{
    const records=new Account(req.body);
    await records.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
  res.render("admin/pages/accounts/create" ,{
    pageTitle: "Tạo mới tài khoản",
  })
}
