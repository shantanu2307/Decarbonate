const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//No need to store emailid or password, would be handled by firebase
const monthlySchema = new Schema({
    uid: {//uid  of user in mongodb
        type: String,
        ref:'user',
        required: true,
        unique: true
    },
    month:{
     type: Number
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
    flights: {
        type: Number,
        default:0,
        min:0
    },
    electricity:{
        type:Number,
        default:0,
        min:0
    },
    total:{
        type: Number,
        default:0,
        min:0
    }
});

const MonthlyEmission = mongoose.model('monthlyEmission', monthlySchema);
module.exports = MonthlyEmission;