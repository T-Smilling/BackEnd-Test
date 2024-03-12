const Product=require("../../models/product.model");
//[GET] /products
module.exports.index= async (req, res) => {
    const products= await Product.find({
        status:"active",
        deleted:false
    }).sort({position:"desc"});
    const newProduct=products.map(item => {
        item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index",{
        pageTitle:"Products",
        products:newProduct
    });
};
//[GET] /products/detail/:slug
module.exports.detailClient= async (req,res) =>{
    const slug=req.params.slug;
    let find={
        deleted:false,
        slug:slug
    }
    const products = await Product.findOne(find);
    res.render("client/pages/products/detail",{
        pageTitle:products.title,
        products:products
    });
}