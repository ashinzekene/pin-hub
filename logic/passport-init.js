var User = require('../models/users')
var LocalStrategy = require('passport-local').Strategy

module.exports = function (passport, app) {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })
  passport.deserializeUser(function (user, done) {
    done(null, user)
    User.findById(user.id, function (err, user) {
      console.log(user)
    })
  })

  passport.use('sign-in', new LocalStrategy({
    passReqToCallback: true
  }, function (req, username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) done(err, false)
      if (!user) {
        done(null, false, req.flash('signinMessage', 'Username does not exist, You can create an account instead'))
      } else if (!user.validatePassword(password)) {
        done(null, false, req.flash('signinMessage', 'The password is incorrect'))
      } else {
        console.log('password and username correct')
        done(null, user)
      }
    })
  }))

  passport.use('sign-up', new LocalStrategy({
    passReqToCallback: true
  }, function (req, username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) console.log('error occured')
      if (user) {
        done(null, false, req.flash('signupMessage', 'That username already exists'))
      } else {
        var newUser = new User
        newUser.username = username
        newUser.email = req.email
        newUser.password = newUser.generateHash(password)
        newUser.save(function (err, newUser) {
          if (err) console.log("could not save ", err)
          done(null, newUser)
        })
      }
    })
  }))
}
