const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Music = require('../lib/models/Music');

describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows user to create a music entry', async () => {
    const expected = {
      song: 'Quick Musical Doodles',
      artist: 'Two Feet',
    };

    const res = await request(app).post('/api/v1/music').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('fetches a list of music', async () => {
    const expected = [
      {
        id: '1',
        song: 'The Other Side of Paradise',
        artist: 'Glass Animals',
      },
      {
        id: '2',
        song: 'Two',
        artist: 'The Antlers',
      },
      {
        id: '3',
        song: 'Map Of The World',
        artist: 'Monsters Of Folk',
      },
    ];

    const res = await request(app).get('/api/v1/music').send(expected);

    expect(res.body).toEqual(expected);
  });
});
