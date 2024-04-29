const express = require('express');

const dealControllers = require('../controllers/dealControllers');

const router = express.Router();

router.get('/',dealControllers.getDeals);


module.exports = router;