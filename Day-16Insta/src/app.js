const express = require("express")
const cookieParser = require("cookie-parser") // Token Cookies mein save karne keliye use hoga


const app = express()
app.use(express.json()) // Middleware used for reading data from (req.body)
app.use(cookieParser()) //Middleware ki tarah use kiya

//Require Routes
const authRouter = require("./routes/auth.routes") // Routes require kiye hai
const postRouter = require("./routes/post.routes") // Routes require kiye hai
const userRouter = require("./routes/user.routes")

//Using Routes
app.use("/api/auth",authRouter) // prefix use hoga jo jo api create kiye hai authRoutes ki help se
app.use("/api/posts",postRouter) // prefix use hoga jo jo api create kiye hai postRoutes ki help se
app.use("/api/users",userRouter)

module.exports = app