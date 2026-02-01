const express = require("express");
const noteModel = require("../models/note.model");

require("dotenv").config();
const app = express();

app.use(express.json());

/*
 - POST - /api/notes
 - create note and save in data in mongodb
 - {title,description}
*/
app.post("/api/notes",async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({ message: "Note created successfully", note });
});

/*
 - GET - /api/notes
 - fetch all notes from database
 - format : [{title,description}] (array of object)
*/
app.get('/api/notes',async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Note Fetched successfully",
        notes
    })
})

/*
 - DELETE - /api/notes/:id
 - delete note from database using id 
*/
app.delete('/api/notes/:id', async (req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(204).json({
        message:"Note deleted successfully"
    })
})

/*
 - PATCH - /api/notes/:id
 - update description of any note from id
*/
app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message:"Note updated successfully"
    })
})

module.exports = app;
