 const express = require('express');
 const cors = require('cors'); //cross-side script use
 require('dotenv').config(); // to access .env file
 const app = express() ;
const  PORT = process.env.PORT || 8080; //run the back-end on custom port or default port
const connectDB = require('./config/mongoose');
 //middleware
 app.use(cors({
    origin : process.env.FRONTEND_URL, //only requests from http://frontend-app.com will be permitted.
    credentials: true      //allows the server to accept cookies or authentication headers (such as JWTs) in cross-origin requests.
 }));

//  controller
app.get('/',(req,res)=>{
    res.json({
        message : "hello everyone welcome to my app"+PORT
    })
});
connectDB()
    .then(() => {
        // Start your server here, e.g., app.listen(...)
        app.listen(PORT,()=>{
            console.log("server started at port :"+PORT);
         })
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });


