const Post = require('../models/post');
const Comment = require('../models/comment');

// CREATE COMMENT INSIDE DB
module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if (err){
           console.log('error in creating a post');
           return; 
        }
        return res.redirect('back');
    });
}

// REMOVE THE POST INSIDE DB AND WEBSITE
module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(post.user == req.user.id){

            // it will remove the post in db
            post.remove();

            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}

