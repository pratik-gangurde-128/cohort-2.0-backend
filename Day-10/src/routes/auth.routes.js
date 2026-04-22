// register api create karne ke liye yeh route file SEPERATE create ki hai  

const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")

// User ko Register karne POST method use hogi
authRouter.post("/register",async(req,res)=>{
    const {name , email , password} =  req.body
    
    const isUserAlreadyExists = await userModel.findOne({email}) // Check kar rahe hai ki email pehle used hua hai ya nahi

    if(isUserAlreadyExists){
        return res.status(409).json({
            messsage:"User Already Exist with this Email Address"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex") // Password ko Hash mein convert karna

    const user = await userModel.create({
        name , email , password:hash
    })


    // jwt signature karta hai token ko
    const token = jwt.sign(  
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
        )                                                     // JWT Token create karte waqt pehle user data dena hota hai mostly userid dete hai
                                                              // Then JWT SECRET dete hai
    
        res.cookie("jwt_token",token)    // Server Token Set Kardega Cookies mein

        res.status(201).json({
        message:"User Register Successfully",
        user,
        token
    })
})

authRouter.post("/protected",async(req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
            messsage:"This Is Protected Route"
        })
})



//(api/auth/login) har api ke prefix mein (api/auth) use hoga hi because authRouter se jo bhi api create hogi uske liye mandatory hai
authRouter.post("/login", async(req,res)=>{
    const { email , password } = req.body   //Agar email aur password correct hai to token create karna hai
    const user = await userModel.findOne({ email }) // Email Exist Karta hai ya nahi

    if(!user){                        // Agar email hi exist nahi karta hai user ka iska Matlab yeh hua ki account exist nahi karta
        return res.status(404).json({
            messsage:"User Not Found with this Email Address"
        })
    }

    // Hashing ki Properties    1) Same Input humesha Same Output Generate karega
    //                          2) Hash Value kabhi bhi inreturn mein PLAIN TEXT mein convert NAHII ho sakta
    
    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex") // User ka Password Check ho raha hai hash form mein
    // Agar koi word hash mein convert hota hai to uski value same hoti hai 
    // Matlab (pratik) word ka hash(0cb2b62754dfd12b6ed0161d4b447df7)value mein convert hua to uski value same hogi throughout
    // Matlab jab jab (pratik) word hash mein convert hoga uski hash value(0cb2b62754dfd12b6ed0161d4b447df7) same hi hogi kabhi bhi change nahi hoti hai
    // Inshort Data leak bhi hua to no issue email hi leak hoga but password leak nahi hoga because woh Hash form mein hai
    if(!isPasswordMatched){                              // Password MATCH nahi hua to Error
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign(                              //Email PASSWORD sahi hone ke badmein token generate karna
        {
            id: user._id,
        },
        process.env.JWT_SECRET
        )                                // JWT Token create karte waqt pehle user data dena hota hai mostly userid dete hai
        res.cookie("jwt_token",token)    // Server Token Set Kardega Cookies mein  

        res.status(201).json({
        message:"User Logged In Successfully",
        user,
    })
})

module.exports = authRouter