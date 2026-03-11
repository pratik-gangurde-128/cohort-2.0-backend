const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const noteModel = mongoose.model("notes",noteSchema) // Collection ka Naam ("notes") hoga jo compass mein visible hoga 

module.exports = noteModel