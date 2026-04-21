// Server Ko Start karna
// Database ko Connect Karna

require('dotenv').config() // .env file wale variable access karne keliye
const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000,()=>{
    console.log("Server is Running at Port 3000")
})