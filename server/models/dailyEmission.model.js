const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//No need to store emailid or password, would be handled by firebase
const dailySchema = new Schema({
    uId: {//uid  of user in mongodb
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true,
        unique: true
    },
    date:{
     type: Date,
     default: Date.now
    },
    water: {
        type: String,
    },
    watse:{
        type:String,
    },
    commute:{
        type:String
    },
    electronicDevices:{
        type: String
    }
});

const DailyEmission = mongoose.model('dailyEmission', dailySchema);
module.exports = DailyEmission;