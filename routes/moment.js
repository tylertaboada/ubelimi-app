'use strict';

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const { Router } = require('express');
const passport = require('passport');
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

momentRouter.post(
  '/create',
  routeGuard,
  upload.single('photo'),
  (req, res, next) => {
    const {
      feeling,
      description,
      learning,
      gratitude,
      latitude,
      longitude
    } = req.body;

    let url;
    if (req.file) {
      url = req.file.path;
    }

    Moment.create({
      creator: req.session.passport.user,
      feeling: feeling,
      description: description,
      learning: learning,
      gratitude: gratitude,
      photo: url,
      location: { coordinates: [latitude, longitude] }
    })
      .then(moment => {
        res.redirect(`/moment/${moment._id}`);
      })
      .catch(error => {
        next(error);
      });
  }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > ALL MOMENTS
momentRouter.get('/view-all', (req, res, next) => {
  Moment.find()
    .populate('creator')
    .then(moments => {
      console.log(moments);
      res.render('moment/view-all', { moments });
    })
    .catch(error => {
      next(error);
    });
});

//-----------------------------------------SEARCH FOR NEARBY MOMENTS----------------------
const metersToDegrees = meters => (meters / 1000 / 40000) * 360;

momentRouter.get('/search', (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const radius = req.query.radius;
  console.log(latitude, longitude, radius);
  Moment.find()
    .where('location')
    .within()
    .circle({
      center: [latitude, longitude],
      radius: metersToDegrees(radius)
    })
    .then(moments => {
      console.log(moments);
      res.render('moment/search', { moments });
    })
    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > SINGLE MOMENT

momentRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const moment = await Moment.findById(id).populate('creator');
    if (moment) {
      res.render('moment/single', { moment: moment });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > EDIT / DELETE

momentRouter.post('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;

  Moment.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/moment/view-all');
    })
    .catch(error => {
      next(error);
    });
});

momentRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Moment.findById(id)
    .then(moment => {
      res.render('moment/edit', { moment });
    })
    .catch(error => {
      next(error);
    });
});

momentRouter.post(
  '/:id/edit',
  routeGuard,
  upload.single('photo'),
  (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    let editedMoment;

    if (req.file) {
      //there is an image
      //create a new object with the information
      editedMoment = {
        feeling: data.feeling,
        description: data.description,
        learning: data.learning,
        gratitude: data.gratitude,
        photo: req.file.path,
        location: { coordinates: [data.latitude, data.longitude] }
      };
    } else {
      //there is no image
      //create a new object with the information without the image
      editedMoment = {
        feeling: data.feeling,
        description: data.description,
        learning: data.learning,
        gratitude: data.gratitude,
        location: { coordinates: [data.latitude, data.longitude] }
      };
    }

    Moment.findByIdAndUpdate(id, editedMoment)
      .then(() => {
        res.redirect('/');
      })
      .catch(error => {
        next(error);
      });
  }
);

// momentRouter.post('/:id/delete', (req, res, next) => {
//   res.render('/');
// });

module.exports = momentRouter;
