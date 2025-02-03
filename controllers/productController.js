import Product from "../models/products.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){

    if(!isAdmin(req)){
        res.json({
            message : "please login as an administrator to add product"
        })
        return
    }

    const newProductData = req.body

    const product = new Product(newProductData)

    product.save().then(()=>(
        res.json({
            message : "product created"
        })
    )).catch((error)=>{
        res.json({
            message : error
        })
    })
}

export function getProducts(req,res){
    Product.find({}).then((products)=>{
        res.json(products)
    })
}