const express = require('express');

const contentControllers = require('../controllers/contentControllers');

const router = express.Router();

router.get('/',contentControllers.getDeals);
router.get('/:dealId',contentControllers.getDeal);
router.get('/token',contentControllers.getToken);

module.exports = router;