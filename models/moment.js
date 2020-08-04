'use strict';

const mongoose = require('mongoose');

const momentSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    feeling: {
      type: String,
      enum: ['Happy', 'Amused', 'Inspired', 'Relaxed', 'Loved', 'Brave', 'Upset', 'Anxious']
      // required: true
    },
    description: {
      type: String,
      // required: true,
      minlength: 10,
      maxlength: 100
    },
    learning: {
      type: String,
      // required: true,
      minlength: 3,
      maxlength: 100
    },
    gratitude: {
      type: String,
      // required: true,
      minlength: 3,
      maxlength: 100
    },
    photo: {
      type: String
      // required: true
    },
    location: {
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ],
      type: {
        type: String,
        default: 'Point'
      }
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
