const express = require('express')
const router = express.Router();
const {saveRate , editRate , deleteRate} = require('./controller.js');

router.post('/api/rate/new' , saveRate)
router.post('/api/rate/edit' , editRate)
router.delete('/api/rates/:id' , deleteRate)

module.exports = router
