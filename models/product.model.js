const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: String, // Sản phẩm 1
    description: String,
    product_category_id: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    featured:String,
    slug:{
      type:String,
      slug: "title", //san-pham-1
      unique:true
    },
    createdBy:{
      account_id: String,
      createAt:{
        type:Date,
        default: Date.now
      }
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedBy:{
      account_id: String,
      deletedAt:Date
    },
    updatedBy:[
      {
        account_id: String,
        updatedAt:Date
      },
    ],
  },
);
const Product = mongoose.model('Product', productSchema, "Products");
module.exports=Product;