// first import the express library
const express = require('express');

// second import the express.Router module
const router = express.Router();

// Third import the passport
const passport = require('passport');

// Import the userController file
const usersController = require('../controllers/users_controller');

// if method is get then come this router
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

router.get('/sign-out',usersController.destroySession);

router.get('/reset-password',usersController.forgotPassword);

router.post('/send-password-link',usersController.sendLinkPassword);

router.get('/new-password',usersController.newPassword);

router.post('/update-password',usersController.updateNewPassword)


// if method is post then come to router 
router.post('/create',usersController.create);



// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);

// google auth router
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: 'users/sign-in'}),usersController.createSession);

// facebook auth router
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect: 'users/sign-in'}),usersController.createSession);
module.exports = router;