'use strict';

/**
 * Module dependencies.
 * @private
 */

const helmet = require('helmet');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

const debug = require('debug')('vue-hangman:config');

/**
 * Export configuration
 */

module.exports = configure;

/**
 * Create configuration 
 * 
 * @param app
 */

function configure(app) {
  debug('setup application security');

  app.use(cookieParser());

  app.use(session({
    secret: app.get('session').secret,
    resave: false,
    saveUninitialized: false,
    name: 'vue-hangman',
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }));

  app.use(flash());

  app.use(helmet());
}

