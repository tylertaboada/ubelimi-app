const { Router } = require('express');
const placeRouter = new Router();

const Place = require('./../models/place');

placeRouter.get('/create', (req, res, next) => {
  res.render('place/create');
});

placeRouter.post('/create', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;
  Place.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(place => {
      if (place.type === 'coffee_shop') {
        place.type = 'Coffee Shop';
      } else {
        place.type = 'Book Store';
      }
      //console.log(place);
      res.render('place/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

const metersToDegrees = meters => (meters / 1000 / 40000) * 360;

/*placeRouter.get('/search', (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const radius = req.query.radius;

  Place.find()
    .where('location')
    .within()
    .circle({ center: [longitude, latitude], radius: metersToDegrees(radius) })
    .then(places => {
      res.render('place/single', { places });
    })
    .catch(error => {
      next(error);
    });
});*/

placeRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      //console.log(place);
      if (place.type === 'coffee_shop') {
        place.type = 'Coffee Shop';
      } else {
        place.type = 'Book Store';
      }
      res.render('place/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/view-all', (req, res, next) => {
  Place.find()
    .then(places => {
      res.render('place/view-all', { title: 'Hello', places: places });
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.post('/:id', (req, res, next) => {
  const id = req.params.id;

  Place.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Place.findById(id)
    .then(place => {
      res.render('place/edit', { place });
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { name, type } = req.body;
  Place.findByIdAndUpdate(id, { name, type })
    .then(() => {
      res.redirect(`/place/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = placeRouter;
