const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//No need to store emailid or password, would be handled by firebase
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    uid:{//from firebase
        type:String,
        required:true,
        unique:true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;