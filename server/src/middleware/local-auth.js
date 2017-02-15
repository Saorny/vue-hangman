'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {

  // Configure the local strategy for use by Passport.
  passport.use('admin', new LocalStrategy(
    {usernameField: 'email'},
    function (email, password, done) {
      app.service('users')
        .find({query: {email}})
        .then((users) => {
          const user = users[0] || users.data && users.data[0];

          if (!user) {
            return done(null, false, {message: 'Incorrect email address.'});
          }

          if (!user.validPassword(password)) {
            return done(null, false, {message: 'Incorrect password.'});
          }

          return done(null, user);
        })
        .catch(done);
    }
  ));

  // Configure Passport authenticated session persistence.
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    app.service('users').get(id)
      .then((user) => done(null, user))
      .catch(done);
  });

  return function (req, res, next) {
    next();
  };
};
