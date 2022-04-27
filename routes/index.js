// first thing require the express module
const express = require('express');

// Second thing require the express.Router module
const router = express.Router();

// Third import controller file inside router
const homeController = require('../controllers/home_controllers')

console.log('router loaded');

router.get('/',homeController.home);
router.get('/about',homeController.about);

module.exports = router;