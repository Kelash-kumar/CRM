const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/index');


router.get('/', webhookController.webhook);

module.exports = router;