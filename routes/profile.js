'use strict';

const { Router } = require('express');
const profileRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');
const moment = require('./../models/moments');

profileRouter
  .get('/:id', routeGuard, (req, res, next) => {
    res.render('profile/user');
  })
  .catch(error => {
    console.log('error');
  });

profileRouter
  .get('/edit', routeGuard, (req, res, next) => {
    res.redirect('profile/edit');
  })
  .catch(error => {
    console.log('error');
  });

profileRouter
  .post('/edit', routeGuard, (req, res, next) => {
    res.redirect('profile/edit');
  })
  .catch(error => {
    console.log('error');
  });

module.exports = profileRouter;
