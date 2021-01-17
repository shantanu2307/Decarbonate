const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//No need to store emailid or password, would be handled by firebase
const dailySchema = new Schema({
    uid: {//uid  of user in mongodb
        type: String,
        ref:'user',
        required: true,
        unique: true
    },
    date:{
        day:{
     type: Number,//Day of the month
     default: 0},
     month:{
         type:Number
     }
    },
    water: {
        type: Number,
        default:0,
        min:0
    },
    gas: {
        type: Number,
        default:0,
        min:0
    },
    waste:{
        type:Number,
        default:0,
        min:0
    },
    commute:{
        type:Number,
        default:0,
        min:0
    },
    electronicDevices:{
        type: Number,
        default:0,
        min:0
    },
    total:{
        type: Number,
        default:0,
        min:0
    }
});

const DailyEmission = mongoose.model('dailyEmission', dailySchema);
module.exports = DailyEmission;