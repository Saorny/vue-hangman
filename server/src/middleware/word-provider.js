'use strict';

const feathers = require('feathers');
const fs = require('fs');

module.exports = (app) => {
  const router = feathers.Router();
  const wordService = app.service('/words');

  router.get('/', provideRandomWord);

  function provideRandomWord(req, res) {
    let query = {
      query: req.query
    }

    wordService
      .find(query)
      .then((rows) => {
        res.json(rows[chooseRandomIndex(rows)].content);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function chooseRandomIndex(res) {
    return Math.floor(Math.random() * (res.length));
  }

  return router;
};
