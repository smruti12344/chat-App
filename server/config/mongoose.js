const mongoose = require('mongoose'); //access mongoose library

//DB_Connection function
async function connectDB(){
    try {
       await mongoose.connect(); 
    } catch (error) {
        console.log("Somthing is wrong "+error);
    }
}