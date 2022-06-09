const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){

    try{
        // console.log(req.query);
        // url likes/toggle/?id=abcdde&type=Post/Comment
        let likeable;
        let deleted = false;

        // if likes create in post then come here
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            // if likes create in comment then come here
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check like already exist in db
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });


        if(existingLike){

            // delete the link_id in the post/comment model inside likes array
            likeable.likes.pull(existingLike._id);
            likeable.save();

            // also delete the inside like model
            existingLike.remove();
            deleted = true;
        }else{
            // if like not exist,then create a like in db
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        // we return the data in json form
        return res.json(200, {
            message: 'Request Successful!',
            deleted: deleted
        });

    }catch(err){
        console.log('error',err);
        return res.json(500,{
            message: 'Internal Server Error'
        });
    }

}