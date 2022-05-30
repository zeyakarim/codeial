const Post = require('../../../models/post');
const Comment = require('../../../models/comment');



module.exports.index = async function(req,res){
    let post = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate :{
            path: 'user'
        }
    });

    return res.json(200, {
        message: "List of Posts",
        posts : post
    });
}

// DELETE POST USING API
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        // it will remove the post in db
        post.remove();

        let comment = await Comment.deleteMany({post: req.params.id});

        return res.json(200,{
            message: 'Post and associated comments deleted successfully'
        });

    }catch(err){

        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
}
