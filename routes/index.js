'use strict';
const axios = require('axios');

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Ubelimi' });
});

router.get('/about', async (req, res, next) => {
  const jokeData = await axios.get('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  });

  res.render('about', { joke: jokeData.data.joke });
});

module.exports = router;
