const express = require('express');


const blogControllers = require('../controllers/blogControllers');

const router = express.Router();

router.get('/',blogControllers.getBlogs);


module.exports = router;
