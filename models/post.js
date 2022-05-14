// require the mongoose library
const mongoose = require('mongoose');

// create the schema in the database
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

// this will help to create collection name to this postSchema in the db
const Post = mongoose.model('Post',postSchema);

module.exports = Post;

