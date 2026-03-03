const express = require("express")

const app = express() // server create ho jata hai

app.get('/',(req,res) => {
    res.send("Home Page")
})

app.use(express.json())

const notes = [] // empty array so that we can push objects in that through POST request from Postman

// Post Request

app.post("/notes",(req,res)=>{
    // console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send(" Notes Created ")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("Notes Deleted Successfully")
})

//Patch  /notes/:index
//req.body = {description :- "sample modified description"}

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("Notes Updated Successfully")
})
module.exports = app // Server ko Export kardiya hai , ab Server.js mein server start kar sakte hai