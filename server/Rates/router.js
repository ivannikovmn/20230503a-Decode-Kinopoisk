const express = require('express')
const router = express.Router();
const {saveRate} = require('./controller.js');

router.post('/api/rate' , saveRate)

module.exports = router
