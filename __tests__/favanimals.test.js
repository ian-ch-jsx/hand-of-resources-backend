const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const FavAnimals = require('../lib/models/FavAnimals');

describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows user to create a favanimals entry', async () => {
    const expected = {
      species: 'Bison',
      classification: 'Mammal',
    };

    const res = await request(app)
      .post('/api/v1/favorite-animals')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('fetches a list of favanimals', async () => {
    const expected = [
      {
        id: '1',
        species: 'Saiga Antelope',
        classification: 'Mammal',
      },
      {
        id: '2',
        species: 'Maned Wolf',
        classification: 'Mammal',
      },
      {
        id: '3',
        species: 'Blue Malaysian Coral Snake',
        classification: 'Reptile',
      },
    ];

    const res = await request(app)
      .get('/api/v1/favorite-animals')
      .send(expected);

    expect(res.body).toEqual(expected);
  });

  it('retrieves a favanimal by id', async () => {
    const expected = await FavAnimals.findById(1);
    const res = await request(app).get(
      `/api/v1/favorite-animals/${expected.id}`
    );

    expect(res.body).toEqual({ ...expected });
  });

  it('updates a favanimal by id', async () => {
    const expected = {
      id: expect.any(String),
      species: 'Pikachu',
      classification: 'Mammal',
    };

    const res = await request(app)
      .patch('/api/v1/favorite-animals/2')
      .send({ species: 'Pikachu' });

    expect(res.body).toEqual(expected);
  });

  it('deletes a favanimal by id', async () => {
    const expected = await FavAnimals.findById(1);
    const res = await request(app).delete(
      `/api/v1/favorite-animals/${expected.id}`
    );

    expect(res.body).toEqual(expected);
  });
});
