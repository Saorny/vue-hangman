'use strict';

/**
 * Export configurations 
 */

module.exports = {
	configureCors: require('./cors'),
  	configureDatabase: require('./database'),
  	configureSecurity: require('./security')
};

