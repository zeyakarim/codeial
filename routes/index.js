// first thing require the express module
const express = require('express');

// Second thing require the express.Router module
const router = express.Router();

// Third thing import controller file inside router
const homeController = require('../controllers/home_controller');


router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

module.exports = router;