'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('word service', () => {
  it('registered the messages service', () => {
    assert.ok(app.service('words'));
  });
});
