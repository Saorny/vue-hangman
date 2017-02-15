'use strict';

/**
 * Module dependencies.
 * @private
 */

const mongoose = require('mongoose');
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
  debug('setup mongoose and connect to mongodb');

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', debug.bind(debug, 'DB connection successful...'));

  if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
  }
}

