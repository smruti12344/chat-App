const  mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text : {
        type : String,
        default:""
    },
    image :{
        type :String,
        default:""
    },
    videoUrl :{
        type : String,
        default:""
    },
    seen :{
        type: Boolean,
        default:false
    }

},
{
    timestamps:true
})

const MessageModel = mongoose.model('Message',messageSchema);
module.exports = MessageModel;