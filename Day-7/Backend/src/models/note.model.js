const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:String,
    description:String
})

const noteModel = mongoose.model("notes",noteSchema) // Collection ka naam (notes) 
                                                     // hoga agar hum naam (note) write karte to 
                                                     // automaticallay ("s") add hojata end mein and ("notes") naam
                                                     // se collection create ho jata

module.exports = noteModel