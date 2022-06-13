const User = require('../models/user');
const fs = require('fs');
const path = require('path');
// import the forgot_password file
const forgotPasswordMailer = require('../mailers/forgot_password_mailer');

// import the forgot_password model
const ForgotPasswordModel = require('../models/forgot_password');
const crypto = require('crypto');

// import the friendship module
const Friendship = require('../models/friendship');


// render profile page
module.exports.profile = async function(req,res){
    let user = await User.findById(req.params.id);

    let userfriend = await User.findById(req.user._id).populate({path: 'friendships'})

    
    return res.render('user_profile',{
        title: 'User Profile',
        profile_user: user,
        userfriend: userfriend
    });
}

module.exports.update = async function(req,res){
    // if req.user.id is equal to req.params.id both are same then come here
    if (req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*****Multer Error: ',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                // console.log(req.file);
                if(req.file){
                    // first it will go userSchema.uploadedAvatar function and save 
                    // the file destination and filename in the localstorage/multer storage

                    // if will check if user.avatar exist or not then go inside this
                    if (user.avatar){
                        let currentAvatarPath = path.join(__dirname,'..',user.avatar);
                        // console.log(currentAvatarPath);

                        // check if file already exist in currentAvatarPath then he give true otherwise false
                        if(fs.existsSync(currentAvatarPath)){

                            // it remove the file from currentAvatarPath
                            fs.unlinkSync(currentAvatarPath);
                        }
                    }
                    // this is saving the path of the upload into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
            
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    
    }else{
        // if req.user.id is not equal to req.params.id then come here
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    });
}

// get the sign up data
module.exports.create = function(req,res){

    // check password and confirm_password are equal
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    // check user is found in db
    User.findOne({email : req.body.email}, function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        // handle user is not found in db
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                // console.log(user);
                req.flash('success','Sign-up Successfully');
                return res.redirect('/users/sign-in');
            });
        }else{
            // handle user is found in db
            req.flash('error','Please fill the Correct information');
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

// forgot password
module.exports.forgotPassword = function(req,res){
    return res.render('forgot_password',{
        title: 'Codeial | Forgot Password'
    });
}

// send link in email
module.exports.sendLinkPassword = async function(req,res){
    let user = await User.findOne({email:req.body.email});

    if(user){
        let user_password = await ForgotPasswordModel.create({
            user: user._id,
            accessToken: crypto.randomBytes(18).toString('hex'),
            isValid: true
        });

        user_password = await user_password.populate('user');

        // send this user_password the forgotpasswordmailer file
        forgotPasswordMailer.newPassword(user_password);
        req.flash('success','please check email reset link send');
        return res.redirect('back');
    }
    
    return res.redirect('back');
}

// user click then reset link in email then come here
module.exports.newPassword = async function(req,res){
    let accessToken = await ForgotPasswordModel.findOne({accessToken: req.query.accessToken});

    // if accessToken in db 
    if(accessToken){
        // first find the accessToken then update the isvalid to false
        return res.render('new_password',{
            title: 'New Password | Codeial',
            userData: accessToken
        }); 
    }
    req.flash('success','please reset password again');
    return res.redirect('/users/reset-password');
}

// user update newPassword
module.exports.updateNewPassword = async function(req,res){

    // check password and confirm_password both are same
    if (req.body.password == req.body.confirm_password){

        let user = await User.findById(req.query.user);

        // check user exist in db
        if(user){
            // find the accessToken id 
            await ForgotPasswordModel.findByIdAndUpdate(req.query.id,{isValid: false});
        
            // password update in User model schema
            await User.findByIdAndUpdate(user, req.body);

            req.flash('success','Password updated successfully');
        
            return res.redirect('/');
        }
        req.flash('success','please register first our website');
        return res.redirect('/users/sign-up');
    }

    req.flash('success','please write password & confirm_password same');
    return res.redirect('back');
}

// if user send the request to add friend
module.exports.friends = async function(req,res){
    try{
        // let friend;
        let request = false;
        let userfriend = await User.findById(req.user._id).populate('friendships');

        let exitsFriend = await Friendship.findOne({from_user:req.user._id,to_user: req.params.id});

        if(exitsFriend){
            
            // if userfriend list already this friend then remove the inside the friendships array
            userfriend.friendships.pull(exitsFriend._id);
            userfriend.save();

            // also remove from friendSchema
            exitsFriend.remove();
            request = true;
        }else{
            let addFriend = await Friendship.create({
                from_user: req.user._id,
                to_user: req.params.id
            });

            userfriend.friendships.push(addFriend._id);
            userfriend.save();
        }

        return res.json(200, {
            message: 'Successfully sent request',
            request: request
        });


    }catch(err){
        console.log('error',err);
        return res.json(500,{
            message: 'Internal server error'
        });
    }
}

// destroy session and logout
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');
}

