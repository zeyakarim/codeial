// require the express library
const express = require('express');

// this will help to make the seprate file to router and controller
const router = express.Router();
const passport = require('passport');

// require the comment_controller to take actions
const commentsController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentsController.create);

module.exports = router;