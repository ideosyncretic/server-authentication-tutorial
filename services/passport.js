const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Create local strategy
const localOptions = { usernameField: 'email' } // point to email property, since we use email instead of username
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
 // Verify this email and password, then call done with user
 // If this is correct email and password
 // If not, call done with false
 User.findOne({ email: email }, function (err, user) {
   if (err) { return done(err) }
   if (!user) { return done(null, false) }
 })

 // compare plain password input with stored hashed password
})

// Set up options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
   // See if the user ID in payload exists in our DB
   User.findById(payload.sub, function(err, user) {
     if (err) { return done(err, false) } // has error

     if (user) {
       // If it does, call 'done' with that user
       done(null, user)
     } else {
       // Otherwise, call 'done' without a user object
       done(null, false)
     }
   })
})

// Tell Passport to use this strategy
passport.use(jwtLogin)
