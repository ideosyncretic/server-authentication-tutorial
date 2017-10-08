const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
// passport defaults to trying to create a cookie-based session for authenticated users
// we're using JWT so we turn that off

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' })
  })
  app.post('/signup', Authentication.signup)
}
