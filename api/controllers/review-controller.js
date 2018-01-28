'use strict';

const mongoose = require('mongoose');
const Review = require('../models/review-schema');

exports.createUserReview = function(req, res) {
  var newReview = new Review(req.body);
  newReview.userId = req.params.userId;
  newReview.gameId = req.params.gameId;
  newReview.save(function(err, review) {
    if (err)
    {
      console.error(err);
      res.json({
        message: err.code === 11000 ? 'Review already exist' : 'Unable to create review'
      });
    }
    res.json(review);
  });
};

exports.findAllReview = function(req, res) {
  Review.find(function(err, review) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find review '+req.params.userId });
    }
    res.json(review);
  });
};

exports.findUserReview = function(req, res) {
  Review.find({
    userId: req.params.userId,
    gameId: req.params.gameId
  }, function(err, review) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find review '+req.params.userId });
    }
    res.json(review);
  });
};

exports.findAllUserReview = function(req, res) {
  Review.find({userId: req.params.userId}, function(err, review) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find review '+req.params.userId });
    }
    res.json(review);
  });
};

exports.updateReview = function(req, res) {
  Review.findOneAndUpdate({userId: req.params.userId}, req.body, {new: true}, function(err, review) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to update review' });
    }
    res.json(review);
  });
};

exports.removeReview = function(req, res) {
  Review.remove({
    userId: req.params.userId,
    gameId: req.params.gameId
  }, function(err, Review) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to delete review' });
    }
    res.json({ message: 'User Review successfully deleted' });
  });
};
