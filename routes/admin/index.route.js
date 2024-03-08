const adminHome=require("./dashboard.route");
const systemConfig=require("../../config/system");
const productRoute=require("./product.route");

module.exports = (app) => {
    const ADMIN_PATCH=systemConfig.prefixAdmin;
    app.use(ADMIN_PATCH + "/dashboard",adminHome);
    app.use(ADMIN_PATCH + "/products",productRoute);
};