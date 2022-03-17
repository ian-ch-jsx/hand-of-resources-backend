const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Podcasts = require('../lib/models/Podcasts');

describe('hand-of-resources-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows user to create a podcast entry', async () => {
    const expected = {
      title: 'Ologies with Alie Ward',
      topic: 'Non-fiction science',
      description: 'Science knowledge and stories from professional -ologists',
    };

    const res = await request(app).post('/api/v1/podcasts').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
