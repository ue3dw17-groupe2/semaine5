'use strict';

const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique : true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
    if (!this.createdOn) {
        this.createdOn = new Date();
    }
    next();
});

UserSchema.pre('validate', function(next) {
    if (this.isModified('createdOn')) {
        this.invalidate('createdOn');
    }
    next();
});

module.exports = mongoose.model('Users', UserSchema);
