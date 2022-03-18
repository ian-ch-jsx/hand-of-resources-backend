const { Router } = require('express');
const GameChars = require('../models/GameChars');

module.exports = Router()
  .post('/', async (req, res) => {
    const gamechars = await GameChars.insert(req.body);
    res.send(gamechars);
  })

  .get('/', async (req, res) => {
    const gamechars = await GameChars.findAll();
    res.send(gamechars);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const gamechars = await GameChars.findById(req.params.id);
      res.send(gamechars);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const gamechars = await GameChars.updateById(req.params.id, req.body);
    res.send(gamechars);
  })

  .delete('/:id', async (req, res) => {
    const gamechars = await GameChars.deleteById(req.params.id);
    res.send(gamechars);
  });
