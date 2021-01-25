const db = require('../utils/database');
const User = require('../models/user');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async function(email, password, done) {
    
    const user = new User();
    const foundUser = await user.findOne(email);
    if (!foundUser) {
        return done(null, false, {message: 'incorrect email'});
    }
    /* if (foundUser.password !== password) {
        return done(null, false, {message: 'incorrect password'});
    } */
    if (!bcrypt.compareSync(password, foundUser.password)) {
        return done(null, false, {message: 'incorrect password'});
    }
    return done(null, foundUser);
}));




exports.postRegisterUser =  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
        return res.json({status: 'error', message: 'Incorrect registration data'});
    }
    const user = new User(
        req.body.username, 
        req.body.email, 
        req.body.password, 
        req.body.address
    )
    
    const foundUser = await user.findOne(req.body.email);
    if (!foundUser) {
        try {
            user.saveToDb();
            res.redirect('/');
            /* passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) {
                  return res.json({status: 'error', message: info.message});
                }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    return res.json({status: 'ok'});
                });
              })(req, res, next); */
        }
        catch (e) {
            console.log('saveUSer error', e);
        }
    }
}

exports.postLoginUser = (req,res,next) => {

    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
          return res.json({status: 'error', message: info.message});
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json({status: 'ok', user: {
              id: req.user.id,
              email: req.user.email, 
              username: req.user.username, 
              address: req.user.address,
              
            }
            });
        });
      })(req, res, next);
}

exports.postLogoutUser = (req,res,next) => {
    req.logout();
    res.redirect('/');
}
