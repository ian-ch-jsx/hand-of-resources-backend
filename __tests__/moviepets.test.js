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
        pet_name: 'Hooch',
        pet_species: 'Dog',
        movie: 'Turner & Hooch',
      },
      {
        id: '2',
        pet_name: 'Jones',
        pet_species: 'Cat',
        movie: 'Alien',
      },
      {
        id: '3',
        pet_name: 'Toto',
        pet_species: 'Dog',
        movie: 'The Wizard of Oz',
      },
    ];
    const res = await request(app).get('/api/v1/movie-pets').send(expected);

    expect(res.body).toEqual(expected);
  });
});
