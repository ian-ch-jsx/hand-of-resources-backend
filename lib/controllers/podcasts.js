const { Router } = require('express');
const Podcasts = require('../models/Podcasts');

module.exports = Router()
  .post('/', async (req, res) => {
    const podcasts = await Podcasts.insert(req.body);
    res.send(podcasts);
  })

  .get('/', async (req, res) => {
    const podcasts = await Podcasts.findAll();
    res.send(podcasts);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const podcasts = await Podcasts.findById(req.params.id);
      res.send(podcasts);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
