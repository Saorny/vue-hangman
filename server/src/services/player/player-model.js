'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// @TODO: Added unique email validation in case email is given
const userSchema = new Schema({
  name: String,

  victories: Object,
  defeats: Object,

  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
}, {
  timestamps: true
});

module.exports = mongoose.model('user', userSchema);
