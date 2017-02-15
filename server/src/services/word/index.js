'use strict';

const hooks = require('./hooks');
const Word = require('./word-model');
const service = require('feathers-mongoose');
const debug = require('debug')('vue-hangman:services:word');

module.exports = function UserServer() {
  const app = this;

  debug('initializing user service @ "/words"');

  app.use('/words', service({Model: Word}));

  app.service('/words')
    .before(hooks.before)
    .after(hooks.after)
};
