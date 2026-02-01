const express = require("express");

const app = express();

app.use(express.json()); // middleware to read json data user send with request...

const notes = []; // empty array to store notes

/* 
    res.status has one field which contain which status to send like 
    200 -> sucessfull request 
    201 -> sucessfully created resource
    204 -> sucessfully deleted resource
    and another part of res.status is you can send message with it in json format 
    for that you have to write res.status(200).json({
    in this you have to write message that printed on ...
    and 204 doesn't send any content or message so use that status wisely....
    })
*/

app.post("/notes", (req, res) => {
  notes.push(req.body); // pushing a note to notes array (req.body access a note from user send data)

  res.status(201).json({
    message: "Note created successfully", // send message when request sucessfully complete...
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes, // send notes when request occur (as content)
  });
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.status(204);
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;

  res.status(200).json({
    message: `Note ${req.params.index} updated Sucessfully..`, // send message with index number using req.params.index ...
  });
});

module.exports = app;

/*
    in course we use non-sql database and choose mongo-db 
    in mongo-db we have a mongodb-atlas website where we create a clusters to store data and in mongodb compass we connect that cluster and stores a data to connect our ip should be in access list of cluster and

    using 0.0.0.0/0 ip we access all ips to perform operation on our database and connect database...
*/