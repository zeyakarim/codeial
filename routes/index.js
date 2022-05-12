// first thing require the express module
const express = require('express');

// Second thing require the express.Router module
const router = express.Router();

// Third thing import controller file inside router
const homeController = require('../controllers/home_controllers');


router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

module.exports = router;