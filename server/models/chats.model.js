const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//No need to store emailid or password, would be handled by firebase
const chatsSchema = new Schema({
    uid: {//uid  of user in mongodb
        type: String,
        ref:'user',
        required: true,
    },
    date:{
     type: Date,
     default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    votes:{
        type:Number,
        default:0
    }
});

const Chats = mongoose.model('chats', chatsSchema);
module.exports = Chats;