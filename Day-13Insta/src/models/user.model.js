const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username Not Available"],
        required:[true,"Username is Required"],
    },
    email:{
        type:String,        
        unique:[true,"Email Already in Used"],
        required:[true,"Email is Required"],
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    bio:String,
    profileImage:{
        type:String,
        default:""
    }    
})

const userModel = mongoose.model("users",userSchema) // Database mein "users" collections name mein data save hoga

module.exports = userModel