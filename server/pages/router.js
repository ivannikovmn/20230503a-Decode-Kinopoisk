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
    const options = {}
    // const genres = await Genres.find({key : req.query.categ})
    const genres = await Genres.findOne({key : req.query.genre})
    // console.log(genres);
    // if(req.query.categ){        
    if(genres){
        // options.category = req.query.categ
        options.genre = genres._id
        res.locals.genre = req.query.genre
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                titleRus: new RegExp(req.query.search , 'i')
            },
            {
                titleEng: new RegExp(req.query.search , 'i')
            }
        ]
        res.locals.search = req.query.search
    }
    const totalFilms = await Film.count()
    // console.log(totalFilms);
    // console.log(options);
    // console.log(req.query);
    const allGenres = await Genres.find()
    // console.log(await Country.find());
    // const films = await Film.find()
    // const films = await Film.find(options).populate('genre').populate('country')
    const films = await Film.find(options).limit(limit).skip(page * limit).populate('genre').populate('country')
    // const films = await Film.find().populate('country' , 'name').populate('genre')
    // console.log(films);
    // console.log(allGenres);
    const user = req.user ? await User.findById(req.user._id)
    // .populate('toWatch')
    // .populate({path: 'toWatch' , populate: {path: 'country'}})
    // .populate({path: 'toWatch' , populate: {path: 'genre'}}) 
    : {} 
    // res.render("index" , {genres: allGenres , user: req.user ?  req.user: {} , films})
    // 4 / 3 = 1(1) => 2
    res.render("index" , {genres: allGenres , user, films , pages: Math.ceil(totalFilms / limit)})
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

router.get('/detail/:id' , async(req , res) => {
    const film = await Film.findById(req.params.id).populate('country').populate('genre')
    res.render("detail" , {user: req.user ? req.user : {} , film: film})
})
module.exports = router