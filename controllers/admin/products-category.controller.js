const ProductCategory=require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper=require("../../helper/filterStatus");
const searchHelper=require("../../helper/search");
const createTreeHelper = require("../../helper/createTree");
const paginationHelper=require("../../helper/pagination");
//[GET] admin/products-category
module.exports.index= async(req,res) => {
  let find={
    deleted: false
  };
  const filterStatus=filterStatusHelper(req.query);
  const objectSearch=searchHelper(req.query);
  if(objectSearch.regex){
    find.title=objectSearch.regex;
  }

  const countProduct= await ProductCategory.countDocuments(find);
  
  let sort={};
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey]=req.query.sortValue;
  }
  else {
    sort.position="desc";
  }
  const records=await ProductCategory.find(find).sort(sort);
  const newRecords=createTreeHelper.tree(records);
  res.render("admin/pages/products-category/index",{
    pageTitle:"Danh mục sản phẩm",
    records:newRecords,
    filterStatus:filterStatus,
    keyword: objectSearch.keyword,
  });
}
//[GET] admin/products-category/create
module.exports.create= async(req,res) => {
  let find={
    deleted: false
  };
  const records=await ProductCategory.find(find);
  const newRecords=createTreeHelper.tree(records);
  res.render("admin/pages/products-category/create",{
    pageTitle:"Thêm mới danh mục sản phẩm",
    records:newRecords
  });
}

//[POST] admin/products-category/create
module.exports.createPost= async (req,res) =>{
  if(req.body.position==""){
    const count=await ProductCategory.countDocuments();
    req.body.position=count+1;
  }
  else {
    req.body.position=parseInt(req.body.position);
  }

  const records= new ProductCategory(req.body);
  await records.save();

  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus= async (req,res) =>{
  const status=req.params.status;
  const id=req.params.id;
  await ProductCategory.updateOne({_id: id},{ status: status });
  
  req.flash("success",`Thay đổi trạng thái sản phẩm thành công!`);

  res.redirect("back");
}

//[DELETE] /admin/products-category/delete
module.exports.delete= async (req,res) =>{
  const id=req.params.id;
  await ProductCategory.updateOne({_id: id} ,{deleted: true});
  req.flash("success",`Xóa sản phẩm thành công!`);
  res.redirect("back");
}

//[PATCH] /admin/products-category/change-multi
module.exports.changeMulti = async (req,res) =>{
  const type=req.body.type;
  const ids=req.body.ids.split(", ");

  switch (type) {
    case "active":
      await ProductCategory.updateMany( {_id: { $in: ids }}, {status: "active"});
      req.flash("success",`Kích hoạt ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await ProductCategory.updateMany( {_id: { $in: ids }}, {status: "inactive"});
      req.flash("success",`Dừng hoạt động ${ids.length} sản phẩm!`);
      break;
    case "delete-all":
      await ProductCategory.updateMany( {_id: { $in: ids }}, {deleted: true , deleteAt: new Date()});
      req.flash("success",`Xóa ${ids.length} sản phẩm!`);
      break;
    case "position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position=parseInt(position);
        await ProductCategory.updateOne({_id: id},{ position: position });
      }
      req.flash("success", `Thay đổi vị trí ${ids.length} sản phẩm!`);
      break;
    default:
      break;
  }
  res.redirect("back");
} 

//[GET] admin/products/edit
module.exports.edit= async(req,res) => {
  try {
    const id=req.params.id;
    let find={
      deleted :false,
      _id:id
    }
    const product= await ProductCategory.findOne(find);

    res.render("admin/pages/products-category/edit",{
      pageTitle:"Chỉnh sửa sản phẩm",
      product:product
  });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
}

//[PATCH] admin/products/edit
module.exports.editPost=async(req,res) => {
  const id=req.params.id;
  req.body.price=parseInt(req.body.price);
  req.body.discountPercentage=parseInt(req.body.discountPercentage);
  req.body.stock=parseInt(req.body.stock);
  req.body.position=parseInt(req.body.position);
  if(req.file){
    req.body.thumbnail=`/uploads/${req.file.filename}`;
  }

  try {
    await ProductCategory.updateOne({_id:id},req.body);
    req.flash("success",`Update sản phẩm thành công!`);
  } catch (error) {
    req.flash("error",`Cập nhật thất bại`);
  }
  res.redirect("back");
}

//[GET] admin/products/detail
module.exports.detailProduct=async(req,res) =>{
  const id=req.params.id;
  let find={
    deleted:false,
    _id: id
  }
  const product= await ProductCategory.findOne(find);
  res.render("admin/pages/products-category/detail",{
    pageTitle:"Chi tiết sản phẩm",
    product:product
});
}