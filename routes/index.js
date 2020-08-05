'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Ubelimi' });
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

module.exports = router;
