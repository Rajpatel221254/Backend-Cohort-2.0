const mongoose = require('mongoose'); // require mongoose to use connect method of mongoose
const app = require('./src/app'); // require a server to start from app.js

function ConnectToDb() {
    mongoose.connect('mongodb+srv://rajpatel221254_db_user:8nG90BauMAzFy5L0@cluster0.dcoumd6.mongodb.net/Day-6').then(()=>{
        console.log("Connected to Database");
    })
} // function which use mongoose.connect to connect to the database and this method takes uri which is the uri of database , we can find uri of database using three dot and then copy connection string and paste here . then is run when we connect to the database....

ConnectToDb()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
}) // starting a server on 3000