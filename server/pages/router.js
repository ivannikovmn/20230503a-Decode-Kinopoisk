const express = require('express')
const router = express.Router();
const Genres = require('../Genres/Genres')
const Country = require('../Country/Country')
const User = require('../auth/User')
const Film = require('../Films/Film')

// router = {
//     app.get('/' , (req , res) =>{
//         res.render("index")
//     })
//     app.get('/' , (req , res) =>{
//         res.render("index")
//     })
//     app.get('/' , (req , res) =>{
//         res.render("index")
//     })
// }

router.get('/', async(req , res) => {
    const allGenres = await Genres.find()
    // console.log(await Country.find());
    // const films = await Film.find()
    const films = await Film.find().populate('genre').populate('country')
    // const films = await Film.find().populate('country' , 'name').populate('genre')
    // console.log(films);
    // console.log(allGenres);
    const user = req.user ? await User.findById(req.user._id)
    // .populate('toWatch')
    // .populate({path: 'toWatch' , populate: {path: 'country'}})
    // .populate({path: 'toWatch' , populate: {path: 'genre'}}) 
    : {} 
    // res.render("index" , {genres: allGenres , user: req.user ?  req.user: {} , films})
    res.render("index" , {genres: allGenres , user, films})
})

router.get('/login', (req, res) => {
    res.render("login" , {user: req.user ?  req.user: {}})
})

router.get('/register', (req, res) => {
    res.render("register", {user: req.user ?  req.user: {}})
})

router.get('/profile/:id', async(req, res) => {
    const allGenres = await Genres.find()
    // const user = await User.findById(req.params.id)
    const user = await User.findById(req.params.id).populate('toWatch')
    .populate({path: 'toWatch' , populate: {path: 'country'}})
    .populate({path: 'toWatch' , populate: {path: 'genre'}})
    // console.log(user);
    // console.log(req.user , '==profile');
    // res.render("profile" , {user: req.user ?  req.user: {} , genres: allGenres})
    // console.log(user);
    // if (user.full_name.length > 0){
    // console.log(user._id);
    // console.log(req.user._id);
    if (user){
        res.render("profile" , {user: user , genres: allGenres , loginUser: user , loginUser: req.user})//loginUser: user  не лишний? в 7.2 его убрали
        
    }// else{
    //     res.redirect('/not-found') //не работает пока
    // }
})

router.get('/admin/:id', async(req, res) => {
    const allGenres = await Genres.find()
    const user = await User.findById(req.params.id)
    const films = await Film.find().populate('country').populate('genre').populate('author')
    // console.log(req.user , '--- admin');
    res.render("adminProfile" , {genres: allGenres , loginUser: req.user ?  req.user: {} , user: user , films: films})
})

router.get('/new', async(req, res) => {
    // console.log(req.user , '--new');
    const allGenres = await Genres.find()
    const allCountries = await Country.find()
    res.render("newFilm", {genres : allGenres , countries: allCountries , user: req.user ?  req.user: {}})
})

router.get('/edit/:id', async(req, res) => {
    const allGenres = await Genres.find()
    const allCountries = await Country.find()
    const film = await Film.findById(req.params.id)
    res.render("editFilm", {genres: allGenres , countries: allCountries , user: req.user ?  req.user: {} , film})
})

router.get('/not-found', (req , res) => {
    res.render("notFound")
})
module.exports = router