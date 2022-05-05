const User = require('../models/user');

// render profile page
module.exports.profile = function(req,res){

    // user_id are present in req.cookies
    if(req.cookies.user_id){

        // find user in db
        User.findById(req.cookies.user_id,function(err,user){

            // handle user_id found in db
            if(user){
                return res.render('user_profile',{
                    title: 'users',
                    user: user
                });
            }else{
                // handle user_id is not found in db
                return res.redirect('/users/sign-in');
            }
        });

    }else{
        // user_id are not present in the cookies
        return res.redirect('/users/sign-in');
    }
    
}

// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
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
                return res.redirect('/users/sign-in');
            });
        }else{
            // handle user is found in db
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    // steps to authenthicate
    // find the user

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }
        // handle user found
        if(user){

            // handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
            
        }else{
            // handle user not found
            return res.redirect('back');
        }
    });
}