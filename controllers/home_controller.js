// require the post and user model schema
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){

    try{
        // change:: populate the likes of each post and comment
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate :{
                path: 'user'
            }
        }).populate('likes');

        let friends;
        if(req.user){
            friends = await User.findById(req.user._id)
            .populate({
                path: 'friendships',
                populate: {
                    path: 'to_user'
                },
            })
            .populate({
                path: 'friendships',
                populate: {
                    path: 'from_user'
                },
            })
        }
        
        
        let users = await User.find({});

        return res.render('home',{
            title : "Home",
            posts: post,
            all_users: users,
            userfriends :friends
            
        });

    }catch(err){
        console.log('Error',err);
        return;
    }         
}


