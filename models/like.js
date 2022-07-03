const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // this defines the objectId of the like object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post','Comment']
    }
},{
    timestamps: true
});


const Like = mongoose.model('Like',likeSchema);

module.exports = Like;