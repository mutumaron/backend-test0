const express = require('express');
const contentControllers = require('../controllers/contentControllers');

const router = express.Router();

router.get('/',contentControllers.getBlogs);
router.get('/:blogId',contentControllers.getBlog);

module.exports = router;