const express = require('express')

const app = express()

app.use(express.json()) // to read req.body because this server doesn't have power to see the req.body part so this line give permission to read and store

const notes = [] // notes array for storing notes

app.post("/notes", (req,res)=>{

    // req is used to get data from frontend part when user gives something data like username , password or etc....

    console.log(req.body); // to get req.body = to get note from frontend part or data from frontend part

    notes.push(req.body) // storing notes in note array

    res.send('Note created')
})

app.get("/notes", (req,res)=>{
    res.send(notes) // display notes when use request on /notes but method is get
})

app.listen(3000, ()=>{
    console.log("Server is running on Port 3000");
})