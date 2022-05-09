// first import the express library
const express = require('express');

// second import the express.Router module
const router = express.Router();

// Third import the passport
const passport = require('passport');

// Import the userController file
const usersController = require('../controllers/users_controllers');

// if method is get then come this router
router.get('/profile',passport.checkAuthentication, usersController.profile);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

router.get('/sign-out',usersController.destroySession);

// if method is post then come to router 
router.post('/create',usersController.create);


// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);


module.exports = router;