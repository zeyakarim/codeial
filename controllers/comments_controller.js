// REQUIRE COMMENT AND POST MODEL
const Comment = require('../models/comment');

const Post = require('../models/post');

// CREATE COMMENT INSIDE DB
module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){
                    console.log('Error creating value in db');
                    return;
                }

                // ADD THE comment.id INSIDE POST.COMMENTS ARRAY
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
}

// REMOVE THE COMMENT INSIDE DB AND WEBSITE
module.exports.destroy = function(req,res){

    // FIRST FIND THE COMMENT INSIDE THE DB
    Comment.findById(req.params.id,function(err,comment){

        // CHECK COMMENT.USER.ID AND REQUEST.USER.ID BOTH ARE SAME
        if(comment.user == req.user.id){

            // STORE THE POST ID
            let postId = comment.post;
            
            // REMOVE THE COMMENT IN DB
            comment.remove();

            // REMOVE THE COMMENT ID INSIDE THE POST.COMMENTS ARRAY
            Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            });

        }else{
            // IF COMMENT.USER AND req.user.id ARE NOT SAME THEN COME HERE
            return res.redirect('back');
        }
    });
}