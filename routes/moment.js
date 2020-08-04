'use strict';

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const { Router } = require('express');
//const passport = require('passport');
const momentRouter = new Router();
const routeGuard = require('./../middleware/route-guard');
const Moment = require('../models/moment');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > CREATE MOMENT
momentRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('moment/create');
});

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

momentRouter.post('/create', routeGuard, upload.single('photo'), (req, res, next) => {
  const { feeling, description, learning, gratitude, longitude, latitude } = req.body;

  let url;
  if (req.file) {
    url = req.file.path;
  }
  console.log(req.body);
  Moment.create({
    creator: req.session.userId,
    feeling,
    description,
    learning,
    gratitude,
    photo: url,
    location: {
      longitude,
      latitude
    }
  })
    .then(moment => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > ALL MOMENTS
momentRouter.get('/view-all', (req, res, next) => {
  Moment.find()
    .then(moments => {
      res.render('moment/view-all', { moments });
    })
    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > SINGLE MOMENT

momentRouter.get('/moment/:id', (req, res, next) => {
  const id = req.params.id;
  Moment.findById(id)
    .populate('creator')
    .then(moment => {
      res.render('moment/single', { moment: moment });
    })
    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > EDIT / DELETE

momentRouter.get('/moment/:id/edit', (req, res, next) => {
  res.render('/');
});

momentRouter.post('/moment/:id/edit', (req, res, next) => {
  res.render('/');
});

momentRouter.post('/moment/:id/delete', (req, res, next) => {
  res.render('/');
});

module.exports = momentRouter;
