const express = require('express')
const router = express.Router();
// const Genres = require('./Genres')
// const {getFllGenres} = require('./controller'); //?
const { getAllGenres } = require('./controller.js');

const writeDataGenre = require('./seed')

// router.get('/api/genre' , async(req, res) => {
//     const data = await Genres.find()
//     res.send({data})
// })

router.get('/api/genre' , getAllGenres)

writeDataGenre()

module.exports = router
