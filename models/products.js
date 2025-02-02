import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId: {
        type : String,
        required : true,
        unique : true
    },
    productName : {
        type : String,
        required : true
    },
    altNames : [
        {
            type :String
        }
    ],
    images :[
        {
            type : String
        }
    ],
    price: {
        type : Number,
        required : true
    },
    lastPrice : {
        type : Number,
    },
    description :{
        type : String,
        required : true 
    }
})

const Product =mongoose.model("products",productSchema);

export default Product;