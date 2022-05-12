// require the post model schema
const Post = require('../models/post');

module.exports.home = function(req,res){

    // populate the user of each post
    Post.find({}).populate('user').exec(function(err,post){
        if(err){
            console.log('error in fetching posts from db');
            return;
        }
           
        return res.render('home',{
            title : "Home",
            posts: post
        });
    });
}


