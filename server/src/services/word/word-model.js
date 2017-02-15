'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// @TODO: Added unique email validation in case email is given
const wordSchema = new Schema({
  content: String,
  lang: String,
  level: {type: Number, default: 0}
}, {
  timestamps: true
});

module.exports = mongoose.model('word', wordSchema);
