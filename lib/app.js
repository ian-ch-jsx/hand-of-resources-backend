const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/movie-pets', require('./controllers/moviepets'));
app.use('/api/v1/game-characters', require('./controllers/gamechars'));
app.use('/api/v1/podcasts', require('./controllers/podcasts'));
app.use('/api/v1/music', require('./controllers/music'));
app.use('/api/v1/favorite-animals', require('./controllers/favanimals'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
