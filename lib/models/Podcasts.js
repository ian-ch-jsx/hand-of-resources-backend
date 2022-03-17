const pool = require('../utils/pool');

module.exports = class Podcasts {
  id;
  title;
  topic;
  descr;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.topic = row.topic;
    this.description = row.descr;
  }

  static async insert({ title, topic, description }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            podcasts (title, topic, descr)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
      `,
      [title, topic, description]
    );
    return new Podcasts(rows[0]);
  }
};
