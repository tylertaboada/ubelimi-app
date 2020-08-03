'use strict';

const { Router } = require('express');
const profileRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');
const Moment = require('./../models/moment');

profileRouter.get('/:id', routeGuard, (req, res, next) => {
  res.render('profile/user');
});

profileRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('profile/edit');
});

profileRouter.post('/edit', routeGuard, (req, res, next) => {
  res.redirect('profile/user');
});

module.exports = profileRouter;
