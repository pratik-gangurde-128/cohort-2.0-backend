// Server Ko Start Karna
// Database se connect karna

const app = require("./src/app")

const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb://Pratik:tThYlrqhqnqDu0IC@ac-ephyqsi-shard-00-00.anumthi.mongodb.net:27017,ac-ephyqsi-shard-00-01.anumthi.mongodb.net:27017,ac-ephyqsi-shard-00-02.anumthi.mongodb.net:27017/?ssl=true&replicaSet=atlas-pe886h-shard-0&authSource=admin&appName=Cluster0/Day-5")
    .then(() => {
        console.log("Connected to Database")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("Server is Running at Port 3000")
})