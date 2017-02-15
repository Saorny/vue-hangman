'use strict';

if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}


require('dotenv').config();

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

server.on('listening', () => console.log(`Feathers application started on http://${app.get('host')}:${port}`));