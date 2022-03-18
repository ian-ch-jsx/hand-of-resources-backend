const { Router } = require('express');
const FavAnimals = require('../models/FavAnimals');

module.exports = Router()
  .post('/', async (req, res) => {
    const favanimals = await FavAnimals.insert(req.body);
    res.send(favanimals);
  })

  .get('/', async (req, res) => {
    const favanimals = await FavAnimals.findAll();
    res.send(favanimals);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const favanimals = await FavAnimals.findById(req.params.id);
      res.send(favanimals);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const favanimals = await FavAnimals.updateById(req.params.id, req.body);
    res.send(favanimals);
  })

  .delete('/:id', async (req, res) => {
    const favanimals = await FavAnimals.deleteById(req.params.id);
    res.send(favanimals);
  });
