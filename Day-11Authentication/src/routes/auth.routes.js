const express = require("express")
const authRouter = express.Router();    // Abhi saare routes authRoutes se hi create karenge
                                        // authRouter se apis create hojayegi but usse 
                                        // (app.js) mein require karna hai hoga

const userModel = require("../models/user.model")   // Register API se User Model Create 
                                                    //  karna hai isiliye require kiya hai

const crypto = require("crypto") // PASSWORD Hashing keliye
const jwt = require("jsonwebtoken") // Token Create karne keliye





// Post API ("/api/auth/register")
authRouter.post("/register",async(req,res)=>{
        const {name,email,password} = req.body  // Destructuring from req.body

        // Pehle Check karna hoga user ne jo email diya hai woh pehle se use to nahi hua hai na..
        const isUserExists = await userModel.findOne({email})

        if(isUserExists){
            return res.status(409).json({
                message:"User Already Exits"
            })
        }

        //Agar email use nahi hua hai pehle to user create hoga
        const user = await userModel.create({
            name,
            email,
            password:crypto.createHash('sha256').update(password).digest('hex')
                        // Abhi password kabhi bhi plain text mein save nahi karte hai isiliye 
                        // HASHING karni hogi
        })

        //Token Create karna hai and badle mein token unique data mangti hai so best hai ki ( ID )pass ki jaye )
        const token = jwt.sign({
            id:user._id,
        },process.env.JWT_SECRET,{expiresIn: "1h"})     // Token ki expiry add kiya hai kab tak valid rahega    
    
        // Abhi token bhi create hua hai to client ko send karne ke liye 
        // COOKIES ke through send and save hota
        // so Token (Cookies-storage) ke andar save hota hai
        // Cookie storage meinhi kyu save karna hai?... kyuki server access(Read) kar sakta hai cookie storage
        
        res.cookie("token",token)  //key ka naam (token) name se hoga cookie mein  
                                   // Client Side Cookie Storage mein key-value ke pair mein save hota hai
        res.status(201).json({
            message:"User Registered SuccessFully",
            user:{
                name:user.name,
                email:user.email,
            },
        })
    
})


authRouter.get("/get-me",async(req,res)=>{
    const token = req.cookies.token // Har req jo user karta hai uspar token aata hai 
                                    // to hum token se user ki info nikal sakte hai
    
    //token se data nikalne ke keliye 
    const decoded = jwt.verify(token,process.env.JWT_SECRET)  // Yeh Token ko verify karta hai ki 
                                                              // humare hi server se generate hua hai yaa nahi
    console.log(decoded) // Agar token sahi nikalta hai to hume data milega 

    const user = await userModel.findById(decoded.id)

    res.json({
        name:user.name,
        email:user.email,
        })
})


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
    
    const isPasswordMatched = user.password === crypto.createHash("sha256").update(password).digest("hex") // User ka Password Check ho raha hai hash form mein
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
        process.env.JWT_SECRET,{expiresIn:"1h"}
        )                                // JWT Token create karte waqt pehle user data dena hota hai mostly userid dete hai
        res.cookie("token",token)    // Server Token Set Kardega Cookies mein  

        res.status(201).json({
        message:"User Logged In Successfully",
        user:{
            name:user.name,
            email:user,email,
        }
    })
})


module.exports = authRouter