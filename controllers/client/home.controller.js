const ProductCategory=require("../../models/product-category.model");
const SettingGeneral=require("../../models/setting.model");
const createTreeHelper=require("../../helper/createTree");
const Product=require("../../models/product.model");
const productHelper=require("../../helper/product");
//[GET] /
module.exports.index= async (req, res) => {
    const productFeatured= await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    });
    const settingsGeneral= await SettingGeneral.findOne({});
    const newProducts= productHelper.priceNewProducts(productFeatured);
    res.render("client/pages/home/index",{
        pageTitle: settingsGeneral.websiteName,
        products: newProducts
    });
};