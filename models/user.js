'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String
    },
    githubToken: {
      type: String
    },
    photo: {
      type: String,
      default: '/images/preview.png'

      //'https://techsalesgroup.files.wordpress.com/2016/10/ironhack-logo-negro1.jpg'
    }
    // status: {
    //   type: String,
    //   enum: ['awaiting_confirmation', 'active'],
    //   default: 'awaiting_confirmation'
    // },
    // confirmationToken: {
    //   type: String,
    //   required: true
    // }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
