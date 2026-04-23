const { connect } = require("mongoose")
const app = require("./src/app")
require('dotenv').config() // .env file ke varibale access karne keliye use hota hai
const connectToDb = require("./src/config/database")


connectToDb()

app.listen(3000,()=>{
    console.log("Server is Running at Port 3000")
})