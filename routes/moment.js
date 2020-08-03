'use strict';

const { Router } = require('express');
//const passport = require('passport');
const momentRouter = new Router();
const routeGuard = require('./../middleware/route-guard');
const Moment = require('../models/moment');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > ALL MOMENTS
momentRouter.get('/view-all', (req, res, next) => {
  res.render('moment/view-all');
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > CREATE MOMENT
momentRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('moment/create');
});

momentRouter.post('/create', (req, res, next) => {
  const { content } = req.body;
  console.log(req.session.user);
  Moment.create({
    content,
    creator: req.session.userId
  })
    .then(moment => {
      res.render('moment/view-all');
    })
    .catch(error => {
      next(error);
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > SINGLE MOMENT

momentRouter.get('/moment/:id', (req, res, next) => {
  res.render('/moment/:id');
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
