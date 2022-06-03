// import passport
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell the passport use a new strategy for google login
passport.use(new googleStrategy({
        // this clientID & clientSecret using this details check whether the application register or not
        clientID: "222105295832-d58fle30ngsl1tptauh5d4qkd7qjaqc8.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy-passport',err);
                return;
            }
            // console.log(accessToken, refreshToken);
            // console.log(profile);

            // if found user, then set it as req.user
            if(user){
                return done(null,user)
            }else{
                // if not found then create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(user){
                        console.log('error in creating user google strategy-passport',err);
                        return;
                    }
                    return done(null,user);
                });
            }
        })
    }
));

module.exports = passport;