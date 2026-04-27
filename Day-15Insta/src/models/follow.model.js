const mongoose = require("mongoose");


const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "Follower is required" ]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "Followee is required" ]
    }
}, {
    timestamps: true  // Time batata hai ki Document kab create hua tha yaa kab update hua tha
})


const followModel = mongoose.model("follows", followSchema)

module.exports = followModel