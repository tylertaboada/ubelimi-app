'use strict';

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const { Router } = require('express');
const profileRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');
const Moment = require('../models/moment');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > LOGIN PAGE???????
profileRouter.get('/', routeGuard, (req, res, next) => {
  const isMyOwnMyProfile = true;
  Moment.find({ creator: req.session.passport.user })
    .populate('creator')
    .then(moment => {
      res.render('profile/user', { moment, isMyOwnMyProfile });
    })
    .catch(error => {
      next(error);
    });
});

profileRouter.get('/location', routeGuard, (req, res, next) => {
  res.render('profile/location');
});

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

profileRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('profile/edit');
});

profileRouter.post('/edit', routeGuard, upload.single('photo'), (req, res, next) => {
  const id = req.session.passport.user;
  const { name, email } = req.body;
  let url;
  if (req.file) {
    url = req.file.path;
  }

  User.findByIdAndUpdate(id, { name, email, photo: url })
    .then(() => {
      res.redirect('/profile');
    })
    .catch(error => {
      next(error);
    });
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > VIEW PROFILE

profileRouter.get('/:id', routeGuard, (req, res, next) => {
  let isMyOwnMyProfile = false;
  const id = req.params.id;
  let user;

  if (id === req.session.passport.user) {
    isMyOwnMyProfile = true;
  }

  User.findById(id)
    .then(document => {
      user = document;

      return Moment.find({ creator: id });
    })
    .then(moments => {
      res.render('profile/user', { profile: user, isMyOwnMyProfile, moments });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = profileRouter;
