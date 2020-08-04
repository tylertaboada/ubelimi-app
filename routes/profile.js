'use strict';

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const { Router } = require('express');
const profileRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');

profileRouter.get('/', routeGuard, (req, res, next) => {
  console.log('im running');
  res.render('profile/user');
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
  //console.log('is this working');
  // console.log(req.session);
  const { name, email } = req.body;
  let url;
  if (req.file) {
    url = req.file.path;
  }
  console.log(req.file.path);
  //console.log(req.body);
  User.findByIdAndUpdate(id, { name, email, photo: url })
    .then(() => {
      res.redirect('/profile');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = profileRouter;
