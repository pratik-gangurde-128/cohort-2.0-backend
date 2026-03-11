// Server Ko Start Karna
// Database ko connect karna

const app = require("./src/app")
const connectToDb = require("./src/config/database")
require("dotenv").config()

connectToDb()

app.listen(3000,()=> {
    console.log("Server Is Running At Port 3000")

})