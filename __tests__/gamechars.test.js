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

  it('gets a list of game characters', async () => {
    const expected = [
      {
        id: '1',
        charName: 'Gwen',
        charSpecies: 'Deer',
        game: 'Spiritfarer',
      },
      {
        id: '2',
        charName: 'Acrid',
        charSpecies: 'Alien',
        game: 'Risk of Rain 2',
      },
      {
        id: '3',
        charName: 'Heather Mason',
        charSpecies: 'Human',
        game: 'Silent Hill 3',
      },
    ];

    const res = await request(app)
      .get('/api/v1/game-characters')
      .send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a game character by id', async () => {
    const expected = await GameChars.findById(3);

    const res = await request(app).get(
      `/api/v1/game-characters/${expected.id}`
    );

    expect(res.body).toEqual(expected);
  });

  it('updates a game character by id', async () => {
    const expected = {
      id: expect.any(String),
      charName: 'Cheryl Mason',
      charSpecies: 'Human',
      game: 'Silent Hill',
    };

    const res = await request(app)
      .patch('/api/v1/game-characters/3')
      .send({ charName: 'Cheryl Mason', game: 'Silent Hill' });

    expect(res.body).toEqual(expected);
  });

  it('deletes a character by id', async () => {
    const expected = await GameChars.findById(1);
    const res = await request(app).delete(
      `/api/v1/game-characters/${expected.id}`
    );

    expect(res.body).toEqual(expected);
  });
});
