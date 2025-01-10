import mongoose from "mongoose";

const productSchema = mongoose.Schema({
 name : String,
 price : Number,
 discription : String    
});
    
const Product = mongoose.model("product", productSchema);

export default Product;
