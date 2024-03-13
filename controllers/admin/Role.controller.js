const Role=require("../../models/roles.model");
const systemConfig = require("../../config/system");

//[GET] admin/roler

module.exports.index= async(req,res) =>{
  let find={
    deleted: false
  }

  const records=await Role.find(find);
  res.render("admin/pages/roles/index",{
    pageTitle:"Nhóm quyền",
    records: records
  });
}
//[GET] admin/roles/craete
module.exports.create= async(req,res) =>{
  res.render("admin/pages/roles/create",{
    pageTitle:"Thêm mới",
  });
}
//[POST] admin/roles/craete
module.exports.createPost= async(req,res) =>{
  const records= new Role(req.body);
  await records.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
}
//[GET] admin/roles/detail
module.exports.detail= async(req,res) =>{
  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id
  };
  const record= await Role.findOne(find);
  res.render("admin/pages/roles/detail",{
    pageTitle:"Chi tiết quyền",
    record:record
  });
}

//[GET] admin/roles/edit
module.exports.edit= async(req,res) =>{
  const id = req.params.id;
  let find = {
    deleted: false,
    _id: id
  };
  const product= await Role.findOne(find);
  res.render("admin/pages/roles/edit",{
    pageTitle:"Chỉnh sửa",
    product: product
  });
}

//[GET] admin/roles/edit
module.exports.editPost= async(req,res) =>{
  try {
    const id= req.params.id;
    await Role.updateOne({_id: id} , req.body);
    req.flash("success","Cập nhật nhóm quyền thành công")
    res.redirect("back");
  } catch (error) {
    req.flash("error","Cập nhật nhóm quyền thất bại")
  } 
}

//[GET] admin/roles/permissions
module.exports.permissions= async(req,res) =>{
  let find= {
    deleted: false
  };
  const records= await Role.find(find);
  res.render("admin/pages/roles/permissions" ,{
    pageTitle:"Phân quyền",
    records:records
  })
}