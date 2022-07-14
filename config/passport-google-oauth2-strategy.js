// import passport
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// tell the passport use a new strategy for google login
passport.use(new googleStrategy({
        // this clientID & clientSecret using this details check whether the application register or not
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url,
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy-passport',err);
                return;
            }
            // console.log(accessToken, refreshToken);
            // console.log(user);

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