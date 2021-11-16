const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const DbUser = require("../models/User")
const { check, validationResult } = require('express-validator')
const passport = require('passport')

// Login get
router.get('/login', function(req, res, next) {
    res.render('auth/login', {
        title: 'Instagram'
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/account",
        failureRedirect: "/auth/login",
        successFlash: "Xush kelibsiz",
        failureFlash: 'Error',
    })(req, res, next)
})




// Register get
router.get('/register', function(req, res, next) {
    res.render('auth/register', {
        title: 'Instagram'
    });
});


// Register post

router.post('/register', [
    check('name', "To'liq kiriting!").notEmpty(),
    check('login', "To'liq kiriting!").notEmpty(),
    check('password', "To'liq kiriting!").notEmpty(),
    check('title', "To'liq kiriting!").notEmpty(),
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('auth/register', {
            title: "Xatolik bor",
            errors: errors.array()
        })
    } else {
        try {
            const db = new DbUser({
                name: req.body.name,
                login: req.body.login,
                password: req.body.password,
                title: req.body.title,
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(db.password, salt, (err, hash) => {
                    if (err) {
                        throw err
                    }
                    db.password = hash
                    db.save((err) => {
                        console.log("asfasfasfsaff");
                        if (err) {
                            req.flash('danger', "Bunday login bor")
                            res.redirect('/auth/register')
                        } else {
                            req.flash('danger', "Ro'yxatdan o'tdingiz")
                            res.redirect('/auth/login')
                        }
                    })
                })

            })
        } catch (error) {
            console.log(error);
        }
    }
})



module.exports = router;