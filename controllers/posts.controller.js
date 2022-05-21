const Post = require('../models/post');
const Comment = require('../models/comment');

// CREATE COMMENT INSIDE DB
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
         
        return res.redirect('back'); 

    }catch(err){
        console.log('Error',err);
        return;
    }
}

// REMOVE THE POST INSIDE DB AND WEBSITE
module.exports.destroy = async function(req,res){
    let post = await Post.findById(req.params.id);

    // .id means converting the object id into string
    if(post.user == req.user.id){

        // it will remove the post in db
        post.remove();

        let comment = await Comment.deleteMany({post: req.params.id});

        return res.redirect('back');

    }else{
        // if post.user or req.user doesn't match then come here
        return res.redirect('back');
    }
}

