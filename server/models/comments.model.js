const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//No need to store emailid or password, would be handled by firebase
const chatsSchema = new Schema({
    uId: {//uid  of user in mongodb
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true,
        unique: true
    },
    cId: {//chat id 
        type: Schema.Types.ObjectId,
        ref:'chats',
        required: true,
        unique: true
    },
    date:{
     type: Date,
     default: Date.now
    },
    content: {
        type: String,
        required: true
    }
});

const Chats = mongoose.model('chats', chatsSchema);
module.exports = Chats;