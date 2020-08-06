'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Ubelimi' });
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

// const button = document.getElementByClassName('.container button');
// const jokeText = document.getElementByClassName('.container p');

// button.addEventListener('click', getJoke);

// async function getJoke() {
//   const jokeData = await fetch('https://icanhazdadjoke.com/', {
//     headers: {
//       Accept: 'application/json'
//     }
//   });
//   const jokeObj = await jokeData.json();
//   jokeText.innerHTML = jokeObj.joke;
// }

module.exports = router;
