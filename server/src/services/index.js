'use strict';

const debug = require('debug')('vue-hangman:services');
const authentication = require('feathers-authentication');

const player = require('./player');
const word = require('./word');

module.exports = function() {
  const app = this;

  debug('initializing application services...');

  app.configure(authentication(app.get('auth')));
  app.configure(player);
  app.configure(word);
};
