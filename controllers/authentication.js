const User = require('../models/user')

exports.signup = function (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  // see if a user with the given email already exists
  User.findOne({ email: email }, function(err, existingUser) {
    // second arg to findOne is callback. everything with Node happens with callbacks
    // existingUser param will be null if findOne does not find a user with matching email
    if (err) { return next(err) }

    // if a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    }

    // if no existing user with email, create and save record
    const user = new User({
      email: email,
      password: password
    }) // this only creates a User instance in memory

    user.save(function (err) {
      if (err) { return next(err) }
    }) // saves user to the DB

    // respond to request indicating the user was created
    res.json({ success: 'true' })
  })
}
