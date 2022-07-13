const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// import kue for delayed jobs 
const queue = require('../config/kue');
const postEmailWorker = require('../workers/comment_post_email_worker');

// CREATE Post INSIDE DB
module.exports.create = async function(req,res){
    try{
        let post;
        
        Post.uploadedAvatar(req,res, async function(err){
            // console.log(req.body);
            if(err){
                console.log('***Multer Error:',err);
            }
            post = await Post.create({
                content: req.body.content,
                user: req.user._id
            });

            // console.log(req.file);
            if(req.file){
                // first it will go userSchema.uploadedAvatar function and save 
                // the file destination and filename in the localstorage/multer storage
                post.postAvatar = Post.avatarPath + '/' + req.file.filename;
            }
            post.save();

            post = await post.populate('user','name avatar email');
            console.log(post);

            let job = queue.create('posts',post).save(function(err){
                if(err){
                    console.log('error in creating a queue',err);
                    return;
                }
                console.log('job enqueued',job.id);
            })

            if(req.xhr){
                // after populate it will give only user name because i will specified only user name
                // post = await post.populate('user','name');

                post = await post.populate('user','name avatar');

                return res.status(200).json({
                    data: {
                        post : post
                    },
                    message: 'Post Created!'
                });
            }

            req.flash('success','Post Published!');
            return res.redirect('back'); 
        });
    }catch(err){
        req.flash('error',err);
        return res.redirect('back'); 
    }
}

// REMOVE THE POST INSIDE DB AND WEBSITE
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){

            // CHANGE :: delete the associated likes for the post and all its comments likes too
            await Like.deleteMany({likeable: post,onModel: 'Post'});
            await Like.deleteMany({_id:{$in: post.comments}});

            // it will remove the post in db
            post.remove();

            let comment = await Comment.deleteMany({post: req.params.id});

            if (req.xhr){

                return res.status(200).json({
                    data: {
                        post_id : req.params.id
                    },
                    message: 'Post Deleted'
                });
            }

            req.flash('success','Post and associated comments deleted');

            return res.redirect('back');

        }else{
            // if post.user or req.user doesn't match then come here
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

