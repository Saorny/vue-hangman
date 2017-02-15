'use strict';

/**
 * This file is required by feathers and gets loaded by default
 * Extra env files are supported (ex: production.[js|json]), but I prefer to use dotEnv to
 * manage cross environment configuration.
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  host: process.env.APP_URL,
  port: process.env.APP_PORT || 3000,
  mongodb: process.env.MONGO_CONNECTION,
  log: {
    filename: path.resolve(process.env.LOG_DIR, 'app.log')
  },
  public: '../../public',
  private: '../../private',
  uploads: '/uploads',
  templates: {
    dir: 'views',
    config: (app) => ({
      autoescape: true,
      express: app,
      noCache: process.env.NODE_ENV !== 'production',
      tags: {
        variableStart: '@{{',
        variableEnd: '}}'
      }
    })
  },
  corsWhitelist: process.env.CORS_WHITELIST.split(','),
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'vue-hangman'
  },
  cookie: {
    name: 'vue-hangman',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
};
