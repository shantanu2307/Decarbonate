const mongoose = require("mongoose")
const Schema = mongoose.Schema
const voterSchema= new Schema( {
        cid:{//chat id
                type: Schema.Types.ObjectId,
                ref:'chats'
        },
        voterid:{
                type:Schema.Types.ObjectId,
                ref:'user'
        }
}
        );
        const voter = mongoose.model('Voter',voterSchema);
        module.exports = voter
    