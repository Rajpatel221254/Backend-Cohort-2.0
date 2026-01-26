const express = require('express') // require express to create server

const app = express() // create a server using express

let notes = [] // empty array to store notes..

app.use(express.json()) // Middleware used for reading json data come from postman...

app.post('/notes',(req,res)=>{
    notes.push(req.body) // req.body is the data you send from postman.. like note and userdata

    res.send("note created successfully")
})

app.get('/notes',(req,res)=>{
    res.send(notes) // res.send(notes) send notes as response to this request
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index] // req.params.index is used to get index from url like req.params give you power to get something from url which is dynamic and index is dynamic to get index use req.params.index.... 
    // delete method delete the note at particular index and replace it with null because its js default behavior...

    res.send("Note deleted successfully..")
})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description = req.body // using req.params.index we get particular note and .dexcription give the description of that note and req.body give data which is send by postman and put into the description of particular note...

    res.send("Note updated succesfully..")
})

module.exports = app // export app for starting of server in server.js