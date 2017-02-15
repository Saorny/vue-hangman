'use strict';

const hooks = require('./hooks');
const Player = require('./player-model');
const service = require('feathers-mongoose');
const debug = require('debug')('vue-hangman:services:player');

module.exports = function UserServer() {
  const app = this;

  debug('initializing player service @ "/players"');

  app.use('/players', service({Model: Player}));

  app.service('/players')
    .before(hooks.before)
    .after(hooks.after)
};
