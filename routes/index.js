'use strict';
const axios = require('axios');

const { Router } = require('express');
const router = new Router();

router.get('/', async (req, res, next) => {
  const jokeData = await axios.get('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  });
  res.render('index', { joke: jokeData.data.joke, title: 'Ubelimi' });
});

router.get('/about', (req, res, next) => {
  res.render('about', { title: 'Ubelimi' });
});

module.exports = router;
