const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [ true, "imgUrl is required for creating an post" ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // UserId important hai , without USER POST create nahi ho sakti hai
        ref: "users",                         // so (users) collection ka reference diya hai , konse user ne post create ki hai pata to chalna chahiye
        required: [ true, "User Id is required for creating an Post " ]
    }
})


const postModel = mongoose.model("posts", postSchema) //Posts creation ka Saara DATA ("posts") collections ke andar save hoga


module.exports = postModel