require('dotenv').config() // .env file ke variable access karne keliye
const app = require("./src/app")
const connectToDatabase = require("./src/config/database")


connectToDatabase()


app.listen(3000,()=>{
    console.log("Server is Running at Port 3000")
})