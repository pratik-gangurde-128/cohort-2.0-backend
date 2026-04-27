const mongoose = require("mongoose")

async function connectToDatabase(){
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected To Database")
}

module.exports = connectToDatabase