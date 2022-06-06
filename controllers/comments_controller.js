// REQUIRE COMMENT AND POST MODEL
const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

// import kue for delayed jobs 
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');


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
            comment = await comment.populate('user','name avatar email');

            // commentsMailer.newComment(comment);

            // lets pass the comment in the emails queue which are already created in kue
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('error in creating a queue');
                    return;
                }
                console.log('job enqueued',job.id);
            });

            if(req.xhr){
                // comment = await comment.populate('user','name');
                
                return res.status(200).json({
                    data: {
                        comment : comment
                    },
                    message: 'Comment is created'
                });
            }

            req.flash('success','Comment published');
            res.redirect('/');
        }
    }catch(err){
        console.log('Error',err);
        return res.redirect('back');
    }
}

// REMOVE THE COMMENT INSIDE DB AND WEBSITE
module.exports.destroy = async function(req,res){
    // console.log(req.body);
    try{
        // FIRST FIND THE COMMENT INSIDE THE DB
        let comment = await Comment.findById(req.params.id);

        // CHECK COMMENT.USER.ID AND REQUEST.USER.ID BOTH ARE SAME
        if(comment.user == req.user.id ){

            // STORE THE POST ID
            let postId = comment.post;
            
            // REMOVE THE COMMENT IN DB
            comment.remove();

            // REMOVE THE COMMENT ID INSIDE THE POST.COMMENTS ARRAY
            let post = await Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}});

            if(req.xhr){

                return res.status(200).json({
                    data: {
                        comment_Id : req.params.id
                    },
                    message: 'Comment deleted'
                });
            }

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