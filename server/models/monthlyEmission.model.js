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
        type: String,
    },
    electricity:{
        type:String,
    },
    gas:{
        type:String
    }
});

const MonthlyEmission = mongoose.model('monthlyEmission', monthlySchema);
module.exports = MonthlyEmission;