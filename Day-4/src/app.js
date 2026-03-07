// Server ko Create karna 
// Server ko Config Karna

const express = require("express")

const app = express()

app.use(express.json()) // Middleware to Read Data from (Req.Body)

const notes = []

//Post
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message:"Note Created Successfully"
    })
})

// Get 
app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes: notes
    })
})

//Delete
app.delete("/notes/:id",(req,res)=>{
    delete notes[req.params.id]
    res.status(200).json({
        message:"Note Deleted Successfully"
    })
})


//Patch
app.patch("/notes/:id",(req,res)=>{
    notes[req.params.id].description = req.body.description
    res.status(200).json({
        message:"Description Was Updated Successfully"
    })
})


module.exports = app