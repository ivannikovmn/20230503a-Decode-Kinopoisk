const express = require('express')
const router = express.Router();
const {saveToWatch , editUser , deleteUser , blockUser} = require('./controller')

router.post('/api/saveToWatch' , saveToWatch)
router.post('/api/users/edit' , editUser)
router.delete('/api/users/:id' , deleteUser)
router.post('/api/users/block' , blockUser)

module.exports = router

