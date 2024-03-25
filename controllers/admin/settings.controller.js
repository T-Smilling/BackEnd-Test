const ProductCategory=require("../../models/product-category.model");
const SettingGeneral=require("../../models/setting.model")
//[GET] admin/settings/general
module.exports.general= async(req,res) => {
  const settingGeneral= await SettingGeneral.findOne({});

  res.render("admin/pages/settings/general",{
    pageTitle:"Cài đặt chung",
    settingGeneral: settingGeneral
  });
}

//[PATCH] admin/settings/general
module.exports.generalPatch= async(req,res) => {
  const settings= await SettingGeneral.findOne({});
  if(settings){
    await SettingGeneral.updateOne({
      _id:settings.id
    }, req.body);
  }
  else{
    const record=new SettingGeneral(req.body);
    await record.save();
  }

  req.flash("success","Cập nhật thành công");
  res.redirect("back");
}