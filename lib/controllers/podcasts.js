const { Router } = require('express');
const Podcasts = require('../models/Podcasts');

module.exports = Router().post('/', async (req, res) => {
  const podcasts = await Podcasts.insert(req.body);
  res.send(podcasts);
});
