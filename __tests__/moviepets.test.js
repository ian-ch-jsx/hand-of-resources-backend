const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const MoviePets = require('../lib/models/MoviePets');

describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows user to create a movie pet entry', async () => {
    const expected = {
      petName: 'Lassie',
      petSpecies: 'Dog',
      movie: 'multiple',
    };

    const res = await request(app).post('/api/v1/movie-pets').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
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

  it('gets a movie pet by id', async () => {
    const expected = await MoviePets.findById(1);
    const resp = await request(app).get(`/api/v1/movie-pets/${expected.id}`);

    expect(resp.body).toEqual({ ...expected });
  });

  it('allows users to edit movie pet', async () => {
    const expected = {
      id: expect.any(String),
      petName: 'Jones',
      petSpecies: 'Cat',
      movie: 'I am Not an Alien',
    };
    const res = await request(app)
      .patch('/api/v1/movie-pets/2')
      .send({ movie: 'I am Not an Alien' });

    expect(res.body).toEqual(expected);
  });
});
