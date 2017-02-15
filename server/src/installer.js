'use strict';

/**
 * Module dependencies
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const WordModel = mongoose.model('word');
const debug = require('debug')('vue-hangman:installer');
const unidecode = require('unidecode');

const DATA_SOURCE_PATH = './data/source';

const MIN_LENGTH = 3;
const MEDIUM_LENGTH = 5;
const HARD_LENGTH = 10;

const langs = ['fr', 'en', 'es'];

let dictionary = [];

/**
 * The module export
 */

module.exports = installer;

/**
 * Create the Installer instance
 * @param app
 */
function installer(app) {
  insertWords(app);
}

function insertWords(app) {
  try {
    WordModel.count()
      .then(count => {
        if (!count) {
          langs.forEach((lang) => {
            dictionary = [];
            fs.readFileSync(DATA_SOURCE_PATH + '_' + lang).toString().split('\n').forEach((line) => {
              extractWordsFromLine(line, lang);
            });
          });
        }
      });
  } catch (e) { console.error(e); /* Keep quiet in case something wrong happens */ }
}

function extractWordsFromLine(line, lang) {
  line = purifyLine(line);
  line.split(' ').forEach((word) => {
      if (word.length >= MIN_LENGTH) {
        let newWord = {
          lang: lang
        };

        if (word.length <= MEDIUM_LENGTH) {
          newWord.level = 0;
        }
        else if (word.length > MEDIUM_LENGTH && word.length <= HARD_LENGTH) {
          newWord.level = 1; 
        }
        else {
          newWord.level = 2; 
        }
        newWord.content = unidecode(word).trim().toUpperCase();

        if (dictionary.indexOf(newWord.content) === -1) {
          dictionary.push(newWord.content);
          WordModel.create(newWord);
        }
        else {
          console.log('rejected:' + newWord.content);
        }
      }
  });
}

function purifyLine(line) {
  line = line.replace(/[0-9,.\';']/gi, '');
  line = line.replace(/([a-zA-Z]+)’/gi, '');
  line = line.replace(/-/gi, ' ');
  return line;
}
