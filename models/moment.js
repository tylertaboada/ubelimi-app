'use strict';

const mongoose = require('mongoose');

const momentSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    content: {
      feeling: {
        type: String,
        enum: [
          'Happy',
          'Amused',
          'Inspired',
          'Relaxed',
          'Loved',
          'Brave',
          'Upset',
          'Anxious'
        ],
        required: true
      },
      description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 3
      },
      learning: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
      },
      gratitude: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
      }
    },
    photo: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'editDate'
    }
  }
);

const Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment;
