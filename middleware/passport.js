const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const dbUser = require('../models/User')




module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'login' }, (login, password, done) => {
            //Match user
            dbUser.findOne({ login: login })
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }
                    bcrypt.compare(password, user.password.toString()).then(data => console.log(data))
                        //Match the password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) done(null, user)
                        else {
                            return done(null, false, { message: 'Password incorrect ' })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        dbUser.findById(id, (err, user) => {
            done(err, user);
        });
    });
}