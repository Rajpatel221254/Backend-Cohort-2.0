const app = require('./src/app') // getting app from app.js 

app.listen(3000, ()=>{
    console.log("Server is running on 3000 port");
}) // starting a server using app and give callback to ensure server is started