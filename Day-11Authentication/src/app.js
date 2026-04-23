const express = require("express")
const app = express()
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")


app.use(express.json()); // Middleware is used To read data from (req.body)
app.use(cookieParser()); // Cookies mein token save karne keliye

app.use("/api/auth",authRouter) // Prefix hai 
                                // Authentication ki jo bhi api hogi woh prefix se start hogi("api/auth")

module.exports = app