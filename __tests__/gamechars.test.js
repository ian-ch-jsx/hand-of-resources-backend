const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GameChars = require('../lib/models/GameChars');

describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows users to create a game character entry', async () => {
    const expected = {
      charName: 'Claire Redfield',
      charSpecies: 'Human',
      game: 'Resident Evil',
    };

    const res = await request(app)
      .post('/api/v1/game-characters')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
