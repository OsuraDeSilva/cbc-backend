import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRoutes from './routes/studentRoutes.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const app  = express();
const PORT = 5000;


const mongoUrl = "mongodb+srv://admin:123@cluster0.jiv8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected")
})

app.use(bodyParser.json())

app.use(

    (req,res,next)=>{

        const token = req.header("Authorization")?.replace("Bearer", "").trim()
        console.log(token)

        if(token != null){
            jwt.verify(token,"cbc-secret-key-7973" , (error,decoded)=>{

                if(!error){
                    req.user = decoded
                }
            })
        }

        next()

    }

)

app.use("/api/student",studentRoutes)
app.use("/api/product",productRouter)
app.use("/api/user",userRouter)



app.listen(
    5000,
    ()=>{
        console.log('sever is running on port 5000');
        
    }
)