const adminHome=require("./dashboard.route");
const systemConfig=require("../../config/system");
const productRoute=require("./product.route");
const productCategoryRoute=require("./products-category.route");
const Role=require("./roles.route");
const Accounts=require("./accounts.route");
const Auth=require("./auth.route");
const authMiddleware=require("../../middlewares/admin/auth.middleware");
const myAccount=require("./my-account.route");
const settings=require("./setting.route")
module.exports = (app) => {
    const ADMIN_PATCH=systemConfig.prefixAdmin;
    app.use(
        ADMIN_PATCH + "/dashboard",
        authMiddleware.requireAuth,
        adminHome,
    );
    app.use(ADMIN_PATCH + "/products",authMiddleware.requireAuth,productRoute);
    app.use(ADMIN_PATCH + "/products-category",authMiddleware.requireAuth,productCategoryRoute);
    app.use(ADMIN_PATCH + "/roles",authMiddleware.requireAuth,Role);
    app.use(ADMIN_PATCH + "/accounts",authMiddleware.requireAuth,Accounts);
    app.use(ADMIN_PATCH + "/my-account",authMiddleware.requireAuth,myAccount);
    app.use(ADMIN_PATCH + "/auth",Auth);
    app.use(ADMIN_PATCH + "/settings",authMiddleware.requireAuth,settings);
};