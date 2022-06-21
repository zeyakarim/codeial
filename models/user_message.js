const mongoose = require('mongoose');

const userMessageSchema = new mongoose.Schema({
    message: {
        type : String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});


const MessageSchema = mongoose.model('MessageSchema',userMessageSchema);

module.exports = MessageSchema;