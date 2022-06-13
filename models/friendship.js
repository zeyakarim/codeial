const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // this user who sent this request
    from_user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // this user who accepted this request,the naming is just to understand,otherwise the user won't see a diffrence
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship',friendshipSchema);

module.exports = Friendship;