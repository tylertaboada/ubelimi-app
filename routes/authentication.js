'use strict';

const { Router } = require('express');
const passport = require('passport');
const router = new Router();

//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > SIGN UP < - - - - - -
router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post(
  '/sign-up',
  passport.authenticate('local-sign-up', {
    successRedirect: '/profile',
    failureRedirect: '/sign-up'
  })
);

router.post(
  '/sign-up',
  passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/sign-up'
  })
);

//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > SIGN IN < - - - - - -
router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post(
  '/sign-in',
  passport.authenticate('local-sign-in', {
    successRedirect: '/profile',
    failureRedirect: '/sign-in'
  })
);

//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > GITHUB < - - - - - -
router.get(
  '/github',
  passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/authentication/sign-in'
  })
);

router.get(
  '/github-callback',
  passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/authentication/sign-in'
  })
);

//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > SIGN OUT < - - - - - -
router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
