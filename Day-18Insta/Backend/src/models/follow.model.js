const mongoose = require("mongoose");


const followSchema = new mongoose.Schema({
    follower: {
        type: String,
    },
    followee: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: [ "pending", "accepted", "rejected" ],
            message: "status can only be pending, accepted or rejected"
        }
    }
},
    {
    timestamps: true  // Time batata hai ki Document kab create hua tha yaa kab update hua tha
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel