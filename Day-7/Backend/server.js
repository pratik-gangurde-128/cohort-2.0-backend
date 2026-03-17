// Server Ko Start karna
// Database ko Connect Karna

const app = require("./src/app")
require('dotenv').config()
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000,()=>{
    console.log("Server is Running at Port 3000")
})