const mongoose = require("mongoose")
const Schema = mongoose.Schema
const voterSchema= new Schema( {
        cid:{//chat id
                type: Schema.Types.ObjectId,
                ref:'chats',
                required: true,
        },
        uid:{
                type:String,
                ref:'user',
                required: true
        }
}
        );
        const Voter = mongoose.model('Voter',voterSchema);
        module.exports = Voter
    