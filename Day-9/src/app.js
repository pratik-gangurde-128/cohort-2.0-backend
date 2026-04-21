// Server Ko Create karna

const express = require("express")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter) // ("/api/auth") bus prefix hai , aur USE karna hoga har api hit karnese pehle jo authRoter se create kiye hai
module.exports = app            // for eg (/register) api  hit karni hai to (/api/auth/register) use karna hoga kyuki authRouter se create kiya hai 