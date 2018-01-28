'use strict';

module.exports = function(app) {
  var gameCtrl = require('../controllers/game-controller');

  app.route('/search/:text')
    .get(gameCtrl.findGameByKeyWord);

  app.route('/game/:id')
    .get(gameCtrl.findGame);

};
