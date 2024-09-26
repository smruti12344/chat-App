const mongoose = require('mongoose'); //access mongoose library
const dbUrl = process.env.MONGODB_URL;

//DB_Connection function
async function connectDB(){
    try {
       await mongoose.connect(dbUrl);  //connect request to mongodb
       const connection = mongoose.connection ;
       connection.on('connected',()=>{
        console.log("connected to Database");
       })
       connection.on('error',(error)=>{
        console.log("Something went to wrong inside MongoDb"+error);
       })
    } catch (error) {
        console.log("Somthing is wrong "+error);
    }
}
module.exports = connectDB ;