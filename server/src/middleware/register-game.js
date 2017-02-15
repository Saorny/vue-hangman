'use strict';

const feathers = require('feathers');
const fs = require('fs');

module.exports = (app) => {
  const router = feathers.Router();
  const playerService = app.service('/players');

  const LEVEL_ARRAY = {
    0: 'EASY',
    1: 'MEDIUM',
    2: 'HARD'
  };

  router.post('/', registerGame);

  function registerGame(req, res) {
    let data = req.body;

    data.level = LEVEL_ARRAY[data.level]
    playerService
      .find({query: { name: data.player }})
      .then((players) => {
        if (!players.length) {
          createPlayer(data).then((player) => {
            res.json({'response': player});
          })
        }
        else {
          updatePlayer(players[0], data).then((player) => {
            res.json({'response': player});
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createPlayer(data) {
    let req = {
      name: data.player
    };
    let key = data.hasWon === "true" ? 'victories' : 'defeats';
    req[key] = {};
    req[key][data.level] = 1;

     return playerService
      .create(req)
      .then((created) => {
        return created;
      });
  }

  function updatePlayer(player, data) {
    let key = data.hasWon === "true" ? 'victories' : 'defeats';
    let updates = {};

    updates[key] = {};
    if (key in player) {
      updates[key] = player[key];
      if (data.level in player[key]) {
        updates[key][data.level] = parseInt(player[key][data.level]) + 1;
      }
      else {
        updates[key][data.level] = 1;
      }
    }
    else {
      updates[key][data.level] = 1;
    }

    return playerService
      .patch(player._id, updates)
      .then((updated) => {
        return updated;
      });
  }

  return router;
};
