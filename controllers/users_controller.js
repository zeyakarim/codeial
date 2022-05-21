const User = require('../models/user');

// render profile page
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title: 'User Profile',
            profile_user: user
        });
    });   
}

module.exports.update = function(req,res){
    // if req.user.id is equal to req.params.id both are same then come here
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        // if req.user.id is not equal to req.params.id then come here
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

// destroy session and logout
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');
}