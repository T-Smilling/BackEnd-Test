const Product=require("../../models/product.model");
const ProductCategory=require("../../models/product-category.model");
const Account=require("../../models/account.model");
const systemConfig = require("../../config/system");
const filterStatusHelper=require("../../helper/filterStatus");
const searchHelper=require("../../helper/search");
const paginationHelper=require("../../helper/pagination");
//[GET] admin/products

module.exports.index= async(req,res) => {
  let find={
    deleted: false
  }
  if(req.query.status){
    find.status=req.query.status;
  }
  const filterStatus=filterStatusHelper(req.query);
  const objectSearch=searchHelper(req.query);

  if(objectSearch.regex){
    find.title=objectSearch.regex;
  }
  const countProduct= await Product.countDocuments(find);
  let objectPagination=paginationHelper(
    {
      currentPage:1,
      limitItem:4,
    },
    req.query,
    countProduct
  );
  let sort={};
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey]=req.query.sortValue;
  }
  else {
    sort.position="desc";
  }

  const products= await Product.find(find).sort(sort).limit(objectPagination.limitItem).skip(objectPagination.skip);
  for(const product of products){
    const user=await Account.findOne({
      _id: product.createdBy.account_id
    });
    if(user){
      product.accountFullName=user.fullName;
    }
    const updatedBy=product.updatedBy.slice(-1)[0];
    if(updatedBy){
      const userUpdated=await Account.findOne({
        _id:updatedBy.account_id
      });
      updatedBy.accountFullName=userUpdated.fullName;
    }
  }

  res.render("admin/pages/products/index",{
    pageTitle:"Danh sách sản phẩm",
    products:products,
    filterStatus:filterStatus,
    keyword: objectSearch.keyword,
    pagination:objectPagination
});
}

//[PATCH] /admin/products/change-status/:status/:id

module.exports.changeStatus= async (req,res) =>{
  const status=req.params.status;
  const id=req.params.id;
  const updatedBy={
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }
  await Product.updateOne({_id: id},
    { 
      status: status,
      $push:{updatedBy:updatedBy}
    });
  
  req.flash("success",`Thay đổi trạng thái sản phẩm thành công!`);

  res.redirect("back");
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) =>{
  const type=req.body.type;
  const ids=req.body.ids.split(", ");
  const updatedBy={
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }
  switch (type) {
    case "active":
      await Product.updateMany( {_id: { $in: ids }}, {status: "active",$push:{updatedBy:updatedBy}});
      req.flash("success",`Kích hoạt ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await Product.updateMany( {_id: { $in: ids }}, {status: "inactive",$push:{updatedBy:updatedBy}});
      req.flash("success",`Dừng hoạt động ${ids.length} sản phẩm!`);
      break;
    case "delete-all":
      await Product.updateMany(
      {_id: { $in: ids }},
      {
        deleted: true,
        deletedBy:{
          account_id:res.locals.user.id,
          deletedAt: new Date(),
        }
      });
      req.flash("success",`Xóa ${ids.length} sản phẩm!`);
      break;
    case "position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position=parseInt(position);
        await Product.updateOne({_id: id},{ position: position });
      }
      req.flash("success", `Thay đổi vị trí ${ids.length} sản phẩm!`);
      break;
    default:
      break;
  }
  res.redirect("back");
} 
//[DELETE] /admin/products/delete
module.exports.delete= async (req,res) =>{
  const id=req.params.id;
  await Product.updateOne(
    {_id: id},
    {deleted: true,
    deletedBy:{
      account_id:res.locals.user.id,
      deleteAt:new Date(),
    }
  });
  req.flash("success",`Xóa sản phẩm thành công!`);
  res.redirect("back");
}

//[GET] admin/products/create

module.exports.create= async(req,res) => {
  let find={
    deleted:false
  }

  const category= await ProductCategory.find(find);
  res.render("admin/pages/products/create",{
    pageTitle:"Thêm mới sản phẩm",
    category:category
});
}

//[POST] admin/products/create
module.exports.createPost= async(req,res) => {

  req.body.price=parseInt(req.body.price);
  req.body.discountPercentage=parseInt(req.body.discountPercentage);
  req.body.stock=parseInt(req.body.stock);
  if(req.body.position==""){
    const countProduct= await Product.countDocuments();
    req.body.position=countProduct+1;
  } else{
    req.body.position=parseInt(req.body.position);
  }
  if(req.file){
    req.body.thumbnail=`/uploads/${req.file.filename}`;
  }
  req.body.createdBy={
    account_id: res.locals.user.id
  }
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

//[GET] admin/products/edit
module.exports.edit= async(req,res) => {
  try {
    const id=req.params.id;
    let find={
      deleted :false,
      _id:id
    }
    const product= await Product.findOne(find);
    const category=await ProductCategory.find({
      deleted:false
    });
    res.render("admin/pages/products/edit",{
      pageTitle:"Chỉnh sửa sản phẩm",
      product:product,
      category:category
  });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`)
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
    const updatedBy={
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }
    await Product.updateOne({_id:id},{
      ...req.body,
      $push:{updatedBy:updatedBy}
    });
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
  const product= await Product.findOne(find);
  res.render("admin/pages/products/detail",{
    pageTitle:"Chi tiết sản phẩm",
    product:product
});
}