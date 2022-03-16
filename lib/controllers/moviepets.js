const { Router } = require('express');
const MoviePets = require('../models/MoviePets');

module.exports = Router().get('/', async (req, res) => {
  const moviepets = await MoviePets.findAll();
  res.send(moviepets);
});
