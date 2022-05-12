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
    }
},{
    timestamps: true
});

// this will help to create collection name and db in the db
const Post = mongoose.model('Post',postSchema);

module.exports = Post;

