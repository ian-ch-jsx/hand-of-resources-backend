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

  it('fetches a music entry by id', async () => {
    const expected = await Music.findById(1);
    const res = await request(app).get(`/api/v1/music/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates a music entry by id', async () => {
    const expected = {
      id: expect.any(String),
      song: 'Map Of Reno',
      artist: 'Monsters Of Folk',
    };
    const res = await request(app)
      .patch('/api/v1/music/3')
      .send({ song: 'Map Of Reno' });

    expect(res.body).toEqual({ ...expected });
  });

  it('deletes a song by id', async () => {
    const expected = await Music.findById(2);
    const res = await request(app).delete(`/api/v1/music/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
