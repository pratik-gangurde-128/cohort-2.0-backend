const mongoose = require("mongoose")


// Schema Format Batane ke liye create karte hai
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [ true , "This email account has already exits"] // 1 email se bus 1 hi account create ho paye is CHECK lagaya hai
    }, 
    password: String,
})                    


// Model operation perform karne keliye create karte hai
const userModel = mongoose.model("users",userSchema) // Collection ka naam (users) 
                                                    // hoga agar hum naam (user) write karte to 
                                                    // automaticallay ("s") add hojata end mein and ("users") naam
                                                    // se collection create ho jata


module.exports = userModel