const mongoose = require("mongoose")


// User ka Schema Create Karna hai
const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Email Already Exits"] // Jab user same email use karega new registration/new account ke liye to error aayega
        },
    password:String
})

//User ka Model Create Karna Hai
const userModel = mongoose.model("user",userSchema) // user(s) naam se create hoga collection Database mein 
                                                    // [collection ke naam ke end mein automatically 
                                                    // (s) add hota hai]

module.exports = userModel