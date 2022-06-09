// require the mongoose library
const mongoose = require('mongoose');

// creating commentSchema inside the db
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

// create model name and with schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;