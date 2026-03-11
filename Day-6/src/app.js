// Server Ko Create karna

const express = require("express")
const noteModel = require("./models/notes.model")
const app = express()

app.use(express.json()) // Middleware jo (req.body) ka data read karta hain and present karta hai

// Post
//req.body => {title , description }

app.post("/notes",async (req,res)=>{
    const {title , description} = req.body
    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note Created Successfully",
        note
    })
})

module.exports = app 