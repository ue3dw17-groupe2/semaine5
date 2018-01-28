'use strict';

const mongoose = require('mongoose');
const User = require('../models/user-schema');

exports.createUser = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err)
    {
      console.error(err);
      res.json({
        message: err.code === 11000 ? 'User already exist' : 'Unable to create user'
      });
    }
    res.json(user);
  });
};

exports.findUser = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find user '+req.params.userId });
    }
    res.json(user);
  });
};

exports.findUserByEmail = function(req, res) {
  User.findOne({email: req.query.email}, function(err, user) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to find user '+req.params.email });
    }
    res.json(user);
  });
};

exports.updateUser = function(req, res) {
  User.findByIdAndUpdate(req.params.userId, req.body, {new: true}, function(err, user) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to update user' });
    }
    res.json(user);
  });
};


exports.removeUser = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, User) {
    if (err)
    {
      console.error(err);
      res.json({ message: 'Unable to delete user' });
    }
    res.json({ message: 'User successfully deleted' });
  });
};
