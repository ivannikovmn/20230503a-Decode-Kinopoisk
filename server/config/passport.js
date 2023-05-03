const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email , password, done){
        // console.log(email);
        // console.log(password);
        User.findOne({email}).then(user => {
            // console.log(user);
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    // result == true
                    if (err) {return done(err)}
                    // console.log(result);
                    if (result) {return done(null, user)}
                });
            }else{
                return done('Пользователь не найден')
            }

        }).catch(e => {
            return done(e)
        })
    }
))

passport.serializeUser(function(user , done) {
    // console.log(user);
    done(null , user._id)
})

passport.deserializeUser(function(id , done){
    // console.log(id);
    User.findById(id).then((user , err) => {
        done(err , user)
    })
})