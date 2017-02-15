'use strict';

/**
 * Module dependencies.
 * @private
 */

const ipaddr = require('ipaddr.js');
const requestIp = require('request-ip');
const debug = require('debug')('vue-hangman:middleware:client-ip');

/**
 * Expose the middleware.
 */

module.exports = clientIp;

/**
 * A simple middleware that add client ip as application setting.
 * A quick solution to access it from feathers hooks
 */
function clientIp(app) {
  return function (req, res, next) {
    const ip = convertIpv6ToIpv4(requestIp.getClientIp(req));

    // Attach the user's ip to req
    req.clientIp = ip;

    // Added client ip as app setting so it can be easily accessed from feathers hooks
    app.set('client-ip', ip);

    debug(`current client ip : [${ip}]`);

    next();
  }
}

/**
 * Attempt to convert an ipv6 address to an ipv4
 *
 * @param ip
 * @returns {String}
 */
function convertIpv6ToIpv4(ip) {
  try {
    if (ipaddr.IPv6.isValid(ip)) {
      let parsed = ipaddr.IPv6.parse(ip);

      if (parsed.isIPv4MappedAddress()) {
        ip = parsed.toIPv4Address().toString();
      }
    }
  } catch (e) {
    // Silence exception
  }
  return ip;
}
