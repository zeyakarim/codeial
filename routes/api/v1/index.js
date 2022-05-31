const express = require('express');

const router = express.Router();

// if path is /posts then use this posts folder 
router.use('/posts',require('./posts'));

// if path is /users then use this users folder 
router.use('/users',require('./users'));

module.exports = router;