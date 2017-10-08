const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').Extract

// Set up options for JWT Strategy
const jwtOptions = {}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
   // See if the user ID in payload exists in our DB
   // If it does, call 'done' with that user
   // Otherwise, call 'done' without a user object
   User.findById(payload.sub, function(err, user) {
     if (err) { return done(err, false) } // has error

     if (user) {
       done(null, user) // no error, with user
     } else {
       done(null, false) // no error, without user
     }
   })
})

// Tell Passport to use this strategy
