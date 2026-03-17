// Server Ko Create karna

const express = require("express")
const noteModel = require("./models/note.model")

const app = express()
app.use(express.json()) // Middleware jo req.body ko read karta hai

//Post api/notes
// Create new note and save data in mongoDB
// req.body = {title , description} -----> req.body se title and description destructure kar lenge

app.post("/api/notes", async (req,res)=>{
    const {title , description} = req.body
    const note = await noteModel.create({
        title , description
    })
    res.status(201).json({
        message:"Note Created Successfully",
        note
    })
})

// Get  api/notes
//Fetch all notes data from mongodb and send them in response

app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find()   // Find Method Jitne bhi notes database mein create hue honge 
                                           // woh sab fetch karega
    res.status(200).json({
        message:"Notes Fetched Successfully",
        notes
    })
})

//Delete api/notes/:id
//Delete note with the id from (req.params)

app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Id Deleted Successfully"
    })
})

//Patch api/notes/:id
//Update the description of the note
// req.body = {description} ------> Req.Body se bus description Destructure karna hai

app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    const {description} = req.body
    await noteModel.findByIdAndUpdate(id, {description} ) //Description Update karna hai is obejct ki form mein pass kiya
    res.status(200).json({
        message:"Description Updated Successfully"
    })
})

module.exports = app