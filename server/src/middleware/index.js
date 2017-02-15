'use strict';

const logger = require('./logger');
const localAuth = require('./local-auth');
const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const wordProvider = require('./word-provider');
const registerGame = require('./register-game');

module.exports = function() {
  const app = this;

  app.use(localAuth(app));
  app.use('/random-word', wordProvider(app));
  app.use('/register-game', registerGame(app));
  app.use(notFound());
  app.use(logger(app));
};
