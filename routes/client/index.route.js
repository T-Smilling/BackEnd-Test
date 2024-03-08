const product=require("./product.route");
const home=require("./home.route");
module.exports = (app) => {
    app.use("/",home);
    app.use("/products",product);
};