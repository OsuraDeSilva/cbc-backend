import Order from "../models/order.js"
import { iscustomer } from "./userController.js"

export async function createOrder(req,res){

    if(!iscustomer){
        res.json({
            message : "please llogin ascustomer to create orders"
        })
    }

    try{
        const latestORder = await Order.find().sort({date : -1}).limit(1)

        let orderId 

        if(latestORder.length == 0){
            orderId = "CBC001"
        }else{
            const currentOrderId = latestORder[0].orderId

            const numberString = currentOrderId.replace("CBC","")

            const newNumber = (number + 1).toString().padStart(4, "0")
    
            orderId = "CBC" + number.newNumber
        }

        const newOrderData = req.body

        const newProductArray = []
        
        for(let i=0; i < newOrderData.orderedItems.length;i++){
            const product = await product.findOne({
                productId : newOrderData.orderedItems[i].productId
            })
            
            if(product == null){
                res.json({
                    message : "product with id "+newOrderData.orderedItems[i].productId+" not found"
                })
                return
            }

            newProductArray[i] = {
                productId : product.productname,
                price : product.price,
                quantity : newOrderData.orderedItems[i].quantity,
                image : product.images[0]
            }
        }
        console.log(newProductArray)

        newOrderData.orderedItems = newProductArray

        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const order = new Order(newOrderData)

        await order.save()

        res.json({
            message : "Order created"
        })
     

    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

export async function  getOrders(req,res){
    try{
        const orders = await Order.find({email : req.user.email})

        res.json(orders)

    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}