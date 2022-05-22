// we require passport library here
const passport = require('passport');

// we require passport-local-strategy
const LocalStrategy = require('passport-local').Strategy;

// we require the user file inside models folder
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField : 'email',
        passReqToCallback: true
    },
    function(req,email,password,done){
        // find a user and establish the identity
        User.findOne({email: email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }

            // if user is not found or password does not match 
            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }

            // if user is found in db
            return done(null,user);  
        });
    }
));


// serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function(user,done){
    // console.log(user);
    done(null,user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user ---> Passport');
            return done(err); 
        }
        // user is found in db
        return done(null,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){

    // if the user is signed in,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;