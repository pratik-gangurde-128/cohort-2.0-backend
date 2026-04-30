//yeha API ka logic hoga and badmein export kiya jayega
// (auth.routes.js) mein import hoga

const userModel = require("../models/user.model")
// const crypto = require("crypto") // Password HASHING keliye   👈 Basic Hai kaafi
const bcrypt = require("bcryptjs") // Password HASHING keliye ADVANCED hai kaafi
const jwt = require("jsonwebtoken") // Token Generate karne ke liye

async function registerController (req,res){
    const { username , email , password , bio , profileImage } = req.body

    // // Username Check Karna agar pehle is register hai ya nahi
    // const isUserExistsByUsername = await userModel.findOne({username})

    // if(isUserExistsByUsername){
    //     return res.status(409).json({
    //         message:"User Already Exits with Same Username"
    //     })
    // }
    // // Email Check Karna agar pehle is register hai ya nahi
    // const isUserExistsByEmail = await userModel.findOne({email})

    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message:"User Already Exits with Same Email"
    //     })
    // }

    //👆👆 Upar wala code bhi sahi hai but issue yeh hai ki SEPERATE request hit ho rahi bai server par 👆👆
    // Agar yehi kaam Single Request par ho to Best hoga


    /* 👇👇 yeh code dono conditions ONE time mein hi check kar raha hai 👇👇*/
    const isUserAlreadyExits = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExits){
        return res.status(409).json({
            message:"User Already Exits" + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
        })                                 //👆👆 Agar email used hua hai to email ka error show hoga else Username ka show hoga
    }

    //Password Hashing 
    // const hash = crypto.createHash('sha256').update(password).digest('hex') 👈 Pehle yeh use hota tha

    const hash = await bcrypt.hash(password, 10)   // 10 Means number of layer of hashing


    //Finally User ko save karenge
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    }) 

    //Token create karenge
    //Conditions for token are      1) User ka data hona Chahiye
    //                              2) Data Unique hona Chahiye Isiliye best hai ki (User_Id) pass keejaye
    const token = jwt.sign(
        {
            id: user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }         //Token expire hoga 1 day mein
    )

    // Token ko Cookie mein save karna

    res.cookie("token", token)

    res.status(201).json({
        message: "User Registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }                                          // Response mein yeh sab show hoga
    })
}

async function loginController(req,res){
    const { username, email, password } = req.body

    /**
     * username
     * password
     *                                // Dono options se login honeke option derahe hai 
     * email
     * password
     */

    /**
     * { username:undefined,email:test@test.com,password:test } = req.body
     */ // Agar username nahi diya to uski value Undefined hogi and database mein kisiki bhi value undefined nahi hogi
        // to ofcourse email search karega database mein matlab email se login kar paaye

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    }).select("+password")
    
    //Agar User Nahi milta hai 
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    //User ne jo password put kiya hai login ke waqt , usse pehle hash mein convert karenge .
    // Kyuki (user password) directly (hash password) se compare nahi ho sakta hai ,
    // Hum hash password ko hash password se hi compare karenge , Kyuki SAME INPUT par SAME HASH password generate hota hai

    // const hash = crypto.createHash('sha256').update(password).digest('hex') 
    
    // New Method Bcrypt se bus compare karna hai password
    const isPasswordValid = await bcrypt.compare(password, user.password) 

    //AGAR PASSWORD galat hua 
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "password invalid"
        })
    }
    
    //Password MATCHED hone par hi Token Generate karna
    const token = jwt.sign(
        { id: user._id , username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    //Cookie Generate karna
    res.cookie("token", token)

    //Response Code and DATA send karna
    res.status(200)
        .json({
            message: "User loggedIn successfully.",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })
}


async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}