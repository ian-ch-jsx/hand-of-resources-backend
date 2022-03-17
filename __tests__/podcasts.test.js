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

  it('retrieves a list of podcasts', async () => {
    const expected = [
      {
        id: '1',
        title: 'Welcome to Night Vale',
        topic: 'Fictional stories',
        description:
          'A fictional community news radio station with heavy surreal vibes.',
      },
      {
        id: '2',
        title: 'The Magnus Archives',
        topic: 'Fictional stories',
        description:
          'A fictional horror podcast examining case files on unexplained phenomena.',
      },
      {
        id: '3',
        title: 'The Weirdest Thing I Learned This Week',
        topic: 'Non-fiction educational',
        description: 'Weird facts presented by Popular Science magazine.',
      },
    ];

    const res = await request(app).get('/api/v1/podcasts').send(expected);

    expect(res.body).toEqual(expected);
  });
});
