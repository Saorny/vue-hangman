'use strict';

/**
 * Module dependencies.
 * @private
 */

const cors = require('cors');
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
  debug('setup cors');

  const whitelist = app.get('corsWhitelist');
  const corsOptions = {
    origin(origin, callback) {
      const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    }
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
}

