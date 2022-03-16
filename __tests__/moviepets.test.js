const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('gets a list of movie pets', async () => {
    const expected = [
      {
        id: '1',
        petName: 'Hooch',
        petSpecies: 'Dog',
        movie: 'Turner & Hooch',
      },
      {
        id: '2',
        petName: 'Jones',
        petSpecies: 'Cat',
        movie: 'Alien',
      },
      {
        id: '3',
        petName: 'Toto',
        petSpecies: 'Dog',
        movie: 'The Wizard of Oz',
      },
    ];
    const res = await request(app).get('/api/v1/movie-pets').send(expected);

    expect(res.body).toEqual(expected);
  });
});
