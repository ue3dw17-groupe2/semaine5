'use strict';

module.exports = function(app) {
  var reviewCtrl = require('../controllers/review-controller');

  app.route('/users/:userId/games/:gameId/review')
    .get(reviewCtrl.findUserReview)
    .post(reviewCtrl.createUserReview)
    .put(reviewCtrl.updateReview)
    .get(reviewCtrl.findAllReview)
    .delete(reviewCtrl.removeReview);

  app.route('/users/:userId/review')
    .get(reviewCtrl.findAllUserReview)

};
