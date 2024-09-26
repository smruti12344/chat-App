const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId, // You can explicitly define it, but MongoDB adds it automatically
        required:true,
        ref : 'User'  //// Reference to the User model
    },
    recevier : {
        type:mongoose.Schema.ObjectId, //// You can explicitly define it, but MongoDB adds it automatically
        required:true,
        ref : 'User'
    },
    messsage : {
        type : mongoose.Schema.ObjectId,
        ref : 'Message'
    }
},{
    timestamps : true
});

const communicationModel = mongoose.model('Communication',conversationSchema);
module.exports = communicationModel; 