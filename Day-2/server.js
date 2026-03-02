const express = require("express")

const app = express() 

app.use(express.json())

const notes = []

app.get('/',(req,res) => {
    res.send("Home Page")
})

app.post('/notes',(req,res) => {
    console.log(req.body)
    notes.push(req.body)
    res.send("Notes Has been Created")
})

app.get('/notes',(req,res) => {
    res.send(notes)
})

app.listen(3000 , () =>{
    console.log("Server is Running on Port 3000")
})