const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

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
