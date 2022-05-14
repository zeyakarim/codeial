// require the express library
const express = require('express');

// require the express.Router for creating seprate file of Router & controller
const router = express.Router();

// import passport to check authenticate
const passport = require('../config/passport-local-strategy');

// import postContoller file to some action
const postController = require('../controllers/posts.controller');

// if the method post and url is create then come here and check user is authenticate
router.post('/create',passport.checkAuthentication, postController.create);

module.exports = router;