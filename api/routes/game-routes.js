'use strict';

module.exports = function(app) {
  var gameCtrl = require('../controllers/game-controller');

  app.route('/search/:text')
    .get(gameCtrl.findGameByKeyWord);

  app.route('/game/:gameId')
    .get(gameCtrl.findGame);

  app.route('/cache')
   .delete(gameCtrl.clearCache);    

};
