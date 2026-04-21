// register api create karne ke liye yeh route file SEPERATE create ki hai  

const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

// User ko Register karne POST method use hogi
authRouter.post("/register",async(req,res)=>{
    const {name , email , password} =  req.body
    
    const isUserAlreadyExists = await userModel.findOne({email}) // Check kar rahe hai ki email pehle used hua hai ya nahi

    if(isUserAlreadyExists){
        return res.status(400).json({
            messsage:"User Already Exist with this Email Address"
        })
    }
    const user = await userModel.create({
        name , email , password
    })


    // jwt signature karta hai token ko
    const token = jwt.sign(  
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
)                                                             // JWT Token create karte waqt pehle user data dena hota hai mostly userid dete hai
                                                              // Then JWT SECRET dete hai
    
        res.cookie("jwt_token",token)    // Server Token Set Kardega Cookies mein

        res.status(201).json({
        message:"User Register Successfully",
        user,
        token
    })
})


module.exports = authRouter