import User from "../models/user.js";
import bcript from "bcrypt"; 
import jwt from "jsonwebtoken";

export function createUser(req,res){

    const newUserData = req.body
    
    if(newUserData.type == "admin"){
        if(req.user == null){
            res.json({
                message: "please login as an administratorto create admin accounts"
            })
            return
        }
        
        if(user.User.type != "admin"){  
            res.json({
                message : "please login as an administrator to create  admin accounts"
            })
            return
        }
    }



    newUserData.password = bcript.hashSync(newUserData.password,10)

    const user = new User(newUserData)

    user.save().then(()=>{
        res.json({
            message : "user created"
        })
    }).catch(()=>{
        res.json({
            messsage : "user not created"
        })
    })
}

export function loginUser(req,res){

    User.find({email : req.body.email}).then(    
        (users)=>{
            if(users.length == 0){
                res.json({
                    message :"user not found"
                })

            }else{
                
                const user = users[0]

                const ispasswordCorrect = bcript.compareSync(req.body.password,user.password)

                if(ispasswordCorrect){
                    const token = jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        isBlocked : user.isBlocked,
                        type : user.type,
                        profilePicture : user.profilePicture
                    }, "cbc-secret-key-7973")
                    
                    res.json({
                        message : "user loged in",
                        token : token
                    })
                }else{
                    res.json({
                        message : "User not logged in(invalid password)"
                    })
                }
            }
        }   
    ) 
}
