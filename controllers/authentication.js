const User = require('../models/user')

exports.signup = function (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  // see if a user with the given email already exists
  User.findOne({ email: email }, function(err, existingUser) {

  }) // second arg to findOne is callback. everything with Node happens with callbacks
  // existingUser param will be null if findOne does not find a user with matching email

  // if a user with email does exist, return an error

  // if no existing user with email, create and save record

  // respond to request indicating the user was created
}
