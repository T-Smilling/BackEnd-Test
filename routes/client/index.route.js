const product=require("./product.route");
const home=require("./home.route");
const categoryMiddleware=require("../../middlewares/client/category.middleware")
const cartMiddleware=require("../../middlewares/client/cart.middleware");
const search=require("./search.route");
const cart=require("./cart.route");
const checkout=require("./checkout.route");
const user=require("./user.route")
const userMiddleware=require("../../middlewares/client/user.middleware")
const authMiddleware=require("../../middlewares/client/auth.middleware")
const settingMiddleware=require("../../middlewares/client/setting.middleware")
module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.settingGeneral);
    app.use("/",home);
    app.use("/products",product);
    app.use("/",search);
    app.use("/cart",cart);
    app.use("/checkout",checkout);
    app.use("/user",authMiddleware.requireAuth,user);
};