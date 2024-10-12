import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "products"

const productSchema = new mongoose.Schema({
  title: {type: String, required:true, max:100} ,
  description: {type: String, required:true, max:250},
  code: {type: String, required: true, max:10},
  price: {type: Number, required: true},
  status: {type: Boolean, required:true},
  stock: {type:Number, required:true},
  category: {type:String, required:true, max:20},
  thumbnails: {type: Array, default: [],}
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection,productSchema)
export default productModel