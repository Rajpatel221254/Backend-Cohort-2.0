const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title:String,
    description:String
})

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel