const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//No need to store emailid or password, would be handled by firebase
const monthlySchema = new Schema({
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
    gas:{
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