const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(new facebookStrategy({
        clientID: "412426360783314",
        clientSecret: "acba49aa9cd1e5dd865a688eb1efd8e5",
        callbackURL: "http://codeials.com/users/auth/facebook/callback/",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },

    function(accessToken, refreshToken, profile, done){
        console.log('profile-facebook',profile);

        User.findOne({email: profile.id}).exec(function(err,user){
            if(err){
                console.log('Error in finding user in facebook',err);
                return;
            }
            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.id,
                    password: crypto.randomBytes(20).toString('hex'),
                    avatar: profile.photos[0].value
                }, function(err,user){
                    if(err){
                        console.log('Error in creating user in facebook',err);
                        return;
                    }

                    return done(null,user);
                });
            }
        });
    }
));

module.exports = passport;