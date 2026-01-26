const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.get('/about',(req,res)=>{
    res.send('Hello World , about page')
})
app.get('/home',(req,res)=>{
    res.send('home page')
})

app.listen(3000);