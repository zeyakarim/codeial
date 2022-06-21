// require the post and user model schema
const Post = require('../models/post');
const User = require('../models/user');
const Message = require('../models/user_message');

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
        let usermsg;
        let usermessage;
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

            usermsg = await User.findById(req.user._id).populate('messages');
            allUserMessage = await Message.find({}).populate('user');
            // msg = await User.find({}).populate('messages');
        }
        
        
        let users = await User.find({});

        return res.render('home',{
            title : "Home",
            posts: post,
            all_users: users,
            userfriends :friends,
            allUserMsg : allUserMessage,
            usermsg : usermsg
        });

    }catch(err){
        console.log('Error',err);
        return;
    }         
}


