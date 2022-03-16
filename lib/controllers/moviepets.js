const { Router } = require('express');
const MoviePets = require('../models/MoviePets');

module.exports = Router()
  .post('/', async (req, res) => {
    const moviepets = await MoviePets.insert(req.body);
    res.send(moviepets);
  })
  .get('/', async (req, res) => {
    const moviepets = await MoviePets.findAll();
    res.send(moviepets);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const moviepets = await MoviePets.findById(req.params.id);
      res.send(moviepets);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
