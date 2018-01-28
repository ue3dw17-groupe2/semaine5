'use strict';

const mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  score: {
    type: Number,
    unique: true,
    default: null
  },
  userId: {
    type: String,
  },
  gameId: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});


ReviewSchema.pre('save', function(next) {
    if (!this.createdOn) {
        this.createdOn = new Date();
    }
    next();
});

ReviewSchema.pre('validate', function(next) {
    if (this.isModified('createdOn')) {
        this.invalidate('createdOn');
    }
    next();
});

module.exports = mongoose.model('Reviews', ReviewSchema);
