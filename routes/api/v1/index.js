const express = require('express');

const router = express.Router();

// if path is /posts then use this posts folder 
router.use('/posts',require('./posts'));

module.exports = router;