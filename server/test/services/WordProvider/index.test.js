'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('WordProvider service', function() {
  it('registered the WordProviders service', () => {
    assert.ok(app.service('WordProviders'));
  });
});
