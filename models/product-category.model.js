const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema(
  {
    title: String, // Sản phẩm 1
    parent_id:{
      type:String,
      default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    featured:String,
    slug:{
      type:String,
      slug: "title", //san-pham-1
      unique:true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deleteAt: Date
  },
  {
    timestamps:true
  }
);
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, "Products-Category");
module.exports=ProductCategory;