'use strict';

const path = require('path');
const passport = require('passport');
const compress = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const debug = require('debug')('loyalwines:application');

const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio');
const serveStatic = require('feathers').static;
const configuration = require('feathers-configuration');

const clientIp = require('./middleware/client-ip');

const configureCors = require('./config/cors');
const configureDatabase = require('./config/database');
const configureSecurity = require('./config/security');

const services = require('./services');
const middleware = require('./middleware');

const app = feathers();

module.exports = app;

app.configure(configuration(__dirname));

configureCors(app);
configureDatabase(app);
configureSecurity(app);

app.use(compress());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(clientIp(app));


app.use(passport.initialize());
app.use(passport.session());

app.use(serveStatic(app.get('public')));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

app.configure(hooks());
app.configure(rest());
app.configure(socketio());
app.configure(services);
app.configure(middleware);


require('./installer')(app);
