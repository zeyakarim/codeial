const mongoose = require('mongoose');

const resetPasswordTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken:{
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const Password = mongoose.model('Password',resetPasswordTokenSchema);

module.exports = Password;