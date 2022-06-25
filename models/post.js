// require the mongoose library
const mongoose = require('mongoose');

// setting the multer 
const multer = require('multer');
const path = require('path');
const { stringify } = require('querystring');
const AVATAR_PATH = path.join('/uploads/posts/avatars');

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
    postAvatar: {
        type: String
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname ,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});

// statics methods or functions using this i am connecting userSchema and multer storage
postSchema.statics.uploadedAvatar = multer({storage: storage}).single('postAvatar');
postSchema.statics.avatarPath = AVATAR_PATH;


// this will help to create collection name to this postSchema in the db
const Post = mongoose.model('Post',postSchema);

module.exports = Post;

