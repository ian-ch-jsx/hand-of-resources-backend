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
  });
