const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from jwt');
            return;
        }

        // if the user is found
        if(user){
            return done(null,user);
        }else{
            // false will signify user is not found
            return done(null,false);
        }
    });
}));


module.exports = passport;