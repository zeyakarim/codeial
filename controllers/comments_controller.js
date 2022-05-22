// REQUIRE COMMENT AND POST MODEL
const Comment = require('../models/comment');

const Post = require('../models/post');

// CREATE COMMENT INSIDE DB
module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // ADD THE comment.id INSIDE POST.COMMENTS ARRAY
            post.comments.push(comment);
            post.save();

            req.flash('success','Comment are published');
            res.redirect('/');
        }
    }catch(err){
        console.log('Error',err);
        return res.redirect('back');
    }
}

// REMOVE THE COMMENT INSIDE DB AND WEBSITE
module.exports.destroy = async function(req,res){

    try{
        // FIRST FIND THE COMMENT INSIDE THE DB
        let comment = await Comment.findById(req.params.id);

        // CHECK COMMENT.USER.ID AND REQUEST.USER.ID BOTH ARE SAME
        if(comment.user == req.user.id){

            // STORE THE POST ID
            let postId = comment.post;
            
            // REMOVE THE COMMENT IN DB
            comment.remove();

            // REMOVE THE COMMENT ID INSIDE THE POST.COMMENTS ARRAY
            let post = await Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}});

            req.flash('success','Comment are Deleted Successfully')
            return res.redirect('back');

        }else{
            // IF COMMENT.USER AND req.user.id ARE NOT SAME THEN COME HERE
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return res.redirect('back');
    }
}